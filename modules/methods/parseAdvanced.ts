import error from './error';
import clearCache from './clearCache';
import fillTemplate from './fillTemplate';
import getProperty from './getProperty';
import include from './include';
import isArray from './isArray';
import isObject from './isObject';
import isString from './isString';
import relativePathFinder from './relativePathFinder';
import strip from './strip';
import tryEval from './tryEval';
import { AnyObject } from 'modules/models/Arrays';


function _parseAdvanced(obj: AnyObject, _original: AnyObject, values: AnyObject, base_path: string, depth: number, _parent?: AnyObject, _current_path?: string): AnyObject {
    _current_path = _current_path || base_path || "";
    if (!obj) { return null; }
    _original = _original || obj;
    for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) { continue; }
        var nprop = fillTemplate(prop.toString(), values);
        if (~nprop.indexOf('.') && (nprop.match(/\./) || []).length == 1) {
            var parts = nprop.split('.'),
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
                    value = _parseAdvanced(value, _original, values, base_path, depth + 1, obj, _current_path + "/" + prop);
                }
            }

            obj[name] = value;
            name != prop && delete obj[prop];
        } else if (prop == '$ref') {
            var value = fillTemplate(obj[prop], values),
                hashIndex = value.indexOf('#'),
                refobj = obj,
                parts = value.split('#'),
                filepath = parts[0],
                fieldpath = parts[1];
            if (hashIndex == 0) {
                value = value.substring(1);
                if (value[0] == "/") {
                    refobj = _original;
                } else if (!value.startsWith("../")) {
                    refobj = _parent;
                } else {
                    var refpath = _current_path;
                    while (value.startsWith("../")) {
                        value = value.substring(3);
                        refpath = refpath.substring(0, refpath.lastIndexOf("/"));
                        if (!refpath) { return undefined; }
                    }
                }
                return getProperty(refobj, value, '/');
            }
            if (filepath.startsWith('/')) {
                var pkg = require("./package.json");
                filepath = (base_path ? "" : __dirname.replace(new RegExp("/node_modules/" + pkg.name + "$"), '')) + filepath;
            }
            try {
                var module = relativePathFinder(base_path + filepath, depth + 1);
                clearCache(module);
                refobj = _parseAdvanced(require(module), null, values, base_path, depth + 1, obj, _current_path + "/" + prop);
            } catch (e) {
                error('JSON.parseAdvanced._parseAdvanced', e);
                return null;
            }
            return fieldpath ? getProperty(refobj, fieldpath, '/') : refobj;
        } else if (isObject(obj[prop]) || isArray(obj[prop])) {
            obj[nprop] = _parseAdvanced(obj[prop], _original, values, base_path, depth + 1, obj, _current_path + "/" + prop);
            nprop != prop && delete obj[prop];
        } else {
            var value = obj[prop];
            var newval = isString(value) ? fillTemplate(value, values) : value;
            if (newval != value) { obj[prop] = value = newval; }
            if (nprop != prop) { delete obj[prop]; obj[nprop] = value; }
        }
    }
    return obj;
}
export default function parseAdvanced(text: string, reviver?: (this: any, key: string, value: any) => any, values?: AnyObject, base_path?: string): AnyObject {
    /*|{
        "info": "JSON Parser that can handle types and refs",
        "category": "JSON Parser",
        "parameters":[
            {"text": "(String) A valid JSON string."},
            {"reviver?": "(Reviver) A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is."},
            {"values?": "(Object) Key/value pairs to be used to replace template variables defined in the json."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#parseAdvanced",
        "returnType": "(Object)"
    }|*/
    base_path = base_path || "";
    let err;
    if (isString(text) && /\d{16,}/.test(text)) {
        text = text.replace(/(\d{16,})/g, "\"$1\"");
        if (/""\d{16,}""/.test(text)) {
            text = text.replace(/""(\d{16,})""/g, "\"$1\"");
        }
    }
    let parsedObject: AnyObject;
    try { parsedObject = JSON.parse(text, reviver) || text; } catch (e) { err = e; }
    if (!isObject(parsedObject)) {
        base_path = text.substring(0, text.lastIndexOf('/'));
        parsedObject = include(relativePathFinder(text));
        if (!parsedObject) { throw err; }
    }
    if (base_path && base_path.slice(-1) != "/") {
        base_path += "/";
    }
    return _parseAdvanced(parsedObject, null, values, base_path, 0);
}