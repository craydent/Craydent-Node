/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
global.$g = global;
var info = require('./package.json'),
    _craydent_version = info.version, $s = {}, scope = { eval: eval }, $c = $g.$c;
$g.navigator = $g.navigator || {};
var fsmethods = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "read",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "write",
    "writeFile"
],
globalizables = [
    'Benchmarker',
    'CLI',
    'Cursor',
    'parseAdvanced',
    'stringifyAdvanced',
    // $c.JSONPA && (ctx.JSONPA = JSON.parseAdvanced);
    // $c.JSONSA && (ctx.JSONSA = JSON.stringifyAdvanced);
    'JSZip',
    'OrderedList',
    'Queue',
    'Set',
    'addObjectPrototype',
    'ajax',
    'yieldable',
    'catchAll',
    'clearCache',
    'clusterit',
    'cout',
    'createServer',
    'cuid',
    'emit',
    'error',
    'exclude',
    'fillTemplate',
    'foo',
    'include',
    'isNull',
    'isNullOrEmpty',
    'logit',
    'md5',
    'mkdirRecursive',
    'namespace',
    'next',
    'foo',
    'now',
    'parseBoolean',
    'parseRaw',
    'rand',
    'requireDirectory',
    'suid',
    'syncroit',
    'tryEval',
    'wait',
    'xmlToJson',
    'yieldable',
    'zipit'
].concat(fsmethods);
function __contextualizeMethods (ctx) {
    try {
        ctx = ctx || {};

        for (var i = 0, len = globalizables.length; i < len; i++) {
            $c[globalizables[i]] && (ctx[globalizables[i]] = $c[globalizables[i]]);
        }

        return ctx;
    } catch (e) {
        error('__contextualizeMethods', e);
    }
}
function __isNewer(loadedVersion, thisVersion){
    if (loadedVersion[0] == thisVersion[0]) {
        loadedVersion.splice(0,1);
        thisVersion.splice(0,1);
        if (!thisVersion.length || !loadedVersion.length) {
            return false;
        }
        return __isNewer(loadedVersion, thisVersion);
    }
    return parseInt(loadedVersion[0]) < parseInt(thisVersion[0]);
}

if (!$g.$c || __isNewer($g.$c.VERSION.split('.'), _craydent_version.split('.')) ) {
    $g.$c = $c = $g.$c || function Craydent () {};

    $c.DEBUG_MODE = $c.DEBUG_MODE || false;
    $c.VERSION = _craydent_version;
    $c.MODULES_LOADED = $c.MODULES_LOADED || [];
    delete $c.MODULES_LOADED[info.name];

}

// merge typeof module to $c
// var $t = require('craydent-typeof');
var $t = require('./submodules/typeof');
for (var type_check in $t) {
    if ($t.hasOwnProperty(type_check)) {
        module.exports[type_check] = $t[type_check];
        // $c[type_check] = $t[type_check];
    }
}

try {
// retrieve public and local IP Addresses
    var nics = require('os').networkInterfaces();
    for (var nic in nics) {
        if (!nics.hasOwnProperty(nic)) {
            continue;
        }
        // filter for address that is IPv4
        var iface = nics[nic].filter(function (ic) {
            return ic.family == 'IPv4';
        })[0];
        if (iface) {
            if (nic.startsWith('lo')) {
                $c.LOCAL_IP = iface.address;
            } else if (nic.startsWith('eth') || nic.startsWith('en')) {
                $c.PUBLIC_IP = iface.address
            }
        }
        // break if local and public ips are found
        if ($c.LOCAL_IP && $c.PUBLIC_IP) {
            break
        }
    }
} catch (e) {
    error('common', e);
}

