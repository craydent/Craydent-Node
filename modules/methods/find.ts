import where from '../methods/where';
import error from '../methods/error';
import { WhereCondition } from '../models/Arrays';

export default function find<T>(arr: T[], condition: WhereCondition | string, projection?: any): T[] {
    try {
        return where(arr, condition, projection);
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.where", e);
        return [];
    }
}