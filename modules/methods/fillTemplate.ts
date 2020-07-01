/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import addFlags from './addFlags';
import condense from './condense';
import contains from './contains';
import count from './count';
import cut from './cut';
import eachProperty from './eachProperty';
import foo from './foo';
import getProperty from './getProperty';
import isArray from './isArray';
import isFunction from './isFunction';
import isNull from './isNull';
import isString from './isString';
import indexOfAlt from './indexOfAlt';
import isObject from './isObject';
import merge from './merge';
import OrderedList from './orderedList';
import removeAt from './removeAt';
import replaceAll from './replaceAll';
import startsWithAny from './startsWithAny';
import strip from './strip';
import suid from './suid';
import parseRaw from './parseRaw';
import { AnyObjects, AnyObject } from '../models/Arrays';

interface EchoFunction extends Function {
    out?: string;
}
interface Block {
    id: string;
    block: string;
    body: string;
    code: string;
}
var scope,

    _template_config = {
        IGNORE_CHARS: ['\n', '\r'],
        // IGNORE_CHARS: [],
        /* loop config */
        FOR: {
            "begin": /(?:\$\{for (.*?);(.*?);(.*?\}?)\})|(?:\{\{for (.*?);(.*?);(.*?\}?)\}\})/i,
            "end": /(\$\{end for\})|(\{\{end for\}\})/i,
            "helper": function (code, body, options) {
                var ttc = scope.ctx.TEMPLATE_TAG_CONFIG,
                    mresult = code.match(options.removeNewLineFromLogicalSyntax ?
                        new RegExp(ttc.FOR.begin.source + '', ttc.FOR.begin.flags) :
                        ttc.FOR.begin),
                    condition, exec, dvars, vars = "", ovars = {}, code_result = "";

                for (var j = 1, jlen = mresult.length; j < jlen; j++) {
                    if (!mresult[j]) { continue; }
                    mresult[j] = replaceAll(mresult[j], ['\\[', '\\]'], ['[', ']']).toString();
                }

                condition = ttc.VARIABLE_NAME(mresult[2] || mresult[5] || "");
                exec = ttc.VARIABLE_NAME(mresult[3] || mresult[6] || "");
                dvars = ttc.VARIABLE_NAME(mresult[1] || mresult[4] || "").split(',');

                for (var i = 0, len = dvars.length; i < len; i++) {
                    var dvar = dvars[i];
                    var parts = dvar.split('=');
                    vars += "var " + parts[0] + "=" + parts[1] + ";";
                    ovars[parts[0]] = parts[0];
                }
                eval(vars);
                while (eval(scope.ctx.fillTemplate(condition, ovars))) {
                    code_result += "${i=" + i + ",''}" + body;
                    eval(exec);
                }

                return code_result;
            },
            "parser": function (code, oobj, bind, options) {
                var ttc = scope.ctx.TEMPLATE_TAG_CONFIG,
                    FOR = ttc.FOR,
                    blocks = __processBlocks(FOR.begin, FOR.end, code),
                    code_result = "",
                    i = 0, obj;

                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id;

                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = replaceAll(code_result, id, FOR.helper(block, obj.body, options));
                }
                var ____execMatches = code_result.match(scope.ctx.TEMPLATE_TAG_CONFIG.VARIABLE), ____execMatchIndex = 0;

                while (____execMatchIndex < ____execMatches.length) {
                    code_result = code_result.replace(____execMatches[____execMatchIndex], scope.tryEval(ttc.VARIABLE_NAME(____execMatches[____execMatchIndex])));
                    ____execMatchIndex++;
                }
                if (code == code_result) { code_result = ""; }
                return __logic_parser(code_result);
            }
        },
        FOREACH: {
            "begin": /(?:\$\{foreach (.*?)\s+in\s+(.*?)\s*\})|(?:\{\{foreach (.*?)\s+in\s+(.*?)\s*\}\})/i,
            "end": /(?:\$\{end foreach\})|(?:\{\{end foreach\}\})/i,
            "helper": function (code, body, rtnObject, uid, obj, bind, ref_obj) {
                var ttc = scope.ctx.TEMPLATE_TAG_CONFIG,
                    FOREACH = ttc.FOREACH,
                    mresult = code.match(FOREACH.begin),
                    objs, var_name,
                    code_result = "";

                for (var j = 0, jlen = mresult.length; j < jlen; j++) {
                    if (!mresult[j]) { continue; }
                    mresult[j] = replaceAll(mresult[j], ['\\[', '\\]'], ['[', ']']).toString();
                }
                var value = mresult[2] || mresult[4];
                objs = scope.tryEval(value);
                if (!objs && startsWithAny(value, "${", "{{") && !value.endsWith("}")) {
                    return code;
                }
                var_name = ttc.VARIABLE_NAME(mresult[1] || mresult[3]);


                rtnObject = rtnObject || {};
                var vname = var_name + suid();
                rtnObject[uid] += "var " + vname + "s," + var_name + ";";
                rtnObject[vname + "s"] = objs;
                if (isArray(objs)) {
                    var i = 0, len = objs.length;
                    while (i < len) {
                        code_result += "${i=" + i + "," + var_name + "=" + vname + "s[i],null}" + body;
                        i++;
                    }
                }

                return objs ? code_result : "";

            },
            "parser": function (code, ref_obj, bind) {
                var ttc = scope.ctx.TEMPLATE_TAG_CONFIG,
                    FOREACH = ttc.FOREACH,
                    uid = "##" + suid() + "##",
                    result_obj = {},
                    code_result = "", post = "",
                    blocks = __processBlocks(FOREACH.begin, FOREACH.end, code),
                    i = 0, obj;

                result_obj[uid] = "";

                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id, index;
                    if (i == 1 && ~(index = obj.code.lastIndexOf("##"))) {
                        post = obj.code.substring(index + 2);
                        obj.code = obj.code.substring(0, index + 2);
                    }
                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = replaceAll(code_result, id, FOREACH.helper(block, obj.body, result_obj, uid, obj, bind, ref_obj));
                    if (!code_result) { break; }
                }
                eval(result_obj[uid]);
                delete result_obj[uid];
                for (var prop in result_obj) {
                    if (!result_obj.hasOwnProperty(prop)) { continue; }
                    eval(prop + "=" + "result_obj['" + prop + "']");
                }

                var matches = code_result.match(ttc.VARIABLE) || [];
                for (var m = 0, mlen = matches.length; m < mlen; m++) {
                    var var_match = matches[m];
                    var var_match_name = ttc.VARIABLE_NAME(var_match),
                        str = "";
                    try {
                        str = eval(var_match_name);
                    } catch (e) { continue; }
                    if (isObject(str) || isArray(str)) {
                        str = "scope.ctx.fillTemplate.refs['" + __add_fillTemplate_ref(str as any) + "']";
                    }
                    code_result = code_result.replace(var_match, str || "");
                }
                if (code == code_result + post) { code_result = ""; }
                return __logic_parser(code_result + post, obj, bind);
            }
        },
        WHILE: {
            "begin": /(?:\$\{while\s*\((.*?)\)\s*\})|(?:\{\{while\s*\((.*?)\)\s*\}\})/i,
            "end": /(?:\$\{end while\})|(?:\{\{end while\}\})/i,
            "helper": function (code, body) {
                var ttc = scope.ctx.TEMPLATE_TAG_CONFIG,
                    WHILE = ttc.WHILE,
                    mresult = code.match(WHILE.begin),
                    vars = "", ovars = {}, code_result = "",
                    declared = scope.ctx.fillTemplate.declared,
                    loop_limit = 100000;
                for (var prop in declared) {
                    if (!declared.hasOwnProperty(prop) || !~code.indexOf("${" + prop + "}")) {
                        // if (!~code.indexOf("${" + prop + "}") || !declared.hasOwnProperty(prop)) {
                        continue;
                    }
                    var val = declared[prop];
                    vars += "var " + prop + "=" + val + ";";
                    ovars[prop] = prop;
                }
                eval(vars);
                while (eval(scope.ctx.fillTemplate(mresult[1] || mresult[2], ovars))) {
                    loop_limit--;
                    if (loop_limit < 1) {
                        var msg = "fillTemplate While only support up to 100,000 iterations.  Possible infinite loop?";
                        console.error(msg);
                        throw msg;
                    }
                    code_result += body;
                    var matches = body.match(ttc.VARIABLE) || [];
                    for (var m = 0, mlen = matches.length; m < mlen; m++) {
                        eval(ttc.VARIABLE_NAME(matches[m]));
                    }
                }
                scope.ctx.fillTemplate.declared = declared;

                var variable_initialization = "";
                for (var prp in ovars) {
                    if (!ovars.hasOwnProperty(prp)) { continue; }
                    variable_initialization += "${" + prp + "=" + declared[prp] + ",null}";
                }

                return variable_initialization + code_result;
            },
            "parser": function (code, ref_obj, bind) {
                var ttc = scope.ctx.TEMPLATE_TAG_CONFIG,
                    WHILE = ttc.WHILE,
                    lookups = {},
                    blocks = __processBlocks(WHILE.begin, WHILE.end, code, lookups),
                    code_result = "", vars = "", declared = scope.ctx.fillTemplate.declared, post = "",
                    i = 0, obj;

                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id, index;

                    if (i == 1 && ~(index = obj.code.lastIndexOf("##"))) {
                        post = obj.code.substring(index + 2);
                        obj.code = obj.code.substring(0, index + 2);
                    }

                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = replaceAll(code_result, id, WHILE.helper(block, obj.body));
                }

                for (var prop in declared) {
                    if (!declared.hasOwnProperty(prop) || !~code.indexOf("${" + prop + "}")) { continue; }
                    vars += "var " + prop + "=" + declared[prop] + ";";
                }
                eval(vars);
                var matches = code_result.match(ttc.VARIABLE) || [];
                for (var m = 0, mlen = matches.length; m < mlen; m++) {
                    var var_match = matches[m],
                        var_match_name = ttc.VARIABLE_NAME(var_match),
                        var_match_index = code_result.indexOf(var_match),
                        before, after;
                    if (scope.tryEval(var_match_name + ";") !== null) {
                        var_match_index += var_match.length;
                    }

                    before = replaceAll(code_result.substring(0, var_match_index), var_match, eval(var_match_name));
                    after = code_result.substring(code_result.indexOf(var_match) + var_match.length);
                    code_result = before + after;
                }
                if (code == code_result + post) { code_result = ""; }
                return __logic_parser(code_result + post);

            }
        },
        /* end loop config*/

        /* conditional config*/
        IF: {
            "begin": /\$\{if\s+\((.*?)(?!\{)\)\s*\}|\{\{if\s+\((.*?)(?!\{)\)\s*\}\}/i,
            "elseif": /\$\{elseif\s+\((.*?)(?!\{)\)\s*\}|\{\{elseif\s+\((.*?)(?!\{)\)\s*\}\}/i,
            "else": /\$\{else\}|\{\{else\}\}/i,
            "end": /\$\{end if\}|\{\{end if\}\}/i,
            "helper": function (code) {
                var IF = scope.ctx.TEMPLATE_TAG_CONFIG.IF,
                    ifmatch = condense((code.match(IF.begin) || [])),
                    endlength = code.match(IF.end)[0].length,
                    startindex = indexOfAlt(code, IF.begin),
                    endindex = indexOfAlt(code, IF.end),
                    vsyntax = scope.ctx.TEMPLATE_TAG_CONFIG.VARIABLE;

                if (ifmatch.length) {
                    for (var j = 1, jlen = ifmatch.length; j < jlen; j++) {
                        var ifm = ifmatch[j] as string;
                        ifmatch[j] = replaceAll(ifm, ['\\[', '\\]'], ['[', ']']).toString();
                    }
                    var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                        ifsyntax = new RegExp(IF.begin.source + "|" + IF.elseif.source + "|" + IF["else"].source, 'i');

                    if (!code.match(new RegExp(IF.elseif.source + "|" + IF["else"].source, 'ig'))) {
                        if ("undefined" == ifmatch[1] || !scope.tryEval(ifmatch[1])) {
                            return pre + post;
                        }
                        return pre + code.substring(startindex + (ifmatch[0] as string[]).length, endindex) + post;
                    }
                    ifmatch = condense((code.match(addFlags(ifsyntax, 'g')) || []));
                    for (var i = 0, len = ifmatch.length; i < len; i++) {
                        var ifm2 = ifmatch[i] as string,
                            ife = condense(ifm2.match(ifsyntax)),
                            condition = ife[1],
                            value = "undefined" == condition ? false : scope.tryEval(condition),
                            sindex = code.indexOf(ifm2) + ifm2.length;

                        if (condition && condition.length && condition != 'null' && !contains(condition, vsyntax) && value === null) {
                            value = condition;
                        }

                        if (value !== undefined && value) {
                            var eindex = code.indexOf(ifmatch[i + 1]);
                            if (!~eindex) {
                                return pre + code.substring(sindex, endindex) + post;
                            }
                            return pre + code.substring(sindex, eindex) + post;
                        } else if (ifm2.match(IF["else"])) {
                            return pre + code.substring(sindex, endindex) + post;
                        }
                    }
                    return pre + post;
                }
                return code;
            },
            "parser": function (code, oobj, bind) {
                var IF = scope.ctx.TEMPLATE_TAG_CONFIG.IF,
                    blocks = __processBlocks(IF.begin, IF.end, code),
                    code_result = "",
                    i = 0, obj;
                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id;

                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = IF.helper(code_result.replace(id, block));
                }
                if (code == code_result) { code_result = ""; }
                return __logic_parser(code_result);
            }
        },
        SWITCH: {
            "begin": /(\$\{switch\s+\((.*?)\)\s*\})|(\{\{switch\s+\((.*?)\)\s*\}\})/i,
            "end": /(\$\{end switch\})|(\{\{end switch\}\})/i,
            "case": /(?:\$\{case\s+(.*?)\s*?:\})|(?:\{\{case\s+(.*?)\s*?:\}\})/i,
            "default": /(\$\{default\})|(\{\{default\}\})/i,
            "break": /(\$\{break\})|(\{\{break\}\})/i,
            "helper": function (code) {
                var SWITCH = scope.ctx.TEMPLATE_TAG_CONFIG.SWITCH,
                    switchmatch = condense((code.match(SWITCH.begin) || [])),
                    endlength = code.match(SWITCH.end)[0].length,
                    startindex = indexOfAlt(code, SWITCH.begin),
                    endindex = indexOfAlt(code, SWITCH.end),
                    brk = SWITCH["break"], dflt = SWITCH["default"];


                if (switchmatch.length) {
                    for (var j = 1, jlen = switchmatch.length; j < jlen; j++) {
                        var swmatch = switchmatch[j] as string;
                        switchmatch[j] = replaceAll(swmatch, ['\\[', '\\]'], ['[', ']']).toString();
                    }
                    var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                        val = scope.tryEval(switchmatch[2]) || switchmatch[2],
                        cgsyntax = addFlags(SWITCH["case"], "g"),
                        cases = code.match(cgsyntax);
                    code = code.substring(startindex + (switchmatch[0] as string || "").length, endindex);

                    if (!cases) {
                        return pre + cut(code, startindex, endindex + endlength) + post;
                    }
                    for (var i = 0, len = cases.length; i < len; i++) {
                        var cse = cases[i],
                            cs = cse.match(SWITCH["case"]),
                            cvalue = cs[1] || cs[2];
                        cvalue = scope.tryEval(cvalue) || cvalue;
                        if (val == cvalue) {
                            var cindex = code.indexOf(cse),
                                bindex = indexOfAlt(code, brk, cindex);
                            bindex = !~bindex ? code.length : bindex;
                            return pre + code.substring(cindex + cse.length, bindex).replace(cgsyntax, '') + post;
                        }
                    }
                    var dindex = indexOfAlt(code, dflt);
                    if (~dindex) {
                        return pre + code.substring(dindex + code.match(dflt)[0].length).replace(cgsyntax, '').replace(brk, '') + post;
                    }

                }
                return code;
            },
            "parser": function (code, oobj, bind) {
                var SWITCH = scope.ctx.TEMPLATE_TAG_CONFIG.SWITCH,
                    blocks = __processBlocks(SWITCH.begin, SWITCH.end, code),
                    code_result = "", i = 0, obj;
                while (obj = blocks[i++]) {
                    var block = obj.block,
                        id = obj.id;

                    code_result = code_result || obj.code;
                    if (!~code_result.indexOf(obj.id)) { continue; }
                    code_result = SWITCH.helper(code_result.replace(id, block));
                }
                if (code == code_result) { code_result = ""; }
                return __logic_parser(code_result);
            }

        },
        /* end conditional config*/

        /* error handling and execution config */
        SCRIPT: {
            "begin": /(\$\{script\})|(\{\{script\}\})/i,
            "end": /(\$\{end script\})|(\{\{end script\}\})/i,
            "parser": function (code, obj, bind) {
                var SCRIPT = scope.ctx.TEMPLATE_TAG_CONFIG.SCRIPT,
                    sindex = indexOfAlt(code, SCRIPT.begin),
                    slen = code.match(SCRIPT.begin)[0].length,
                    eindex = indexOfAlt(code, SCRIPT.end),
                    elen = code.match(SCRIPT.end)[0].length;

                if (!~eindex) {
                    eindex = undefined;
                }
                var block = code.substring(sindex + slen, eindex),
                    echo = function (value) {
                        echo.out += value;
                    } as EchoFunction;
                echo.out = "";
                let str = eval("(function(){" + block + ";return echo.out;})()");

                return __logic_parser(cut(code, sindex, eindex + elen, str));
            }

        },
        TRY: {
            "begin": /(\$\{try\})|(\{\{try\}\})/i,
            "catch": /(?:\$\{catch\s+\((.*)?\)\s*\})|(?:\{\{catch\s+\((.*)?\)\s*\}\})/i,
            "finally": /(\$\{finally\})|(\{\{finally\}\})/i,
            "end": /(\$\{end try\})|(\{\{end try\}\})/i,
            "helper": function (code, lookups, exec) {
                var TRY = scope.ctx.TEMPLATE_TAG_CONFIG.TRY,
                    cindex = indexOfAlt(code, TRY["catch"]),
                    findex = indexOfAlt(code, TRY["finally"]),
                    eindex = indexOfAlt(code, TRY["end"]),
                    tend = cindex;

                if (!~tend) {
                    tend = ~findex ? findex : eindex;
                }

                var tindex = indexOfAlt(code, TRY.begin),
                    body = code.substring(tindex + code.match(TRY.begin)[0].length, tend),
                    pre = code.substring(0, tindex), post = code.substring(eindex + code.match(TRY.end)[0].length),
                    regex = /##[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}##/i,
                    match = body.match(regex), str = "", id,
                    echo = function (value) {
                        echo.out += value;
                    } as EchoFunction;
                echo.out = "";
                while (match && match.length) {
                    id = match.splice(0)[0];
                    body = body.replace(id, ";echo('" + TRY.helper(lookups[id], lookups) + "');");
                }
                match = pre.match(regex);
                while (match && match.length) {
                    id = match.splice(0)[0];
                    pre = pre.replace(id, TRY.helper(lookups[id], lookups));
                }
                match = post.match(regex);
                while (match && match.length) {
                    id = match.splice(0)[0];
                    post = post.replace(id, TRY.helper(lookups[id], lookups));
                }
                exec && eval(exec);
                try {
                    str = eval("(function(){" + body + ";return echo.out; })()");
                } catch (e) {
                    if (~cindex) {
                        tend = ~findex ? findex : eindex;
                        var catchBlock = code.substring(cindex, tend),
                            catchLine = catchBlock.match(TRY["catch"]),
                            errorString = replaceAll(e.toString(), '\'', '\\\'');
                        catchBlock = catchBlock.replace(catchLine[0], '');

                        match = catchBlock.match(regex);
                        while (match && match.length) {
                            id = match.splice(0)[0];
                            catchBlock = catchBlock.replace(id, ";echo('" + TRY.helper(lookups[id], lookups, "var " + catchLine[1] + "= new Error('" + errorString + "');") + "');");
                        }
                        str += eval("(function(" + catchLine[1] + "){" + catchBlock + ";return echo.out;})(new Error('" + errorString + "'))");
                    }
                } finally {
                    if (~findex) {
                        echo.out = "";
                        str += eval("(function(){" + code.substring(findex + code.match(TRY["finally"])[0].length, eindex) + ";return echo.out; })()");
                    }
                }
                return pre + str + post;
            },
            "parser": function (code, oobj, bind) {
                var TRY = scope.ctx.TEMPLATE_TAG_CONFIG.TRY,
                    lookups = {},
                    blocks = __processBlocks(TRY.begin, TRY.end, code, lookups);

                var obj = blocks[0],
                    block = obj.block,
                    id = obj.id;

                return __logic_parser(TRY.helper(obj.code.replace(id, block), lookups));
            }

        },
        /* end error handling config */

        /* tokens config */
        VARIABLE: /(?:\$\{((?!\$)\S)*?\})|(?:\{\{((?!\{\{)\S)*?\}\})/gi,
        VARIABLE_NAME: function (match) {
            return match.slice(2, ~match.indexOf('}}') ? -2 : -1);
        },
        DECLARE: {
            "syntax": /(?:\$\{declare (.*?);?\})|(?:\{\{declare (.*?);?\}\})/i,
            "parser": function (htmlTemplate, declare) {
                var matches = declare.match(scope.ctx.TEMPLATE_TAG_CONFIG.DECLARE.syntax);
                /*,
                 var_nameValue = (matches[1]||matches[2]).strip(';').split("=");

                 scope.ctx.fillTemplate.declared[var_nameValue[0]] = var_nameValue[1];*/
                merge(scope.ctx.fillTemplate.declared, scope.tryEval('({' + replaceAll(matches[1], '=', ':') + '})'));
                return replaceAll(htmlTemplate, declare, '');
            }
        }
        /* end tokens config */
    },
    _template_config_str;

function __add_fillTemplate_ref(obj: AnyObject): string {
    try {
        const uid = suid();
        scope.ctx.fillTemplate.refs[`ref_${scope.ctx.fillTemplate.refs.length}`] = uid;
        scope.ctx.fillTemplate.refs[uid] = obj;
        scope.ctx.fillTemplate.refs.push(obj);
        return uid;
    } catch (e) {
        error && error('fillTemplate.__add_fillTemplate_ref', e);
        return null;
    }
}
function __and(...args): any {
    try {
        let a = 0;
        for (let len = arguments.length; a < len; a++) {
            let arg = arguments[a];
            if (!arg) { return ""; }
        }
        return arguments[a - 1];
    } catch (e) {
        error && error('fillTemplate.__and', e);
        return null;
    }
}
function __count(arr: any[]): number {
    try {
        return arr.length;
    } catch (e) {
        error && error('fillTemplate.count', e);
        return null;
    }
}
function __enum(obj: any[] | AnyObject, delimiter?: string, prePost?: [string, string]): string {
    try {
        delimiter = delimiter || ", ";
        prePost = prePost || ["", ""];
        let props = [],
            str = "";
        if (isArray(obj)) {
            props = obj.slice(0);
        } else if (isObject(obj)) {
            for (let prp in obj) {
                if (obj.hasOwnProperty(prp)) {
                    props.push(prp);
                }
            }
        }
        for (let i = 0, len = props.length; i < len; i++) {
            let prop = props[i];
            let pre = replaceAll(prePost[0], ['{ENUM_VAR}', '{ENUM_VAL}'], [prop, obj[prop]]),
                post = replaceAll(prePost[1], ['{ENUM_VAR}', '{ENUM_VAL}'], [prop, obj[prop]]);
            str += pre + prop + post + delimiter;
        }
        return str.slice(0, -1 * delimiter.length);
    } catch (e) {
        error && error('fillTemplate.enum', e);
        return null;
    }
}
function __logic_parser(code: string, obj?: AnyObject, bind?: string, options?): string {
    if (!code) { return ""; }
    let ttc = scope.ctx.TEMPLATE_TAG_CONFIG, indexes = [], logic = {};
    code = replaceAll(code, ttc.IGNORE_CHARS, ['']);
    eachProperty(ttc, function (value) {
        if (!value.begin) { return; }
        let index = indexOfAlt(code, value.begin);
        indexes.push(index);
        logic[index] = value;
        return false;
    });
    let index = Math.min.apply(Math, condense(indexes, [-1]));

    if (!logic[index]) { return code; }

    return code.substring(0, index) + logic[index].parser(code.substring(index), obj, bind, options);
}
function __or(...args): any {
    try {
        for (let a = 0, len = arguments.length; a < len; a++) {
            let arg = arguments[a];
            if (arg) { return arg; }
        }
        return "";
    } catch (e) {
        error && error('fillTemplate.__or', e);
        return null;
    }
}
function __processBlocks(start: RegExp, end: RegExp, code: string, lookups?: AnyObject): Block[] {
    lookups = lookups || {};
    let blocks: Block[] = [], sindexes = [], sindex = 0, eindexes = [], eindex = 0;
    while (~(sindex = indexOfAlt(code, start, sindex)) && ~(eindex = indexOfAlt(code, end, eindex))) {
        ~sindex && (sindexes.push(sindex), sindex++);
        ~eindex && (eindexes.push(eindex), eindex++);
    }
    // if true syntax error, start end missmatch
    if (sindexes.length != eindexes.length) {
        blocks.push({ id: `##${suid()}##`, block: "", body: "", code: code });
        return blocks;
    }

    let pairs = new OrderedList([], function (a, b) {
        if (a.end < b.end) { return -1; }
        if (a.end > b.end) { return 1; }
        return 0;
    });

    while (sindexes.length) {
        var e = 0;
        while (eindexes[0] > sindexes[e]) {
            e++;
        }
        e--;
        pairs.add({ begin: sindexes[e], end: eindexes[0] });
        removeAt(sindexes, e);
        removeAt(eindexes, 0);
    }

    let endlength = code.match(end)[0].length;
    let k = 0, pair;
    while (pair = pairs[k++]) {
        let uid = `##${suid()}##`,
            block = code.slice(pair.begin, pair.end + endlength),
            beginLength = block.match(start)[0].length,
            body = code.slice(pair.begin + beginLength, pair.end);
        code = code.replace(block, uid);
        blocks.push({ id: uid, block: block, body: body, code: code });
        lookups[uid] = block;

        let i = k, pair2;
        while (pair2 = pairs[i++]) {
            let offset = block.length - uid.length;
            pair2.end -= offset;
            if (pair2.begin > pair.end) {
                pair2.begin -= offset;
            }
        }
    }

    return blocks.reverse();
}
function __run_replace(reg: RegExp, template: string, use_run: boolean, obj: AnyObject): string {
    try {
        let pre = "", post = "", split_param: string | RegExp = "|", match: RegExpExecArray;
        use_run && (pre = "RUN[", post = "]", split_param = /;(?!\\)/);

        while ((match = reg.exec(template)) && match[1]) {
            let funcValue = [],
                func = "";

            funcValue = replaceAll(match[1], ['\\[', '\\]'], ['[', ']']).split(split_param);
            while (count(funcValue[0], "{") != count(funcValue[0], "}")) {
                if (scope.tryEval(funcValue[0])) { break; }
                funcValue[0] += (isString(split_param) ? split_param : ";") + funcValue[1];
                funcValue.splice(1, 1);
            }
            func = strip(funcValue.splice(0, 1)[0], ";");
            for (let i = 0, len = funcValue.length; i < len; i++) {
                let fv = funcValue[i];
                if (~fv.indexOf("${")) {
                    funcValue[i] = scope.ctx.fillTemplate(fv, obj);
                }
                try {
                    funcValue[i] = eval(`(${replaceAll(fv, [';\\'], [';'])})`);
                } catch (e) { }
            }
            funcValue = funcValue.map(function (item) { return scope.tryEval(item) || item; });
            template = ~template.indexOf(match[1]) ? template.replace(match[1], (match[1] = replaceAll(match[1], ['\\[', '\\]'], ['[', ']']))) : template;
            template = replaceAll(template, `\${${pre + match[1] + post}}`,
                getProperty($g, func) ? getProperty($g, func).apply(obj, funcValue) : (scope.tryEval(`(${func})`) || foo).apply(obj, funcValue) || "");
        }
        return template;
    } catch (e) {
        error && error('fillTemplate.__run_replace', e);
        return null;
    }
}


export default function fillTemplate(htmlTemplate: string, objs: AnyObjects | AnyObject): string;
export default function fillTemplate(htmlTemplate: string, objs: AnyObjects | AnyObject, offset?: number, max?: number, newlineToHtml?: boolean, preserve_nonmatching?: boolean, removeNewLineFromLogicalSyntax?: boolean): string;
export default function fillTemplate(htmlTemplate, objs, offset?, max?, newlineToHtml?, preserve_nonmatching?, removeNewLineFromLogicalSyntax?): string {
    /*|{
        "info": "Function for templetizing",
        "category": "Template",
        "featured": true,
        "parameters":[
            {"htmlTemplate": "(String) Template to be used"},
            {"objs": "(Object[]) Objects to fill the template variables"},
            {"options": "(FillTemplateOptions) Options to use: max,offset,newlineToHtml,preserveNonMatching,removeNewLineFromLogicalSyntax"}],

        "overloads":[
            {"parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Object[]) Objects to fill the template variables"},
                {"max": "(Int) The maximum number of records to process"}]},

            {"parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Object[]) Objects to fill the template variables"},
                {"offset": "(Int) The start index of the Object array"},
                {"max": "(Int) The maximum number of records to process"}]},

            {"parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Object[]) Objects to fill the template variables"},
                {"offset": "(Int) The start index of the Object array"},
                {"max": "(Int) The maximum number of records to process"},
                {"newlineToHtml":"(Boolean) Flag to replace all new line chars (\\n) to the HTML <br /> tag.  Default is true."}]},

            {"parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Object[]) Objects to fill the template variables"},
                {"offset": "(Int) The start index of the Object array"},
                {"max": "(Int) The maximum number of records to process"},
                {"newlineToHtml":"(Boolean) Flag to replace all new line chars (\\n) to the HTML <br /> tag.  Default is true."},
                {"preserveNonMatching":"(Boolean) Flag to used to leave template variables that were not replaced."},
                {"removeNewLineFromLogicalSyntax":"(Boolean) Flag to used to remove new lines from logical syntax."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#fillTemplate",
        "returnType": "(String)"
    }|*/
    try {
        $c.TEMPLATE_TAG_CONFIG.IGNORE_CHARS = (scope.ctx.TEMPLATE_TAG_CONFIG.IGNORE_CHARS || []).map(function (char) {
            if (char == "\n") {
                return "scope.ctx.fillTemplate.refs['newline']";
            }
            if (char == "\r") {
                return "scope.ctx.fillTemplate.refs['returnline']";
            }
            return char;
        });
        let nested = true;
        if (!scope.ctx.fillTemplate.declared && !scope.ctx.fillTemplate.refs) {
            nested = false;
            scope.ctx.fillTemplate.declared = {};
            scope.ctx.fillTemplate.refs = [];
        }
        if (!htmlTemplate || !isString(htmlTemplate)) { scope.ctx.fillTemplate.declared = scope.ctx.fillTemplate.refs = undefined; return ""; }
        if (isObject(offset)) {
            max = offset.max || 0;
            newlineToHtml = isNull(offset.newlineToHtml, true);
            preserve_nonmatching = offset.preserveNonMatching;
            removeNewLineFromLogicalSyntax = offset.removeNewLineFromLogicalSyntax;
            offset = offset.offset;
        } else if (!isNull(offset) && isNull(max)) {
            max = offset;
            offset = 0;
        }
        if (htmlTemplate.trim() == "" || isString(objs) && !(objs = scope.tryEval(objs))) { return ""; }

        objs = objs || [{}];
        if (!isArray(objs)) { objs = [objs]; }
        let html = "", variable, value, ttc = scope.ctx.TEMPLATE_TAG_CONFIG, tvs = scope.ctx.TEMPLATE_VARS,
            hasDataProps = !!~htmlTemplate.indexOf('${dataproperties}'),
            vsyntax = ttc.VARIABLE,
            vnsyntax = ttc.VARIABLE_NAME, j = 0, tv, decl = false;
        while (tv = tvs[j++]) {
            variable = tv.variable || tv.name;
            value = tv.value;
            if (!variable) { continue; }
            value = isFunction(value) ? value(variable, j - 1) : value;
            htmlTemplate = replaceAll(htmlTemplate, "${" + variable + "}", value);
        }

        max = max || objs.length;
        offset = offset || 0;

        let props = condense(htmlTemplate.match(vsyntax) || [], true);

        for (let i = offset; i < max; i++) {
            let obj = objs[i], regex, template = htmlTemplate, match, bind = "";

            if (~template.indexOf("${this}") || ~template.indexOf("${index}")) {
                let uid = __add_fillTemplate_ref(obj);
                template = replaceAll(template, ["${this}", "${index}"], [`scope.ctx.fillTemplate.refs['${uid}']`, i]);
            }


            while (~template.indexOf("${this.") && (match = /\$\{this\.(.+?)\}/.exec(template))) {
                value = getProperty(obj, match[1]);
                if (typeof value == "object") {
                    value = `scope.ctx.fillTemplate.refs['${__add_fillTemplate_ref(value)}']`;
                } else {
                    value = parseRaw(value, isString(value));
                }
                template = replaceAll(template, `\${this.${match[1]}}`, value);
            }
            let objval, expression;
            for (let j = 0, jlen = props.length; j < jlen; j++) {
                expression = props[j];
                let property = isFunction(vnsyntax) ? vnsyntax(expression) : vnsyntax.exec && vnsyntax.exec(expression);
                if (!obj.hasOwnProperty(property) && isNull(getProperty(obj, property))) { continue; }
                if (~template.indexOf(expression) && !isNull(objval = getProperty(obj, property, null, { noInheritance: true }))) {
                    if (typeof objval == "object") {
                        objval = `scope.ctx.fillTemplate.refs['${__add_fillTemplate_ref(objval)}']`;
                    } else {
                        objval = parseRaw(objval, isString(objval));
                    }
                    let replacee_arr = [';'], replacer_arr = [';\\'];
                    if (newlineToHtml) {
                        replacee_arr.push('\n');
                        replacer_arr.push('<br />');
                    }
                    objval = replaceAll(objval, replacee_arr, replacer_arr);
                    if (~objval.indexOf('${')) {
                        objval = scope.ctx.fillTemplate(objval, [obj]);
                    }
                    template = replaceAll(template, expression, objval);

                    if (hasDataProps) {
                        template = replaceAll(template, '${dataproperties}', `data-${property}='${(objval.indexOf('<') && "" || objval)}' \${dataproperties}`);
                    }
                }
            }
            template = replaceAll(
                template,
                ['\n', '\r'],
                [
                    "scope.ctx.fillTemplate.refs['newline']",
                    "scope.ctx.fillTemplate.refs['returnline']"
                ]
            );
            // template = replaceAll(template,'\r', "scope.ctx.fillTemplate.refs['returnline']");
            let declarations = template.match(addFlags(ttc.DECLARE.syntax, 'g')) || [];
            for (let j = 0, jlen = declarations.length; j < jlen; j++) {
                template = ttc.DECLARE.parser(template, declarations[j]);
            }
            template = __logic_parser(template, obj, bind, { removeNewLineFromLogicalSyntax: removeNewLineFromLogicalSyntax });
            // special run sytax
            template = ~template.indexOf("${COUNT") ? template.replace(/\$\{COUNT\[(.*?)\]\}/g, '${RUN[__count;$1]}') : template;
            template = ~template.indexOf("${ENUM") ? template.replace(/\$\{ENUM\[(.*?)\]\}/g, '${RUN[__enum;$1]}') : template;
            template = ~template.indexOf("${RUN") ? __run_replace(/\$\{RUN\[(.+?)\]\}/, template, true, obj) : template;
            let tmp, rptmp, skiplogicals = false;
            if (~template.indexOf('||') && (tmp = /\$\{(.+?\|\|?.+?)\}/.exec(template)) && tmp[1]) {
                for (let tag in scope.ctx.TEMPLATE_TAG_CONFIG) {
                    if (!scope.ctx.TEMPLATE_TAG_CONFIG[tag].begin) { continue; }
                    if (scope.ctx.TEMPLATE_TAG_CONFIG[tag].begin.test(tmp[0])) {
                        skiplogicals = true;
                        break;
                    }
                }
                if (!skiplogicals) {
                    tmp = strip(tmp[1], '|').replace(/\|{3,}/, '');
                    if (~tmp.indexOf('||')) {
                        rptmp = (tmp && "__or|" + replaceAll(tmp, '||', "|") || "");
                        template = replaceAll(template, tmp, rptmp);
                    }
                    template = template.replace("||", '|');
                }
            }
            if (~template.indexOf('&&') && (tmp = /\$\{(.+?\&\&?.+?)\}/.exec(template)) && tmp[1]) {
                for (let tag in scope.ctx.TEMPLATE_TAG_CONFIG) {
                    if (!scope.ctx.TEMPLATE_TAG_CONFIG[tag].begin) { continue; }
                    if (scope.ctx.TEMPLATE_TAG_CONFIG[tag].begin.test(tmp[0])) {
                        skiplogicals = true;
                        break;
                    }
                }
                if (!skiplogicals) {
                    tmp = tmp[1];
                    rptmp = (tmp && "__and|" + replaceAll(tmp, '&&', "|") || "");
                    template = replaceAll(template, tmp, rptmp);
                }
            }
            let leftovervars = template.match(vsyntax);
            if (leftovervars) {
                for (let k = 0, klen = leftovervars.length; k < klen; k++) {
                    let variable = leftovervars[k];
                    if (~variable.indexOf('|')) {
                        let regex = new RegExp(replaceAll(variable, ['$', '{', '}', '|'], ['\\$', '\\{(', ')\\}', '\\|']));
                        template = __run_replace(regex, template, false, obj);
                    }
                }
            }
            template = /\$\{.*?(\|.*?)+?\}/.test(template) && !/\$\{.*?(\|\|.*?)+?\}/.test(template) ? __run_replace(/\$\{(.+?(\|?.+?)+)\}/, template, false, obj) : template;

            html += replaceAll((!preserve_nonmatching && vsyntax.test(template) ? template.replace(vsyntax, "") : template), ';\\', ';');
        }

        if (!nested) {
            html = replaceAll(html, [
                "scope.ctx.fillTemplate.refs['newline']",
                "scope.ctx.fillTemplate.refs['returnline']"
            ], ["\n", "\r"]).replace(/scope.ctx.fillTemplate.refs\['.*?']/g, "");
            scope.ctx.fillTemplate.declared = scope.ctx.fillTemplate.refs = undefined;
        }
        return html;
    } catch (e) {
        error && error('fillTemplate', e);
    }
}
export const TEMPLATE_TAG_CONFIG = _template_config;
export const TEMPLATE_VARS = [];

function init(ctx) {

    scope = ctx.scope;
    scope.tryEval = eval("(" + (ctx.tryEval).toString().replace(/scope.eval/g, 'eval') + ")");
    scope.ctx = ctx;


    _template_config_str = _template_config_str || ctx.tryEval(_template_config, JSON.stringify);

    ctx.TEMPLATE_VARS = ctx.TEMPLATE_VARS || [];
    var tc = ctx.TEMPLATE_TAG_CONFIG;
    if (!tc || ctx.tryEval(tc, JSON.stringify) == _template_config_str) {
        ctx.TEMPLATE_TAG_CONFIG = _template_config;
    }
}