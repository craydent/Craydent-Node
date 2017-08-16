/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = $c || {}, $s = {};


require('./average');
require('./contains');
require('./date');
require('./getValue');
require('./isSubset');
require('./parseBoolean');
require('./removeAt');
require('./stdev');
require('./toSet');

function __queryNestedProperty(obj, path/*, value*/) {
    if (obj[path]) { return [obj[path]]; }
    var parts = path.split('.'), values = [], i = 0, prop;
    while (prop = parts[i++]) {
        if (!obj.hasOwnProperty(prop)) { return []; }
        if ($c.isArray(obj[prop])) {
            if ($c.isNull(parts[i])) { return obj[prop]; }
            var subPath = parts.slice(i).join('.'), items = obj[prop];
            for (var j = 0, jlen = items.length; j < jlen; j++) {
                values = values.concat(__queryNestedProperty(items[j], subPath));
            }
            return values;
        }
        obj = obj[prop];
    }
    return [obj];
}

function __parseArithmeticExpr (doc,expr,field) {
    try {
        var value, i = 0, sexp;
        switch (field) {
            case "$add":
                value = 0;
                while (sexp = expr["$add"][i++]) {
                    value += __processExpression(doc, sexp);
                }
                return value;
            case "$subtract":
                return __processExpression(doc, expr["$subtract"][0]) - __processExpression(doc, expr["$subtract"][1]);
            case "$multiply":
                value = 1;
                while (sexp = expr["$multiply"][i++]) {
                    value *= __processExpression(doc, sexp) || 0;
                }
                return value;
            case "$divide":
                return __processExpression(doc, expr["$divide"][0]) / __processExpression(doc, expr["$divide"][1]);
            case "$mod":
                return __processExpression(doc, expr["$mod"][0]) % __processExpression(doc, expr["$mod"][1]);
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__parseArithmeticExpr', e);
    }
}
function __parseArrayExpr (doc,expr,field) {
    try {
        switch (field) {
            case "$size":
                return (__processExpression(doc, expr[field], field) || []).length;
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__parseArrayExpr', e);
    }
}
function __parseBooleanExpr (doc,expr,field) {
    try {
        var arr = [], i = 0, obj;
        switch (field) {
            case "$and":
                arr = expr["$and"];
                while (obj = arr[i++]) {
                    if (!__processExpression(doc, arr)) { return false; }
                }
                return true;
            case "$or":
                arr = expr["$or"];
                while (obj = arr[i++]) {
                    if (__processExpression(doc, arr)) { return true; }
                }
                return false;
            case "$not":
                arr = expr["$not"];
                return !__processExpression(doc, arr[0]);
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__parseBooleanExpr', e);
    }
}
function __parseComparisonExpr (doc,expr,field) {
    try {
        var sortOrder = [
                undefined,
                null,
                Number,
                typeof Symbol != "undefined" ? Symbol : "Symbol",
                String,
                Object,
                Array,
                typeof BinData != "undefined" ? BinData : "BinData",
                typeof ObjectId != "undefined" ? ObjectId : "ObjectId",
                Boolean,
                Date,
                typeof Timestamp != "undefined" ? Timestamp : "Timestamp",
                RegExp
            ],
            value1 = __processExpression(doc, expr[field][0]),
            value2 = __processExpression(doc, expr[field][1]),
            cmp = null;

        if (value1 == value2) { cmp = 0; }
        if (value1 < value2) { cmp = -1; }
        if (value1 > value2) { cmp = 1; }

        if ($c.isNull(cmp)) {
            value1 = sortOrder.indexOf(~([null, undefined].indexOf(value1)) ? value1 : value1.constructor);
            value2 = sortOrder.indexOf(~([null, undefined].indexOf(value2)) ? value2 : value2.constructor);

            if (value1 < value2) { cmp = -1; }
            if (value1 > value2) { cmp = 1; }
        }
        switch (field) {
            case "$cmp":
                return cmp;
            case "$eq":
                return cmp === 0;
            case "$gt":
                return cmp === 1;
            case "$gte":
                return cmp === 1 || cmp === 0;
            case "$lt":
                return cmp === -1;
            case "$lte":
                return cmp === -1 || cmp === 0;
            case "$ne":
                return cmp !== 0;
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__parse', e);
    }
}
function __parseCond(doc,expr){
    try {
        if (!$c.isObject(expr) || !expr['$cond']) { return expr; }
        // parse $cond
        var condition = expr['$cond'],
            boolExpression,
            thenStatement,
            elseStatement;
        if ($c.isArray(condition)) {
            boolExpression = condition[0];
            thenStatement = condition[1];
            elseStatement = condition[2];
        } else {
            boolExpression = condition["if"];
            thenStatement = condition["then"];
            elseStatement = condition["else"];
        }
        return __processExpression(doc, boolExpression) ? thenStatement : elseStatement;
    } catch (e) {
        $c.error && $c.error('aggregate.__parseCond', e);
    }
}
function __parseConditionalExpr (doc,expr,field) {
    try {
        switch (field) {
            case "$cond":
                return __parseCond(doc, expr);
            case "$ifNull":
                var value = __processExpression(doc, expr["$ifNull"][0]);
                return $c.isNull(value,__processExpression(doc, expr["$ifNull"][1]));
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__parseConditionExpr', e);
    }
}
function __parseDateExpr (doc,expr,field) {
    var dt = __processExpression(doc, expr[field]);
    try {
        switch (field) {
            case "$dayOfYear":
                return $c.getDayOfYear(dt);
            case "$dayOfMonth":
                return dt.getDate();
            case "$dayOfWeek":
                return dt.getDay() + 1;
            case "$year":
                return dt.getFullYear();
            case "$month":
                return dt.getMonth() + 1;
            case "$week":
                return $c.getWeek(dt);
            case "$hour":
                return dt.getHours();
            case "$minute":
                return dt.getMinutes();
            case "$second":
                return dt.getSeconds();
            case "$millisecond":
                return dt.getMilliseconds();
            case "$dateToString":
                dt = __processExpression(doc, expr[field].date);
                return $c.format(dt,expr[field].format);
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__parseDateExpr', e);
    }
}
function __parseSetExpr (doc,expr,field) {
    try {
        var i = 1, exp, j = 0, jlen, st, set1, set2, rtnSet, errorMessage, arr1, arr2, falseCondition;
        switch (field) {
            case "$setEquals":
                while (exp = expr[field][i++]) {
                    set1 = $c.duplicate(__processExpression(doc, expr[field][i - 2]));
                    set2 = $c.duplicate(__processExpression(doc, exp));
                    if (!$c.isArray(set1) || !$c.isArray(set2)){
                        //noinspection ExceptionCaughtLocallyJS
                        throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                        $c.capitalize(typeof (!$c.isArray(set1) ? set1 : set2));
                    }
                    $c.toSet(set1);
                    $c.toSet(set2);
                    if (set1.length != set2.length) { return false; }
                    for (jlen = set1.length; j < jlen; j++) {
                        if (!~set2.indexOf(set1[j])) { return false; }
                    }
                }
                return true;
            case "$setIntersection":
                rtnSet = $c.duplicate(__processExpression(doc, expr[field][0]));
                errorMessage = "Exception: All operands of $setIntersection must be arrays. One argument is of type: ";
                if(!$c.isArray(rtnSet)) {
                    throw errorMessage + $c.capitalize((typeof rtnSet));
                }
                $c.toSet(rtnSet);
                while (exp = expr[field][i++]) {
                    set1 = $c.duplicate(__processExpression(doc, exp));
                    if (!$c.isArray(set1)){
                        throw errorMessage + $c.capitalize(typeof set1);
                    }
                    $c.toSet(set1);
                    if (set1.length < rtnSet.length) {
                        var settmp = set1;
                        set1 = rtnSet;
                        rtnSet = settmp;
                    }
                    for (jlen = rtnSet.length; j < jlen; j++) {
                        if (!~set1.indexOf(rtnSet[j])) { $c.removeAt(rtnSet,j--); jlen--; }
                    }
                    if (!rtnSet.length) { return rtnSet; }
                }
                return rtnSet;
            case "$setUnion":
                rtnSet = $c.duplicate(__processExpression(doc, expr[field][0]));
                errorMessage = "Exception: All operands of $setUnion must be arrays. One argument is of type: ";
                if(!$c.isArray(rtnSet)) {
                    //noinspection ExceptionCaughtLocallyJS
                    throw errorMessage + $c.capitalize(typeof rtnSet);
                }
                while (exp = expr[field][i++]) {
                    var arr = $c.duplicate(__processExpression(doc, exp));
                    if (!$c.isArray(arr)){
                        //noinspection ExceptionCaughtLocallyJS
                        throw errorMessage + $c.capitalize(typeof arr);
                    }
                    rtnSet = rtnSet.concat(arr);
                }
                return $c.toSet(rtnSet);
            case "$setDifference":
                arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                arr2 = $c.duplicate(__processExpression(doc, expr[field][1]));
                rtnSet = [];
                if (!$c.isArray(arr1) || !$c.isArray(arr2)){
                    //noinspection ExceptionCaughtLocallyJS
                    throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                    $c.capitalize(typeof (!$c.isArray(arr1) ? arr1 : arr2));
                }
                for (jlen = arr1.length; j < jlen; j++) {
                    st = arr1[j];
                    if (!~arr2.indexOf(st) && !~rtnSet.indexOf(st)) {
                        rtnSet.push(st);
                    }
                }
                return rtnSet;
            case "$setIsSubset":
                arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                arr2 = $c.duplicate(__processExpression(doc, expr[field][1]));
                rtnSet = [];
                if (!$c.isArray(arr1) || !$c.isArray(arr2)){
                    //noinspection ExceptionCaughtLocallyJS
                    throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                    $c.capitalize(typeof (!$c.isArray(arr1) ? arr1 : arr2));
                }
                return $c.isSubset(arr1,arr2);
            case "$anyElementTrue":
                arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                falseCondition = [undefined,null,0,false];

                while (st = arr1[j++]) {
                    if (!~falseCondition.indexOf(st)) { return true; }
                }
                return false;
            case "$allElementsTrue":
                arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                falseCondition = [undefined,null,0,false];

                for (jlen = arr1.length; j < jlen; j++) {
                    if (~falseCondition.indexOf(arr1[j])) { return false; }
                }
                return true;
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__parseSetExpr', e);
    }
}
function __parseStringExpr (doc,expr,field) {
    try {
        switch (field) {
            case "$concat":
                var value = "", i = 0, exp;
                while (exp = expr["$concat"][i++]) {
                    value += __processExpression(doc, exp);
                }
                return value;
            case "$substr":
                var index = expr["$substr"][1], length = expr["$substr"][2] < 0 ? undefined : expr["$substr"][2];
                return __processExpression(doc, expr["$substr"][0]).substr(index, length);
            case "$toLower":
                return (__processExpression(doc, expr["$toLower"]) || "").toLowerCase();
            case "$toUpper":
                return (__processExpression(doc, expr["$toLower"]) || "").toUpperCase();
            case "$strcasecmp":
                var value1 = (__processExpression(doc, expr["$strcasecmp"][0]) || "").toString(),
                    value2 = (__processExpression(doc, expr["$strcasecmp"][1]) || "").toString();
                if (value1 == value2) { return 0; }
                if (value1 < value2) { return -1; }
                if (value1 > value2) { return 1; }
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__parseStringExpr', e);
    }
}
function __parseVariableExpr (doc,expr,field) {
    try {
        switch (field) {
            case "$map":
                var input = __processExpression(doc, expr[field].input),
                    v_as = "$" + expr[field].as,
                    v_in = expr[field]["in"];

                for (var i = 0, len = input.length; i < len; i++) {
                    doc[v_as] = input[i];
                    input[i] = __processExpression(doc, v_in);
                    delete doc[v_as];
                }
                return input;
            case "$let":
                var vars = expr[field].vars,
                    rmProps = [], rtn = null;
                for (var prop in vars) {
                    if (!vars.hasOwnProperty(prop)) { continue; }
                    doc["$" + prop] = __processExpression(doc, vars[prop]);
                    rmProps.push(prop);
                }
                rtn = __processExpression(doc, expr[field]["in"]);
                for (var j = 0, jlen = rmProps.length; j < jlen; j++) {
                    delete doc[rmProps[j]];
                }
                return rtn;
        }

    } catch (e) {
        $c.error && $c.error('aggregate.__parseVariableExpr', e);
    }
}
function __processAccumulator (doc,accumulator,previousValue,meta) {
    try {
        var value = __processExpression(doc,
            accumulator["$sum"] ||
            accumulator["$avg"] ||
            accumulator["$first"] ||
            accumulator["$last"] ||
            accumulator["$max"] ||
            accumulator["$min"] ||
            accumulator["$push"] ||
            accumulator["$addToSet"] ||
            accumulator["$stdDevPop"] ||
            accumulator["$stdDevSamp"]
        );
        switch (true) {
            case !!accumulator["$sum"]:
                return (value || 0) + (previousValue || 0);
            case !!accumulator["$avg"]:
                previousValue = previousValue || [];
                if (!$c.isNull(value)) { previousValue.push(value); }
                if (meta.length == meta.index + 1) { previousValue = $c.average(previousValue); }
                return previousValue;
            case !!accumulator["$first"]:
                if($c.isNull(previousValue)) { previousValue = value; }
                return previousValue;
            case !!accumulator["$last"]:
                return $c.isNull(value, previousValue);
            case !!accumulator["$max"]:
                if ($c.isNull(previousValue)) { previousValue = -9007199254740991; }
                if ($c.isNull(value)) { value = -9007199254740991 }
                if (meta.length == meta.index + 1 && value == previousValue == -9007199254740991) { return undefined; }
                return Math.max(value, previousValue);
            case !!accumulator["$min"]:
                if ($c.isNull(previousValue)) { previousValue = 9007199254740991; }
                if ($c.isNull(value)) { value = 9007199254740991 }
                if (meta.length == meta.index + 1 && value == previousValue == 9007199254740991) { return undefined; }
                return Math.min(value, (previousValue || 9007199254740991));
            case !!accumulator["$push"]:
                previousValue = previousValue || [];
                if (!$c.isNull(value)) { previousValue.push(value); }
                return previousValue;
            case !!accumulator["$addToSet"]:
                previousValue = previousValue || [];
                if (!$c.isNull(value) && !~previousValue.indexOf(value)) { previousValue.push(value); }
                return previousValue;
            case !!accumulator["$stdDevSamp"]:
                if (meta.sample && ~meta.sample.indexOf(doc)) {
                    if (!$c.isNull(value)) {
                        previousValue = previousValue || [];
                        previousValue.push(value);
                    }
                }
                if (meta.length == meta.index + 1) {
                    previousValue = $c.stdev(previousValue || []);
                }
                return $c.isNull(previousValue) ? null : previousValue;
            case !!accumulator["$stdDevPop"]:
                if (!$c.isNull(value)) {
                    previousValue = previousValue || [];
                    previousValue.push(value); }
                if (meta.length == meta.index + 1) {
                    previousValue = $c.stdev(previousValue || []);
                }
                return $c.isNull(previousValue) ? null : previousValue;
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__processAccumulator', e);
    }
}

function __processExpression (doc,expr) {
    try {
        if ($c.isString(expr)) {
            if (expr[0] == "$") { expr = expr.substr(1); }
            return $c.getProperty(doc, expr.replace("$CURRENT.", ""));
        }
        if (!$c.isObject(expr)) { return expr; }
        for (var field in expr) {
            if (!expr.hasOwnProperty(field)) { continue; }
            var value = expr[field],
                literalKeys = ["$literal"],
                boolKeys = ["$and", "$or", "$not"],
                setKeys = ["$setEquals", "$setIntersection", "$setUnion", "$setDifference", "$setIsSubset", "$anyElementTrue", "$allElementsTrue"],
                compareKeys = ["$cmp", "$eq", "$gt", "$gte", "$lt", "$lte", "$ne"],
                arithmeticKeys = ["$add", "$subtract", "$multiply", "$divide", "$mod"],
                stringKeys = ["$concat", "$substr", "$toLower", "$toUpper", "$strcasecmp"],
                arrayKeys = ["$size"],
                variableKeys = ["$map", "$let"],
                dateKeys = ["$dayOfYear", "$dayOfMonth", "$dayOfWeek", "$year", "$month", "$week", "$hour", "$minute", "$second", "$millisecond", "$dateToString"],
                conditionalKeys = ["$cond", "$ifNull"];

            switch (true) {
                case !!~literalKeys.indexOf(field):
                    return expr;
                case !!~boolKeys.indexOf(field):
                    return __parseBooleanExpr(doc, expr, field);
                case !!~setKeys.indexOf(field):
                    return __parseSetExpr(doc, expr, field);
                case !!~compareKeys.indexOf(field):
                    return __parseComparisonExpr(doc, expr, field);
                case !!~arithmeticKeys.indexOf(field):
                    return __parseArithmeticExpr(doc, expr, field);
                case !!~stringKeys.indexOf(field):
                    return __parseStringExpr(doc, expr, field);
                case !!~arrayKeys.indexOf(field):
                    return __parseArrayExpr(doc, expr, field);
                case !!~variableKeys.indexOf(field):
                    return __parseVariableExpr(doc, expr, field);
                case !!~dateKeys.indexOf(field):
                    return __parseDateExpr(doc, expr, field);
                case !!~conditionalKeys.indexOf(field):
                    return __parseConditionalExpr(doc, expr, field);
                default:
                    __processExpression (doc,value);
                    break;
            }
        }
    } catch (e) {
        $c.error && $c.error('aggregate.__parseExpression', e);
    }
}



function _binarySearch(sarr, options){
    var prop = options.prop,
        value = options.condition,
        sindex = $c.isNull(options.start_index) ? 0 : options.start_index,
        eindex = $c.isNull(options.end_index) ? sarr.length - 1 : options.end_index,
        findIndex = options.find_index;

    // sindex = $c.isNull(sindex) ? 0 : sindex;
    // eindex = $c.isNull(eindex) ? sarr.length - 1 : eindex;
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
        return _binarySearch(sarr, {
            prop: prop,
            condition:value,
            start_index: sindex,
            start_index: index,
            find_index: findIndex
        });
    }

    if (sarr[index][prop] < value) {
        return _binarySearch(sarr,{
            prop: prop,
            condition:value,
            start_index: index,
            start_index: eindex,
            find_index: findIndex
        });
    }
    while (sarr[sindex][prop] < value) { sindex++; }
    while (sarr[eindex][prop] > value) { eindex--; }

    if (findIndex) { return eindex; }

    var len = eindex - sindex + 1;
    if (sindex == 0 && len == sarr.length) { return sarr; }
    return sarr.slice(sindex, eindex + len);
}
function _copyWithProjection(projection, record, preserveProperties) {
    var copy = {}, len = 0;
    projection = projection || "*";
    if ($c.isString(projection)) {
        projection = projection.split(',');
    }
    if ($c.isArray(projection)) {
        if (!(len = projection.length)) {
            copy = $c.duplicate(record);
            return copy;
        }
        var arr = projection;
        projection = {};
        var i = 0, a;
        while (a = arr[i++]) {
            projection[a] = 1;
        }
    }

    for (var prop in projection) {
        if (projection.hasOwnProperty(prop) && projection[prop]) {
            var val = $c.getProperty(record,prop) || null;
            if (prop == "*") {
                copy = $c.duplicate(record,true);
            } else if ($c.parseBoolean(projection[prop])) {
                if (preserveProperties || !$c.isNull(val)) {
                    $c.setProperty(copy, prop, val);
                }
            } else if (!$c.isObject(projection[prop]) && !val) {
                copy[prop] = projection[prop];
            } else if ($c.isObject(projection[prop]) || val && !$c.isArray(val)) {
                copy[prop] = __processExpression(record,projection[prop]);
            } else if (val) {
                var del = true;
                if (prop.slice(-2) == ".$") {
                    prop = prop.slice(0,-2);
                    copy[prop] = val.slice(0,1);
                } else if (projection[prop]['$elemMatch']) {
                    copy[prop] = where(val,projection[prop]['$elemMatch']).slice(0,1);
                } else if (projection[prop]['$slice']) {
                    var start = 0, length = $c.isInt(projection[prop]['$slice']) ? projection[prop]['$slice'] : 0;

                    if ($c.isArray(projection[prop]['$slice'])) {
                        start = projection[prop]['$slice'][0];
                        length = projection[prop]['$slice'][1];
                    }
                    copy[prop] = val.slice(start, length);
                } else if (projection[prop]) {
                    del = false;
                    $c.setProperty(copy, prop, val);
                }
                if (del && !copy[prop].length) {
                    delete copy[prop];
                }
            } else {
                copy[prop] = projection[prop];
            }
        }
    }
    return copy;
}
function _subQuery(query, field, index ,_whereRefs) {
    try {
        _whereRefs = _whereRefs || [];
        if (!$c.isObject(query)) {
            if (~field.indexOf('.')) { return "$s.equals($s.getProperty(record.'" + field + "'), " + $c.parseRaw(query) + ")";}
            return "$s.equals(record['" + field + "'], " + $c.parseRaw(query) + ")";
        }
        var expression = "true", comparison_map = {
            "$lt":"_clt",
            "$lte":"_clte",
            "$gt":"_cgt",
            "$gte":"_cgte"
        };


        // prep multiple subqueries
        for (var prop in query) {
            if (!query.hasOwnProperty(prop)){ continue; }
            switch(prop) {
                // value is the record in the array
                // q is the conditional value
                case "$equals":
                case "$eq":
                case "$regex":
                case "$ne":
                    var val = $c.getValue(query[prop]), q = "(" + $c.parseRaw(val) + ")";
                    if ($c.isFunction(val)) {
                        q += "(record,'" + field + "',index)";
                    } else {
                        q = "$s.contains(values," + q + ")";
                    }
                    expression += " && ((values = _qnp(record, '" + field + "')).length && " + (prop == "$ne" ? "!" : "") + q + ")";
                    break;
                case "$lt":
                case "$lte":
                case "$gt":
                case "$gte":
                    expression += " && ((values = _qnp(record, '" + field + "')).length && " + comparison_map[prop] + "(values," + $c.parseRaw(query[prop]) + "))";
                    break;
                case "$exists":
                    expression += " && ((finished = {validPath:0}),$s.getProperty(record,'" + field + "','.',finished),$s.parseBoolean(finished.validPath) == " + query['$exists'] + ")";
                    break;
                case "$type":
                    var qt = $c.isNull(query["$type"]) ? "!" : "";
                    expression += " && (" + qt + "(values = _qnp(record, '" + field + "')).length && _ct(values," + $c.getFuncName(query['$type']) + "))";
                case "$text":
                    //return record.getProperty(field).contains(query['$search']);
                    break;
                case "$mod":
                    var qm = $c.isArray(query['$mod']);
                    expression += " && ((values = _qnp(record, '" + field + "')).length && " + qm + " && _cm(values," + $c.parseRaw(query[prop]) + "))";
                    break;
                case "$all":
                    var all = $c.parseRaw(query['$all']) || undefined;
                    expression += " && (values = _qnp(record, '" + field + "')),(all = " + all + "),($s.isArray(values[0]) && $s.isArray(all)) && (function(){ for (var j = 0, jlen = all.length; j < jlen; j++){ if (!$s.contains(values[0],all[j])) { return false; }} return true;})()";
                    break;
                case "$size":
                    var ival = parseInt(query['$size']);
                    expression += " && (values = _qnp(record, '" + field + "')[0]),($s.isArray(values) ? (" + ival + " === values.length) : (values == undefined && 0 === " + ival + "))";
                    break;
                case "$where":
                    var isfunc = $c.isFunction(query['$where']);
                    if (isfunc) {
                        _whereRefs.push(query['$where']);
                    }
                    var val = "(" + (isfunc ? "__where_cb" + _whereRefs.length : "function(){return (" + query['$where'] + ");}") + ")";
                    expression += " && " + val + ".call(record)";
                    break;
                case "$elemMatch":
                    expression += " && (values = _qnp(record, '" + field + "')[0]),($s.isArray(values) && !!where(values," + $c.parseRaw(query['$elemMatch']) + ",1).length)";
                    break;
                case "$or":
                case "$nor":
                    var ors = query[prop],o = 0, or,nor = "";
                    if (!$c.isArray(ors)) { return false; }
                    if (prop == "$nor") { nor = "!"; }
                    expression += " && " + nor + "(";
                    while (or = ors[o++]) {
                        expression += "(" + _subQuery(or, field, index, _whereRefs) + ") || ";
                    }
                    expression += "false)";

                    break;
                case "$and":
                    var ands = query['$and'],a = 0, and;
                    if (!$c.isArray(ands)) { return false; }
                    expression += " && (";
                    while (and = ands[a++]) {
                        expression += "(" + _subQuery(and, field, index, _whereRefs) + ") && ";
                    }
                    expression += "true)";

                    break;
                case "$not":
                    if (!$c.isObject(query['$not'])) {
                        expression += " && $s.contains(values, "+$c.parseRaw(query['$not'])+")";
                        break;
                    }

                    expression += " && !(" + _subQuery(query[prop],field,null,_whereRefs) + ")";
                    break;

                case "$in":
                case "$nin":
                    expression += " && " + (prop == "$nin" ? "!" : "") + "((values = _qnp(record, '" + field + "')[0]),$s.contains(" + $c.parseRaw(query[prop]) + ",values))";
                    break;
                default:
                    expression += " && " + _subQuery(query[prop], $c.replace_all(prop,'\'','\\\''),null,_whereRefs);
                    break;
            }
        }
        return expression;
    } catch (e) {
        $c.error && $c.error('_subQuery', e);
    }
}

function where (obj, condition, projection, limit){
    try {
        var useReference = !projection,
            _qnp = __queryNestedProperty,
            _clt = $c._contains_lessthan,
            _clte = $c._contains_lessthanequal,
            _cgt = $c._contains_greaterthan,
            _cgte = $c._contains_greaterthanequal,
            _ct = $c._contains_type, _cm = $c._contains_mod;

        // if no condition was given, return all
        if (!condition) { return obj.slice(0,limit); }
        if (limit === 0) { return []; }


        if ($c.isFunction(condition) && !projection) {
            var arr = obj.filter(function(item){ return condition.call(item); });
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

        limit = limit || 0;//obj.length;
        var indexProps = [];
        if (obj.__indexes) {
            for (var prop in condition) {
                if (condition.hasOwnProperty(prop)) {
                    if (obj.__indexes[prop]) {
                        indexProps.push(prop);
                    }
                }
            }
        }
        var arr = obj, ipHasLength = !!indexProps.length;
        if (ipHasLength) {
            var prop, i = 0;

            var orderedLists = [], fi = 0,len = arr.length;
            while (prop = indexProps[i++]) {
                var ordered = _binarySearch(arr.__indexes[prop], {
                    prop: prop,
                    condition: condition[prop],
                    find_index: !simple
                });
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

        if (simple) {
            // limit = limit || 0;//obj.length;
            // var props = [],indexProps = [];
            // if (obj.__indexes) {
            //     for (var prop in condition) {
            //         if (condition.hasOwnProperty(prop)) {
            //             //props.push(prop);
            //             if (obj.__indexes[prop]) {
            //                 indexProps.push(prop);
            //             }
            //         }
            //     }
            // }
            // var arr = obj,ipHasLength = !!indexProps.length;
            // if (ipHasLength) {
            //     var prop, i = 0;
            //
            //     var orderedLists = [], fi = 0,len = arr.length;
            //     while (prop = indexProps[i++]) {
            //         var ordered = _binarySearch(arr.__indexes[prop],prop,condition[prop]);
            //         if (len > ordered.length) {
            //             len = ordered.length;
            //             fi = i - 1;
            //         }
            //         orderedLists.push(ordered);
            //     }
            //     if (len < 1000) {
            //         var farr = orderedLists[fi];
            //         arr = [];
            //         for (var i = 0; i < len; i++) {
            //             var addit = true;
            //             for (var j = 0, jlen = orderedLists.length; j < jlen; j++) {
            //                 if (fi == j) { continue; }
            //                 if (!~orderedLists[j].indexOf(farr[i])) {
            //                     addit = false;
            //                     break;
            //                 }
            //             }
            //             addit && arr.push(farr[i]);
            //         }
            //     }
            // }
            var boolCond = "", useQueryNested = false, func = function (cobj,index,arr) {
                if (arr.temp_count++ < obj.temp_limit) { return false; }
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
                    boolCond += "$s.equals(cobj[\"" + prop + "\"]," + JSON.stringify(condition[prop]) + ") && ";
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
            rarr = obj.filter(func);
        } catch(e) {
            if (e != 'keep going') { throw e;}
        }
        if (!useReference) { return arr; }
        return rarr;
    } catch (e) {
        $c.error && $c.error("Array.where", e);
        return false;
    }
}

function init (ctx) {
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./average')($c);
    require('./contains')($c);
    require('./date')($c);
    require('./getValue')($c);
    require('./isSubset')($c);
    require('./parseBoolean')($c);
    require('./removeAt')($c);
    require('./stdev')($c);
    require('./toSet')($c);

    $s = $c;
    $c.__queryNestedProperty = ctx.__queryNestedProperty = $c.__queryNestedProperty || ctx.__queryNestedProperty || __queryNestedProperty;
    $c.__parseCond = ctx.__parseCond = $c.__parseCond || ctx.__parseCond || __parseCond;
    $c.__processAccumulator = ctx.__processAccumulator = $c.__processAccumulator || ctx.__processAccumulator || __processAccumulator;
    $c.__processExpression = ctx.__processExpression = $c.__processExpression || ctx.__processExpression || __processExpression;
    $c._binarySearch = ctx._binarySearch = $c._binarySearch || ctx._binarySearch || _binarySearch;
    $c._copyWithProjection = ctx._copyWithProjection = $c._copyWithProjection || ctx._copyWithProjection || _copyWithProjection;
    $c._subQuery = ctx._subQuery = $c._subQuery || ctx._subQuery || _subQuery;
    $c.where = ctx.where = $c.where || ctx.where || where;
}
init.__queryNestedProperty = __queryNestedProperty;
init.__parseCond = __parseCond;
init.__processAccumulator = __processAccumulator;
init.__processExpression = __processExpression;
init._binarySearch = _binarySearch;
init._copyWithProjection = _copyWithProjection;
init._subQuery = _subQuery;
init.where = where;

module.exports = init;

