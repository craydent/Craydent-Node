import error from '../methods/error';
import isNull from '../methods/isnull';
import isObject from '../methods/isobject';
import isRegExp from '../methods/isregexp';
import strip from '../methods/strip';

export interface GetPropertyOptions {
    noInheritance?: boolean;
    validPath?: boolean | number;
}

export default function getProperty(obj: any, path: string, delimiter?: string, options?: GetPropertyOptions): any;
export default function getProperty(obj: any, path: RegExp): any;
export default function getProperty(obj: any, path: string, options?: GetPropertyOptions): any;
export default function getProperty(obj: any, path: any, delimiter?: any, options?: any): any {
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
    try {
        if (isRegExp(path)) {
            for (let prop in obj) {
                /* istanbul ignore next */
                if (!obj.hasOwnProperty(prop)) { continue; }
                if (path.test(prop)) { return obj[prop]; }
            }
            return undefined;
        }

        if (isObject(delimiter)) {
            options = delimiter;
            delimiter = undefined;
        }
        options = options || {};
        delimiter = delimiter || ".";
        path = strip(path, delimiter);
        if (/\[\d*?\]/.test(path)) {
            path = path.replace(/\[(\d*?)\]/g, '.$1');
        }
        let props = path.split(delimiter);
        let value = obj, i = 0, prop: string;
        while (prop = props[i++]) {
            if (isNull(value[prop]) || (options.noInheritance && !value.hasOwnProperty(prop))) {
                if (!value.hasOwnProperty(prop)) { options.validPath = 0; }
                return undefined;
            }
            value = value[prop];
        }
        options.validPath = 1;
        return value;
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.getProperty', e);
        return null;
    }
}