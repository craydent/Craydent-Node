import * as IIsArray from '../methods/isarray';
import * as IIsAsync from '../methods/isasync';
import * as IIsBlank from '../methods/isblank';
import * as IIsBetween from '../methods/isbetween';
import * as IIsBoolean from '../methods/isboolean';
import * as IIsCuid from '../methods/iscuid';
import * as IIsDate from '../methods/isdate';
import * as IIsDomElement from '../methods/isdomelement';
import * as IIsEmpty from '../methods/isempty';
import * as IIsError from '../methods/iserror';
import * as IIsEven from '../methods/iseven';
import * as IIsFloat from '../methods/isfloat';
import * as IIsFunction from '../methods/isfunction';
import * as IIsGenerator from '../methods/isgenerator';
import * as IIsGeolocation from '../methods/isgeolocation';
import * as IIsInt from '../methods/isint';
import * as IIsJSON from '../methods/isjson';
import * as IIsNull from '../methods/isnull';
import * as IIsNullOrEmpty from '../methods/isnullorempty';
import * as IIsNumber from '../methods/isnumber';
import * as IIsObject from '../methods/isobject';
import * as IIsOdd from '../methods/isodd';
import * as IIsPromise from '../methods/ispromise';
import * as IIsRegExp from '../methods/isregexp';
import * as IIsString from '../methods/isstring';
import * as IIsSubset from '../methods/issubset';
import * as IIsValidDate from '../methods/isvaliddate';
import * as IIsValidEmail from '../methods/isvalidemail';

import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const isArray: typeof IIsArray.default = require('../methods/isarray').default;
const isAsync: typeof IIsAsync.default = require('../methods/isasync').default;
const isBetween: typeof IIsBetween.default = require('../methods/isbetween').default;
const isBlank: typeof IIsBlank.default = require('../methods/isblank').default;
const isBoolean: typeof IIsBoolean.default = require('../methods/isboolean').default;
const isCuid: typeof IIsCuid.default = require('../methods/iscuid').default;
const isDate: typeof IIsDate.default = require('../methods/isdate').default;
const isDomElement: typeof IIsDomElement.default = require('../methods/isdomelement').default;
const isEmpty: typeof IIsEmpty.default = require('../methods/isempty').default;
const isError: typeof IIsError.default = require('../methods/iserror').default;
const isEven: typeof IIsEven.default = require('../methods/iseven').default;
const isFloat: typeof IIsFloat.default = require('../methods/isfloat').default;
const isFunction: typeof IIsFunction.default = require('../methods/isfunction').default;
const isGenerator: typeof IIsGenerator.default = require('../methods/isgenerator').default;
const isGeolocation: typeof IIsGeolocation.default = require('../methods/isgeolocation').default;
const isInt: typeof IIsInt.default = require('../methods/isint').default;
const isJSON: typeof IIsJSON.default = require('../methods/isjson').default;
const isNull: typeof IIsNull.default = require('../methods/isnull').default;
const isNullOrEmpty: typeof IIsNullOrEmpty.default = require('../methods/isnullorempty').default;
const isNumber: typeof IIsNumber.default = require('../methods/isnumber').default;
const isObject: typeof IIsObject.default = require('../methods/isobject').default;
const isOdd: typeof IIsOdd.default = require('../methods/isodd').default;
const isPromise: typeof IIsPromise.default = require('../methods/ispromise').default;
const isRegExp: typeof IIsRegExp.default = require('../methods/isregexp').default;
const isString: typeof IIsString.default = require('../methods/isstring').default;
const isSubset: typeof IIsSubset.default = require('../methods/issubset').default;
const isValidDate: typeof IIsValidDate.default = require('../methods/isvaliddate').default;
const isValidEmail: typeof IIsValidEmail.default = require('../methods/isvalidemail').default;
//#endregion

export {
    isArray,
    isAsync,
    isBetween,
    isBlank,
    isBoolean,
    isCuid,
    isDate,
    isDomElement,
    isEmpty,
    isError,
    isEven,
    isFloat,
    isFunction,
    isGenerator,
    isGeolocation,
    isInt,
    isJSON,
    isNull,
    isNullOrEmpty,
    isNumber,
    isObject,
    isOdd,
    isPromise,
    isRegExp,
    isString,
    isSubset,
    isValidDate,
    isValidEmail
};