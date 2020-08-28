/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from './error';
import average from '../methods/average';
import capitalize from '../methods/capitalize';
import format from '../methods/format';
import getDayOfYear from '../methods/getGMTOffset';
import getWeek from '../methods/getWeek';
import isSubset from '../methods/isSubset';
import isEmpty from '../methods/isEmpty';
import stdev from '../methods/stdev';
import toSet from '../methods/toSet';
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
import foo from './foo';
import tryEval from './tryEval';
import sortBy from './sortBy';
import removeAll from './removeAll';
import rand from './rand';
import merge from './merge';
import parseRaw from '../methods/parseRaw';
import getValue from '../methods/getValue';
import replaceAll from '../methods/replaceAll';
import universalTrim from '../methods/universalTrim';
import indexOfAlt from '../methods/indexOfAlt';
import _generalTrim from '../protected/_generalTrim';

import {
    IndexedArray,
    IndexedBucket,
    Documents,
    Stage,
    Meta,
    CreateFuncOptions,
    SearchRangeOptions,
    ExtendedArray,
    UnwindOptions,
    AnyObjects,
    AnyObject,
    Fields
} from '../models/Arrays';


export interface MongoExpression {
    $literal?: any;
    $and?: any;
    $or?: any;
    $not?: any;
    $setEquals?: any;
    $setIntersection?: any;
    $setUnion?: any;
    $setDifference?: any;
    $setIsSubset?: any;
    $anyElementTrue?: any;
    $allElementsTrue?: any;
    $cmp?: any;
    $eq?: any;
    $gt?: any;
    $gte?: any;
    $lt?: any;
    $lte?: any;
    $ne?: any;
    $add?: any;
    $subtract?: any;
    $multiply?: any;
    $divide?: any;
    $mod?: any;
    $concat?: any;
    $substr?: any;
    $toLower?: any;
    $toUpper?: any;
    $strcasecmp?: any;
    $size?: any;
    $map?: any;
    $let?: any;
    $dayOfYear?: any;
    $dayOfMonth?: any;
    $dayOfWeek?: any;
    $year?: any;
    $month?: any;
    $week?: any;
    $hour?: any;
    $minute?: any;
    $second?: any;
    $millisecond?: any;
    $dateToString?: any;
    $cond?: any
    $ifNull?: any;
}
const literalKeys = ['$literal'],
    boolKeys = ['$and', '$or', '$not'],
    setKeys = ['$setEquals', '$setIntersection', '$setUnion', '$setDifference', '$setIsSubset', '$anyElementTrue', '$allElementsTrue'],
    compareKeys = ['$cmp', '$eq', '$gt', '$gte', '$lt', '$lte', '$ne'],
    arithmeticKeys = ['$add', '$subtract', '$multiply', '$divide', '$mod'],
    stringKeys = ['$concat', '$substr', '$toLower', '$toUpper', '$strcasecmp'],
    arrayKeys = ['$size'],
    variableKeys = ['$map', '$let'],
    dateKeys = ['$dayOfYear', '$dayOfMonth', '$dayOfWeek', '$year', '$month', '$week', '$hour', '$minute', '$second', '$millisecond', '$dateToString'],
    conditionalKeys = ['$cond', '$ifNull']


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
            if (!stage.hasOwnProperty(opts)) { continue; }
            if (operator) {
                //noinspection ExceptionCaughtLocallyJS
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
                    if (!value.hasOwnProperty(prop)) { continue; }
                    let pre = "";
                    if (!~value[prop]) { pre = "!"; }
                    sorter.push(pre + prop);
                }
                return sortBy(docs, sorter);
            case "$out":
                let rtnDocs = duplicate(docs, true);
                if (isString(value)) {
                    // @ts-ignore
                    $g[value] = rtnDocs;
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
    } catch (e) {
        error && error('aggregate.__processStage', e);
        return null;
    }
}

export function __pullHelper(target: any[], lookup: any[]): void {
    if (!_isArray(lookup)) { lookup = [lookup]; }
    for (let i = 0, len = lookup.length; i < len; i++) {
        let value = lookup[i];
        for (let j = 0, jlen = target.length; j < jlen; j++) {
            if (equals(value, target[j])) {
                removeAt(target, j);
                j--, jlen--;
            }
        }

    }
}

