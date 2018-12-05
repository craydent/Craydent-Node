/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    error = $s.error;

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    require($s.dir + 'logit')($s);
    require($s.dir + 'parseBoolean')($s);

    function _cli_exec (command, options, callback) {
        var child = require('child_process');
        if (typeof options == 'function') {
            callback = options;
            options = undefined;
        }
        return new Promise(function(res,rej) {
            try {
                if (!command) { res(false); }
                options = options || {};
                options.silent = !!options.silent;

                var output = '';
                var cprocess = child.exec(command, {env: process.env, maxBuffer: 20 * 1024 * 1024}, function (err) {
                    var fin = !err || options.alwaysResolve ? res : rej
                    var re = callback || fin;
                    if (options.outputOnly) { return re(output); }
                    if (callback) { fin(); return re.call(cprocess, err ? err.code : 0, output); }
                    re({code: err ? err.code : 0, output: output});
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
                error('CLI.exec', e);
            }
        });
    }

    /*----------------------------------------------------------------------------------------------------------------
    /-	CLI Class
    /---------------------------------------------------------------------------------------------------------------*/
    function CLI (params) {
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
        try {
            params = params || {};
            var args = process.argv, self = this, cself = self, sindex = 2,
                _commandIndex = [], _command_possible = args[sindex], _command_removed = false;
            self.Interpreter = args[0];
            self.ScriptPath = args[1];
            self.ScriptName = self.ScriptPath.substring(self.ScriptPath.lastIndexOf('/') + 1);
            self.Name = params.name || "";
            self.Info = params.info || "";
            self.Synopsis = params.synopsis || "";
            self.Copyright = params.copyright || "";
            self.OptionsDescription = params.optionsDescription || "";
            self.Description = params.description || "";
            self.UsingLabels = true;
            self.CommandName = "";
            self.Commands = params.commands || {/*command:[options]*/};
            self.Commands['*'] = self.Commands['*'] || [];
            self.Options = [/*{
            option: "-c",
            type:"string",
            description:"",
            default:"",
            command:"",
            required:false
            }*/];
            if (params.options) {
                for (var i = 0, len = params.options.length; i < len; i++) {
                    add(params.options[i]);
                }
            }
            self.Arguments = [];
            self.Notes = params.notes || "";
            self.isMan = false;
            self.isHelp = false;

            if (args[sindex] != "man" && self.Commands[args[sindex]]) {
                self.CommandName = args[sindex++];
            } else if (!~_commandIndex.indexOf('*') && args[sindex] && args[sindex][0] == "-") {
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
            for (var i = sindex, len = args.length; i < len; i++) {
                var arg = args[i];
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
                        cself[$s.strip(arg,'-')] = true;
                        continue;
                    }
                    i++;
                    cself[$s.strip(arg,'-')] = args[i];
                } else if (arg[0] == '-') { // this is a single char label
                    var opts = $s.strip(arg,'-');
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
            self.isValid = function () {
                try { validate(); return true;} catch (e) { $s.logit(e); return false;}
            };
            self.validate = validate;
            function processOptions (option, value) {
                value = value || {};
                if (!$s.isObject(option)) { throw "Error: Option [" + JSON.stringify(option) + "] must be an object.  Option will be ignored."; }
                if (!option.option) { return [option]; }
                var o = option.option.split(',');
                if (o.length === 1) { return [option]; }
                var arr = [];
                for (var i = 0, len = o.length; i < len; i++) {
                    var prop = $s.strip(o[i], '-');
                    if (prop != "name" && self[prop]) { value.value = self[prop]; }
                    arr.push({
                        option:o[i],
                        type:option.type,
                        description:option.description,
                        default:option.default,
                        command:option.command,
                        required:option.required,
                        _property: prop
                    });
                }
                return arr;
            }
            function validate () {
                var options = self.Options;
                if (self.CommandName) {
                    options = self.Commands[self.CommandName] || [];
                }

                for (var i = 0, len = options.length; i < len; i++) {
                    var option = options[i], copt = $s.strip(option.option.split(',')[0],'-');
                    if (self[copt] === undefined) { self[copt] = self.UsingLabels && self.Arguments[i] || option.default; }
                    if (option.required && $s.isNull(self[copt])) {
                        throw 'Option ' + option.option + ' is required.';
                    } else if (option.type && !$s.isNull(self[copt])){
                        switch (option.type.toLowerCase()) {
                            case "number":
                                self[copt] = isNaN(Number(self[copt])) ? self[copt] : Number(self[copt]);
                                break;
                            case "array":
                            case "object":
                                self[copt] = $s.tryEval(self[copt],JSON.parseAdvanced) || self[copt];
                                break;
                            case "bool":
                            case "boolean":
                                var tmp = $s.parseBoolean(self[copt]);
                                self[copt] =  $s.isNull(tmp) ? self[copt] : tmp;
                                break;
                        }
                        if (typeof self[copt] != option.type) {
                            throw 'Option ' + option.option + ' must be a ' + option.type + '.';
                        }
                    }
                }
            }
            function add (opt) {
                try {
                    opt.command = opt.command || "*";
                    var value = {}, popt = processOptions(opt, value), options = self.Options;
                    options = self.Commands[opt.command] = self.Commands[opt.command] || [];
                    _commandIndex.push(opt.command);
                    if (!$s.isNull(_command_possible) && _command_possible == opt.command) {
                        for (var i = 0, len = self.Commands['*'].length; i < len; i++) {
                            var topt = processOptions(self.Commands['*'][i]);

                            for (var j = 0, jlen = topt.length; j < jlen; j++) {
                                delete self[topt[j]._property];
                            }
                        }
                        self.CommandName = _command_possible;
                        _command_possible = null;
                    }
                    if(self.CommandName == opt.command) {
                        if (self.Arguments[0] == self.CommandName && !_command_removed) {
                            _command_removed = true;
                            self.Arguments.splice(0,1);
                        }
                        var val = !self.UsingLabels && self.Arguments[options.length] || value.value || opt.default;
                        for (var i = 0, len = popt.length; i < len && !$s.isNull(val); i++) {
                            var v = val;
                            switch (popt[i].type.toLowerCase()) {
                                case "number":
                                    v = Number(v);
                                    v = isNaN(v) ? Number(popt[i].default) : v;
                                    break;
                                case "array":
                                case "object":
                                    v = $s.tryEval(v,JSON.parseAdvanced) || v;
                                    break;
                                case "bool":
                                case "boolean":
                                    var tmp = $s.parseBoolean(v);
                                    v =  $s.isNull(tmp) ? v : tmp;
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
            self.add = self.option = add;
            self.command = function (cmd, opts) {
                try {
                    opts = opts || [];
                    if ($s.isNull(cmd)) { throw "Command name must be provided. This operation will be ignored."; }
                    var cindexCMD = cmd.split(/\s/)[0];
                    _commandIndex.push(cindexCMD);
                    if (args[2] == cindexCMD) { self.CommandName = cindexCMD; }
                    if (!$s.isArray(opts)) { opts = [opts]; }
                    for (var i = 0, len = opts.length; i < len; i++) {
                        var opt = opts[i];
                        if (!$s.isObject(opt)) {
                            error('CLI.command', new Error("Option [" + JSON.stringify(opt) + "] must be an object.  Option will be ignored."));
                            continue;
                        }
                        opt.command = cmd;
                        add(opt);
                    }
                    self.Commands[cmd] = self.Commands[cmd] || [];
                    return self;
                } catch (e) {
                    error('CLI.command', e);
                }
            };
            self.action = function (name, cb) {
                if ($s.isFunction(name) || $s.isGenerator(name) || $s.isAsync(name)) {
                    cb = name;
                    name = _commandIndex[_commandIndex.length - 1];
                }

                if (self.CommandName == name) {
                    if ($s.isGenerator(cb)) {
                        eval('$s.syncroit(function*(){ return yield* cb.call(self,args[2]); });');
                    } else if ($s.isAsync(cb)) {
                        eval('(async function (){ return await cb.call(self,args[2]); })();');
                    } else {
                        cb.call(self, args[2]);
                    }
                }
                return self;
            };
            self.renderMan = function () {
                try {
                    var nlinetab = "\n\t", dline = "\n\n";
                    var commands = "";
                    for (var prop in self.Commands) {
                        if (!self.Commands.hasOwnProperty(prop)) { continue; }
                        if (!commands) { commands = "ADDITIONAL COMMANDS" + nlinetab; }
                        commands += prop + renderOptions(self.Commands[prop],'\t',nlinetab) + '\n' + nlinetab;
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

            };
            var renderOptions = function (options, extratabs) {
                extratabs = extratabs || "";
                var content = "", nlinetab = "\n\t";
                for (var i = 0, len = options.length; i < len; i++) {
                    var option = options[i], optnames = (option.option || "").split(","), sep = "";
                    if (optnames.length > 1) {
                        optnames.sort(function (a, b) { return a.length - b.length; });
                        sep = ",";
                    }
                    content += nlinetab + extratabs + optnames[0] + sep + "\t\t" + (option.type ? "(" + option.type + ")" : "") + " " + option.description + (option.required ? "(required)" : "");
                    for (var j = 1, jlen = optnames.length; j < jlen; j++) {
                        if (j + 1 == jlen) { sep = ""; }
                        content += nlinetab + extratabs + optnames[j] + sep;
                    }
                }
                return content;
            };
            self.renderHelp = function () {
                try {
                    var nlinetab = "\n\t", dline = "\n\n";

                    var commands = "";
                    var hasOptions = !!self.Options.length;
                    for (var prop in self.Commands) {
                        if (!self.Commands.hasOwnProperty(prop)) { continue; }
                        commands += prop + renderOptions(self.Commands[prop],'\t', nlinetab) + '\n' + nlinetab;
                        hasOptions = hasOptions || !!self.Commands[prop].length;
                    }
                    return "Description: " + self.Synopsis + dline +
                        "Usage: " + self.ScriptName + (commands && " [command] ") + (hasOptions ? " [options] " : "") + nlinetab + commands + "\n" +
                        "Options: " + renderOptions(self.Options) + dline;
                } catch (e) {
                    error('CLI.renderMan', e);
                }

            };
            self.exec = _cli_exec;
            return self;
        } catch (e) {
            error('CLI', e);
        }
    }
    CLI.exec = _cli_exec;

    $c.CLI = CLI;

    module.exports = $c;
}