/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    $c = cm.$c,
    _condense = cm.condense,
    _ext = cm.ext,
    _indexOf = cm.indexOf,
    _indexOfAlt = cm.indexOfAlt,
    _isArray = cm.isArray,
    _isAsync = cm.isAsync,
    _isBoolean = cm.isBoolean,
    _isFunction = cm.isFunction,
    _isGenerator = cm.isGenerator,
    _isNumber = cm.isNumber,
    _isObject = cm.isObject,
    _isString = cm.isString,
    _duplicate = cm.duplicate,
    _equals = cm.equals,
    _merge = cm.merge,
    rand = cm.rand;


function __processStage(docs, stage) {
    try {
        var operator = "", value = {};
        for (var opts in stage) {
            if (!stage.hasOwnProperty(opts)) { continue; }
            if (operator) {
                //noinspection ExceptionCaughtLocallyJS
                throw "Exception: A pipeline stage specification object must contain exactly one field.";
            }
            operator = opts;
            value = stage[opts];
        }
        switch (opts) {
            case "$project":
                return $c.where(docs,{}, value);
            case "$match":
                return $c.where(docs,value);
            case "$redact":
                return _redact(docs, value);
            case "$limit":
                return docs.slice(0, value);
            case "$skip":
                return docs.slice(value);
            case "$unwind":
                return _unwind(docs, value);
            case "$group":
                return __processGroup(docs, value);
            case "$sort":
                var sorter = [];
                for (var prop in value) {
                    if (!value.hasOwnProperty(prop)) { continue; }
                    var pre = "";
                    if (!~value[prop]) { pre = "!"; }
                    sorter.push(pre+prop);
                }
                return $c.sortBy(docs,sorter);
            case "$out":
                var rtnDocs = $c.duplicate(docs,true);
                if ($c.isString(value)) {
                    $g[value] = rtnDocs;
                } else if ($c.isArray(value)) {
                    $c.removeAll(value);
                    rtnDocs = $c.merge(value,rtnDocs);
                }
                return rtnDocs;
            case "$sample":
                var arr = [], i = 0, eindex = docs.length - 1;
                while (i < value.size) {
                    arr.push(docs[Math.round(rand(0,eindex,true))]);
                    i++;
                }
                docs.sample = arr;
                return docs;
            case "$lookup":
                var i = 0, doc, arr = value.from,key = value.localField, fkey = value.foreignField, prop = value.as;
                while(doc = docs[i++]) {
                    var query = {};
                    query[fkey] = doc[key] || {$exists:false};
                    doc[prop] = $c.where(arr,query);
                }
        }
        return docs;
    } catch (e) {
        error('aggregate.__processStage', e);
    }
}
function __universal_trim(chars) {
    /*|{
        "info": "Array class extension to remove all white space/chars from the beginning and end of all string values in the array & String class extension to remove characters from the beginning and end of the string.",
        "category": "Array",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"ref":"(Boolean) Whether or not to mutate the original array."}]},
            {"parameters":[
                {"character": "(Char[]) Character to remove in the String"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#String.trim",
        "returnType": "(Bool)"
    }|*/
    try {
        if (_isArray(this)) {
            var ref = chars,
                arr = [],
                alter = false;
            if (_isBoolean(ref)) { alter = true; }

            for (var i = 0, len = this.length; i < len; i++) {
                var item = this[i];
                _isString(item) && (arr[i] = item.toString().trim()) || (arr[i] = item);
                alter && (this[i] = arr[i]);
            }
            return arr;
        }
    } catch (e) {
        error("Array.trim", e);
        return false;
    }
}

function _binarySearch(sarr, prop, value, sindex, eindex, findIndex){
    sindex = $c.isNull(sindex) ? 0 : sindex;
    eindex = $c.isNull(eindex) ? sarr.length - 1 : eindex;
    if (findIndex) {
        if (!~eindex) { return 0; }
        if (sarr[sindex][prop] > value) { return sindex; }
        if (sarr[eindex][prop] < value) { return eindex; }
    }
    if (sindex == eindex) {
        if (sarr[sindex][prop] != value) { return []; }
        return [sarr[sindex]];
    }

    var index = sindex + parseInt((eindex - sindex) / 2);

    if (sarr[index][prop] > value) {
        return _binarySearch(sarr, prop, value, sindex, index, findIndex);
    }

    if (sarr[index][prop] < value) {
        return _binarySearch(sarr, prop, value, index, eindex, findIndex);
    }
    while (sarr[sindex][prop] < value) { sindex++; }
    while (sarr[eindex][prop] > value) { eindex--; }

    if (findIndex) { return eindex; }

    var len = eindex - sindex + 1;
    if (sindex == 0 && len == sarr.length) { return sarr; }
    return sarr.slice(sindex, eindex + len);
}
function _joinHelper (objs, arr, on, exclusive) {
    var records = [], propRef = [], objRef = arr[0] || {};

    if (_isString(on)) {
        on = on.split('=');
        if (on.length == 1) { on = [on,on]; }
        var name = $c.getName(arguments.callee.caller);
        on = __universal_trim(on);
        name == "joinRight" && (on = [on[1],on[0]]);
    }

    for (var prop in objRef) {
        if (objRef.hasOwnProperty(prop)) {
            propRef.push(prop);
        }
    }
    for (var i = 0, len = objs.length; i < len; i++)  {
        var record = _duplicate(objs[i],true), query = {},results;
        query[on[1]] = record[on[0]];
        results = $c.where(arr,query);
        if (results.length > 0)  {
            records.push(_merge(record, results[0]));
        } else if (!exclusive)  {
            for (var j = 0, jlen = propRef.length; j < jlen; j++) {
                record[propRef[j]] = record[propRef[j]] || null;
            }
            records.push(record);
        }
    }
    return records;
}

