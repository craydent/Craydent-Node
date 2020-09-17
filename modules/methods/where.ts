/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
//#region imports
import error from './error';
import {
    _containsLessThan,
    _containsGreaterThan,
    _containsLessThanEqual,
    _containsGreaterThanEqual,
    _containsMod,
    _containsType
} from '../protected/_containsComparisons';
import _getFuncName from '../protected/_getFuncName';
import duplicate from './duplicate';
import getProperty from './getProperty';
import setProperty from './setProperty';
import isNull from './isNull';
import isArray from './isArray';
import isFunction from './isFunction';
import isInt from './isInt';
import isObject from './isObject';
import isRegExp from './isRegExp';
import isString from './isString';
import parseBoolean from './parseBoolean';
import contains from './contains';
import removeAt from './removeAt';
import equals from './equals';
import tryEval from './tryEval';
import sortBy from './sortBy';
import removeAll from './removeAll';
import rand from './rand';
import merge from './merge';
import universalTrim from '../methods/universalTrim';
import _generalTrim from '../protected/_generalTrim';
import __pullHelper from '../private/__pullHelper';
import _groupFieldHelper from '../protected/_groupFieldHelper';
import _processClause from '../protected/_processClause';

import {
    IndexedArray,
    IndexedBucket,
    Documents,
    Stage,
    CreateFuncOptions,
    SearchRangeOptions,
    ExtendedArray,
    AnyObjects,
    AnyObject,
    Fields
} from '../models/Arrays';
import _whereFunction from '../protected/_whereFunction';
import _redact from '../protected/_redact';
import _unwind from '../protected/_unwind';
import { __processGroup, __processExpression } from '../private/__whereParsers';
import __queryNestedProperty from '../private/__queryNestedProperty';
import _subQuery from '../protected/_subQuery';
//#endregion imports

const _isObject = isObject,
    _isArray = isArray,
    _isInt = isInt,
    _isRegExp = isRegExp,
    _isFunction = isFunction,
    _isString = isString;

export function __processStage<T>(docs: Documents<T>, stage: Stage): Documents<T> {
    try {
        let operator = "", value: any = {};
        for (let opts in stage) {
            /* istanbul ignore next */
            if (!stage.hasOwnProperty(opts)) { continue; }
            /* istanbul ignore next */
            if (operator) {
                throw "Exception: A pipeline stage specification object must contain exactly one field.";
            }
            operator = opts;
            value = stage[opts];
        }
        let arr = [], i = 0;
        switch (operator) {
            case "$project":
                return where(docs, {}, value);
            case "$match":
                return where(docs, value);
            case "$redact":
                return _redact(docs, value);
            case "$limit":
                return docs.slice(0, value);
            case "$skip":
                return docs.slice(value);
            case "$unwind":
                return _unwind(docs, value);
            case "$group":
                return __processGroup(docs, value);
            case "$sort":
                let sorter = [];
                for (let prop in value) {
                    /* istanbul ignore next */
                    if (!value.hasOwnProperty(prop)) { continue; }
                    let pre = "";
                    if (!~value[prop]) { pre = "!"; }
                    sorter.push(pre + prop);
                }
                return sortBy(docs, sorter);
            case "$out":
                let rtnDocs = duplicate(docs, true);
                 /* istanbul ignore else */
                if (isString(value)) {
                    // @ts-ignore
                    global[value] = rtnDocs;
                } else if (isArray(value)) {
                    removeAll(value);
                    rtnDocs = merge(value, rtnDocs);
                }
                return rtnDocs;
            case "$sample":
                let eindex = docs.length - 1;
                while (i < value.size) {
                    arr.push(docs[Math.round(rand(0, eindex, true))]);
                    i++;
                }
                docs.sample = arr;
                return docs;
            case "$lookup":
                arr = value.from;
                let doc, key = value.localField, fkey = value.foreignField, prop = value.as;
                while (doc = docs[i++]) {
                    let query = {};
                    query[fkey] = doc[key] || { $exists: false };
                    doc[prop] = where(arr, query);
                }
        }
        return docs;
    } catch (e) /* istanbul ignore next */ {
        error && error('aggregate.__processStage', e);
        return null;
    }
}

