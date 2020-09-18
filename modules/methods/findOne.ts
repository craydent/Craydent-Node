import where, { WhereProjection } from '../methods/where';
import error from '../methods/error';
import { WhereCondition } from '../models/Arrays';

export default function findOne<T>(arr: T[], condition: WhereCondition | string, projection?: WhereProjection): T {
    try {
        return where<T>(arr, condition, projection, 1)[0];
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.where", e);
        return null;
    }
}