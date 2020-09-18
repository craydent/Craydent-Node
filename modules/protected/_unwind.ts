import { Documents, UnwindOptions } from '../models/Arrays';
import capitalize from '../methods/capitalize';
import isObject from '../methods/isObject';
import isNull from '../methods/isNull';
import isArray from '../methods/isArray';
import isEmpty from '../methods/isEmpty';
import duplicate from '../methods/duplicate';
import error from '../methods/error';
import setProperty from '../methods/setProperty';
import { __processExpression } from '../private/__whereParsers';

export default function _unwind<T>(docs: Documents<T>, path: string | UnwindOptions): any[] {
    try {
        let results = [], doc, i = 0, options: UnwindOptions = {};
        if (isObject(path)) {
            options = path as UnwindOptions;
            path = options.path;
        }
        while (doc = docs[i++]) {
            let arr = __processExpression(doc, path);
            if (isNull(arr) || isArray(arr) && isEmpty(arr)) {
                doc = duplicate(doc);
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
            if (path[0] == "$") {
                ppath = (path as string).substr(1);
            }
            for (let j = 0, jlen = arr.length; j < jlen; j++) {
                let dup = duplicate(doc);
                if (options.includeArrayIndex) {
                    dup[options.includeArrayIndex] = j;
                }
                setProperty(dup, (ppath as string), arr[j]);
                results.push(dup);
            }
        }
        return results;
    } catch (e) /* istanbul ignore next */ {
        error && error('aggregate._unwind', e);
        return null;
    }
}