export function _joinHelper<T, R, TResult>(objs: T[], arr: R[], on: string | string[], exclusive?: boolean): TResult[] {
    let records = [], propRef = [], objRef = arr[0] || /* istanbul ignore next */ {};
    /* istanbul ignore else */
    if (isString(on)) {
        // @ts-ignore
        on = on.split('=');
        // @ts-ignore
        if (on.length == 1) { on = [on, on]; }
        let name = _getFuncName(arguments.callee.caller);
        on = universalTrim(on as string[]);
         /* istanbul ignore next */
        name == "joinRight" && (on = [on[1], on[0]]);
    }

    for (let prop in objRef) {
        /* istanbul ignore else */
        if (objRef.hasOwnProperty(prop)) {
            propRef.push(prop);
        }
    }
    for (let i = 0, len = objs.length; i < len; i++) {
        let record = duplicate(objs[i], true), query = {}, results;
        query[on[1]] = record[on[0]];
        results = where(arr, query);
        /* istanbul ignore else */
        if (results.length > 0) {
            records.push(merge(record, results[0]));
        } else if (!exclusive) {
            for (let j = 0, jlen = propRef.length; j < jlen; j++) {
                record[propRef[j]] = record[propRef[j]] || null;
            }
            records.push(record);
        }
    }
    return records;
}
export function _copyWithProjection(record: any, projection_arg?: string | string[] | boolean | AnyObject, preserveProperties?: boolean): any {
    if (projection_arg === true) {
        return record;
    }
    let copy = {}, len = 0,
        projection: any = projection_arg || '*';
    if (_isString(projection)) {
        projection = (projection as string).split(',');
    }
    if (_isArray(projection)) {
        if (!(len = projection.length)) {
            copy = duplicate(record);
            return copy;
        }
        let arr = projection;
        projection = {};
        let i = 0, a;
        while (a = arr[i++]) {
            projection[a] = 1;
        }
    }

    for (let prop in projection) {
        /* istanbul ignore else */
        if (projection.hasOwnProperty(prop) && projection[prop]) {
            let firstElement = false;
            if (prop.slice(-2) == '.$') {
                firstElement = true;
                prop = prop.slice(0, -2);
            }
            let val = getProperty(record, prop) || null;
            /* istanbul ignore else */
            if (prop == '*') {
                copy = duplicate(record, true);
            } else if (parseBoolean(projection[prop]) && !_isArray(val)) {
                if (preserveProperties || !isNull(val)) {
                    setProperty(copy, prop, val);
                }
            } else if (!_isObject(projection[prop]) && !val) {
                copy[prop] = projection[prop];
            } else if ((_isObject(projection[prop]) || val) && !_isArray(val)) {
                copy[prop] = __processExpression(record, projection[prop]);
            } else if (val) {
                let del = true;
                /* istanbul ignore else */
                if (firstElement) {
                    copy[prop] = val.slice(0, 1);
                } else if (projection[prop]['$elemMatch']) {
                    copy[prop] = where(val, projection[prop]['$elemMatch']).slice(0, 1);
                } else if (projection[prop]['$slice']) {
                    let start = 0, length = _isInt(projection[prop]['$slice']) ? projection[prop]['$slice'] : 0;

                    if (_isArray(projection[prop]['$slice'])) {
                        start = projection[prop]['$slice'][0];
                        length = projection[prop]['$slice'][1];
                    }
                    copy[prop] = val.slice(start, length);
                } else if (projection.hasOwnProperty(prop)) {
                    del = false;
                    setProperty(copy, prop, val);
                }
                if (del && !copy[prop].length) {
                    delete copy[prop];
                }
            } else {
                copy[prop] = projection[prop];
            }
        }
    }
    return copy;
}
export function _createFuncAndFilter<T>(args: CreateFuncOptions): T[] {
    var _equals = equals,
        _getProperty = getProperty,
        _parseBoolean = parseBoolean,
        _qnp = __queryNestedProperty,
        _clt = _containsLessThan,
        _clte = _containsLessThanEqual,
        _cgt = _containsGreaterThan,
        _cgte = _containsGreaterThanEqual,
        _ct = _containsType,
        _cm = _containsMod,
        _contains = contains,
        condition = args.condition,
        projection = args.projection,
        projected = [],
        ifblock = args.ifblock || 'true',
        _refs = args._refs || [];

    let func, arr = args.arr, limit = args.limit;
    if (!args.ifblock) {
        if (!projection) {
            func = function (record, the_current_index, farr) {
                for (let prop in condition) {
                    if (~prop.indexOf('.')) {
                        if (!contains(_qnp(record, prop), condition[prop])) {
                            return false;
                        }
                    } else if (record[prop] && record[prop] !== condition[prop] || isNull(record[prop])) {
                        return false;
                    }
                }
                return true;
            };
        } else {
            func = function (record, the_current_index, farr) {
                for (let prop in condition) {
                    if (~prop.indexOf('.')) {
                        if (!contains(_qnp(record, prop), condition[prop])) {
                            return false;
                        }
                    } else if (record[prop] && record[prop] !== condition[prop] || isNull(record[prop])) {
                        return false;
                    }
                }
                projected.push(_copyWithProjection(record, projection));
                return true;
            }
        }
    } else {
        let varStrings = '';
        if (_refs.length) {
            for (let i = 0, len = _refs.length; i < len; i++) {
                varStrings += `var __where_cb${(i + 1)}=_refs[${i}];`;
            }
        }
        let projection_code = "";
        if (projection) {
            projection_code = "projected.push(_copyWithProjection(record, projection));";
        }
        eval(`${varStrings}func = function (record,the_current_index,farr) {var values;${projection_code}return ${ifblock};}`);
    }
    let filtered = arr.filter(func);
    if (limit != 0) {
        if (filtered.length > limit) {
            filtered = filtered.slice(0, limit);
        }
        if (projected.length > limit) {
            projected = projected.slice(0, limit);
        }
    }
    return projection ? projected : filtered;
}
export function _recordRange(ranges: number[][], start: number, end: number, flag?: number): void {
    // flag 1 means $lt(e) 2 means $gt(e)
    if (!ranges.length) { ranges.push([start, end]); return; }
    if (ranges[0][0] > end) {
        ranges.unshift([start, end]);
        return;
    }
    if (ranges[ranges.length - 1][1] < start) {
        ranges.push([start, end]);
    }
    for (let i = 0, len = ranges.length; i < len; i++) {
        let range = ranges[i];
        /* istanbul ignore else */
        if (end <= range[1] && flag === 1) {
            /* istanbul ignore else */
            if (i) {
                removeAt(ranges, i);
                i--, len--;
            }
            ranges[i][1] = end;
            return;
        }
        /* istanbul ignore else */
        if (start > range[1] + 1) {
            if (flag === 2) {
                let r = removeAt(ranges, i);
                i--, len--;
            }
            continue;
        }
        /* istanbul ignore else */
        if (start <= range[1] + 1) {
            if (flag === 2) {
                range[0] = start;
                return;
            }
            for (let j = i + 1; j < len; j++) {
                let rg = ranges[j];
                if (rg[0] - 1 > end) {
                    break;
                }
                if (rg[1] >= end || rg[0] - 1 == end) {
                    removeAt(ranges, j);
                    j--, len--;
                    end = rg[1];
                    break;
                }
                /* istanbul ignore else */
                if (rg[1] < end) {
                    let r = removeAt(ranges, j);
                    j--, len--;
                }
            }
            if (range[1] > end) { end = range[1]; }
            else { range[1] = end; }

        }
    }
}
export function _reverseRange(ranges: number[][], start: number, end: number): ExtendedArray {
    let reverse: ExtendedArray = [];
    reverse.items = 0;
    for (let i = 0, len = ranges.length; i < len; i++) {
        let range = ranges[i];
        if (end < range[1]) { return reverse; }
        if (range[0] > start) {
            reverse.items += range[0] - start + 1;
            reverse.push([start, range[0] - 1]);
            start = range[1] + 1;
        }
    }
    let range = ranges[ranges.length - 1];
    /* istanbul ignore else */
    if (range[1] < end) {
        reverse.push([range[1] + 1, end]);
    }
    return reverse;
}
export function _searchRange<T>(sarr_arg: IndexedBucket<T>, options: SearchRangeOptions): any[] | number {
    let sarr = sarr_arg,
        // prop = options.prop,
        value = options.condition,
        // sindex = options.startIndex = _isNull(options.startIndex) ? 0 : options.startIndex,
        // eindex = options.endIndex = _isNull(options.endIndex) ? sarr.length - 1 : options.endIndex,
        findIndex = options.findIndex;

    if (_isObject(value)) {
        const condition = value;
        let tmp_arr = [], ranges = [];

        for (let cprop in condition) {
            /* istanbul ignore else */
            if (condition.hasOwnProperty(cprop)) {
                let found_index = -1;
                let opt = {
                    // prop: cprop,
                    condition: cprop == '$exists' ? undefined : condition[cprop],
                    // startIndex: null,
                    // endIndex: null,
                    findIndex: true
                };
                if (cprop != '$in' && cprop != '$nin') {
                    found_index = _searchRange(sarr, opt) as number;
                }
                switch (cprop) {
                    case '$eq':
                    case '$equal':
                        _recordRange(ranges, found_index, found_index);
                        break;
                    case '$ne':
                        _recordRange(ranges, 0, found_index - 1);
                        _recordRange(ranges, found_index + 1, sarr.__bucket_keys.length - 1);
                        break;
                    case '$lt':
                        _recordRange(ranges, 0, found_index - 1, 1);
                        break;
                    case '$lte':
                        _recordRange(ranges, 0, found_index, 1);
                        break;
                    case '$gt':
                        _recordRange(ranges, found_index + 1, sarr.__bucket_keys.length - 1, 2);
                        break;
                    case '$gte':
                        _recordRange(ranges, found_index, sarr.__bucket_keys.length - 1, 2);
                        break;
                    case '$exists':
                        // let rng;
                        if (condition[cprop]) {
                            _recordRange(ranges, 0, found_index - 1);
                            _recordRange(ranges, found_index + 1, sarr.__bucket_keys.length);
                        } else {
                            _recordRange(ranges, found_index, found_index);
                        }
                        break;
                    case '$in':
                        for (let i = 0, len = condition[cprop].length; i < len; i++) {
                            found_index = sarr.__bucket_keys.indexOf(condition[cprop][i]);
                            _recordRange(ranges, found_index, found_index);
                        }
                        break;
                    case '$nin':
                        let rng = [];
                        for (let i = 0, len = condition[cprop].length; i < len; i++) {
                            found_index = sarr.__bucket_keys.indexOf(condition[cprop][i]);
                            rng.push([found_index, found_index]);
                        }
                        rng = _reverseRange(rng, 0, sarr.__bucket_keys.length - 1)
                        for (let i = 0, len = rng.length; i < len; i++) {
                            _recordRange(ranges, rng[i][0], rng[i][1]);
                        }
                        break;
                }
            }
        }
        for (let i = 0, len = ranges.length; i < len; i++) {
            let range = ranges[i];
            for (let j = range[0], jlen = Math.min(sarr.__bucket_keys.length, range[1] + 1); j < jlen; j++) {
                tmp_arr = tmp_arr.concat(sarr[sarr.__bucket_keys[j]]);
            }
        }
        return tmp_arr;
    }

    if (findIndex) {
        return sarr.__bucket_keys.indexOf(value);
    }
    return sarr[value];
}

