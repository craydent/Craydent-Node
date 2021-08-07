import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import format from '../methods/format';
import getDayOfYear from '../methods/getdayofyear';
import include from '../methods/include';
import insertBefore from '../methods/insertbefore';
import isFunction from '../methods/isfunction';
import isObject from '../methods/isobject';
import isRegExp from '../methods/isregexp';
import isString from '../methods/isstring';


//#region Original methods
const _stderr: typeof process.stderr.write = process.stderr.write.bind(process.stderr),
    _stdout: typeof process.stdout.write = process.stdout.write.bind(process.stdout),
    consoleDebug = console.debug.bind(console),
    consoleError = console.error.bind(console),
    consoleInfo = console.info.bind(console),
    consoleLog = console.log.bind(console),
    consoleWarn = console.warn.bind(console);
//#endregion Original methods

//#region Local globals
let stream: fs.WriteStream,
    saving = false,
    config: LoggerConfig = {
        loggerName: '',
        sendToStdout: false,
        ignorePatterns: [],
        rotate: 1,
        maxSize: '10M'
    },
    onlyOnce = false,
    oldConfig: LoggerConfig;
const startTime = Symbol('startTime'),
    loggerConfig = Symbol('loggerConfig');
//#endregion Local globals

//#region Typings
export type LogLevel = 'INFO' | 'ERROR' | 'DEGUG';
export type IgnoreIterator = (this: LoggerConfig, req: Request) => boolean;
export interface LoggerResponse {
    [startTime]: number;
    [loggerConfig]: LoggerConfig;
    err?: any;
    on: (event: string, callback: (this: LoggerResponse, err: Error) => void) => void;
    removeListener: (event: string, callback: (this: LoggerResponse, err: Error) => void) => void;
    req?: any;
    statusCode: number;
    statusMessage: string;
}
export interface LoggerConfig {
    ignorePatterns?: Array<string | RegExp | IgnoreIterator>;
    logFilePath?: string;
    loggerName?: string;
    maxSize?: string | number;
    rotate?: number;
    sendToStdout?: boolean;
    onBeforeWrite?: (json: any) => any
    formatMessage?: (message: string, level: LogLevel, data: any) => any
}
export interface LoggerMetaData {
    date: Date;
    buffer: string;
    size: number;
    fileIncrement: number;
}
export interface MessageMetaData {
    httpRequestUrl?: string;
    httpMethod?: string;
    httpResponseStatusCode?: number;
    responseTime?: number;
}
//#endregion Typings

