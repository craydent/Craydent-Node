import error from './error';
import {
    _containsLessThan,
    _containsGreaterThan,
    _containsLessThanEqual,
    _containsGreaterThanEqual,
    _containsMod,
    _containsType
} from '../protected/_containsComparisons';
import contains from './contains';
import equals from './equals';
import { __queryNestedProperty, _subQuery, __pullHelper } from './where';
import isNull from './isNull';
import isArray from './isArray';
import isFunction from './isFunction';
import isInt from './isInt';
import isObject from './isObject';
import isRegExp from './isRegExp';
import isString from './isString';
import add from './add';
import duplicate from './duplicate';
import merge from './merge';

export interface UpsertResults<T> {
    insertedIndexes: T[],
    updatedIndexes: T[],
    unchangedIndexes: T[],
    inserted: T[],
    updated: T[],
    unchanged: T[]
}
export type UpsertItemRef<T> = {
    record: T;
    index: number;
};
export type UpsertIterator<T> = (value?: T, ref?: UpsertItemRef<T>, collection?: Array<T>) => boolean;

export default function upsert<T>(arr: T[], records: T[] | T): UpsertResults<T>;
export default function upsert<T>(arr: T[], records: T[] | T, callback: UpsertIterator<T>): UpsertResults<T>;
export default function upsert<T>(arr: T[], records: T[] | T, prop: string, callback?: Function): UpsertResults<T>;
export default function upsert<T>(arr, records, prop?, callback?): UpsertResults<T> {
    try {
        let usePrimaryKey = true;
        if (!isArray(records)) { records = [records]; }
        if (isFunction(prop)) {
            callback = prop;
            prop = undefined;
        }
        if (!prop) { prop = "_id"; }
        if (callback) { usePrimaryKey = false; }

        let ids = [], refs = {}, insert = [];
        for (let i = 0, len = records.length; i < len; i++) {
            let record = records[i];
            refs[record[prop]] = { record: record, index: i };
            ids.push(record[prop]);
        }


        let condition = {}, uIndex = [], iIndex = [], sIndex = [], uArr = [], iArr = [], sArr = [], j = 0;
        condition[prop] = { $in: ids };

        const cb = function (obj, i) {
            let ref = refs[obj[prop]],
                record = ref.record,
                isEqual = callback && callback(obj, record),
                index = uIndex,
                arr = uArr;
            if (isNull(isEqual, equals(record, obj))) {
                index = sIndex;
                arr = sArr;
            } else {
                merge(obj, record);
            }
            index.push(i);
            arr.push(obj);
            ids.splice(ref.index - (j++), 1);
            return true;
        },
            _equals = equals,
            _contains = contains,

            _isArray = isArray,
            _qnp = __queryNestedProperty,
            _clt = _containsLessThan,
            _clte = _containsLessThanEqual,
            _cgt = _containsGreaterThan,
            _cgte = _containsGreaterThanEqual,
            _ct = _containsType,
            _cm = _containsMod,
            _isNull = isNull,
            _isFunction = isFunction,
            _isObject = isObject,
            _isString = isString,
            _isRegExp = isRegExp,
            _isInt = isInt;
        let _refs = [],
            ifblock = _subQuery(condition, null, null, _refs),
            func = `
            (function (record,i) {
                var values,finished;
                if (${ifblock}) {
                    cb(record,i);
                }
            })`;
        if (_refs.length) {
            let varStrings = "";
            for (let i = 0, len = _refs.length; i < len; i++) {
                varStrings += `var __where_cb${(i + 1)}=_refs[${i}];`
            }
            eval(varStrings);
        }
        arr.filter(eval(func));

        for (let i = 0, len = ids.length; i < len; i++) {
            let objRef = refs[ids[i]];
            iIndex.push(arr.length);
            iArr.push(objRef.record);
            add(arr, duplicate(objRef.record));
        }

        return {
            insertedIndexes: iIndex,
            updatedIndexes: uIndex,
            unchangedIndexes: sIndex,
            inserted: iArr,
            updated: uArr,
            unchanged: sArr
        };
    } catch (e) {
        error && error("Array.upsert", e);
        return {
            insertedIndexes: [],
            updatedIndexes: [],
            unchangedIndexes: [],
            inserted: [],
            updated: [],
            unchanged: []
        };
    }
}