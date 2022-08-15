import { Documents, UnwindOptions } from '../models/Arrays';
import capitalize from '../methods/capitalize';
import isObject from '../methods/isobject';
import isNull from '../methods/isnull';
import isArray from '../methods/isarray';
import isEmpty from '../methods/isempty';
import duplicate from '../methods/duplicate';
import error from '../methods/error';
import setProperty from '../methods/setproperty';
import { __processPath } from '../private/__whereParsers';
import { GetPropertyOptions } from '../methods/getproperty';
import strip from '../methods/strip';

export default function _unwind<T>(docs: Documents<T>, path: string | UnwindOptions): any[] {
    try {
        let results: T[] = [], doc: any, i = 0, options: UnwindOptions = {};
        if (isObject(path)) {
            options = path as UnwindOptions;
            path = options.path as string;
        }
        while (doc = docs[i++]) {
            let getOptions = {} as GetPropertyOptions;
            let arr = __processPath(doc, path as string, getOptions);
            if (isArray(getOptions.lastValue)) {
                let nextPath = strip((path as string).replace((getOptions.lastPath as string), ''), '.');
                let unwound = _unwind(getOptions.lastValue, { ...options, path: nextPath });
                let dup: any = duplicate(doc, true);

                setProperty(dup, (getOptions.lastPath as string), unwound);
                results.push(dup);
                continue;
            }

            if (isNull(arr) || isArray(arr) && isEmpty(arr)) {
                doc = duplicate(doc, true);
                if (options.includeArrayIndex) {
                    doc[options.includeArrayIndex] = 0;
                }
                options.preserveNullAndEmptyArrays && results.push(doc);
                continue;
            }
            /* istanbul ignore if */
            if (!isArray(arr)) {
                throw `Exception: Value at end of $unwind field path '${path}' must be an Array, but is a ${capitalize(typeof arr)}.`;
            }
            let ppath = path;
            if ((path as any)[0] == "$") {
                ppath = (path as string).substring(1);
            }
            for (let j = 0, jlen = arr.length; j < jlen; j++) {
                let dup: any = duplicate(doc, true);
                if (options.includeArrayIndex) {
                    dup[options.includeArrayIndex] = j;
                }
                setProperty(dup, (ppath as string), duplicate(arr[j]));
                results.push(dup);
            }
        }
        return results;
    } catch (e) /* istanbul ignore next */ {
        error && error('aggregate._unwind', e);
        return null as any;
    }
}