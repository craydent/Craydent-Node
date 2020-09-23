import * as IIsArray from '../methods/isArray';
import * as IIsAsync from '../methods/isAsync';
import * as IIsBlank from '../methods/isBlank';
import * as IIsBetween from '../methods/isBetween';
import * as IIsBoolean from '../methods/isBoolean';
import * as IIsCuid from '../methods/isCuid';
import * as IIsDate from '../methods/isDate';
import * as IIsDomElement from '../methods/isDomElement';
import * as IIsEmpty from '../methods/isEmpty';
import * as IIsError from '../methods/isError';
import * as IIsEven from '../methods/isEven';
import * as IIsFloat from '../methods/isFloat';
import * as IIsFunction from '../methods/isFunction';
import * as IIsGenerator from '../methods/isGenerator';
import * as IIsGeolocation from '../methods/isGeolocation';
import * as IIsInt from '../methods/isInt';
import * as IIsNull from '../methods/isNull';
import * as IIsNullOrEmpty from '../methods/isNullOrEmpty';
import * as IIsNumber from '../methods/isNumber';
import * as IIsObject from '../methods/isObject';
import * as IIsOdd from '../methods/isOdd';
import * as IIsPromise from '../methods/isPromise';
import * as IIsRegExp from '../methods/isRegExp';
import * as IIsString from '../methods/isString';
import * as IIsSubset from '../methods/isSubset';
import * as IIsValidDate from '../methods/isValidDate';
import * as IIsValidEmail from '../methods/isValidEmail';

import { scope } from '../private/__common';
scope.eval = str => eval(str);
//#region dependencies
const isArray: typeof IIsArray.default = require('../methods/isArray').default;
const isAsync: typeof IIsAsync.default = require('../methods/isAsync').default;
const isBetween: typeof IIsBetween.default = require('../methods/isBetween').default;
const isBlank: typeof IIsBlank.default = require('../methods/isBlank').default;
const isBoolean: typeof IIsBoolean.default = require('../methods/isBoolean').default;
const isCuid: typeof IIsCuid.default = require('../methods/isCuid').default;
const isDate: typeof IIsDate.default = require('../methods/isDate').default;
const isDomElement: typeof IIsDomElement.default = require('../methods/isDomElement').default;
const isEmpty: typeof IIsEmpty.default = require('../methods/isEmpty').default;
const isError: typeof IIsError.default = require('../methods/isError').default;
const isEven: typeof IIsEven.default = require('../methods/isEven').default;
const isFloat: typeof IIsFloat.default = require('../methods/isFloat').default;
const isFunction: typeof IIsFunction.default = require('../methods/isFunction').default;
const isGenerator: typeof IIsGenerator.default = require('../methods/isGenerator').default;
const isGeolocation: typeof IIsGeolocation.default = require('../methods/isGeolocation').default;
const isInt: typeof IIsInt.default = require('../methods/isInt').default;
const isNull: typeof IIsNull.default = require('../methods/isNull').default;
const isNullOrEmpty: typeof IIsNullOrEmpty.default = require('../methods/isNullOrEmpty').default;
const isNumber: typeof IIsNumber.default = require('../methods/isNumber').default;
const isObject: typeof IIsObject.default = require('../methods/isObject').default;
const isOdd: typeof IIsOdd.default = require('../methods/isOdd').default;
const isPromise: typeof IIsPromise.default = require('../methods/isPromise').default;
const isRegExp: typeof IIsRegExp.default = require('../methods/isRegExp').default;
const isString: typeof IIsString.default = require('../methods/isString').default;
const isSubset: typeof IIsSubset.default = require('../methods/isSubset').default;
const isValidDate: typeof IIsValidDate.default = require('../methods/isValidDate').default;
const isValidEmail: typeof IIsValidEmail.default = require('../methods/isValidEmail').default;
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