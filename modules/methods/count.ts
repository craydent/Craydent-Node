import error from '../methods/error';
import isArray from '../methods/isarray';
import isObject from '../methods/isobject';
import isRegExp from '../methods/isregexp';
import isString from '../methods/isstring';
import strip from '../methods/strip';
import where from '../methods/where';
import { WhereCondition } from '../models/Arrays';
import { AnyObject, AnyObjects } from '../models/Generics'

const _isObject = isObject,
    _isArray = isArray,
    _isString = isString,
    _isRegExp = isRegExp;

export default function count(obj: AnyObject): number;
export default function count(arr: string[], option?: string | RegExp): number;
export default function count(objs: AnyObjects, option?: WhereCondition): number;
export default function count(str: string, option?: string | RegExp): number;
export default function count(obj, option?): number {
    /*|{
          "info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
          "category": "Array|Object",
          "parameters":[],

          "overloads":[
              {"parameters":[
                  {"option": "(WhereCondition) Query used in Array.where when counting elements in an Array"}]},

              {"parameters":[
                  {"option": "(String) Word or phrase to count in the String"}]},

              {"parameters":[
                  {"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

          "url": "http://www.craydent.com/library/1.9.3/docs#object.count",
          "typeParameter": "<T>",
          "returnType": "(Int | NaN) returns the count"
      }|*/
    try {
        if (_isObject(obj)) {
            let count = 0;
            for (let prop in obj as AnyObject) {
                /* istanbul ignore else */
                if (obj.hasOwnProperty(prop)) { count++; }
            }
            return count;
        }
        if (_isArray(obj)) {
            if (_isObject(option)) {
                return where(obj as AnyObjects, option).length;
            }
            let isReg = _isRegExp(option);
            if (_isString(option) || isReg) {
                let ct = 0;
                for (let i = 0, len = obj.length; i < len; i++) {
                    /* istanbul ignore else */
                    if (~obj[i].indexOf(option) || (isReg && option.test(obj[i]))) { ct++; }
                }
                return ct;
            }
            return obj.length;
        }
        if (_isString(obj)) {
            let word = option;
            /* istanbul ignore else */
            if (!_isRegExp(word)) {
                word = new RegExp(word, "g");
            } else if (!option.global) {
                let reg_str = word.toString(),
                    index = reg_str.lastIndexOf('/'),
                    options = reg_str.substring(index + 1);
                word = new RegExp(strip(reg_str, '/'), `g${options}`);
            }
            return (obj.match(word) || []).length;
        }
        return NaN;
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.count', e);
        return NaN;
    }
}