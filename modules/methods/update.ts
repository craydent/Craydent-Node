//#region imports
import error from '../methods/error';
import { MongoSet, WhereCondition } from '../models/Arrays';
import _generalTrim from '../protected/_generalTrim';
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
import setProperty from '../methods/setproperty';
import getProperty from '../methods/getproperty';
import toSet from '../methods/toset';
import deleteIt from '../methods/delete';
import insertBefore from '../methods/insertbefore';
import sortBy from '../methods/sortby';
import tryEval from '../methods/tryeval';
import parseBoolean from '../methods/parseboolean';
import _processClause from '../protected/_processClause';
import __queryNestedProperty from '../private/__queryNestedProperty';
import _subQuery from '../protected/_subQuery';
import __pullHelper from '../private/__pullHelper';
//#endregion imports

export interface UpdateOptions {
    multi?: boolean;
    upsert?: boolean;
}

export default function update<T>(arr: T[], condition: WhereCondition | string, setClause: MongoSet, options?: UpdateOptions): T[] {
    /*|{
        "info": "Array class extension to update records in the array",
        "category": "Array",
        "parameters":[
            {"condition": "(WhereCondition) Query following find/where clause syntax"},
            {"setClause": "(MongoSet) Set clause used to update the records"},
            {"options?": "(UpdateOptions) Options to specify if mulit update and/or upsert"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.update",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    try {
        options = options || {};
        // if sql syntax convert to mongo object syntax
        if (isString(condition)) {
            condition = _processClause(condition);
        }
        let setObject = isObject(setClause) ? setClause : { '$set': null };
        if (isString(setClause)) {
            setClause = setClause.split(',');
            setObject['$set'] = {};
            for (let i = 0, len = setClause.length; i < len; i++) {
                let keyVal = setClause[i].split("=");
                setObject['$set'][_generalTrim(keyVal[0])] = tryEval(_generalTrim(keyVal[1]));
            }
        }
        let found = false, plainObject = true;
        const operations = {
            "$set": 1, "$unset": 1, "$currentDate": 1, "$inc": 1, "$max": 1, "$min": 1, "$mul": 1, "$bit": 1, "$rename": 1
            , "$": 1, "$addToSet": 1, "$pop": 1, "$pullAll": 1, "$pull": 1, "$pushAll": 1, "$push": 1
        };
        for (let prop in setObject) {
            if (operations[prop]) {
                plainObject = false;
                break;
            }
        }

        const thiz = arr,
            _equals = equals,
            _contains = contains,
            _qnp = __queryNestedProperty,
            _clt = _containsLessThan,
            _clte = _containsLessThanEqual,
            _cgt = _containsGreaterThan,
            _cgte = _containsGreaterThanEqual,
            _ct = _containsType,
            _cm = _containsMod,
            _isArray = isArray,
            _isNull = isNull,
            _isFunction = isFunction,
            _isObject = isObject,
            _isString = isString,
            _isRegExp = isRegExp,
            _isInt = isInt,
            _getProperty = getProperty,
            _parseBoolean = parseBoolean;
        let _refs = [], ifblock = _subQuery(condition, null, null, _refs), func = `
            (function (record,i) {
            	var values,finished;
            	if (${ifblock}) {
            		if(!cb.call(thiz,record,i)) { throw 'keep going'; }
            	}
            })`
        const cb = function (obj, i) {
            found = true;
            if (plainObject) {
                arr.splice(i, 1, setObject);
            }
            if (setObject['$set']) {
                for (let prop in setObject['$set']) {
                    setObject['$set'].hasOwnProperty(prop) && setProperty(obj, prop, setObject['$set'][prop]);
                }
            }
            if (setObject['$unset']) {
                for (let prop in setObject['$unset']) {
                    setObject['$unset'].hasOwnProperty(prop) && delete obj[prop];
                }
            }
            if (setObject['$currentDate']) {
                for (let prop in setObject['$currentDate']) {
                    setObject['$currentDate'].hasOwnProperty(prop) && (obj[prop] = new Date());
                }
            }
            if (setObject['$inc']) {
                for (let prop in setObject['$inc']) {
                    setObject['$inc'].hasOwnProperty(prop) && (obj[prop] += setObject['$inc'][prop]);
                }
            }
            if (setObject['$max']) {
                for (let prop in setObject['$max']) {
                    /* istanbul ignore if */
                    if (!setObject['$max'].hasOwnProperty(prop)) { continue; }
                    obj[prop] = _isNull(obj[prop], setObject['$max'][prop]);
                    let value = obj[prop];
                    value < setObject['$max'][prop] && (obj[prop] = setObject['$max'][prop]);
                }
            }
            if (setObject['$min']) {
                for (let prop in setObject['$min']) {
                    /* istanbul ignore if */
                    if (!setObject['$min'].hasOwnProperty(prop)) { continue; }
                    obj[prop] = _isNull(obj[prop], setObject['$min'][prop]);
                    let value = obj[prop];
                    value > setObject['$min'][prop] && (obj[prop] = setObject['$min'][prop]);
                }
            }
            if (setObject['$mul']) {
                for (let prop in setObject['$mul']) {
                    setObject['$mul'].hasOwnProperty(prop) && (obj[prop] *= setObject['$mul'][prop]);
                }
            }
            if (setObject['$bit']) {
                for (let prop in setObject['$bit']) {
                    if (!setObject['$bit'].hasOwnProperty(prop) || !_isInt(obj[prop])) { continue; }
                    if (_isInt(setObject['$bit'][prop]['and'])) {
                        obj[prop] &= setObject['$bit'][prop]['and'];
                    } else if (_isInt(setObject['$bit'][prop]['or'])) {
                        obj[prop] |= setObject['$bit'][prop]['or'];
                    } else if (_isInt(setObject['$bit'][prop]['xor'])) {
                        obj[prop] ^= setObject['$bit'][prop]['xor'];
                    }
                }
            }
            if (setObject['$rename']) {
                for (let prop in setObject['$rename']) {
                    /* istanbul ignore if */
                    if (!obj.hasOwnProperty(prop)) { continue; }
                    let value = obj[prop];
                    setObject['$rename'].hasOwnProperty(prop) && delete obj[prop] && (obj[setObject['$rename'][prop]] = value);
                }
            }

            // Array operations
            /* istanbul ignore next */
            if (setObject['$']) {

            }
            if (setObject['$addToSet']) {
                for (let prop in setObject['$addToSet']) {
                    /* istanbul ignore if */
                    if (!setObject['$addToSet'].hasOwnProperty(prop)) { continue; }
                    let each;
                    if (each = getProperty(setObject, `$addToSet.${prop}.$each`)) {
                        for (let i = 0, len = each.length; i < len; i++) {
                            obj[prop].push(each[i]);
                        }
                    } else {
                        obj[prop].push(setObject['$addToSet'][prop]);
                    }
                    toSet(obj[prop]);
                }
            }
            if (setObject['$pop']) {
                for (let prop in setObject['$pop']) {
                    if (!setObject['$pop'].hasOwnProperty(prop) || !_isArray(obj[prop])) { continue; }
                    /* istanbul ignore next */
                    if (setObject['$pop'][prop] === 1) { obj[prop].pop(); }
                    else if (!~setObject['$pop'][prop]) { obj[prop].shift(); }
                }
            }
            if (setObject['$pullAll']) {
                for (let prop in setObject['$pullAll']) {
                    let arr = getProperty(obj, prop),
                        values = setObject['$pullAll'][prop];
                    if (!_isArray(arr)) { continue; }
                    __pullHelper(arr, values);
                }
            }
            if (setObject['$pull']) {
                for (let prop in setObject['$pull']) {
                    let arr = getProperty(obj, prop),
                        values = setObject['$pull'][prop];
                    if (!_isArray(arr)) { continue; }
                    if (!_isObject(values)) {
                        __pullHelper(arr, values);
                    } else {
                        // @ts-ignore
                        deleteIt(arr, values, false);
                    }
                }
            }
            if (setObject['$push']) {
                for (let prop in setObject['$push']) {
                    /* istanbul ignore if */
                    if (!setObject['$push'].hasOwnProperty(prop)) { continue; }
                    let each = getProperty(setObject, `$push.${prop}.$each`),
                        slice = getProperty(setObject, `$push.${prop}.$slice`),
                        sort = getProperty(setObject, `$push.${prop}.$sort`),
                        position = getProperty(setObject, `$push.${prop}.$position`);

                    if (each) {
                        if (_isNull(position)) {
                            for (let i = 0, len = each.length; i < len; i++) {
                                obj[prop].push(each[i]);
                            }
                        } else {
                            for (let i = 0, len = each.length; i < len; i++) {
                                insertBefore(obj[prop], position++, each[i]);
                            }
                        }

                    } else {
                        obj[prop].push(setObject['$push'][prop]);
                    }

                    if (each && sort) {
                        let sorter = [];
                        for (let p in sort) {
                            /* istanbul ignore if */
                            if (!sort.hasOwnProperty(p)) { continue; }
                            if (sort[p] == 1) {
                                sorter.push(p)
                            } else if (!~sort[p]) {
                                sorter.push(`!${p}`)
                            }
                        }
                        sortBy(obj[prop], sorter);
                    }

                    if (each && !_isNull(slice)) {
                        obj[prop] = obj[prop].slice(slice);
                    }
                }
            }

            return !!options.multi;
        };
        if (_refs.length) {
            let varStrings = "";
            for (let i = 0, len = _refs.length; i < len; i++) {
                varStrings += `var __where_cb${(i + 1)}=_refs[${i}];`
            }
            eval(varStrings);
        }
        try {
            arr.filter(eval(func));
        } catch (e) /* istanbul ignore next */ {
            if (e != 'keep going') { throw e; }
        }


        if (!found && options.upsert) {
            arr.push(isNull(update([{}], {}, setObject)[0], setObject));
        }

    } catch (e) /* istanbul ignore next */ {
        error && error("Array.update", e);
    } finally {
        return arr;
    }
}