function __log_module () {
    $c.MODULES_LOADED[info.name] = $c.VERSION;// = true;
}
function __convert_regex_safe(reg_str) {
    try {
        return reg_str.replace(/\\/gi,"\\\\")
            .replace(/\$/gi, "\\$")
            .replace(/\//gi, "\\/")
            .replace(/\^/gi, "\\^")
            .replace(/\./gi, "\\.")
            .replace(/\|/gi, "\\|")
            .replace(/\*/gi, "\\*")
            .replace(/\+/gi, "\\+")
            .replace(/\?/gi, "\\?")
            .replace(/\!/gi, "\\!")
            .replace(/\{/gi, "\\{")
            .replace(/\}/gi, "\\}")
            .replace(/\[/gi, "\\[")
            .replace(/\]/gi, "\\]")
            .replace(/\(/gi, "\\(")
            .replace(/\)/gi, "\\)")
            .replace('\n','\\n');
    } catch (e) {
        error('__convert_regex_safe', e);
    }
}
function _duplicate(obj, original, recursive/*, ref, current_path, exec*/) {
    try {
        if ($t.isNull(obj)) { return obj; }
        if ($t.isString(obj) || $t.isString(original)
            || $t.isInt(obj) || $t.isInt(original)
            || $t.isFloat(obj) || $t.isFloat(original)
            || $t.isNumber(obj) || $t.isNumber(original)) {
            return original;
        }
        var argIndex = 3;

        // remove all properties if it is the root level
        var ref = arguments[argIndex] || {objects:[{obj:original,path:"obj"}]},
            current_path = arguments[argIndex+1] || "obj";
        (arguments[argIndex+2] || (arguments[argIndex+2] = {})) && (arguments[argIndex+2].command = arguments[argIndex+2].command || "");
        if (!(ref.objects.length == 1)) {
            for (var prop in obj){
                if (obj.hasOwnProperty(prop)) { delete obj[prop]; }
            }
        }
        var loop_func = function (prop, original) { // 0 => property, 1 => original object, 2 => reference path object, 3 => current path, 4 => command object
            if (original.hasOwnProperty(prop) && original[prop] && recursive) {
                var index = indexOfAlt(ref.objects,original[prop], function(obj,value){
                        return obj.obj===value;
                    }),
                    new_path = current_path+"["+parseRaw(prop)+"]";

                if (~index) {
                    return arguments[argIndex+1].command += new_path + "="+ref.objects[index].path+";";
                }

                if (typeof(original[prop]) in {"object":1,"function":1} && recursive) {
                    var isfunc = typeof(original[prop].constructor) == "function";
                    if (isfunc && typeof(original[prop]) == "object") { obj[prop] = new original[prop].constructor();
                    } else if (!isfunc) { obj[prop] = {};
                    } else { obj[prop] = tryEval(original[prop].toString()); }
                    ref.objects.push({obj:original[prop],path:new_path});
                    return _duplicate(obj[prop], original[prop], true, ref, new_path, arguments[argIndex+1]);
                }
            } else if (!original.hasOwnProperty(prop)) {
                return;
            }
            obj[prop] = original[prop];
        };
        if ($t.isArray(original)) {
            var i = 0, len = original.length;
            while (i++ < len) {
                loop_func.call(obj, i - 1, original, ref, current_path, arguments[argIndex+2]);
            }
        } else {
            for (var prop in original){
                if (!original.hasOwnProperty(prop)) { continue; }
                loop_func.call(obj, prop, original, ref, current_path, arguments[argIndex+2]);
            }
        }

        if (!arguments[argIndex+1]) {
            eval(arguments[argIndex+2].command);
        }

        return obj;
    } catch (e) {
        error('_duplicate', e);
    }
}

function defineFunction (name, func, override) {
    try {
        var args = getFuncArgs(func),
            fstr = func.toString().replace(/this/g,'craydent_ctx'),

            // extra code to account for when this == global
            extra_code = "if(arguments.length == 0 && this == $c){return;}",
            fnew = args.length === 0 || (args.length === 1 && !general_trim(args[0])) ?
                fstr.toString().replace(/(\(\s*?\)\s*?\{)/, ' (craydent_ctx){'+extra_code) :
                "(" + fstr.toString().replace(/\((.*?)\)\s*?\{/, '(craydent_ctx,$1){'+extra_code) + ")";

        if (!override && scope.eval("typeof("+name+")") !== "undefined") {
            return scope.eval("$c."+name+" = "+fnew);
        }
        return scope.eval("$c."+name+" = "+fnew);
    } catch (ex) {
        error("defineFunction", ex);
    }
}
function duplicate (obj, recursive) {
    if ($t.isNull(obj)) { return obj; }
    return _duplicate(new obj.constructor(), obj, recursive);
}
function capitalize (str, pos, everyWord) {
   try {
        pos = pos || [0];
        !$t.isArray(pos) && (pos = [pos]);
        var wordArray = everyWord ? str.split(' ') : ([str]);
        for (var i = 0; i < pos.length; i++) {
            for (var j = 0; j < wordArray.length; j++) {
                wordArray[j] = wordArray[j].substring(0, pos[i]) + wordArray[j].charAt(pos[i]).toUpperCase() + wordArray[j].slice(pos[i] + 1);
            }
        }
        return wordArray.join(' ');
    } catch (e) {
        error("String.capitalize", e);
    }
}
function condense (objs, check_values) {
    try {
        var skip = [], arr = [], without = false;
        if ($t.isArray(check_values)) {
            without = true;
        }
        for (var i = 0, len = objs.length; i < len; i++) {
            var obj = objs[i];
            if (check_values) {
                var index = i;
                if (without && ~check_values.indexOf(obj)) {
                    skip.push(i);
                    continue;
                }
                if (~skip.indexOf(i)) { continue; }
                while (~(index = objs.indexOf(obj,index + 1))) {
                    skip.push(index);
                }

            }
            obj !== "" && !$t.isNull(obj) && !~(skip.indexOf && skip.indexOf(i) || indexOf(skip, i)) && !$t.isNull(obj) && arr.push(obj);
        }
        return arr;
    } catch (e) {
        error("condence", e);
        return false;
    }
}
function cout () {
    /*|{
        "info": "Log to console when DEBUG_MODE is true and when the console is available",
        "category": "Global",
        "parameters":[
            {"...infinite": "any number of arguments can be passed."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#cout",
        "returnType": "(void)"
    }|*/
    try {
        if($c && $c.DEBUG_MODE && console && console.log){
            for (var i = 0, len = arguments.length; i < len; i++) {
                console.log(arguments[i]);
            }
        }
    } catch (e) {
        error('cout', e);
    }
}
function equals (obj, compare, props){
    /*|{
        "info": "Object class extension to check if object values are equal",
        "category": "Object",
        "parameters":[
            {"compare": "(any) Object to compare against"}],

        "overloads":[
            {"parameters":[
                {"compare": "(any) Object to compare against"},
                {"props": "(String[]) Array of property values to compare against"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
        "returnType": "(Bool)"
    }|*/
    try {
        if ($t.isArray(props)) {
            var j = 0;
            while (prop = props[j++]) {
                if (obj.hasOwnProperty(prop) && compare.hasOwnProperty(prop) && !equals(obj[prop],compare[prop])
                    || (!obj.hasOwnProperty(prop) && compare.hasOwnProperty(prop))
                    || (obj.hasOwnProperty(prop) && !compare.hasOwnProperty(prop))) {
                    return false;
                }
            }
            return true;
        }
        if (($t.isObject(obj) && $t.isObject(compare)) || ($t.isArray(obj) && $t.isArray(compare))) {
            for (var prop in compare){
                if (!compare.hasOwnProperty(prop)) { continue; }
                if (!equals(obj[prop], compare[prop])) { return false; }
            }
            for (var prop in obj){
                if (!obj.hasOwnProperty(prop)) { continue; }
                if (!equals(obj[prop], compare[prop])) { return false; }
            }
            return true;
        }
        if (obj === undefined && compare !== undefined || obj !== undefined && compare === undefined) { return false; }
        if (obj === null && compare !== null || obj !== null && compare === null) { return false; }
        if ($t.isRegExp(compare)) { return compare.test(obj.toString()); }
        return (obj.toString() == compare.toString() && obj.constructor == compare.constructor);
    } catch (e) {
        error('Object.equals', e);
    }
}
function error (fname, e) {
    /*|{
        "info": "User implemented place holder function to handle errors",
        "category": "Global",
        "parameters":[
            {"fname": "(String) The function name the error was thrown"},
            {"e": "(Error) Exception object thrown"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#error",
        "returnType": "(void)"
    }|*/
    try {
        $c.DEBUG_MODE && cout("Error in " + fname + "\n" + (e.description || e), e, e.stack);
    } catch (e) {
        cout("Error in " + fname + "\n" + (e.description || e));
    }
}
function ext (cls, property, func, override) {
    try {
        $g.__craydentNoConflict || (cls['prototype'][property] = cls['prototype'][property] || func);
        defineFunction(property, func, override);
    } catch (e) {
        error('ext', e);
    }
}
function foo () {
    /*|{
        "info": "Place holder function for a blank function",
        "category": "Global",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#foo",
        "returnType": "(void)"
    }|*/
}
function getFuncArgs (func) {
    try {
        return condense(general_trim(strip(func.toString(), '(')).replace(/\s*/gi, '').replace(/\/\*.*?\*\//g,'').replace(/.*?\((.*?)\).*/, '$1').split(',')) || [];
    } catch (e) {
        error('getFuncArgs', e);
    }
}
function getFuncName (func) {
    try {
        return general_trim(func.toString().replace(/\/\/.*?[\r\n]/gi,'').replace(/[\t\r\n]*/gi, '').replace(/\/\*.*?\*\//gi, '').replace(/.*?function\s*?(.*?)\s*?\(.*/,'$1'));
    } catch (e) {
        error('getFuncName', e);
    }
}
function getProperty (obj, path, delimiter, options) {
    try {
        if ($t.isRegExp(path)) {
            for (var prop in obj) {
                if(!obj.hasOwnProperty(prop)){ continue; }
                if (path.test(prop)) { return obj[prop]; }
            }
            return undefined;
        }

        if ($t.isObject(delimiter)) {
            options = delimiter;
            delimiter = undefined;
        }
        options = options || {};
        delimiter = delimiter || ".";
        path = strip(path, delimiter);
        var props = path.split(delimiter);
        var value = obj, i = 0, prop;
        while (prop = props[i++]) {
            if ($t.isNull(value[prop])
                || (options.noInheritance && !value.hasOwnProperty(prop))) {
                if (!value.hasOwnProperty(prop)) { options.validPath = 0; }
                return undefined;
            }
            value = value[prop];
        }
        options.validPath = 1;
        return value;
    } catch (e) {
        error('Object.getProperty', e);
    }
}
function globalize () {
    /*|{
        "info": "Module method to globalize functions",
        "category": "Module",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.globalize",
        "returnType": "(Array)"
    }|*/
    try {
        __contextualizeMethods($g);
    } catch (e) {
        error('globalize', e);
    }
};
function indexOf (objs, value) {
    try {
        var len = objs.length,
            i = 0;
        while (i < len) {
            if (objs[i] === value) return i;
            ++i;
        }
        return -1;
    } catch (e) {
        error("_indexOf", e);
    }
}
function indexOfAlt (obj, value, option) {
    /*|{
        "info": "Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression",
        "category": "Array",
        "parameters":[
            {"value": "(any) value to find"},
            {"func": "(ArrayIterator<T, TResult>) Callback function used to do the comparison"}],

        "overloads":[
            {"parameters":[
                {"regex": "(RegExp) Regular expression to check value against"}]},

            {"parameters":[
                {"regex": "(RegExp) Regular expression to check value against"},
                {"pos": "(Int) Index offset to start"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOfAlt",
        "returnType": "(Integer)"
    }|*/
    try {
        if ($t.isArray(obj)) {
            var func = option;
            var len = obj.length,
                i = 0;
            while (i < len) {
                if ($t.isRegExp(value) && value.test(obj[i])) { return i; }
                if ($t.isFunction(func) && (value instanceof Object ? func(obj[i], value) : func(obj[i]) === value)) { return i; }
                ++i;
            }
            return -1;
        }
        if ($t.isString(obj)) {
            var regex = value, pos = option;
            if ($t.isNull(regex)) {
                return -1;
            }
            pos = pos || 0;
            var index = obj.substring(pos).search(regex);
            return (index >= 0) ? (index + pos) : index;
        }
    } catch (e) {
        error(getFuncName(obj.constructor) + ".indexOfAlt", e);
    }
}
function merge (obj, secondary, condition) {
    try {
        condition = condition || {};
        var recurse = condition == "recurse" || condition.recurse,
            shared = condition == "onlyShared" || condition.onlyShared,
            intersect = condition == "intersect" || condition.intersect,
            objtmp = (condition == "clone" || condition.clone) ? duplicate(obj, true) : obj,
            compareFunction = $t.isFunction(condition) ? condition : condition.compareFunction,
            intersectObj = {};

        for (var prop in secondary) {
            if (secondary.hasOwnProperty(prop)) {
                if (intersect && objtmp.hasOwnProperty(prop)) {
                    intersectObj[prop] = secondary[prop];
                } else if (shared) {
                    // passing share Only
                    if (objtmp.hasOwnProperty(prop)) {
                        objtmp[prop] = secondary[prop];
                    }
                } else if (compareFunction && $t.isFunction(compareFunction)) {
                    if ($t.isArray(objtmp) && objtmp.hasOwnProperty(prop) && compareFunction(objtmp[prop], secondary[prop])) {
                        objtmp[prop] = secondary[prop];
                        continue;
                    }
                    objtmp.push(duplicate(secondary[prop]));
                } else {
                    if ($t.isArray(objtmp) && ($t.isNull(condition) || recurse)) {
                        if (!~objtmp.indexOf(secondary[prop])) {
                            objtmp.push(secondary[prop]);
                        }
                    } else if (recurse && ($t.isArray(objtmp[prop]) || $t.isObject(objtmp[prop])) && ($t.isArray(secondary[prop]) || $t.isObject(secondary[prop]))) {
                        objtmp[prop] = merge(objtmp[prop],secondary[prop],condition);
                    } else {
                        objtmp[prop] = secondary[prop];
                    }
                }
            }
        }
        return intersect ? intersectObj : objtmp;
    } catch (e) {
        error('Object.merge', e);
    }
}
function parseRaw(value, skipQuotes, saveCircular, __windowVars, __windowVarNames) {
    /*|{
        "info": "Creates an evaluable string",
        "category": "Global",
        "parameters":[
            {"value": "value to parse"}],

        "overloads":[
            {"parameters":[
                {"value": "(any) Value to parse"},
                {"skipQuotes": "(Bool) Flag to skip quotes for strings"},
                {"saveCircular": "(Bool) Flag to save circular references"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#parseRaw",
        "returnType": "(String)"
    }|*/
    try {
        if ($t.isNull(value)) { return value + ""; }
        var raw = "";
        if ($t.isString(value)) {
            raw = (!skipQuotes ? "\"" + replace_all(value,'"','\\"') + "\"" : value);
        } else if ($t.isArray(value)) {
            var tmp = [];
            for (var i = 0, len = value.length; i < len; i++) {
                tmp[i] = parseRaw(value[i], skipQuotes, saveCircular, __windowVars, __windowVarNames);
            }
            raw = "[" + tmp.join(',') + "]";
        } else if ($t.isDate(value)) {
            return "new Date('" + value.toString() + "')";
        } else if ($t.isRegExp(value)) {
            return value.toString();
        } else if (value instanceof Object && !$t.isFunction(value) && !$t.isGenerator(value) && !$t.isAsync(value)) {
            if (!__windowVars) {
                __windowVars = [];
                __windowVarNames = [];
                if (saveCircular) {
                    for (var prop in $g) {
                        if (!$g.hasOwnProperty(prop)) { continue; }
                        if (value.hasOwnProperty(prop)) {
                            __windowVars.push($g[prop]);
                            __windowVarNames.push(prop);
                        }
                    }
                }
            }
            var index = __windowVars.indexOf(value);
            if (!~index) {
                if (saveCircular) {
                    __windowVars.push(value);
                    __windowVarNames.push(suid());
                }
                raw = "{";
                var sliceit = false;
                for (var prop in value) {
                    if (value.hasOwnProperty(prop)) {
                        sliceit = true;
                        raw += "\"" + prop + "\": " + parseRaw(value[prop], skipQuotes, saveCircular, __windowVars, __windowVarNames) + ",";
                    }
                }
                raw = (sliceit ? raw.slice(0,-1) : raw) + "}";
            } else {
                if (!saveCircular) {
                    raw = "{}";
                } else {
                    raw = "$g['" + __windowVarNames[index ] +"']";
                }
            }
        } else {
            raw = value.toString();
        }
        return raw;
    } catch (e) {
        error('parseRaw', e);
    }
}
function rand(num1, num2, inclusive) {
    /*|{
        "info": "Create a random number between two numbers",
        "category": "Global",
        "parameters":[
            {"num1": "(Number) Lower bound"},
            {"num2": "(Number) Upper bound"}],

        "overloads":[
            {"parameters":[
                {"num1": "(Number) Lower bound"},
                {"num2": "(Number) Upper bound"},
                {"inclusive": "(Bool) Flag to include the given numbers"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#rand",
        "returnType": "(Number)"
    }|*/
    try {
        var val = (num2 - num1) * Math.random() + num1;
        if (inclusive) {
            if(val == Math.max(num1,num2)) {
                val -= 0.1
            } else if (val == Math.min(num1,num2)) {
                val += 0.1
            }
        }
        return val;
    } catch (e) {
        error('rand', e);
    }
}
function replace_all(str, replace, subject, flag) {
    try {
        if (!$t.isArray(replace)){
            replace = [replace];
        }
        if (!$t.isArray(subject)) {
            subject = [subject];
        }
        var last = 0;
        for (var i = 0, len = replace.length; i < len; i++) {
            var rep = replace[i];
            var reg = new RegExp(__convert_regex_safe(rep), flag);
            if (!~str.search(reg)) { continue; }
            str = str.replace(reg, subject[i] === undefined ? subject[last] : subject[i]);
            if (subject[last + 1]) { last++; }
        }
        return str.toString();
    } catch (e) {
        error("replace_all", e);
    }
}
function setProperty (obj, path, value, delimiter, options) {
    try {
        options = options || {};
        delimiter = delimiter || ".";
        path = strip(path, delimiter);
        var props = path.split(delimiter);
        var i = 0, prop, len = props.length, pobj, pprop;
        while (prop = props[i++]) {
            if (i == len) {
                return obj[prop] = value, true;
            }
            if (pobj && pprop && !$t.isArray(pobj[pprop]) && parseInt(prop) >= 0) {
                var tmp = pobj[pprop];
                pobj[pprop] = [];
                for (var p in tmp) {
                    if (tmp.hasOwnProperty(p)) { pobj[p] = tmp[p]; }
                }
                obj = pobj[pprop];
            }
            obj[prop] = obj[prop] || {};
            pobj = obj;
            pprop = prop;
            obj = obj[prop];
        }
        return false;
    } catch (e) {
        error('Object.setProperty', e)
    }
}
function strip (str, character) {
    try {
        return general_trim(str, undefined, character);
    } catch (e) {
        error("_strip", e);
    }
}
function suid(length) {
    /*|{
        "info": "Creates a short Craydent/Global Unique Identifier",
        "category": "Global",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"length": "(Integer) Custom length of the short unique identifier"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#suid",
        "returnType": "(String)"
    }|*/
    try {
        length = length || 10;
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", id = "";
        while (id.length < length) {
            id += chars[parseInt(rand(0,62))];
        }

        return id;
    } catch (e) {
        error('suid', e);
    }
}
function syncroit (gen) {
    /*|{
        "info": "Generator based control flow to allow for more \"syncronous\" programing structure",
        "category": "Global",
        "parameters":[
            {"gen": "(GeneratorFunction) Generator function to execute"}],

        "overloads":[{
            "parameters":[
                {"async": "(AsyncFunction) Async function to execute"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#syncroit",
        "returnType": "(Promise)"
    }|*/
    try {
        if ($t.isAsync(gen)) { return gen(); }
        return new Promise(function(res){
            var geno = gen();
            try {
                $t.isGenerator(gen) && (function cb(value) {
                    var obj = geno.next(value);

                    if (!obj.done) {
                        if ($t.isPromise(obj.value)) {
                            return obj.value.then(cb).catch(cb);
                        }
                        setTimeout(function () {
                            cb(obj.value);
                        }, 0);
                    } else {
                        res($t.isNull(obj.value, value));
                    }
                })();
            } catch(e) {
                if (process.listenerCount('uncaughtException')) {
                    return process.emit('uncaughtException', e);
                }
                throw e;
            }
        });

    } catch (e) {
        error('syncroit', e);
        throw e;
    }
}
function general_trim (str, side, characters) {
    try {
        var temp = str,
            trimChars = {
                " ":1,
                "\t":1,
                "\n":1
            };
        if (characters) {
            if ($t.isArray(characters)) {
                var ch, i = 0;
                trimChars = {};
                while (ch = characters[i++]) {
                    trimChars[ch] = 1;
                }
            } else if ($t.isString(characters)) {
                trimChars = eval('({"'+__convert_regex_safe(characters)+'":1})');
            }
        }
        if (!side || side == 'l') {
            while (temp.charAt(0) in trimChars) {
                temp = temp.substring(1);
            }
        }
        if (!side || side == 'r') {
            while (temp.charAt(temp.length - 1) in trimChars) {
                temp = temp.substring(0, temp.length - 1);
            }
        }
        return temp.toString();
    } catch (e) {
        error("general_trim", e);
    }
}
function tryEval (expression, evaluator) {
    /*|{
        "info": "Evaluates an expression without throwing an error",
        "category": "Global",
        "parameters":[
            {"expression": "(any) Expression to evaluate"}],

        "overloads":[
            {"parameters":[
                {"expression": "(any) Expression to evaluate"},
                {"evaluator": "(Function) Method to use to evaluate the expression"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#tryEval",
        "returnType": "(any)"
    }|*/
    try {
        var value;
        if (evaluator) { value = evaluator(expression); }
        else { value = scope.eval(expression); }
        if (value === undefined && expression != "undefined") {
            throw '';
        }
        return value;
    } catch(e) {
        try {
            return scope.eval("("+expression+")");
        } catch(e) {
            return null;
        }
    }
}

$c.globalize = globalize;

module.exports.$c = $s = $g.$c;

module.exports._duplicate = $c._duplicate = _duplicate;

module.exports.capitalize = $c.capitalize = capitalize;
module.exports.condense = $c.condense = condense;
module.exports.cout = $c.cout = cout;
module.exports.defineFunction = $c.defineFunction = defineFunction;
module.exports.duplicate = $c.duplicate = duplicate;
module.exports.equals = $c.equals = equals;
module.exports.error = $c.error = error;
module.exports.ext = $c.ext = ext;
module.exports.foo = $c.foo = foo;
module.exports.getFuncArgs = $c.getFuncArgs = getFuncArgs;
module.exports.getFuncName = $c.getFuncName = getFuncName;
module.exports.getProperty = $c.getProperty = getProperty;
module.exports.indexOf = $c.indexOf = indexOf;
module.exports.indexOfAlt = $c.indexOfAlt = indexOfAlt;
module.exports.info = $c.info = info;
module.exports.merge = $c.merge = merge;
module.exports.parseRaw = $c.parseRaw = parseRaw;
module.exports.rand = $c.rand = rand;
module.exports.replace_all = $c.replace_all = replace_all;
module.exports.setProperty = $c.setProperty = setProperty;
module.exports.strip = $c.strip = strip;
module.exports.suid = $c.suid = suid;
module.exports.syncroit = $c.syncroit = syncroit;
module.exports.general_trim = $c.general_trim = general_trim;
module.exports.tryEval = $c.tryEval = tryEval;
module.exports.scope = $c.scope = scope;

module.exports.dir = "./dependencies/";
module.exports.fsmethods = fsmethods;
module.exports.globalizables = globalizables;