import { SortIterator } from '../models/SortIterator';
import duplicate from '../methods/duplicate';
import error from '../methods/error';

export function _orderListHelper<T>(value: T, sorter: SortIterator<T>, arr: T[]): number {
    try {
        let ii = 0, i = 0, len = arr.length, origlen = arr.length;
        if (!~sorter(value, arr[0])) { return 0; }
        if (sorter(value, arr[len - 1]) === 1) { return len; }
        while (len > 1) {
            len = Math.ceil(len / 2);
            ii = i + len;
            /* istanbul ignore if */
            if (ii >= origlen) { ii = origlen - 1; }
            let order = sorter(value, arr[ii]);
            if (order === 0) { return ii; }
            if (order === 1) { i = ii++; }
            if (ii + 1 == origlen && len > 1) { len = 2; }
        }
        return ii;

    } catch (e) /* istanbul ignore next */ {
        error && error("OrderedList._orderListHelper", e);
        return -1;
    }
}

/* istanbul ignore next */
function iterator(a: any, b: any) { if (a < b) { return -1; } if (a > b) { return 1; } return 0; };

class OrderedList<T> extends Array<T> {
    private sorter: SortIterator<T>;
    /* istanbul ignore next */
    constructor(records: T[] = [], sorter?: SortIterator<T>) {
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
        super();
        Object.setPrototypeOf(this, Object.create(OrderedList.prototype))
        let items = duplicate(records || [], true);
        for (let i = 0, len = items.length; i < len; i++) {
            this.push(items[i])
        }
        this.sort(this.sorter = sorter || iterator);
    }

    public add = function (this: any, value: T): boolean {
        if (!this.length) { return !!this.push(value); }
        let index = _orderListHelper<T>(value, this.sorter, this);
        /* istanbul ignore if */
        if (!~index) { return false; }
        return !!this.splice(index, 0, value);
    };
}

export default OrderedList
