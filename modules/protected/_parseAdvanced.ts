import error from '../methods/error';
import clearCache from '../methods/clearCache';
import fillTemplate from '../methods/fillTemplate';
import getProperty from '../methods/getProperty';
import isArray from '../methods/isArray';
import isObject from '../methods/isObject';
import isString from '../methods/isString';
import relativePathFinder from '../methods/relativePathFinder';
import startsWithAny from '../methods/startsWithAny';
import strip from '../methods/strip';
import tryEval from '../methods/tryEval';
import { AnyObjects, AnyObject } from '../models/Arrays';

export default function _parseAdvanced(obj: any): any;
export default function _parseAdvanced(obj: any, original: any, values: AnyObject | AnyObjects, base_path?: string, depth?: number): any;
export default function _parseAdvanced(obj, original?, values?, base_path?, depth?, _parent?, _current_path?): any {
    values = values || [];
    base_path = base_path || "";
    depth = depth || 0;
    _parent = _parent;
    _current_path = _current_path || base_path || "";
    if (!obj) { return; }
    original = original || obj;
    for (let prop in obj) {
        if (!obj.hasOwnProperty(prop)) { continue; }
        let nprop = fillTemplate(prop.toString(), values);
        if (~nprop.indexOf('.') && (nprop.match(/\./) || []).length == 1) {
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
                if (isObject(value) || isArray(obj[prop])) {
                    // @ts-ignore
                    value = _parseAdvanced(value, original, values, base_path, depth + 1, obj, `${_current_path}/${prop}`);
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
                if (value[0] == "/") {
                    refobj = original;
                } else if (!startsWithAny(value, "../")) {
                    refobj = _parent;
                } else {
                    let refpath = _current_path;
                    while (startsWithAny(value, "../")) {
                        value = value.substring(3);
                        refpath = refpath.substring(0, refpath.lastIndexOf("/"));
                        if (!refpath) { return undefined; }
                    }
                }
                return getProperty(refobj, value, '/');
            }
            if (startsWithAny(filepath, '/')) {
                let pkg = require("./package.json");
                filepath = (base_path ? "" : __dirname.replace(new RegExp(`/node_modules/${pkg.name}$`), '')) + filepath;
            }
            try {
                let module = relativePathFinder(base_path + filepath, depth + 1);
                clearCache(module);
                // @ts-ignore
                refobj = _parseAdvanced(require(module), null, values, base_path, depth + 1, obj, `${_current_path}/${prop}`);
            } catch (e) {
                error && error('JSON.parseAdvanced._parseAdvanced', e);
                return null;
            }
            return fieldpath ? getProperty(refobj, fieldpath, '/') : refobj;
        } else if (isObject(obj[prop]) || isArray(obj[prop])) {
            // @ts-ignore
            obj[nprop] = _parseAdvanced(obj[prop], original, values, base_path, depth + 1, obj, `${_current_path}/${prop}`);
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