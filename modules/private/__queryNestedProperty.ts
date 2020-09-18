import isArray from '../methods/isArray';
import isNull from '../methods/isNull';
import { AnyObject } from '../models/Arrays';

export default function __queryNestedProperty(obj: AnyObject, path: string/*, value*/): any[] {
    if (obj[path]) { return [obj[path]]; }
    let parts = path.split('.'), values = [];
    let prop, i = 0;
    while (prop = parts[i++]) {
        /* istanbul ignore if */
        if (!obj.hasOwnProperty(prop)) { return []; }
        if (isArray(obj[prop])) {
            if (isNull(parts[i])) { return obj[prop]; }
            let subPath = parts.slice(i).join('.'), items = obj[prop];
            for (let j = 0, jlen = items.length; j < jlen; j++) {
                values = values.concat(__queryNestedProperty(items[j], subPath));
            }
            return values;
        }
        obj = obj[prop];
    }
    return [obj];
}