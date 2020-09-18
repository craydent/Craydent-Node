import * as IChanges from '../methods/changes';
import * as IContains from '../methods/contains';
import * as ICopyObject from '../methods/copyObject';
import * as ICount from '../methods/count';
import * as IDuplicate from '../methods/duplicate';
import * as IEachProperty from '../methods/eachProperty';
import * as IEquals from '../methods/equals';
import * as IEvery from '../methods/every';
import * as IGetClass from '../methods/getClass';
import * as IGetProperty from '../methods/getProperty';
import * as IGetValue from '../methods/getValue';
import * as IHas from '../methods/has';
import * as IIsArray from '../methods/isArray';
import * as IIsAsync from '../methods/isAsync';
import * as IIsBetween from '../methods/isBetween';
import * as IIsBoolean from '../methods/isBoolean';
import * as IIsDate from '../methods/isDate';
import * as IIsDomElement from '../methods/isDomElement';
import * as IIsEmpty from '../methods/isEmpty';
import * as IIsError from '../methods/isError';
import * as IIsFloat from '../methods/isFloat';
import * as IIsFunction from '../methods/isFunction';
import * as IIsGenerator from '../methods/isGenerator';
import * as IIsGeolocation from '../methods/isGeolocation';
import * as IIsInt from '../methods/isInt';
import * as IIsNumber from '../methods/isNumber';
import * as IIsPromise from '../methods/isPromise';
import * as IIsObject from '../methods/isObject';
import * as IIsRegExp from '../methods/isRegExp';
import * as IIsString from '../methods/isString';
import * as IIsSubset from '../methods/isSubset';
import * as IItemCount from '../methods/itemCount';
import * as IKeyOf from '../methods/keyOf';
import * as IGetKeys from '../methods/getKeys';
import * as IMap from '../methods/map';
import * as IMerge from '../methods/merge';
import * as ISetProperty from '../methods/setProperty';
import * as IToStringAlt from '../methods/toStringAlt';
import {
    AnyObject, AnyObjects, WhereCondition, ContainsObjectIterator, ContainsValue, ComparisonOperator
} from '../models/Arrays';
import { EachIterator } from '../models/EachIterator';
import { ObjectIterator } from '../models/ObjectIterator';

import { scope } from '../private/__common';
scope.eval = str => eval(str);
//#region dependencies
const changes: typeof IChanges.default = require('../methods/changes').default;
const contains: typeof IContains.default = require('../methods/contains').default;
const copyObject: typeof ICopyObject.default = require('../methods/copyObject').default;
const count: typeof ICount.default = require('../methods/count').default;
const duplicate: typeof IDuplicate.default = require('../methods/duplicate').default;
const eachProperty: typeof IEachProperty.default = require('../methods/eachProperty').default;
const equals: typeof IEquals.default = require('../methods/equals').default;
const every: typeof IEvery.default = require('../methods/every').default;
const getClass: typeof IGetClass.default = require('../methods/getClass').default;
const getKeys: typeof IGetKeys.default = require('../methods/getKeys').default;
const getProperty: typeof IGetProperty.default = require('../methods/getProperty').default;
const getValue: typeof IGetValue.default = require('../methods/getValue').default;
const has: typeof IHas.default = require('../methods/has').default;
const isArray: typeof IIsArray.default = require('../methods/isArray').default;
const isAsync: typeof IIsAsync.default = require('../methods/isAsync').default;
const isBetween: typeof IIsBetween.default = require('../methods/isBetween').default;
const isBoolean: typeof IIsBoolean.default = require('../methods/isBoolean').default;
const isDate: typeof IIsDate.default = require('../methods/isDate').default;
const isDomElement: typeof IIsDomElement.default = require('../methods/isDomElement').default;
const isEmpty: typeof IIsEmpty.default = require('../methods/isEmpty').default;
const isError: typeof IIsError.default = require('../methods/isError').default;
const isFloat: typeof IIsFloat.default = require('../methods/isFloat').default;
const isFunction: typeof IIsFunction.default = require('../methods/isFunction').default;
const isGenerator: typeof IIsGenerator.default = require('../methods/isGenerator').default;
const isGeolocation: typeof IIsGeolocation.default = require('../methods/isGeolocation').default;
const isInt: typeof IIsInt.default = require('../methods/isInt').default;
const isNumber: typeof IIsNumber.default = require('../methods/isNumber').default;
const isPromise: typeof IIsPromise.default = require('../methods/isPromise').default;
const isObject: typeof IIsObject.default = require('../methods/isObject').default;
const isRegExp: typeof IIsRegExp.default = require('../methods/isRegExp').default;
const isString: typeof IIsString.default = require('../methods/isString').default;
const isSubset: typeof IIsSubset.default = require('../methods/isSubset').default;
const itemCount: typeof IItemCount.default = require('../methods/itemCount').default;
const keyOf: typeof IKeyOf.default = require('../methods/keyOf').default;
const map: typeof IMap.default = require('../methods/map').default;
const merge: typeof IMerge.default = require('../methods/merge').default;
const setProperty: typeof ISetProperty.default = require('../methods/setProperty').default;
const toStringAlt: typeof IToStringAlt.default = require('../methods/toStringAlt').default;
//#endregion

