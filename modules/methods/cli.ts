import error from './error';
import isArray from './isArray';
import isAsync from './isAsync';
import isFunction from './isFunction';
import isGenerator from './isGenerator';
import isNull from './isNull';
import isObject from './isObject';
import logit from './logit';
import parseAdvanced from './parseAdvanced';
import parseBoolean from './parseBoolean';
import strip from './strip';
import syncroit from './syncroit';
import tryEval from './tryEval';
import * as IChildProcess from 'child_process';
import { AsyncFunction } from 'modules/models/AsyncFunction';
import { AnyObject } from "../models/Generics";
import { Options, CLIOptions, ExecOptions, ExecCallback } from "../models/CLI";

export type ActionCallback = (this: CLI, arg: string) => any;

function _cli_exec(command: string, callback: ExecCallback);
function _cli_exec(command: string, options?: ExecOptions, callback?: ExecCallback);
function _cli_exec(command, options?, callback?) {
    let child: typeof IChildProcess = require('child_process');
    if (typeof options == 'function') {
        callback = options;
        options = undefined;
    }
    return new Promise(function (res, rej) {
        try {
            if (!command) { res(false); }
            options = options || {};
            options.silent = !!options.silent;

            var output = '';
            var cprocess = child.exec(command, { env: process.env, maxBuffer: 20 * 1024 * 1024 }, function (err) {
                var fin = !err || options.alwaysResolve ? res : rej
                var re = callback || fin;
                if (options.outputOnly) { return re(output); }
                if (callback) { fin(); return re.call(cprocess, err ? err.code : 0, output); }
                re({ code: err ? err.code : 0, output: output });
            });

            cprocess.stdout.on('data', function (data) {
                output += data;
                if (!options.silent) { process.stdout.write(data); }
            });

            cprocess.stderr.on('data', function (data) {
                output += data;
                if (!options.silent) { process.stdout.write(data); }
            });
        } catch (e) {
            error && error('CLI.exec', e);
        }
    });
}
function add(opt: Options, self: CLI): CLI {
    try {
        opt.command = opt.command || "*";
        let value: AnyObject = {}, popt = processOptions(opt, value, self), options = self.Options;
        options = self.Commands[opt.command] = self.Commands[opt.command] || [];
        self._commandIndex.push(opt.command);
        if (!isNull(self._command_possible) && self._command_possible == opt.command) {
            for (let i = 0, len = self.Commands['*'].length; i < len; i++) {
                let topt = processOptions(self.Commands['*'][i], null, self);

                for (let j = 0, jlen = topt.length; j < jlen; j++) {
                    delete self[topt[j]._property];
                }
            }
            self.CommandName = self._command_possible;
            self._command_possible = null;
        }
        if (self.CommandName == opt.command) {
            if (self.Arguments[0] == self.CommandName && !self._command_removed) {
                self._command_removed = true;
                self.Arguments.splice(0, 1);
            }
            let val = !self.UsingLabels && self.Arguments[options.length] || value.value || opt.default;
            for (let i = 0, len = popt.length; i < len && !isNull(val); i++) {
                let v = val;
                switch (popt[i].type.toLowerCase()) {
                    case "number":
                        v = Number(v);
                        v = isNaN(v) ? Number(popt[i].default) : v;
                        break;
                    case "array":
                    case "object":
                        v = tryEval(v, parseAdvanced) || v;
                        break;
                    case "bool":
                    case "boolean":
                        var tmp = parseBoolean(v);
                        v = isNull(tmp) ? v : tmp;
                        break;
                }
                self[popt[i]._property] = v;
            }
        }
        options.push(opt);
        return self;
    } catch (e) {
        error('CLI.add', e);
    }
}
function processOptions(option: Options, value, self) {
    value = value || {};
    if (!isObject(option)) { throw "Error: Option [" + JSON.stringify(option) + "] must be an object.  Option will be ignored."; }
    if (!option.option) { return [option]; }
    let o = option.option.split(',');
    if (o.length === 1) { return [option]; }
    let arr: Options[] = [];
    for (let i = 0, len = o.length; i < len; i++) {
        let prop = strip(o[i], '-');
        if (prop != "name" && self[prop]) { value.value = self[prop]; }
        arr.push({
            option: o[i],
            type: option.type,
            description: option.description,
            default: option.default,
            command: option.command,
            required: option.required,
            _property: prop
        });
    }
    return arr;
}

