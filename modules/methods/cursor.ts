import duplicate from "./duplicate";
import isArray from "./isArray";
import isObject from "./isObject";
import { AnyObject } from "modules/models/Arrays";
import { IteratorItem } from "modules/models/IteratorItem";

class Cursor<T> extends Array<T> {
    /*|{
        "info": "Cursor class to facilitate iteration",
        "category": "Class",
        "parameters":[
            {"records": "(Array<T>) Array used to create the iterator to iterate each item"}],

        "overloads":[
            {"parameters":[
                {"records": "(Object) Object used to create the iterator to iterate each property"}]}],

        "instanceProperties":[
            {"name":"current", "type":"T"},
            {"name":"hasNext", "type":"() => boolean"},
            {"name":"next", "type":"() => {value:T, done:boolean}"},
            {"name":"reset", "type":"() => void"},
            {"name":"setNextIndex", "type":"(value: number) => void"},
            {"name":"size", "type":"() => number"}
        ],

        "url": "http://www.craydent.com/library/1.9.3/docs#Cursor",
        "typeParameter": "<T>",
        "returnType": "(ICursor<T>)"
    }|*/
    protected props: any[];
    protected currentIndex: number;
    public current: T;

    constructor(records?: AnyObject | any[]) {
        super(duplicate(records || [], true) as any);
        Object.setPrototypeOf(this, Object.create(Cursor.prototype))
        this.currentIndex = 0;
        this.props = [];
        if (isObject(records)) {
            for (let prop in records) {
                if (!records.hasOwnProperty(prop)) { continue; }
                this.props.push(prop);
            }
            this.props.sort();
        } else if (isArray(records)) {
            let i = 0, len = records.length;
            while (i++ < len) {
                this.props.push(i - 1);
            }
        }
        this.current = this[this.props[this.currentIndex]];
    }
    public hasNext(): boolean { return this.currentIndex < this.props.length; };
    public next(): IteratorItem {
        let { props } = this;
        this.current = this[props[this.currentIndex]];
        return { value: this[props[this.currentIndex++]], done: this.currentIndex >= this.size() };
    };
    public reset(): void { this.currentIndex = 0; };
    public setNextIndex(value: number): void {
        let { props } = this;
        value = parseInt(value as any) || 0;
        if (value < 0) { value = 0; }
        else if (value >= props.length) { value = props.length - 1; }
        this.currentIndex = value;
        this.current = this[props[this.currentIndex]];
    };

    public size(): number { return this.props.length; };
}

export default Cursor;