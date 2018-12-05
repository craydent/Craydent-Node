/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    ext = $s._ext,
    error = $s.error;

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function(str) { return eval(str); };
    //#region dependencies
    require($s.dir + '_add_to_index')($s);
    require($s.dir + '_remove_from_index')($s);
    require($s.dir + 'average')($s);
    require($s.dir + 'contains')($s);
    require($s.dir + 'count')($s);
    require($s.dir + 'date')($s);
    require($s.dir + 'emit')($s);
    require($s.dir + 'getKeys')($s);
    require($s.dir + 'getValue')($s);
    require($s.dir + 'insertAt')($s);
    require($s.dir + 'isSubset')($s);
    require($s.dir + 'on')($s);
    require($s.dir + 'parallelEach')($s);
    require($s.dir + 'parseBoolean')($s);
    require($s.dir + 'remove')($s);
    require($s.dir + 'removeAll')($s);
    require($s.dir + 'removeAt')($s);
    require($s.dir + 'stdev')($s);
    require($s.dir + 'toSet')($s);
    require($s.dir + 'universal_trim')($s);
    require($s.dir + 'where')($s);
    //#endregion

    //#region helper methods
    function __create_index(obj, indexes) {
        indexes = $s.condense(indexes, true);
        if (!indexes || !indexes.length) { return false; }
        if (!$s.isArray(indexes)) { indexes = indexes.split(','); }
        // obj.__indexes = {};
        obj.__indexed_buckets = obj.__indexed_buckets || {};
        for (var i = 0, len = indexes.length; i < len; i++) {
            var prop = indexes[i].trim(), arr = obj.slice();

            var bucket = obj.__indexed_buckets[prop] = {};
            var keys = bucket.__bucket__keys = [];

            arr.sort(function(a, b) {
                if (a[prop] < b[prop]) { return -1; }
                if (a[prop] > b[prop]) { return 1; }
                return 0;
            });
            var last_key = '';
            for (var j = 0, jlen = arr.length; j < jlen; j++) {
                var item = arr[j];
                if (last_key !== item[prop]) {
                    last_key = item[prop];
                    keys.push(item[prop]);
                }
                bucket[item[prop]] = bucket[item[prop]] || [];
                bucket[item[prop]].push(item);

            }
        }
        return obj;
    }
    function __processGroup (docs, expr) {
        try {
            var _ids = expr._id, i = 0, groupings = {}, results = [], meta = {index:0,length:docs.length, sample:docs.sample/*,stop:false*/}, doc;
            while(doc = docs[meta.index = i++]) {
                var result, key = "null", keys = null;
                if (_ids) {
                    keys = {};
                    for (var prop in _ids) {
                        if (!_ids.hasOwnProperty(prop)) { continue; }
                        keys[prop] = $s.__processExpression(doc, _ids[prop]);
                    }
                    key = JSON.stringify(keys);
                }
                if (!groupings[key]) {
                    result = groupings[key] = {_id:keys};
                    results.push(result);
                } else {
                    result = groupings[key];
                }
                for (var prop in expr) {
                    if (!expr.hasOwnProperty(prop) || prop == "_id") { continue; }
                    result[prop] = $s.__processAccumulator(doc, expr[prop],result.hasOwnProperty(prop) ? result[prop] : undefined, meta);
                }
            }
            return results;
        } catch (e) {
            error('aggregate.__processGroup', e);
        }
    }
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
                    return $s.where(docs,{}, value);
                case "$match":
                    return $s.where(docs,value);
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
                    var rtnDocs = $s.duplicate(docs,true);
                    if ($s.isString(value)) {
                        $g[value] = rtnDocs;
                    } else if ($s.isArray(value)) {
                        $s.removeAll(value);
                        rtnDocs = $s.merge(value,rtnDocs);
                    }
                    return rtnDocs;
                case "$sample":
                    var arr = [], i = 0, eindex = docs.length - 1;
                    while (i < value.size) {
                        arr.push(docs[Math.round($s.rand(0,eindex,true))]);
                        i++;
                    }
                    docs.sample = arr;
                    return docs;
                case "$lookup":
                    var i = 0, doc, arr = value.from,key = value.localField, fkey = value.foreignField, prop = value.as;
                    while(doc = docs[i++]) {
                        var query = {};
                        query[fkey] = doc[key] || {$exists:false};
                        doc[prop] = $s.where(arr,query);
                    }
            }
            return docs;
        } catch (e) {
            error('aggregate.__processStage', e);
        }
    }
    function __pullHelper(target, lookup) {
        for (var i = 0, len = lookup.length; i < len; i++) {
            var value = lookup[i];
            for (var j = 0, jlen = target.length; j < jlen; j++) {
                if ($s.equals(value, target[j])) {
                    $s.removeAt(target, j);
                    j--, jlen--;
                }
            }

        }
    }

    function _groupFieldHelper (obj, fields) {
        var prop = "", j = 0, field;
        while (field = fields[j++]) {
            var option ={validPath:0};
            var value = $s.getProperty(obj,field,option);
            if (!option.validPath){ continue; }
            prop += field + ":" + value + ",";
        }
        return prop;
    }
    function _joinHelper (objs, arr, on, exclusive) {
        var records = [], propRef = [], objRef = arr[0] || {};

        if ($s.isString(on)) {
            on = on.split('=');
            if (on.length == 1) { on = [on,on]; }
            var name = $s._getFuncName(arguments.callee.caller);
            on = $c.trim(on);
            name == "joinRight" && (on = [on[1],on[0]]);
        }

        for (var prop in objRef) {
            if (objRef.hasOwnProperty(prop)) {
                propRef.push(prop);
            }
        }
        for (var i = 0, len = objs.length; i < len; i++)  {
            var record = $s.duplicate(objs[i],true), query = {},results;
            query[on[1]] = record[on[0]];
            results = $s.where(arr,query);
            if (results.length > 0)  {
                records.push($s.merge(record, results[0]));
            } else if (!exclusive)  {
                for (var j = 0, jlen = propRef.length; j < jlen; j++) {
                    record[propRef[j]] = record[propRef[j]] || null;
                }
                records.push(record);
            }
        }
        return records;
    }
    function _processClause (clause) {
        try {
            var index = $s.indexOfAlt(clause,/between/i);
            if (~index) { // contains between predicate
                //replace AND in the between to prevent confusion for AND clause separator
                clause.replace(/between( .*? )and( .*?)( |$)/gi,'between$1&and$2$3');
            }

            var ORs = clause.split(/ or /i), query = {"$or":[]}, i = 0, or;
            while (or = ORs[i++]) {
                var ANDs = or.split(/ and /i),
                    aquery = {'$and':[]}, j = 0, and;
                while (and = ANDs[j++]) {
                    var predicateClause = and,
                        cond = {};

                    //=, <>, >, >=, <, <=, IN, BETWEEN, LIKE, IS NULL or IS NOT NULL
                    switch (true) {
                        case !!~(index = predicateClause.indexOf('=')) :
                            cond[predicateClause.substring(0, index).trim()] = {'$equals':$s.tryEval(predicateClause.substring(index + 1).trim())};
                            aquery['$and'].push(cond);
                            break;
                        case !!~(index = predicateClause.indexOf('<>')) :
                            cond[predicateClause.substring(0, index).trim()] = {'$ne':$s.tryEval(predicateClause.substring(index + 1).trim())};
                            aquery['$and'].push(cond);
                            break;
                        case !!~(index = predicateClause.indexOf('>')) :
                            cond[predicateClause.substring(0, index).trim()] = {'$gt':$s.tryEval(predicateClause.substring(index + 1).trim())};
                            aquery['$and'].push(cond);
                            break;
                        case !!~(index = predicateClause.indexOf('>=')) :
                            cond[predicateClause.substring(0, index).trim()] = {'$gte':$s.tryEval(predicateClause.substring(index + 1).trim())};
                            aquery['$and'].push({'$gte':cond});
                            break;
                        case !!~(index = predicateClause.indexOf('<')) :
                            cond[predicateClause.substring(0, index).trim()] = {'$lt':$s.tryEval(predicateClause.substring(index + 1).trim())};
                            aquery['$and'].push(cond);
                            break;
                        case !!~(index = predicateClause.indexOf('<=')) :
                            cond[predicateClause.substring(0, index).trim()] = {'$lte':$s.tryEval(predicateClause.substring(index + 1).trim())};
                            aquery['$and'].push(cond);
                            break;
                        case $s.indexOfAlt(predicateClause,/between/i) == 0 :
                            var nums = predicateClause.replace(/between (.*?) &and (.*?) ( |$)/i,'$1,$2').split(',');
                            aquery['$and'].push({'$gte':$s.tryEval(nums[0])});
                            aquery['$and'].push({'$lte':$s.tryEval(nums[1])});
                            break;
                        case !!~(index = $s.indexOfAlt(predicateClause,/ in /i)) :
                            var _in = $s.tryEval(predicateClause.substring(index + 4).trim().replace(/\((.*)\)/,'[$1]'));
                            if (!_in) {
                                //noinspection ExceptionCaughtLocallyJS
                                throw "Invalid syntax near 'in'";
                            }
                            cond[predicateClause.substring(0, index).trim()] = _in;
                            aquery['$and'].push({'$in':cond});
                            break;
                        case !!~(index = $s.indexOfAlt(predicateClause,/is null/i)) :
                            cond[predicateClause.substring(0, index).trim()] = null;
                            aquery['$and'].push({'$equals':cond});
                            break;
                        case !!~(index = $s.indexOfAlt(predicateClause,/is not null/i)) :
                            cond[predicateClause.substring(0, index).trim()] = null;
                            aquery['$and'].push({'$ne':cond});
                            break;
                        case !!~(index = $s.indexOfAlt(predicateClause,/ like /i)) :
                            var likeVal = "^" + $s.replace_all($s._general_trim(predicateClause.substring(index + 6),null,[' ', "'", '"']),"%",".*?") + "$";
                            cond[predicateClause.substring(0, index).trim()] = {'$regex': new RegExp(likeVal,'i')};
                            aquery['$and'].push(cond);
                            break;
                    }
                }
                query['$or'].push(aquery);
            }

            return query;
        } catch (e) {
            error('where.processClause', e);
        }
    }
    function _redact(docs, expr) {
        try {
            docs = $s.isArray(docs) ? docs : [docs];
            var result = [], i = 0, doc;
            while (doc = docs[i++]) {
                var action = $s.__parseCond(doc, expr);
                if (action == "$$KEEP") {
                    result.push(doc);
                } else if (action == "$$DESCEND") { // return all fields at current document without embedded documents
                    result.push(doc);
                    for (var prop in doc) {
                        if (!doc.hasOwnProperty(prop) || $s.isArray(doc[prop]) && !$s.isObject(doc[prop][0]) || !$s.isArray(doc[prop]) && !$s.isObject(doc[prop])) {
                            continue;
                        }
                        doc[prop] = _redact(doc[prop], expr);
                        if (doc[prop] === undefined) {
                            delete doc[prop];
                        }
                    }
                } else if (action == "$$PRUNE") {

                } else {
                    //noinspection ExceptionCaughtLocallyJS
                    throw "exception: $redact's expression should not return anything aside from the variables $$KEEP, $$DESCEND, and $$PRUNE, but returned " + $s.parseRaw(action);
                }
            }
            return result.length ? result : undefined;
        } catch (e) {
            error('aggregate._redact', e);
        }
    }
    function _unwind(docs, path) {
        try {
            var results = [], doc, i = 0, options = {};
            if ($s.isObject(path)) {
                options = path;
                path = options.path;
            }
            while (doc = docs[i++]) {
                var arr = $s.__processExpression(doc, path);
                if ($s.isNull(arr) || $s.isArray(arr) && $s.isEmpty(arr)) {
                    doc = $s.duplicate(doc);
                    if (options.includeArrayIndex) {
                        doc[options.includeArrayIndex] = 0;
                    }
                    options.preserveNullAndEmptyArrays && results.push(doc);
                    continue;
                }
                if (!$s.isArray(arr)) {
                    //noinspection ExceptionCaughtLocallyJS
                    throw "Exception: Value at end of $unwind field path '"+path+"' must be an Array, but is a " + $s.capitalize(typeof arr) +".";
                }
                if (path[0] == "$") {
                    path = path.substr(1);
                }
                for (var j = 0, jlen = arr.length; j < jlen; j++) {
                    var dup = $s.duplicate(doc);
                    if (options.includeArrayIndex) {
                        dup[options.includeArrayIndex] = j;
                    }
                    $s.setProperty(dup, path, arr[j]);
                    results.push(dup);
                }
            }
            return results;
        } catch (e) {
            error('aggregate._unwind', e);
        }
    }
    //#endregion

    ext(Array, 'add', function (obj) {
        /*|{
            "info": "Array class extension to perform push and update indexes if used",
            "category": "Array",
            "featured": true,
            "parameters":[
                {"value": "(Object) value to add"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.add",
            "typeParameter": "<T>",
            "returnType": "(Bool) Value to indicate success or failure"
        }|*/
        try {
            this.push(obj);
            if (this.__indexed_buckets) {
                $s._add_to_index(this.__indexed_buckets, obj);
            }
            return true;
        } catch (e) {
            error("Array.add", e);
            return false;
        }
    }, true);
    ext(Array, 'aggregate', function (pipelines) {
        /*|{
            "info": "Array class extension to perform mongo style aggregation",
            "category": "Array",
            "featured": true,
            "parameters":[
                    {"pipelines": "(Array<MongoPipelines>) Array of stages defined in mongodb. ($project, $match, $redact, $limit, $skip, $unwind, $group, $sample, $sort, $lookup, $out)"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.aggregate",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>) returns an array of aggregates"
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
            return [];
        }
    }, true);
    ext(Array, 'average', function () {
        /*|{
            "info": "Array class extension to perform average of all the values (any value which is not 0).",
            "category": "Array",
            "featured": true,
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.aggregate",
            "typeParameter": "<T>",
            "returnType": "(number | NaN)"
        }|*/
        try {
            return $s.average(this);
        } catch (e) {
            error("Array.average", e);
            return NaN;
        }
    }, true);
    ext(Array, 'buildTree', function (parentFinder,childFinder,options) {
        /*|{
            "info": "Array class extension to create a parent/child hierarchy",
            "category": "Array",
            "parameters":[
                {"parentFinder": "(TreeParentFinder<T>) Function to determine the parent.  Should return a boolean value and is passed the current item as an argument."},
                {"childFinder": "(String) Property name of the object to use as a grouping."},
                {"options?":"(TreeOptions) Options to customize properties,  Valid property is:<br />childProperty"}],

            "overloads":[
                {"parameters":[
                    {"parentFinder": "(TreeParentFinder<T>) Function to determine the parent.  Should return a boolean value and is passed the current item as an argument."},
                    {"childFinder": "(TreeChildFinder<T>) Function to determine the grouping."},
                    {"options?":"(TreeOptions) Options to customize properties,  Valid property is:<br />childProperty"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.buildTree",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>) returns a hierarchical array."
        }|*/
        try {
            options = options || {};
            var rtnArr = [];
            var i = 0,objt,cats=[],catDict={},tmp={}, singles = {};
            var cprop = options.childProperty || "children";
            while(objt=this[i++]){
                var cat = $s.isFunction(childFinder) ? childFinder(objt) : objt[childFinder],
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
    ext(Array, 'condense', function (check_values) {
        /*|{
            "info": "Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls",
            "category": "Array",
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"check_values": "(Bool) Set this flag to remove duplicates"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
            "typeParameter": "<T>",
            "returnType": "(Array<T>) returns a condensed version of the array."
        }|*/
        try {
            return $s.condense(this, check_values);
        } catch (e) {
            error("Array.condense", e);
            return [];
        }
    }, true);
    ext(Array, "contains", function(val, func){
        /*|{
            "info": "Object class extension to check if value exists",
            "category": "Array|Object",
            "parameters":[
                {"val": "(ContainsValue|ContainsObjectIterator<T, TValue>) Value to check or custom function to determine validity"}],

            "overloads":[
                {"parameters":[
                    {"val": "(ContainsValue) Value to check"},
                    {"func": "(ContainsIterator<T>) Callback function used to do the comparison"}]},
                {"parameters":[
                    {"val": "(ContainsValue) Value to check"},
                    {"func": "(ComparisonOperator) String indicating logical operator ("$lt"|"$lte"|"$gt"|"$gte"|"$mod"|"$type") }]},
                {"parameters":[
                    {"arr": "(Array<ContainsValue>) Array of values to return first matching value"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
            "typeParameter": "<T>",
            "returnType": "(Bool) returns if there was a match."
        }|*/
        try {
            return $s.contains(this, val, func);
        } catch (e) {
            error("Array.contains", e);
            return false;
        }
    }, true);
    ext(Array, "count", function(option){
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
            return $s.count(this, option);
        } catch (e) {
            error("Array.count", e);
            return NaN;
        }
    }, true);
    ext(Array, 'createIndex', function (indexes) {
        /*|{
            "info": "Array class extension to create indexes for faster searches during where",
            "category": "Array",
            "parameters":[
                {"properties": "(string) Property or comma delimited property list to index."}],

            "overloads":[
                {"parameters":[
                    {"indexes": "(Array<string>) Array of properties to index"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
            "typeParameter": "<T>",
            "returnType": "(Array<T> | Bool) returns the Array<T> if successfull otherwise false."
        }|*/
        try {
            return __create_index(this, indexes);
        } catch(e) {
            error("Array.createIndex", e);
            return false;
        }
    });
    ext(Array, 'delete', function(condition, justOne) {
        /*|{
            "info": "Array class extension to delete records",
            "category": "Array",
            "defaults": {
                "justOne": true
            },
            "parameters":[
                {"condition": "(WhereCondition) Query following find/where clause syntax"},
                {"justOne?": "(Bool) Flag for deleting just one records [Default is: true]"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.delete",
            "typeParameter": "<T>",
            "returnType": "(Array<T>) returns a list of the deleted objects."
        }|*/
        try {
            var thiz = this,
                _equals = $s.equals,
                _contains = $s.contains,
                _isArray = $s.isArray,
                _isNull = $s.isNull,
                _isFunction = $s.isFunction,
                _isObject = $s.isObject,
                _isString = $s.isString,
                _isRegExp = $s.isRegExp,
                _isInt = $s.isInt,
                _qnp = $s.__queryNestedProperty,
                _clt = $s._contains_lessthan,
                _clte = $s._contains_lessthanequal,
                _cgt = $s._contains_greaterthan,
                _cgte = $s._contains_greaterthanequal,
                _ct = $s._contains_type,
                _cm = $s._contains_mod;
            justOne = $s.parseBoolean($s.isNull(justOne) ? true : $s.isNull(justOne.justOne, justOne));
            // if no condition was given, remove all
            if (!condition) { return this.splice(0,justOne ? 1 : this.length); }
            var arr = [], indexes = [], cb = function (obj, i) {
                if (justOne) {
                    if (thiz.__indexed_buckets) {
                        $s._remove_from_index(thiz.__indexed_buckets, obj);
                    }
                    arr = arr.concat(this.splice(i,1));
                    return false;
                }
                indexes.push(i);
                return true;
            };

            var _refs = [], ifblock = $s._subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
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
            } catch (e) {
                if (e != 'keep going') { throw e;}
            }

            for (var i = indexes.length - 1; i >= 0; i--) {
                var item = this.splice(indexes[i], 1);
                if (thiz.__indexed_buckets) {
                    $s._remove_from_index(thiz.__indexed_buckets, item[0]);
                }
                arr = item.concat(arr);
            }

            return arr;
        } catch (e) {
            error("Array.delete", e);
            return [];
        }
    }, true);
    ext(Array, 'distinct', function(fields, condition) {
        /*|{
            "info": "Array class extension to get all unique records by fields specified",
            "category": "Array",
            "parameters":[
                {"fields": "(String) Fields to use as the projection and unique comparison (comma delimited)"},
                {"condition?": "(String|WhereCondition) Query following SQL where clause syntax"}],

            "overloads":[
                {"parameters":[
                    {"fields": "(Array<String>) Fields to use as the projection and unique comparison"},
                    {"condition?": "(String|WhereCondition) Query following SQL where clause syntax"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.distinct",
            "typeParameter": "<T>",
            "returnType": "(Array<T>) returns an array with distinct values"
        }|*/
        try {
            if ($s.isString(fields)) { fields = fields.split(","); }

            var records = $c.group(this, {field:fields,cond:condition}, true);
            var arr = [];
            if (fields.length == 1) {
                for (var i = 0, len = records.length; i < len; i++ ) {
                    var value = $s.getProperty(records[i], fields[0]);
                    !$s.isNullOrEmpty(value) && arr.push(value);
                }
                return arr;
            }
            var i = 0, r;
            while (r=records[i++]) { !$s.isNullOrEmpty(r) && arr.push(r); }
            return arr;
        } catch (e) {
            error("Array.distinct", e);
            return [];
        }
    });
    ext(Array, "equals", function (compare, props){
        /*|{
            "info": "Object class extension to check if object values are equal",
            "category": "Array|Object",
            "parameters":[
                {"compare": "(any) Object to compare against"}],

            "overloads":[
                {"parameters":[
                    {"compare": "(any) Object to compare against"},
                    {"props": "(Array<string>) Array of property values to compare against"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
            "typeParameter": "<T>",
            "returnType": "(Bool | undefined) returns if the the two arrays have equivalent values"
        }|*/
        try {
            return $s.equals(this, compare, props);
        } catch (e) {
            error("Array.equals", e);
        }
    }, true);
    ext(Array, 'every', function(callback, thisObject) {
        /*|{
            "info": "Array class extension to implement .every method",
            "category": "Array",
            "parameters":[
                {"callback": "(ArrayIterator<T, TResult>) Callback to test for each element. Callback will get the current item, index, context as arguments."},
                {"thisObject?": "(any) Context for the callback function"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.every",
            "typeParameter": "<T, TResult>",
            "returnType": "(Bool | undefined)"
        }|*/
        try {
            var thisObject = thisObject || this;
            for (var i = 0, len = this.length; i < len; i++) {
                var thiz = this[i];
                if ( !callback.call(thisObject, thiz, i, this)) { return false; }
            }
            return true;
        } catch (e) {
            error("Array.every", e);
        }
    }, true);
    ext(Array, 'filter', function(func /*, thiss*/) {
        /*|{
            "info": "Array class extension to implement filter",
            "category": "Array",
            "parameters":[
                {"func": "(ArrayIterator<T, TResult>) Callback function used to determine if value should be returned. Callback will get the current item, index, context as arguments."},
                {"thiss?": "(any) Specify the context on callback function"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.filter",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>)"
        }|*/
        try {
            if (!$s.isFunction(func)) {
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
            return [];
        }
    }, true);
    ext(Array, 'find', function(condition, projection) {
        /*|{
            "info": "Array class extension to use mongo or sql queries (Alias of Where minus the limit argument)",
            "category": "Array",
            "featured": true,
            "parameters":[
                {"condition": "(WhereCondition | string) Query following find/where clause syntax"}],

            "overloads":[
                {"parameters":[
                    {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                    {"projection": "(Object | string) Indicate which properties to return"}]},

                {"parameters":[
                    {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                    {"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
            "typeParameter": "<T>",
            "returnType": "(Array<T>)"
        }|*/
        try {
            return $s.where(this,condition, projection);
        } catch (e) {
            error("Array.find", e);
        }
    });
    ext(Array, 'findOne', function(condition, projection) {
        /*|{
            "info": "Array class extension to use mongo or sql queries returning the first item match",
            "category": "Array",
            "featured": true,
            "parameters":[
                {"condition": "(WhereCondition | string) Query following find/where clause syntax"}],

            "overloads":[
                {"parameters":[
                    {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                    {"projection": "(WhereCondition | string) Indicate which properties to return"}]},

                {"parameters":[
                    {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                    {"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
            "typeParameter": "<T>",
            "returnType": "(T)"
        }|*/
        try {
            return $s.where(this,condition, projection, 1)[0];
        } catch (e) {
            error("Array.findOne", e);
        }
    });
    ext(Array, "getValue" ,function (args, dflt) {
        /*|{
            "info": "Object class extension to retrieve value of an object property",
            "category": "Array|Object",
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"default": "(any) Default value to return if context is not a function"}]},

                {"parameters":[
                    {"arguments": "(any[]) An array of arguments to pass to context when it is a function"},
                    {"default": "(any) Default value to return if context is not a function"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.getValue",
            "typeParameter": "<T>",
            "returnType": "(any) the value of any type.  if the type is a method, it will execute the methed and use its return value."
        }|*/
        try {
            return $s.getValue(this, args, dflt);
        } catch (e) {
            error("Array.getValue", e);
        }
    }, true);
    ext(Array, 'group', function(params, removeProps) {
        /*|{
            "info": "Array class extension to group records by fields",
            "category": "Array",
            "parameters":[
                {"params": "(GroupOptions<T, TResult>) specs with common properties:<br />(Object) key<br />(Object | string) condition<br />(Function) reduce<br />(Object) initial<br />(Array<string> | Function) keyf<br />(Function) finalize"},
                {"removeProps?": "(Bool) Flag to preserve property if the value is null or undefined."}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.group",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>)"
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
                reduce = params.reduce || $s.foo,
                initial = params.initial || {},
                keyf = params.keyf,
                finalize = params.finalize || function(o) { return o;};

            if ($s.isString(key)) { key = key.split(','); }
            if ($s.isArray(key)) {
                var tmp = {};
                for (var i = 0, len = key.length; i < len; i++) {
                    tmp[key[i]] = 1;
                }
                key = tmp;
            }

            var props = $s.getKeys(initial),
                fields = $s.getKeys(key),
                arr = [], result = {}, id = $s.suid(),
                cb = function (obj, i) {
                    // _groupFieldHelper creates a grouping string based on the field value pairs
                    if (!fields && keyf) {
                        fields = $s.isFunction(keyf) ? keyf(doc) : keyf;
                    }
                    var objs = [];
                    for (var f = 0, flen = fields.length; f < flen; f++) {
                        var field = fields[f];
                        if ($s.isArray($s.getProperty(obj, field))) {
                            objs = objs.concat(_unwind([obj], field));
                        }
                    }
                    objs = objs.length? objs:[obj];
                    for (var o = 0, olen = objs.length; o < olen; o++) {
                        var ob = objs[o];
                        var prop = _groupFieldHelper(ob, fields), addit = false;
                        if (!result[prop]) {
                            addit = true;
                            var tmp = $s.duplicate(initial);
                            result[prop] = tmp;
                        }
                        var curr = $s.duplicate(ob), item;
                        reduce(curr, result[prop]);
                        item = $s._copyWithProjection(fields, ob, !removeProps);
                        item[id] = prop;
                        addit && arr.push(item);
                    }
                    // var props = _groupFieldHelper(ob, fields);
                    // for (var j = 0, jlen = props.length; j < jlen; j++) {
                    //     var prop = props[j].key;
                    //     var field = props[j].field;
                    //     var value = props[j].value;
                    //     addit = false;
                    //     if (!result[prop]) {
                    //         addit = true;
                    //         var tmp = $s.duplicate(initial);
                    //         result[prop] = tmp;
                    //     }
                    //     var curr = $s.duplicate(ob), item;
                    //     reduce(curr, result[prop]);
                    //     item = $s._copyWithProjection(fields, ob, !removeProps);
                    //     if ($s.isArray($s.getProperty(item, field))) {
                    //         $s.setProperty(item, field, value);
                    //     }
                    //     item[id] = prop;
                    //     addit && arr.push(item);
                    // }
                    return true;
                };


            var thiz = this,
                _equals = $s.equals,
                _contains = $s.contains,
                _isArray = $s.isArray,
                _isNull = $s.isNull,
                _isFunction = $s.isFunction,
                _isObject = $s.isObject,
                _isString = $s.isString,
                _isRegExp = $s.isRegExp,
                _isInt = $s.isInt,
                _qnp = $s.__queryNestedProperty,
                _clt = $s._contains_lessthan,
                _clte = $s._contains_lessthanequal,
                _cgt = $s._contains_greaterthan,
                _cgte = $s._contains_greaterthanequal,
                _ct = $s._contains_type,
                _cm = $s._contains_mod,
                _refs = [], ifblock = $s._subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
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

            var keyObj = $s.duplicate(initial);
            for (var prop in key) {
                if (!key.hasOwnProperty(prop) || !key[prop]) { continue; }
                $s.setProperty(keyObj,prop,key[prop]);
            }
            for (var i = 0, len = arr.length; i < len; i++) {
                var merge1 = $s.merge(arr[i],result[arr[i][id]]);
                arr[i] = $s.merge(keyObj,finalize(merge1) || merge1,{clone:true,intersect:true});
            }
            return arr;
        } catch (e) {
            error("Array.group", e);
            return [];
        }
    });
    ext(Array, 'indexOf', function(value) {
        /*|{
            "info": "Array class extension to implement indexOf",
            "category": "Array",
            "parameters":[
                {"value": "(any) value to find"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOf",
            "typeParameter": "<T>",
            "returnType": "(Int) returns the index of the item that matches or -1."
        }|*/
        try {
            return $s.indexOf(this, value);
        } catch (e) {
            error("Array.indexOf", e);
            return -1;
        }
    }, true);
    ext(Array, 'indexOfAlt', function (value, option) {
        /*|{
            "info": "Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression",
            "category": "Array",
            "parameters":[
                {"value": "(any) value to find"},
                {"func": "(ArrayIterator<T, TResult>) Callback function used to do the comparison"}],

            "overloads":[
                {"parameters":[
                    {"regex": "(RegExp) Regular expression to check value against"},
                    {"pos?": "(Int) Index offset to start"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOfAlt",
            "typeParameter": "<T, TResult>",
            "returnType": "(Int) returns the index of the item that matches or -1. "
        }|*/
        try {
            return $s.indexOfAlt(this, value, option);
        } catch (e) {
            error("Array.indexOfAlt", e);
            return -1;
        }
    }, true);
    ext(Array, "innerJoin", function (arr, on) {
        /*|{
            "info": "Array class extension to do an inner join on arrays",
            "category": "Array",
            "parameters":[
                {"arr": "(Array<T>) Array to be joined with"},
                {"on": "(String) Condition to join on"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.innerJoin",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>) resulting array of the join."
        }|*/
        try {
            return _joinHelper(this, arr, on, true);
        } catch (e) {
            error('Array.innerJoin', e);
            return [];
        }
    });
    ext(Array, 'insert', function(value) {
        /*|{
            "info": "Array class extension to add to the array",
            "category": "Array",
            "parameters":[
                {"value": "(any) value to add"}],

            "overloads": [],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.insert",
            "typeParameter": "<T>",
            "returnType": "(Bool) returns true for success and false for failure."
        }|*/
        try {
            if ($s.isArray(value)) {
                for (var i = 0, len = value.length; i < len; i++) {
                    $c.add(this, value[i]);
                }
            } else {
                $c.add(this, value);
            }
            return true;
        } catch (e) {
            error("Array.insert", e);
            return false;
        }
    }, true);
    ext(Array, 'insertAfter', function(index, value) {
        /*|{
            "info": "Array class extension to add to the array after a specific index",
            "category": "Array",
            "parameters":[
                {"index": "(Int) Index to add after"},
                {"value": "(any) Value to add"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.insertAfter",
            "typeParameter": "<T>",
            "returnType": "(Bool) returns true for success and false for failure."
        }|*/
        try {
            this.splice(index + 1, 0, value);
            if (this.__indexed_buckets) {
                $s._add_to_index(this.__indexed_buckets, value);
            }
            return true;
        } catch (e) {
            error("Array.insertAfter", e);
            return false;
        }
    }, true);
    ext(Array, 'insertAt', function(index, value) {
        /*|{
            "info": "Array class extension to add to the array at a specific index and push the all indexes down",
            "category": "Array",
            "parameters":[
                {"index": "(Int) Index to add after"},
                {"value": "(any) Value to add"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.insertAt",
            "typeParameter": "<T>",
            "returnType": "(Bool) returns true for success and false for failure."
        }|*/
        try {
            return $s.insertAt(this, index, value);
        } catch (e) {
            error("Array.insertAt", e);
            return false;
        }
    }, true);
    ext(Array, 'insertBefore', function(index, value) {
        /*|{
            "info": "Array class extension to add to the array before a specific index",
            "category": "Array",
            "parameters":[
                {"index": "(Int) Index to add before"},
                {"value": "(any) Value to add"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.insertBefore",
            "typeParameter": "<T>",
            "returnType": "(Bool) returns true for success and false for failure."
        }|*/
        try {
            this.splice(index, 0, value);
            if (this.__indexed_buckets) {
                $s._add_to_index(this.__indexed_buckets, value);
            }
            return true;
        } catch (e) {
            error("Array.insertBefore", e);
            return false;
        }
    }, true);
    ext(Array, "isEmpty", function () {
        /*|{
            "info": "Array class extension to check if it is empty",
            "category": "Array",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.isEmpty",
            "typeParameter": "<T>",
            "returnType": "(Bool) returns true if the array is empty, otherwise false."
        }|*/
        try {
            return $s.isEmpty(this);
        } catch (e) {
            error('Array.isEmpty', e);
            return false;
        }
    });
    ext(Array, "isSubset", function () {
        /*|{
            "info": "Object class extension to check if item is a subset",
            "category": "Array|Object",
            "parameters":[
                {"compare": "(Array<T>|Object) Superset to compare against"}],

            "overloads": [],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
            "typeParameter": "<T>",
            "returnType": "(Bool) returns true if the array is a subset, otherwise false."
        }|*/
        try {
            return $s.isSubset(this, compare, sharesAny);
        } catch (e) {
            error('Object.isSubset', e);
        }
    });
    ext(Array, "joinLeft", function (arr, on) {
        /*|{
            "info": "Array class extension to do an outer left join on arrays",
            "category": "Array",
            "parameters":[
                {"arr": "(Array<T>) Secondary array to be joined with"},
                {"on": "(String) Condition to join on"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.joinLeft",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>) resulting array of the join."
        }|*/
        try {
            return _joinHelper(this, arr, on);
        } catch (e) {
            error('Array.joinLeft', e);
            return [];
        }
    });
    ext(Array, "joinRight", function (arr, on) {
        /*|{
            "info": "Array class extension to do an outer right join on arrays",
            "category": "Array",
            "parameters":[
                {"arr": "(Array<T>) Secondary array to be joined with"},
                {"on": "(String) Condition to join on"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.joinRight",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>) resulting array of the join."
        }|*/
        try {
            return _joinHelper(arr, this, on);
        } catch (e) {
            error('Array.joinRight', e);
            return [];
        }
    });
    ext(Array, "last", function () {
        /*|{
            "info": "Array class extension to retrieve the last item in the array.",
            "category": "Array",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.last",
            "typeParameter": "<T>",
            "returnType": "(T) returns the last item in the array."
        }|*/
        try {
            return this[this.length - 1];
        } catch (e) {
            error('Array.last', e);
        }
    }, true);
    ext(Array, 'limit', function(max, skip) {
        /*|{
            "info": "Array class extension to return a limited amount of items",
            "category": "Array",
            "parameters":[
                {"max": "(Int) Maximum number of items to return"},
                {"skip?": "(Int) Number of items to skip"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.limit",
            "typeParameter": "<T>",
            "returnType": "(Array<T>) returns the first n items in the array."
        }|*/
        try {
            skip = skip || 0;
            return this.slice(skip,max);
        } catch (e) {
            error("Array.limit", e);
            return [];
        }
    }, true);
    ext(Array, 'map', function(callback , thisObject) {
        /*|{
            "info": "Array class extension to implement map",
            "category": "Array",
            "parameters":[
                {"callback": "(ArrayIterator<T, TResult>) Callback function used to apply changes"},
                {"thisObject?": "(any) Specify the context on callback function"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.map",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>) returns the resulting array."
        }|*/
        try {
            thisObject = thisObject || this,
                other= new Array(this.length);
            for (var i = 0, n = this.length; i < n; i++) {
                if (i in this) {
                    other[i] = callback.call(thisObject, this[i], i, this);
                }
            }
            return other;
        } catch (e) {
            error("Array.map", e);
            return [];
        }
    }, true);
    ext(Array, 'mapReduce', function(map, reduce, options) {
        /*|{
            "info": "Array class extension to run map-reduce aggregation over records",
            "category": "Array",
            "parameters":[
                {"map": "(ArrayIterator<T, TResult>) Function to apply to each item"},
                {"reduce": "(MongoReducer<T>) Function used to condense the items"},
                {"options?": "(MongoMapReduceOptions<T, TResult>) Options specified in the Mongo Doc"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.mapReduce",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>) returns the map reduced array."
        }|*/
        try {
            options = options || {};
            var obj = {}, results = $s.where(this,options.query,null,options.limit), rtnArr = [], final = options.finalize;
            if (options.sort) {
                if ($s.isObject(options.sort)) {
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
            $s.on(map,'emit',function(key,value){
                obj[key] = obj[key] || [];
                obj[key].push(value);
            });
            for (var i = 0, len = results.length; i < len; i++) { map.call(results[i]) }
            for (var key in obj) {
                if (!obj.hasOwnProperty(key)) { continue; }
                var reducedValue = reduce(key,obj[key]);
                if ($s.isFunction(final)) { reducedValue = final(key,reducedValue); }
                rtnArr.push({_id:key, value: reducedValue});
            }

            if ($s.isString(options.out)) {
                $g[options.out] = $s.duplicate(rtnArr,true);
            } else if ($s.isArray(options.out)) {
                $s.removeAll(options.out);
                return $s.merge(options.out,rtnArr);
            }
            return rtnArr;
        } catch (e) {
            error("Array.mapReduce", e);
            return [];
        }
    });
    ext(Array, 'normalize', function () {
        /*|{
            "info": "Array class extension to normalize all properties in the object array",
            "category": "Array",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.normalize",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>) returns a normalized version of the objects."
        }|*/
        try {
            var allProps = {}, arrObj = [], len = this.length;
            for(var i = 0; i < len; i++) {
                var json = this[i];
                if (!$s.isObject(json)) {
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
            return [];
        }
    }, true);
    ext(Array, 'parallelEach', function (gen, args) {
        /*|{
            "info": "Array class extension to execute each array item in parallel or run each item against a generator/function in parallel",
            "category": "Array|Control Flow",
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"gen": "(GeneratorFunction) Generator function to apply to each item"}]},

                {"parameters":[
                    {"func": "(ArrayIterator<T, TResult>) Function to apply to each item"}]},

                {"parameters":[
                    {"args": "(Array<T>) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, or functions)"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.parallelEach",
            "typeParameter": "<T, TResult>",
            "returnType": "(Promise<Array<T>>) returns a promise of the resulting items in the array."
        }|*/
        try {
            return $s.parallelEach(this, gen, args);
        } catch (e) {
            error('Array.parallelEach', e);
            return [];
        }
    }, true);
    ext(Array, 'remove', function (value, indexOf) {
        /*|{
            "info": "Array class extension to remove an item by value",
            "category": "Array",
            "parameters":[
                {"value": "(any) Value to remove"},
                {"indexOf?": "(IndexOf<T>) Callback function to use to find the item based on the value"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.remove",
            "typeParameter": "<T>",
            "returnType": "(T | undefined) returns the removed item."
        }|*/
        try {
            return $s.remove(this, value, indexOf);
        } catch (e) {
            error("Array.remove", e);
        }
    }, true);
    ext(Array, 'removeAll', function (value, indexOf) {
        /*|{
            "info": "Array class extension to remove all items by value",
            "category": "Array",
            "parameters":[
                {"value?": "(any) Value to remove"},
                {"indexOf?": "(IndexOf<T>) Callback function to use to find the item based on the value"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAll",
            "typeParameter": "<T>",
            "returnType": "(Array<T>) returns an array of all the removed items."
        }|*/
        try {
            return $s.removeAll(this, value, indexOf);
        } catch (e) {
            error("Array.removeAll", e);
            return [];
        }
    }, true);
    ext(Array, 'removeAt', function (index) {
        /*|{
            "info": "Array class extension to remove item at a specific index",
            "category": "Array",
            "parameters":[
                {"index": "(Int) Index of the item to remove"}],

            "overloads": [],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAt",
            "typeParameter": "<T>",
            "returnType": "(T | undefined) returns the removed item."
        }|*/
        try {
            return $s.removeAt(this, index);
        } catch (e) {
            error("Array.removeAt", e);
        }
    }, true);
    ext(Array, 'replaceAt', function(index, value) {
        /*|{
            "info": "Array class extension to replace item at a specific index",
            "category": "Array",
            "parameters":[
                {"index": "(Int) Index of the item to remove"},
                {"value": "(any) Value to replace with"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.replaceAt",
            "typeParameter": "<T>",
            "returnType": "(T | undefined) returns the item removed."
        }|*/
        try {
            var item = this.splice(index, 1, value)[0];
            if (this.__indexed_buckets) {
                $s._remove_from_index(this.__indexed_buckets, item);
                $s._add_to_index(this.__indexed_buckets, value);
            }
            return item;
        } catch (e) {
            error("Array.replaceAt", e);
        }
    }, true);
    ext(Array, 'scramble', function() {
        /*|{
            "info": "Array class extension to scramble the order.",
            "category": "Array",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.scramble",
            "typeParameter": "<T>",
            "returnType": "(Array<T>)"
        }|*/
        try {
            return this.sort(function() { return Math.round($s.rand(-1.5, 1.5)); });
        } catch (e) {
            error("Array.scramble", e);
            return this;
        }
    }, true);
    ext(Array, 'sortBy', function(props, rev, primer, lookup, options){
        /*|{
            "info": "Array class extension to sort the array",
            "category": "Array",
            "parameters":[
                {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"}],

            "overloads":[
                {"parameters":[
                    {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"}]},

                {"parameters":[
                    {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                    {"rev": "(Bool) Flag to reverse the sort"}]},

                {"parameters":[
                    {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                    {"rev": "(Bool) Flag to reverse the sort"}]},

                {"parameters":[
                    {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                    {"rev": "(Bool) Flag to reverse the sort"},
                    {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."}]},

                {"parameters":[
                    {"props": "(Array<String>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                    {"rev": "(Bool) Flag to reverse the sort"},
                    {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."}]},

                {"parameters":[
                    {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                    {"rev": "(Bool) Flag to reverse the sort"},
                    {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                    {"lookup": "(Object) Look up object to use as values instead of the array values."}]},

                {"parameters":[
                    {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                    {"rev": "(Bool) Flag to reverse the sort"},
                    {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                    {"lookup": "(Object) Look up object to use as values instead of the array values."}]},

                {"parameters":[
                    {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                    {"rev": "(Bool) Flag to reverse the sort"},
                    {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                    {"lookup": "(Object) Look up object to use as values instead of the array values."},
                    {"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]},

                {"parameters":[
                    {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                    {"rev": "(Bool) Flag to reverse the sort"},
                    {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                    {"lookup": "(Object) Look up object to use as values instead of the array values."},
                    {"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.sortBy",
            "typeParameter": "<T>",
            "returnType": "(Array<T>)"
        }|*/
        try {
            options = ($s.isString(options) && options in {"i":1,"ignoreCase":1}) ? {i:1} : {};
            options.i = $s.isNull(options.ignoreCase) ? options.i : option.ignoreCase;
            primer = primer || function(x, prop){return x;};
            if($s.isString(props)){ props = props.split(','); }
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
                if ($s.isNull(aVal)) {return 1;}
                if ($s.isNull(bVal)) {return -1;}
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
    ext(Array, 'stdev', function () {
        /*|{
            "info": "Array class extension to perform standard deviation (any value which is not a number is 0).",
            "category": "Array",
            "featured": true,
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.stdev",
            "typeParameter": "<T>",
            "returnType": "(number | NaN) returns the standard deviation of the array of numbers"
        }|*/
        try {
            return $s.stdev(this);
        } catch (e) {
            error("Array.stdev", e);
            return NaN;
        }
    }, true);
    ext(Array, 'sum', function () {
        /*|{
            "info": "Array class extension to perform summation of all the values (any value which is not a number is 0).",
            "category": "Array",
            "featured": true,
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.sum",
            "typeParameter": "<T>",
            "returnType": "(number | NaN) returns the sum of the array of numbers"
        }|*/
        try {
            var value = 0;
            for (var i = 0, len = this.length; i < len; i++) {
                value += $s.isNumber(this[i]) ? this[i] : 0;
            }
            return value;
        } catch (e) {
            error("Array.sum", e);
            return NaN;
        }
    }, true);
    ext(Array, 'toSet', function() {
        /*|{
            "info": "Array class extension to convert the array to a set",
            "category": "Array",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.toSet",
            "typeParameter": "<T>",
            "returnType": "(Set<T>) returns a Set from the array Values"
        }|*/
        try {
            return $s.toSet(this);
        } catch (e) {
            error("Array.toSet", e);
        }
    }, true);
    ext(Array, 'trim', function (chars) {
        /*|{
            "info": "Array class extension to remove all white space/chars from the beginning and end of all string values in the array.",
            "category": "Array",
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"ref":"(Bool) Whether or not to mutate the original array."}]},

                {"parameters":[
                    {"character": "(Char[]) Character to remove in the String"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#Array.trim",
            "typeParameter": "<T, TResult>",
            "returnType": "(Array<TResult>) returns the trimmed version of the array."
        }|*/
        try {
            return $s.universal_trim(this, chars);
        } catch (e) {
            error("Array.trim", e);
        }
    }, true);
    ext(Array, 'update', function(condition, setClause, options) {
        /*|{
            "info": "Array class extension to update records in the array",
            "category": "Array",
            "parameters":[
                {"condition": "(WhereCondition) Query following find/where clause syntax"},
                {"setClause": "(MongoSet) Set clause used to update the records"}],

            "overloads":[
                {"parameters":[
                    {"condition": "(WhereCondition) Query following find/where clause syntax"},
                    {"setClause": "(MongoSet) Set clause used to update the records"},
                    {"options": "(UpdateOptions) Options to specify if mulit update and/or upsert"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.update",
            "typeParameter": "<T>",
            "returnType": "(Array<T>)"
        }|*/
        try {
            options = options || {};
            // if sql syntax convert to mongo object syntax
            if ($s.isString(condition)) {
                condition = _processClause(condition);
            }
            var setObject = $s.isObject(setClause) ? setClause : {'$set':null};
            if ($s.isString(setClause)) {
                setClause = setClause.split(',');
                setObject['$set'] = {};
                for (var i = 0, len = setClause.length; i < len; i++) {
                    var keyVal = setClause[i].split("=");
                    setObject['$set'][$s._general_trim(keyVal[0])] = $s._general_trim(keyVal[0]);
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

            var thiz = this,
                _equals = $s.equals,
                _contains = $s.contains,
                _qnp = $s.__queryNestedProperty,
                _clt = $s._contains_lessthan,
                _clte = $s._contains_lessthanequal,
                _cgt = $s._contains_greaterthan,
                _cgte = $s._contains_greaterthanequal,
                _ct = $s._contains_type,
                _cm = $s._contains_mod,
                _isArray = $s.isArray,
                _isNull = $s.isNull,
                _isFunction = $s.isFunction,
                _isObject = $s.isObject,
                _isString = $s.isString,
                _isRegExp = $s.isRegExp,
                _isInt = $s.isInt,
                _refs= [], ifblock = $s._subQuery(condition,null,null,_refs), func = "(function (record,i) {"+
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
                            setObject['$set'].hasOwnProperty(prop) && $s.setProperty(obj, prop, setObject['$set'][prop]);
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
                            obj[prop] = _isNull(obj[prop], setObject['$max'][prop]);
                            var value = obj[prop];
                            value < setObject['$max'][prop] && (obj[prop] = setObject['$max'][prop]);
                        }
                    }
                    if (setObject['$min']) {
                        for (var prop in setObject['$min']) {
                            if (!setObject['$min'].hasOwnProperty(prop)) { continue; }
                            obj[prop] = _isNull(obj[prop], setObject['$min'][prop]);
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
                            if (!setObject['$bit'].hasOwnProperty(prop) || !$s.isInt(obj[prop])) {continue;}
                            if ($s.isInt(setObject['$bit'][prop]['and'])) {
                                obj[prop] &= setObject['$bit'][prop]['and'];
                            } else if ($s.isInt(setObject['$bit'][prop]['or'])) {
                                obj[prop] |= setObject['$bit'][prop]['and'];
                            } else if ($s.isInt(setObject['$bit'][prop]['xor'])) {
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
                            if (each = $s.getProperty(setObject,'$addToSet.'+prop+'.$each')) {
                                for (var i = 0, len = each.length; i < len; i++) {
                                    obj[prop].push(each[i]);
                                }
                            } else {
                                obj[prop].push(setObject['$addToSet'][prop]);
                            }
                        }
                        $s.toSet(obj[prop]);
                    }
                    if (setObject['$pop']) {
                        for (var prop in setObject['$pop']) {
                            if(!setObject['$pop'].hasOwnProperty(prop) || !_isArray(obj[prop])) { continue; }
                            if (setObject['$pop'][prop] == 1) { obj[prop].pop(); }
                            else if (!~setObject['$pop'][prop]) { obj[prop].shift(); }
                        }
                    }
                    if (setObject['$pullAll']) {
                        for (var prop in setObject['$pullAll']) {
                            var arr = $s.getProperty(obj,prop),
                                values = setObject['$pullAll'][prop];
                            if (!_isArray(arr)) { continue; }
                            __pullHelper(arr,values);
                        }
                    }
                    if (setObject['$pull']) {
                        for (var prop in setObject['$pull']) {
                            var arr = $s.getProperty(obj,prop),
                                values = setObject['$pullAll'][prop];
                            if (!_isArray(arr)) { continue; }
                            if (isArray(values)) {
                                __pullHelper(arr,values);
                            } else if ($s.isObject(values)) {
                                $s.delete(values,false);
                            }
                        }
                    }
                    if (setObject['$push']) {
                        for (var prop in setObject['$push']) {
                            if (!setObject['$push'].hasOwnProperty(prop)) { continue; }
                            var each = $s.getProperty(setObject,'$push.'+prop+'.$each'),
                                slice = $s.getProperty(setObject,'$push.'+prop+'.$slice'),
                                sort = $s.getProperty(setObject,'$push.'+prop+'.$sort'),
                                position = $s.getProperty(setObject,'$push.'+prop+'.$position');


                            if (each) {
                                if (_isNull(position)) {
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

                            if (each && !_isNull(slice)) {
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

        } catch (e) {
            error("Array.update", e);
        } finally {
            return this;
        }
    }, true);
    ext(Array, 'upsert', function(records, prop, callback) {
        /*|{
            "info": "Array class extension to upsert records to array",
            "category": "Array",
            "parameters":[
                {"records": "(Array<T>|T) Record(s) to use to insert/update array"}],

            "overloads":[
                {"parameters":[
                    {"records": "(Array<T>|T) Records to use to insert/update array"},
                    {"callback": "(UpsertIterator<T>) Method to use to determine if the records are equal"}]},

                {"parameters":[
                    {"records": "(Array<T>|T) Records to use to insert/update array"},
                    {"prop": "(string) Property to use as the primary key"},
                    {"callback?": "(UpsertIterator<T>) Method to use to determine if the records are equal"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.upsert",
            "typeParameter": "<T>",
            "returnType": "(UpsertResult<T>) returns the information for resulting operation."
        }|*/
        try {
            var usePrimaryKey = true;
            if (!$s.isArray(records)) { records = [records]; }
            if ($s.isFunction(prop)) {
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
                if ($s.isNull(isEqual, $s.equals(record,obj))) {
                    index = sIndex;
                    arr = sArr;
                } else {
                    $s.merge(obj, record);
                }
                index.push(i);
                arr.push(obj);
                ids.splice(ref.index-(j++), 1);
                return true;
            };
            var _equals = $s.equals,
                _contains = $s.contains,
                where = $s.where,
                _isArray = $s.isArray,
                _qnp = $s.__queryNestedProperty,
                _clt = $s._contains_lessthan,
                _clte = $s._contains_lessthanequal,
                _cgt = $s._contains_greaterthan,
                _cgte = $s._contains_greaterthanequal,
                _ct = $s._contains_type,
                _cm = $s._contains_mod,
                _contains = $s.contains,
                _isNull = $s.isNull,
                _isFunction = $s.isFunction,
                _isObject = $s.isObject,
                _isString = $s.isString,
                _isRegExp = $s.isRegExp,
                _isInt = $s.isInt;
                _refs = [],
                ifblock = $s._subQuery(condition,null,null,_refs),
                func = "(function (record,i) {"+
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
                $c.add(this, $s.duplicate(objRef.record));
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
            return {
                insertedIndexes:[],
                updatedIndexes:[],
                unchangedIndexes:[],
                inserted:[],
                updated:[],
                unchanged:[]
            };
        }
    }, true);
    ext(Array, 'where', function(condition, projection, limit) {
        /*|{
            "info": "Array class extension to use mongo or sql queries",
            "category": "Array",
            "featured": true,
            "parameters":[
                {"condition": "(WhereCondition) Query following mongo find/where clause syntax"}],

            "overloads":[
                {"parameters":[
                    {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                    {"limit": "(number) Limit the number of the results returned."}]},

                {"parameters":[
                    {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                    {"projection": "(Object) Indicate which properties to return"}]},

                {"parameters":[
                    {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                    {"useReference": "(Bool) Flag to make a copy instead of using references"}]},

                {"parameters":[
                    {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                    {"projection": "(Object) Indicate which properties to return"},
                    {"limit": "(Int) Limit the number of the results returned."}]},

                {"parameters":[
                    {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                    {"useReference": "(Bool) Flag to make a copy instead of using references"},
                    {"limit": "(Int) Limit the number of the results returned."}]},


                {"parameters":[
                    {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                    {"limit": "(number) Limit the number of the results returned."}]},

                {"parameters":[
                    {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                    {"projection": "(Object) Indicate which properties to return"}]},

                {"parameters":[
                    {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                    {"useReference": "(Bool) Flag to make a copy instead of using references"}]},

                {"parameters":[
                    {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                    {"projection": "(Object) Indicate which properties to return"},
                    {"limit": "(Int) Limit the number of the results returned."}]},

                {"parameters":[
                    {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                    {"useReference": "(Bool) Flag to make a copy instead of using references"},
                    {"limit": "(Int) Limit the number of the results returned."}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
            "typeParameter": "<T>",
            "returnType": "(Array<T>) returns a filtered subset of the array."
        }|*/
        try {
            return $s.where(this, condition, projection, limit);
        } catch (e) {
            error("Array.where", e);
            return [];
        }
    }, true);

    $c.emit = $c.emit || $s.emit;
    module.exports = $c;
}