import error from '../methods/error';
import isArray from '../methods/isarray';
import isAsync from '../methods/isasync';
import isFunction from '../methods/isfunction';
import isGenerator from '../methods/isgenerator';
import isNull from '../methods/isnull';
import isObject from '../methods/isobject';
import logit from '../methods/logit';
import parseAdvanced from '../methods/parseadvanced';
import parseBoolean from '../methods/parseboolean';
import strip from '../methods/strip';
import syncroit from '../methods/syncroit';
import tryEval from '../methods/tryeval';
import * as IChildProcess from 'child_process';
import { AsyncFunction } from '../models/AsyncFunction';
import { AnyObject } from '../models/Generics';
import { Option, CLIOptions, ExecOptions, ExecCallback } from '../models/CLI';
import _getFuncName from '../protected/_getFuncName';
import include from '../methods/include';

const syncro = syncroit;
export type ActionCallback = (this: CLI, arg: string) => any;
export type Output = { output: string, code: number } | string | false | undefined;
function _cli_exec(command: string, callback: ExecCallback): Promise<Output>;
function _cli_exec(command: string, options?: ExecOptions, callback?: ExecCallback): Promise<Output>;
function _cli_exec(command: string, options?: any, callback?: any) {
    let child: typeof IChildProcess = include('child_process');
    if (isFunction(options)) {
        callback = options;
        options = undefined;
    }
    return new Promise(function (res, rej) {
        try {
            if (!command) { res(false); }
            options = options || {};
            options.silent = !!options.silent;

            let output = '';
            const cprocess = child.exec(command, { env: process.env, maxBuffer: 20 * 1024 * 1024 }, function (err: any) {
                const fin = !err || options.alwaysResolve ? res : rej
                if (options.outputOnly) {
                    if (callback) { callback.call(cprocess, output); }
                    return fin(output);
                }
                if (callback) {
                    const code = err ? err.code : 0;
                    callback.call(cprocess, code, output);
                    return !code ? fin() : fin({ code, output });
                }
                /* istanbul ignore next */
                let code = err ? err.code : 0;
                fin({ code, output });
            });

            (cprocess.stdout as any).on('data', function (data: any) {
                output += data;
                if (!options.silent) { process.stdout.write(data); }
            });

            (cprocess.stderr as any).on('data', function (data: any) {
                output += data;
                if (!options.silent) { process.stdout.write(data); }
            });
        } catch (e) /* istanbul ignore next */ {
            error && error('CLI.exec', e);
        }
    });
}
function add(opt: Option, self: CLI): CLI {
    try {
        opt.command = opt.command || "*";
        let processedOptions = processOptions(opt, self),
            popt = processedOptions.options,
            options,
            value = processedOptions.value;// = self.Options;
        options = self.Commands[opt.command] = self.Commands[opt.command] || [];
        self._commandIndex.push(opt.command);
        if (!isNull(self._potentialCommand) && self._potentialCommand == opt.command) {
            self.CommandName = self._potentialCommand;
            self._potentialCommand = null as any;
        }
        if (self.CommandName == opt.command) {
            /* istanbul ignore else */
            if (self.Arguments[0] == self.CommandName && !self._commandRemoved) {
                self._commandRemoved = true;
                self.Arguments.splice(0, 1);
            }
        }
        // let val = !self.UsingLabels && self.Arguments[options.length], v;
        let v;
        for (let i = 0, len = popt.length; i < len /* && !isNull(value) */; i++) {
            if (!isNull(v)) {
                (self as any)[(popt[i] as any)._property] = v;
                continue;
            }
            // if (isNull(val)) {
            v = !isNull(value) ? value : opt.default;
            // }
            switch ((popt[i] as any).type.toLowerCase()) {
                case "number":
                    v = Number(v);
                    v = isNaN(v) ? Number(popt[i].default) : v;
                    if (isNaN(v)) {
                        v = undefined;
                    }
                    break;
                case "array":
                case "object":
                    v = tryEval(v, parseAdvanced) || v;
                    break;
                case "bool":
                case "boolean":
                    const tmp = parseBoolean(v);
                    v = isNull(tmp) ? v : tmp;
                    break;
            }
            (self as any)[(popt[i] as any)._property] = v;
        }
        if (!opt.command || opt.command == '*') { self.Options.push(opt); }
        options.push(opt);
    } catch (e) /* istanbul ignore next */ {
        error('CLI.add', e);
    }
    return self;
}
function processOptions(option: Option, self: CLI): { options: Option[], value?: any } {
    /* istanbul ignore if */
    if (!isObject(option)) {
        throw `Error: Option [${JSON.stringify(option)}] must be an object.  Option will be ignored.`;
    }
    // if (!option.option) { return { options: [option] }; }
    let o = option.option.split(',');
    let options: Option[] = [], value;
    for (let i = 0, len = o.length; i < len; i++) {
        let prop = strip(o[i], '-');
        // if (prop != "name" && self[prop]) { value.value = self[prop]; }
        if ((self as any)[prop]) { value = (self as any)[prop]; }
        options.push({
            option: o[i],
            type: option.type || 'string',
            description: option.description,
            default: option.default,
            command: option.command,
            required: option.required,
            _property: prop
        } as any);
    }
    return { options, value };
}