function close() {
    const logPath = config.logFilePath as string;
    let currentLogger: LoggerMetaData = (logger as any)[logPath];
    let archiveFilename = generateArchiveFileName(logPath, currentLogger.date);
    exec(`mv ${logPath} ${archiveFilename}`, (error, out, err) => {
        if (error) {
            let message = '[pxp-bff] failed to archive log file';
            try { message = JSON.stringify(error); } catch (e) { }
            let obj = (config.formatMessage as any)(message, 'ERROR');

            obj = (config.onBeforeWrite as any)(obj) || obj;
            currentLogger.buffer += `${JSON.stringify(obj)}\n`;
        }
        setupStream();
        process.nextTick(stream.write.bind(stream), currentLogger.buffer);
        saving = false;
        currentLogger.buffer = '';
        currentLogger.date = new Date();
        currentLogger.size = 0;
    });
}
function generateArchiveFileName(logPath: string, today: Date) {
    let parts = logPath.split('.');
    let increment = (logger as any)[logPath].fileIncrement++;
    insertBefore(parts, parts.length - 1, `${format(today, 'Ymd')}.${increment}`);
    return parts.join('.');
}
function reset(): void {
    if (onlyOnce) {
        onlyOnce = false;
        let needToReset = config.logFilePath != oldConfig.logFilePath;
        config = oldConfig;
        if (needToReset) {
            setupStream();
        }
    }
}
function setupStream() {
    if (!config.logFilePath) {
        stream = process.stdout as any;
        process.stdout.write = _stdout;
        process.stderr.write = _stderr;
        return;
    }
    if (stream && stream.close) {
        stream.removeAllListeners('close');
        process.nextTick(stream.close.bind(stream));
    }
    try {
        stream = fs.createWriteStream(config.logFilePath, { 'flags': 'a' });
        stream.on('close', close);
        stream.on('error', (err) => {
            _stdout('stream had an error' + (err && err.message));
        })
    } catch (ex) {
        stream = process.stdout as any;
        process.stdout.write = _stdout;
        process.stderr.write = _stderr;
        stream.write(JSON.stringify(ex.message));
    }

}
function shouldRotate(currentLogger: LoggerMetaData, dayDiff: number, message: string) {
    if (!config.maxSize) {
        return false;
    }
    // @ts-ignore
    return dayDiff >= config.rotate || currentLogger.size + message.length > config.maxSize;
}
function _stdWrite(message: string, level: LogLevel = 'INFO', data?: MessageMetaData) {
    try {
        const logPath = config.logFilePath as string;
        let currentLogger: LoggerMetaData = (logger as any)[logPath];
        const now = new Date();
        let obj = (config.formatMessage as any)(message, level, data);

        obj = (config.onBeforeWrite as any)(obj) || obj;
        let formattedMessage = isObject(obj) ? `${JSON.stringify(obj)}\n` : obj;
        let dayDiff = getDayOfYear(now) - getDayOfYear(currentLogger.date);
        if (!saving && shouldRotate(currentLogger, dayDiff, message)) {
            saving = true;
            if (stream) {
                stream.close && process.nextTick(stream.close.bind(stream));
            }
            currentLogger.buffer += formattedMessage;
        } else if (saving) {
            currentLogger.buffer += formattedMessage;
        } else {
            if (stream) {
                process.nextTick(stream.write.bind(stream), formattedMessage);
                config.sendToStdout && _stdout(formattedMessage);
                currentLogger.size += message.length;
            } else {
                _stdout(formattedMessage);
            }
        }
        return true;
    } catch (e) {
        _stderr(e.stack + '\n');
        return false;
    }
}
function onResFinished(this: LoggerResponse, err: Error) {
    this.removeListener('error', onResFinished);
    this.removeListener('finish', onResFinished);

    if (!shouldIgnoreThisRequest(this.req)) {
        const httpResponseStatusCode = this.statusCode;
        const httpStatusMessage = this.statusMessage;
        const httpMethod = this.req.method as string;
        const httpRequestUrl = this.req.originalUrl || this.req.url;
        const middlewareConfig = this[loggerConfig];
        let responseTime = Date.now() - this[startTime],
            message = `Request: ${httpMethod} ${this.req.headers.referer || httpRequestUrl} - Status Code ${httpStatusMessage} in '${responseTime}' ms.`,
            level: LogLevel = 'INFO';
        if (err || this.err || this.statusCode >= 400) {
            message = `failed with status code ${this.statusCode}`;
            level = 'ERROR';
        }
        logger.once(middlewareConfig);
        _stdWrite(message, level, { responseTime, httpResponseStatusCode, httpMethod, httpRequestUrl });
        reset();
    }
    return this;
}
function _enable() {
    if (config.logFilePath) {
        process.stdout.write = (message: string) => _stdWrite(message, 'INFO');
        process.stderr.write = (message: string) => _stdWrite(message, 'ERROR');
        console.debug = function (...args) {
            consoleDebug.apply(console, args);
            reset();
        };
        console.error = function (...args) {
            consoleError.apply(console, args);
            reset();
        };
        console.info = function (...args) {
            consoleInfo.apply(console, args);
            reset();
        };
        console.log = function (...args) {
            consoleLog.apply(console, args);
            reset();
        };
        console.warn = function (...args) {
            consoleWarn.apply(console, args);
            reset();
        };
    }
}
function _disable() {
    process.stdout.write = _stdout;
    process.stderr.write = _stderr;
    console.debug = consoleDebug;
    console.error = consoleError;
    console.info = consoleInfo;
    console.log = consoleLog;
    console.warn = consoleWarn;
}
function shouldIgnoreThisRequest(req: any) {
    const len = config?.ignorePatterns?.length;
    if (!len) { return false; }
    for (let i = 0; i < len; i++) {
        let ignore = (config.ignorePatterns as any)[i];
        switch (true) {
            case isFunction(ignore):
                if ((ignore as IgnoreIterator).call(config, req)) {
                    return true;
                }
                break;
            case isString(ignore):
                ignore = new RegExp((ignore as string).replace(/\*/g, '.*?'));
            case isRegExp(ignore):
                if ((ignore as RegExp).test(req.originalUrl || req.url || "")) {
                    return true;
                }
        }
    }
    return false;
}
function _loggerMiddleware(ctx: LoggerConfig, middlewareConfig: LoggerConfig) {
    if (!oldConfig) {
        logger.configure({ ...ctx, ...middlewareConfig });
    }
    return (req: Request, res: LoggerResponse, next: any) => {
        res[loggerConfig] = { ...ctx, ...middlewareConfig };
        res[startTime] = res[startTime] || Date.now();

        res.on('finish', onResFinished)
        res.on('error', onResFinished)

        next && next();
    };
}
function _performance(label: string, startTime: number) {
    return console.log(`Tracking Performance Issue. Time Taken by ${label} was ${Date.now() - startTime} milliseconds`)
}
function initLoggerMeta(logPath: string) {
    if (!(logger as any)[logPath]) {
        const stats = fs.statSync(logPath);
        const size = stats.size;
        (logger as any)[logPath] = {
            date: new Date(),
            buffer: '',
            size,
            fileIncrement: 0
        };
    }
}
function parseMaxSize(config: LoggerConfig) {
    if (isString(config.maxSize)) {
        config.maxSize = parseInt((config.maxSize as string).toLowerCase()
            .replace(/,/g, '')
            .replace('k', '000')
            .replace('M', '000000')
            .replace('G', '000000000'));
    }
    return config;

}
function _once(settings: LoggerConfig) {
    onlyOnce = true;
    oldConfig = config;
    config = parseMaxSize({ ...config, ...settings });
    if (!isFunction(config.onBeforeWrite)) {
        config.onBeforeWrite = (obj) => obj;
    }
    config.logFilePath != oldConfig.logFilePath && setupStream();
    const logPath = config.logFilePath as string;
    initLoggerMeta(logPath);
}
function _configure(settings: LoggerConfig) {
    if (!oldConfig) {
        const cwd = process.cwd();
        const pkg = include(path.join(cwd, './package.json')) || { cloggger: {} };
        oldConfig = config = parseMaxSize({ ...pkg.clogger, ...config, ...settings });
        _enable();
        const logPath = config.logFilePath as string;
        initLoggerMeta(logPath);

        if (!isFunction(config.onBeforeWrite)) {
            config.onBeforeWrite = (obj) => obj;
        }
        if (!isFunction(config.formatMessage)) {
            config.formatMessage = (message, level) => message;
        }
        return setupStream();
    }
    oldConfig = config;
    config = parseMaxSize({ ...config, ...settings });
    config.logFilePath = config.logFilePath;
    if (!isFunction(config.onBeforeWrite)) {
        config.onBeforeWrite = (obj) => obj;
    }
    if (!isFunction(config.formatMessage)) {
        config.formatMessage = (message, level) => message;
    }
    config.logFilePath != oldConfig.logFilePath && setupStream();
    const logPath = config.logFilePath as string;
    initLoggerMeta(logPath);
}
function _getConfig() {
    return config;
}
function logger(message: string, level: LogLevel = 'INFO', data?: MessageMetaData) {
    /*|{
           "info": "Logger that will rotate logs and allow for multiple log files",
           "category": "Logger",
           "parameters":[
               {"message": "(String) message to log"},
               {"level?": "(String) indicates the log level.  Valid levels are INFO, ERROR, and DEBUG"}
           ],

           "overloads":[],

           "url": "http://www.craydent.com/library/1.9.3/docs#logger",
           "returnType": "(void)"
       }|*/
    return _stdWrite(message, level, data);
}

