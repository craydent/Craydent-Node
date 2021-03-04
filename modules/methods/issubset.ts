import error from '../methods/error';
import _contains from '../methods/contains';
import isArray from '../methods/isarray';
import isObject from '../methods/isobject';
import isNull from '../methods/isnull';
// const _isArray = isArray,
//     _isObject = isObject;

export default function isSubset<T, R>(arr: T[], compare: R[], sharesAny?: boolean): boolean;
export default function isSubset<T, R>(obj: T, compare: R, sharesAny?: boolean): boolean;
export default function isSubset(obj, compare, sharesAny?): boolean {
    /*|{
        "info": "Object class extension to check if item is a subset",
        "category": "Array|Object",
        "parameters":[
            {"compare": "(Array<T>|Object) Superset to compare against"}],

        "overloads": [],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
        "typeParameter": "<R>",
        "returnType": "(Bool) returns true if the array is a subset, otherwise false."
    }|*/
    try {
        if (isNull(obj) || isNull(compare)) { return false; }
        const _isArray = isArray(obj) && isArray(compare);
        const _isObject = isObject(obj) && isObject(compare);
        if (_isObject || _isArray) {

            for (let prop in obj) {
                /* istanbul ignore next */
                if (!obj.hasOwnProperty(prop)) { continue; }
                let hasIt;
                if ((_isObject && (hasIt = compare.hasOwnProperty(prop)) && sharesAny)
                    || (_isArray && (hasIt = _contains(compare, obj[prop])) && sharesAny)) {
                    return true;
                }
                if (!sharesAny && !hasIt) {
                    return false;
                }
            }

            return !sharesAny;
        }
        return !!~compare.toString().indexOf(obj.toString()) && obj.constructor == compare.constructor;

    } catch (e) /* istanbul ignore next */ {
        error && error('Object.isSubset', e);
        return null;
    }
}