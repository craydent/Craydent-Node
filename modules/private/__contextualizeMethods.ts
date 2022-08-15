import error from '../methods/error';

declare var $c: any
export default function __contextualizeMethods<T>(ctx?: T): T {
    try {
        // @ts-ignore
        ctx = ctx || {};

        for (let i = 0, len = globalizables.length; i < len; i++) {
            $c[globalizables[i]] && ((ctx as any)[globalizables[i]] = $c[globalizables[i]]);
        }

        return ctx as T;
    } catch (e) /* istanbul ignore next */ {
        error && error('__contextualizeMethods', e);
        return null as any;
    }
}
let fsmethods = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "read",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "write",
    "writeFile"
],
    nodeMethods = [
        'ServerManager'
    ],
    jsMethods = [
        '$COMMIT',
        '$COOKIE',
        '$DELETE',
        '$DEL',
        '$GET',
        '$ROLLBACK',
        '$SET',

        'ChromeVersion',
        'FirefoxVersion',
        'IEVersion',
        'OperaVersion',
        'SafariVersion',
        'isAmaya',
        'isAndroid',
        'isBlackBerry',
        'isChrome',
        'isFirefox',
        'isGecko',
        'isIE6',
        'isIE',
        'isIPad',
        'isIPhone',
        'isIPod',
        'isKHTML',
        'isLinux',
        'isMac',
        'isMobile',
        'isOpera',
        'isPalmOS',
        'isPresto',
        'isPrince',
        'isSafari',
        'isSymbian',
        'isTrident',
        'isWebkit',
        'isWindows',
        'isWindowsMobile'
    ],
    globalizables = [
        '$COMMIT',
        '$COOKIE',
        '$DEL',
        '$DELETE',
        '$GET',
        '$ROLLBACK',
        '$SET',
        'Benchmarker',
        'CLI',
        'Cursor',
        'parseAdvanced',
        'stringifyAdvanced',
        // $c.JSONPA && (ctx.JSONPA = JSON.parseAdvanced);
        // $c.JSONSA && (ctx.JSONSA = JSON.stringifyAdvanced);
        'JSZip',
        'OrderedList',
        'Queue',
        'Set',
        'addObjectPrototype',
        'ajax',
        'yieldable',
        'catchAll',
        'clearCache',
        'clusterit',
        'cout',
        'createServer',
        'cuid',
        'emit',
        'error',
        'exclude',
        'fillTemplate',
        'foo',
        'include',
        'isArray',
        'isBetween',
        'isBoolean',
        'isDate',
        'isDomElement',
        'isEmpty',
        'isFloat',
        'isFunction',
        'isGenerator',
        'isGeolocation',
        'isInt',
        'isJSON',
        'isNull',
        'isNullOrEmpty',
        'isNumber',
        'isPromise',
        'isObject',
        'isRegExp',
        'isString',
        'logger',
        'logit',
        'md5',
        'mkdirRecursive',
        'namespace',
        'next',
        'foo',
        'now',
        'parseBoolean',
        'parseRaw',
        'rand',
        'requireDirectory',
        'suid',
        'syncroit',
        'tryEval',
        'wait',
        'xmlToJson',
        'yieldable',
        'zipit'
    ];
if (typeof window == 'undefined') {
    globalizables = globalizables.concat(fsmethods).concat(nodeMethods);
} else {
    globalizables = globalizables.concat(jsMethods);
}