/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';
import { $c } from '../private/__common';
import addFlags from '../methods/addflags';
import condense from '../methods/condense';
import contains from '../methods/contains';
import count from '../methods/count';
import cut from '../methods/cut';
import eachProperty from '../methods/eachproperty';
import foo from '../methods/foo';
import getProperty from '../methods/getproperty';
import isArray from '../methods/isarray';
import isFunction from '../methods/isfunction';
import isNull from '../methods/isnull';
import isString from '../methods/isstring';
import indexOfAlt from '../methods/indexofalt';
import isObject from '../methods/isobject';
import merge from '../methods/merge';
import OrderedList from '../methods/orderedlist';
import parseRaw from '../methods/parseraw';
import removeAt from '../methods/removeat';
import replaceAll from '../methods/replaceall';
import startsWithAny from '../methods/startswithany';
import strip from '../methods/strip';
import suid from '../methods/suid';
import tryEval from '../methods/tryeval';
import { AnyObjects, AnyObject } from '../models/Generics';

const $g: any = global;
interface EchoFunction extends Function {
    out?: string;
}
interface Block {
    id: string;
    block: string;
    body: string;
    code: string;
}
let _template_config = {
    IGNORE_CHARS: ['\n', '\r'],
    // IGNORE_CHARS: [],
    /* loop config */
    FOR: {
        "begin": /(?:\$\{for (.*?);(.*?);(.*?\}?)\})|(?:\{\{for (.*?);(.*?);(.*?\}?)\}\})/i,
        "end": /(\$\{end for\})|(\{\{end for\}\})/i,
        "helper": function (this: FillTemplate, code: any, body: any, options: HelperOptions) {
            /* istanbul ignore next */
            let ttc = $c.TEMPLATE_TAG_CONFIG,
                match = options.removeNewLineFromLogicalSyntax ? new RegExp(ttc.FOR.begin.source + '', ttc.FOR.begin.flags) : ttc.FOR.begin,
                mresult: any = code.match(match),
                condition: any, exec: any, dvars: any, vars = "", ovars: any = {}, code_result = "";

            for (let j = 1, jlen = mresult.length; j < jlen; j++) {
                if (!mresult[j]) { continue; }
                mresult[j] = replaceAll(mresult[j], ['\\[', '\\]'], ['[', ']']).toString();
            }
            /* istanbul ignore next */
            let conditionMatch = mresult[2] || mresult[5] || "",
                execMatch = mresult[3] || mresult[6] || "",
                varsMatch = mresult[1] || mresult[4] || "";
            condition = ttc.VARIABLE_NAME(conditionMatch);
            exec = ttc.VARIABLE_NAME(execMatch);
            dvars = ttc.VARIABLE_NAME(varsMatch).split(',');
            for (let i = 0, len = dvars.length; i < len; i++) {
                let dvar = dvars[i];
                let parts = dvar.split('=');
                vars += `var ${parts[0]}=${parts[1]};`;
                ovars[parts[0]] = parts[0];
            }
            eval(vars);
            let arrForVar = [];
            for (let prop in ovars) {
                arrForVar.push(`"${prop}":${prop}`);
            }
            let forVarsString = `({${arrForVar.join(',')}})`;
            while (eval(fillTemplate(condition, ovars))) {
                let forVars = eval(forVarsString);
                let values = JSON.stringify(forVars).replace(/":/g, '"=').slice(1, -1);
                code_result += `\${${values}}${body}`;
                eval(exec);
            }

            return code_result;
        },
        "parser": function (this: FillTemplate, code: string, ref_obj: any, bind: any, options: HelperOptions) {
            let ttc = $c.TEMPLATE_TAG_CONFIG,
                FOR = ttc.FOR,
                blocks = __processBlocks(FOR.begin, FOR.end, code, options),
                code_result = "", obj: any;
            var i = 0;

            while (obj = blocks[i++]) {
                let block = obj.block,
                    id = obj.id;

                code_result = code_result || obj.code;
                /* istanbul ignore if */
                if (!~code_result.indexOf(obj.id)) { continue; }
                code_result = replaceAll(code_result, id, FOR.helper.call(this, block, obj.body, options));
            }
            let ____execMatches = code_result.match($c.TEMPLATE_TAG_CONFIG.VARIABLE), ____execMatchIndex = 0;
            /* istanbul ignore else */
            if (____execMatches) {
                while (____execMatchIndex < ____execMatches.length) {
                    let match = ____execMatches[____execMatchIndex];
                    let varName = ttc.VARIABLE_NAME(match);
                    if (varName[0] == '"') {
                        varName = `var ${ttc.VARIABLE_NAME(match).replace(/"(.*?)"=/g, '$1=')};''`;
                    }
                    try {
                        code_result = code_result.replace(match, isNull(eval(varName), ''));
                    } catch (e) {
                        code_result = code_result.replace(match, '');
                    }
                    ____execMatchIndex++;
                }
            }
            /* istanbul ignore if */
            if (code == code_result) { code_result = ""; }
            return __logic_parser.call(this, code_result, ref_obj, bind, options);
        }
    },
    FOREACH: {
        "begin": /(?:\$\{foreach (.*?)\s+in\s+(.*?)\s*\})|(?:\{\{foreach (.*?)\s+in\s+(.*?)\s*\}\})/i,
        "end": /(?:\$\{end foreach\})|(?:\{\{end foreach\}\})/i,
        "helper": function (this: FillTemplate, code: string, body: string, rtnObject: AnyObject, uid: string, obj?: AnyObject, bind?: string, ref_obj?: AnyObject): string {
            let ttc = $c.TEMPLATE_TAG_CONFIG,
                FOREACH = ttc.FOREACH,
                mresult: any = code.match(FOREACH.begin),
                objs, var_name,
                code_result = "";

            for (let j = 0, jlen = mresult.length; j < jlen; j++) {
                if (!mresult[j]) { continue; }
                mresult[j] = replaceAll(mresult[j], ['\\[', '\\]'], ['[', ']']).toString();
            }
            /* istanbul ignore next */
            let value = mresult[2] || mresult[4];
            objs = tryEval(value, ((val: any) => eval(val)).bind(this));
            if (!objs && startsWithAny(value, "${", "{{") && !value.endsWith("}")) {
                return code;
            }
            /* istanbul ignore next */
            var_name = ttc.VARIABLE_NAME(mresult[1] || mresult[3]);

            /* istanbul ignore next */
            rtnObject = rtnObject || {};
            let vname = var_name + suid();
            rtnObject[uid] = rtnObject[uid] || "";
            rtnObject[uid] += `var ${vname}s=null,${var_name}=null;`;
            rtnObject[`${vname}s`] = objs;
            /* istanbul ignore else */
            if (isArray(objs)) {
                let i = 0, len = objs.length;
                while (i < len) {
                    code_result += `\${${var_name}=${vname}s[${i}],null}${body}`;
                    i++;
                }
            }
            /* istanbul ignore next */
            return objs ? code_result : "";

        },
        "parser": function (this: FillTemplate, code: string, ref_obj: AnyObject, bind: string, options: HelperOptions): string {
            let ttc = $c.TEMPLATE_TAG_CONFIG,
                FOREACH = ttc.FOREACH,
                uid = `##${suid()}##`,
                result_obj: any = {},
                code_result = "", post = "",
                blocks = __processBlocks(FOREACH.begin, FOREACH.end, code, options), obj: any;
            var i = 0;

            result_obj[uid] = "";

            while (obj = blocks[i++]) {
                let block = obj.block,
                    id = obj.id, index;
                if (i == 1 && ~(index = obj.code.lastIndexOf("##"))) {
                    post = obj.code.substring(index + 2);
                    obj.code = obj.code.substring(0, index + 2);
                }
                code_result = code_result || obj.code;
                /* istanbul ignore if */
                if (!~code_result.indexOf(obj.id)) { continue; }
                code_result = replaceAll(code_result, id, FOREACH.helper.call(this, block, obj.body, result_obj, uid, obj, bind, ref_obj));
                /* istanbul ignore if */
                if (!code_result) { break; }
            }
            eval(result_obj[uid]);
            delete result_obj[uid];
            for (let prop in result_obj) {
                /* istanbul ignore if */
                if (!result_obj.hasOwnProperty(prop)) { continue; }
                eval(`${prop}=result_obj['${prop}']`);
            }
            /* istanbul ignore next */
            let matches = code_result.match(ttc.VARIABLE) || [];
            for (let m = 0, mlen = matches.length; m < mlen; m++) {
                let var_match = matches[m];
                let var_match_name = ttc.VARIABLE_NAME(var_match),
                    str = "";
                try {
                    str = eval(var_match_name);
                } catch (e) { continue; }
                if (isObject(str) || isArray(str)) {
                    str = `this.refs['${__add_fillTemplate_ref.call(this, str as any)}']`;
                }
                code_result = code_result.replace(var_match, str || "");
            }
            /* istanbul ignore if */
            if (code == code_result + post) { code_result = ""; }
            return __logic_parser.call(this, code_result + post, obj, bind, options);
        }
    },
    WHILE: {
        "begin": /(?:\$\{while\s*\((.*?)\)\s*\})|(?:\{\{while\s*\((.*?)\)\s*\}\})/i,
        "end": /(?:\$\{end while\})|(?:\{\{end while\}\})/i,
        "helper": function (this: any, code: string, body: string): string {
            let ttc = $c.TEMPLATE_TAG_CONFIG,
                WHILE = ttc.WHILE,
                mresult: any = code.match(WHILE.begin),
                vars = "", ovars: any = {}, code_result = "",
                declared = this.declared,
                loop_limit = 100000;
            for (let prop in declared) {
                if (!declared.hasOwnProperty(prop) || !~code.indexOf(`\${${prop}}`)) {
                    continue;
                }
                let val = declared[prop];
                vars += `var ${prop}=${val};`;
                ovars[prop] = prop;
            }
            eval(vars);
            /* istanbul ignore next */
            let template = mresult[1] || mresult[2];
            while (eval(fillTemplate(template, ovars))) {
                loop_limit--;
                if (loop_limit < 1) {
                    let msg = "fillTemplate While only support up to 100,000 iterations.  Possible infinite loop?";
                    console.error(msg);
                    throw msg;
                }
                code_result += body;
                /* istanbul ignore next */
                let matches = body.match(ttc.VARIABLE) || [];
                for (let m = 0, mlen = matches.length; m < mlen; m++) {
                    eval(ttc.VARIABLE_NAME(matches[m]));
                }
            }
            this.declared = declared;

            let variable_initialization = "";
            for (let prp in ovars) {
                /* istanbul ignore if */
                if (!ovars.hasOwnProperty(prp)) { continue; }
                variable_initialization += `\${${prp}=${declared[prp]},null}`;
            }

            return variable_initialization + code_result;
        },
        "parser": function (this: any, code: string, ref_obj: AnyObject, bind: string, options: HelperOptions): string {
            let ttc = $c.TEMPLATE_TAG_CONFIG,
                WHILE = ttc.WHILE,
                lookups = {},
                blocks = __processBlocks(WHILE.begin, WHILE.end, code, options, lookups),
                code_result = "", vars = "", declared = this.declared, post = "", obj: any;
            var i = 0;

            while (obj = blocks[i++]) {
                let block = obj.block,
                    id = obj.id, index;

                if (i == 1 && ~(index = obj.code.lastIndexOf("##"))) {
                    post = obj.code.substring(index + 2);
                    obj.code = obj.code.substring(0, index + 2);
                }

                code_result = code_result || obj.code;
                /* istanbul ignore if */
                if (!~code_result.indexOf(obj.id)) { continue; }
                code_result = replaceAll(code_result, id, WHILE.helper.call(this, block, obj.body));
            }

            for (let prop in declared) {
                if (!declared.hasOwnProperty(prop) || !~code.indexOf(`\${${prop}}`)) { continue; }
                vars += `var ${prop}=${declared[prop]};`;
            }
            eval(vars);
            /* istanbul ignore next */
            let matches = code_result.match(ttc.VARIABLE) || [];
            for (let m = 0, mlen = matches.length; m < mlen; m++) {
                let var_match = matches[m],
                    var_match_name = ttc.VARIABLE_NAME(var_match),
                    var_match_index = code_result.indexOf(var_match),
                    before, after;
                const evaluated = tryEval(`${var_match_name};`, ((val: any) => eval(val)).bind(this));
                if (evaluated !== null) {
                    var_match_index += var_match.length;
                }

                before = replaceAll(code_result.substring(0, var_match_index), var_match, evaluated);
                after = code_result.substring(code_result.indexOf(var_match) + var_match.length);
                code_result = before + after;
            }
            /* istanbul ignore if */
            if (code == code_result + post) { code_result = ""; }
            return __logic_parser.call(this, code_result + post, ref_obj, bind, options);

        }
    },
    /* end loop config*/

    /* conditional config*/
    IF: {
        "begin": /\$\{if\s+\((.*?)(?!\{)\)\s*\}|\{\{if\s+\((.*?)(?!\{)\)\s*\}\}/i,
        "elseif": /\$\{elseif\s+\((.*?)(?!\{)\)\s*\}|\{\{elseif\s+\((.*?)(?!\{)\)\s*\}\}/i,
        "else": /\$\{else\}|\{\{else\}\}/i,
        "end": /\$\{end if\}|\{\{end if\}\}/i,
        "helper": function (this: FillTemplate, code: string): string {
            let IF = $c.TEMPLATE_TAG_CONFIG.IF,
                ifmatch = condense((code.match(IF.begin) || [])),
                endlength = (code.match(IF.end) || [[]])[0].length,
                startindex = indexOfAlt(code, IF.begin),
                endindex = indexOfAlt(code, IF.end),
                vsyntax = $c.TEMPLATE_TAG_CONFIG.VARIABLE;

            if (ifmatch.length) {
                for (let j = 1, jlen = ifmatch.length; j < jlen; j++) {
                    let ifm = ifmatch[j] as string;
                    ifmatch[j] = replaceAll(ifm, ['\\[', '\\]'], ['[', ']']).toString();
                }
                let pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                    ifsyntax = new RegExp(`${IF.begin.source}|${IF.elseif.source}|${IF["else"].source}`, 'i');

                if (!code.match(new RegExp(`${IF.elseif.source}|${IF["else"].source}`, 'ig'))) {
                    if ("undefined" == ifmatch[1] || !tryEval(ifmatch[1], ((val: any) => eval(val)).bind(this))) {
                        return pre + post;
                    }
                    return pre + code.substring(startindex + (ifmatch[0] as string).length, endindex) + post;
                }
                /* istanbul ignore next */
                let match = code.match(addFlags(ifsyntax, 'g')) || [];
                ifmatch = condense(match);
                for (let i = 0, len = ifmatch.length; i < len; i++) {
                    let ifm2 = ifmatch[i] as string,
                        ife = condense(ifm2.match(ifsyntax) as any),
                        condition: any = ife[1],
                        value = "undefined" == condition ? false : tryEval(condition, ((val: any) => eval(val)).bind(this)),
                        sindex = code.indexOf(ifm2) + ifm2.length;

                    if (condition && condition.length && condition != 'null' && !contains(condition, vsyntax) && value === null) {
                        value = condition;
                    }

                    if (value !== undefined && value) {
                        let eindex = code.indexOf(ifmatch[i + 1]);
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
        "parser": function (this: FillTemplate, code: string, oobj: AnyObject, bind: string, options: HelperOptions): string {
            let IF = $c.TEMPLATE_TAG_CONFIG.IF,
                blocks = __processBlocks(IF.begin, IF.end, code, options),
                code_result = "",
                i = 0, obj: any;
            while (obj = blocks[i++]) {
                let block = obj.block,
                    id = obj.id;

                code_result = code_result || obj.code;
                if (!~code_result.indexOf(obj.id)) { continue; }
                code_result = IF.helper.call(this, code_result.replace(id, block));
            }
            /* istanbul ignore if */
            if (code == code_result) { code_result = ""; }
            return __logic_parser.call(this, code_result, oobj, bind, options);
        }
    },
    SWITCH: {
        "begin": /(\$\{switch\s+\((.*?)\)\s*\})|(\{\{switch\s+\((.*?)\)\s*\}\})/i,
        "end": /(\$\{end switch\})|(\{\{end switch\}\})/i,
        "case": /(?:\$\{case\s+(.*?)\s*?:\})|(?:\{\{case\s+(.*?)\s*?:\}\})/i,
        "default": /(\$\{default\})|(\{\{default\}\})/i,
        "break": /(\$\{break\})|(\{\{break\}\})/i,
        "helper": function (this: FillTemplate, code: string): string {
            let SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH,
                switchmatch = condense((code.match(SWITCH.begin) || [])),
                endlength = (code.match(SWITCH.end) || [[]])[0].length,
                startindex = indexOfAlt(code, SWITCH.begin),
                endindex = indexOfAlt(code, SWITCH.end),
                brk = SWITCH["break"], dflt = SWITCH["default"];


            if (switchmatch.length) {
                for (let j = 1, jlen = switchmatch.length; j < jlen; j++) {
                    let swmatch = switchmatch[j] as string;
                    switchmatch[j] = replaceAll(swmatch, ['\\[', '\\]'], ['[', ']']).toString();
                }
                let pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                    val = tryEval(switchmatch[2], ((val: any) => eval(val)).bind(this)) || switchmatch[2],
                    cgsyntax = addFlags(SWITCH["case"], "g"),
                    cases: any = code.match(cgsyntax),
                    /* istanbul ignore next */
                    swmatch = switchmatch[0] || "";
                code = code.substring(startindex + swmatch.length, endindex);
                let defaultIndex = indexOfAlt(code, dflt);
                if (!cases && !~defaultIndex) {
                    return pre + cut(code, startindex, endindex + endlength) + post;
                }
                if (defaultIndex === 0) {
                    return pre + code.substring(defaultIndex + (code.match(dflt) as any)[0].length).replace(cgsyntax, '').replace(brk, '') + post;
                }
                for (let i = 0, len = cases.length; i < len; i++) {
                    let cse: any = cases[i],
                        cs: any = cse.match(SWITCH["case"]),
                        /* istanbul ignore next */
                        cvalue = cs[1] || cs[2];
                    /* istanbul ignore next */
                    cvalue = tryEval(cvalue, ((val: any) => eval(val)).bind(this)) || cvalue;
                    if (val == cvalue) {
                        let cindex = code.indexOf(cse),
                            bindex = indexOfAlt(code, brk, cindex);
                        /* istanbul ignore next */
                        bindex = !~bindex ? code.length : bindex;
                        return pre + code.substring(cindex + cse.length, bindex).replace(cgsyntax, '') + post;
                    }
                }
                /* istanbul ignore else */
                if (~defaultIndex) {
                    return pre + code.substring(defaultIndex + (code.match(dflt) as any)[0].length).replace(cgsyntax, '').replace(brk, '') + post;
                }
            }
            return code;
        },
        "parser": function (this: FillTemplate, code: string, oobj: AnyObject, bind: string, options: HelperOptions): string {
            let SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH,
                blocks = __processBlocks(SWITCH.begin, SWITCH.end, code, options),
                code_result = "", i = 0, obj: any;
            while (obj = blocks[i++]) {
                let block = obj.block,
                    id = obj.id;

                code_result = code_result || obj.code;
                /* istanbul ignore if */
                if (!~code_result.indexOf(obj.id)) { continue; }
                code_result = SWITCH.helper.call(this, code_result.replace(id, block));
            }
            /* istanbul ignore if */
            if (code == code_result) { code_result = ""; }
            return __logic_parser.call(this, code_result, oobj, bind, options);
        }

    },
    /* end conditional config*/

    /* error handling and execution config */
    SCRIPT: {
        "begin": /(\$\{script\})|(\{\{script\}\})/i,
        "end": /(\$\{end script\})|(\{\{end script\}\})/i,
        "parser": function (this: FillTemplate, code: string, oobj: AnyObject, bind: string, options: HelperOptions): string {
            let SCRIPT = $c.TEMPLATE_TAG_CONFIG.SCRIPT;
            let blocks = __processBlocks(SCRIPT.begin, SCRIPT.end, code, options),
                code_result = "",
                i = 0, obj: any;
            while (obj = blocks[i++]) {
                let body = obj.body.replace(/(##.*?##)/g, 'echo(\'$1\')'),
                    id = obj.id;
                code_result = code_result || obj.code;
                /* istanbul ignore if */
                if (!~code_result.indexOf(id)) { continue; }
                let echo = function (value: any) {
                    echo.out += value;
                } as EchoFunction;
                echo.out = "";
                let str = eval(`(function(){${body};return echo.out;})()`);
                code_result = code_result.replace(id, str);

            }
            /* istanbul ignore if */
            if (code == code_result) { code_result = ""; }

            return __logic_parser.call(this, code_result, oobj, bind, options);
        }

    },
    TRY: {
        "begin": /(\$\{try\})|(\{\{try\}\})/i,
        "catch": /(?:\$\{catch\s+\((.*)?\)\s*\})|(?:\{\{catch\s+\((.*)?\)\s*\}\})/i,
        "finally": /(\$\{finally\})|(\{\{finally\}\})/i,
        "end": /(\$\{end try\})|(\{\{end try\}\})/i,
        "helper": function (code: string, exec: string): string {
            let TRY = $c.TEMPLATE_TAG_CONFIG.TRY,
                suidRegex = /(##.*?##)/g,
                suidReplacer = ';echo(\'$1\');',
                cindex = indexOfAlt(code, TRY["catch"]),
                findex = indexOfAlt(code, TRY["finally"]),
                eindex = indexOfAlt(code, TRY["end"]),
                tend = cindex;

            if (!~tend) {
                tend = ~findex ? findex : eindex;
            }

            let tindex = indexOfAlt(code, TRY.begin),
                body = code.substring(tindex + (code.match(TRY.begin) as any)[0].length, tend).replace(suidRegex, suidReplacer),
                pre = code.substring(0, tindex), post = code.substring(eindex + (code.match(TRY.end) as any)[0].length),
                str = "",
                echo = function (value: string) {
                    echo.out += value;
                } as EchoFunction;
            echo.out = "";

            /* istanbul ignore next */
            exec && eval(exec);
            try {
                str = eval(`(function(){ ${body};return echo.out; })()`);
                echo.out = "";
            } catch (e) {
                if (~cindex) {
                    tend = ~findex ? findex : eindex;
                    let catchBlock = code.substring(cindex, tend),
                        catchLine: any = catchBlock.match(TRY["catch"]),
                        errorString = replaceAll(e.toString(), '\'', '\\\'');
                    catchBlock = catchBlock.replace(catchLine[0], '').replace(suidRegex, suidReplacer);

                    str += eval(`(function(${catchLine[1]}){${catchBlock};return echo.out;})(new Error('${errorString}'))`);
                    echo.out = "";
                }
            } finally {
                if (~findex) {
                    let finallyCode = code.substring(findex + (code.match(TRY["finally"]) as any)[0].length, eindex).replace(suidRegex, suidReplacer);
                    str += eval(`(function(){${finallyCode};return echo.out; })()`);
                }
            }
            return pre + str + post;
        },
        "parser": function (this: FillTemplate, code: string, oobj: AnyObject, bind: string, options: HelperOptions): string {
            let TRY = $c.TEMPLATE_TAG_CONFIG.TRY,
                lookups: any = {},
                blocks = __processBlocks(TRY.begin, TRY.end, code, options, lookups),
                code_result = "", i = 0, obj: any;
            while (obj = blocks[i++]) {
                let block = obj.block,
                    id = obj.id;

                code_result = code_result || obj.code;
                /* istanbul ignore if */
                if (!~code_result.indexOf(obj.id)) { continue; }
                code_result = TRY.helper.call(this, code_result.replace(id, block));
            }
            /* istanbul ignore if */
            if (code == code_result) { code_result = ""; }
            return __logic_parser.call(this, code_result, oobj, bind, options);
        }

    },
    /* end error handling config */

    /* tokens config */
    VARIABLE: /(?:\$\{((?!\$)\S)*?\})|(?:\{\{((?!\{\{)\S)*?\}\})/gi,
    VARIABLE_NAME: function (match: string) {
        return match.slice(2, ~match.indexOf('}}') ? -2 : -1);
    },
    OR: {
        syntax: /(?:\$\{(.+?\|\|.+?\}?)\})|(?:\{\{(.+?\|\|.+?\}?)\}\})/
    },
    AND: {
        syntax: /(?:\$\{(.+?\&\&.+?\}?)\})|(?:\{\{(.+?\&\&.+?\}?)\}\})/
    },
    DECLARE: {
        "syntax": /(?:\$\{declare (.*?);?\})|(?:\{\{declare (.*?);?\}\})/i,
        "parser": function (this: any, htmlTemplate: string, declare: string) {
            let matches: any = declare.match($c.TEMPLATE_TAG_CONFIG.DECLARE.syntax);
            /*,
             var_nameValue = (matches[1]||matches[2]).strip(';').split("=");

             $c.fillTemplate.declared[var_nameValue[0]] = var_nameValue[1];*/
            merge(this.declared, tryEval(`({${replaceAll(matches[1], '=', ':')}})`, ((val: any) => eval(val)).bind(this)));
            return replaceAll(htmlTemplate, declare, '');
        }
    }
    /* end tokens config */
};

$c.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || _template_config;
$c.TEMPLATE_VARS = $c.TEMPLATE_VARS || [];

export function __add_fillTemplate_ref(this: any, obj: AnyObject): string {
    try {
        const uid = suid();
        this.refs[`ref_${this.refs.length}`] = uid;
        this.refs[uid] = obj;
        this.refs.push(obj);
        return uid;
    } catch (e) {
        /* istanbul ignore next */
        error && error('fillTemplate.__add_fillTemplate_ref', e);
        return null as any;
    }
}
export function __and(...args: any[]): any {
    try {
        let a = 0;
        for (let len = arguments.length; a < len; a++) {
            let arg = arguments[a];
            if (!arg) { return ""; }
        }
        return arguments[a - 1];
    } catch (e) {
        /* istanbul ignore next */
        error && error('fillTemplate.__and', e);
    }
}
export function __count(arr: any[]): number {
    try {
        return arr.length;
    } catch (e) {
        /* istanbul ignore next */
        error && error('fillTemplate.count', e);
        return null as any;
    }
}
export function __enum(props: string[], delimiter?: string, prePost?: [string, string]): string
export function __enum(obj: AnyObject, delimiter?: string, prePost?: [string, string]): string
export function __enum(obj: any, delimiter?: any, prePost?: any): string {
    try {
        delimiter = delimiter || ", ";
        prePost = prePost || ["", ""];
        let props = [],
            str = "";
        if (isArray(obj)) {
            props = obj.slice(0);
        } else if (isObject(obj)) {
            for (let prp in obj) {
                /* istanbul ignore else */
                if (obj.hasOwnProperty(prp)) {
                    props.push(prp);
                }
            }
        }
        for (let i = 0, len = props.length; i < len; i++) {
            let prop = props[i];
            let pre = replaceAll(prePost[0], ['{ENUM_VAR}', '{ENUM_VAL}'], [prop, obj[prop] || ""]),
                post = replaceAll(prePost[1], ['{ENUM_VAR}', '{ENUM_VAL}'], [prop, obj[prop] || ""]);
            str += pre + prop + post + delimiter;
        }
        // remoe the trailing delimiter
        return str.slice(0, -1 * delimiter.length);
    } catch (e) {
        /* istanbul ignore next */
        error && error('fillTemplate.enum', e);
        return null as any;
    }
}
export function __logic_parser(this: any, code: string, obj?: AnyObject, bind?: string, options?: HelperOptions): string {
    if (!code) { return ""; }
    let ttc = $c.TEMPLATE_TAG_CONFIG, indexes: any[] = [], logic: any = {};
    eachProperty(ttc, function (value) {
        if (!value.begin) { return; }
        let index = indexOfAlt(code, value.begin);
        if (!~index) { return; }
        indexes.push(index);
        logic[index] = value;
    });
    let index = Math.min.apply(Math, indexes);

    if (!logic[index]) { return code; }

    return code.substring(0, index) + logic[index].parser.call(this, code.substring(index), obj, bind, options);
}
export function __or(...args: any[]): any {
    try {
        for (let a = 0, len = arguments.length; a < len; a++) {
            let arg = arguments[a];
            if (arg) { return arg; }
        }
        return "";
    } catch (e) {
        /* istanbul ignore next */
        error && error('fillTemplate.__or', e);
    }
}
export function __processBlocks(start: RegExp, end: RegExp, code: string, options: HelperOptions, lookups?: AnyObject): Block[] {
    lookups = lookups || {};
    let blocks: Block[] = [], sindexes: any[] = [], sindex = 0, eindexes: any[] = [], eindex = 0;
    while (~(sindex = indexOfAlt(code, start, sindex))) {
        ~sindex && (sindexes.push(sindex), sindex++);
    }
    while (~(eindex = indexOfAlt(code, end, eindex))) {
        ~eindex && (eindexes.push(eindex), eindex++);
    }
    // if true syntax error, start end missmatch
    if (sindexes.length != eindexes.length) {
        blocks.push({ id: `##${suid()}##`, block: "", body: "", code: code });
        return blocks;
    }
    /* istanbul ignore next */
    let pairs = new OrderedList<any>([], function (a, b) {
        if (a.end < b.end) { return -1; }
        if (a.end > b.end) { return 1; }
        return 0;
    });

    while (sindexes.length) {
        let e = 0;
        while (eindexes[0] > sindexes[e]) {
            e++;
        }
        e--;
        pairs.add({ begin: sindexes[e], end: eindexes[0] });
        removeAt(sindexes, e);
        removeAt(eindexes, 0);
    }

    let endlength = (code.match(end) as any)[0].length;
    let k = 0, pair: any;
    while (pair = pairs[k++]) {
        let uid = `##${suid()}##`,
            block = code.slice(pair.begin, pair.end + endlength),
            beginLength = (block.match(start) as any)[0].length,
            bodyfull = code.slice(pair.begin + beginLength, pair.end),
            body = bodyfull;
        code = code.replace(block, uid);
        if (options.removeNewLineFromLogicalSyntax && options.removeWhitespaceFromLogicalSyntax) {
            body = body.replace(/this.refs\['newline'\]\s*/gi, '').replace(/this.refs\['returnline'\]\s*/gi, '');
        } else if (options.removeNewLineFromLogicalSyntax) {
            body = body.replace(/this.refs\['newline'\]/gi, '').replace(/this.refs\['returnline'\]/gi, '');
        }
        pair.end -= bodyfull.length - body.length;
        block = block.replace(bodyfull, body);
        blocks.push({ id: uid, block, body, code });
        lookups[uid] = block;

        let i = k, pair2: any;
        while (pair2 = pairs[i++]) {
            let offset = block.length - uid.length;
            pair2.end -= offset;
            /* istanbul ignore else */
            if (pair2.begin > pair.end) {
                pair2.begin -= offset;
            }
        }
    }

    return blocks.reverse();
}
export function __run_replace(this: any, reg: RegExp, template: string, use_run: boolean, obj: AnyObject): string {
    try {
        let pre = "", post = "", split_param: string | RegExp = "|", match: RegExpExecArray | null;
        use_run && (pre = "RUN[", post = "]", split_param = /;(?!\\)/);

        while ((match = reg.exec(template)) && match[1]) {
            let funcValue: any[] = [],
                func = "";

            funcValue = replaceAll(match[1], ['\\[', '\\]'], ['[', ']']).split(split_param);
            while (count(funcValue[0], "{") != count(funcValue[0], "}")) {
                /* istanbul ignore if */
                if (tryEval(funcValue[0], ((val: any) => eval(val)).bind(this))) { break; }
                /* istanbul ignore next */
                funcValue[0] += (isString(split_param) ? split_param : ";") + funcValue[1];
                funcValue.splice(1, 1);
            }
            func = strip(funcValue.splice(0, 1)[0], ";");
            for (let i = 0, len = funcValue.length; i < len; i++) {
                let fv = funcValue[i];
                if (~fv.indexOf("${")) {
                    funcValue[i] = fillTemplate(fv, obj);
                }
                try {
                    funcValue[i] = eval(`(${replaceAll(fv, [';\\'], [';'])})`);
                } catch (e) { }
            }
            __count([]);
            funcValue = funcValue.map(function (this: any, item: any) {
                /* istanbul ignore else */
                return tryEval(item, ((val: any) => eval(val)).bind(this)) || item;
            });
            /* istanbul ignore next */
            template = ~template.indexOf(match[1]) ? template.replace(match[1], (match[1] = replaceAll(match[1], ['\\[', '\\]'], ['[', ']']))) : template;
            /* istanbul ignore next */
            const replacer = (getProperty($g, func) ? getProperty($g, func) : (tryEval(`(${func})`, ((val: any) => eval(val)).bind(this)) || foo)).apply(obj, funcValue) || "";
            template = replaceAll(template, `\${${pre + match[1] + post}}`, replacer)
        }
        return template;
    } catch (e) {
        /* istanbul ignore next */
        error && error('fillTemplate.__run_replace', e);
        return null as any;
    }
}
export function __mapIgnoreChars(): string[] {
    return ($c.TEMPLATE_TAG_CONFIG.IGNORE_CHARS || []).map(function (char: string) {
        if (char == "\n") {
            return "this.refs['newline']";
        }
        if (char == "\r") {
            return "this.refs['returnline']";
        }
        return char;
    });
}
export function __processTemplateVars(template: string): string {
    let htmlTemplate = template;
    let variable, value, tvs = $c.TEMPLATE_VARS, tv, j = 0;
    while (tv = tvs[j++]) {
        variable = tv.variable || tv.name;
        value = tv.value;
        /* istanbul ignore next */
        if (!variable) { continue; }
        value = isFunction(value) ? value(variable, j - 1) : value;
        htmlTemplate = replaceAll(htmlTemplate, `\${${variable}}`, value);
    }
    return htmlTemplate;
}
export function __processThisProps(this: FillTemplate, template: string, obj: AnyObject): string {
    let match, value;
    while (~template.indexOf("${this.") && (match = /\$\{this\.(.+?)\}/.exec(template))) {
        value = getProperty(obj, match[1]);
        if (typeof value == "object") {
            value = `this.refs['${__add_fillTemplate_ref.call(this, value)}']`;
        } else {
            value = parseRaw(value, isString(value));
        }
        template = replaceAll(template, `\${this.${match[1]}}`, value);
    }
    return template;
}
export function __processThisAndIndex(this: FillTemplate, template: string, obj: AnyObject, i: number): string {
    if (~template.indexOf("${this}") || ~template.indexOf("${index}")) {
        let uid = __add_fillTemplate_ref.call(this, obj);
        return replaceAll(template, ["${this}", "${index}"], [`this.refs['${uid}']`, i.toString()]);
    }
    return template
}
export function __processVariables(
    this: FillTemplate, template: string, obj: AnyObject, property: string, expression: string, newlineToHtml: boolean, hasDataProps: boolean
): string {
    let objval;
    if (~template.indexOf(expression) && !isNull(objval = getProperty(obj, property, undefined, { noInheritance: true }))) {
        if (typeof objval == "object") {
            objval = `this.refs['${__add_fillTemplate_ref.call(this, objval)}']`;
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

            objval = fillTemplate(objval, [obj]);
        }
        template = replaceAll(template, expression, objval);

        if (hasDataProps) {
            // template = replaceAll(template, '${dataproperties}', `data-${property}='${(!!objval.indexOf('<') ? '' : objval)}' \${dataproperties}`);
            template = replaceAll(template, '${dataproperties}', `data-${property}='${objval}' \${dataproperties}`);
        }
    }
    return template;
}
export function __processDeclarations(this: FillTemplate, template: string): string {
    let ttc = $c.TEMPLATE_TAG_CONFIG;
    let declarations = template.match(addFlags(ttc.DECLARE.syntax, 'g')) || [];
    for (let j = 0, jlen = declarations.length; j < jlen; j++) {
        template = ttc.DECLARE.parser.call(this, template, declarations[j]);
    }
    return template;
}
export function __processLogicals(this: any, template: string, obj: AnyObject): string {
    let tmp, skiplogicals = false, ttc = $c.TEMPLATE_TAG_CONFIG;

    while (!skiplogicals && ~template.indexOf('||') && (tmp = ttc.OR.syntax.exec(template)) && tmp[1]) {
        for (let tag in ttc) {
            if (!ttc[tag].begin) { continue; }
            if (ttc[tag].begin.test(tmp[0])) {
                skiplogicals = true;
                break;
            }
        }
        if (!skiplogicals) {
            const body = strip(tmp[1], '|').replace(/\|{3,}/, '');
            /* istanbul ignore next */
            const rptmp = (body && `__or|${replaceAll(body, '||', "|") || ""}`);
            const replacer = rptmp && __run_replace.call(this, /\$\{(.+?(\|?.+?)+)\}/, `\${${rptmp}}`, false, obj);
            template = replaceAll(template, tmp[0], replacer);
        }
    }
    while (!skiplogicals && ~template.indexOf('&&') && (tmp = ttc.AND.syntax.exec(template)) && tmp[1]) {
        for (let tag in ttc) {
            if (!ttc[tag].begin) { continue; }
            if (ttc[tag].begin.test(tmp[0])) {
                skiplogicals = true;
                break;
            }
        }
        if (!skiplogicals) {
            const body = tmp[1];
            /* istanbul ignore next */
            const rptmp = (body && `__and|${replaceAll(body, '&&', "|") || ""}`);
            const replacer = rptmp && __run_replace.call(this, /\$\{(.+?(\|?.+?)+)\}/, `\${${rptmp}}`, false, obj);
            template = replaceAll(template, tmp[0], replacer);
        }
    }
    return template;
}
export function __processLeftoverRunners(this: FillTemplate, template: string, obj: AnyObject): string {
    const vsyntax = $c.TEMPLATE_TAG_CONFIG.VARIABLE
    let leftovervars = template.match(vsyntax);
    if (leftovervars) {
        for (let k = 0, klen = leftovervars.length; k < klen; k++) {
            let variable = leftovervars[k];
            if (~variable.indexOf('|')) {
                let regex = new RegExp(replaceAll(variable, ['$', '{', '}', '|'], ['\\$', '\\{(', ')\\}', '\\|']));
                template = __run_replace.call(this, regex, template, false, obj);
            }
        }
    }
    return template
}

function fillTemplate(htmlTemplate: string, objs?: AnyObjects | AnyObject): string;
function fillTemplate(htmlTemplate: string, objs: AnyObjects | AnyObject, options?: HelperOptions): string;
function fillTemplate(htmlTemplate: string, objs: AnyObjects | AnyObject, offset?: number, max?: number, newlineToHtml?: boolean, preserve_nonmatching?: boolean, removeNewLineFromLogicalSyntax?: boolean, removeWhitespaceFromLogicalSyntax?: boolean): string;
function fillTemplate(htmlTemplate: string, objs?: any, offset?: any, max?: any, newlineToHtml?: any, preserve_nonmatching?: any, removeNewLineFromLogicalSyntax?: any, removeWhitespaceFromLogicalSyntax?: any): string {
    /*|{
        "info": "Function for templetizing",
        "category": "Template",
        "featured": true,
        "parameters":[
            {"htmlTemplate": "(String) Template to be used"},
            {"objs": "(Object[]) Objects to fill the template variables"},
            {"options?": "(HelperOptions) Options to use: max,offset,newlineToHtml,preserveNonMatching,removeNewLineFromLogicalSyntax,removeWhitespaceFromLogicalSyntax"}],

        "overloads":[
            {"parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Object[]) Objects to fill the template variables"},
                {"max": "(Int) The maximum number of records to process"}]},

            {"parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Object[]) Objects to fill the template variables"},
                {"offset?": "(Int) The start index of the Object array"},
                {"max?": "(Int) The maximum number of records to process"},
                {"newlineToHtml?":"(Boolean) Flag to replace all new line chars (\\n) to the HTML <br /> tag.  Default is true."},
                {"preserveNonMatching?":"(Boolean) Flag to used to leave template variables that were not replaced."},
                {"removeNewLineFromLogicalSyntax?":"(Boolean) Flag to used to remove new lines from logical syntax."},
                {"removeWhitespaceFromLogicalSyntax?":"(Boolean) Flag to used to remove whitespace caused by line formatting from logical syntax."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#fillTemplate",
        "returnType": "(String)"
    }|*/
    let ft = new FillTemplate();
    return ft.fill(htmlTemplate, objs, offset, max, newlineToHtml, preserve_nonmatching, removeNewLineFromLogicalSyntax, removeWhitespaceFromLogicalSyntax);
}

class FillTemplate {
    private declared: any;
    private refs: any[];

    constructor() {
        this.declared = {};
        this.refs = [];
    }

    fill(htmlTemplate: string, objs?: any, offset?: any, max?: any, newlineToHtml?: any, preserve_nonmatching?: any, removeNewLineFromLogicalSyntax?: any, removeWhitespaceFromLogicalSyntax?: any): string {
        try {
            $c.TEMPLATE_TAG_CONFIG.IGNORE_CHARS = __mapIgnoreChars();

            if (!htmlTemplate || !isString(htmlTemplate)) { return ""; }
            if (isObject(offset)) {
                max = offset.max || 0;
                newlineToHtml = isNull(offset.newlineToHtml, true);
                preserve_nonmatching = offset.preserveNonMatching;
                removeNewLineFromLogicalSyntax = offset.removeNewLineFromLogicalSyntax;
                removeWhitespaceFromLogicalSyntax = offset.removeWhitespaceFromLogicalSyntax;
                offset = offset.offset;
            } else if (!isNull(offset) && isNull(max)) {
                max = offset;
                offset = 0;
            }
            if (htmlTemplate.trim() == "" || isString(objs) && !(objs = tryEval(objs))) { return ""; }


            // set defaults
            objs = objs || [{}];
            offset = offset || 0;
            let ttc = $c.TEMPLATE_TAG_CONFIG, vsyntax = ttc.VARIABLE;
            if (!isArray(objs)) { objs = [objs]; }
            if (!objs.length) {
                if (preserve_nonmatching) {
                    return htmlTemplate;
                }
                return htmlTemplate.replace(vsyntax, "");
            }
            let html = "",
                hasDataProps = !!~htmlTemplate.indexOf('${dataproperties}'),
                vnsyntax = ttc.VARIABLE_NAME;

            max = max || objs.length;
            htmlTemplate = __processTemplateVars(htmlTemplate);

            let props = condense(htmlTemplate.match(vsyntax) || [], true);

            for (let i = offset; i < max; i++) {
                let obj = objs[i], template = htmlTemplate, bind = "";

                template = __processThisAndIndex.call(this, template, obj, i);
                template = __processThisProps.call(this, template, obj);

                let expression: any;
                for (let j = 0, jlen = props.length; j < jlen; j++) {
                    expression = props[j];
                    let property = isFunction(vnsyntax) ? vnsyntax(expression) : vnsyntax.exec && vnsyntax.exec(expression)[1];
                    if (!obj.hasOwnProperty(property) && isNull(getProperty(obj, property))) { continue; }
                    template = __processVariables.call(this, template, obj, property, expression, newlineToHtml, hasDataProps);
                }
                template = replaceAll(
                    template,
                    ['\n', '\r'],
                    [
                        "this.refs['newline']",
                        "this.refs['returnline']"
                    ]
                );
                // template = replaceAll(template,'\r', "$c.fillTemplate.refs['returnline']");
                template = __processDeclarations.call(this, template);
                template = __logic_parser.call(this, template, obj, bind, { removeNewLineFromLogicalSyntax, removeWhitespaceFromLogicalSyntax });
                // special run sytax
                template = ~template.indexOf("${COUNT") ? template.replace(/\$\{COUNT\[(.*?)\]\}/g, '${RUN[__count;$1]}') : template;
                template = ~template.indexOf("${ENUM") ? template.replace(/\$\{ENUM\[(.*?)\]\}/g, '${RUN[__enum;$1]}') : template;
                template = ~template.indexOf("${RUN") ? __run_replace.call(this, /\$\{RUN\[(.+?)\]\}/, template, true, obj) : template;

                template = __processLogicals(template, obj);
                template = __processLeftoverRunners.call(this, template, obj);

                template = /\$\{.*?(\|.*?)+?\}/.test(template) && !/\$\{.*?(\|\|.*?)+?\}/.test(template) ? __run_replace.call(this, /\$\{(.+?(\|?.+?)+)\}/, template, false, obj) : template;

                html += replaceAll((!preserve_nonmatching && vsyntax.test(template) ? template.replace(vsyntax, "") : template), ';\\', ';');
            }

            html = replaceAll(html, ttc.IGNORE_CHARS, ['']);
            html = replaceAll(html, [
                "this.refs['newline']",
                "this.refs['returnline']"
            ], ["\n", "\r"]).replace(/this.refs\['.*?']/g, "");

            return html;
        } catch (e) {
            /* istanbul ignore next */
            error && error('fillTemplate', e);
            /* istanbul ignore next */
            return e;
        }
    }
}
export const TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG;
export const TEMPLATE_VARS = $c.TEMPLATE_VARS;
// export { __add_fillTemplate_ref, __and, __count, __enum, __logic_parser, __or, __processBlocks, __run_replace };
export default fillTemplate;