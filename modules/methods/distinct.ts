import error from '../methods/error';
import { WhereCondition } from '../models/Arrays';
import group from '../methods/group';
import getProperty from '../methods/getProperty';
import isNullOrEmpty from '../methods/isNullOrEmpty';
import isString from '../methods/isString';

export default function distinct<T>(docs: T[], fields: string | string[], condition?: string | WhereCondition): T[] {
    try {
        if (isString(fields)) { fields = (fields as string).split(","); }

        const records = group(docs, { field: fields, cond: condition }, true);
        let arr = [];
        if (fields.length == 1) {
            for (let i = 0, len = records.length; i < len; i++) {
                let value = getProperty(records[i], fields[0]);
                !isNullOrEmpty(value) && arr.push(value);
            }
            return arr;
        }
        let i = 0, r;
        while (r = records[i++]) { !isNullOrEmpty(r) && arr.push(r); }
        return arr;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.distinct", e);
        return [];
    }
}