export function _groupFieldHelper(obj: any, fields: string[]): string {
    let prop = "", j = 0, field;
    while (field = fields[j++]) {
        let option = { validPath: 0 };
        let value = getProperty(obj, field, option);
        if (!option.validPath) { continue; }
        prop += `${field}:${value},`;
    }
    return prop;
}
export function _joinHelper<T, R, TResult>(objs: T[], arr: R[], on: string | string[], exclusive?: boolean): TResult[] {
    let records = [], propRef = [], objRef = arr[0] || {};

    if (isString(on)) {
        // @ts-ignore
        on = on.split('=');
        // @ts-ignore
        if (on.length == 1) { on = [on, on]; }
        let name = _getFuncName(arguments.callee.caller);
        on = universalTrim(on as string[]);
        name == "joinRight" && (on = [on[1], on[0]]);
    }

    for (let prop in objRef) {
        if (objRef.hasOwnProperty(prop)) {
            propRef.push(prop);
        }
    }
    for (let i = 0, len = objs.length; i < len; i++) {
        let record = duplicate(objs[i], true), query = {}, results;
        query[on[1]] = record[on[0]];
        results = where(arr, query);
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
export function _processClause(clause: string): any {
    try {
        let index = indexOfAlt(clause, /between/i);
        if (~index) { // contains between predicate
            //replace AND in the between to prevent confusion for AND clause separator
            clause.replace(/between( .*? )and( .*?)( |$)/gi, 'between$1&and$2$3');
        }

        let ORs = clause.split(/ or /i), query = { "$or": [] }, i = 0, or;
        while (or = ORs[i++]) {
            let ANDs = or.split(/ and /i),
                aquery = { '$and': [] }, j = 0, and;
            while (and = ANDs[j++]) {
                let predicateClause = and,
                    cond = {};

                //=, <>, >, >=, <, <=, IN, BETWEEN, LIKE, IS NULL or IS NOT NULL
                switch (true) {
                    case !!~(index = predicateClause.indexOf('=')):
                        cond[predicateClause.substring(0, index).trim()] = { '$equals': tryEval(predicateClause.substring(index + 1).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('<>')):
                        cond[predicateClause.substring(0, index).trim()] = { '$ne': tryEval(predicateClause.substring(index + 1).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('>')):
                        cond[predicateClause.substring(0, index).trim()] = { '$gt': tryEval(predicateClause.substring(index + 1).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('>=')):
                        cond[predicateClause.substring(0, index).trim()] = { '$gte': tryEval(predicateClause.substring(index + 1).trim()) };
                        aquery['$and'].push({ '$gte': cond });
                        break;
                    case !!~(index = predicateClause.indexOf('<')):
                        cond[predicateClause.substring(0, index).trim()] = { '$lt': tryEval(predicateClause.substring(index + 1).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case !!~(index = predicateClause.indexOf('<=')):
                        cond[predicateClause.substring(0, index).trim()] = { '$lte': tryEval(predicateClause.substring(index + 1).trim()) };
                        aquery['$and'].push(cond);
                        break;
                    case indexOfAlt(predicateClause, /between/i) == 0:
                        let nums = predicateClause.replace(/between (.*?) &and (.*?) ( |$)/i, '$1,$2').split(',');
                        aquery['$and'].push({ '$gte': tryEval(nums[0]) });
                        aquery['$and'].push({ '$lte': tryEval(nums[1]) });
                        break;
                    case !!~(index = indexOfAlt(predicateClause, / in /i)):
                        let _in = tryEval(predicateClause.substring(index + 4).trim().replace(/\((.*)\)/, '[$1]'));
                        if (!_in) {
                            //noinspection ExceptionCaughtLocallyJS
                            throw "Invalid syntax near 'in'";
                        }
                        cond[predicateClause.substring(0, index).trim()] = _in;
                        aquery['$and'].push({ '$in': cond });
                        break;
                    case !!~(index = indexOfAlt(predicateClause, /is null/i)):
                        cond[predicateClause.substring(0, index).trim()] = null;
                        aquery['$and'].push({ '$equals': cond });
                        break;
                    case !!~(index = indexOfAlt(predicateClause, /is not null/i)):
                        cond[predicateClause.substring(0, index).trim()] = null;
                        aquery['$and'].push({ '$ne': cond });
                        break;
                    case !!~(index = indexOfAlt(predicateClause, / like /i)):
                        let likeVal = "^" + replaceAll(_generalTrim(predicateClause.substring(index + 6), null, [' ', "'", '"']), "%", ".*?") + "$";
                        cond[predicateClause.substring(0, index).trim()] = { '$regex': new RegExp(likeVal, 'i') };
                        aquery['$and'].push(cond);
                        break;
                }
            }
            query['$or'].push(aquery);
        }

        return query;
    } catch (e) {
        error && error('where.processClause', e);
    }
}
export function __processGroup<T>(docs: Documents<T>, expr: any): Documents<T> {
    try {
        let _ids = expr._id, i = 0, groupings = {}, results = [], meta: Meta = { index: 0, length: docs.length, sample: docs.sample }, doc;
        while (doc = docs[meta.index = i++]) {
            let result, key = "null", keys = null;
            if (_ids) {
                keys = {};
                for (let prop in _ids) {
                    if (!_ids.hasOwnProperty(prop)) { continue; }
                    keys[prop] = __processExpression(doc, _ids[prop]);
                }
                key = JSON.stringify(keys);
            }
            if (!groupings[key]) {
                result = groupings[key] = { _id: keys };
                results.push(result);
            } else {
                result = groupings[key];
            }
            for (let prop in expr) {
                if (!expr.hasOwnProperty(prop) || prop == "_id") { continue; }
                result[prop] = __processAccumulator(doc, expr[prop], result.hasOwnProperty(prop) ? result[prop] : undefined, meta);
            }
        }
        return results;
    } catch (e) {
        error && error('aggregate.__processGroup', e);
        return null;
    }
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
        if (projection.hasOwnProperty(prop) && projection[prop]) {
            let val = getProperty(record, prop) || null;
            if (prop == '*') {
                copy = duplicate(record, true);
            } else if (parseBoolean(projection[prop])) {
                if (preserveProperties || !isNull(val)) {
                    setProperty(copy, prop, val);
                }
            } else if (!_isObject(projection[prop]) && !val) {
                copy[prop] = projection[prop];
            } else if (_isObject(projection[prop]) || val && !_isArray(val)) {
                copy[prop] = __processExpression(record, projection[prop]);
            } else if (val) {
                let del = true;
                if (prop.slice(-2) == '.$') {
                    prop = prop.slice(0, -2);
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
                } else if (projection[prop]) {
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
export function _createFunc<T>(args: CreateFuncOptions): T[] {
    let _qnp = __queryNestedProperty,
        _clt = _containsLessThan,
        _clte = _containsLessThanEqual,
        _cgt = _containsGreaterThan,
        _cgte = _containsGreaterThanEqual,
        _ct = _containsType,
        _cm = _containsMod,
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
        return;
    }
    for (let i = 0, len = ranges.length; i < len; i++) {
        let range = ranges[i];
        if (end <= range[1] && flag === 1) {
            if (i) {
                removeAt(ranges, i);
                i--, len--;
            }
            ranges[i][1] = end;
            return;
        }
        if (start > range[1] + 1) {
            if (flag === 2) {
                let r = removeAt(ranges, i);
                i--, len--;
            }
            continue;
        }
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
    if (range[1] < end) {
        reverse.push([range[1] + 1, end]);
    }
    return reverse;
}
export function _searchRange(sarr_arg: IndexedBucket, options: SearchRangeOptions): any[] | number {
    let sarr = sarr_arg,
        // prop = options.prop,
        value = options.condition,
        // sindex = options.startIndex = _isNull(options.startIndex) ? 0 : options.startIndex,
        // eindex = options.endIndex = _isNull(options.endIndex) ? sarr.length - 1 : options.endIndex,
        findIndex = options.findIndex;

    if (_isObject(value)) {
        let tmp_arr = [], ranges = [];

        for (let cprop in value) {
            if (value.hasOwnProperty(cprop)) {
                let found_index = -1;
                let opt = {
                    prop: cprop,
                    condition: cprop == '$exists' ? undefined : value[cprop],
                    findIndex: true,
                    startIndex: null,
                    endIndex: null
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
                        _recordRange(ranges, found_index + 1, sarr.__bucket__keys.length);
                        break;
                    case '$lt':
                        _recordRange(ranges, 0, found_index - 1, 1);
                        break;
                    case '$lte':
                        _recordRange(ranges, 0, found_index + 1, 1);
                        break;
                    case '$gt':
                        _recordRange(ranges, found_index + 1, sarr.__bucket__keys.length /*- 1*/, 2);
                        break;
                    case '$gte':
                        _recordRange(ranges, found_index, sarr.__bucket__keys.length /*- 1*/, 2);
                        break;
                    case '$exists':
                        // let rng;
                        if (value[cprop]) {
                            _recordRange(ranges, 0, found_index - 1);
                            _recordRange(ranges, found_index + 1, sarr.__bucket__keys.length);
                        } else {
                            _recordRange(ranges, found_index, found_index);
                        }
                        break;
                    case '$in':
                        for (let i = 0, len = value[cprop].length; i < len; i++) {
                            found_index = sarr.__bucket__keys.indexOf(value[cprop][i]);
                            _recordRange(ranges, found_index, found_index);
                        }
                        break;
                    case '$nin':
                        let rng = [];
                        for (let i = 0, len = value[cprop].length; i < len; i++) {
                            found_index = sarr.__bucket__keys.indexOf(value[cprop][i]);
                            rng.push([found_index, found_index]);
                        }
                        rng = _reverseRange(rng, 0, sarr.__bucket__keys.length /*- 1*/)
                        for (let i = 0, len = rng.length; i < len; i++) {
                            _recordRange(ranges, rng[i][0], rng[i][1]);
                        }
                        break;
                }
            }
        }
        for (let i = 0, len = ranges.length; i < len; i++) {
            let range = ranges[i];
            for (let j = range[0], jlen = range[1] + 1; j < jlen; j++) {
                tmp_arr = tmp_arr.concat(sarr[sarr.__bucket__keys[j]]);
            }
        }
        return tmp_arr;
    }

    if (findIndex) {
        return sarr.__bucket__keys.indexOf(value);
    }
    return sarr[value];
}
export function _subQuery(query: MongoQuery, field: string, index: number, _whereRefs_arg?: any[]): string | boolean {
    let _whereRefs = _whereRefs_arg || [];
    if (!_isObject(query)) {
        if (~field.indexOf('.')) {
            return `_equals($s.getProperty(record,'${field}'), ${parseRaw(query)})`;
        }
        return `_equals(record['${field}'], ${parseRaw(query)})`;
    }
    let expression = 'true', comparison_map = {
        '$lt': '_clt',
        '$lte': '_clte',
        '$gt': '_cgt',
        '$gte': '_cgte'
    };


    // prep multiple subqueries
    for (let prop in query) {
        if (!query.hasOwnProperty(prop)) { continue; }
        let val;
        switch (prop) {
            // value is the record in the array
            // q is the conditional value
            case '$equals':
            case '$eq':
            case '$regex':
            case '$ne':
                val = getValue(query[prop]);
                let q = `(${parseRaw(val)})`;
                if (_isFunction(val)) {
                    q += `(record,'${field}',index)`;
                } else {
                    q = `_contains(values,${q})`;
                }
                expression += ` && ((values = _qnp(record, '${field}')).length && ${(prop == '$ne' ? '!' : '')}${q})`;
                break;
            case '$lt':
            case '$lte':
            case '$gt':
            case '$gte':
                expression += ` && ((values = _qnp(record, '${field}')).length && ${comparison_map[prop]}(values,${parseRaw(query[prop])}))`;
                break;
            case '$exists':
                expression += ` && ((finished = {validPath:0}),$s.getProperty(record,'${field}','.',finished),$s.parseBoolean(finished.validPath) == ${query['$exists']})`;
                break;
            case '$type':
                let qt = isNull(query['$type']) ? '!' : '';
                expression += ` && (${qt}(values = _qnp(record, '${field}')).length && _ct(values,${_getFuncName(query['$type'])}))`;
            case '$text':
                //return record.getProperty(field).contains(query['$search']);
                break;
            case '$mod':
                let qm = _isArray(query['$mod']);
                expression += ` && ((values = _qnp(record, '${field}')).length && ${qm} && _cm(values,${parseRaw(query[prop])}))`;
                break;
            case '$all':
                let all = parseRaw(query['$all']) || undefined;
                expression += ` && (values = _qnp(record, '${field}')),(all = ${all}),(_isArray(values[0]) && _isArray(all)) && (function(){ for (var j = 0, jlen = all.length; j < jlen; j++){ if (!_contains(values[0],all[j])) { return false; }} return true;})()`;
                break;
            case '$size':
                let ival = parseInt(query['$size']);
                expression += ` && (values = _qnp(record, '${field}')[0]),(_isArray(values) ? (${ival} === values.length) : (values == undefined && 0 === ${ival}))`;
                break;
            case '$where':
                let isfunc = _isFunction(query['$where']);
                if (isfunc) {
                    _whereRefs.push(query['$where']);
                }
                val = `(${(isfunc ? `__where_cb${_whereRefs.length}` : `function(){return (${query['$where']});}`)})`;
                expression += ' && ' + val + '.call(record)';
                break;
            case '$elemMatch':
                expression += ` && (values = _qnp(record, '${field}')[0]),(_isArray(values) && !!where(values,${parseRaw(query['$elemMatch'])},1).length)`;
                break;
            case '$or':
            case '$nor':
                let ors = query[prop], o = 0, or, nor = '';
                if (!_isArray(ors)) { return false; }
                if (prop == '$nor') { nor = '!'; }
                expression += ` && ${nor}(`;
                while (or = ors[o++]) {
                    expression += `(${_subQuery(or, field, index, _whereRefs)}) || `;
                }
                expression += 'false)';

                break;
            case '$and':
                let ands = query['$and'], a = 0, and;
                if (!_isArray(ands)) { return false; }
                expression += ' && (';
                while (and = ands[a++]) {
                    expression += `(${_subQuery(and, field, index, _whereRefs)}) && `;
                }
                expression += 'true)';

                break;
            case '$not':
                if (!_isObject(query['$not'])) {
                    expression += ` && _contains(values, ${parseRaw(query['$not'])})`;
                    break;
                }

                expression += ` && !(${_subQuery(query[prop], field, null, _whereRefs)})`;
                break;

            case '$in':
            case '$nin':
                expression += ` && ${(prop == '$nin' ? '!' : '')}((values = _qnp(record, '${field}')),_contains(${parseRaw(query[prop])},values))`;
                break;
            default:
                expression += ` && ${_subQuery(query[prop], replaceAll(prop, '\'', '\\\''), null, _whereRefs)}`;
                break;
        }
    }
    return expression;
}

export function __queryNestedProperty(obj: AnyObject, path: string/*, value*/): any[] {
    if (obj[path]) { return [obj[path]]; }
    let parts = path.split('.'), values = [];
    let prop, i = 0;
    while (prop = parts[i++]) {
        if (!obj.hasOwnProperty(prop)) { return []; }
        if (_isArray(obj[prop])) {
            if (isNull(parts[i])) { return obj[prop]; }
            let subPath = parts.slice(i).join('.'), items = obj[prop];
            for (let j = 0, jlen = items.length; j < jlen; j++) {
                values = values.concat(__queryNestedProperty(items[j], subPath));
            }
            return values;
        }
        obj = obj[prop];
    }
    return [obj];
}
export function __processAccumulator<T>(doc: T, accumulator: any, previousValue_arg: any, meta: AccumulatorMeta<T>): any[] | number {
    let value = __processExpression(doc,
        accumulator['$sum'] ||
        accumulator['$avg'] ||
        accumulator['$first'] ||
        accumulator['$last'] ||
        accumulator['$max'] ||
        accumulator['$min'] ||
        accumulator['$push'] ||
        accumulator['$addToSet'] ||
        accumulator['$stdDevPop'] ||
        accumulator['$stdDevSamp']
    ),
        previousValue = previousValue_arg;
    switch (true) {
        case !!accumulator['$sum']:
            return (value || 0) + (previousValue || 0);
        case !!accumulator['$avg']:
            previousValue = previousValue || [];
            if (!isNull(value)) { previousValue.push(value); }
            if (meta.length == meta.index + 1) { previousValue = average(previousValue); }
            return previousValue;
        case !!accumulator['$first']:
            if (isNull(previousValue)) { previousValue = value; }
            return previousValue;
        case !!accumulator['$last']:
            return isNull(value, previousValue);
        case !!accumulator['$max']:
            if (isNull(previousValue)) { previousValue = -9007199254740991; }
            if (isNull(value)) { value = -9007199254740991 }
            let isPreviousMax = previousValue == -9007199254740991 && value == -9007199254740991;
            if (meta.length == meta.index + 1 && isPreviousMax) { return undefined; }
            return Math.max(value, previousValue);
        case !!accumulator['$min']:
            if (isNull(previousValue)) { previousValue = 9007199254740991; }
            if (isNull(value)) { value = 9007199254740991 }
            const isPreviousMin = previousValue == -9007199254740991 && value == -9007199254740991;
            if (meta.length == meta.index + 1 && isPreviousMin) { return undefined; }
            return Math.min(value, (previousValue || 9007199254740991));
        case !!accumulator['$push']:
            previousValue = previousValue || [];
            if (!isNull(value)) { previousValue.push(value); }
            return previousValue;
        case !!accumulator['$addToSet']:
            previousValue = previousValue || [];
            if (!isNull(value) && !~previousValue.indexOf(value)) { previousValue.push(value); }
            return previousValue;
        case !!accumulator['$stdDevSamp']:
            if (meta.sample && ~meta.sample.indexOf(doc)) {
                if (!isNull(value)) {
                    previousValue = previousValue || [];
                    previousValue.push(value);
                }
            }
            if (meta.length == meta.index + 1) {
                previousValue = stdev(previousValue || []);
            }
            return isNull(previousValue) ? null : previousValue;
        case !!accumulator['$stdDevPop']:
            if (!isNull(value)) {
                previousValue = previousValue || [];
                previousValue.push(value);
            }
            if (meta.length == meta.index + 1) {
                previousValue = stdev(previousValue || []);
            }
            return isNull(previousValue) ? null : previousValue;
    }
}
export function __processExpression<T>(doc: T, expression: string | object): any {
    if (_isString(expression)) {
        let expr_str = expression as string;
        if (expr_str[0] == '$') { expr_str = expr_str.substr(1); }
        return getProperty(doc, expr_str.replace('$CURRENT.', ''));
    }
    if (!_isObject(expression)) { return expression; }

    let expr: object = expression as object;
    for (let field in expr) {
        if (!expr.hasOwnProperty(field)) { continue; }
        let value = expr[field];

        switch (true) {
            case !!~literalKeys.indexOf(field):
                return expr;
            case !!~boolKeys.indexOf(field):
                return __parseBooleanExpr(doc, expr, field);
            case !!~setKeys.indexOf(field):
                return __parseSetExpr(doc, expr, field);
            case !!~compareKeys.indexOf(field):
                return __parseComparisonExpr(doc, expr, field);
            case !!~arithmeticKeys.indexOf(field):
                return __parseArithmeticExpr(doc, expr, field);
            case !!~stringKeys.indexOf(field):
                return __parseStringExpr(doc, expr, field);
            case !!~arrayKeys.indexOf(field):
                return __parseArrayExpr(doc, expr, field);
            case !!~variableKeys.indexOf(field):
                return __parseVariableExpr(doc, expr, field);
            case !!~dateKeys.indexOf(field):
                return __parseDateExpr(doc, expr, field);
            case !!~conditionalKeys.indexOf(field):
                return __parseConditionalExpr(doc, expr, field);
            default:
                __processExpression(doc, value);
                break;
        }
    }
}
export function __parseCond<T>(doc: T, expr: any): any {
    if (!_isObject(expr) || !expr['$cond']) { return expr; }
    // parse $cond
    let condition = expr['$cond'],
        boolExpression,
        thenStatement,
        elseStatement;
    if (_isArray(condition)) {
        boolExpression = condition[0];
        thenStatement = condition[1];
        elseStatement = condition[2];
    } else {
        boolExpression = condition['if'];
        thenStatement = condition['then'];
        elseStatement = condition['else'];
    }
    return __processExpression(doc, boolExpression) ? thenStatement : elseStatement;
}

function __parseArithmeticExpr<T>(doc: T, expr: MongoExpression, field: string): number {
    let value, i = 0, sexp;
    switch (field) {
        case '$add':
            value = 0;
            while (sexp = expr['$add'][i++]) {
                value += __processExpression(doc, sexp);
            }
            return value;
        case '$subtract':
            return __processExpression(doc, expr['$subtract'][0]) - __processExpression(doc, expr['$subtract'][1]);
        case '$multiply':
            value = 1;
            while (sexp = expr['$multiply'][i++]) {
                value *= __processExpression(doc, sexp) || 0;
            }
            return value;
        case '$divide':
            return __processExpression(doc, expr['$divide'][0]) / __processExpression(doc, expr['$divide'][1]);
        case '$mod':
            return __processExpression(doc, expr['$mod'][0]) % __processExpression(doc, expr['$mod'][1]);
    }
}
function __parseArrayExpr<T>(doc: T, expr: MongoExpression, field: string): number {
    switch (field) {
        case '$size':
            return (__processExpression(doc, expr[field]) || []).length;
    }
}
function __parseBooleanExpr<T>(doc: T, expr: MongoExpression, field: string): any {
    let arr = [], i = 0, obj;
    switch (field) {
        case '$and':
            arr = expr['$and'];
            while (obj = arr[i++]) {
                if (!__processExpression(doc, arr)) { return false; }
            }
            return true;
        case '$or':
            arr = expr['$or'];
            while (obj = arr[i++]) {
                if (__processExpression(doc, arr)) { return true; }
            }
            return false;
        case '$not':
            arr = expr['$not'];
            return !__processExpression(doc, arr[0]);
    }
}
function __parseComparisonExpr<T>(doc: T, expr: MongoExpression, field: string): boolean {
    let sortOrder = [
        undefined,
        null,
        Number,
        typeof Symbol != 'undefined' ? Symbol : 'Symbol',
        String,
        Object,
        Array,
        // @ts-ignore
        typeof BinData != 'undefined' ? BinData : 'BinData',
        // @ts-ignore
        typeof ObjectId != 'undefined' ? ObjectId : 'ObjectId',
        Boolean,
        Date,
        // @ts-ignore
        typeof Timestamp != 'undefined' ? Timestamp : 'Timestamp',
        RegExp
    ],
        value1 = __processExpression(doc, expr[field][0]),
        value2 = __processExpression(doc, expr[field][1]),
        cmp = null;

    if (value1 == value2) { cmp = 0; }
    if (value1 < value2) { cmp = -1; }
    if (value1 > value2) { cmp = 1; }

    if (isNull(cmp)) {
        value1 = sortOrder.indexOf(~([null, undefined].indexOf(value1)) ? value1 : value1.constructor);
        value2 = sortOrder.indexOf(~([null, undefined].indexOf(value2)) ? value2 : value2.constructor);

        if (value1 < value2) { cmp = -1; }
        if (value1 > value2) { cmp = 1; }
    }
    switch (field) {
        case '$cmp':
            return cmp;
        case '$eq':
            return cmp === 0;
        case '$gt':
            return cmp === 1;
        case '$gte':
            return cmp === 1 || cmp === 0;
        case '$lt':
            return cmp === -1;
        case '$lte':
            return cmp === -1 || cmp === 0;
        case '$ne':
            return cmp !== 0;
    }
}
function __parseConditionalExpr<T>(doc: T, expr: MongoExpression, field: string): boolean {
    switch (field) {
        case '$cond':
            return __parseCond(doc, expr);
        case '$ifNull':
            let value = __processExpression(doc, expr['$ifNull'][0]);
            return isNull(value, __processExpression(doc, expr['$ifNull'][1]));
    }
}
function __parseDateExpr<T>(doc: T, expr: MongoExpression, field: string): number | string {
    let dt = __processExpression(doc, expr[field]);
    switch (field) {
        case '$dayOfYear':
            return getDayOfYear(dt);
        case '$dayOfMonth':
            return dt.getDate();
        case '$dayOfWeek':
            return dt.getDay() + 1;
        case '$year':
            return dt.getFullYear();
        case '$month':
            return dt.getMonth() + 1;
        case '$week':
            return getWeek(dt);
        case '$hour':
            return dt.getHours();
        case '$minute':
            return dt.getMinutes();
        case '$second':
            return dt.getSeconds();
        case '$millisecond':
            return dt.getMilliseconds();
        case '$dateToString':
            dt = __processExpression(doc, expr[field].date);
            return format(dt, expr[field].format);
    }
}
function __parseSetExpr<T>(doc: T, expr: MongoExpression, field: string): boolean | Set<T> {
    let i = 1, exp, j = 0, jlen, st, set1, set2, rtnSet, errorMessage, arr1, arr2, falseCondition;
    switch (field) {
        case '$setEquals':
            while (exp = expr[field][i++]) {
                set1 = duplicate(__processExpression(doc, expr[field][i - 2]));
                set2 = duplicate(__processExpression(doc, exp));
                if (!_isArray(set1) || !_isArray(set2)) {
                    //noinspection ExceptionCaughtLocallyJS
                    throw `Exception: All operands of $setEquals must be arrays. One argument is of type: ${capitalize(typeof (!_isArray(set1) ? set1 : set2))}`;
                }
                toSet(set1);
                toSet(set2);
                if (set1.length != set2.length) { return false; }
                for (jlen = set1.length; j < jlen; j++) {
                    if (!~set2.indexOf(set1[j])) { return false; }
                }
            }
            return true;
        case '$setIntersection':
            rtnSet = duplicate(__processExpression(doc, expr[field][0]));
            errorMessage = 'Exception: All operands of $setIntersection must be arrays. One argument is of type: ';
            if (!_isArray(rtnSet)) {
                throw errorMessage + capitalize((typeof rtnSet));
            }
            toSet(rtnSet);
            while (exp = expr[field][i++]) {
                set1 = duplicate(__processExpression(doc, exp));
                if (!_isArray(set1)) {
                    throw errorMessage + capitalize(typeof set1);
                }
                toSet(set1);
                if (set1.length < rtnSet.length) {
                    let settmp = set1;
                    set1 = rtnSet;
                    rtnSet = settmp;
                }
                for (jlen = rtnSet.length; j < jlen; j++) {
                    if (!~set1.indexOf(rtnSet[j])) { removeAt(rtnSet, j--); jlen--; }
                }
                if (!rtnSet.length) { return rtnSet; }
            }
            return rtnSet;
        case '$setUnion':
            rtnSet = duplicate(__processExpression(doc, expr[field][0]));
            errorMessage = 'Exception: All operands of $setUnion must be arrays. One argument is of type: ';
            if (!_isArray(rtnSet)) {
                //noinspection ExceptionCaughtLocallyJS
                throw errorMessage + capitalize(typeof rtnSet);
            }
            while (exp = expr[field][i++]) {
                let arr = duplicate(__processExpression(doc, exp));
                if (!_isArray(arr)) {
                    //noinspection ExceptionCaughtLocallyJS
                    throw errorMessage + capitalize(typeof arr);
                }
                rtnSet = rtnSet.concat(arr);
            }
            return toSet<T>(rtnSet);
        case '$setDifference':
            arr1 = duplicate(__processExpression(doc, expr[field][0]));
            arr2 = duplicate(__processExpression(doc, expr[field][1]));
            rtnSet = [];
            if (!_isArray(arr1) || !_isArray(arr2)) {
                //noinspection ExceptionCaughtLocallyJS
                throw `Exception: All operands of $setEquals must be arrays. One argument is of type: ${capitalize(typeof (!_isArray(arr1) ? arr1 : arr2))}`;
            }
            for (jlen = arr1.length; j < jlen; j++) {
                st = arr1[j];
                if (!~arr2.indexOf(st) && !~rtnSet.indexOf(st)) {
                    rtnSet.push(st);
                }
            }
            return rtnSet;
        case '$setIsSubset':
            arr1 = duplicate(__processExpression(doc, expr[field][0]));
            arr2 = duplicate(__processExpression(doc, expr[field][1]));
            rtnSet = [];
            if (!_isArray(arr1) || !_isArray(arr2)) {
                //noinspection ExceptionCaughtLocallyJS
                throw `Exception: All operands of $setEquals must be arrays. One argument is of type: ${capitalize(typeof (!_isArray(arr1) ? arr1 : arr2))}`;
            }
            return isSubset(arr1, arr2);
        case '$anyElementTrue':
            arr1 = duplicate(__processExpression(doc, expr[field][0]));
            falseCondition = [undefined, null, 0, false];

            while (st = arr1[j++]) {
                if (!~falseCondition.indexOf(st)) { return true; }
            }
            return false;
        case '$allElementsTrue':
            arr1 = duplicate(__processExpression(doc, expr[field][0]));
            falseCondition = [undefined, null, 0, false];

            for (jlen = arr1.length; j < jlen; j++) {
                if (~falseCondition.indexOf(arr1[j])) { return false; }
            }
            return true;
    }
}
function __parseStringExpr<T>(doc: T, expr: MongoExpression, field: string): any {
    switch (field) {
        case '$concat':
            let value = '', i = 0, exp;
            while (exp = expr['$concat'][i++]) {
                value += __processExpression(doc, exp);
            }
            return value;
        case '$substr':
            let index = expr['$substr'][1], length = expr['$substr'][2] < 0 ? undefined : expr['$substr'][2];
            return __processExpression(doc, expr['$substr'][0]).substr(index, length);
        case '$toLower':
            return (__processExpression(doc, expr['$toLower']) || '').toLowerCase();
        case '$toUpper':
            return (__processExpression(doc, expr['$toLower']) || '').toUpperCase();
        case '$strcasecmp':
            let value1 = (__processExpression(doc, expr['$strcasecmp'][0]) || '').toString(),
                value2 = (__processExpression(doc, expr['$strcasecmp'][1]) || '').toString();
            if (value1 == value2) { return 0; }
            if (value1 < value2) { return -1; }
            if (value1 > value2) { return 1; }
    }
}
function __parseVariableExpr<T>(doc: T, expr: MongoExpression, field: string): any {
    switch (field) {
        case '$map':
            let input = __processExpression(doc, expr[field].input),
                v_as = `$${expr[field].as}`,
                v_in = expr[field]['in'];

            for (let i = 0, len = input.length; i < len; i++) {
                doc[v_as] = input[i];
                input[i] = __processExpression(doc, v_in);
                delete doc[v_as];
            }
            return input;
        case '$let':
            let vars = expr[field].vars,
                rmProps = [], rtn = null;
            for (let prop in vars) {
                if (!vars.hasOwnProperty(prop)) { continue; }
                doc[`$${prop}`] = __processExpression(doc, vars[prop]);
                rmProps.push(prop);
            }
            rtn = __processExpression(doc, expr[field]['in']);
            for (let j = 0, jlen = rmProps.length; j < jlen; j++) {
                delete doc[rmProps[j]];
            }
            return rtn;
    }
}

export function _redact<T>(docs: Documents<T>, expr: any): Documents<T> {
    try {
        docs = isArray(docs) ? docs : [docs as any];
        let result = [], i = 0, doc;
        while (doc = docs[i++]) {
            let action = __parseCond(doc, expr);
            if (action == "$$KEEP") {
                result.push(doc);
            } else if (action == "$$DESCEND") { // return all fields at current document without embedded documents
                result.push(doc);
                for (let prop in doc) {
                    if (!doc.hasOwnProperty(prop) || isArray(doc[prop]) && !isObject(doc[prop][0]) || !isArray(doc[prop]) && !isObject(doc[prop])) {
                        continue;
                    }
                    doc[prop] = _redact(doc[prop], expr);
                    if (doc[prop] === undefined) {
                        delete doc[prop];
                    }
                }
            } else if (action == "$$PRUNE") {

            } else {
                //noinspection ExceptionCaughtLocallyJS
                throw `exception: $redact's expression should not return anything aside from the variables $$KEEP, $$DESCEND, and $$PRUNE, but returned ${parseRaw(action)}`;
            }
        }
        return result.length ? result : undefined;
    } catch (e) {
        error && error('aggregate._redact', e);
        return null;
    }
}
export function _unwind<T>(docs: Documents<T>, path: string | UnwindOptions): any[] {
    try {
        let results = [], doc, i = 0, options: UnwindOptions = {};
        if (isObject(path)) {
            options = path as UnwindOptions;
            path = options.path;
        }
        while (doc = docs[i++]) {
            let arr = __processExpression(doc, path);
            if (isNull(arr) || isArray(arr) && isEmpty(arr)) {
                doc = duplicate(doc);
                if (options.includeArrayIndex) {
                    doc[options.includeArrayIndex] = 0;
                }
                options.preserveNullAndEmptyArrays && results.push(doc);
                continue;
            }
            if (!isArray(arr)) {
                //noinspection ExceptionCaughtLocallyJS
                throw `Exception: Value at end of $unwind field path '${path}' must be an Array, but is a ${capitalize(typeof arr)}.`;
            }
            if (path[0] == "$") {
                path = (path as string).substr(1);
            }
            for (let j = 0, jlen = arr.length; j < jlen; j++) {
                let dup = duplicate(doc);
                if (options.includeArrayIndex) {
                    dup[options.includeArrayIndex] = j;
                }
                setProperty(dup, (path as string), arr[j]);
                results.push(dup);
            }
        }
        return results;
    } catch (e) {
        error && error('aggregate._unwind', e);
        return null;
    }
}
export function _whereFunction<T>(options: WhereFunctionOptions<T>): T[] {
    let obj = options.obj, condition = options.condition || foo;
    let limit = 0,
        jlen = obj.length,
        rarr = [], ai = 0;

    limit = options.limit || jlen;
    for (let j = 0; j < jlen && rarr.length < limit; j++) {
        let v = obj[j];
        if (condition.call(v, j, obj)) {
            rarr.push(v);
        }
    }

    return rarr;
}
export type AccumulatorMeta<T> = { length: number, index: number, sample: T[] };
export type MongoQuery = any;
export type WhereFunctionOptions<T> = { obj: T[], condition: Function, limit: number };
export type WhereProjection = string | string[] | boolean | Fields;
export default function where<T>(objs: AnyObjects, condition?: MongoQuery, limit?: number): T[];
export default function where<T>(objs: AnyObjects, condition?: MongoQuery, useReference?: boolean, limit?: number): T[];
export default function where<T>(objs: AnyObjects, condition?: MongoQuery, projection?: WhereProjection, limit?: number): T[];
export default function where<T>(objs, condition?, projection?, limit?): T[] {
    try {
        let records = objs as IndexedArray<T>;
        if (!records) { return []; }


        // if no condition was given, return all
        if (!condition) { return records.slice(0, limit); }
        if (_isInt(projection)) {
            limit = projection;
            projection = undefined;
        }
        if (limit === 0) { return []; }
        limit = limit || 0;

        if (_isFunction(condition) && !projection) {
            return _whereFunction({ obj: records, condition: condition, limit: limit });
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
                    prop: prop,
                    condition: condition[prop],
                    startIndex: null,
                    endIndex: null,
                    findIndex: null
                }) as any[];

                if (len > ordered.length) {
                    len = ordered.length;
                    fi = i - 1;
                }
                orderedLists[oli++] = ordered;
            }
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
            return _createFunc<T>({
                ifblock: boolCond,
                _refs: null,
                arr: arr,
                limit: limit,
                condition: condition
            });
        }


        let _refs = [],
            ifblock = _subQuery(condition, null, null, _refs);

        return _createFunc<T>({
            ifblock: ifblock,
            projection: projection,
            _refs: _refs,
            arr: arr,
            limit: limit,
            condition: condition
        });
    } catch (e) {
        error && error("Array.where", e);
        return [];
    }
}