export type MongoQuery = any;
export type WhereProjection = string | string[] | boolean | Fields;
export default function where<T>(objs: AnyObjects, condition?: MongoQuery, limit?: number): T[];
export default function where<T>(objs: AnyObjects, condition?: MongoQuery, useReference?: boolean, limit?: number): T[];
export default function where<T>(objs: AnyObjects, condition?: MongoQuery, projection?: WhereProjection, limit?: number): T[];
export default function where<T>(objs, condition?, projection?, limit?): T[] {
    try {
        let records = objs as IndexedArray<T>;
        if (!records || !records.length) { return []; }


        // if no condition was given, return all
        if (!condition) { return records.slice(0, limit); }
        if (_isInt(projection)) {
            limit = projection;
            projection = undefined;
        }
        if (limit === 0) { return []; }
        limit = limit || 0;

        if (_isFunction(condition) && !projection) {
            return _whereFunction({ objs: records, condition: condition, limit: limit });
        }
        // check if there is query MongoDB syntax
        let simple = !projection;
        if (simple) {
            tryEval(condition, function (cond) {
                return JSON.stringify(condition, function (key, val) {
                    if (key[0] == '$') {
                        simple = false;
                        throw '';
                    }
                    return val;
                });
            });
        }

        // determine if indexes can be utilized
        let indexProps = [], ipi = 0, qcount = 0;
        if (records.__indexed_buckets) {
            for (let prop in condition) {
                /* istanbul ignore else */
                if (condition.hasOwnProperty(prop)) {
                    qcount++;
                    if (records.__indexed_buckets[prop]) {
                        indexProps[ipi++] = prop;
                    }
                }
            }
        }
        let arr = records, ipHasLength = !!indexProps.length;
        if (ipHasLength) {
            let prop, i = 0;

            let orderedLists = [], fi = 0, len = arr.length, oli = 0;
            while (prop = indexProps[i++]) {
                let ordered = _searchRange(arr.__indexed_buckets[prop], {
                    // prop: prop,
                    condition: condition[prop],
                    // startIndex: null,
                    // endIndex: null,
                    findIndex: null
                }) as any[];

                if (len > ordered.length) {
                    len = ordered.length;
                    fi = i - 1;
                }
                orderedLists[oli++] = ordered;
            }
            /* istanbul ignore else */
            if (orderedLists.length == 1) {
                arr = orderedLists[fi];
            } else if (len < 1000) {
                let farr = orderedLists[fi], ai = 0;
                arr = [];
                for (let i = 0; i < len; i++) {
                    let addit = true;
                    for (let j = 0, jlen = orderedLists.length; j < jlen; j++) {
                        if (fi == j) { continue; }
                        if (!~orderedLists[j].indexOf(farr[i])) {
                            addit = false;
                            break;
                        }
                    }
                    addit && (arr[ai++] = farr[i]);
                }
            }
            if (qcount == ipi) {
                return arr;
            }
        }

        if (simple) {
            let boolCond = '', useQueryNested = false;
            for (let prop in condition) {
                if (!condition.hasOwnProperty(prop) || ipHasLength && ~indexProps.indexOf(prop)) { continue; }
                if (~prop.indexOf('.')) { useQueryNested = true; break; }
                let q = _isString(condition[prop]) ? '\'' : '';
                if (_isRegExp(condition[prop])) {
                    boolCond += `${condition[prop]}.test(record['${prop}']) && `;
                } else if (typeof condition[prop] == 'object') {
                    boolCond += `_equals(record['${prop}'],${JSON.stringify(condition[prop])}) && `;
                } else {
                    boolCond += `record['${prop}']==${q}${condition[prop]}${q} && `;
                }
            }
            boolCond = !useQueryNested ? `${boolCond}true` : '';
            return _createFuncAndFilter<T>({
                ifblock: boolCond,
                _refs: null,
                arr: arr,
                limit: limit,
                condition: condition
            });
        }


        let _refs = [],
            ifblock = _subQuery(condition, null, null, _refs);

        return _createFuncAndFilter<T>({
            ifblock: ifblock,
            projection: projection,
            _refs: _refs,
            arr: arr,
            limit: limit,
            condition: condition
        });
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.where", e);
        return [];
    }
}