function renderOptions(options: Option[], extratabs?: string) {
    extratabs = extratabs || "";
    let content = "", nlinetab = "\n\t";
    for (let i = 0, len = options.length; i < len; i++) {
        /* istanbul ignore next */
        let option = options[i], optnames = (option.option || "").split(","), sep = "";
        if (optnames.length > 1) {
            optnames.sort(function (a, b) { return a.length - b.length; });
            sep = ",";
        }
        content += nlinetab + extratabs + optnames[0] + sep
        content += `\t\t${option.type ? `(${option.type})` : "(string)"} ${option.description}${option.required ? "(required)" : ""}`;
        for (let j = 1, jlen = optnames.length; j < jlen; j++) {
            /* istanbul ignore else */
            if (j + 1 == jlen) { sep = ""; }
            content += nlinetab + extratabs + optnames[j] + sep;
        }
    }
    return content;
};
function validate(self: CLI): void {
    /* istanbul ignore next */
    self.CommandName = self.CommandName || '*';
    /* istanbul ignore next */
    let options = self.Commands[self.CommandName] || [];

    for (let i = 0, len = options.length; i < len; i++) {
        const option = options[i], copt = strip(option.option.split(',')[0], '-');
        /* istanbul ignore else */
        if ((self as any)[copt] === undefined) {
            /* istanbul ignore next */
            (self as any)[copt] = self.UsingLabels && self.Arguments[i] || option.default;
        }
        /* istanbul ignore else */
        if (option.required && isNull((self as any)[copt])) {
            throw `Option ${option.option} is required.`;
        } else if (option.type && !isNull((self as any)[copt])) {
            let type = option.type.toLowerCase();
            switch (type) {
                case "number":
                    (self as any)[copt] = isNaN(Number((self as any)[copt])) ? (self as any)[copt] : Number((self as any)[copt]);
                    break;
                case "array":
                case "object":
                    (self as any)[copt] = tryEval((self as any)[copt], parseAdvanced) || (self as any)[copt];
                    break;
                case "bool":
                case "boolean":
                    type = 'boolean';
                    const tmp = parseBoolean((self as any)[copt]);
                    (self as any)[copt] = isNull(tmp) ? (self as any)[copt] : tmp;
                    break;
            }
            if (_getFuncName((self as any)[copt].constructor).toLowerCase() != type) {
                throw `Option ${option.option} must be a ${option.type}.`;
            }
        }
    }
}
class CLI {
    public Interpreter: string;
    public ScriptPath: string;
    public ScriptName: string;
    public Name: string;
    public Info: string;
    public Synopsis: string;
    public Copyright: string;
    public OptionsDescription: string;
    public Description: string;
    public UsingLabels: boolean;
    public CommandName: string;
    public Commands: AnyObject;
    public Options: any[];

    public Arguments: any[];
    public Notes: string;
    public isMan: boolean;
    public isHelp: boolean;

    public _commandIndex: string[];
    public _potentialCommand: string;
    public _commandRemoved: boolean;
    public waitForPending: Promise<any>[];

