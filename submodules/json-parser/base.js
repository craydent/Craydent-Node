/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    error = $s.error;

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    $s.TEMPLATE_VARS = $c.TEMPLATE_VARS || $s.TEMPLATE_VARS;
    $s.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || $s.TEMPLATE_TAG_CONFIG;

    require($s.dir + 'clearCache')($s);
    require($s.dir + 'include')($s);
    require($s.dir + 'relativePathFinder')($s);
    require($s.dir + 'fillTemplate')($s);

    $c.TEMPLATE_VARS = $c.TEMPLATE_VARS || $s.TEMPLATE_VARS;
    $c.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || $s.TEMPLATE_TAG_CONFIG;

    function _parseAdvanced (obj,_original,values,base_path,depth, _parent, _current_path) {
        _current_path = _current_path || base_path || "";
        if (!obj) { return; }
        _original = _original || obj;
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) { continue; }
            var nprop = $s.fillTemplate(prop.toString(), values);
            if (~nprop.indexOf('.') && (nprop.match(/\./) || []).length == 1) {
                var parts = nprop.split('.'),
                    name = parts[1],
                    type = parts[0],
                    value = $s.fillTemplate(obj[prop], values) || obj[prop];
                if (type == "Number") {
                    value = Number(value);
                } else if (type == "Function") {
                    value = $s.tryEval(value);
                } else if (type == "RegExp") {
                    value = new RegExp($s.strip(value, '/'));
                } else if ($g[type]) {
                    value = new $g[type](value);
                } else {
                    name = nprop;
                    if ($s.isObject(value) || $s.isArray(obj[prop])) {
                        value = _parseAdvanced(value,_original,values,base_path,depth + 1,obj, _current_path + "/" + prop);
                    }
                }

                obj[name] = value;
                name != prop && delete obj[prop];
            } else if (prop == '$ref') {
                var value = $s.fillTemplate(obj[prop],values),
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
                    return $s.getProperty(refobj, value, '/');
                }
                if (filepath.startsWith('/')) {
                    var pkg = require("./package.json");
                    filepath = (base_path ? "" : __dirname.replace(new RegExp("/node_modules/"+pkg.name+"$"),'')) + filepath;
                }
                try {
                    var module = $s.relativePathFinder(base_path + filepath,depth + 1);
                    $s.clearCache(module);
                    refobj = _parseAdvanced(require(module),null,values,base_path,depth + 1,obj,_current_path + "/" + prop);
                } catch(e) {
                    error('JSON.parseAdvanced._parseAdvanced', e);
                    return null;
                }
                return fieldpath ? $s.getProperty(refobj, fieldpath, '/') : refobj;
            } else if ($s.isObject(obj[prop]) || $s.isArray(obj[prop])) {
                obj[nprop] = _parseAdvanced(obj[prop],_original,values,base_path,depth + 1,obj,_current_path + "/" + prop);
                nprop != prop && delete obj[prop];
            } else {
                var value = obj[prop];
                var newval = $s.isString(value) ? $s.fillTemplate(value, values) : value;
                if (newval != value) { obj[prop] = value = newval; }
                if (nprop != prop) { delete obj[prop]; obj[nprop] = value; }
            }
        }
        return obj;
    }
    function _stringifyAdvanced (obj, _nobj ,_objs, _paths, _cpath) {
        _nobj = _nobj || ($s.isObject(obj) ? {}: ($s.isArray(obj) ? [] : obj));
        _objs = _objs || [obj];
        _paths = _paths || ["/"];
        _cpath = _cpath || "";
        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) { continue; }
            var val = obj[prop];
            if ($s.isObject(obj[prop]) || $s.isArray(obj[prop])){
                var index;
                if (~(index = _objs.indexOf(obj[prop]))) {
                    val = { "$ref":"#" + _paths[index] };
                } else {
                    _objs.push(obj[prop]);
                    _paths.push(_cpath + "/" + prop);
                    val = _stringifyAdvanced(obj[prop], ($s.isObject(obj[prop]) ? {} : []), _objs, _paths, "/" + prop);
                }
            }
            $s.setProperty(_nobj, "/" + prop, val, '/');
        }
        return _nobj;
    }

    $c.parseAdvanced = function (text, reviver, values, base_path) {
        /*|{
            "info": "JSON Parser that can handle types and refs",
            "category": "JSON Parser",
            "parameters":[
                {"text": "(String) A valid JSON string."},
                {"reviver?": "(Reviver) A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is."},
                {"values?": "(Object) Key/value pairs to be used to replace template variables defined in the json."}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#Benchmarker",
            "returnType": "(Object)"
        }|*/
        base_path = base_path || "";
        var err;
        if ($s.isString(text) && /\d{16,}/.test(text)) {
            text = text.replace(/(\d{16,})/g,"\"$1\"");
            if (/""\d{16,}""/.test(text)) {
                text = text.replace(/""(\d{16,})""/g,"\"$1\"");
            }
        }
        try { text = JSON.parse(text, reviver) || text; } catch (e) { err = e; }
        if (!$s.isObject(text)) {
            base_path = text.substring(0,text.lastIndexOf('/'));
            text = $s.include($s.relativePathFinder(text));
            if (!text) { throw err; }
        }
        if (base_path && base_path.slice(-1) != "/") {
            base_path += "/";
        }
        return _parseAdvanced(text, null, values, base_path, 0);
    }
    $c.stringifyAdvanced = function (obj, replacer, space) {
        /*|{
            "info": "JSON Parser that can handle types and refs",
            "category": "JSON Parser",
            "parameters":[
                {"json": "(Object) A JavaScript value, usually an object or array, to be converted."},
                {"replacer?": "(Replacer) A function that transforms the results. This function is called for each member of the object. If a member contains nested objects, the nested objects are transformed before the parent object is."},
                {"space?": "(String|Integer) Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read."}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#Benchmarker",
            "returnType": "(String)"
        }|*/
        return JSON.stringify(_stringifyAdvanced (obj), replacer, space);
    };

    module.exports = $c;
}