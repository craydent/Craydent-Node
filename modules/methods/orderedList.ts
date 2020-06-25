import { SortIterator } from "modules/models/SortIterator";
import { IteratorItem } from "modules/models/IteratorItem";
import duplicate from "./duplicate";
import error from "./error";

function _orderListHelper<T>(value: T, sorter: SortIterator<T>, arr: T[]): number {
    try {
        let ii = 0, i = 0, len = arr.length, origlen = arr.length;
        if (!~sorter(value, arr[0])) { return 0; }
        if (sorter(value, arr[len - 1]) === 1) { return len; }
        while (len > 1) {
            len = Math.ceil(len / 2);
            ii = i + len;
            if (ii >= origlen) { ii = origlen - 1; }
            let order = sorter(value, arr[ii]);
            if (order === 0) { return ii; }
            if (order === 1) { i = ii++; }
            if (ii + 1 == origlen && len > 1) { len = 2; }
        }
        return ii;

    } catch (e) {
        error && error("OrderedList._orderListHelper", e);
        return -1;
    }
}

function iterator(a, b) { if (a < b) { return -1; } if (a > b) { return 1; } return 0; };

class OrderedList<T> extends Array<T> {
    /*|{
        "info": "Collection class that filters out duplicate values and maintains an ordered list",
        "category": "Class",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"records?": "(Array<T>) Array used to create the initial items in the ordered list"},
                {"sorter?": "(SortIterator<T>) Function for sorting logic"}]}],

        "instanceProperties":[
            {"name":"add", "type":"(value:T) => boolean"},
            {"name":"hasNext", "type":"() => boolean"},
            {"name":"next", "type":"() => {value:T, done:boolean}"},
            {"name":"size", "type":"() => number"}
        ],

        "url": "http://www.craydent.com/library/1.9.3/docs#OrderedList",
        "typeParameter": "<T>",
        "returnType": "(IOrderedList<T>)"
    }|*/
    private nextIndex: number;
    private sorter: SortIterator<T>;
    constructor(records?: T[], sorter?: SortIterator<T>) {
        super(duplicate(records || [], true) as any);
        Object.setPrototypeOf(this, Object.create(OrderedList.prototype))
        this.sort(this.sorter = sorter || iterator);
        this.nextIndex = 0;
    }

    public add = function (value: T): boolean {
        if (!this.length) { return this.push(value); }
        let index = _orderListHelper<T>(value, this.sorter, this);
        if (!~index) { return false; }
        return !!this.splice(index, 0, value);
    };

    public next(): IteratorItem { return { value: this[this.nextIndex++], done: this.nextIndex >= this.size() }; }
    public hasNext(): boolean { return this.nextIndex < this.size(); }
    public size(): number { return this.length; }
}

export default OrderedList
