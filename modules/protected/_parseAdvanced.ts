import error from '../methods/error';
import clearCache from '../methods/clearCache';
import fillTemplate from '../methods/fillTemplate';
import getProperty from '../methods/getProperty';
import isArray from '../methods/isArray';
import isObject from '../methods/isObject';
import isString from '../methods/isString';
import absolutePath from '../methods/absolutePath';
import startsWithAny from '../methods/startsWithAny';
import strip from '../methods/strip';
import tryEval from '../methods/tryEval';
import { AnyObjects, AnyObject } from '../models/Arrays';
import include from '../methods/include';

const $g: any = global;

export default function _parseAdvanced(obj: any): any;
export default function _parseAdvanced(obj: any, original: any, values: AnyObject | AnyObjects, base_path?: string, depth?: number): any;
export default function _parseAdvanced(obj, original?, values?, base_path?, depth?, _parents?, _current_path?, _processedObjects?): any {
    values = values || [];
    base_path = base_path || "";
    depth = depth || 0;
    _parents = _parents || [];
    _current_path = _current_path || base_path || "";
    _processedObjects = _processedObjects || [];
    if (!obj) { return; }
    if (~_processedObjects.indexOf(obj)) { return obj; }
    _processedObjects.push(obj);
    original = original || obj;
    for (let prop in obj) {
        /* istanbul ignore if */
        if (!obj.hasOwnProperty(prop)) { continue; }
        let nprop = fillTemplate(prop.toString(), values);
        if (~nprop.indexOf('.') && (/* istanbul ignore next */nprop.match(/\./) || []).length == 1) {
            let parts = nprop.split('.'),
                name = parts[1],
                type = parts[0],
                value = fillTemplate(obj[prop], values) || obj[prop];
            if (type == "Number") {
                value = Number(value);
            } else if (type == "Function") {
                value = tryEval(value);
            } else if (type == "RegExp") {
                value = new RegExp(strip(value, '/'));
            } else if ($g[type]) {
                value = new $g[type](value);
            } else {
                name = nprop;
                /* istanbul ignore else */
                if (isObject(value) || isArray(obj[prop])) {
                    _parents.push(obj);
                    // @ts-ignore
                    value = _parseAdvanced(value, original, values, base_path, depth + 1, _parents, `${_current_path}/${prop}`, _processedObjects);
                    _parents.pop();
                }
            }

            obj[name] = value;
            name != prop && delete obj[prop];
        } else if (prop == '$ref') {
            let value = fillTemplate(obj[prop], values),
                hashIndex = value.indexOf('#'),
                refobj = obj,
                parts = value.split('#'),
                filepath = parts[0],
                fieldpath = parts[1];
            if (hashIndex == 0) {
                value = value.substring(1);
                let index = _parents.length - 1;
                if (value[0] == "/") {
                    refobj = original;
                } else if (!startsWithAny(value, "../")) {
                    refobj = _parents[index];
                    if (value.indexOf('./') === 0) {
                        value = value.replace('./', '');
                    }
                } else {
                    let refpath = _current_path;
                    refobj = _parents[index--];
                    while (startsWithAny(value, "../")) {
                        refobj = _parents[index--];
                        value = value.substring(3);
                        refpath = refpath.substring(0, refpath.lastIndexOf("/"));
                        if (!refpath) { return undefined; }
                    }
                }
                return getProperty(refobj, value, '/');
            }
            if (startsWithAny(filepath, '/')) {
                let path = include('path').resolve('./');
                /* istanbul ignore next */
                filepath = (base_path ? "" : path) + filepath;
            }
            try {
                let module = (absolutePath as any)(base_path + filepath, depth + 1);
                clearCache(module);
                _parents.push(obj);
                // @ts-ignore
                refobj = _parseAdvanced(require(module), null, values, base_path, depth + 1, _parents, `${_current_path}/${prop}`, _processedObjects);
                _parents.pop();
            } catch (e) {
                /* istanbul ignore next */
                error && error('JSON.parseAdvanced._parseAdvanced', e);
                /* istanbul ignore next */
                return null;
            }
            /* istanbul ignore next */
            return fieldpath ? getProperty(refobj, fieldpath, '/') : refobj;
        } else if (isObject(obj[prop]) || isArray(obj[prop])) {
            _parents.push(obj);
            // @ts-ignore
            obj[nprop] = _parseAdvanced(obj[prop], original, values, base_path, depth + 1, _parents, `${_current_path}/${prop}`, _processedObjects);
            _parents.pop();
            /* istanbul ignore next */
            nprop != prop && delete obj[prop];
        } else {
            let value = obj[prop];
            let newval = isString(value) ? fillTemplate(value, values) : value;
            if (newval != value) { obj[prop] = value = newval; }
            if (nprop != prop) { delete obj[prop]; obj[nprop] = value; }
        }
    }
    return obj;
}