export function _changes(compare: AnyObject) {
    /*|{
        "info": "Object class extension to compare properties that have changed",
        "category": "Object",
        "parameters":[
            {"compare": "(any) Object to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.",
        "returnType": "(Object)"
    }|*/
    return changes(this, compare);
}
export function _contains<T, TValue>(this: T[], func: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, func?: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, operator?: ComparisonOperator): boolean;
export function _contains<T, TValue>(this: T, val: ContainsValue, func?: ContainsObjectIterator<T, TValue>): boolean;
export function _contains(this: string, val: ContainsValue): boolean;
export function _contains(this: number, val: ContainsValue): boolean;
export function _contains(val, func?): boolean {
    /*|{
        "info": "Object class extension to check if value exists",
        "category": "Object",
        "parameters":[
            {"val": "(ContainsValue|ContainsObjectIterator<T, TValue>) Value to check or custom function to determine validity"}],

        "overloads":[
            {"parameters":[
                {"val": "(ContainsValue) Value to check"},
                {"func": "(ContainsIterator<T>) Callback function used to do the comparison"}]},
            {"parameters":[
                {"val": "(ContainsValue) Value to check"},
                {"func": "(ComparisonOperator) String indicating logical operator (\"$lt\"|\"$lte\"|\"$gt\"|\"$gte\"|\"$mod\"|\"$type\")" }]},
            {"parameters":[
                {"arr": "(Array<TValue>) Array of values to return first matching value"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
        "typeParameter": "<T, TValue>",
        "returnType": "(Bool)"
    }|*/
    return contains(this, val, func);
}
export function _copyObject() {
    /*|{
        "info": "Object class extension to copy an object excluding constructor",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.copyObject",
        "returnType": "(Object)"
    }|*/
    return copyObject(this);
}
export function _count(this: AnyObject): number;
export function _count(this: AnyObjects, option?: WhereCondition): number;
export function _count(this: string[], option?: string | RegExp): number;
export function _count(this: string, option?: string | RegExp): number;
export function _count(option?): number {
    /*|{
        "info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
        "category": "Object",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"option": "(WhereCondition) Query used in Array.where when counting elements in an Array"}]},

            {"parameters":[
                {"option": "(String) Word or phrase to count in the String"}]},

            {"parameters":[
                {"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.count",
        "returnType": "(Int)"
    }|*/
    return count(this, option);
}
export function _duplicate(recursive?: boolean) {
    /*|{
        "info": "Object class extension to copy an object including constructor",
        "category": "Object",
        "parameters":[
            {"recursive?": "(Boolean) Flag to copy all child objects recursively"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.duplicate",
        "returnType": "(Object)"
    }|*/
    return duplicate(this, recursive);
}
export function _eachProperty<T>(callback: EachIterator<T>): void {
    /*|{
        "info": "Object class extension to loop through all properties where hasOwnValue is true.",
        "category": "Object",
        "parameters":[
            {"callback": "(EachIterator<T>) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.eachProperty",
        "typeParameter": "<T>",
        "returnType": "(Object)"
    }|*/
    return eachProperty(this, callback);
}
export function _equals(this: AnyObject, compare: AnyObject, props?: string[]): boolean;
export function _equals(this: any, compare: any): boolean;
export function _equals(compare, props?): boolean {
    /*|{
        "info": "Object class extension to check if object values are equal",
        "category": "Number|Object",
        "parameters":[
            {"compare": "(any) Object to compare against"},
            {"props?": "(String[]) Array of property values to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
        "returnType": "(Bool)"
    }|*/
    return equals(this, compare, props);
}
export function _every(callback, thisObject?: any): boolean {
    /*|{
        "info": "Object class extension to check property values against a function",
        "category": "Object",
        "parameters":[
            {"callback": "(ObjectIterator<T, TValue>) Callback to apply to each value"}],

        "overloads":[
            {"parameters":[
                {"callback": "(ObjectIterator<T, TValue>) Callback to apply to each value"},
                {"thisObject": "(any) Context for the callback function"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.every",
        "typeParameter": "<T, TValue>",
        "returnType": "(Bool)"
    }|*/
    return every(this, callback, thisObject);
}
export function _get(path: string, delimiter?: string, options?: IGetProperty.GetPropertyOptions): any;
export function _get(path: RegExp): any;
export function _get(path: string, options?: IGetProperty.GetPropertyOptions): any;
export function _get(path, delimiter?, options?): any {
    /*|{
        "info": "Alias to getProperty; however, it can not be used as a protoype property.",
        "category": "Object",
        "featured": true,
        "parameters":[
            {"object": "(Object) object to get the property of"},
            {"path": "(String) Path to nested property"},
            {"delimiter?": "(Char) Separator used to parse path"}],

        "overloads":[
            {"parameters":[
                {"object": "(Object) object to get the property of"},
                {"path": "(RegExp) Regex match for the property"}]},

            {"parameters":[
                {"object": "(Object) object to get the property of"},
                {"path": "(String) Path to nested property"},
                {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]},

            {"parameters":[
                {"object": "(Object) object to get the property of"},
                {"path": "(String) Path to nested property"},
                {"delimiter": "(Char) Separator used to parse path"},
                {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
        "returnType": "(any)"
    }|*/
    return getProperty(this, path, delimiter, options);
}
export function _getClass(): string {
    /*|{
        "info": "Object class extension to get the constructor name",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getClass",
        "returnType": "(String)"
    }|*/
    return getClass(this);
}
export function _getProperty(path: string, delimiter?: string, options?: IGetProperty.GetPropertyOptions): any;
export function _getProperty(path: RegExp): any;
export function _getProperty(path: string, options?: IGetProperty.GetPropertyOptions): any;
export function _getProperty(path, delimiter?, options?): any {
    /*|{
        "info": "Object class extension to retrieve nested properties without error when property path does not exist",
        "category": "Object",
        "featured": true,
        "parameters":[
            {"path": "(String) Path to nested property"}],

        "overloads":[
            {"parameters":[
                {"path": "(String) Path to nested property"},
                {"delimiter": "(Char) Separator used to parse path"}]},

            {"parameters":[
                {"path": "(RegExp) Regex match for the property"}]},

            {"parameters":[
                {"path": "(String) Path to nested property"},
                {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]},

            {"parameters":[
                {"path": "(String) Path to nested property"},
                {"delimiter": "(Char) Separator used to parse path"},
                {"options": "(GetPropertyOptions) Options for ignoring inheritance, validPath, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
        "returnType": "(any)"
    }|*/
    return getProperty(this, path, delimiter, options);
}
export function _getValue(this: any, args?: any[], dflt?: any): any {
    return getValue(this, args, dflt);
}
export function _has(property: string): boolean {
    /*|{
        "info": "Alias to Object.prototype.hasOwnProperty",
        "category": "Object",
        "parameters":[
            {"property": "(String) Property name to check"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.has",
        "returnType": "(Boolean)"
    }|*/
    return has(this, property);
}
export function _isArray(): boolean {
    /*|{
        "info": "Object class extension to check if object is an array",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
        "returnType": "(Bool)"
    }|*/
    return isArray(this);
}
export function _isAsync(): boolean {
    /*|{
        "info": "Object class extension to check if object is a async function",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
        "returnType": "(Bool)"
    }|*/
    return isAsync(this);
}
export function _isBetween(lowerBound: any, upperBound: any, inclusive?: boolean): boolean {
    /*|{
        "info": "Object class extension to check if object is between lower and upper bounds",
        "category": "Object",
        "parameters":[
            {"lowerBound": "(any) Lower bound comparison"},
            {"upperBound": "(any) Upper bound comparison"},
            {"inclusive?": "(Bool) Flag to include give bounds"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
        "returnType": "(Bool)"
    }|*/
    return isBetween(this, lowerBound, upperBound, inclusive);
}
export function _isBoolean(): boolean {
    /*|{
        "info": "Object class extension to check if object is a boolean",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
        "returnType": "(Bool)"
    }|*/
    return isBoolean(this);
}
export function _isDate(): boolean {
    /*|{
        "info": "Object class extension to check if object is a date",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDate",
        "returnType": "(Bool)"
    }|*/
    return isDate(this);
}
export function _isDomElement(): boolean {
    /*|{
        "info": "Object class extension to check if object is a DOM element",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
        "returnType": "(Bool)"
    }|*/
    return isDomElement(this);
}
export function _isEmpty(): boolean {
    /*|{
        "info": "Object class extension to check if it is empty",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isEmpty",
        "returnType": "(Bool)"
    }|*/
    return isEmpty(this);
}
export function _isError(): boolean {
    /*|{
        "info": "Object class extension to check if object is a boolean",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
        "returnType": "(Bool)"
    }|*/
    return isError(this);
}
export function _isFloat(): boolean {
    /*|{
        "info": "Object class extension to check if object is a float",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
        "returnType": "(Bool)"
    }|*/
    return isFloat(this);
}
export function _isFunction(): boolean {
    /*|{
        "info": "Object class extension to check if object is a function",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
        "returnType": "(Bool)"
    }|*/
    return isFunction(this);
}
export function _isGenerator(): boolean {
    /*|{
        "info": "Object class extension to check if object is a generator function",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
        "returnType": "(Bool)"
    }|*/
    return isGenerator(this);
}
export function _isGeolocation(): boolean {
    /*|{
        "info": "Object class extension to check if object is a geolocation",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
        "returnType": "(Bool)"
    }|*/
    return isGeolocation(this);
}
export function _isInt(): boolean {
    /*|{
        "info": "Object class extension to check if object is an integer",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
        "returnType": "(Bool)"
    }|*/
    return isInt(this);
}
export function _isNumber(): boolean {
    /*|{
        "info": "Object class extension to check if object is a number",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
        "returnType": "(Bool)"
    }|*/
    return isNumber(this);
}
export function _isPromise(): boolean {
    /*|{
        "info": "Object class extension to check if object is a promise object",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
        "returnType": "(Bool)"
    }|*/
    return isPromise(this);
}
export function _isObject(check_instance?: boolean): boolean {
    /*|{
        "info": "Object class extension to check if object is an object",
        "category": "Object",
        "parameters":[
            {"check_instance": "(Boolean) Flag to check instance type"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
        "returnType": "(Bool)"
    }|*/
    return isObject(this, check_instance);
}
export function _isRegExp(): boolean {
    /*|{
        "info": "Object class extension to check if object is a RegExp",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
        "returnType": "(Bool)"
    }|*/
    return isRegExp(this);
}
export function _isString(): boolean {
    /*|{
        "info": "Object class extension to check if object is a string",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isString",
        "returnType": "(Bool)"
    }|*/
    return isString(this);
}
export function _isSubset<R>(compare: R, sharesAny?: boolean): boolean {
    /*|{
        "info": "Object class extension to check if item is a subset",
        "category": "Object",
        "parameters":[
            {"compare": "(any) Superset to compare against"},
            {"sharesAny": "(Boolean) Flag to check if any property is shared"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
        "returnType": "(Bool)"
    }|*/
    return isSubset(this, compare, sharesAny);
}
export function _itemCount(): number {
    /*|{
        "info": "Object class extension to count the properties in item",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.itemCount",
        "returnType": "(Int)"
    }|*/
    return itemCount(this);
}
export function _keyOf(value: any): string {
    /*|{
        "info": "Object class extension to get the key of the give value",
        "category": "Object",
        "parameters":[
            {"value": "(any) Value to compare against"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.keyOf",
        "returnType": "(String)"
    }|*/
    return keyOf(this, value);
}
export function _getKeys(): string[] {
    /*|{
        "info": "Object class extension to get the keys of the object",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getKeys",
        "returnType": "(Array<string>)"
    }|*/
    return getKeys(this);
}
export function _map<T>(callback: ObjectIterator<T>, thisObject?: any): T {
    /*|{
        "info": "Object class extension to apply method to every value",
        "category": "Object",
        "parameters":[
            {"callback": "(ObjectIterator<T, TValue>) Callback to apply to each value"},
            {"thisObject?": "(any) Context for the callback function"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.map",
        "typeParameter": "<T, TValue>",
        "returnType": "(void)"
    }|*/
    return map(this, callback, thisObject) as T;
}
export function _merge(secondary: any, condition: IMerge.MergeEnums | IMerge.MergeOptions | IMerge.MergeIterator) {
    /*|{
        "info": "Object class extension to merge objects",
        "category": "Object",
        "parameters":[
            {"secondary": "(Object) Object to merge with"},
            {"condition?": "(MergeEnums|MergeOptions|MergeIterator<T>) Flags to recurse, merge only shared value, clone, intersect etc"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.merge",
        "typeParameter": "<T>",
        "returnType": "(Object)"
    }|*/
    return merge(this, secondary, condition as any);
}
export function _set(path: string, value: any, delimiter?: string): boolean {
    /*|{
        "info": "Alias to setProperty; however, it can not be used as a protoype property.",
        "category": "Object",
        "parameters":[
            {"object": "(Object) object to add the property to"},
            {"path": "(String) Path to nested property"},
            {"value": "(any) Value to set"},
            {"delimiter?": "(Char) Separator used to parse path"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
        "returnType": "(Bool)"
    }|*/
    return setProperty(this, path, value, delimiter);
}
export function _setProperty(path: string, value: any, delimiter?: string): boolean {
    /*|{
        "info": "Object class extension to set nested properties creating necessary property paths",
        "category": "Object",
        "parameters":[
            {"path": "(String) Path to nested property"},
            {"value": "(any) Value to set"},
            {"delimiter?": "(Char) Separator used to parse path"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
        "returnType": "(Bool)"
    }|*/
    return setProperty(this, path, value, delimiter);
}
export function _toStringAlt(delimiter?: string, prefix?: string, urlEncode?: boolean): string {
    /*|{
        "info": "Object class extension for an alternate way to stringify object to formatted string",
        "category": "Object",
        "parameters":[
            {"delimiter?": "(Char) Character to separate the property from the value"},
            {"prefix?": "(Char) Character to prefix the property name"},
            {"urlEncode?": "(Bool) Flag to url encode the property and value"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#",
        "returnType": "(String)"
    }|*/
    return toStringAlt(this, delimiter, prefix, urlEncode);
}

