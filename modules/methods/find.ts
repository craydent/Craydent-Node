import where from "./where";
import error from './error';
import { WhereCondition } from "../models/Arrays";

export default function find<T>(arr: T[], condition: WhereCondition | string, projection?: any): T[] {
    try {
        return where(arr, condition, projection);
    } catch (e) {
        error && error("Array.where", e);
        return [];
    }
}