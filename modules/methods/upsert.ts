import error from '../methods/error';
import {
    _containsLessThan,
    _containsGreaterThan,
    _containsLessThanEqual,
    _containsGreaterThanEqual,
    _containsMod,
    _containsType
} from '../protected/_containsComparisons';
import contains from '../methods/contains';
import equals from '../methods/equals';
import isNull from '../methods/isnull';
import isArray from '../methods/isarray';
import isFunction from '../methods/isfunction';
import isInt from '../methods/isint';
import isObject from '../methods/isobject';
import isRegExp from '../methods/isregexp';
import isString from '../methods/isstring';
import add from '../methods/add';
import duplicate from '../methods/duplicate';
import merge from '../methods/merge';
import getProperty from '../methods/getproperty';
import parseBoolean from '../methods/parseboolean';
import __queryNestedProperty from '../private/__queryNestedProperty';
import _subQuery from '../protected/_subQuery';

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
export type UpsertIterator<T> = (value?: T, ref?: T, collection?: Array<T>) => boolean;

export default function upsert<T>(arr: T[], records: T[] | T): UpsertResults<T>;
export default function upsert<T>(arr: T[], records: T[] | T, callback: UpsertIterator<T>): UpsertResults<T>;
export default function upsert<T>(arr: T[], records: T[] | T, prop: string, callback?: Function): UpsertResults<T>;
export default function upsert<T>(arr, records, prop?, callback?): UpsertResults<T> {
    /*|{
        "info": "Array class extension to upsert records to array",
        "category": "Array",
        "parameters":[
            {"records": "(Array<T>|T) Record(s) to use to insert/update array"}],

        "overloads":[
            {"parameters":[
                {"records": "(Array<T>|T) Records to use to insert/update array"},
                {"callback": "(UpsertIterator<T>) Method to use to determine if the records are equal"}]},

            {"parameters":[
                {"records": "(Array<T>|T) Records to use to insert/update array"},
                {"prop": "(string) Property to use as the primary key"},
                {"callback?": "(UpsertIterator<T>) Method to use to determine if the records are equal"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.upsert",
        "typeParameter": "<T>",
        "returnType": "(UpsertResult<T>) returns the information for resulting operation."
    }|*/
    try {
        if (!isArray(records)) { records = [records]; }
        if (isFunction(prop)) {
            callback = prop;
            prop = undefined;
        }
        if (!prop) { prop = "_id"; }

        let ids = [], refs = {} as { [key: string]: UpsertItemRef<T> }, insert = [];
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
            _isInt = isInt,
            _getProperty = getProperty,
            _parseBoolean = parseBoolean;
        let _refs = [],
            ifblock = _subQuery(condition, null, null, _refs),
            func = `
            (function (record,i) {
                var values,finished;
                if (${ifblock}) {
                    cb(record,i);
                }
            })`;
        // if (_refs.length) {
        //     let varStrings = "";
        //     for (let i = 0, len = _refs.length; i < len; i++) {
        //         varStrings += `var __where_cb${(i + 1)}=_refs[${i}];`
        //     }
        //     eval(varStrings);
        // }
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
    } catch (e) /* istanbul ignore next */ {
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