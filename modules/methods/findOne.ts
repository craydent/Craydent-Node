import where from "./where";
import error from './error';
import { WhereCondition, Fields } from "../models/Arrays";

export default function findOne<T>(arr: T[], condition: WhereCondition | string, projection?: string | Fields | boolean): T {
    try {
        where<T>(arr, condition, projection, 1)[0];
    } catch (e) {
        error && error("Array.where", e);
        return null;
    }
}