import error from './error';
import parseRaw from './parseRaw';
import isNumber from './isNumber';

/* istanbul ignore next */
export default function wait(condition) { // TODO: allow for nested wait calls
    /*|{
        "info": "Stops execution until the condition is satisfied",
        "category": "Utility",
        "parameters":[
            {"condition": "(Code) Condition equivalent to js true to resume execution"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#wait",
        "returnType": "(void)"
    }|*/
    try {
        let args = arguments.callee.caller.arguments,
            funcOriginal = arguments.callee.caller.toString().
                replace(/\/\/.*?[\r\n]/gi, '').
                replace(/[\t\r\n]*/gi, '').
                replace(/\/\*.*?\*\//gi, ''),
            func = funcOriginal,
            funcArgNames = func.trim().replace(/^function\s*?\((.*?)\).*/, '$1').replace(/\s*/gi, '').split(','),
            fname = func.replace(/function\s*?(.*?)\s*?\(.*/, '$1'),
            fnBefore = func.substr(0, func.indexOf('return wait')),
            variableGroups = fnBefore.match(/var .*?;/gi),
            cond = func.replace(/.*?(return)*\s*?wait\((.*?)\);.*/, '$2'),
            fregex = /\s*?function\s*?\(\s*?\)\s*?\{/;
        func = func.replace(fname, '').replace(/(function\s*?\(.*?\)\s*?\{).*?(return)*\s*?wait\((.*?)\);/, '$1');
        for (let a = 0, alen = funcArgNames.length; a < alen; a++) {
            let argName = funcArgNames[a];
            if (argName) {
                func = func.replace(fregex, `function(){var ${argName}=${parseRaw(args[a])};`);
            }
        }
        for (let i = 0, len = variableGroups.length; i < len; i++) {
            variableGroups[i] = variableGroups[i].replace(/^var\s(.*)?;/, '$1');
            let variables = variableGroups[i].split(/^(?!.*\{.*,).*$/g);
            if (!variables[0]) {
                variables = variableGroups[i].split(',');
            }
            for (let j = 0, jlen = variables.length; j < jlen; j++) {
                let variable = variables[j], regex, values;
                if (~variable.indexOf('=')) {
                    variable = variable.split('=')[0].trim();
                }
                regex = new RegExp(variable + '\\s*?=\\s*?.*?\\s*?[,;]', 'gi');
                values = fnBefore.match(regex) || [];
                for (let k = values.length - 1; k >= 0; k--) {
                    try {
                        let value = eval(values[k].replace(/.*?=\s*?(.*?)\s*?;/, '$1').trim());
                        func = func.replace(fregex, `function(){var ${variable}=${parseRaw(value)};`);
                    } catch (e) {
                        error("wait.eval-value", e)
                    }
                }
            }
        }

        if (isNumber(cond)) {
            setTimeout(eval(func), cond as any);
        } else {
            let delayFunc = function () {
                if (eval(cond)) {
                    (eval(`(${func})`))();
                } else {
                    setTimeout(delayFunc, 1);
                }
            };
            setTimeout(delayFunc, 1);
        }
    } catch (e) {
        error && error('wait', e);
    }
}