    constructor(params?: CLIOptions) {
        /*|{
            "info": "CLI parser for arguments and simplem method to execute shell commands",
            "category": "CLI",
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"options": "(CLIOption[]) Array of options having properties option(required:command option ex: -c), type(data type returned using typeof, ex:string), description, required(default:false)."}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#CLI",
            "returnType": "(CLI)"
        }|*/
        params = params || {};
        let args = process.argv,
            self = this,
            cself: any = self,
            sindex = 2;
        this._commandIndex = [];
        this._potentialCommand = args[sindex];
        this._commandRemoved = false;

        this.Interpreter = args[0];
        this.ScriptPath = args[1];
        this.ScriptName = this.ScriptPath.substring(this.ScriptPath.lastIndexOf('/') + 1);
        this.Name = params.name || "";
        this.Info = params.info || "";
        this.Synopsis = params.synopsis || "";
        this.Copyright = params.copyright || "";
        this.OptionsDescription = params.optionsDescription || "";
        this.Description = params.description || "";
        this.UsingLabels = true;
        this.CommandName = "";
        this.Commands = params.commands || {/*command:[options]*/ };
        this.Commands['*'] = self.Commands['*'] || [];
        this.Options = [/*{
        option: "-c",
        type:"string",
        description:"",
        default:"",
        command:"",
        required:false
        }*/];
        this.Arguments = [];
        this.Notes = params.notes || "";
        this.isMan = false;
        this.isHelp = false;
        this.waitForPending = [];
        const command = args[2];

        if (!~self._commandIndex.indexOf('*') && command && command[0] == "-") {
            self.CommandName = "*";
        }
        else if (command == 'man' || command == 'help') {
            self.CommandName = command;
            self.isHelp = command == 'help'; // requesting help
            self.isMan = command == 'man'; // requesting man
            sindex++;
        }

        for (let i = sindex, len = args.length; i < len; i++) {
            let arg = args[i];
            /* istanbul ignore else */
            if (arg[0] != '-') { // no label
                self.UsingLabels = false;
                cself[arg] = arg;
                self.Arguments.push(arg);
            } else if (arg.startsWith('--')) { // this is a multi char label
                // check if next arg is an option.  if it is then this is a flag
                if (!args[i + 1] || args[i + 1][0] == '-') {
                    cself[strip(arg, '-')] = true;
                    continue;
                }
                i++;
                // add the value of the option as a property
                cself[strip(arg, '-')] = args[i];
                self.Arguments.push(arg);
                self.Arguments.push(args[i]);
            } else if (arg.startsWith('-')) { // this is a single char label
                const opts: string = strip(arg, '-');
                if (opts.length == 1) {
                    // check if next arg is an option.  if it is then this is a flag
                    if (!args[i + 1] || args[i + 1][0] == '-') {
                        cself[opts] = true;
                        continue;
                    }
                    i++;
                    cself[opts] = args[i];
                    self.Arguments.push(arg);
                    self.Arguments.push(args[i]);
                    continue;
                }
                for (var j = 0, jlen = opts.length; j < jlen; j++) {
                    cself[opts[j]] = true;
                }
            }
        }
        if (params.options) {
            for (var i = 0, len = params.options.length; i < len; i++) {
                this.add(params.options[i]);
            }
        }
    }
    public isValid(): boolean {
        try { this.validate(); return true; }
        catch (e) { logit(e); return false; }
    }
    public validate(): void {
        validate(this);
    }
    public add(opt: Option): void {
        add(opt, this);
    }
    public option(opt: Option): void {
        add(opt, this);
    }
    public command(cmd: string, opts: Option | Option[]): this {
        try {
            /* istanbul ignore next */
            opts = opts || [];
            let args = process.argv;
            if (isNull(cmd)) { throw "Command name must be provided. This operation will be ignored."; }
            let cindexCMD = cmd.split(/\s/)[0];
            this._commandIndex.push(cindexCMD);
            /* istanbul ignore else */
            if (args[2] == cindexCMD) { this.CommandName = cindexCMD; }
            /* istanbul ignore else */
            if (!isArray(opts)) { opts = [opts] as any; }
            for (let i = 0, len = (opts as Option[]).length; i < len; i++) {
                var opt: any = (opts as Option[])[i];
                /* istanbul ignore next */
                if (!isObject(opt)) {
                    error('CLI.command', new Error(`Option [${JSON.stringify(opt)}] must be an object.  Option will be ignored.`));
                    continue;
                }
                opt.command = cmd;
                add(opt, this);
            }
            /* istanbul ignore next */
            this.Commands[cmd] = this.Commands[cmd] || [];
            return this;
        } catch (e) {
            error && error('CLI.command', e);
            throw e;
        }
    }
    public action(cb: ActionCallback | GeneratorFunction | AsyncFunction): this;
    public action(name: string, cb?: ActionCallback): this;
    public action(name: any, cb?: any): this {
        let args = process.argv,
            self = this;
        /* istanbul ignore else */
        if (isFunction(name) || isGenerator(name) || isAsync(name)) {
            cb = name;
            name = self._commandIndex[self._commandIndex.length - 1];
        }
        /* istanbul ignore else */
        if (self.CommandName == name) {
            if (isGenerator(cb)) {
                eval('self.waitForPending.push(syncro(function*(){ return yield* cb.call(self,args[2]); }));');
            } else if (isAsync(cb)) {
                eval('self.waitForPending.push((async function (){ return await cb.call(self,args[2]); })());');
            } else {
                cb.call(self, name);
            }
        }
        return self;
    };
    public renderMan(): string {
        try {
            let nlinetab = "\n\t", dline = "\n\n";
            let commands = "", self = this;
            for (var prop in self.Commands) {
                /* istanbul ignore if */
                if (!self.Commands.hasOwnProperty(prop)) { continue; }
                if (prop == '*') { continue; }
                if (!commands) { commands = `ADDITIONAL COMMANDS${nlinetab}`; }
                commands += `${prop}${renderOptions(self.Commands[prop], '\t')}\n${nlinetab}`;
            }
            commands += "\n";
            let content = `NAME${nlinetab}${self.Name}${(self.Info ? " -- " + self.Info : "")}${dline}`;
            content += `SYNOPSIS${nlinetab}${self.Synopsis}${dline}`;
            content += `DESCRIPTION${nlinetab}${self.Description}${dline}`;
            content += `OPTIONS${renderOptions(self.Options)}${dline}`
            content += commands;
            content += `NOTES${nlinetab}${self.Notes}${dline}`;
            return content;
        } catch (e) /* istanbul ignore next */ {
            error('CLI.renderMan', e);
            return "";
        }
    }
    public renderHelp(): string {
        try {
            let nlinetab = "\n\t", dline = "\n\n", self = this;

            let commands = "";
            let hasOptions = !!self.Options.length;
            for (let prop in self.Commands) {
                /* istanbul ignore if */
                if (!self.Commands.hasOwnProperty(prop)) { continue; }
                if (prop == '*') { continue; }
                commands += `${prop}${renderOptions(self.Commands[prop], '\t')}\n${nlinetab}`;
                hasOptions = hasOptions || !!self.Commands[prop].length;
            }
            let content = `Description: ${self.Synopsis}${dline}`;
            content += `Usage: ${self.ScriptName}${(commands && " [command]")}${(hasOptions ? " [options]" : "")}${nlinetab}${commands}\n`;
            content += `Options:${renderOptions(self.Options)}${dline}`;
            return content;
        } catch (e) /* istanbul ignore next */ {
            error('CLI.renderMan', e);
            return "";
        }

    }
    public static exec(command: string, callback: ExecCallback): Promise<Output>;
    public static exec(command: string, options?: ExecOptions, callback?: ExecCallback): Promise<Output>;
    public static exec(command: string, options?: any, callback?: any): Promise<Output> {
        return _cli_exec(command, options, callback);
    }
    public exec(command: string, callback: ExecCallback): Promise<Output>;
    public exec(command: string, options?: ExecOptions, callback?: ExecCallback): Promise<Output>;
    public exec(command: string, options?: any, callback?: any): Promise<Output> {
        return CLI.exec(command, options, callback);
    }
}
export default CLI;