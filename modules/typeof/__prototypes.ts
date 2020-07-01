import isArray from '../methods/isArray';
import isAsync from '../methods/isAsync';
import isBetween from '../methods/isBetween';
import isBoolean from '../methods/isBoolean';
import isDate from '../methods/isDate';
import isDomElement from '../methods/isDomElement';
import isEmpty from '../methods/isEmpty';
import isError from '../methods/isError';
import isFloat from '../methods/isFloat';
import isFunction from '../methods/isFunction';
import isGenerator from '../methods/isGenerator';
import isGeolocation from '../methods/isGeolocation';
import isInt from '../methods/isInt';
import _isNull from '../methods/isNull';
import isNullOrEmpty from '../methods/isNullOrEmpty';
import isNumber from '../methods/isNumber';
import isObject from '../methods/isObject';
import isPromise from '../methods/isPromise';
import isRegExp from '../methods/isRegExp';
import isString from '../methods/isString';


export function _isArray(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is an array",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
        "returnType": "(Bool)"
    }|*/
    return isArray(this);
}
export function _isAsync(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a async function",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
        "returnType": "(Bool)"
    }|*/
    return isAsync(this);
}
export function _isBetween(this: any, lowerBound: any, upperBound: any, inclusive?: boolean): boolean {
    /*|{
        "info": "Object class extension to check if object is between lower and upper bounds",
        "category": "Object|TypeOf",
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
export function _isBoolean(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a boolean",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
        "returnType": "(Bool)"
    }|*/
    return isBoolean(this);
}
export function _isDate(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a date",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDate",
        "returnType": "(Bool)"
    }|*/
    return isDate(this);
}
export function _isDomElement(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a DOM element",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
        "returnType": "(Bool)"
    }|*/
    return isDomElement(this);
}
export function _isEmpty(this: any): boolean {
    /*|{
        "info": "Object class extension to check if it is empty",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isEmpty",
        "returnType": "(Bool)"
    }|*/
    return isEmpty(this);
}
export function _isError(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is an error object",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isError",
        "returnType": "(Bool)"
    }|*/
    return isError(this);
}
export function _isFloat(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a float",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
        "returnType": "(Bool)"
    }|*/
    return isFloat(this);
}
export function _isFunction(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a function",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
        "returnType": "(Bool)"
    }|*/
    return isFunction(this);
}
export function _isGenerator(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a generator function",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
        "returnType": "(Bool)"
    }|*/
    return isGenerator(this);
}
export function _isGeolocation(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a geolocation",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
        "returnType": "(Bool)"
    }|*/
    return isGeolocation(this);
}
export function _isInt(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is an integer",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
        "returnType": "(Bool)"
    }|*/
    return isInt(this);
}
export function _isNullOrEmpty(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a null or empty (object with no props, empty string, etc)",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
        "returnType": "(Bool)"
    }|*/
    return isNullOrEmpty(obj);
}
export function _isNumber(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a number",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
        "returnType": "(Bool)"
    }|*/
    return isNumber(this);
}
export function _isObject(this: any, check_instance): boolean {
    /*|{
        "info": "Object class extension to check if object is an object",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
        "returnType": "(Bool)"
    }|*/
    return isObject(this);
}
export function _isPromise(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a promise object",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
        "returnType": "(Bool)"
    }|*/
    return isPromise(this);
}
export function _isRegExp(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a RegExp",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
        "returnType": "(Bool)"
    }|*/
    return isRegExp(this);
}
export function _isString(this: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a string",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isString",
        "returnType": "(Bool)"
    }|*/
    return isString(this);
}

export { _isNull };