function renderOptions(options: Options[], extratabs?: string) {
    extratabs = extratabs || "";
    let content = "", nlinetab = "\n\t";
    for (let i = 0, len = options.length; i < len; i++) {
        let option = options[i], optnames = (option.option || "").split(","), sep = "";
        if (optnames.length > 1) {
            optnames.sort(function (a, b) { return a.length - b.length; });
            sep = ",";
        }
        content += nlinetab + extratabs + optnames[0] + sep + "\t\t" + (option.type ? "(" + option.type + ")" : "") + " " + option.description + (option.required ? "(required)" : "");
        for (let j = 1, jlen = optnames.length; j < jlen; j++) {
            if (j + 1 == jlen) { sep = ""; }
            content += nlinetab + extratabs + optnames[j] + sep;
        }
    }
    return content;
};
function validate(self: CLI): void {
    var options = self.Options;
    if (self.CommandName) {
        options = self.Commands[self.CommandName] || [];
    }

    for (var i = 0, len = options.length; i < len; i++) {
        var option = options[i], copt = strip(option.option.split(',')[0], '-');
        if (self[copt] === undefined) { self[copt] = self.UsingLabels && self.Arguments[i] || option.default; }
        if (option.required && isNull(self[copt])) {
            throw 'Option ' + option.option + ' is required.';
        } else if (option.type && !isNull(self[copt])) {
            switch (option.type.toLowerCase()) {
                case "number":
                    self[copt] = isNaN(Number(self[copt])) ? self[copt] : Number(self[copt]);
                    break;
                case "array":
                case "object":
                    self[copt] = tryEval(self[copt], parseAdvanced) || self[copt];
                    break;
                case "bool":
                case "boolean":
                    var tmp = parseBoolean(self[copt]);
                    self[copt] = isNull(tmp) ? self[copt] : tmp;
                    break;
            }
            if (typeof self[copt] != option.type) {
                throw 'Option ' + option.option + ' must be a ' + option.type + '.';
            }
        }
    }
}
class CLI {
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
    public _command_possible: string;
    public _command_removed: boolean;