_ext(Array, 'aggregate', function (pipelines) {
    /*|{
        "info": "Array class extension to perform mongo style aggregation",
        "category": "Array",
        "featured": true,
        "parameters":[
                {"pipelines": "(Object[]) Array of stages defined in mongodb"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.aggregate",
        "returnType": "(Array)"
    }|*/
    try {
        var rtn = this, pipeline, i = 0, hasGroup = false;
        while (pipeline = pipelines[i++]){
            if (pipeline["$group"]) { hasGroup = true; }
            rtn = __processStage(rtn, pipeline);
        }
        return rtn.sample && !hasGroup ? rtn.sample : rtn;
    } catch (e) {
        error("Array.aggregate", e);
    }
}, true);
_ext(Array, 'average', function () {
    /*|{
        "info": "Array class extension to perform average of all the values (any value which is not a number is 0).",
        "category": "Array",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.aggregate",
        "returnType": "(Array)"
    }|*/
    try {
        var length = 0, sum = 0;
        for (var i = 0, len = this.length; i < len; i++) {
            if (_isNumber(this[i])) {
                sum += this[i];
                length++;
            }
        }
        return sum/length;
    } catch (e) {
        error("Array.average", e);
    }
}, true);
_ext(Array, 'buildTree', function (parentFinder,childFinder,options) {
    /*|{
        "info": "Array class extension to create a parent/child hierarchy",
        "category": "Array",
        "parameters":[
            {"parentFinder": "(Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument."},
            {"childFinder": "(String) Property name of the object to use as a grouping."}],

        "overloads":[
            {"parameters":[
                {"parentFinder": "(Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument."},
                {"childFinder": "(Function) Function to determine the grouping."}]},

            {"parameters":[
                {"parentFinder": "(Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument."},
                {"childFinder": "(String) Property name of the object to use as a grouping."},
                {"options":"(Object) Options to customize properties,  Valid property is:<br />childProperty"}]},

            {"parameters":[
                {"parentFinder": "(Function) Function to determine the parent.   Should return a boolean value and is passed the current item as an argument."},
                {"childFinder": "(String) Property name of the object to use as a grouping."},
                {"options":"(Object) Options to customize properties,  Valid property is:<br />childProperty"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.buildTree",
        "returnType": "(Array)"
    }|*/
    try {
        options = options || {};
        var rtnArr = [];
        var i = 0,objt,cats=[],catDict={},tmp={}, singles = {};
        var cprop = options.childProperty || "children";
        while(objt=this[i++]){
            var cat = _isFunction(childFinder) ? childFinder(objt) : objt[childFinder],
                rootFound = ~cats.indexOf(cat);

            objt[cprop] = objt[cprop] || [];
            if (parentFinder(objt)) {
                delete singles[cat];

                if (!rootFound && tmp[cat]) {
                    objt[cprop] = tmp[cat];
                }
                tmp[cat] = objt[cprop];

                cats.push(cat);
                catDict[cat] = objt;
                rtnArr.push(objt);
                continue;
            }

            // root not found yet
            if (!rootFound) {
                singles[cat] = singles[cat] || [];
                singles[cat].push(objt);
                tmp[cat] = tmp[cat] || [];
                tmp[cat].push(objt);
            } else {
                catDict[cat][cprop].push(objt);
            }
        }
        for (var prop in singles) {
            if (!singles.hasOwnProperty(prop)) { continue; }
            var j = 0, single;
            while (single = singles[prop][j++]) {
                single[cprop] = [];
            }
            rtnArr = rtnArr.concat(singles[prop]);
        }
        return rtnArr;
    } catch (e) {
        error('Array.buildTree', e);
    }
});
_ext(Array, 'condense', function (check_values) {
    /*|{
        "info": "Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls",
        "category": "Array",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"check_values": "(Bool) Flag to remove duplicates"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
        "returnType": "(Array)"
    }|*/
    return _condense(this, check_values);
}, true);
_ext(Array, 'createIndex', function (indexes) {
        /*|{
         "info": "Array class extension to create indexes for faster searches during where",
         "category": "Array",
         "parameters":[
         {"properties": "(String) Property or comma delimited property list to index."}],

         "overloads":[
         {"parameters":[
         {"indexes": "(String[]) Array of properties to index"}]}],

         "url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
         "returnType": "(Array)"
         }|*/
    try {
        if (!indexes || !indexes.length) { return false; }
        if (!_isArray(indexes)) { indexes = indexes.split(','); }
        this.__indexes = {};

        for (var i = 0, len = indexes.length; i < len; i++) {
            var prop = indexes[i], arr = [];

            for (var j = 0, jlen = this.length; j < jlen; j++) {
                var index = _binarySearch(arr, prop, this[j][prop], null, null, true);
                $c.insertAt(arr,index,this[j]);

            }
            this.__indexes[prop] = arr;
        }
    } catch(e) {
        error("Array.createIndex", e);
        return false;
    }
});
_ext(Array, 'delete', function(condition, justOne) {
    /*|{
        "info": "Array class extension to delete records",
        "category": "Array",
        "parameters":[
            {"condition": "(Mixed) Query following find/where clause syntax"}],

        "overloads":[
            {"parameters":[
                {"condition": "(Mixed) Query following find/where clause syntax"},
                {"justOne": "(Boolean) Flag for deleting just one records [Default is: true]"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.delete",
        "returnType": "(Array)"
    }|*/
    try {
        var thiz = this, _qnp = __queryNestedProperty,
            _clt = _contains_lessthan,
            _clte = _contains_lessthanequal,
            _cgt = _contains_greaterthan,
            _cgte = _contains_greaterthanequal,
            _ct = _contains_type, _cm = _contains_mod;
        justOne = parseBoolean($c.isNull(justOne) ? true : $c.isNull(justOne.justOne, justOne));
        // if no condition was given, remove all
        if (!condition) { return this.splice(0,justOne ? 1 : this.length); }

        var arr = [], indexes = [], cb = function (obj, i) {
            if (justOne) {
                arr = arr.concat(this.splice(i,1));
                return false
            }
            indexes.push(i);
            return true;
        };

        var _refs = [], ifblock = _subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
            "	var values,finished;" +
            "	if ("+ifblock+") {" +
            "		if(!cb.call(thiz,record,i)) { throw 'keep going'; }" +
            "	}" +
            "})";
        if (_refs.length) {
            var varStrings = "";
            for (var i = 0, len = _refs.length; i < len; i++) {
                varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
            }
            eval(varStrings);
        }
        try {
            this.filter(eval(func));
        } catch(e) {
            if (e != 'keep going') { throw e;}
        }

        for (var i = indexes.length - 1; i >= 0; i--) {
            arr = this.splice(indexes[i],1).concat(arr);
        }

        return arr;
    } catch (e) {
        error("Array.delete", e);
        return false;
    }
}, true);
_ext(Array, 'distinct', function(fields, condition) {
    /*|{
        "info": "Array class extension to get all unique records by fields specified",
        "category": "Array",
        "parameters":[
            {"fields": "(String) Fields to use as the projection and unique comparison (comma delimited)"}],

        "overloads":[
            {"parameters":[
                {"fields": "(Array) Fields to use as the projection and unique comparison"}]},

            {"parameters":[
                {"fields": "(String) Fields to use as the projection and unique comparison (comma delimited)"},
                {"condition": "(String) Query following SQL where clause syntax"}]},

            {"parameters":[
                {"fields": "(Array) Fields to use as the projection and unique comparison (comma delimited)"},
                {"condition": "(String) Query following SQL where clause syntax"}]},

            {"parameters":[
                {"fields": "(String) Fields to use as the projection and unique comparison (comma delimited)"},
                {"condition": "(Object) Query following MongoDB find clause syntax"}]},

            {"parameters":[
                {"fields": "(Array) Fields to use as the projection and unique comparison (comma delimited)"},
                {"condition": "(Object) Query following MongoDB find clause syntax"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.distinct",
        "returnType": "(Array)"
    }|*/
    try {
        if (_isString(fields)) { fields = fields.split(","); }

        var records = $c.group(this,{field:fields,cond:condition},true);
        if (fields.length == 1) {
            var arr = [];
            for (var i = 0, len = records.length; i < len; i++ ) {
                arr.push(records[i][fields[0]]);
            }
            return arr;
        }
        return records;
    } catch (e) {
        error("Array.distinct", e);
        return false;
    }
});
_ext(Array, 'every', function(callback, thisObject) {
    /*|{
        "info": "Array class extension to implement .every method",
        "category": "Array",
        "parameters":[
            {"callback": "(Function) Callback to test for each element"}],

        "overloads":[
            {"parameters":[
                {"callback": "(Function) Callback to test for each element"},
                {"thisObject": "(Object) Context for the callback function"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.every",
        "returnType": "(Bool)"
    }|*/
    try {
        var thisObject = thisObject || this;
        for (var i = 0, len = this.length; i < len; i++) {
            var thiz = this[i];
            if (thiz && !callback.call(thisObject, thiz, i, this)) { return false; }
        }
        return true;
    } catch (e) {
        error("Array.every", e);
    }
}, true);
_ext(Array, 'filter', function(func /*, thiss*/) {
    /*|{
        "info": "Array class extension to implement filter",
        "category": "Array",
        "parameters":[
            {"func": "(Function) Callback function used to determine if value should be returned"}],

        "overloads":[
            {"parameters":[
                {"func": "(Function) Callback function used to determine if value should be returned"},
                {"thiss": "(Mixed) Specify the context on callback function"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.filter",
        "returnType": "(Array)"
    }|*/
    try {
        if (!_isFunction(func)) {
            throw new TypeError();
        }
        var filtered = [],
            thiss = arguments[1] || this;
        for (var i = 0; i < this.length; i++) {
            var val = this[i];
            if (func.call(thiss, val, i, this)) {
                filtered.push(val);
            }
        }

        return filtered;
    } catch (e) {
        error('Array.filter', e);
        return false;
    }
}, true);
_ext(Array, 'find', function(condition, projection) {
        /*|{
         "info": "Array class extension to use mongo or sql queries (Alias of Where minus the limit argument)",
         "category": "Array",
         "featured": true,
         "parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"}],

         "overloads":[
         {"parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"projection": "(Mixed) Indicate which properties to return"}]},

         {"parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

         "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
         "returnType": "(Array)"
         }|*/
    return $c.where(this,condition, projection);
});
_ext(Array, 'findOne', function(condition, projection) {
        /*|{
         "info": "Array class extension to use mongo or sql queries returning the first item match",
         "category": "Array",
         "featured": true,
         "parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"}],

         "overloads":[
         {"parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"projection": "(Mixed) Indicate which properties to return"}]},

         {"parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

         "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
         "returnType": "(Object)"
         }|*/
    return $c.where(this,condition, projection, 1)[0];
});
_ext(Array, 'group', function(params, removeProps) {
        /*|{
         "info": "Array class extension to group records by fields",
         "category": "Array",
         "parameters":[
         {"params": "(Object) specs with common properties:<br />(Object) key<br />(Mixed) cond<br />(Function) reduce<br />(Object) initial"}],

         "overloads":[],

         "url": "http://www.craydent.com/library/1.9.3/docs#array.group",
         "returnType": "(Array)"
         }|*/

        /*    parameters:[
         *        {fields: "(Mixed) Fields to use as the projection and to group by"}],
         *
         *    overloads:[
         *        {parameters:[
         *            {fields: "(Mixed) Fields to use as the projection and to group by"},
         *            {condition: "(Mixed) Query following find/where clause syntax"}]},
         *        {parameters:[
         *            {fields: "(Mixed) Fields to use as the projection and to group by"},
         *            {condition: "(Mixed) Query following find/where clause syntax"},
         *            {reduce: "(Function) Method that operates on the records during the grouping operation"}]},
         *        {parameters:[
         *            {fields: "(Mixed) Fields to use as the projection and to group by"},
         *            {condition: "(Mixed) Query following find/where clause syntax"},
         *            {reduce: ""},
         *            {initial: ""}]}],*/
    try {
        var key = params.field || params.key,
            condition = params.cond || {},
            reduce = params.reduce || foo,
            initial = params.initial || {},
            keyf = params.keyf,
            finalize = params.finalize || function(o) { return o;};

        if ($c.isString(key)) { key = key.split(','); }
        if ($c.isArray(key)) {
            var tmp = {};
            for (var i = 0, len = key.length; i < len; i++) {
                tmp[key[i]] = 1;
            }
            key = tmp;
        }

        var props = $c.getKeys(initial),
            fields = $c.getKeys(key),
            arr = [], result = {}, id = suid(),
            cb = function (ob, i) {
                // _groupFieldHelper creates a grouping string based on the field value pairs
                if (!fields && keyf) {
                    fields = $c.isFunction(keyf) ? keyf(doc) : keyf;
                }
                var prop = _groupFieldHelper(ob, fields), addit = false;
                if (!result[prop]) {
                    addit = true;
                    var tmp = $c.duplicate(initial);
                    result[prop] = tmp;
                }
                var curr = $c.duplicate(ob), item;
                reduce(curr, result[prop]);
                item = _copyWithProjection(fields, ob, !removeProps);
                item[id] = prop;
                addit && arr.push(item);
                return true;
            };



        var thiz = this, _qnp = __queryNestedProperty,
            _clt = _contains_lessthan,
            _clte = _contains_lessthanequal,
            _cgt = _contains_greaterthan,
            _cgte = _contains_greaterthanequal,
            _ct = _contains_type, _cm = _contains_mod, _refs = [], ifblock = _subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
                "	var values,finished;" +
                "	if ("+ifblock+") {" +
                "		if(!cb.call(thiz,record,i)) { throw 'keep going'; }" +
                "	}" +
                "})";
        if (_refs.length) {
            var varStrings = "";
            for (var i = 0, len = _refs.length; i < len; i++) {
                varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
            }
            eval(varStrings);
        }
        try {
            var rarr = this.filter(eval(func));
        } catch(e) {
            if (e != 'keep going') { throw e;}
        }

        var keyObj = $c.duplicate(initial);
        for (var prop in key) {
            if (!key.hasOwnProperty(prop)) { continue; }
            $c.setProperty(keyObj,prop,key[prop]);
        }
        for (var i = 0, len = arr.length; i < len; i++) {
            var merge1 = $c.merge(arr[i],result[arr[i][id]]);
            arr[i] = $c.merge(keyObj,finalize(merge1) || merge1,{clone:true,intersect:true});
        }
        return arr;
    } catch (e) {
        error("Array.group", e);
        return false;
    }
});
_ext(Array, 'indexOf', function(value) {
    /*|{
        "info": "Array class extension to implement indexOf",
        "category": "Array",
        "parameters":[
            {"value": "(Mixed) value to find"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOf",
        "returnType": "(Int)"
    }|*/
    return _indexOf(this, value);
}, true);
_ext(Array, 'indexOfAlt', _indexOfAlt, true);
_ext(Array, "innerJoin", function (arr, on) {
    /*|{
        "info": "Array class extension to do an inner join on arrays",
        "category": "Array",
        "parameters":[
            {"arr": "(Array) Array to be joined with"},
            {"on": "(String) Condition to join on"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.innerJoin",
        "returnType": "(Array)"
    }|*/
    try {
        return _joinHelper(this, arr, on, true);
    } catch (e) {
        error('Array.innerJoin', e);
    }
});
_ext(Array, 'insert', function(value) {
    /*|{
        "info": "Array class extension to add to the array",
        "category": "Array",
        "parameters":[
            {"value": "(Mixed) value to add"}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.insert",
        "returnType": "(Bool)"
    }|*/
    try {
        if (_isArray(value)) {
            for (var i = 0, len = value.length; i < len; i++) {
                this.push(value[i]);
            }
        } else {
            this.push(value);
        }
        return true;
    } catch (e) {
        error("Array.insert", e);
        return false;
    }
}, true);
_ext(Array, 'insertAfter', function(index, value) {
    /*|{
        "info": "Array class extension to add to the array after a specific index",
         "category": "Array",
         "parameters":[
             {"index": "(Int) Index to add after"},
             {"value": "(Mixed) Value to add"}],

         "overloads":[],

         "url": "http://www.craydent.com/library/1.9.3/docs#array.insertAfter",
         "returnType": "(Bool)"
    }|*/
    try {
        this.splice(index + 1, 0, value);
        return true;
    } catch (e) {
        error("Array.insertAfter", e);
        return false;
    }
}, true);
_ext(Array, 'insertAt', function(index, value) {
    /*|{
        "info": "Array class extension to add to the array at a specific index and push the all indexes down",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index to add after"},
            {"value": "(Mixed) Value to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.insertAt",
        "returnType": "(Bool)"
    }|*/
    try {
        this.splice(index, 0, value);
        return true;
    } catch (e) {
        error("Array.insertAt", e);
        return false;
    }
}, true);
_ext(Array, 'insertBefore', function(index, value) {
    /*|{
        "info": "Array class extension to add to the array before a specific index",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index to add before"},
            {"value": "(Mixed) Value to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.insertBefore",
        "returnType": "(Bool)"
    }|*/
    try {
        this.splice(index, 0, value);
        return true;
    } catch (e) {
        error("Array.insertBefore", e);
        return false;
    }
}, true);
_ext(Array, "joinLeft", function (arr, on) {
    /*|{
        "info": "Array class extension to do an outer left join on arrays",
        "category": "Array",
        "parameters":[
            {"arr": "(Array) Secondary array to be joined with"},
            {"on": "(String) Condition to join on"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.joinLeft",
        "returnType": "(Array)"
    }|*/
    try {
        return _joinHelper(this, arr, on);
    } catch (e) {
        error('Array.joinLeft', e);
    }
});
_ext(Array, "joinRight", function (arr, on) {
    /*|{
        "info": "Array class extension to do an outer right join on arrays",
        "category": "Array",
        "parameters":[
            {"arr": "(Array) Secondary array to be joined with"},
            {"on": "(String) Condition to join on"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.joinRight",
        "returnType": "(Array)"
    }|*/
    try {
        return _joinHelper(arr, this, on);
    } catch (e) {
        error('Array.joinRight', e);
    }
});
_ext(Array, "last", function () {
    /*|{
        "info": "Array class extension to retrieve the last item in the array.",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.last",
        "returnType": "(Array)"
    }|*/
    try {
        return this[this.length - 1];
    } catch (e) {
        error('Array.last', e);
    }
}, true);
_ext(Array, 'limit', function(max, skip) {
    /*|{
        "info": "Array class extension to return a limited amount of items",
        "category": "Array",
        "parameters":[
            {"max": "(Int) Maximum number of items to return"}],

        "overloads":[
            {"parameters":[
                {"max": "(Int) Maximum number of items to return"},
                {"skip": "(Int) Number of items to skip"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.limit",
        "returnType": "(Array)"
    }|*/
    try {
        skip = skip || 0;
        return this.slice(skip,max);
    } catch (e) {
        error("Array.limit", e);
    }
}, true);
_ext(Array, 'map', function(callback /*, thisObject*/) {
    /*|{
        "info": "Array class extension to implement map",
        "category": "Array",
        "parameters":[
            {"callback": "(Function) Callback function used to apply changes"}],

        "overloads":[
            {"parameters":[
                {"callback": "(Function) Callback function used to apply changes"},
                {"thisObject": "(Mixed) Specify the context on callback function"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.map",
        "returnType": "(Array)"
    }|*/
    try {
        var thisObject = arguments[1] || this,
            other= new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++) {
            if (i in this) {
                other[i] = callback.call(thisObject, this[i], i, this);
            }
        }
        return other;
    } catch (e) {
        error("Array.map", e);
    }
}, true);
_ext(Array, 'mapReduce', function(map, reduce, options) {
    /*|{
        "info": "Array class extension to run map-reduce aggregation over records",
        "category": "Array",
        "parameters":[
            {"map": "(Function) Function to apply to each item"},
            {"reduce": "(Function) Function used to condense the items"}],

        "overloads":[
            {"parameters":[
                {"map": "(Function) Function to apply to each item"},
                {"reduce": "(Function) Function used to condense the items"},
                {"options": "(Object) Options specified in the Mongo Doc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.mapReduce",
        "returnType": "(Array)"
    }|*/
    try {
        options = options || {};
        var obj = {}, results = $c.where(this,options.query,null,options.limit), rtnArr = [], final = options.finalize;
        if (options.sort) {
            if (_isObject(options.sort)) {
                var sortProps = [];
                for (var prop in options.sort) {
                    if (!options.sort.hasOwnProperty(prop)) { continue; }
                    if (options.sort[prop] == 1) { sortProps.push(prop); }
                    if (!~options.sort[prop]) { sortProps.push("!"+prop); }
                }
                results = $c.sortBy(results,sortProps);
            } else {
                results = $c.sortBy(results,options.sort);
            }
        }
        $c.on(map,'emit',function(key,value){
            obj[key] = obj[key] || [];
            obj[key].push(value);
        });
        for (var i = 0, len = results.length; i < len; i++) { map.call(results[i]) }
        for (var key in obj) {
            if (!obj.hasOwnProperty(key)) { continue; }
            var reducedValue = reduce(key,obj[key]);
            if (_isFunction(final)) { reducedValue = final(key,reducedValue); }
            rtnArr.push({_id:key, value: reducedValue});
        }

        if (_isString(options.out)) {
            $g[options.out] = _duplicate(rtnArr,true);
        } else if (_isArray(options.out)) {
            $c.removeAll(options.out);
            return _merge(options.out,rtnArr);
        }
        return rtnArr;
    } catch (e) {
        error("Array.mapReduce", e);
        return false;
    }
});
_ext(Array, 'normalize', function () {
    /*|{
        "info": "Array class extension to normalize all properties in the object array",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.normalize",
        "returnType": "(Array)"
    }|*/
    try {
        var allProps = {}, arrObj = [], len = this.length;
        for(var i = 0; i < len; i++) {
            var json = this[i];
            if (!_isObject(json)) {
                error("normalize", {description:'index: ' + i + ' (skipped) is not an object'});
                continue;
            }
            for(var prop in json) {
                if (json.hasOwnProperty(prop)) {
                    allProps[prop] = 1;
                }
            }
        }
        for(i = 0; i < len; i++) {
            for (var prop in allProps) {
                if (!allProps.hasOwnProperty(prop)) { continue; }
                this[i][prop] = this[i][prop] || null;
            }
            arrObj.push(this[i]);
        }
        return arrObj;
    } catch(e) {
        error("Array.normalize", e);
    }
}, true);
_ext(Array, 'parallelEach', function (gen, args) {
    /*|{
        "info": "Array class extension to execute each array item in parallel or run each item against a generator/function in parallel",
        "category": "Array",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"gen": "(Generator) Generator function to apply to each item"}]},

            {"parameters":[
                {"func": "(Function) Function to apply to each item"}]},

            {"parameters":[
                {"args": "(Array) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, or functions)"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.parallelEach",
        "returnType": "(Promise)"
    }|*/
    try {
        var self = this, arr = this;
        if (_isArray(gen)) {
            args = gen;
            gen = undefined;
        }
        if (!_isArray(args)) {
            args = [];
        }
        var len = arr.length, results = Array(len), completed = 0;
        if (!len) { return new Promise(function (res) { res(results); }); }
        if (gen) {
            var isgen = _isGenerator(gen), isfunc = _isFunction(gen), isasync = _isAsync(gen);
            return new Promise(function (res, rej) {
                for (var i = 0; i < len; i++) {
                    if (isgen) {
                        eval('$c.syncroit(function*(){ results[' + i + '] = yield* gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } });');
                    } else if (isasync) {
                        eval('(async function (){ results[' + i + '] = await gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } })();');
                    } else if (isfunc) {
                        results[i] = gen.call(self,arr[i],i);
                        if (++completed == len) { res(results); }
                    }
                }
            });
        }
        return new Promise(function (res, rej) {
            for (var i = 0; i < len; i++) {
                if ($c.isGenerator(arr[i])) {
                    eval('$c.syncroit(function*(){ results[' + i + '] = yield* arr[' + i + '].apply(self,args); if (++completed == len) { res(results); } });');
                } else if ($c.isAsync(arr[i])) {
                    eval('(async function () { results[' + i + '] = await arr[' + i + ']; if (++completed == len) { res(results); } })();');
                } else if ($c.isPromise(arr[i])) {
                    eval('$c.syncroit(function*(){ results[' + i + '] = yield arr[' + i + ']; if (++completed == len) { res(results); } });');
                } else if ($c.isFunction(arr[i])) {
                    eval('setTimeout(function(){ results[' + i + '] = arr[' + i + '].apply(self,args);if (++completed == len) { res(results); } },0);');
                } else {
                    results[i] = arr[i];
                    if (++completed == len) { res(results); }
                }
            }
        });
    } catch(e) {
        error("Array.parallelEach", e);
    }
}, true);
_ext(Array, 'remove', function (value, indexOf) {
    /*|{
        "info": "Array class extension to remove an item by value",
        "category": "Array",
        "parameters":[
            {"value": "(Mixed) Value to remove"}],

        "overloads":[
            {"parameters":[
                {"value": "(Mixed) Value to remove"},
                {"indexOf": "(Function) Callback function to use to find the item based on the value"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.remove",
        "returnType": "(Mixed)"
    }|*/
    try {
        indexOf = indexOf || this.indexOf;
        var index = indexOf.call(this, value);
        if(!~index) { return false; }
        return this.splice(index, 1)[0];
    } catch (e) {
        error("Array.remove", e);
    }
}, true);
_ext(Array, 'removeAll', function (value, indexOf) {
    /*|{
        "info": "Array class extension to remove all items by value",
        "category": "Array",
        "parameters":[
            {"value": "(Mixed) Value to remove"}],

        "overloads":[
            {"parameters":[
                {"value": "(Mixed) Value to remove"},
                {"indexOf": "(Function) Callback function to use to find the item based on the value"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAll",
        "returnType": "(Array)"
    }|*/
    try {
        if (value) {
            indexOf = indexOf || this.indexOf;
            var  removed = [], index = indexOf.call(this, value);
            if (!~index) { return false; }
            while (~index && $c.isInt(index)) {
                removed.push($c.remove(this,value, indexOf));
                index = indexOf.call(this, value);
            }
            return removed;
        }
        return this.splice(0,this.length);

    } catch (e) {
        error("Array.removeAll", e);
    }
}, true);
_ext(Array, 'removeAt', function (index) {
    /*|{
        "info": "Array class extension to remove item at a specific index",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index of the item to remove"}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAt",
        "returnType": "(Mixed)"
    }|*/
    try {
        if(this[index] === undefined) { return false; }
        return this.splice(index, 1)[0];
    } catch (e) {
        error("Array.removeAt", e);
    }
}, true);
_ext(Array, 'replaceAt', function(index, value) {
    /*|{
        "info": "Array class extension to replace item at a specific index",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index of the item to remove"},
            {"value": "(Mixed) Value to replace with"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.replaceAt",
        "returnType": "(Array)"
    }|*/
    try {
        return this.splice(index, 1, value)[0];
    } catch (e) {
        error("Array.replaceAt", e);
    }
}, true);
_ext(Array, 'scramble', function() {
    /*|{
        "info": "Array class extension to scramble the order.",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.scramble",
        "returnType": "(Array)"
    }|*/
    try {
        var min = 0, max = this.length;
        return this.sort(function(){ return Math.round(rand(min,max,true)); });
    } catch (e) {
        error("Array.scramble", e);
    }
}, true);
_ext(Array, 'sortBy', function(props, rev, primer, lookup, options){
    /*|{
        "info": "Array class extension to sort the array",
        "category": "Array",
        "parameters":[
            {"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"}],

        "overloads":[
            {"parameters":[
                {"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"}]},

            {"parameters":[
                {"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Boolean) Flag to reverse the sort"}]},

            {"parameters":[
                {"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Boolean) Flag to reverse the sort"}]},

            {"parameters":[
                {"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Boolean) Flag to reverse the sort"},
                {"primer": "(Function) Function to apply to values in the array."}]},

            {"parameters":[
                {"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Boolean) Flag to reverse the sort"},
                {"primer": "(Function) Function to apply to values in the array."}]},

            {"parameters":[
                {"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Boolean) Flag to reverse the sort"},
                {"primer": "(Function) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."}]},

            {"parameters":[
                {"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Boolean) Flag to reverse the sort"},
                {"primer": "(Function) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."}]},

            {"parameters":[
                {"props": "(String) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Boolean) Flag to reverse the sort"},
                {"primer": "(Function) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."},
                {"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]},

            {"parameters":[
                {"props": "(Array) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Boolean) Flag to reverse the sort"},
                {"primer": "(Function) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."},
                {"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.sortBy",
        "returnType": "(Array)"
    }|*/
    try {
        options = (_isString(options) && options in {"i":1,"ignoreCase":1}) ? {i:1} : {};
        primer = primer || function(x){return x;};
        if(_isString(props)){ props = props.split(','); }
        var key = function (x) { return primer(x[prop]); };
        var tmpVal;
        var prop_sort = function (a,b,p) {
            p = p||0;
            var prop = props[p],
                reverseProp = false;

            if(!prop){return -1;}
            if(prop[0] == "!"){
                prop = prop.replace('!','');
                reverseProp = true;
            }
            var aVal = primer.call(a, (lookup && lookup[a][prop]) || a[prop], prop),
                bVal = primer.call(b, (lookup && lookup[b][prop]) || b[prop], prop);

            if (options.i && aVal && bVal) {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            tmpVal = aVal;
            aVal = ((aVal = parseInt(aVal)) && aVal.toString() == tmpVal && parseInt(tmpVal)) || tmpVal;
            tmpVal = bVal;
            bVal = ((bVal = parseInt(bVal)) && bVal.toString() == tmpVal && parseInt(tmpVal)) || tmpVal;



            if (aVal == bVal) {return prop_sort(a,b,p+1);}
            if (isNull(aVal)) {return 1;}
            if (isNull(bVal)) {return -1;}
            if(!reverseProp) {
                if (aVal > bVal) {return 1;}
                return -1;
            }
            if (aVal < bVal) {return 1;}
            return -1;
        };
        this.sort(prop_sort);
        if (rev) {
            this.reverse();
        }

        return this;
    } catch (e) {
        error('Array.sortBy', e);
    }
}, true);
_ext(Array, 'stdev', function (con) {
    /*|{
        "info": "Array class extension to perform standard deviation (any value which is not a number is 0).",
        "category": "Array",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.stdev",
        "returnType": "(Array)"
    }|*/
    try {
        if (!this.length) { return 0; }
        var avg = $c.average(this),
            sum = null, sdlen = 0;
        for (var i = 0, len = this.length; i < len; i++) {
            if (!_isNumber(this[i])) { continue; }
            sdlen++;
            sum = sum || 0;
            var diff = this[i] - avg;
            sum += diff * diff;
        }
        return Math.sqrt(sum/sdlen);
    } catch (e) {
        error("Array.stdev", e);
    }
}, true);
_ext(Array, 'sum', function () {
    /*|{
        "info": "Array class extension to perform summation of all the values (any value which is not a number is 0).",
        "category": "Array",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.sum",
        "returnType": "(Array)"
    }|*/
    try {
        var value = 0;
        for (var i = 0, len = this.length; i < len; i++) {
            value += _isNumber(this[i]) ? this[i] : 0;
        }
        return value;
    } catch (e) {
        error("Array.sum", e);
    }
}, true);
_ext(Array, 'toSet', function() {
    /*|{
        "info": "Array class extension to convert the array to a set",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.toSet",
        "returnType": "(Array)"
    }|*/
    try {
        for (var i = 0, len = this.length; i < len; i++) {
            var item = this[i];
            for (var j = i + 1; j < len; j++) {
                var citem = this[j];
                if (_equals(item,citem)) {
                    $c.removeAt(this,j--);
                    len--;
                }
            }
        }
    } catch (e) {
        error("Array.toSet", e);
        return false;
    }
}, true);
_ext(Array, 'trim', __universal_trim, true);
_ext(Array, 'update', function(condition, setClause, options) {
        /*|{
         "info": "Array class extension to update records in the array",
         "category": "Array",
         "parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"setClause": "(Mixed) Set clause used to update the records"}],

         "overloads":[
         {"parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"setClause": "(Mixed) Set clause used to update the records"},
         {"options": "(Object) Options to specify if mulit update and/or upsert"}]}],

         "url": "http://www.craydent.com/library/1.9.3/docs#array.update",
         "returnType": "(Array)"
         }|*/
    try {
        options = options || {};
        // if sql syntax convert to mongo object syntax
        if ($c.isString(condition)) {
            condition = _processClause(condition);
        }
        var setObject = $c.isObject(setClause) ? setClause : {'$set':null};
        if ($c.isString(setClause)) {
            setClause = setClause.split(',');
            setObject['$set'] = {};
            for (var i = 0, len = setClause.length; i < len; i++) {
                var keyVal = setClause[i].split("=");
                setObject['$set'][_trim(keyVal[0])] = _trim(keyVal[0]);
            }
        }
        var found = false, plainObject = true, operations = {"$set":1,"$unset":1,"$currentDate":1,"$inc":1,"$max":1,"$min":1,"$mul":1,"$bit":1,"$rename":1
            ,"$":1,"$addToSet":1,"$pop":1,"$pullAll":1,"$pull":1,"$pushAll":1,"$push":1};
        for (var prop in setObject) {
            if (operations[prop]) {
                plainObject = false;
                break;
            }
        }

        var thiz = this, _qnp = __queryNestedProperty,
            _clt = _contains_lessthan,
            _clte = _contains_lessthanequal,
            _cgt = _contains_greaterthan,
            _cgte = _contains_greaterthanequal,
            _ct = _contains_type, _cm = _contains_mod, _refs= [], ifblock = _subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
                "	var values,finished;" +
                "	if ("+ifblock+") {" +
                "		if(!cb.call(thiz,record,i)) { throw 'keep going'; }" +
                "	}" +
                "})", cb = function (obj, i) {
                found  = true;
                if (plainObject) {
                    this.splice(i,1,setObject);
                }
                if (setObject['$set']) {
                    for (var prop in setObject['$set']) {
                        setObject['$set'].hasOwnProperty(prop) && $c.setProperty(obj, prop, setObject['$set'][prop]);
                    }
                }
                if (setObject['$unset']) {
                    for (var prop in setObject['$unset']) {
                        setObject['$unset'].hasOwnProperty(prop) && delete obj[prop];
                    }
                }
                if (setObject['$currentDate']) {
                    for (var prop in setObject['$currentDate']) {
                        setObject['$currentDate'].hasOwnProperty(prop) && (obj[prop] = new Date());
                    }
                }
                if (setObject['$inc']) {
                    for (var prop in setObject['$inc']) {
                        setObject['$inc'].hasOwnProperty(prop) && (obj[prop] += setObject['$inc'][prop]);
                    }
                }
                if (setObject['$max']) {
                    for (var prop in setObject['$max']) {
                        if (!setObject['$max'].hasOwnProperty(prop)) { continue; }
                        obj[prop] = $c.isNull(obj[prop], setObject['$max'][prop]);
                        var value = obj[prop];
                        value < setObject['$max'][prop] && (obj[prop] = setObject['$max'][prop]);
                    }
                }
                if (setObject['$min']) {
                    for (var prop in setObject['$min']) {
                        if (!setObject['$min'].hasOwnProperty(prop)) { continue; }
                        obj[prop] = $c.isNull(obj[prop], setObject['$min'][prop]);
                        var value = obj[prop];
                        value > setObject['$min'][prop] && (obj[prop] = setObject['$min'][prop]);
                    }
                }
                if (setObject['$mul']) {
                    for (var prop in setObject['$mul']) {
                        setObject['$mul'].hasOwnProperty(prop) && (obj[prop] *= setObject['$mul'][prop]);
                    }
                }
                if (setObject['$bit']) {
                    for (var prop in setObject['$bit']) {
                        if (!setObject['$bit'].hasOwnProperty(prop) || !$c.isInt(obj[prop])) {continue;}
                        if ($c.isInt(setObject['$bit'][prop]['and'])) {
                            obj[prop] &= setObject['$bit'][prop]['and'];
                        } else if ($c.isInt(setObject['$bit'][prop]['or'])) {
                            obj[prop] |= setObject['$bit'][prop]['and'];
                        } else if ($c.isInt(setObject['$bit'][prop]['xor'])) {
                            obj[prop] ^= setObject['$bit'][prop]['and'];
                        }
                    }
                }
                if (setObject['$rename']) {
                    for (var prop in setObject['$rename']) {
                        if (!obj.hasOwnProperty(prop)) { continue; }
                        var value = obj[prop];
                        setObject['$rename'].hasOwnProperty(prop) && delete obj[prop] && (obj[setObject['$rename'][prop]] = value);
                    }
                }

                // Array operations
                if (setObject['$']) {

                }
                if (setObject['$addToSet']) {
                    for (var prop in setObject['$addToSet']) {
                        if (!setObject['$addToSet'].hasOwnProperty(prop)) { continue; }
                        var each;
                        if (each = $c.getProperty(setObject,'$addToSet.'+prop+'.$each')) {
                            for (var i = 0, len = each.length; i < len; i++) {
                                obj[prop].push(each[i]);
                            }
                        } else {
                            obj[prop].push(setObject['$addToSet'][prop]);
                        }
                    }
                    $c.toSet(obj[prop]);
                }
                if (setObject['$pop']) {
                    for (var prop in setObject['$pop']) {
                        if(!setObject['$pop'].hasOwnProperty(prop) || !$c.isArray(obj[prop])) { continue; }
                        if (setObject['$pop'][prop] == 1) { obj[prop].pop(); }
                        else if (!~setObject['$pop'][prop]) { obj[prop].shift(); }
                    }
                }
                if (setObject['$pullAll']) {
                    for (var prop in setObject['$pullAll']) {
                        var arr = $c.getProperty(obj,prop),
                            values = setObject['$pullAll'][prop];
                        if (!$c.isArray(arr)) { continue; }
                        __pullHelper(arr,values);
                    }
                }
                if (setObject['$pull']) {
                    for (var prop in setObject['$pull']) {
                        var arr = $c.getProperty(obj,prop),
                            values = setObject['$pullAll'][prop];
                        if (!$c.isArray(arr)) { continue; }
                        if ($c.isArray(values)) {
                            __pullHelper(arr,values);
                        } else if ($c.isObject(values)) {
                            $c.delete(values,false);
                        }
                    }
                }
                if (setObject['$push']) {
                    for (var prop in setObject['$push']) {
                        if (!setObject['$push'].hasOwnProperty(prop)) { continue; }
                        var each = $c.getProperty(setObject,'$push.'+prop+'.$each'),
                            slice = $c.getProperty(setObject,'$push.'+prop+'.$slice'),
                            sort = $c.getProperty(setObject,'$push.'+prop+'.$sort'),
                            position = $c.getProperty(setObject,'$push.'+prop+'.$position');


                        if (each) {
                            if ($c.isNull(position)) {
                                for (var i = 0, len = each.length; i < len; i++) {
                                    obj[prop].push(each[i]);
                                }
                            } else {
                                for (var i = 0, len = each.length; i < len; i++) {
                                    $c.insertBefore(obj[prop], position++, each[i]);
                                }
                            }

                        } else {
                            obj[prop].push(setObject['$push'][prop]);
                        }

                        if (each && sort) {
                            var sorter = [];
                            for (var p in sort) {
                                if (!sort.hasOwnProperty(p)) { continue; }
                                if (sort[p] == 1) {
                                    sorter.push(p)
                                } else if (!~sort[p]) {
                                    sorter.push("!"+p)
                                }
                            }
                            $c.sortBy(obj[prop],sorter);
                        }

                        if (each && !$c.isNull(slice)) {
                            obj[prop] = obj[prop].slice(slice);
                        }
                    }
                }


                return  !!options.multi;
            };
        if (_refs.length) {
            var varStrings = "";
            for (var i = 0, len = _refs.length; i < len; i++) {
                varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
            }
            eval(varStrings);
        }
        try {
            this.filter(eval(func));
        } catch(e) {
            if (e != 'keep going') { throw e;}
        }


        if (!found && options.upsert) {
            this.push($c.update([{}],{},setObject)[0] || setObject);
        }

        return this;
    } catch (e) {
        error("Array.update", e);
        return false;
    }
}, true);
_ext(Array, 'upsert', function(records, prop, callback) {
        /*|{
         "info": "Array class extension to upsert records to array",
         "category": "Array",
         "parameters":[
         {"records": "(Array) Records to use to insert/update array"}],

         "overloads":[
         {"parameters":[
         {"records": "(Array) Records to use to insert/update array"},
         {"callback": "(Function) Method to use to determine if the records are equal"}]},

         {"parameters":[
         {"records": "(Array) Records to use to insert/update array"},
         {"prop": "(String) Property to use as the primary key"}]},

         {"parameters":[
         {"records": "(Array) Records to use to insert/update array"},
         {"prop": "(String) Property to use as the primary key"},
         {"callback": "(Function) Method to use to determine if the records are equal"}]}],

         "url": "http://www.craydent.com/library/1.9.3/docs#array.upsert",
         "returnType": "(Object)"
         }|*/
    try {
        var usePrimaryKey = true;
        if (!$c.isArray(records)) { records = [records]; }
        if ($c.isFunction(prop)) {
            callback = prop;
            prop = undefined;
        }
        if (!prop) { prop = "_id"; }
        if (callback) { usePrimaryKey = false; }

        var ids = [], refs = {}, insert = [];
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            refs[record[prop]] = {record:record,index:i};
            ids.push(record[prop]);
        }


        var condition = {}, uIndex = [], iIndex = [], sIndex = [], uArr = [], iArr = [], sArr = [], j = 0;
        condition[prop] = {$in:ids};

        var cb = function (obj,i) {
            var ref = refs[obj[prop]],
                record = ref.record,
                isEqual = callback && callback(obj,record),
                index = uIndex,
                arr = uArr;
            if ($c.isNull(isEqual, $c.equals(record,obj))) {
                index = sIndex;
                arr = sArr;
            } else {
                $c.merge(obj, record);
            }
            index.push(i);
            arr.push(obj);
            ids.splice(ref.index-(j++), 1);
            return true;
        };
        var _qnp = __queryNestedProperty,
            _clt = _contains_lessthan,
            _clte = _contains_lessthanequal,
            _cgt = _contains_greaterthan,
            _cgte = _contains_greaterthanequal,
            _ct = _contains_type, _cm = _contains_mod, _refs = [], ifblock = _subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
                "	var values,finished;" +
                "	if ("+ifblock+") {" +
                "		cb(record,i);" +
                "	}" +
                "})";
        if (_refs.length) {
            var varStrings = "";
            for (var i = 0, len = _refs.length; i < len; i++) {
                varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
            }
            eval(varStrings);
        }
        this.filter(eval(func));

        for (var i = 0, len = ids.length; i < len; i++) {
            var objRef = refs[ids[i]];
            iIndex.push(this.length);
            iArr.push(objRef.record);
            this.push($c.duplicate(objRef.record));
        }

        return {
            insertedIndexes:iIndex,
            updatedIndexes:uIndex,
            unchangedIndexes:sIndex,
            inserted:iArr,
            updated:uArr,
            unchanged:sArr
        };
    } catch (e) {
        error("Array.upsert", e);
        return false;
    }
}, true);
_ext(Array, 'where', function(condition, projection, limit) {
        /*|{
         "info": "Array class extension to use mongo or sql queries",
         "category": "Array",
         "featured": true,
         "parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"}],

         "overloads":[
         {"parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"projection": "(Mixed) Indicate which properties to return"}]},

         {"parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"useReference": "(Bool) Flag to make a copy instead of using references"}]},

         {"parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"projection": "(Mixed) Indicate which properties to return"},
         {"limit": "(Int) Limit the number of the results returned."}]},

         {"parameters":[
         {"condition": "(Mixed) Query following find/where clause syntax"},
         {"useReference": "(Bool) Flag to make a copy instead of using references"},
         {"limit": "(Int) Limit the number of the results returned."}]}],

         "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
         "returnType": "(Array)"
         }|*/
    try {
        var useReference = !projection,
            _qnp = __queryNestedProperty,
            _clt = _contains_lessthan,
            _clte = _contains_lessthanequal,
            _cgt = _contains_greaterthan,
            _cgte = _contains_greaterthanequal,
            _ct = _contains_type, _cm = _contains_mod;

        // if no condition was given, return all
        if (!condition) { return this.slice(0,limit); }
        if (limit === 0) { return []; }


        if ($c.isFunction(condition) && !projection) {
            var arr = this.filter(function(item){ return condition.call(item); });
            return limit ? arr.slice(0,limit) : arr;
        }

        // check if there is query MongoDB syntax
        var simple = !projection;
        var condStr;
        try {
            condStr = simple && JSON.stringify(condition, function (key, val) {
                    if (key[0] == "$") {
                        simple = false;
                        throw '';
                    }
                    return val;
                });
        } catch (e) { }

        if (simple) {
            limit = limit || 0;//this.length;
            var props = [],indexProps = [];
            if (this.__indexes) {
                for (var prop in condition) {
                    if (condition.hasOwnProperty(prop)) {
                        //props.push(prop);
                        if (this.__indexes[prop]) {
                            indexProps.push(prop);
                        }
                    }
                }
            }
            var arr = this,ipHasLength = !!indexProps.length;
            if (ipHasLength) {
                var prop, i = 0;

                var orderedLists = [], fi = 0,len = arr.length;
                while (prop = indexProps[i++]) {
                    var ordered = _binarySearch(arr.__indexes[prop],prop,condition[prop]);
                    if (len > ordered.length) {
                        len = ordered.length;
                        fi = i - 1;
                    }
                    orderedLists.push(ordered);
                }
                if (len < 1000) {
                    var farr = orderedLists[fi];
                    arr = [];
                    for (var i = 0; i < len; i++) {
                        var addit = true;
                        for (var j = 0, jlen = orderedLists.length; j < jlen; j++) {
                            if (fi == j) { continue; }
                            if (!~orderedLists[j].indexOf(farr[i])) {
                                addit = false;
                                break;
                            }
                        }
                        addit && arr.push(farr[i]);
                    }
                }
            }
            var boolCond = "", useQueryNested = false, func = function (cobj,index,arr) {
                if (arr.temp_count++ < this.temp_limit) { return false; }
                for (var prop in condition) {
                    if (~prop.indexOf('.')) {
                        if (!$c.contains(_qnp(cobj, prop),condition[prop])) {
                            return false;
                        }
                    } else if (cobj[prop] && cobj[prop] !== condition[prop] || $c.isNull(cobj[prop])) {
                        return false;
                    }
                }
                return true;
            };
            for (var prop in condition) {
                if (!condition.hasOwnProperty(prop) || ipHasLength && ~indexProps.indexOf(prop)) { continue; }
                if (~prop.indexOf('.')) { useQueryNested = true; break; }
                var q = $c.isString(condition[prop]) ? "\"" : "";
                if ($c.isRegExp(condition[prop])) {
                    boolCond += condition[prop] + ".test(cobj[\"" + prop + "\"]) && ";
                } else if (typeof condition[prop] == "object") {
                    boolCond += "$c.equals(cobj[\"" + prop + "\"]," + JSON.stringify(condition[prop]) + ") && ";
                } else {
                    boolCond += "cobj[\"" + prop + "\"]==" + q + condition[prop] + q + " && ";
                }
            }
            if (!useQueryNested) {
                var limitLogic = "";
                limit && (limitLogic = "arr.temp_count++ < arr.temp_limit && ");
                func = (eval("(function(cobj,index,arr){ return " + limitLogic + boolCond + "true;})") || func);
            }
            arr.temp_count = 0;
            arr.temp_limit = limit;

            arr = arr.filter(func);
            delete arr.temp_count;
            delete arr.temp_limit;

            return arr;
        }

        var arr = [], rarr, _refs = [];
        var ifblock = _subQuery(condition,null,null,_refs),
            func = eval("(function (record) {var values;" +
                (limit ? "if (arr.length == limit) { throw 'keep going'; } " : "") +
                "return " + (useReference ? ifblock : ifblock + " && arr.push(_copyWithProjection(projection, record))") + ";})");

        if (_refs.length) {
            var varStrings = "";
            for (var i = 0, len = _refs.length; i < len; i++) {
                varStrings += "var __where_cb" + (i+1) + "=_refs["+i+"];"
            }
            eval(varStrings);
        }
        try {
            rarr = this.filter(func);
        } catch(e) {
            if (e != 'keep going') { throw e;}
        }
        if (!useReference) { return arr; }
        return rarr;
    } catch (e) {
        error("Array.where", e);
        return false;
    }
}, true);