logger['stdWrite'] = _stdWrite;
logger['performance'] = _performance;
logger['write'] = _stdWrite;
logger['log'] = _stdWrite;
logger['debug'] = _stdWrite;
logger['warn'] = _stdWrite;
logger['info'] = _stdWrite;
logger['error'] = _stdWrite;
logger['once'] = _once;
logger['disable'] = _disable;
logger['enable'] = _enable;
logger['configure'] = _configure;
logger['stderr'] = _stderr;
logger['stdout'] = _stdout;
logger['getConfig'] = _getConfig;
logger['loggerMiddleware'] = _loggerMiddleware;
declare namespace logger {
    // @ts-ignore
    export { _stdWrite as stdWrite };
    // @ts-ignore
    export { _performance as performance };
    // @ts-ignore
    export { _stdWrite as write };
    // @ts-ignore
    export { _stdWrite as log };
    // @ts-ignore
    export { _stdWrite as debug };
    // @ts-ignore
    export { _stdWrite as warn };
    // @ts-ignore
    export { _stdWrite as info };
    // @ts-ignore
    export { _stdWrite as error };
    // @ts-ignore
    export { _once as once };
    // @ts-ignore
    export { _disable as disable };
    // @ts-ignore
    export { _enable as enable };
    // @ts-ignore
    export { _configure as configure };
    // @ts-ignore
    export { _stderr as stderr };
    // @ts-ignore
    export { _stdout as stdout };
    // @ts-ignore
    export { _getConfig as getConfig };
    // @ts-ignore
    export { _loggerMiddleware as loggerMiddleware };
}
export default logger;