    constructor(params: CLIOptions) {
        params = params || {};
        let args = process.argv,
            self = this,
            cself = self,
            sindex = 2;
        this._commandIndex = [];
        this._command_possible = args[sindex];
        this._command_removed = false;

        this.Interpreter = args[0];
        this.ScriptPath = args[1];
        this.ScriptName = this.ScriptPath.substring(self.ScriptPath.lastIndexOf('/') + 1);
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

        if (params.options) {
            for (var i = 0, len = params.options.length; i < len; i++) {
                add(params.options[i], self);
            }
        }
        self.Arguments = [];
        self.Notes = params.notes || "";
        self.isMan = false;
        self.isHelp = false;

        if (args[sindex] != "man" && self.Commands[args[sindex]]) {
            self.CommandName = args[sindex++];
        } else if (!~self._commandIndex.indexOf('*') && args[sindex] && args[sindex][0] == "-") {
            self.CommandName = "*";
        } else {
            self.CommandName = args[sindex] || "*";
        }

        if (self.CommandName == 'man') { // requesting man
            self.isMan = true;
        }
        if (self.CommandName == 'help') { // requesting man
            self.isHelp = true;
        }
        for (let i = sindex, len = args.length; i < len; i++) {
            let arg = args[i];
            if (!arg || arg[sindex] != '-' && arg[0] != '-') { // no label
                if (arg == 'man') { // requesting man
                    self.isMan = true;
                }
                if (arg == 'help') { // requesting man
                    self.isHelp = true;
                }
                self.UsingLabels = false;
                self.CommandName = "*";
                self.Arguments.push(arg);
            } else if (arg.startsWith('--')) { // this is a multi char label
                if (arg == '--help') { // requesting help
                    self.isHelp = true;
                }
                if (!args[i + 1] || args[i + 1][0] == '-') {
                    cself[strip(arg, '-')] = true;
                    continue;
                }
                i++;
                cself[strip(arg, '-')] = args[i];
            } else if (arg[0] == '-') { // this is a single char label
                var opts = strip(arg, '-');
                if (opts.length == 1) {
                    if (!args[i + 1] || args[i + 1][0] == '-') {
                        cself[opts] = true;
                        continue;
                    }
                    i++;
                    cself[opts] = args[i];
                    continue;
                }
                for (var j = 0, jlen = opts.length; j < jlen; j++) {
                    cself[opts[j]] = true;
                }
            }
        }
    }
    public isValid(): boolean {
        try { validate(this); return true; } catch (e) { logit(e); return false; }
    }
    public validate() {
        validate(this);
    }
    public add(opt: Options) {
        add(opt, this);
    }
    public option(opt: Options) {
        add(opt, this);
    }
    public command(cmd: string, opts: Options | Options[]) {
        try {
            opts = opts || [];
            let args = process.argv;
            if (isNull(cmd)) { throw "Command name must be provided. This operation will be ignored."; }
            let cindexCMD = cmd.split(/\s/)[0];
            this._commandIndex.push(cindexCMD);
            if (args[2] == cindexCMD) { this.CommandName = cindexCMD; }
            if (!isArray(opts)) { opts = [opts] as any; }
            for (let i = 0, len = (opts as Options[]).length; i < len; i++) {
                var opt = opts[i];
                if (!isObject(opt)) {
                    error('CLI.command', new Error("Option [" + JSON.stringify(opt) + "] must be an object.  Option will be ignored."));
                    continue;
                }
                opt.command = cmd;
                add(opt, this);
            }
            this.Commands[cmd] = this.Commands[cmd] || [];
            return this;
        } catch (e) {
            error && error('CLI.command', e);
        }
    }
    public action(cb: ActionCallback | GeneratorFunction | AsyncFunction);
    public action(name: string, cb?: ActionCallback);
    public action(name, cb?) {
        let args = process.argv,
            self = this;
        if (isFunction(name) || isGenerator(name) || isAsync(name)) {
            cb = name;
            name = self._commandIndex[self._commandIndex.length - 1];
        }

        if (self.CommandName == name) {
            if (isGenerator(cb)) {
                eval('syncroit(function*(){ return yield* cb.call(self,args[2]); });');
            } else if (isAsync(cb)) {
                eval('(async function (){ return await cb.call(self,args[2]); })();');
            } else {
                cb.call(self, args[2]);
            }
        }
        return self;
    };
    public renderMan() {
        try {
            let nlinetab = "\n\t", dline = "\n\n";
            let commands = "", self = this;
            for (var prop in self.Commands) {
                if (!self.Commands.hasOwnProperty(prop)) { continue; }
                if (!commands) { commands = "ADDITIONAL COMMANDS" + nlinetab; }
                commands += prop + renderOptions(self.Commands[prop], '\t') + '\n' + nlinetab;
            }
            commands += "\n";
            return "NAME" + nlinetab + self.Name + (self.Info ? " -- " + self.Info : "") + dline +
                "SYNOPSIS" + nlinetab + self.Synopsis + dline +
                "DESCRIPTION" + nlinetab + self.Description + dline +
                "OPTIONS" + renderOptions(self.Options) + dline +
                commands +
                "NOTES" + nlinetab + self.Notes + dline;
        } catch (e) {
            error('CLI.renderMan', e);
        }
    }
    public renderHelp() {
        try {
            let nlinetab = "\n\t", dline = "\n\n", self = this;

            let commands = "";
            let hasOptions = !!self.Options.length;
            for (let prop in self.Commands) {
                if (!self.Commands.hasOwnProperty(prop)) { continue; }
                commands += prop + renderOptions(self.Commands[prop], '\t') + '\n' + nlinetab;
                hasOptions = hasOptions || !!self.Commands[prop].length;
            }
            return "Description: " + self.Synopsis + dline +
                "Usage: " + self.ScriptName + (commands && " [command] ") + (hasOptions ? " [options] " : "") + nlinetab + commands + "\n" +
                "Options: " + renderOptions(self.Options) + dline;
        } catch (e) {
            error('CLI.renderMan', e);
        }

    }
    public static exec(command, options?, callback?) {
        return _cli_exec(command, options, callback);
    }
    public exec(command, options?, callback?) {
        return _cli_exec(command, options, callback);
    }
}
export default CLI;