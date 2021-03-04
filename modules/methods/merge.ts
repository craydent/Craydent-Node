import error from '../methods/error';
import duplicate from '../methods/duplicate';
import { AnyObject } from '../models/Generics';
import isArray from '../methods/isarray';
import isFunction from '../methods/isfunction';
import isObject from '../methods/isobject';
import isNullOrEmpty from '../methods/isnullorempty';

export type MergeEnums = "recurse" | "onlyShared" | "intersect" | "clone";

export interface MergeOptions {
    recurse?: boolean;
    onlyShared?: boolean;
    intersect?: boolean;
    clone?: boolean;
    compareFunction?: Function;
};
export type MergeIterator = (original: any, comparison: any) => boolean;

export default function merge<T, R, TResult>(obj: T[], secondary: R[], condition?: MergeIterator): TResult;
export default function merge<T, R, TResult>(obj: T, secondary: R, condition?: MergeEnums | MergeOptions): TResult;
export default function merge<TResult>(obj, secondary, condition?): TResult {
    /*|{
        "info": "Object class extension to merge objects",
        "category": "Object",
        "parameters":[
            {"secondary": "(Object) Object to merge with"},
            {"condition?": "(MergeEnums|MergeOptions|MergeIterator) Flags to recurse, merge only shared value, clone, intersect etc"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.merge",
        "returnType": "(Object)"
    }|*/
    try {
        condition = condition || {} as MergeOptions;
        let recurse = condition == "recurse" || (condition as MergeOptions).recurse,
            shared = condition == "onlyShared" || (condition as MergeOptions).onlyShared,
            intersect = condition == "intersect" || (condition as MergeOptions).intersect,
            objtmp: AnyObject = (condition == "clone" || (condition as MergeOptions).clone) ? duplicate(obj, true) : obj,
            compareFunction = isFunction(condition) ? condition as Function : (condition as MergeOptions).compareFunction,
            intersectObj = {} as AnyObject;

        for (let prop in secondary) {
            /* istanbul ignore else */
            if (secondary.hasOwnProperty(prop)) {
                if (intersect && objtmp.hasOwnProperty(prop)) {
                    intersectObj[prop] = secondary[prop];
                } else if (shared) {
                    // passing share Only
                    if (objtmp.hasOwnProperty(prop)) {
                        objtmp[prop] = secondary[prop];
                    }
                } else if (compareFunction && isFunction(compareFunction)) {
                    if (isArray(objtmp) && objtmp.hasOwnProperty(prop) && compareFunction(objtmp[prop], secondary[prop])) {
                        objtmp[prop] = secondary[prop];
                        continue;
                    }
                    objtmp.push(duplicate(secondary[prop]));
                } else {
                    if (isArray(objtmp) && (isNullOrEmpty(condition) && !recurse)) {
                        if (!~objtmp.indexOf(secondary[prop])) {
                            objtmp.push(secondary[prop]);
                        }
                    } else if (recurse && (isArray(objtmp[prop]) || isObject(objtmp[prop])) && (isArray(secondary[prop]) || isObject(secondary[prop]))) {
                        objtmp[prop] = merge(objtmp[prop], secondary[prop], condition);
                    } else {
                        objtmp[prop] = secondary[prop];
                    }
                }
            }
        }
        return (intersect ? intersectObj : objtmp) as TResult;
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.merge', e);
        return null;
    }
}