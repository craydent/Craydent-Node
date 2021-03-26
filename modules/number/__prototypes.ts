import * as IAboutEqualTo from '../methods/aboutequalto';
import * as IContains from '../methods/contains';
import * as IEquals from '../methods/equals';
import * as IGetValue from '../methods/getvalue';
import * as IIsBetween from '../methods/isbetween';
import * as IIsEven from '../methods/iseven';
import * as IIsOdd from '../methods/isodd';
import * as IRand from '../methods/rand';
import * as IToCurrencyNotation from '../methods/tocurrencynotation';
import { AnyObject } from '../models/Generics';
import { ContainsObjectIterator, ContainsValue } from '../models/Contains';
import { ComparisonOperator } from '../models/ComparisonOperator'

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const aboutEqualTo: typeof IAboutEqualTo.default = require('../methods/aboutequalto').default;
const contains: typeof IContains.default = require('../methods/contains').default;
const equals: typeof IEquals.default = require('../methods/equals').default;
const getValue: typeof IGetValue.default = require('../methods/getvalue').default;
const isBetween: typeof IIsBetween.default = require('../methods/isbetween').default;
const isEven: typeof IIsEven.default = require('../methods/iseven').default;
const isOdd: typeof IIsOdd.default = require('../methods/isodd').default;
const rand: typeof IRand.default = require('../methods/rand').default;
const toCurrencyNotation: typeof IToCurrencyNotation.default = require('../methods/tocurrencynotation').default;
//#endregion

export function _contains<T, TValue>(this: T[], func: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, func: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, operator: ComparisonOperator): boolean;
export function _contains<T, TValue>(this: T, val: ContainsValue, func: ContainsObjectIterator<T, TValue>): boolean;
export function _contains(this: string, val: ContainsValue): boolean;
export function _contains(this: number, val: ContainsValue): boolean;
export function _contains(this: any, val: any, func?: any) {
    /*|{
        "info": "Object class extension to check if value exists",
        "category": "Number|Object",
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
export function _equals(this: AnyObject, compare: AnyObject, props?: string[]): boolean;
export function _equals(this: any, compare: any): boolean;
export function _equals(this: any, compare: any, props?: any): boolean {
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

export function _getValue(this: number, args?: any[], dflt?: any): any {
    return getValue(this as any, args, dflt);
}
export function _aboutEqualTo(this: number, compare: number, giveOrTake: number): boolean {
    /*|{
        "info": "Number class extension to check if values are approximately equal",
        "category": "Number",
        "parameters":[
            {"compare": "(Number) Number to compare"},
            {"giveOrTake": "(Number) Plus/minus value"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#number.aboutEqualTo",
        "returnType": "(Bool)"
    }|*/
    return aboutEqualTo(this, compare, giveOrTake);
}
export function _isBetween(this: number, lowerBound: number, upperBound: number, inclusive?: boolean): boolean {
    /*|{
            "info": "Object class extension to check if object is between lower and upper bounds",
            "category": "Number|Object",
            "parameters":[
                {"lowerBound": "(Number) Lower bound comparison"},
                {"upperBound": "(Number) Upper bound comparison"},
                {"inclusive?": "(Bool) Flag to include give bounds"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
            "returnType": "(Bool)"
        }|*/
    return isBetween(this, lowerBound, upperBound, inclusive);
}
export function _isEven(this: number) {
    /*|{
        "info": "Number class extension to check if number is even",
        "category": "Number",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#number.",
        "returnType": "(Bool)"
    }|*/
    return isEven(this);
}
export function _isOdd(this: number) {
    /*|{
            "info": "Number class extension to check if number is odd",
            "category": "Number",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#number.",
            "returnType": "(Bool)"
        }|*/
    return isOdd(this);
}
export function _toCurrencyNotation(this: number, separator?: string): string {

    /*|{
        "info": "Number class extension to change number to use separater character",
        "category": "Number|String",
        "parameters":[
            {"separator?": "(Char) Character to use as delimiter"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#String.toCurrencyNotation",
        "returnType": "(String)"
    }|*/
    return toCurrencyNotation(this, separator);
}
export { rand };