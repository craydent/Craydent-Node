import duplicate from '../methods/duplicate';
import removeAll from '../methods/removeall';
import equals from '../methods/equals';
import toSet from '../methods/toset';
import { ArrayIterator } from '../models/Arrays';

class Set<T> extends Array<T> {
    /* istanbul ignore next */
    constructor(records: T[] = []) {
        /*|{
            "info": "Collection class that filters out duplicate values",
            "category": "Class",
            "parameters":[
                {"records": "(Array<T>) Array used to create the iterator to iterate each item"}],

            "overloads":[],

            "instanceProperties":[
                {"name":"add", "type":"(value:T) => boolean"},
                {"name":"clean", "type":"() => void"},
                {"name":"clear", "type":"(value?:T, indexOf?:ArrayIterator<T, TResult>) => void"},
                {"name":"hasNext", "type":"() => boolean"},
                {"name":"next", "type":"() => {value:T, done:boolean}"},
                {"name":"size", "type":"() => number"}
            ],

            "url": "http://www.craydent.com/library/1.9.3/docs#Set",
            "typeParameter": "<T, TResult>",
            "returnType": "(ISet<T, TResult>)"
        }|*/
        super();
        const copy: any = duplicate(records, true);
        Object.setPrototypeOf(this, Object.create(Set.prototype))
        for (let i = 0, len = copy.length; i < len; i++) {
            this.push(copy[i]);
        }
        this.clean();
    }
    public add = function (this: any, value: T): boolean {
        let push = true;
        for (let i = 0, len = this.length; i < len; i++) {
            if (equals(value, this[i])) {
                push = false;
                break;
            }
        }
        if (push) { return !!this.push(value); }
        return false;
    };
    public clear(this: any, val?: any, indexOf?: ArrayIterator<T>): void { removeAll(this, val, indexOf); }
    public clean(this: any,): void { toSet(this) }
}
export default Set;