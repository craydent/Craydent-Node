import isNull from '../methods/isnull';
import average from '../methods/average';
import stdev from '../methods/stdev';
import isString from '../methods/isstring';
import getProperty from '../methods/getproperty';
import isObject from '../methods/isobject';
import isArray from '../methods/isarray';
import getDayOfYear from '../methods/getdayofyear';
import getWeek from '../methods/getweek';
import format from '../methods/format';
import duplicate from '../methods/duplicate';
import toSet from '../methods/toset';
import capitalize from '../methods/capitalize';
import removeAt from '../methods/removeat';
import isSubset from '../methods/issubset';
import { Documents, Meta } from '../models/Arrays';
import error from '../methods/error';

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
export type AccumulatorMeta<T> = { length: number, index: number, sample: T[] };
const literalKeys = ['$literal'],
    boolKeys = ['$and', '$or', '$not'],
    setKeys = ['$setEquals', '$setIntersection', '$setUnion', '$setDifference', '$setIsSubset', '$anyElementTrue', '$allElementsTrue'],
    compareKeys = ['$cmp', '$eq', '$gt', '$gte', '$lt', '$lte', '$ne'],
    arithmeticKeys = ['$add', '$subtract', '$multiply', '$divide', '$mod'],
    stringKeys = ['$concat', '$substr', '$toLower', '$toUpper', '$strcasecmp'],
    arrayKeys = ['$size'],
    variableKeys = ['$map', '$let'],
    dateKeys = ['$dayOfYear', '$dayOfMonth', '$dayOfWeek', '$year', '$month', '$week', '$hour', '$minute', '$second', '$millisecond', '$dateToString'],
    conditionalKeys = ['$cond', '$ifNull'];

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
            /* istanbul ignore next*/
            value = value || 0;
            /* istanbul ignore next*/
            previousValue = previousValue || 0;
            return value + previousValue;
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
            const isPreviousMax = previousValue == -9007199254740991 && value == -9007199254740991;
            if (meta.length == meta.index + 1 && isPreviousMax) { return undefined; }
            return Math.max(value, previousValue);
        case !!accumulator['$min']:
            if (isNull(previousValue)) { previousValue = 9007199254740991; }
            if (isNull(value)) { value = 9007199254740991 }
            const isPreviousMin = previousValue == 9007199254740991 && value == 9007199254740991;
            if (meta.length == meta.index + 1 && isPreviousMin) { return undefined; }
            return Math.min(value, (previousValue ||/* istanbul ignore next */ 9007199254740991));
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
                /* istanbul ignore next */
                previousValue = previousValue || []
                previousValue = stdev(previousValue);
            }
            return isNull(previousValue) ? null : previousValue;
        case !!accumulator['$stdDevPop']:
            if (!isNull(value)) {
                previousValue = previousValue || [];
                previousValue.push(value);
            }
            if (meta.length == meta.index + 1) {
                /* istanbul ignore next */
                previousValue = previousValue || []
                previousValue = stdev(previousValue);
            }
            return isNull(previousValue) ? null : previousValue;
    }
}
export function __processExpression<T>(doc: T, expression: string | object): any {
    if (isString(expression)) {
        let expr_str = expression as string;
        let isVar = false;
        if (expr_str[0] == '$') {
            isVar = true;
            expr_str = expr_str.substr(1);
        }
        return isNull(getProperty(doc, expr_str.replace('$CURRENT.', '')), isVar ? undefined : expr_str);
    }
    if (!isObject(expression)) { return expression; }

    let expr: object = expression as object;
    for (let field in expr) {
        /* istanbul ignore if */
        if (!expr.hasOwnProperty(field)) { continue; }
        let value = expr[field];

        switch (true) {
            case !!~literalKeys.indexOf(field):
                return value;
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
                return __processExpression(doc, value);
        }
    }
}
export function __processGroup<T>(docs: Documents<T>, expr: any): Documents<T> {
    try {
        let _ids = expr._id, i = 0, groupings = {}, results = [], meta: Meta = { index: 0, length: docs.length, sample: docs.sample }, doc;
        while (doc = docs[meta.index = i++]) {
            let result, key = "null", keys = null;
            if (isString(_ids)) {
                keys = __processExpression(doc, _ids);
            } else if (isObject(_ids)) {
                keys = {};
                for (let prop in _ids) {
                    /* istanbul ignore if */
                    if (!_ids.hasOwnProperty(prop)) { continue; }
                    keys[prop] = __processExpression(doc, _ids[prop]);
                }
            }
            key = JSON.stringify(keys);
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
    } catch (e) /* istanbul ignore next */ {
        error && error('aggregate.__processGroup', e);
        return null;
    }
}

export function __parseArithmeticExpr<T>(doc: T, expr: MongoExpression, field: string): number {
    let value, i = 0, sexp;
    switch (field) {
        case '$add':
            value = 0;
            while (!isNull(sexp = expr['$add'][i++])) {
                value += __processExpression(doc, sexp);
            }
            return value;
        case '$subtract':
            value = 0;
            while (!isNull(sexp = expr['$subtract'][i++])) {
                value -= __processExpression(doc, sexp);
            }
            return value;
        case '$multiply':
            value = 1;
            while (!isNull(sexp = expr['$multiply'][i++])) {
                value *= __processExpression(doc, sexp) || 0;
            }
            return value;
        case '$divide':
            return __processExpression(doc, expr['$divide'][0]) / __processExpression(doc, expr['$divide'][1]);
        case '$mod':
            return __processExpression(doc, expr['$mod'][0]) % __processExpression(doc, expr['$mod'][1]);
    }
}
export function __parseArrayExpr<T>(doc: T, expr: MongoExpression, field: string): number {
    switch (field) {
        case '$size':
            return (__processExpression(doc, expr[field]) || []).length;
    }
}
export function __parseBooleanExpr<T>(doc: T, expr: MongoExpression, field: string): any {
    let arr = [], i = 0, obj;
    switch (field) {
        case '$and':
            arr = expr['$and'];
            while (!isNull(obj = arr[i++])) {
                if (!__processExpression(doc, obj)) { return false; }
            }
            return true;
        case '$or':
            arr = expr['$or'];
            while (!isNull(obj = arr[i++])) {
                if (__processExpression(doc, obj)) { return true; }
            }
            return false;
        case '$not':
            arr = expr['$not'];
            return !__processExpression(doc, arr[0]);
    }
}
export function __parseComparisonExpr<T>(doc: T, expr: MongoExpression, field: string): boolean {
    let sortOrder = [
        undefined,
        null,
        Number,
        // istanbul ignore next
        typeof Symbol != 'undefined' ? Symbol : 'Symbol',
        String,
        Object,
        Array,
        // @ts-ignore
        // istanbul ignore next
        typeof BinData != 'undefined' ? BinData : 'BinData',
        // @ts-ignore
        // istanbul ignore next
        typeof ObjectId != 'undefined' ? ObjectId : 'ObjectId',
        Boolean,
        Date,
        // @ts-ignore
        // istanbul ignore next
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
export function __parseCond<T>(doc: T, expr: any): any {
    if (!isObject(expr) || !expr['$cond']) { return expr; }
    // parse $cond
    let condition = expr['$cond'],
        boolExpression,
        thenStatement,
        elseStatement;
    if (isArray(condition)) {
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
export function __parseConditionalExpr<T>(doc: T, expr: MongoExpression, field: string): boolean {
    switch (field) {
        case '$cond':
            return __parseCond(doc, expr);
        case '$ifNull':
            let value = __processExpression(doc, expr['$ifNull'][0]);
            return isNull(value, __processExpression(doc, expr['$ifNull'][1]));
    }
}
export function __parseDateExpr<T>(doc: T, expr: MongoExpression, field: string): number | string {
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
export function __parseSetExpr<T>(doc: T, expr: MongoExpression, field: string): boolean | Set<T> {
    let i = 1, exp, j = 0, jlen, st, set1, set2, rtnSet, errorMessage, arr1, arr2, falseCondition;
    switch (field) {
        case '$setEquals':
            while (exp = expr[field][i++]) {
                set1 = duplicate(__processExpression(doc, expr[field][i - 2]));
                set2 = duplicate(__processExpression(doc, exp));
                /* istanbul ignore if */
                if (!isArray(set1) || !isArray(set2)) {
                    throw `Exception: All operands of $setEquals must be arrays. One argument is of type: ${capitalize(typeof (!isArray(set1) ? set1 : set2))}`;
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
            /* istanbul ignore next */
            if (!isArray(rtnSet)) {
                throw errorMessage + capitalize((typeof rtnSet));
            }
            toSet(rtnSet);
            while (exp = expr[field][i++]) {
                set1 = duplicate(__processExpression(doc, exp));
                /* istanbul ignore next */
                if (!isArray(set1)) {
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
            /* istanbul ignore if */
            if (!isArray(rtnSet)) {
                throw errorMessage + capitalize(typeof rtnSet);
            }
            while (exp = expr[field][i++]) {
                let arr = duplicate(__processExpression(doc, exp));
                /* istanbul ignore if */
                if (!isArray(arr)) {
                    throw errorMessage + capitalize(typeof arr);
                }
                rtnSet = rtnSet.concat(arr);
            }
            return toSet<T>(rtnSet), rtnSet;
        case '$setDifference':
            arr1 = duplicate(__processExpression(doc, expr[field][0]));
            arr2 = duplicate(__processExpression(doc, expr[field][1]));
            rtnSet = [];
            /* istanbul ignore if */
            if (!isArray(arr1) || !isArray(arr2)) {
                throw `Exception: All operands of $setEquals must be arrays. One argument is of type: ${capitalize(typeof (!isArray(arr1) ? arr1 : arr2))}`;
            }
            for (jlen = arr1.length; j < jlen; j++) {
                st = arr1[j];
                if (!~arr2.indexOf(st) && !~rtnSet.indexOf(st)) {
                    rtnSet.push(st);
                }
            }
            j = 0;
            for (jlen = arr2.length; j < jlen; j++) {
                st = arr2[j];
                if (!~arr1.indexOf(st) && !~rtnSet.indexOf(st)) {
                    rtnSet.push(st);
                }
            }
            return rtnSet;
        case '$setIsSubset':
            arr1 = duplicate(__processExpression(doc, expr[field][0]));
            arr2 = duplicate(__processExpression(doc, expr[field][1]));
            rtnSet = [];
            /* istanbul ignore if */
            if (!isArray(arr1) || !isArray(arr2)) {
                throw `Exception: All operands of $setEquals must be arrays. One argument is of type: ${capitalize(typeof (!isArray(arr1) ? arr1 : arr2))}`;
            }
            return isSubset(arr1, arr2);
        case '$anyElementTrue':
            arr1 = duplicate(__processExpression(doc, expr[field][0]));
            falseCondition = [undefined, null, 0, false];

            for (jlen = arr1.length; j < jlen; j++) {
                if (!~falseCondition.indexOf(arr1[j])) { return true; }
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
export function __parseStringExpr<T>(doc: T, expr: MongoExpression, field: string): any {
    let processValue;
    switch (field) {
        case '$concat':
            let value = '', i = 0, exp;
            while (exp = expr['$concat'][i++]) {
                value += __processExpression(doc, exp);
            }
            return value;
        case '$substr':
            let index = expr['$substr'][1],
                length = expr['$substr'][2] < 0 ? undefined : expr['$substr'][2];
            return __processExpression(doc, expr['$substr'][0]).substr(index, length);
        case '$toLower':
            /* istanbul ignore next */
            processValue = __processExpression(doc, expr['$toLower']) || '';
            return processValue.toLowerCase();
        case '$toUpper':
            /* istanbul ignore next */
            processValue = __processExpression(doc, expr['$toUpper']) || '';
            return processValue.toUpperCase();
        case '$strcasecmp':
            /* istanbul ignore next */
            const processValue1 = __processExpression(doc, expr['$strcasecmp'][0]) || '';
            /* istanbul ignore next */
            const processValue2 = __processExpression(doc, expr['$strcasecmp'][1]) || '';
            let value1 = processValue1.toString().toLowerCase(),
                value2 = processValue2.toString().toLowerCase();
            if (value1 == value2) { return 0; }
            if (value1 < value2) { return -1; }
            /* istanbul ignore else */
            if (value1 > value2) { return 1; }
    }
}
export function __parseVariableExpr<T>(doc: T, expr: MongoExpression, field: string): any {
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
                /* istanbul ignore if */
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