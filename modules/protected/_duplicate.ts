import indexOfAlt from '../methods/indexOfAlt';
import isArray from '../methods/isArray';
import isFloat from '../methods/isFloat';
import isInt from '../methods/isInt';
import isNull from '../methods/isNull';
import isNumber from '../methods/isNumber';
import isString from '../methods/isString';

import error from '../methods/error';
import parseRaw from '../methods/parseRaw';
import tryEval from '../methods/tryEval';

interface Ref {
    objects: Array<{ obj: any, path: string }>;
}
interface Exec {
    command: string;
}
enum Args {
    ORIGINAL = 1,
    RECURSIVE,
    REF,
    CURRENT_PATH,
    EXEC

}

export default function _duplicate<T>(obj: T, original: T, recursive: boolean, ref?: Ref, current_path?: string, exec?: Exec): T {
    try {
        if (isNull(obj)) { return obj; }
        if (isString(obj) || isString(original)
            || isInt(obj) || isInt(original)
            || isFloat(obj) || isFloat(original)
            || isNumber(obj) || isNumber(original)) {
            return original;
        }
        // var argIndex = 3;

        // remove all properties if it is the root level
        ref = ref || { objects: [{ obj: original, path: "obj" }] };
        current_path = current_path || "obj";
        exec = exec || { command: "" };

        // (arguments[argIndex + 2] || (arguments[argIndex + 2] = {})) && (arguments[argIndex + 2].command = arguments[argIndex + 2].command || "");
        if (!(ref.objects.length == 1)) {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) { delete obj[prop]; }
            }
        }
        const loop_func = function (prop: string, original: any, lExe: Exec) { // 0 => property, 1 => original object, 2 => reference path object, 3 => current path, 4 => command object
            if (original.hasOwnProperty(prop) && original[prop] && recursive) {
                const index = indexOfAlt(ref.objects, original[prop], function (obj: any, value) {
                    return obj.obj === value;
                }),
                    new_path = current_path + "[" + parseRaw(prop) + "]";

                if (~index) {
                    return lExe.command += new_path + "=" + ref.objects[index].path + ";";
                }

                if (typeof (original[prop]) in { "object": 1, "function": 1 } && recursive) {
                    let isfunc = typeof (original[prop].constructor) == "function";
                    if (isfunc && typeof (original[prop]) == "object") {
                        obj[prop] = new original[prop].constructor();
                    } else if (!isfunc) {
                        obj[prop] = {};
                    } else { obj[prop] = tryEval(original[prop].toString()); }
                    ref.objects.push({ obj: original[prop], path: new_path });
                    return _duplicate(obj[prop], original[prop], true, ref, new_path, lExe);
                }
            } else if (!original.hasOwnProperty(prop)) {
                return;
            }
            obj[prop] = original[prop];
        };
        if (isArray(original)) {
            // @ts-ignore
            let i = 0, len = (original).length;
            while (i++ < len) {
                loop_func.call(obj, i - 1, original, exec);
            }
        } else {
            for (let prop in original) {
                if (!original.hasOwnProperty(prop)) { continue; }
                loop_func.call(obj, prop, original, exec);
            }
        }

        if (!arguments[Args.CURRENT_PATH]) {
            eval(arguments[Args.EXEC].command);
        }

        return obj;
    } catch (e) {
        error && error('_duplicate', e);
        return null;
    }
}