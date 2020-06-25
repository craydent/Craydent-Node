import duplicate from "./duplicate";
import removeAll from "./removeAll";
import equals from "./equals";
import toSet from "./toSet";
import { IteratorItem } from "modules/models/IteratorItem";
import { ArrayIterator } from "modules/models/Arrays";

class Set<T> extends Array<T> {
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
    protected nextIndex: number;
    constructor(records: T[]) {
        super(duplicate(records || [], true) as any);
        Object.setPrototypeOf(this, Object.create(Set.prototype))
        this.nextIndex = 0;
        this.clean();
    }
    public add = function (value: T): boolean {
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
    public clear(val?: any, indexOf?: ArrayIterator<T>): void { removeAll(this, val, indexOf); }
    public clean(): void { toSet(this) }
    public next(): IteratorItem { return { value: this[this.nextIndex++], done: this.nextIndex >= this.size() }; }
    public hasNext(): boolean { return this.nextIndex < this.size(); }
    public size(): number { return this.length; }
}
export default Set;