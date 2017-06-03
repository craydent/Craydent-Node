/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    t = require('craydent-typeof'),
    fillTemplate = require('craydent-template').fillTemplate,
    strip = cm.strip,getProperty,clearCache,setProperty,include;
//TODO: finish

__relativePathFinder
if (typeof JSON.parseAdvanced !== 'function') {
    JSON.parseAdvanced = function (text, reviver, values, base_path) {
        base_path = base_path || "";
        var err;
        if (t.isString(text) && /\d{16,}/.test(text)) {
            text = text.replace(/(\d{16,})/g,"\"$1\"");
            if (/""\d{16,}""/.test(text)) {
                text = text.replace(/""(\d{16,})""/g,"\"$1\"");
            }
        }
        try { text = JSON.parse(text, reviver) || text; } catch (e) { err = e; }
        if (!t.isObject(text)) {
            base_path = text.substring(0,text.lastIndexOf('/'));
            text = $c.include(__relativePathFinder(text));
            if (!text) { throw err; }
        }
        if (base_path && base_path.slice(-1) != "/") {
            base_path += "/";
        }
        return _parseAdvanced(text, null, values, base_path, 0);
    };
    function _parseAdvanced (obj,_original,values,base_path,depth, _parent, _current_path) {
        _current_path = _current_path || base_path || "";
        if (!obj) { return; }
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
                    value = cm.tryEval(value);
                } else if (type == "RegExp") {
                    value = new RegExp(cm.strip(value, '/'));
                } else if ($g[type]) {
                    value = new $g[type](value);
                } else {
                    name = nprop;
                    if (t.isObject(value) || t.isArray(obj[prop])) {
                        value = _parseAdvanced(value,_original,values,base_path,depth + 1,obj, _current_path + "/" + prop);
                    }
                }

                obj[name] = value;
                name != prop && delete obj[prop];
            } else if (prop == '$ref') {
                var value = fillTemplate(obj[prop],values),
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
                            refpath = refpath.substring(0,refpath.lastIndexOf("/"));
                            if (!refpath) { return undefined; }
                        }
                    }
                    return $c.getProperty(refobj, value, '/');
                }
                if (filepath.startsWith('/')) {
                    var pkg = require("./package.json");
                    filepath = (base_path ? "" : __dirname.replace(new RegExp("/node_modules/"+pkg.name+"$"),'')) + filepath;
                }
                try {
                    var module = __relativePathFinder(base_path + filepath,depth + 1);
                    $c.clearCache(module);
                    refobj = _parseAdvanced(require(module),null,values,base_path,depth + 1,obj,_current_path + "/" + prop);
                } catch(e) {
                    error('JSON.parseAdvanced._parseAdvanced', e);
                    return null;
                }
                return fieldpath ? $c.getProperty(refobj, fieldpath, '/') : refobj;
            } else if (t.isObject(obj[prop]) || t.isArray(obj[prop])) {
                obj[nprop] = _parseAdvanced(obj[prop],_original,values,base_path,depth + 1,obj,_current_path + "/" + prop);
                nprop != prop && delete obj[prop];
            } else {
                var value = obj[prop];
                var newval = t.isString(value) ? fillTemplate(value, values) : value;
                if (newval != value) { obj[prop] = value = newval; }
                if (nprop != prop) { delete obj[prop]; obj[nprop] = value; }
            }
        }
        return obj;
    }
}
if (typeof JSON.stringifyAdvanced !== 'function') {
    JSON.stringifyAdvanced = function (obj, replacer, space) {
        return JSON.stringify(_stringifyAdvanced (obj), replacer, space);
    };
    function _stringifyAdvanced (obj, _nobj ,_objs, _paths, _cpath) {
        _nobj = _nobj || (t.isObject(obj) ? {}: (t.isArray(obj) ? [] : obj));
        _objs = _objs || [obj];
        _paths = _paths || ["/"];
        _cpath = _cpath || "";
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) { continue; }
            var val = obj[prop];
            if (t.isObject(obj[prop]) || t.isArray(obj[prop])){
                var index;
                if (~(index = _objs.indexOf(obj[prop]))) {
                    val = { "$ref":"#" + _paths[index] };
                } else {
                    _objs.push(obj[prop]);
                    _paths.push(_cpath + "/" + prop);
                    val = _stringifyAdvanced(obj[prop], (t.isObject(obj[prop]) ? {} : []), _objs, _paths, "/" + prop);
                }
            }
            $c.setProperty(_nobj, "/" + prop, val, '/');
        }
        return _nobj;
    }

}