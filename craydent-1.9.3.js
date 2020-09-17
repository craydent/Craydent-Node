

(function (context, noconflict) {
    var __version = "1.9.3",
        __thisIsNewer = true;

    if ($w.__craydentLoaded || typeof ($c) != "undefined") {
        var __current = ($w.__craydentVersion || $c.VERSION || "").split("."),
            __thisVersion = __version.split(".");
        if (__thisIsNewer = __isNewer(__current, __thisVersion)) {
            $c.VERSION = __version;
        }
    }
    function __isNewer(loadedVersion, thisVersion) {
        if (loadedVersion[0] == thisVersion[0]) {
            loadedVersion.splice(0, 1);
            thisVersion.splice(0, 1);
            if (!thisVersion.length || !loadedVersion.length) {
                return false;
            }
            return __isNewer(loadedVersion, thisVersion);
        }
        return parseInt(loadedVersion[0]) < parseInt(thisVersion[0]);
    }
    function __cleanUp() {
        try {
            delete $w.__current;
            delete $w.__thisVersion;
            delete $w.__thisIsNewer;
            delete $w.__isNewer;
            delete $w.__version;
            delete $w._ie;
            delete $w._droid;
            delete $w._amay;
            delete $w._browser;
            delete $w._os;
            delete $w._device;
            delete $w._engine;
        } catch (e) {
            $w.__current = undefined;
            $w.__thisVersion = undefined;
            $w.__thisIsNewer = undefined;
            $w.__isNewer = undefined;
            $w.__version = undefined;
            $w._ie = undefined;
            $w._droid = undefined;
            $w._amay = undefined;
            $w._browser = undefined;
            $w._os = undefined;
            $w._device = undefined;
            $w._engine = undefined;
        }
    }

    if (__thisIsNewer) {
        $w.__craydentVersion = __version;
        var _ao, _ah, _df, _irregularNouns = {
            "addendum": "addenda",
            "alga": "algae",
            "alumna": "alumnae",
            "apparatus": "apparatuses",
            "appendix": "appendices",
            "bacillus": "bacilli",
            "bacterium": "bacteria",
            "beau": "beaux",
            "bison": "bison",
            "bureau": "bureaus",
            "child": "children",
            "corps": "corps",
            "corpus": "corpora",
            "curriculum": "curricula",
            "datum": "data",
            "deer": "deer",
            "die": "dice",
            "diagnosis": "diagnoses",
            "erratum": "errata",
            "fireman": "firemen",
            "focus": "focuses",
            "foot": "feet",
            "genus": "genera",
            "goose": "geese",
            "index": "indices",
            "louse": "lice",
            "man": "men",
            "matrix": "matrices",
            "means": "means",
            "medium": "media",
            "memo": "memos",
            "memorandum": "memoranda",
            "moose": "moose",
            "mouse": "mice",
            "nebula": "nebulae",
            "ovum": "ova",
            "ox": "oxen",
            "person": "people",
            "radius": "radii",
            "series": "series",
            "sheep": "sheep",
            "scissors": "scissors",
            "species": "species",
            "stratum": "strata",
            "syllabus": "syllabi",
            "tableau": "tableaux",
            "that": "those",
            "this": "these",
            "tooth": "teeth",
            "vertebra": "vertebrae",
            "vita": "vitae",
            "woman": "women",
            "zero": "zeros"
        };
        /*IE prototype workaround*/
        if (!$w.HTMLElement) {
            $w.HTMLElement = foo;
            var _createElement = $d.createElement;

            $d.createElement = function (tag) {
                try {
                    var _elem = _createElement(tag);
                    _setDOMElementProperties(_elem);
                    return _elem;
                } catch (e) {
                    error("DOM.createElement", e);
                }
            };

            var _getElementById = $d.getElementById;

            $d.getElementById = function (id) {
                try {
                    var _elem = _getElementById(id);
                    _setDOMElementProperties(_elem);

                    return _elem;
                } catch (e) {
                    error("DOM. getElementById", e);
                }
            };

            var _getElementsByTagName = $d.getElementsByTagName;

            $d.getElementsByTagName = function (tag) {
                try {
                    var _arr = _getElementsByTagName(tag);
                    for (var _elem = 0; _elem < _arr.length; _elem++) {
                        try {
                            if (isNull(_arr[_elem].name)) {
                                _setDOMElementProperties(_arr[_elem]);
                            }
                        } catch (e) { }
                    }
                    return _arr;
                } catch (e) {
                    error("DOM.getElementsByTagName", e);
                }
            };
            var _getElementsByClassName = $d.getElementsByClassName || function (className, tag, elm) {
                try {
                    tag = tag || "*";
                    elm = elm || $d;
                    var classes = className.split(" "), xpath = "", xhtmlNamespace = "http://www.w3.org/1999/xhtml", namespaceResolver = $d.documentElement.namespaceURI === xhtmlNamespace ? xhtmlNamespace : null, elems = [], cursor, node;
                    xpath = ".//" + tag + fillTemplate("[contains(concat(' ', @class, ' '), ' ${this} ')]", classes);
                    try {
                        cursor = $d.evaluate(query, elm, namespaceResolver, 0, null);
                    } catch (e) {
                        cursor = $d.evaluate(query, elm, null, 0, null);
                    }
                    while (node = cursor.iterateNext()) {
                        elems.push(node);
                    }
                    return elems;
                } catch (e) {
                    return [];
                }
            };
            $d.getElementsByClassName = function (className, tag, elm) {
                try {
                    var _arr = _getElementsByClassName(className, tag, elm);
                    for (var _elem = 0; _elem < _arr.length; _elem++) {
                        try {
                            if (isNull(_arr[_elem].name)) {
                                _setDOMElementProperties(_arr[_elem]);
                            }
                        } catch (e) { }
                    }
                    return _arr;
                } catch (e) {
                    error("DOM.getElementsByClassName", e);
                }
            };

            if (!$d.querySelectorAll && !$d.querySelector) {
                $d.querySelectorAll = function (selector) {
                    return _querySelectorAll(selector, Infinity);
                };
                $d.querySelector = function (selector) {
                    return _querySelectorAll(selector, 1)[0] || null;
                }
            }
        }
        /*----------------------------------------------------------------------------------------------------------------
        /-	define functions preventing overwriting other framework functions
        /---------------------------------------------------------------------------------------------------------------*/
        /*----------------------------------------------------------------------------------------------------------------
        /-	private methods
        /---------------------------------------------------------------------------------------------------------------*/
        function __add_fillTemplate_ref(obj) {
            try {
                var uid = suid();
                fillTemplate.refs["ref_" + fillTemplate.refs.length] = uid;
                fillTemplate.refs[uid] = obj;
                fillTemplate.refs.push(obj);
                return uid;
            } catch (e) {
                error('fillTemplate.__add_fillTemplate_ref', e);
            }
        }
        function __and() {
            try {
                var a = 0;
                for (var len = arguments.length; a < len; a++) {
                    var arg = arguments[a];
                    if (!arg) { return ""; }
                }
                return arguments[a - 1];
            } catch (e) {
                error('fillTemplate.__and', e);
            }
        }
        function __clean_micro_templates() {
            var _micro_templates = fillTemplate._micro_templates;
            for (var id in _micro_templates) {
                if (!_micro_templates.hasOwnProperty(id)) { continue; }
                if (!$CSS("[data-craydent-bind*='" + id + "']").length) { delete _micro_templates[id]; }
            }
        }
        function __contextualizeMethods(ctx) {
            try {

                ctx.JSONPA = JSON.parseAdvanced;
                ctx.JSONSA = JSON.stringifyAdvanced;

                ctx = ctx || {};
                ctx.Benchmarker = Benchmarker;
                ctx.Cursor = Cursor;
                ctx.JSZip = JSZip;
                ctx.OrderedList = OrderedList;
                ctx.Queue = Queue;
                ctx.Request = Request;
                ctx.Set = Set;

                ctx.ChromeVersion = ChromeVersion;
                ctx.FirefoxVersion = FirefoxVersion;
                ctx.IEVersion = IEVersion;
                ctx.OperaVersion = OperaVersion;
                ctx.SafariVersion = SafariVersion;

                ctx.isAmaya = isAmaya;
                ctx.isAndroid = isAndroid;
                ctx.isBlackBerry = isBlackBerry;
                ctx.isChrome = isChrome;
                ctx.isFirefox = isFirefox;
                ctx.isGecko = isGecko;
                ctx.isIE = isIE;
                ctx.isIE6 = isIE6;
                ctx.isIPad = isIPad;
                ctx.isIPhone = isIPhone;
                ctx.isIPod = isIPod;
                ctx.isKHTML = isKHTML;
                ctx.isLinux = isLinux;
                ctx.isMac = isMac;
                ctx.isMobile = isMobile;
                ctx.isOpera = isOpera;
                ctx.isPalmOS = isPalmOS;
                ctx.isPresto = isPresto;
                ctx.isPrince = isPrince;
                ctx.isSafari = isSafari;
                ctx.isSymbian = isSymbian;
                ctx.isTrident = isTrident;
                ctx.isWebkit = isWebkit;
                ctx.isWindows = isWindows;
                ctx.isWindowsMobile = isWindowsMobile;

                ctx.$COMMIT = $COMMIT;
                ctx.$COOKIE = $COOKIE;
                ctx.$DELETE = $DELETE;
                ctx.$GET = $GET;
                ctx.$ROLLBACK = $ROLLBACK;
                ctx.$SET = $SET;

                ctx.addObjectPrototype = addObjectPrototype;
                ctx.ajax = ajax;
                ctx.awaitable = yieldable;
                ctx.cacheImages = cacheImages;
                ctx.cout = cout;
                ctx.cuid = cuid;
                ctx.emit = emit;
                ctx.error = error;
                ctx.exclude = exclude;
                ctx.fillTemplate = fillTemplate;
                ctx.foo = foo;
                ctx.getUniqueId = getUniqueId;
                ctx.isNull = isNull;
                ctx.killPropagation = killPropagation;
                ctx.logit = logit;
                ctx.namespace = namespace;
                ctx.next = next;
                ctx.noop = noop;
                ctx.now = now;
                ctx.observe = observe;
                ctx.parseAdvanced = parseAdvanced;
                ctx.parseBoolean = parseBoolean;
                ctx.parseRaw = parseRaw;
                ctx.rand = rand;
                ctx.stringifyAdvanced = stringifyAdvanced;
                ctx.suid = suid;
                ctx.syncroit = syncroit;
                ctx.tryEval = tryEval;
                ctx.wait = wait;
                ctx.xmlToJson = xmlToJson;
                ctx.yieldable = yieldable;
                ctx.zipit = zipit;
                return ctx;
            } catch (e) {
                error('__contextualizeMethods', e);
            }
        }
        function __convert_regex_safe(reg_str) {
            try {
                return reg_str.replace(/\\/gi, "\\\\")
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
                    .replace('\n', '\\n');
            } catch (e) {
                error('__convert_regex_safe', e);
            }
        }
        function __count(arr) {
            try {
                return arr.length;
            } catch (e) {
                error('fillTemplate.count', e);
            }
        }
        function __create_index(obj, indexes) {
            indexes = _condense(indexes, true);
            if (!indexes || !indexes.length) { return false; }
            if (!_isArray(indexes)) { indexes = indexes.split(','); }
            // obj.__indexes = {};
            obj.__indexed_buckets = obj.__indexed_buckets || {};
            for (var i = 0, len = indexes.length; i < len; i++) {
                var prop = indexes[i], arr = obj.slice();

                var bucket = obj.__indexed_buckets[prop] = {};
                // bucket.__sorted_array = arr;
                var keys = bucket.__bucket__keys = [];
                // obj.__indexes[prop] = arr;
                // obj.__indexes.buckets = obj.__indexes.buckets || {};
                // arr.buckets = arr.buckets || {};
                // var bucket = arr.buckets[prop] = arr.buckets[prop] || {};
                // var bucket = obj.__indexes.buckets[prop] =
                // obj.__indexes.buckets[prop] || {__bucket__keys:[]};

                arr.sort(function (a, b) {
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
        }
        function __dup(old) {
            try {
                for (var prop in old) {
                    if (!old.hasOwnProperty(prop)) { continue; }
                    this[prop] = old[prop];
                }
            } catch (e) {
                error('__dup', e);
            }
        }
        function __enum(obj, delimiter, prePost) {
            try {
                delimiter = delimiter || ", ";
                prePost = prePost || ["", ""];
                var props = [],
                    str = "";
                if (_isArray(obj)) {
                    props = obj.slice(0);
                } else if ($c.isObject(obj)) {
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            props.push(prop);
                        }
                    }
                }
                for (var i = 0, len = props.length; i < len; i++) {
                    var prop = props[i];
                    var pre = $c.replace_all(prePost[0], ['{ENUM_VAR}', '{ENUM_VAL}'], [prop, obj[prop]]),
                        post = $c.replace_all(prePost[1], ['{ENUM_VAR}', '{ENUM_VAL}'], [prop, obj[prop]]);
                    str += pre + prop + post + delimiter;
                }
                return str.slice(0, -1 * delimiter.length);
            } catch (e) {
                error('fillTemplate.enum', e);
            }
        }
        function __logic_parser(code, obj, bind) {
            if (!code) { return ""; }
            var ttc = $c.TEMPLATE_TAG_CONFIG, indexes = [], logic = {};
            code = $c.replace_all(code, ttc.IGNORE_CHARS, ['']);
            $c.eachProperty(ttc, function (value) {
                if (!value.begin) { return; }
                var index = _indexOfAlt(code, value.begin);
                indexes.push(index);
                logic[index] = value;
            });
            var index = Math.min.apply(Math, _condense(indexes, [-1]));

            if (!logic[index]) { return code; }

            return code.substring(0, index) + logic[index].parser(code.substring(index), obj, bind);
        }
        function __observe_helper(objs, callback, acceptList, parent) {
            try {
                if ($c.isObject(objs)) { return observe(objs, callback, acceptList, parent); }
                if (!_isArray(objs)) { return; }
                var i = 0, obj;
                while (obj = objs[i++]) {
                    if (!$c.isObject(obj)) { continue; }
                    observe(obj, callback, acceptList, parent);
                }
            } catch (e) {
                error('observe.observe_helper', e);
            }
        }
        function __on_observable_change(changes) {
            try {
                var change = changes[0], obj = change.object, prop = change.name, value = change.oldValue;
                var _observing = fillTemplate._observing,
                    _micro_templates = fillTemplate._micro_templates;
                // change values
                if (obj[prop] != value) {
                    var id_index = _observing.indexOf(obj);
                    var hash = _observing["hash_" + id_index],
                        pattern = new RegExp(hash + "[a-zA-Z0-9,]*\." + prop + ";?|$"),
                        nodes = Array.prototype.slice.call($CSS("[data-craydent-bind*='" + hash + "']") || []).filter(function (node) {
                            return pattern.test(node.getAttribute("data-craydent-bind"));
                        });

                    if (!$CSS("[data-craydent-bind*='" + hash + "']").length) {
                        delete _observing["hash_" + id_index];
                        return;
                    }
                    var i = 0, node;
                    while (node = nodes[i++]) {
                        if (node.isOrphan()) { continue; }
                        var id = node.getAttribute("data-craydent-bind").split(":")[0],
                            tobj = $c.getProperty(_observing, "parents_" + id_index + ".0") || obj;

                        nodes[i - 1].replace(fillTemplate(_micro_templates[id].template.replace_all("${craydent_bind}", hash), tobj).toDomElement());
                    }
                }
            } catch (e) {
                error('observe.on_observable_change', e);
            }
        }
        function __or() {
            try {
                for (var a = 0, len = arguments.length; a < len; a++) {
                    var arg = arguments[a];
                    if (arg) { return arg; }
                }
                return "";
            } catch (e) {
                error('fillTemplate.__or', e);
            }
        }
        function __parseArithmeticExpr(doc, expr, field) {
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
                error('aggregate.__parseArithmeticExpr', e);
            }
        }
        function __parseArrayExpr(doc, expr, field) {
            try {
                switch (field) {
                    case "$size":
                        return (__processExpression(doc, expr[field], field) || []).length;
                }
            } catch (e) {
                error('aggregate.__parseArrayExpr', e);
            }
        }
        function __parseBooleanExpr(doc, expr, field) {
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
                error("aggregate.__parseBooleanExpr", e);
            }
        }
        function __parseComparisonExpr(doc, expr, field) {
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
                error("aggregate.__parse", e);
            }
        }
        function __parseCond(doc, expr) {
            try {
                if (!$c.isObject(expr) || !expr['$cond']) { return expr; }
                // parse $cond
                var condition = expr['$cond'],
                    boolExpression,
                    thenStatement,
                    elseStatement;
                if (_isArray(condition)) {
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
                error("aggregate.__parseCond", e);
            }

        }
        function __parseConditionalExpr(doc, expr, field) {
            try {
                switch (field) {
                    case "$cond":
                        return __parseCond(doc, expr);
                    case "$ifNull":
                        var value = __processExpression(doc, expr["$ifNull"][0]);
                        return isNull(value, __processExpression(doc, expr["$ifNull"][1]));
                }
            } catch (e) {
                error("aggregate.__parseConditionExpr", e);
            }
        }
        function __parseDateExpr(doc, expr, field) {
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
                        return $c.format(dt, expr[field].format);
                }
            } catch (e) {
                error("aggregate.__parseDateExpr", e);
            }
        }
        function __parseSetExpr(doc, expr, field) {
            try {
                var i = 1, exp, j = 0, jlen, st, set1, set2, rtnSet, errorMessage, arr1, arr2, falseCondition;
                switch (field) {
                    case "$setEquals":
                        while (exp = expr[field][i++]) {
                            set1 = $c.duplicate(__processExpression(doc, expr[field][i - 2]));
                            set2 = $c.duplicate(__processExpression(doc, exp));
                            if (!_isArray(set1) || !_isArray(set2)) {
                                throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                                $c.capitalize(typeof (!_isArray(set1) ? set1 : set2));
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
                        if (!_isArray(rtnSet)) {
                            throw errorMessage + $c.capitalize((typeof rtnSet));
                        }
                        $c.toSet(rtnSet);
                        while (exp = expr[field][i++]) {
                            set1 = $c.duplicate(__processExpression(doc, exp));
                            if (!_isArray(set1)) {
                                throw errorMessage + $c.capitalize(typeof set1);
                            }
                            $c.toSet(set1);
                            if (set1.length < rtnSet.length) {
                                var settmp = set1;
                                set1 = rtnSet;
                                rtnSet = settmp;
                            }
                            for (jlen = rtnSet.length; j < jlen; j++) {
                                if (!~set1.indexOf(rtnSet[j])) { $c.removeAt(rtnSet, j--); jlen--; }
                            }
                            if (!rtnSet.length) { return rtnSet; }
                        }
                        return rtnSet;
                    case "$setUnion":
                        rtnSet = $c.duplicate(__processExpression(doc, expr[field][0]));
                        errorMessage = "Exception: All operands of $setUnion must be arrays. One argument is of type: ";
                        if (!_isArray(rtnSet)) {
                            throw errorMessage + $c.capitalize(typeof rtnSet);
                        }
                        while (exp = expr[field][i++]) {
                            var arr = $c.duplicate(__processExpression(doc, exp));
                            if (!_isArray(arr)) {
                                throw errorMessage + _capitalize(typeof arr);
                            }
                            rtnSet = rtnSet.concat(arr);
                        }
                        return $c.toSet(rtnSet);
                    case "$setDifference":
                        arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                        arr2 = $c.duplicate(__processExpression(doc, expr[field][1]));
                        rtnSet = [];
                        if (!_isArray(arr1) || !_isArray(arr2)) {
                            throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                            $c.capitalize(typeof (!_isArray(arr1) ? arr1 : arr2));
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
                        if (!_isArray(arr1) || !_isArray(arr2)) {
                            throw "Exception: All operands of $setEquals must be arrays. One argument is of type: " +
                            $c.capitalize(typeof (!_isArray(arr1) ? arr1 : arr2));
                        }
                        return _isSubset(arr1, arr2);
                    case "$anyElementTrue":
                        arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                        falseCondition = [undefined, null, 0, false];

                        while (st = arr1[j++]) {
                            if (!~falseCondition.indexOf(st)) { return true; }
                        }
                        return false;
                    case "$allElementsTrue":
                        arr1 = $c.duplicate(__processExpression(doc, expr[field][0]));
                        falseCondition = [undefined, null, 0, false];

                        for (jlen = arr1.length; j < jlen; j++) {
                            if (~falseCondition.indexOf(arr1[j])) { return false; }
                        }
                        return true;
                }
            } catch (e) {
                error("aggregate.__parseSetExpr", e);
            }
        }
        function __parseStringExpr(doc, expr, field) {
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
                error("aggregate.__parseStringExpr", e);
            }
        }
        function __parseVariableExpr(doc, expr, field) {
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
                error("aggregate.__parseVariableExpr", e);
            }
        }
        function __processAccumulator(doc, accumulator, previousValue_arg, meta) {
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
                ),
                    previousValue = previousValue_arg;
                switch (true) {
                    case !!accumulator["$sum"]:
                        return (value || 0) + (previousValue || 0);
                    case !!accumulator["$avg"]:
                        previousValue = previousValue || [];
                        if (!$c.isNull(value)) { previousValue.push(value); }
                        if (meta.length == meta.index + 1) { previousValue = _average(previousValue); }
                        return previousValue;
                    case !!accumulator["$first"]:
                        if ($c.isNull(previousValue)) { previousValue = value; }
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
                            previousValue.push(value);
                        }
                        if (meta.length == meta.index + 1) {
                            previousValue = $c.stdev(previousValue || []);
                        }
                        return $c.isNull(previousValue) ? null : previousValue;
                }
            } catch (e) {
                error("aggregate.__processAccumulator", e);
            }
        }
        function __processAttributes(node) {
            try {
                var obj = {},
                    tagend = node.indexOf('>'),
                    tag = node.substring(1, tagend),
                    attIndex = tag.search(/\s|>/),
                    attr = !~attIndex ? "" : tag.substring(attIndex),
                    text = node.substring(tagend + 1, node.indexOf('<', tagend));

                if (attr[attr.length - 1] == "/") { attr = attr.substring(0, attr.length - 1); }
                attr = $c.trim(attr);

                if (attr) {
                    obj['#text'] = fillTemplate(text, xmlToJson.refs);
                    var attributes = attr.split(' ');
                    for (var i = 0, len = attributes.length; i < len; i++) {
                        var attribute = attributes[i];
                        if (!attribute) { continue; }
                        var key_val = attribute.split('=');
                        obj['@attributes'] = obj['@attributes'] || {};
                        obj['@attributes'][key_val[0].trim()] = $c.tryEval(key_val[1]) || key_val[1].trim();
                    }
                }
                return obj;
            } catch (e) {
                error('xmlToJson.__processAttributes', e);
            }
        }
        function __processBlocks(start, end, code, lookups) {
            lookups = lookups || {};
            var blocks = [], sindexes = [], sindex = 0, eindexes = [], eindex = 0;
            while (~(sindex = _indexOfAlt(code, start, sindex)) && ~(eindex = _indexOfAlt(code, end, eindex))) {
                ~sindex && (sindexes.push(sindex), sindex++);
                ~eindex && (eindexes.push(eindex), eindex++);
            }
            // if true syntax error, start end missmatch
            if (sindexes.length != eindexes.length) {
                blocks.push({ id: "##" + suid() + "##", block: "", body: "", code: code });
                return blocks;
            }

            var pairs = OrderedList([], function (a, b) {
                if (a.end < b.end) { return -1; }
                if (a.end > b.end) { return 1; }
                return 0;
            });

            while (sindexes.length) {
                var e = 0;
                while (eindexes[0] > sindexes[e]) {
                    e++;
                }
                e--;
                pairs.add({ begin: sindexes[e], end: eindexes[0] });
                $c.removeAt(sindexes, e);
                $c.removeAt(eindexes, 0);
            }

            var endlength = code.match(end)[0].length;
            var k = 0, pair;
            while (pair = pairs[k++]) {
                var uid = "##" + suid() + "##",
                    block = code.slice(pair.begin, pair.end + endlength),
                    beginLength = block.match(start)[0].length,
                    body = code.slice(pair.begin + beginLength, pair.end);
                code = code.replace(block, uid);
                blocks.push({ id: uid, block: block, body: body, code: code });
                lookups[uid] = block;

                var i = k, pair2;
                while (pair2 = pairs[i++]) {
                    var offset = block.length - uid.length;
                    pair2.end -= offset;
                    if (pair2.begin > pair.end) {
                        pair2.begin -= offset;
                    }
                }
            }

            return blocks.reverse();
        }
        function __processChildren(nodename, children, xml) {
            try {
                var child, i = 0, obj = {};
                if (!children.length) {
                    obj[nodename] = __processAttributes(xml);
                }
                while (child = children[i++]) {
                    var index = child.indexOf('>'),
                        lindex = child.lastIndexOf('</'),
                        attributes = __processAttributes(child),
                        childXML = _strip(child.substring(index + 1, lindex), '\n').trim();
                    if (children.length == 1) {
                        obj[nodename] = $c.merge(xmlToJson(childXML), attributes);
                    } else {
                        obj[nodename] = obj[nodename] || [];
                        obj[nodename].push($c.merge(attributes, xmlToJson(childXML)));
                    }
                }
                return obj;
            } catch (e) {
                error('xmlToJson.__processChildren', e);
            }
        }
        function __processExpression(doc, expr) {
            try {
                if (_isString(expr)) {
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
                            __processExpression(doc, value);
                            break;
                    }
                }
            } catch (e) {
                error("aggregate.__parseExpression", e);
            }
        }
        function __processGroup(docs, expr) {
            try {
                var _ids = expr._id, i = 0, groupings = {}, results = [], meta = { index: 0, length: docs.length, sample: docs.sample/*,stop:false*/ }, doc;
                while (doc = docs[meta.index = i++]) {
                    var result, key = "null", keys = null;
                    if (_ids) {
                        keys = {};
                        for (var prop in _ids) {
                            if (!_ids.hasOwnProperty(prop)) { continue; }
                            keys[prop] = __processExpression(doc, _ids[prop]);
                        }
                        key = JSON.stringify(keys);
                    }
                    if (!groupings[key]) {
                        result = groupings[key] = { _id: keys };
                        results.push(result);
                    } else {
                        result = groupings[key];
                    }
                    for (var prop in expr) {
                        if (!expr.hasOwnProperty(prop) || prop == "_id") { continue; }
                        result[prop] = __processAccumulator(doc, expr[prop], result.hasOwnProperty(prop) ? result[prop] : undefined, meta);
                    }
                }
                return results;
            } catch (e) {
                error('aggregate.__processGroup', e);
            }
        }
        function __processSiblings(xml) {
            try {
                var parts = xml.split('<'), obj = {},
                    tag = "", node = "", etag;
                obj['#text'] = obj['#text'] || "";
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    if (!part) {
                        continue;
                    }
                    if (!tag && !~part.indexOf('/>')) {
                        etag = part.indexOf('>');
                        if (!~etag) {
                            if (!i) {
                                obj['#text'] += fillTemplate(_strip(part, ['\n', ' ']), xmlToJson.refs);
                            } else {
                                node += part;
                            }
                            continue;
                        }
                        tag = part.split(/\s|>/)[0];
                        node += "<" + part;
                    } else if (~(etag = part.indexOf('/' + tag + '>'))) {
                        var text = _strip(part.substr(etag + tag.length + 2), ['\n', ' ']);
                        if (text) {
                            obj['#text'] += fillTemplate(text, xmlToJson.refs);
                        }
                        node += "<" + part.substring(0, etag + tag.length + 2);
                        if (obj[tag] && _isArray(obj[tag])) {
                            obj[tag].push(xmlToJson(node)[tag]);
                        } else if (obj[tag]) {
                            obj[tag] = [obj[tag]];
                            obj[tag].push(xmlToJson(node)[tag]);
                        } else {
                            obj = $c.merge(obj, xmlToJson(node));
                        }
                        tag = "", node = "";
                    } else {
                        node += "<" + part;
                    }

                }
                if (!obj['#text'] && !(obj['#text'] = fillTemplate(node, xmlToJson.refs))) {
                    delete obj['#text'];
                }
                return obj;
            } catch (e) {
                error('xmlToJson.__processSiblings', e);
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
                        return $c.where(docs, {}, value);
                    case "$match":
                        return $c.where(docs, value);
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
                            sorter.push(pre + prop);
                        }
                        return $c.sortBy(docs, sorter);
                    case "$out":
                        var rtnDocs = $c.duplicate(docs, true);
                        if (_isString(value)) {
                            $g[value] = rtnDocs;
                        } else if (_isArray(value)) {
                            $c.removeAll(value);
                            rtnDocs = $c.merge(value, rtnDocs);
                        }
                        return rtnDocs;
                    case "$sample":
                        var arr = [], i = 0, eindex = docs.length - 1;
                        while (i < value.size) {
                            arr.push(docs[Math.round($c.rand(0, eindex, true))]);
                            i++;
                        }
                        docs.sample = arr;
                        return docs;
                    case "$lookup":
                        var i = 0, doc, arr = value.from, key = value.localField, fkey = value.foreignField, prop = value.as;
                        while (doc = docs[i++]) {
                            var query = {};
                            query[fkey] = doc[key] || { $exists: false };
                            doc[prop] = $c.where(arr, query);
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
                    if (_equals(value, target[j])) {
                        $c.removeAt(target, j);
                        j--, jlen--;
                    }
                }

            }
        }
        function __queryNestedProperty(obj, path/*, value*/) {
            if (obj[path]) { return [obj[path]]; }
            var parts = path.split('.'), values = [], i = 0, prop;
            while (prop = parts[i++]) {
                if (!obj.hasOwnProperty(prop)) { return []; }
                if (_isArray(obj[prop])) {
                    if (isNull(parts[i])) { return obj[prop]; }
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
        function __relativePathFinder(path, depth) {
            var callingPath = "",
                delimiter = "/";
            depth = depth || 0;

            // first clause is for linux based files systems, second clause is for windows based file system
            if (!(path.startsWith('/') || /^[a-zA-Z]:\/|^\/\/.*/.test(path))) {
                callingPath = new Error().stack.split('\n')[3 + depth].replace(/.*?\((.*)/, '$1');
                if (~callingPath.indexOf('\\')) {
                    callingPath = callingPath.replace(/\\/g, '/');
                }
                path = callingPath.substring(0, callingPath.lastIndexOf(delimiter) + 1) + path;
            }
            return path;
        }
        function __run_replace(reg, template, use_run, obj) {
            try {
                var pre = "", post = "", split_param = "|", match;
                use_run && (pre = "RUN[", post = "]", split_param = /;(?!\\)/);

                while ((match = reg.exec(template)) && match[1]) {
                    var funcValue = [],
                        func = "";

                    funcValue = $c.replace_all(match[1], ['\\[', '\\]'], ['[', ']']).split(split_param);
                    while (_count(funcValue[0], "{") != _count(funcValue[0], "}")) {
                        if ($c.tryEval(funcValue[0])) { break; }
                        funcValue[0] += (_isString(split_param) ? split_param : ";") + funcValue[1];
                        funcValue.splice(1, 1);
                    }
                    func = _strip(funcValue.splice(0, 1)[0], ";");
                    for (var i = 0, len = funcValue.length; i < len; i++) {
                        var fv = funcValue[i];
                        if (~fv.indexOf("${")) {
                            funcValue[i] = fillTemplate(fv, obj);
                        }
                        try {
                            funcValue[i] = eval("(" + $c.replace_all(fv, [';\\'], [';']) + ")");
                        } catch (e) { }
                    }
                    funcValue = funcValue.map(function (item) { return $c.tryEval(item) || item; });
                    template = ~template.indexOf(match[1]) ? template.replace(match[1], (match[1] = $c.replace_all(match[1], ['\\[', '\\]'], ['[', ']']))) : template;
                    template = $c.replace_all(template, "${" + pre + match[1] + post + "}",
                        $c.getProperty($g, func) ? $c.getProperty($g, func).apply(obj, funcValue) : ($c.tryEval("(" + func + ")") || foo).apply(obj, funcValue) || "");
                }
                return template;
            } catch (e) {
                error('fillTemplate.__run_replace', e);
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
                if (_isString(this)) {
                    return _trim(this, undefined, chars);
                }
                if (_isArray(this)) {
                    var ref = chars,
                        arr = [],
                        alter = false;
                    if ($c.isBoolean(ref)) { alter = true; }

                    for (var i = 0, len = this.length; i < len; i++) {
                        var item = this[i];
                        _isString(item) && (arr[i] = item.toString().trim()) || (arr[i] = item);
                        alter && (this[i] = arr[i]);
                    }
                    return arr;
                }
            } catch (e) {
                error(_getFuncName(this.constructor) + ".trim", e);
                return false;
            }
        }

        function _addFlags(obj, flags) {
            try {
                if (obj.global && !~flags.indexOf('g')) { flags += "g"; }
                if (obj.ignoreCase && !~flags.indexOf('i')) { flags += "i"; }
                if (obj.multiline && !~flags.indexOf('m')) { flags += "m"; }

                return new RegExp(obj.source, flags);
            } catch (e) {
                error("RegExp.addFlags", e);
            }
        }
        function _add_to_index(buckets, obj) {
            for (var prop in buckets) {
                var sarr = buckets[prop][obj[prop]];
                if (!sarr || !sarr.length) {
                    sarr = sarr || (buckets[prop][obj[prop]] = []);
                    var keys = buckets[prop].__bucket__keys;
                    var index = _binarySearch(keys, obj[prop]);
                    keys.splice(index, 0, obj[prop]);
                }
                sarr.push(obj);
            }
        }
        function _ajaxServerResponse(response) {
            try {
                if (response.readyState == 4 && response.status == 200) {

                    var objResponse = tryEval(response.responseText.trim());

                    if (!objResponse || objResponse.hasErrors) {
                        return false;
                    }
                    return objResponse;
                }
                return false;
            } catch (e) {
                error("ajax._ajaxServerResponse", e);
                return false;
            }
        }
        function _average(obj) {
            try {
                var length = 0, sum = 0;
                for (var i = 0, len = obj.length; i < len; i++) {
                    if ($c.isNumber(obj[i])) {
                        sum += obj[i];
                        length++;
                    }
                }
                return sum / length;
            } catch (e) {
                error("Array._average", e);
            }
        }
        function _binarySearch(arr, value) {
            var min = arguments[2] || 0,
                max = arguments[3] || arr.length;

            if (min + 1 == max) { return max; }

            var mid = parseInt((max - min) / 2) + min;

            if (arr[mid] == value) {
                mid--;
                while (min > mid) {
                    if (arr[mid] != value) { break; }
                    mid--;
                }
                return mid + 1;
            }

            if (arr[mid] > value) { max = mid; }
            if (arr[mid] < value) { min = mid; }

            return _binarySearch(arr, value, min, max);
        }
        function _condense(objs, check_values) {
            try {
                var skip = [], arr = [], without = false;
                if (_isArray(check_values)) {
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
                        while (~(index = objs.indexOf(obj, index + 1))) {
                            skip.push(index);
                        }

                    }
                    obj !== "" && !$c.isNull(obj) && !~(skip.indexOf && skip.indexOf(i) || _indexOf(skip, i)) && !$c.isNull(obj) && arr.push(obj);
                }
                return arr;
            } catch (e) {
                error("_condence", e);
                return false;
            }
        }
        function _contains(obj, val, func) {
            if (_isFunction(val)) {
                for (var prop in obj) {
                    if (val(obj[prop], prop, obj)) { return true; }
                }
            }
            if (_isArray(obj)) {
                if (~obj.indexOf(val)) { return true; }
                if (_isFunction(func) || $c.isRegExp(val)) {
                    if (!func) {
                        return _contains_matches(obj, val);
                    }
                    return !!~_indexOfAlt(obj, val, func);
                }
                if (_isString(func)) {
                    var f = _foo;
                    switch (func) {
                        case "$lt":
                            f = _contains_lessthan;
                            break;
                        case "$lte":
                            f = _contains_lessthanequal;
                            break;
                        case "$gt":
                            f = _contains_greaterthan;
                            break;
                        case "$gte":
                            f = _contains_greaterthanequal;
                            break;
                        case "$mod":
                            f = _contains_mod;
                            break;
                        case "$type":
                            f = _contains_type;
                            break;
                    }
                    return !!f(obj, val);
                }
                if (_isArray(val)) {
                    for (var i = 0, len = val.length; i < len; i++) {
                        var item = val[i];
                        if (_contains(obj, item, func)) {
                            return item;
                        }
                    }
                }
            }
            if (_isString(obj)) {
                return !!~($c.isRegExp(val) ? obj.search(val) : obj.indexOf(val));
            }
            if ($c.isObject(obj)) {
                for (var prop in obj) {
                    if (!obj.hasOwnProperty(prop)) { continue; }
                    if ((func && func(obj[prop])) || obj[prop] == val) {
                        return true;
                    }
                }
                return false;
            }
            if ($c.isNumber(obj)) {
                return !!~obj.toString().indexOf(val);
            }
            return false;
        }
        function _contains_greaterthan(vals, val) {
            for (var i = 0, len = vals.length; i < len; i++) {
                if (vals[i] > val) { return true; }
            }
            return false;
        }
        function _contains_greaterthanequal(vals, val) {
            for (var i = 0, len = vals.length; i < len; i++) {
                if (vals[i] >= val) { return true; }
            }
            return false;
        }
        function _contains_lessthan(vals, val) {
            for (var i = 0, len = vals.length; i < len; i++) {
                if (vals[i] < val) { return true; }
            }
            return false;
        }
        function _contains_lessthanequal(vals, val) {
            for (var i = 0, len = vals.length; i < len; i++) {
                if (vals[i] <= val) { return true; }
            }
            return false;
        }
        function _contains_matches(vals, val) {
            for (var i = 0, len = vals.length; i < len; i++) {
                if (val.test(vals[i])) { return true; }
            }
            return false;
        }
        function _contains_mod(vals, val) {
            for (var i = 0, len = vals.length; i < len; i++) {
                if (vals[i] % val[0] == val[1]) { return true; }
            }
            return false;
        }
        function _contains_type(vals, val) {
            for (var i = 0, len = vals.length; i < len; i++) {
                if (vals[i].constructor == val) { return true; }
            }
            return false;
        }
        function _copyWithProjection(projection_arg, record, preserveProperties) {
            var copy = {}, len = 0,
                projection = projection_arg || "*";
            if (_isString(projection)) {
                projection = projection.split(",");
            }
            if (_isArray(projection)) {
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
                    var val = $c.getProperty(record, prop) || null;
                    if (prop == "*") {
                        copy = $c.duplicate(record, true);
                    } else if ($c.parseBoolean(projection[prop])) {
                        if (preserveProperties || !$c.isNull(val)) {
                            $c.setProperty(copy, prop, val);
                        }
                    } else if (!$c.isObject(projection[prop]) && !val) {
                        copy[prop] = projection[prop];
                    } else if ($c.isObject(projection[prop]) || val && !_isArray(val)) {
                        copy[prop] = __processExpression(record, projection[prop]);
                    } else if (val) {
                        var del = true;
                        if (prop.slice(-2) == ".$") {
                            prop = prop.slice(0, -2);
                            copy[prop] = val.slice(0, 1);
                        } else if (projection[prop]["$elemMatch"]) {
                            copy[prop] = $c.where(val, projection[prop]["$elemMatch"]).slice(0, 1);
                        } else if (projection[prop]["$slice"]) {
                            var start = 0, length = $c.isInt(projection[prop]["$slice"]) ? projection[prop]["$slice"] : 0;

                            if (_isArray(projection[prop]["$slice"])) {
                                start = projection[prop]["$slice"][0];
                                length = projection[prop]["$slice"][1];
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
        function _count(obj, option) {
            try {
                if ($c.isObject(obj)) {
                    var count = 0;
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) { count++; }
                    }
                    return count;
                }
                if (_isArray(obj)) {
                    return $c.where(obj, option).length;
                }
                if (_isString(obj)) {
                    var word = option;
                    if (!$c.isRegExp(word)) {
                        word = new RegExp(word, "g");
                    } else if (!option.global) {
                        var reg_str = word.toString(),
                            index = reg_str.lastIndexOf('/'),
                            options = reg_str.substring(index + 1);
                        word = new RegExp(_strip(reg_str, '/'), "g" + options);
                    }
                    return (obj.match(word) || []).length;
                }
                return undefined;
            } catch (e) {
                error('Object._count', e);
            }
        }
        function _craydentSelector(by, overwrite, object, single) {
            try {
                if (!object || object === true) {
                    return undefined;
                }

                var elem = $d[by](object);
                if (single) {
                    return ((elem && ((elem.length && elem[0]) || elem)) || $w[overwrite](object)[0]);
                }
                return (elem || $w[overwrite](object));
            } catch (e) {
                error('_craydentSelector', e);
            }
        }
        function _create_func(args) {
            var _qnp = __queryNestedProperty,
                _clt = _contains_lessthan,
                _clte = _contains_lessthanequal,
                _cgt = _contains_greaterthan,
                _cgte = _contains_greaterthanequal,
                _ct = _contains_type,
                _cm = _contains_mod,
                condition = args.condition,
                projection = args.projection,
                projected = [];
            ifblock = args.ifblock || 'true',
                _refs = args._refs || [];

            var func, arr = args.arr, limit = args.limit;
            if (!args.ifblock) {
                if (!projection) {
                    func = function (record, the_current_index, farr) {
                        for (var prop in condition) {
                            if (~prop.indexOf('.')) {
                                if (!_contains(_qnp(record, prop), condition[prop])) {
                                    return false;
                                }
                            } else if (record[prop] && record[prop] !== condition[prop] || $c.isNull(record[prop])) {
                                return false;
                            }
                        }
                        return true;
                    };
                } else {
                    func = function (record, the_current_index, farr) {
                        for (var prop in condition) {
                            if (~prop.indexOf('.')) {
                                if (!_contains(_qnp(record, prop), condition[prop])) {
                                    return false;
                                }
                            } else if (record[prop] && record[prop] !== condition[prop] || $c.isNull(record[prop])) {
                                return false;
                            }
                        }
                        projected.push($c.copyWithProjection(projection, record));
                        return true;
                    }
                }
            } else {
                var varStrings = '';
                if (_refs.length) {
                    for (var i = 0, len = _refs.length; i < len; i++) {
                        varStrings += 'var __where_cb' + (i + 1) + '=_refs[' + i + '];';
                    }
                }
                var projection_code = "";
                if (projection) {
                    projection_code = "projected.push(_copyWithProjection(projection, record));";
                }
                eval(varStrings + 'func = function (record,the_current_index,farr) {var values;' + projection_code +
                    'return ' + ifblock + ';}');
            }
            var filtered = arr.filter(func);
            return projection ? projected : filtered;
        }
        function _dataset() {
            try {
                var attributes = this.attributes,
                    ds = {};
                for (var i in attributes) {
                    if (!attributes.hasOwnProperty(i)) { continue; }
                    var attribute = attributes[i];
                    if (attribute.name.indexOf("data-") == 0) {
                        ds[attribute.name.substring(5)] = attribute.value;
                    }
                }
                return ds;
            } catch (e) {
                error("DOM._dataset", e);
            }
        }
        function _defineFunction(name, func, override) {
            try {
                var args = _getFuncArgs(func),
                    fstr = func.toString().replace(/this/g, 'craydent_ctx'),

                    // extra code to account for when this == global
                    extra_code = "if(arguments.length == 0 && this == $c){return;}",
                    fnew = args.length === 0 || (args.length === 1 && !_trim(args[0])) ?
                        fstr.toString().replace(/(\(\s*?\)\s*?\{)/, ' (craydent_ctx){' + extra_code) :
                        "(" + fstr.toString().replace(/\((.*?)\)\s*?\{/, '(craydent_ctx,$1){' + extra_code) + ")";

                if (!override && eval("typeof(" + name + ")") !== "undefined") {
                    return eval("$c." + name + " = " + fnew);
                }
                return eval("$c." + name + " = " + fnew);
            } catch (ex) {
                error("_defineFunction", ex);
            }
        }
        function _displayHelper(object, func) {
            try {
                return (($d.getElementById(object) && $(object)[func]())
                    || (object instanceof HTMLElement && object[func]())
                    || $w['_' + func + 'overwrite'](object));
            } catch (e) {
                error("_displayHelper." + func, e);
            }
        }
        function _duplicate(obj, original, recursive/*, ref, current_path, exec*/) {
            try {
                if ($c.isNull(obj)) { return obj; }
                if (_isString(obj) || _isString(original)
                    || $c.isInt(obj) || $c.isInt(original)
                    || $c.isFloat(obj) || $c.isFloat(original)
                    || $c.isNumber(obj) || $c.isNumber(original)) {
                    return original;
                }
                var argIndex = 3;

                // remove all properties if it is the root level
                var ref = arguments[argIndex] || { objects: [{ obj: original, path: "obj" }] },
                    current_path = arguments[argIndex + 1] || "obj";
                (arguments[argIndex + 2] || (arguments[argIndex + 2] = {})) && (arguments[argIndex + 2].command = arguments[argIndex + 2].command || "");
                if (!(ref.objects.length == 1)) {
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) { delete obj[prop]; }
                    }
                }
                var loop_func = function (prop, original) { // 0 => property, 1 => original object, 2 => reference path object, 3 => current path, 4 => command object
                    if (original.hasOwnProperty(prop) && original[prop] && recursive) {
                        var index = _indexOfAlt(ref.objects, original[prop], function (obj, value) {
                            return obj.obj === value;
                        }),
                            new_path = current_path + "[" + parseRaw(prop) + "]";

                        if (~index) {
                            return arguments[argIndex + 1].command += new_path + "=" + ref.objects[index].path + ";";
                        }

                        if (typeof (original[prop]) in { "object": 1, "function": 1 } && recursive) {
                            var isfunc = typeof (original[prop].constructor) == "function";
                            if (isfunc && typeof (original[prop]) == "object") {
                            obj[prop] = new original[prop].constructor();
                            } else if (!isfunc) {
                            obj[prop] = {};
                            } else { obj[prop] = tryEval(original[prop].toString()); }
                            ref.objects.push({ obj: original[prop], path: new_path });
                            return _duplicate(obj[prop], original[prop], true, ref, new_path, arguments[argIndex + 1]);
                        }
                    } else if (!original.hasOwnProperty(prop)) {
                        return;
                    }
                    obj[prop] = original[prop];
                };
                if (_isArray(original)) {
                    var i = 0, len = original.length;
                    while (i++ < len) {
                        loop_func.call(obj, i - 1, original, ref, current_path, arguments[argIndex + 2]);
                    }
                } else {
                    for (var prop in original) {
                        if (!original.hasOwnProperty(prop)) { continue; }
                        loop_func.call(obj, prop, original, ref, current_path, arguments[argIndex + 2]);
                    }
                }

                if (!arguments[argIndex + 1]) {
                    eval(arguments[argIndex + 2].command);
                }

                return obj;
            } catch (e) {
                error('_duplicate', e);
            }
        }
        function _endsWith() {
            /*|{
                "info": "String class extension to check if the string ends with the given string",
                "category": "String",
                "parameters":[
                    {"infinite": "any number of arguments can be passed"}],

                "overloads":[
                    {"parameters":[
                        {"arr": "(String[]) An array of strings to check"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.endsWith",
                "returnType": "(Mix)"
            }|*/
            try {
                var args = arguments;
                if (arguments.length < 3 && (_isArray(arguments[0]) || _isArray(arguments[1]))) {
                    args = arguments[1] || arguments[0];
                }
                for (var i = typeof craydent_ctx != "undefined" ? 1 : 0, len = args.length; i < len; i++) {
                    var arg = args[i];
                    if (arg == this.slice(-arg.length)) { return arg; }
                }
                return false;
            } catch (e) {
                error('String.endsWith', e);
            }
        }
        function _equals(obj, compare, props) {
            try {
                if (_isArray(props)) {
                    var j = 0;
                    while (prop = props[j++]) {
                        if (obj.hasOwnProperty(prop) && compare.hasOwnProperty(prop) && !_equals(obj[prop], compare[prop])
                            || (!obj.hasOwnProperty(prop) && compare.hasOwnProperty(prop))
                            || (obj.hasOwnProperty(prop) && !compare.hasOwnProperty(prop))) {
                            return false;
                        }
                    }
                    return true;
                }
                if (($c.isObject(obj) && $c.isObject(compare)) || (_isArray(obj) && _isArray(compare))) {
                    for (var prop in compare) {
                        if (!compare.hasOwnProperty(prop)) { continue; }
                        if (!_equals(obj[prop], compare[prop])) { return false; }
                    }
                    for (var prop in obj) {
                        if (!obj.hasOwnProperty(prop)) { continue; }
                        if (!_equals(obj[prop], compare[prop])) { return false; }
                    }
                    return true;
                }
                if (obj === undefined && compare !== undefined || obj !== undefined && compare === undefined) { return false; }
                if (obj === null && compare !== null || obj !== null && compare === null) { return false; }
                if ($c.isRegExp(compare)) { return compare.test(obj.toString()); }
                return (obj.toString() == compare.toString() && obj.constructor == compare.constructor);
            } catch (e) {
                error('Object._equals', e);
            }
        }
        function _even(num) {
            try {
                if (isNaN(num)) {
                    return false;
                }
                //noinspection JSBitwiseOperatorUsage
                return !(num & 1);
            } catch (e) {
                error('_even', e);
            }
        }
        function _ext(cls, property, func, override) {
            try {
                $c.__craydentNoConflict || (cls['prototype'][property] = cls['prototype'][property] || func);
                _df(property, func, override);
            } catch (e) {
                error('_ext', e);
            }
        }
        function _firstElementChild() {
            try {
                var children = this.childNodes;

                for (var i = 0, len = children.length; i < len; i++) {
                    if (children[i].nodeType == 1) {
                        return children[i];
                    }
                }
                return false;
            } catch (e) {
                error("DOM._firstElementChild", e);
                return false;
            }
        }
        function _getBrowserVersion(browser) {
            try {
                var index = this.navigator.userAgent.indexOf(browser);
                if (!~index && (this["is" + browser] || eval("is" + browser))()) return -1;
                var version = parseFloat(this.navigator.userAgent.substring(index + browser.length + 1));
                return version === 0 || version ? version : -1;
            } catch (e) {
                error('_getBrowserVersion', e);
            }
        }
        function _getDimension(isBody, dimension) {
            try {
                if (!isBody && this.tagName.toLowerCase() == 'body') {
                    var dim, currentStyle = $d.body.style[dimension];
                    $d.body.style[dimension] = "100%";
                    dim = $d.body[dimension](true);
                    $d.body.style[dimension] = currentStyle;
                }
                var cRect = this.getClientRects && this.getClientRects()[0];
                return (cRect && cRect[dimension]) || this["offset" + dimension.capitalize()] || this["scroll" + dimension.capitalize()];
            } catch (e) {
                if (!this.parentNode && this != $d) {
                    var temp = this.cloneNode(true),
                        rtn;
                    temp.style.visible = 'hidden';
                    temp.style.position = 'absolute';
                    temp["get" + dimension.capitalize()] = $d.body[dimension];
                    $d.body.appendChild(temp);
                    rtn = temp["get" + dimension.capitalize()]();
                    temp.remove();
                    return rtn;
                }
                error("_getDimension", e);
                return false;
            }
        }
        function _getFuncArgs(func) {
            try {
                return _condense(_trim(_strip(func.toString(), '(')).replace(/\s*/gi, '').replace(/\/\*.*?\*\//g, '').replace(/.*?\((.*?)\).*/, '$1').split(',')) || [];
            } catch (e) {
                error('_getFuncArgs', e);
            }
        }
        function _getFuncName(func) {
            try {
                return _trim(func.toString().replace(/\/\/.*?[\r\n]/gi, '').replace(/[\t\r\n]*/gi, '').replace(/\/\*.*?\*\//gi, '').replace(/.*?function\s*?(.*?)\s*?\(.*/, '$1'));
            } catch (e) {
                error('_getFuncName', e);
            }
        }
        function _getGMTOffset() {
            try {
                var diff = this.getHours() - this.getUTCHours();
                return diff - (diff <= 12 ? (diff <= 0 ? (diff <= -12 ? -24 : 0) : 0) : 24);
            } catch (e) {
                error('_getGMTOffset', e);
            }
        }
        function _getValue(obj, args, dflt) {
            try {
                if (!_isFunction(obj)) {
                    if (args && !dflt) { dflt = args; }
                    var args = [obj];
                    if (dflt !== undefined) { args.push(dflt); }
                    return $c.isNull.apply($c, args) || (_isArray(obj) ? obj : obj.constructor(obj));
                }
                var rtn = obj.apply(obj, args);
                return rtn === undefined ? dflt : rtn;
            } catch (e) {
                error('Object._getValue', e);
            }
        }
        function _groupFieldHelper(obj, fields) {
            var prop = "", j = 0, field;
            while (field = fields[j++]) {
                prop += field + ":" + $c.getProperty(obj, field) + ",";
            }
            return prop;
        }
        function _indexOf(objs, value) {
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
        function _indexOfAlt(obj, value, option) {
            /*|{
                "info": "Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression",
                "category": "Array",
                "parameters":[
                    {"value": "(Mixed) value to find"},
                    {"func": "(Function) Callback function used to do the comparison"}],

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
                if (_isArray(obj)) {
                    var func = option;
                    var len = obj.length,
                        i = 0;
                    while (i < len) {
                        if ($c.isRegExp(value) && value.test(obj[i])) { return i; }
                        if (_isFunction(func) && (value instanceof Object ? func(obj[i], value) : func(obj[i]) === value)) { return i; }
                        ++i;
                    }
                    return -1;
                }
                if (_isString(obj)) {
                    var regex = value, pos = option;
                    if (isNull(regex)) {
                        return -1;
                    }
                    pos = pos || 0;
                    var index = obj.substring(pos).search(regex);
                    return (index >= 0) ? (index + pos) : index;
                }
            } catch (e) {
                error(_getFuncName(obj.constructor) + ".indexOfAlt", e);
            }
        }
        function _insertAfter(refElem, value) {
            /*|{
                "info": "Array class extension to add to the array after a specific index : HTMLElement class extension to insert element after another",
                "category": "Array,HTMLElement",
                "parameters":[
                    {"index/refElem": "(Int) Index to add after when using with Arrays, (HTMLElement) Reference HTML element to insert after when using with HTMLElements"},
                    {"value": "(Mixed) Value to add ( when used with Arrays)"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.insertAfter",
                "returnType": "(Bool)"
            }|*/
            try {
                var index = refElem;
                if ($c.isDomElement(this)) {
                    var next = _isFunction(refElem.nextElementSibling) ? refElem.nextElementSibling() : refElem.nextElementSibling;
                    next ? refElem.parentNode.insertBefore(this, next) : refElem.parentNode.appendChild(this);
                    return true;
                }
                if (_isArray(this)) {
                    this.splice(index + 1, 0, value);
                    if (this.__indexed_buckets) {
                        $c._add_to_index(this.__indexed_buckets, value);
                    }
                    return true;
                }
            } catch (e) {
                error(($c.isDomElement(this) ? "DOM" : _getFuncName(this.constructor)) + ".remove", e);
                return false;
            }
        }
        function _insertAt(index, value) {
            /*|{
                "info": "Array class extension to add to the array at a specific index and push the all indexes down : HTMLElement class extension to insert element at a specified index",
                "category": "Array",
                "parameters":[
                    {"index": "(Int) Index to add after"},
                    {"value": "(Mixed) Value to add"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.insertAt",
                "returnType": "(Bool)"
            }|*/
            try {
                if (_isArray(this)) {
                    this.splice(index, 0, value);
                    if (obj.__indexed_buckets) {
                        $c._add_to_index(obj.__indexed_buckets, value);
                    }
                    return true;
                }
                if ($c.isDomElement(index)) {
                    var temp = index;
                    index = value;
                    value = temp;
                }
                if ($c.isDomElement(value)) {
                    var children = this.children;
                    index = index || 0;
                    if (children.length > index) {
                        this.insertBefore(value, children[index]);
                        return true;
                    } else if (children.length == index) {
                        this.appendChild(value);
                        return true;
                    }
                    return false;
                }
            } catch (e) {
                error((_isArray(this) ? "Array" : "DOM") + ".insertAt", e);
                return false;
            }
        }
        function _invokeHashChange() {
            try {
                var hc = $COMMIT.onhashchange || $c.onhashchange;
                hc && _isFunction(hc) && hc();
            } catch (e) {
                error('_invokeHashChange', e);
            }
        }
        function _isArray(obj) {
            return _type_check(obj, Array);
        }
        function _isEmpty(obj) {
            /*|{
                "info": "Object class extension to check if it is empty",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isEmpty",
                "returnType": "(Bool)"
            }|*/
            try {
                if (_isArray(obj) || _isString(obj)) { return !obj.length; }
                if ($c.isObject(obj)) { return !_itemCount(obj); }
                if (_isFunction(obj)) {
                    return /function.*?\(.*?\)\{\}/.test(obj.toString().replace(/[\n ]/g, ''));
                }
                return false;
            } catch (e) {
                error("Object.isEmpty", e);
                return false;
            }
        }
        function _isFunction(obj) {
            try {
                return _type_check(obj, Function)
            } catch (e) {
                error('_isFunction', e);
            }
        }
        function _isString(obj) {
            try {
                if (isNull(obj)) { return false; }
                return (obj.constructor == String);
            } catch (e) {
                error('_isString', e);
            }
        }
        function isSubset(obj, compare, sharesAny) {
            try {
                var isArray = _isArray(obj) && _isArray(compare);
                if (($c.isObject(obj) && $c.isObject(compare)) || isArray) {

                    for (var prop in obj) {
                        if (!obj.hasOwnProperty(prop)) { continue; }
                        if (!isArray && !compare.hasOwnProperty(prop) || isArray && !_contains(compare, obj[prop])) { return false; }
                        if (sharesAny) { return true; }
                    }

                    return true;
                } else {
                    return ~obj.toString().indexOf(compare.toString()) && obj.constructor == compare.constructor;
                }
            } catch (e) {
                error('Object.isSubset', e);
            }
        }
        function _itemCount(obj) {
            try {
                if ($c.isObject(obj)) {
                    var count = 0;
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) { count++; }
                    }
                    return count;
                }
                return undefined;
            } catch (e) {
                error('Object.itemCount', e);
            }
        }
        function _joinHelper(objs, arr, on, exclusive) {
            var records = [], propRef = [], objRef = arr[0] || {};

            if (_isString(on)) {
                on = on.split('=');
                if (on.length == 1) { on = [on, on]; }
                var name = _getFuncName(arguments.callee.caller);
                on = $c.trim(on);
                name == "joinRight" && (on = [on[1], on[0]]);
            }

            for (var prop in objRef) {
                if (objRef.hasOwnProperty(prop)) {
                    propRef.push(prop);
                }
            }
            for (var i = 0, len = objs.length; i < len; i++) {
                var record = $c.duplicate(objs[i], true), query = {}, results;
                query[on[1]] = record[on[0]];
                results = $c.where(arr, query);
                if (results.length > 0) {
                    records.push($c.merge(record, results[0]));
                } else if (!exclusive) {
                    for (var j = 0, jlen = propRef.length; j < jlen; j++) {
                        record[propRef[j]] = record[propRef[j]] || null;
                    }
                    records.push(record);
                }
            }
            return records;
        }
        function _makePrecedenceBlocks(condition) {
            try {
                var index = condition.indexOf('('),
                    parts = { before: '', after: '', block: {} };
                if (~index) {
                    var lindex = condition.lastIndexOf('(');
                    parts.before = condition.substring(0, index).trim();
                    parts.after = condition.substring(lindex).trim();
                    parts.block = _makePrecedenceBlocks(condition.substring(index + 1, lindex - 1));
                    return parts;
                }
                parts.block = condition;
                return parts;
            } catch (e) {
                error('_makePrecedenceBlocks', e);
            }
        }
        function _nextElementSibling() {
            try {
                var next = this.nextSibling;
                while (next && next.nodeType != 1) {
                    next = next.nextSibling;
                }
                return next;
            } catch (e) {
                error("DOM._nextElementSibling", e);
                return false;
            }
        }
        function _on(evt, callback, evtObj) {
            /*|{
                "info": "Function listener to register events : HTMLElement class extension to handle and trigger events",
                "category": "Function,HTMLElement",
                "parameters":[
                    {"event":"(String) Event name to listen on and invoked on emit/HTMLElement trigger"},
                    {"func":"(Function) Function to call on emit/HTMLElement trigger"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#function.on",
                "returnType": "(void)"
            }|*/
            if ($c.isDomElement(this)) {
                try {
                    if (!callback) {
                        var funcs = this.events[evt], func, i = 0;
                        while (func = funcs[i++]) {
                            func(evtObj);
                        }
                    } else {
                        this.events = this.events || {};
                        this.events[evt] = this.events[evt] || [];
                        this.events[evt].push(callback);
                        !this.getAttribute("on" + evt) && this.setAttribute("on" + evt, "this.on('" + evt + "',null,(event || $w.event));");
                    }
                } catch (e) {
                    error("HTMLElement.on", e);
                }
                return;
            }
            if (_isFunction(this)) {
                try {
                    this["_" + evt] = this["_" + evt] || [];
                    this["_" + evt].push(callback);
                } catch (e) {
                    error("Function.on", e);
                }
                return
            }
        }
        function _orderListHelper(value, sorter, arr) {
            try {
                var ii = 0, i = 0, len = arr.length, origlen = arr.length;
                if (!~sorter(value, arr[0])) { return 0; }
                if (sorter(value, arr[len - 1]) === 1) { return len; }
                while (len > 1) {
                    len = Math.ceil(len / 2);
                    ii = i + len;
                    if (ii >= origlen) { ii = origlen - 1; }
                    var order = sorter(value, arr[ii]);
                    if (order === 0) { return ii; }
                    if (order === 1) { i = ii++; }
                    if (ii + 1 == origlen && len > 1) { len = 2; }
                }
                return ii;

            } catch (e) {
                error("OrderedList._orderListHelper", e);
                return false;
            }
        }
        function _processClause(clause) {
            try {
                var index = _indexOfAlt(clause, /between/i);
                if (~index) { // contains between predicate
                    //replace AND in the between to prevent confusion for AND clause separator
                    clause.replace(/between( .*? )and( .*?)( |$)/gi, 'between$1&and$2$3');
                }

                var ORs = clause.split(/ or /i), query = { "$or": [] }, i = 0, or;
                while (or = ORs[i++]) {
                    var ANDs = or.split(/ and /i),
                        aquery = { '$and': [] }, j = 0, and;
                    while (and = ANDs[j++]) {
                        var predicateClause = and,
                            cond = {};

                        //=, <>, >, >=, <, <=, IN, BETWEEN, LIKE, IS NULL or IS NOT NULL
                        switch (true) {
                            case !!~(index = predicateClause.indexOf('=')):
                                cond[predicateClause.substring(0, index).trim()] = { '$equals': $c.tryEval(predicateClause.substring(index + 1).trim()) };
                                aquery['$and'].push(cond);
                                break;
                            case !!~(index = predicateClause.indexOf('<>')):
                                cond[predicateClause.substring(0, index).trim()] = { '$ne': $c.tryEval(predicateClause.substring(index + 1).trim()) };
                                aquery['$and'].push(cond);
                                break;
                            case !!~(index = predicateClause.indexOf('>')):
                                cond[predicateClause.substring(0, index).trim()] = { '$gt': $c.tryEval(predicateClause.substring(index + 1).trim()) };
                                aquery['$and'].push(cond);
                                break;
                            case !!~(index = predicateClause.indexOf('>=')):
                                cond[predicateClause.substring(0, index).trim()] = { '$gte': $c.tryEval(predicateClause.substring(index + 1).trim()) };
                                aquery['$and'].push({ '$gte': cond });
                                break;
                            case !!~(index = predicateClause.indexOf('<')):
                                cond[predicateClause.substring(0, index).trim()] = { '$lt': $c.tryEval(predicateClause.substring(index + 1).trim()) };
                                aquery['$and'].push(cond);
                                break;
                            case !!~(index = predicateClause.indexOf('<=')):
                                cond[predicateClause.substring(0, index).trim()] = { '$lte': $c.tryEval(predicateClause.substring(index + 1).trim()) };
                                aquery['$and'].push(cond);
                                break;
                            case _indexOfAlt(predicateClause, /between/i) == 0:
                                var nums = predicateClause.replace(/between (.*?) &and (.*?) ( |$)/i, '$1,$2').split(',');
                                aquery['$and'].push({ '$gte': $c.tryEval(nums[0]) });
                                aquery['$and'].push({ '$lte': $c.tryEval(nums[1]) });
                                break;
                            case !!~(index = _indexOfAlt(predicateClause, / in /i)):
                                var _in = $c.tryEval(predicateClause.substring(index + 4).trim().replace(/\((.*)\)/, '[$1]'));
                                if (!_in) {
                                    //noinspection ExceptionCaughtLocallyJS
                                    throw "Invalid syntax near 'in'";
                                }
                                cond[predicateClause.substring(0, index).trim()] = _in;
                                aquery['$and'].push({ '$in': cond });
                                break;
                            case !!~(index = _indexOfAlt(predicateClause, /is null/i)):
                                cond[predicateClause.substring(0, index).trim()] = null;
                                aquery['$and'].push({ '$equals': cond });
                                break;
                            case !!~(index = _indexOfAlt(predicateClause, /is not null/i)):
                                cond[predicateClause.substring(0, index).trim()] = null;
                                aquery['$and'].push({ '$ne': cond });
                                break;
                            case !!~(index = _indexOfAlt(predicateClause, / like /i)):
                                var likeVal = "^" + $c.replace_all(_trim(predicateClause.substring(index + 6), null, [' ', "'", '"']), "%", ".*?") + "$";
                                cond[predicateClause.substring(0, index).trim()] = { '$regex': new RegExp(likeVal, 'i') };
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
        function _querySelectorAll(selector, max) {
            var style = document.createStyleSheet(), arr = [], allDocs = document.all, i = 0, elem;
            style.addRule(selector, "k:v");
            while (elem = allDocs[i++] && arr.length < max) {
                if (elem.currentStyle.foo === "bar") {
                    arr.push(elem);
                }
            }
            style.removeRule(0);
            return arr;
        }
        function _rangeSearch(sarr_arg, options) {
            var sarr = sarr_arg,
                value = options.condition,
                findIndex = options.find_index;

            if ($c.isObject(value)) {
                var tmp_arr = [], ranges = [];
                for (var cprop in value) {
                    if (value.hasOwnProperty(cprop)) {
                        var found_index = -1;
                        var opt = {
                            prop: prop,
                            condition: cprop == "$exists" ? undefined : value[cprop],
                            find_index: true,
                            start_index: null,
                            end_index: null
                        };
                        if (cprop != "$in" && cprop != "$nin") {
                            found_index = _rangeSearch(sarr, opt);
                        }
                        switch (cprop) {
                            case "$eq":
                            case "$equal":
                                _record_range(ranges, found_index, found_index);
                                break;
                            case "$ne":
                                _record_range(ranges, 0, found_index - 1);
                                _record_range(ranges, found_index + 1, sarr.__bucket__keys.length);
                                break;
                            case "$lt":
                                _record_range(ranges, 0, found_index - 1, 1);
                                break;
                            case "$lte":
                                _record_range(ranges, 0, found_index + 1, 1);
                                break;
                            case "$gt":
                                _record_range(ranges, found_index + 1, sarr.__bucket__keys.length /*- 1*/, 2);
                                break;
                            case "$gte":
                                _record_range(ranges, found_index, sarr.__bucket__keys.length /*- 1*/, 2);
                                break;
                            case "$exists":
                                var rng;
                                if (value[cprop]) {
                                    _record_range(ranges, 0, found_index - 1);
                                    _record_range(ranges, found_index + 1, sarr.__bucket__keys.length);
                                } else {
                                    _record_range(ranges, found_index, found_index);
                                }
                                break;
                            case "$in":
                                for (var i = 0, len = value[cprop].length; i < len; i++) {
                                    found_index = sarr.__bucket__keys.indexOf(value[cprop][i]);
                                    _record_range(ranges, found_index, found_index);
                                }
                                break;
                            case "$nin":
                                var rng = [];
                                for (var i = 0, len = value[cprop].length; i < len; i++) {
                                    found_index = sarr.__bucket__keys.indexOf(value[cprop][i]);
                                    rng.push([found_index, found_index]);
                                }
                                rng = _reverse_range(rng, 0, sarr.__bucket__keys.length /*- 1*/)
                                for (var i = 0, len = rng.length; i < len; i++) {
                                    _record_range(ranges, rng[i][0], rng[i][1]);
                                }
                                break;
                        }
                    }
                }
                for (var i = 0, len = ranges.length; i < len; i++) {
                    var range = ranges[i];
                    for (var j = range[0], jlen = range[1] + 1; j < jlen; j++) {
                        tmp_arr = tmp_arr.concat(sarr[sarr.__bucket__keys[j]]);
                    }
                }
                return tmp_arr;
            }

            if (findIndex) {
                return sarr.__bucket__keys.indexOf(value);
            }
            return sarr[value];
        }
        function _record_range(ranges, start, end, flag) {
            // flag 1 means $lt(e) 2 means $gt(e)
            if (!ranges.length) { return ranges.push([start, end]); }
            if (ranges[0][0] > end) {
                return ranges.unshift([start, end]);
            }
            if (ranges[ranges.length - 1][1] < start) {
                return ranges.push([start, end]);
            }
            for (var i = 0, len = ranges.length; i < len; i++) {
                var range = ranges[i];
                if (end <= range[1] && flag === 1) {
                    if (i) {
                        $c.removeAt(ranges, i);
                        i--, len--;
                    }
                    ranges[i][1] = end;
                    return;
                }
                if (start > range[1] + 1) {
                    if (flag === 2) {
                        var r = $c.removeAt(ranges, j);
                        j--, len--;
                    }
                    continue;
                }
                if (start <= range[1] + 1) {
                    if (flag === 2) {
                        range[0] = start;
                        return;
                    }
                    for (var j = i + 1; j < len; j++) {
                        var rg = ranges[j];
                        if (rg[0] - 1 > end) {
                            break;
                        }
                        if (rg[1] >= end || rg[0] - 1 == end) {
                            $c.removeAt(ranges, j);
                            j--, len--;
                            end = rg[1];
                            break;
                        }
                        if (rg[1] < end) {
                            var r = $c.removeAt(ranges, j);
                            j--, len--;
                        }
                    }
                    if (range[1] > end) { end = range[1]; }
                    else { range[1] = end; }

                }
            }
        }
        function _redact(docs, expr) {
            try {
                docs = _isArray(docs) ? docs : [docs];
                var result = [], i = 0, doc;
                while (doc = docs[i++]) {
                    var action = __parseCond(doc, expr);
                    if (action == "$$KEEP") {
                        result.push(doc);
                    } else if (action == "$$DESCEND") { // return all fields at current document without embedded documents
                        result.push(doc);
                        for (var prop in doc) {
                            if (!doc.hasOwnProperty(prop) || _isArray(doc[prop]) && !$c.isObject(doc[prop][0]) || !_isArray(doc[prop]) && !$c.isObject(doc[prop])) {
                                continue;
                            }
                            doc[prop] = _redact(doc[prop], expr);
                            if (doc[prop] === undefined) {
                                delete doc[prop];
                            }
                        }
                    } else if (action == "$$PRUNE") {
                    } else {
                        throw "exception: $redact's expression should not return anything aside from the variables $$KEEP, $$DESCEND, and $$PRUNE, but returned " + parseRaw(action);
                    }
                }
                return result.length ? result : undefined;
            } catch (e) {
                error('aggregate._redact', e);
            }
        }
        function _remove(value, indexOf) {
            /*|{
                "info": "Array class extension to remove an item by value : HTMLElement class extension to remove the element from the DOM tree",
                "category": "Array,HTMLElement",
                "parameters":[
                    {"value": "(Mixed) Value to remove (when using with Arrays)"}],

                "overloads":[
                    {"parameters":[
                        {"value": "(Mixed) Value to remove (when using with Arrays)"},
                        {"indexOf": "(Function) Callback function to use to find the item based on the value (when using with Arrays)"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.remove",
                "returnType": "(Mixed)"
            }|*/
            try {
                if ($c.isDomElement(this)) {
                    return this.parentNode.removeChild(this);
                }
                if (_isArray(this)) {
                    indexOf = indexOf || this.indexOf;
                    var index = indexOf.call(this, value);
                    if (!~index) { return false; }
                    if (this.__indexed_buckets) {
                        _remove_from_index(this.__indexed_buckets, this[index]);
                    }
                    return this.splice(index, 1)[0];
                }
            } catch (e) {
                error(($c.isDomElement(this) ? "DOM" : _getFuncName(this.constructor)) + ".remove", e);
                return false;
            }
        }
        function _remove_from_index(buckets, obj) {
            for (var prop in buckets) {
                var sarr = buckets[prop][obj[prop]],
                    index = sarr.indexOf(obj);
                if (~index) {
                    sarr.splice(index, 1);
                }
                if (!sarr.length) {
                    delete buckets[prop][obj[prop]];
                    var keys = buckets[prop].__bucket__keys;
                    keys.splice(keys.indexOf(obj[prop]), 1);
                }
            }
        }
        function _replace_all(str, replace, subject, flag) {
            try {
                if (!_isArray(replace)) {
                    replace = [replace];
                }
                if (!_isArray(subject)) {
                    subject = [subject];
                }
                var last = 0;
                for (var i = 0, len = replace.length; i < len; i++) {
                    var rep = replace[i];
                    var reg = new RegExp(__convert_regex_safe(rep), flag);
                    if (!_contains(str, reg)) { continue; }
                    str = str.replace(reg, subject[i] === undefined ? subject[last] : subject[i]);
                    if (subject[last + 1]) { last++; }
                }
                return str.toString();
            } catch (e) {
                error("_replace_all", e);
            }
        }
        function _reverse_range(ranges, start, end) {
            var reverse = [];
            reverse.items = 0;
            for (var i = 0, len = ranges.length; i < len; i++) {
                var range = ranges[i];
                if (end < range[1]) { return reverse; }
                if (range[0] > start) {
                    reverse.items += range[0] - start + 1;
                    reverse.push([start, range[0] - 1]);
                    start = range[1] + 1;
                }
            }
            var range = ranges[ranges.length - 1];
            if (range[1] < end) {
                reverse.push([range[1] + 1, end]);
            }
            return reverse;
        }
        function _run_func_array(funcs, args) {
            var self = this;
            !_isArray(funcs) && (funcs = [funcs]);
            var i = 0, func, rtn = [];
            while (func = funcs[i++]) {
                try {
                    if (_isFunction(func)) {
                        rtn = rtn.concat(func.apply(self, args));
                    } else if ($c.isGenerator(func)) {
                        $c.tryEval('$c.syncroit(function *(){rtn = rtn.concat(yield func.apply(self,args));});');
                    } else if ($c.isAsync(func)) {
                        $c.tryEval('(async function (){rtn = rtn.concat(yield func.apply(self,args));})();');
                    }
                } catch (e) {
                    throw e;
                }
            }
            return rtn;
        }
        function _set(variable, value, defer, options, loc) {
            try {
                value = encodeURI(value);
                var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "",
                    regex = new RegExp('(.*)?(' + variable + '=)(.*?)(([&]|[@])(.*)|$)', ignoreCase),
                    attr = "search",
                    symbol = "&",
                    queryStr = "";
                //noinspection CommaExpressionJS
                attr = variable.indexOf('@') == 0 ? (symbol = '', "hash") : attr;

                $COMMIT[attr] = $COMMIT[attr] || "";

                if (defer) {
                    $COMMIT[attr] = ($COMMIT[attr] || $l[attr]);
                    queryStr = regex.test($COMMIT[attr]) ?
                        $COMMIT[attr].replace(regex, '$1$2' + value + '$4') :
                        $COMMIT[attr] + symbol + variable + '=' + value;
                    if (symbol == "&" && queryStr.indexOf('&') == 0) {
                        queryStr = "?" + queryStr.substring(1);
                    }
                    $COMMIT[attr] = queryStr;
                    $COMMIT.update = true;
                } else {
                    queryStr = regex.test(loc[attr]) ?
                        loc[attr].replace(regex, '$1$2' + value + '$4') :
                        loc[attr] + symbol + variable + '=' + value;
                    if (symbol == "&" && queryStr.indexOf('&') == 0) {
                        queryStr = "?" + queryStr.substring(1);
                    }
                    loc[attr] = queryStr;
                    if (attr == 'hash') {
                        $COOKIE("CRAYDENTHASH", loc.hash[0] == '#' ? loc.hash.substring(1) : loc.hash);
                        _invokeHashChange();
                    }
                }
                return loc;
            } catch (e) {
                error("_set", e);
            }
        }
        function _setDOMElementProperties(_elem) {
            try {
                if (!_elem) {
                    return;
                }
                for (var prop in $w.HTMLElement.prototype) {
                    if ($w.HTMLElement.prototype.hasOwnProperty(prop)) {
                        try {
                            if (prop == "dataset" || prop == "firstElementChild" || prop == "nextElementSibling") {
                                _elem[prop] = $w['_' + prop]();
                                //return;
                            }
                            _elem[prop] = $w.HTMLElement.prototype[prop];
                        } catch (e) {

                        }
                    }
                }
            } catch (e) {
                error("_setDOMElementProperties", e);
            }
        }
        function _startsWith() {
            /*|{
                "info": "String class extension to check if the string starts with the given string",
                "category": "String",
                "parameters":[
                    {"infinite": "any number of String arguments can be passed"}],

                "overloads":[
                    {"parameters":[
                        {"arr": "(String[]) An array of strings to check"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.startsWith",
                "returnType": "(Bool)"
            }|*/
            try {
                var i = 1;
                var args = arguments;
                if (arguments.length < 3 && _isArray(arguments[1])) {
                    args = arguments[1];
                    i = 0;
                }
                for (var len = args.length; i < len; i++) {
                    var arg = args[i];
                    if (arg == this.slice(0, arg.length)) { return arg; }
                }
                return false;
            } catch (e) {
                error('String.startsWith', e);
            }
        }
        function _strip(str, character) {
            try {
                return _trim(str, undefined, character);
            } catch (e) {
                error("_strip", e);
            }
        }
        function _subFieldHelper(obj, operands) {
            try {
                if (!$c.isObject(obj)) {
                    return false;
                }

                for (var prop in obj) {
                    if (!obj.hasOwnProperty(prop)) { continue; }
                    if (prop in operands) {
                        return prop;
                    }
                }
                return false;
            } catch (e) {
                error('_subFieldHelper', e);
            }
        }
        function _subQuery(query, field, index, _whereRefs_arg) {
            try {
                var _whereRefs = _whereRefs_arg || [];
                if (!$c.isObject(query)) {
                    if (~field.indexOf(".")) { return "_equals($c.getProperty(record,\"" + field + "\"), " + $c.parseRaw(query) + ")"; }
                    return "_equals(record[\"" + field + "\"], " + $c.parseRaw(query) + ")";
                }
                var expression = "true", comparison_map = {
                    "$lt": "_clt",
                    "$lte": "_clte",
                    "$gt": "_cgt",
                    "$gte": "_cgte"
                };


                // prep multiple subqueries
                for (var prop in query) {
                    if (!query.hasOwnProperty(prop)) { continue; }
                    switch (prop) {
                        // value is the record in the array
                        // q is the conditional value
                        case "$equals":
                        case "$eq":
                        case "$regex":
                        case "$ne":
                            var val = _getValue(query[prop]), q = "(" + $c.parseRaw(val) + ")";
                            if (_isFunction(val)) {
                                q += "(record,\"" + field + "\",index)";
                            } else {
                                q = "_contains(values," + q + ")";
                            }
                            expression += " && ((values = _qnp(record, \"" + field + "\")).length && " + (prop == "$ne" ? "!" : "") + q + ")";
                            break;
                        case "$lt":
                        case "$lte":
                        case "$gt":
                        case "$gte":
                            expression += " && ((values = _qnp(record, \"" + field + "\")).length && " + comparison_map[prop] + "(values," + $c.parseRaw(query[prop]) + "))";
                            break;
                        case "$exists":
                            expression += " && ((finished = {validPath:0}),$c.getProperty(record,\"" + field + "\",\".\",finished),$c.parseBoolean(finished.validPath) == " + query["$exists"] + ")";
                            break;
                        case "$type":
                            var qt = $c.isNull(query["$type"]) ? "!" : "";
                            expression += " && (" + qt + "(values = _qnp(record, \"" + field + "\")).length && _ct(values," + _getFuncName(query["$type"]) + "))";
                        case "$text":
                            //return record.getProperty(field).contains(query["$search"]);
                            break;
                        case "$mod":
                            var qm = _isArray(query["$mod"]);
                            expression += " && ((values = _qnp(record, \"" + field + "\")).length && " + qm + " && _cm(values," + $c.parseRaw(query[prop]) + "))";
                            break;
                        case "$all":
                            var all = $c.parseRaw(query["$all"]) || undefined;
                            expression += " && (values = _qnp(record, \"" + field + "\")),(all = " + all + "),(_isArray(values[0]) && _isArray(all)) && (function(){ for (var j = 0, jlen = all.length; j < jlen; j++){ if (!_contains(values[0],all[j])) { return false; }} return true;})()";
                            break;
                        case "$size":
                            var ival = parseInt(query["$size"]);
                            expression += " && (values = _qnp(record, \"" + field + "\")[0]),(_isArray(values) ? (" + ival + " === values.length) : (values == undefined && 0 === " + ival + "))";
                            break;
                        case "$where":
                            var isfunc = _isFunction(query["$where"]);
                            if (isfunc) {
                                _whereRefs.push(query["$where"]);
                            }
                            var val = "(" + (isfunc ? "__where_cb" + _whereRefs.length : "function(){return (" + query["$where"] + ");}") + ")";
                            expression += " && " + val + ".call(record)";
                            break;
                        case "$elemMatch":
                            expression += " && (values = _qnp(record, \"" + field + "\")[0]),(_isArray(values) && !!$c.where(values," + $c.parseRaw(query["$elemMatch"]) + ",1).length)";
                            break;
                        case "$or":
                        case "$nor":
                            var ors = query[prop], o = 0, or, nor = "";
                            if (!_isArray(ors)) { return false; }
                            if (prop == "$nor") { nor = "!"; }
                            expression += " && " + nor + "(";
                            while (or = ors[o++]) {
                                expression += "(" + _subQuery(or, field, index, _whereRefs) + ") || ";
                            }
                            expression += "false)";

                            break;
                        case "$and":
                            var ands = query["$and"], a = 0, and;
                            if (!_isArray(ands)) { return false; }
                            expression += " && (";
                            while (and = ands[a++]) {
                                expression += "(" + _subQuery(and, field, index, _whereRefs) + ") && ";
                            }
                            expression += "true)";

                            break;
                        case "$not":
                            if (!$c.isObject(query["$not"])) {
                                expression += " && _contains(values, " + $c.parseRaw(query["$not"]) + ")";
                                break;
                            }

                            expression += " && !(" + _subQuery(query[prop], field, null, _whereRefs) + ")";
                            break;

                        case "$in":
                        case "$nin":
                            expression += " && " + (prop == "$nin" ? "!" : "") + "((values = _qnp(record, \"" + field + "\")[0]),_contains(" + $c.parseRaw(query[prop]) + ",values))";
                            break;
                        default:
                            expression += " && " + _subQuery(query[prop], $c.replace_all(prop, "\"", "\\\""), null, _whereRefs);
                            break;
                    }
                }
                return expression;
            } catch (e) {
                error("_subQuery", e);
            }
        }
        function _toCurrencyNotation(sep) {
            /*|{
                "info": "Number/String class extension to change number to currency",
                "category": "String",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                    {"separator": "(Char) Character to use as delimiter"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#String.toCurrencyNotation",
                "returnType": "(String)"
            }|*/
            sep = sep || ",";
            var whole = this.toString(), fraction = "";
            if (sep != ".") {
                var part = whole.split('.');
                if (part.length > 1) {
                    whole = part[0];
                    fraction = '.' + part[1];
                }
            }
            return whole.replace(/\B(?=(\d{3})+(?!\d))/g, sep) + fraction;
        }
        function _trim(str, side, characters) {
            try {
                var temp = str,
                    trimChars = {
                        " ": 1,
                        "\t": 1,
                        "\n": 1
                    };
                if (characters) {
                    if (_isArray(characters)) {
                        var ch, i = 0;
                        trimChars = {};
                        while (ch = characters[i++]) {
                            trimChars[ch] = 1;
                        }
                    } else if (_isString(characters)) {
                        trimChars = eval('({"' + __convert_regex_safe(characters) + '":1})');
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
                error("_trim", e);
            }
        }
        function _type_check(obj, cls, backward_compatible) {
            try {
                if (isNull(obj)) { return false; }
                if (backward_compatible) { return obj.constructor.name == cls; }
                return obj.constructor == cls;
            } catch (e) {
                error('is' + cls.constructor.name, e);
            }
        }
        function _unwind(docs, path) {
            try {
                var results = [], doc, i = 0, options = {};
                if ($c.isObject(path)) {
                    options = path;
                    path = options.path;
                }
                while (doc = docs[i++]) {
                    var arr = __processExpression(doc, path);
                    if (isNull(arr) || _isArray(arr) && _isEmpty(arr)) {
                        doc = $c.duplicate(doc);
                        if (options.includeArrayIndex) {
                            doc[options.includeArrayIndex] = 0;
                        }
                        options.preserveNullAndEmptyArrays && results.push(doc);
                        continue;
                    }
                    if (!_isArray(arr)) {
                        throw "Exception: Value at end of $unwind field path '" + path + "' must be an Array, but is a " + $c.capitalize(typeof arr) + ".";
                    }
                    if (path[0] == "$") {
                        path = path.substr(1);
                    }
                    for (var j = 0, jlen = arr.length; j < jlen; j++) {
                        var dup = $c.duplicate(doc);
                        if (options.includeArrayIndex) {
                            dup[options.includeArrayIndex] = j;
                        }
                        $c.setProperty(dup, path, arr[j]);
                        results.push(dup);
                    }
                }
                return results;
            } catch (e) {
                error('aggregate._unwind', e);
            }
        }
        function _where_function(options) {
            var obj = options.obj, condition = options.condition || foo;
            var limit = 0,
                jlen = obj.length,
                rarr = [], ai = 0;

            limit = options.limit || jlen;
            for (var j = 0; j < jlen && rarr.length < limit; j++) {
                var v = obj[j];
                if (condition.call(v, v)) {
                    rarr.push(v);
                }
            }

            return rarr;
        }


        /*----------------------------------------------------------------------------------------------------------------
        /-	Custom Classes
        /---------------------------------------------------------------------------------------------------------------*/
        function Benchmarker() {
            /*|{
                "info": "Class used to measure the run time of code",
                "category": "Class",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#Benchmarker",
                "returnType": "(void)"
            }|*/
            try {
                this.executionTime = 0;
                this.start = function () {
                    this._start = new Date();
                    this._end = 0;
                };
                this.stop = function () {
                    this._end = new Date();
                    return this.executionTime = (this._end - this._start) / 1000;
                };
                this.start();
            } catch (e) {
                error('BenchMarker', e);
            }
        }
        function Cursor(records) {
            /*|{
                "info": "Cursor class to facilitate iteration",
                "category": "Class",
                "parameters":[
                    {"records": "(Array) Array used to create the iterator to iterate each item"}],

                "overloads":[
                    {"parameters":[
                        {"records": "(Object) Object used to create the iterator to iterate each property"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#Cursor",
                "returnType": "(Cursor)"
            }|*/
            try {
                var props = [],
                    currentIndex = 0,
                    arr = $c.duplicate(records || [], true);
                if ($c.isObject(arr)) {
                    for (var prop in arr) {
                        if (!arr.hasOwnProperty(prop)) { continue; }
                        props.push(prop);
                    }
                    props.sort();
                } else if (_isArray(arr)) {
                    var i = 0, len = arr.length;
                    while (i++ < len) {
                        props.push(i - 1);
                    }
                }
                arr.hasNext = function () { return currentIndex < props.length; };
                arr.next = function () {
                    this.current = this[props[currentIndex]];
                    return { value: this[props[currentIndex++]], done: currentIndex >= this.size() };
                };
                arr.reset = function () { currentIndex = 0; };
                arr.setNextIndex = function (value) {
                    value = parseInt(value) || 0;
                    if (value < 0) { value = 0; }
                    else if (value >= props.length) { value = props.length - 1; }
                    currentIndex = value;
                    arr.current = arr[props[currentIndex]];
                };
                arr.current = arr[props[currentIndex]];

                arr.size = function () { return props.length; };
                return arr;
            } catch (e) {
                error('Cursor', e);
            }
        }
        function OrderedList(records, sorter) {
            /*|{
                "info": "Collection class that filters out duplicate values and maintains an ordered list",
                "category": "Class",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"records": "(Array) Array used to create the initial items in the ordered list"}]},

                    {"parameters":[
                        {"records": "(Array) Array used to create the initial items in the ordered list"},
                        {"sorter": "(Function) Function for sorting logic"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#OrderedList",
                "returnType": "(OrderedList)"
            }|*/
            try {
                sorter = sorter || function (a, b) { if (a < b) { return -1; } if (a > b) { return 1; } return 0; };
                var arr = $c.duplicate(records || [], true).sort(sorter), nextIndex = 0;
                arr.add = function (value) {
                    if (!this.length) { return this.push(value); }
                    var index = _orderListHelper(value, sorter, this);
                    return $c.insertBefore(this, index, value);
                };
                arr.next = function () {
                    return { value: this[nextIndex++], done: nextIndex >= this.size() };
                };
                arr.hasNext = function () { return nextIndex < this.size(); };
                arr.size = function () { return this.length; };
                return arr;
            } catch (e) {
                error('OrderedList', e);
            }
        }
        function Queue(records) {
            /*|{
                "info": "Collection class that follows FIFO",
                "category": "Class",
                "parameters":[
                    {"records": "(Array) Array used to create the iterator to iterate each item"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#Queue",
                "returnType": "(Queue)"
            }|*/
            try {
                var arr = $c.duplicate(records || [], true), nextIndex = 0;
                arr.enqueue = function (value) { this.push(value); };
                arr.dequeue = function () { return this.splice(0, 1)[0]; };
                arr.next = function () { return { value: this[nextIndex++], done: nextIndex >= this.size() }; };
                arr.hasNext = function () { return nextIndex < this.size(); };
                arr.size = function () { return this.length; };
                return arr;
            } catch (e) {
                error('Queue', e);
            }
        }
        function Request() {
            /*|{
                "info": "Create cross browser XMLHttpRequest object",
                "category": "Utility",
                "parameters":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#Request",
                "returnType": "(XMLHttpRequest)"
            }|*/
            var ajaxHttpCaller;
            try {
                //request object for mozilla
                ajaxHttpCaller = new XMLHttpRequest();
            } catch (ex) {
                //request object for IE
                try {
                    ajaxHttpCaller = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (ex) {
                    try {
                        ajaxHttpCaller = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (ex) //noinspection JSConstructorReturnsPrimitive
                    {
                        error("Request", e);
                        return null;
                    }
                }
            }
            return ajaxHttpCaller;
        }
        /*Responsivizer*/
        /* Responsive actions for 3 tiers
            by Corey Hadden
            var Responsive;
            $(document).ready(initLayout);

            function initLayout(){
            initResponsive();
            }

            function initResponsive(){
            $c.Responsive = new Responsivizer();
            //updateDebug();
            window.onresize = respond;
            }
            function respond(){
            $c.Responsive.respond();
            var rsize = ''
            updateDebug();
            }

            function updateDebug(){
            var html =
            "css: "+$('body')[0].className+
            "["+"w"+$(window).width()+" | h"+$(window).height()+']';
            $('#debug').html(html);
            }*/

        function Responsivizer() {
            this.Body = $d.getElementsByTagName('body')[0];
            this.resp_class = 'responsive ';
            this.respond = function () {
                this.updateInfo();
                var newBodyClass = this.resp_class;
                //this.Body.className = this.resp_class;
                //large screen mode	>1050
                if (this.winW > 1049) {
                    newBodyClass += "large-window ";
                }
                //middle screens, tablet
                if (this.winW < 1050 && this.winW > 700) {
                    newBodyClass += "medium-window ";
                    //check orientation
                    //landscape
                    if (this.winW > 800) {
                        newBodyClass += "landscape ";
                    }
                    //portrait
                    else {
                        newBodyClass += "portrait ";
                    }

                }
                //small screen
                if (this.winW <= 700) {
                    newBodyClass += "small-window ";
                    //check orientation
                    if (this.winW > 420) {
                        newBodyClass += "landscape ";
                    }
                    //portrait
                    else {
                        newBodyClass += "portrait ";
                    }
                }
                this.Body.className = newBodyClass;

            };

            this.updateInfo = function () {
                this.winW = $(window).width();
                this.winH = $(window).height();
            };

            this.respond();
            return this;
        }
        function Set(records) {
            /*|{
                "info": "Collection class that filters out duplicate values",
                "category": "Class",
                "parameters":[
                    {"records": "(Array) Array used to create the iterator to iterate each item"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#Set",
                "returnType": "(Set)"
            }|*/
            try {
                var arr = $c.duplicate(records || []), nextIndex = 0;
                arr.add = function (value) {
                    var push = true;
                    for (var i = 0, len = this.length; i < len; i++) {
                        if (_equals(value, this[i])) {
                            push = false;
                            break;
                        }
                    }
                    if (push) { return !!arr.push(value); }
                    return false;
                };
                arr.clear = function (val, indexOf) { $c.removeAll(this, val, indexOf); };
                arr.clean = function () { $c.toSet(this) };
                arr.next = function () { return { value: this[nextIndex++], done: nextIndex >= this.size() }; };
                arr.hasNext = function () { return nextIndex < this.size(); };
                arr.size = function () { return this.length; };
                arr.clean();
                return arr;
            } catch (e) {
                error('Set', e);
            }
        }



        /*----------------------------------------------------------------------------------------------------------------
        /-	Global Utility Methods
        /---------------------------------------------------------------------------------------------------------------*/
        function $COMMIT(options) {
            /*|{
                "info": "Commit changes using $GET, $SET, and $DEL with defer flag",
                "category": "Utility",
                "featured": true,
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"options": "specify options for no history, etc"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#$COMMIT",
                "returnType": "(void)"
            }|*/
            try {
                options = options || {};
                var noHistory = options.noHistory || options == "noHistory" || options == "h";
                if ($COMMIT.update) {
                    if ($COMMIT.search) {
                        if (noHistory) {
                            $l.replace($COMMIT.search + ($COMMIT.hash || ""));
                        } else {
                            $l.href = $COMMIT.search + ($COMMIT.hash || "");
                        }
                    } else if ($COMMIT.hash) {
                        if (noHistory) {
                            var hash = $COMMIT.hash[0] == '#' ? $COMMIT.hash : "#" + $COMMIT.hash;
                            $l.replace($COMMIT.hash);
                        } else {
                            $l.hash = $COMMIT.hash;
                        }
                        $COOKIE("CRAYDENTHASH", $l.hash[0] == '#' ? $l.hash.substring(1) : $l.hash);
                        _invokeHashChange();
                    }
                    $ROLLBACK();
                }
            } catch (e) {
                error('$COMMIT', e);
            }
        }
        function $COOKIE(key, value, options) {
            /*|{
                "info": "Get/set Cookies",
                "category": "Utility",
                "featured": true,
                "parameters":[
                    {"key": "(String) Key for cookie value"}],

                "overloads":[
                    {"parameters":[
                        {"key": "(String) Key for cookie"},
                        {"option": "(Object) Specify delete"}]},
                    {"parameters":[
                        {"keyValue": "(Object) Specify the key value pair"},
                        {"option": "(Object) Specify path, domain, and/or expiration of cookie"}]},
                    {"parameters":[
                        {"key": "(String) Key for cookie value"},
                        {"value": "(String) Value to store"},
                        {"option": "(Object) Specify path and/or expiration of cookie"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#$COOKIE",
                "returnType": "(Mixed)"
            }|*/
            try {
                options = options || {};
                var c = $d.cookie, path = "", domain = "", keys = [], values = [];
                options.cookie && (c = options.cookie);
                if ($c.isObject(key)) {
                    options = value;
                    for (var prop in key) {
                        if (!key.hasOwnProperty(prop)) { continue; }
                        value.push(JSON.stringify(key[prop]));
                        keys.push(prop);
                    }
                } else if (_isString(key) && $c.isObject(value)) {
                    options = value;
                    value = undefined;
                } else if (arguments.length > 1) {
                    keys.push(key);
                    values.push(JSON.stringify(value));
                }

                if (!c && !values.length) { return {}; }
                if (options.path && _isString(options.path)) { path = 'path=' + (options.path || '/') + ';' }
                if (options.domain && _isString(options.domain)) { domain = 'domain=' + options.domain + ';' }
                if (options["delete"]) {
                    $d.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;' + path + domain;
                    return true;
                }

                if (values.length) {
                    var expires = ";";
                    if ($c.isInt(options.expiration)) {
                        var dt = new Date();
                        dt.setDate(dt.getDate() + options.expiration);
                        expires = ";expires=" + dt.toUTCString();
                    }
                    for (var j = 0, jlen = keys.length; j < jlen; j++) {
                        $d.cookie = encodeURIComponent(keys[j]) + "=" + encodeURIComponent(values[j]) + expires + path + domain;
                    }
                    return true;
                }
                var cookies = {},
                    arr = c.split(/[,;]/);
                for (var i = 0, len = arr.length; i < len; i++) {
                    var cookie = arr[i];
                    var parts = cookie.split(/=/, 2),
                        name = decodeURIComponent(parts[0] && parts[0].ltrim && parts[0].ltrim() || ""),
                        value = parts.length > 1 ? decodeURIComponent($c.rtrim(parts[1])) : null;
                    cookies[name] = $c.tryEval(value) || value;
                    if (key && key == name) {
                        return cookies[name];
                    }
                }

                if (key) {
                    return false;
                }
                return cookies;
            } catch (e) {
                error('$COOKIE', e);
            }
        }
        function $DELETE(variables, options) {
            /*|{
                "info": "Delete variable in url",
                "category": "Utility",
                "featured": true,
                "parameters":[
                    {"variables": "(String[]) variable names"}],

                "overloads":[
                    {"parameters":[
                        {"variables": "(String[]) variable names"},
                        {"options": "(Object) options to ignoreCase, defer, etc"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#$DEL",
                "returnType": "(Bool)"
            }|*/
            try {
                if (_isString(variables)) {
                    variables = [variables];
                }
                options = options || {};
                var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "",
                    defer = !!(options.defer || options == "defer"),
                    loc = {
                        'search': $l.search,
                        'hash': $l.hash
                    },
                    regex, attr;
                for (var i = 0, len = variables.length; i < len; i++) {
                    var variable = variables[i];
                    regex = new RegExp("[\?|&|@]" + variable + "=", ignoreCase);
                    attr = "search";
                    if (regex.test($l.hash)) {
                        attr = 'hash';
                    } else if (!regex.test($l.search)) {
                        continue;
                    }

                    $COMMIT[attr] = $COMMIT[attr] || "";

                    regex = new RegExp('([&]?|[@])(' + variable + '=([^&|^@]*)[&]?)', ignoreCase);

                    if (!defer) {
                        var noHistory = options.noHistory || options == "noHistory" || options == "h";
                        if (noHistory) {
                            if (loc.hash[0] != "#") {
                                loc.hash = "#" + loc.hash;
                            }
                            if (loc.search && loc.search[0] != "?") {
                                loc.search = "?" + loc.search;
                            }
                            $l.replace(loc.search.replace(regex, '') + loc.hash.replace(regex, ''));
                            return true;
                        }
                        $l[attr] = $l[attr].replace(regex, '');
                        if (attr == 'hash') {
                            _invokeHashChange();
                        }
                    } else {
                        $COMMIT[attr] = ($COMMIT[attr] || $l[attr]);
                        $COMMIT[attr] = $COMMIT[attr].replace(regex, '');
                        $COMMIT.update = true;
                    }
                }
                return true;
            } catch (e) {
                error("$DEL", e);
                return false;
            }
        }
        $w.$DEL = $DELETE;
        function $GET(variable, options) {
            /*|{
                "info": "Retrieve all or specific variables in the url",
                "category": "Utility",
                "featured": true,
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"keyValue": "(Object) specify the key value pair"}]},
                    {"parameters":[
                        {"keyValue": "(Object) specify the key value pair"},
                        {"options": "(Object) options to defer, ignore case, etc"}]},
                    {"parameters":[
                        {"key": "(String) key for query value"},
                        {"value": "(String) value to store"}]},
                    {"parameters":[
                        {"key": "(String) key for query value"},
                        {"value": "(String) value to store"},
                        {"options": "(Object) Options to defer, ignore case, etc"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#$GET",
                "returnType": "(Mixed)"
            }|*/
            try {
                options = options || {};
                if (!variable) {
                    var search = this.$l.search || "";
                    var hash = this.$l.hash || "";
                    if (options.url) {
                        var index = -1;
                        if (~(index = url.indexOf("#"))) {
                            hash = url.substring(index);
                            search = url.substring(0, index);
                        }
                        if (~(index = url.indexOf("?"))) {
                            search = url.substring(index);
                        }
                    }
                    var allkeyvalues = {},
                        mapFunc = function (value) {
                            if (value == "") {
                                return;
                            }
                            var keyvalue = value.split('='),
                                len = keyvalue.length;
                            if (len > 2) {
                                var i = 2, kv;
                                while (kv = keyvalue[i++]) {
                                    keyvalue[1] += kv;
                                }
                            }
                            return allkeyvalues[keyvalue[0]] = keyvalue[1];
                        };
                    ($l.search[0] == "?" ? $l.search.substr(1) : $l.search).split('&').map(mapFunc);
                    ($l.hash[0] == "#" ? $l.hash.substr(1) : $l.hash).split('@').map(mapFunc);
                    return allkeyvalues;
                }
                var ignoreCase = options.ignoreCase || options == "ignoreCase" ? "i" : "",
                    defer = /*!!$COMMIT.update && */(options.defer || options == "defer"),
                    regex = new RegExp("[\?|&|@]" + variable + "=", ignoreCase),
                    attr = "search",
                    location = {};
                location.hash = $l.hash;
                location.search = $l.search;

                if (defer) {
                    location.hash = $COMMIT.hash || "";
                    location.search = $COMMIT.search || "";
                } else if (options.url || $c && _isString && (_isString(options) && (~options.indexOf("?") || ~options.indexOf("#")))) {
                    var query = options.url || options,
                        hindex, qindex = query.indexOf("?");

                    ~qindex && (query = query.substr(qindex));

                    hindex = query.indexOf("#");
                    if (~hindex) {
                        location.hash = query.substr(hindex);
                        query = query.substr(0, hindex);
                    }
                    location.search = query;
                }

                var delimiter = "&";
                if (regex.test(location.hash)) {
                    attr = 'hash';
                    delimiter = "@";
                } else if (!regex.test(location.search)) {
                    return false;
                }
                regex = new RegExp('(.*)?(' + variable + '=)(.*?)(([' + delimiter + '])(.*)|$)', ignoreCase);
                return decodeURI(location[attr].replace(regex, '$3'));
            } catch (e) {
                logit('$GET');
                logit(e);
            }
        }
        function $ROLLBACK() {
            /*|{
                "info": "Rollback deferred changes from $GET, $SET, $DEL",
                "category": "Utility",
                "featured": true,
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#$ROLLBACK",
                "returnType": "(void)"
            }|*/
            try {
                delete $COMMIT.update;
                delete $COMMIT.noHistory;
                delete $COMMIT.search;
                delete $COMMIT.hash;
                delete $COMMIT.onhashchange;
            } catch (e) {
                error('$ROLLBACK', e);
            }
        }
        function $SET(keyValuePairs, options) {
            /*|{
                "info": "Store variable in the url",
                "category": "Utility",
                "featured": true,
                "parameters":[
                    {"keyValuePairs": "(Object[]) specify the key value pairs"}],

                "overloads":[
                    {"parameters":[
                        {"keyValuePairs": "(Object[]) specify the key value pairs"},
                        {"options": "(Object) options to defer, no history, etc"}]},
                    {"parameters":[
                        {"key": "(String) variable name"},
                        {"value": "(String) value to set"}]},
                    {"parameters":[
                        {"key": "(String) variable name"},
                        {"value": "(String) value to set"},
                        {"options": "(Object) options to defer, no history, etc"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#$SET",
                "returnType": "(Mixed)"
            }|*/
            try {
                if (arguments.length == 3 || _isString(keyValuePairs)) {
                    var variable = keyValuePairs;
                    keyValuePairs = {};
                    keyValuePairs[variable] = options;
                    options = arguments[2] || {};
                } else if (!options) {
                    options = {};
                }
                var defer = !!(options.defer || options == "defer"),
                    loc = {
                        'search': $l.search,
                        'hash': $l.hash
                    };
                if (_isArray(keyValuePairs)) {
                    for (var i = 0, len = keyValuePairs.length; i < len; i++) {
                        var keyValuePair = keyValuePairs[i];
                        loc = _set(keyValuePair.variable, keyValuePair.value, defer, options, loc);
                    }
                } else if ($c.isObject(keyValuePairs)) {
                    for (variable in keyValuePairs) {
                        if (!keyValuePairs.hasOwnProperty(variable)) {
                            continue;
                        }
                        loc = _set(variable, keyValuePairs[variable], defer, options, loc);
                    }
                }

                if (!defer) {
                    var noHistory = options.noHistory || options == "noHistory" || options == "h";
                    if (noHistory) {
                        if (loc.hash[0] != "#") {
                            loc.hash = "#" + loc.hash;
                        }
                        if (loc.search && loc.search[0] != "?") {
                            loc.search = "?" + loc.search;
                        }
                        $l.replace(loc.search + loc.hash);
                        return;
                    }
                    $l.hash = loc.hash;
                    if ($l.search.trim() != loc.search.trim()) {
                        $l.search = loc.search;
                    }
                }
            } catch (e) {
                error("$SET", e);
            }
        }
        function addHTMLPrototype(name, fn, override) {
            /*|{
                "info": "Method to extend the HTMLElement Class",
                "category": "Utility",
                "parameters":[
                    {"name": "(String) name of the method to add"},
                    {"fn": "(Function) method implementation"}],

                "overloads":[
                    {"parameters":[
                        {"name": "(String) name of the method to add"},
                        {"fn": "(Function) method implementation"},
                        {"override": "(Bool) if true, override the previously defined prototype"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#addHTMLPrototype",
                "returnType": "(void)"
            }|*/
            try {
                var prototypeDefined = !!HTMLElement.prototype[name];
                if (prototypeDefined && HTMLElement.prototype[name].overwritten) {
                    override = true;
                }
                var original = override ? "" : "HTMLElement.prototype." + name + " || ";
                eval("HTMLElement.prototype." + name + " = " + original + "fn");
                if (!prototypeDefined || override) {
                    HTMLElement.prototype[name].overwritten = true;
                }
                if (_isFunction($w.HTMLElement)) {
                    $d.body && (!$d.body[name] || override) && ($d.body[name] = fn);
                }
                _df(name, fn, override);
            } catch (e) {
                error("addHTMLPrototype", e);
            }
        }
        function addObjectPrototype(name, fn, override) {
            /*|{
                "info": "Method to extend the Object Class",
                "category": "Object|Utility",
                "parameters":[
                    {"name": "(String) name of the method to add"},
                    {"fn": "(Function) method implementation"}],

                "overloads":[{
                    "parameters":[
                        {"name": "(String) name of the method to add"},
                        {"fn": "(Function) method implementation"},
                        {"override": "(Bool) if true, override the previously defined prototype"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#addObjectPrototype",
                "returnType": "(void)"
             }|*/
            try {
                if ($c.isNull($c.__craydentNoConflict) || !$c.__craydentNoConflict) {
                    var shouldOverride = false;
                    if (eval("typeof(" + name + ")") == "undefined") {
                        shouldOverride = true;
                    }
                    (!override && Object.prototype[name]) || Object.defineProperty(Object.prototype, name, {
                        writable: true,
                        enumerable: false,
                        configurable: true,
                        value: fn
                    });
                    override = shouldOverride;
                }
            } catch (e) {
                error("addPrototype", e);
                try {
                    Array.prototype[name] = !override && Array.prototype[name] || fn;
                    Function.prototype[name] = !override && Function.prototype[name] || fn;
                    String.prototype[name] = !override && String.prototype[name] || fn;
                    Number.prototype[name] = !override && Number.prototype[name] || fn;
                    Boolean.prototype[name] = !override && Boolean.prototype[name] || fn;
                    Error.prototype[name] = !override && Error.prototype[name] || fn;

                    if (navigator.geolocation) {
                        var GeoLocation = navigator.geolocation.constructor;
                        GeoLocation.prototype[name] = !override && GeoLocation.prototype[name] || fn;
                    }
                } catch (ex) {
                    error("addPrototype:Non-ECMAScript 5", e);
                }
            }
            return _df(name, fn, override);
        }
        function ajax(params, returnData) {
            /*|{
                "info": "Method to make ajax calls",
                "category": "Utility",
                "parameters":[
                    {"params": "(Object) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess"}],

                "overloads":[
                    {"parameters":[
                        {"params": "(Object) specs with common properties:<br />(String) url<br />(String) dataType<br />(Mixed) hitch<br />(Function[]) onerror<br />(Function[])onsuccess"},
                        {"returnData": "(String) Specifies which data to return when using Promise pattern"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#ajax",
                "returnType": "(void)"
            }|*/
            try {
                if (_isString(params)) {
                    params = { url: params };
                }
                var need_to_shard = false, browser_url_limit = 1500, query, url, rtn, alwaysResolve = params.alwaysResolve === false ? false : true;
                params.dataType = params.dataType || 'json';
                params.hitch = params.hitch || "";
                params.onbefore = params.onbefore || [foo];
                params.oncomplete = params.oncomplete || [foo];
                params.onerror = params.onerror || params.onresponse || [foo];
                params.onsuccess = params.onsuccess || params.onresponse || [foo];
                params.query = params.data || params.query || "";
                params.timeout = params.timeout || 120000;
                params.jsonp = (params.jsonp || "callback") + "=";

                if (!_isArray(params.oncomplete)) {
                    params.oncomplete = [params.oncomplete];
                }
                if (!_isArray(params.onbefore)) {
                    params.onbefore = [params.onbefore];
                }
                if (!_isArray(params.onerror)) {
                    params.onerror = [params.onerror];
                }
                if (!_isArray(params.onresponse)) {
                    params.onresponse = [params.onresponse];
                }
                if (!_isArray(params.onsuccess)) {
                    params.onsuccess = [params.onsuccess];
                }
                if (params.onsuccess.length > 1 || params.onsuccess[0] == foo) {
                    alwaysResolve = params.alwaysResolve || false;
                }
                // commented line below is a valid parameter value
                /*
                 params.shard_data = params.shard_data;
                 params.query = params.query;
                 params.data = params.data;
                 params.url = params.url;
                 params.dataType = params.dataType;
                 params.hitch = params.hitch;
                 params.context = params.context;
                 params.header = params.header;
                 params.method = params.method;
                 params.contentType = params.contentType;
                 params.headers = params.headers;
                 params.onstatechange = params.onstatechange;
                 params.onbefore = params.onbefore;
                 params.oncomplete = params.oncomplete;
                 params.onfileload = params.onfileload;
                 params.onprogress = params.onprogress;
                 params.onabort = params.onabort;
                 params.onerror = params.onerror;
                 params.onresponse = params.onresponse;
                 params.onsuccess = params.onsuccess;
                 params.onloadstart = params.onloadstart;
                 params.run = params.run;
                 params.jsonp = params.jsonp;
                 params.jsonpCallback = params.jsonpCallback
                */
                params.thiss = this;
                params.url = params.url || "";
                var cbk = (function (res, rej) {
                    if (params.dataType.toLowerCase() == 'jsonp') {
                        var head = $d.getElementsByTagName('head')[0],
                            func = params.jsonpCallback || '_cjson' + Math.floor(Math.random() * 1000000),
                            insert = 'insertBefore',
                            tag = $d.createElement('script');
                        while (!params.jsonpCallback && $w[func]) {
                            func = '_cjson' + Math.floor(Math.random() * 1000000);
                        }
                        params.jsonpCallback && (params.onsuccess = $w[func]);
                        $w[func] = function (data) {
                            if (params.query) {
                                var thiss = params.thiss;
                                delete params.thiss;
                                ajax.call(thiss, params);
                            } else {
                                var code = data.code || 500;
                                var resrej = res;
                                if (!$c.isNull(data.hasErrors) && data.hasErrors || !$c.isNull(data.hasErrors) && !data.success) {
                                    _run_func_array.call((params.context || params.thiss), params.onerror, [data, params.hitch, params.thiss, params.context, data.code || 500]);
                                    resrej = alwaysResolve ? res : rej;
                                } else {
                                    _run_func_array.call((params.context || params.thiss), params.onsuccess, [data, params.hitch, params.thiss, params.context, code = 200]);
                                }

                                _run_func_array.call((params.context || this), params.oncomplete, [data, params.hitch, params.thiss, params.context, params.context, code]);
                                if (params.jsonpCallback) {
                                    $w[func] = params.onsuccess;
                                } else {
                                    try {
                                        delete $w[func]
                                    } catch (e) {
                                        $w[func] = undefined;
                                    }
                                }

                                var rtn = data;
                                if (returnData == "response" || returnData == "res" || returnData == "request" || returnData == "req") {
                                    rtn = tag;
                                }
                                resrej(rtn);
                            }
                        };
                        if (params.shard_data && params.query && !$c.isObject(params.query) && params.query.length > browser_url_limit) {
                            need_to_shard = true;
                            var query_parts = params.query;
                            params.query = {};
                            query_parts = query_parts.indexOf('?') == 0 ? query_parts.substr(1) : query_parts;
                            query_parts = query_parts.split("&");
                            // params.query now has the object representation of the query
                            query_parts.map(function (str) {
                                var name_value = str.split('=');
                                this[encodeURIComponent(name_value[0])] = encodeURIComponent(name_value[1]);
                            }, params.query);
                        } else if (params.query && $c.isObject(params.query)) {
                            query = $c.toStringAlt(params.query, '=', '&', true);
                            if (query.length > browser_url_limit) {
                                need_to_shard = true;
                            } else {
                                params.query = query;
                            }
                        }

                        // if need_to_shard is true then params.query is an object
                        // and if if need_to_shard is false, params.query is a string ready by sent
                        query = params.query;
                        url = params.url;
                        if (need_to_shard) {
                            params.__FIRST = isNull(params.__FIRST);
                            params.__EOF = true;
                            query = "&EOQ=false";
                            for (var prop in params.query) {
                                if ((query + prop + "xxx").length > browser_url_limit) {
                                    break;
                                }
                                query += '&' + encodeURIComponent(prop) + "=" + encodeURIComponent(params.query[prop]);
                                if (query.length > browser_url_limit) {
                                    var left_over = query.substr(browser_url_limit);
                                    query = query.substr(0, browser_url_limit);
                                    params.query[prop] = left_over;
                                    break;
                                }
                                delete params.query[prop];
                            }
                        } else {
                            params.__EOF && (params.__EOF = "true");
                            delete params.query;
                        }
                        query = (params.run ? "&run=" + params.run : "") +
                            (query || "") +
                            ((params.__EOF && params.__EOF === "true" && ("&EOQ=true")) || "") +
                            ((params.__FIRST && ("&FIRST=true")) || "");
                        url += (~params.url.indexOf('?') ? "&" : "?") + (params.jsonp || "callback=") + func + (query || "");

                        tag['type'] = "text/javascript";
                        tag.async = "async";
                        tag['src'] = url;

                        // Attach handlers for all browsers
                        tag.onload = tag.onreadystatechange = function (ev) {
                            try {
                                if (!this.readyState || /complete|loaded/.test(this.readyState.toString())) {
                                    // Handle memory leak in IE
                                    this.onload = this.onreadystatechange = null;

                                    // Remove the script
                                    if (head && this.parentNode && !~IEVersion()) {
                                        head.removeChild(this);
                                    }
                                }
                            } catch (e) {
                                error('ajax.tag.statechange', e);
                            }
                        };
                        _run_func_array.call((params.context || this), params.onbefore, [tag, params.hitch, this]);
                        head[insert](tag, head.firstChild);
                        return tag;
                    } else {
                        var httpRequest = new Request(),
                            fileUpload = httpRequest.upload || {};
                        params.method = params.method || "POST";
                        params.headers = params.headers || [];

                        if (params.query && $c.isObject(params.query)) {
                            params.query = $c.toStringAlt(params.query, '=', '&', true);
                        }
                        params.query = (params.run ? "run=" + params.run : "") + (params.query || "");
                        params.contentType = params.contentType || "application/x-www-form-urlencoded";
                        params.onstatechange = params.onstatechange || foo;

                        fileUpload.onload = params.onfileload || foo;
                        fileUpload.onprogress = params.onprogress || foo;
                        fileUpload.onabort = params.onabort || foo;
                        fileUpload.onerror = params.onerror || foo;
                        fileUpload.onloadstart = params.onloadstart || foo;

                        if (params.method == "GET") {
                            params.url += params.query ? "?" + params.query : "";
                            params.query = undefined;
                        }
                        _run_func_array.call((params.context || this), params.onbefore, [httpRequest, params.hitch, this]);
                        httpRequest.onreadystatechange = function (xp) {
                            params.onstatechange(xp);
                            var resrej = res;
                            var data = _ajaxServerResponse(this), done = this.readyState == 4;
                            if (data && params.dataType.toLowerCase() == 'json' || done && this.responseText) {
                                _run_func_array.call((params.context || this), params.onsuccess, [data || this.responseText, params.hitch, params.thiss, params.context, this.status]);
                            } else if (done) {
                                try {
                                    var resrej = alwaysResolve ? res : rej;
                                    _run_func_array.call((params.context || this), params.onerror, [eval(this.responseText), params.hitch, params.thiss, params.context, this.status]);
                                } catch (e) {
                                    _run_func_array.call((params.context || this), params.onerror, [this.responseText, params.hitch, params.thiss, params.context, this.status]);
                                }
                            }
                            done && _run_func_array.call((params.context || this), params.oncomplete, [data, params.hitch, params.thiss, params.context, this.status]);
                            var rtn = data;
                            if (returnData == "response" || returnData == "res") {
                                rtn = this;
                            } else if (returnData == "request" || returnData == "req") {
                                rtn = httpRequest;
                            }
                            resrej(rtn);
                        };
                        httpRequest.open(params.method, params.url, true);
                        httpRequest.setRequestHeader("Content-type", params.contentType);

                        for (var i = 0; i < params.headers.length; i++) {
                            var header = params.headers[i];
                            httpRequest.setRequestHeader(header.type, header.value);
                        }
                        httpRequest.send(params.query);
                        return httpRequest;
                    }
                }).bind(this);
                var prm = {};
                if (typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1 && (params.onsuccess.length == 1 && params.onsuccess[0] === foo)) {
                    prm = new Promise(cbk);
                    prm._then = prm.then || foo;
                    prm.then = function (res, rej) { //noinspection CommaExpressionJS
                        alwaysResolve = params.alwaysResolve || false;
                        params.onsuccess.push(res);
                        params.onerror.push(rej);
                        return this;
                    };
                    //}
                } else {
                    prm = cbk(foo, foo);
                    prm.then = function (callback) { //noinspection CommaExpressionJS
                        return params.onsuccess.push(callback), this;
                    };
                }

                prm.otherwise = function (callback) { //noinspection CommaExpressionJS
                    alwaysResolve = params.alwaysResolve || false;
                    return params.onerror.push(callback), this;
                };
                prm['finally'] = function (callback) { //noinspection CommaExpressionJS
                    alwaysResolve = params.alwaysResolve || false;
                    return params.oncomplete.push(callback), this;
                };
                return prm
            } catch (e) {
                error("ajax", e);
            }
        }
        ajax.get = function (params, returnData) {
            params.method = "GET";
            return ajax.apply(this, arguments);
        };
        ajax.delete = function (params, returnData) {
            params.method = "DELETE";
            return ajax.apply(this, arguments);
        };
        ajax.post = function (params, returnData) {
            params.method = "POST";
            return ajax.apply(this, arguments);
        };
        ajax.put = function (params, returnData) {
            params.method = "PUT";
            return ajax.apply(this, arguments);
        };
        function cacheImages(imgs) {
            /*|{
                "info": "Cache images in browser",
                "category": "Utility",
                "parameters":[
                    {"imgs": "(String[]) full or relative urls to images"}],

                "overloads":[
                    {"parameters":[
                        {"imgURL": "(String) full or relative url to image"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#cacheImages",
                "returnType": "(void)"
            }|*/
            try {
                if (_isString(imgs)) { imgs = [imgs]; }
                var i = 0, src;
                while (src = imgs[i++]) {
                    var img = $d.createElement('img');
                    img.src = src;
                }
            } catch (e) {
                error('cacheImages', e);
            }
        }
        function cout() {
            /*|{
                "info": "Log to console when DEBUG_MODE is true and when the console is available",
                "category": "Utility",
                "parameters":[
                    {"infinite": "any number of arguments can be passed."}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#cout",
                "returnType": "(void)"
            }|*/
            try {
                if ($c && $c.DEBUG_MODE && console && console.log) {
                    for (var i = 0, len = arguments.length; i < len; i++) {
                        console.log(arguments[i]);
                    }
                }
            } catch (e) {
                error('cout', e);
            }
        }
        function cuid(msFormat) {
            /*|{
                "info": "Creates a Craydent/Global Unique Identifier",
                "category": "Utility",
                "parameters":[
                    {"msFormat": "(Bool) use microsoft format if true"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#cuid",
                "returnType": "(String)"
            }|*/
            try {
                var pr = "", pt = "";
                msFormat && (pr = "{", pt = "}");
                return pr + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                }) + pt;
            } catch (e) {
                error('cuid', e);
            }
        }
        function error(fname, e) {
            /*|{
                "info": "User implemented place holder function to handle errors",
                "category": "Utility",
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
        function exclude(list) {
            /*|{
                "info": "Exclude prototyping",
                "category": "Utility",
                "parameters":[
                    {"list": "(String[]) Array of strings in containing the property to exclude from prototyping."}],

                "overloads":[],
                "description": "This method enables the ability exclude prototyping on a specific property or property to a specific class.  The format for the string is a single property such as 'map' or property on a specific class 'Array:map'.",
                "url": "http://www.craydent.com/library/1.9.3/docs#exclude",
                "returnType": "(void)"
            }|*/
            try {
                list = list || [];
                for (var i = 0, len = list.length; i < len; i++) {
                    var name = list[i] || "";
                    if (~name.indexOf(':')) {
                        var parts = name.split(':');
                        delete $g[$c.capitalize((parts[0] || "").toLowerCase())];
                        continue;
                    }

                    delete Array.prototype[name];
                    delete Function.prototype[name];
                    delete String.prototype[name];
                    delete Number.prototype[name];
                    delete Boolean.prototype[name];
                    delete Date.prototype[name];
                }
            } catch (e) {
                error('exclude', e);
            }
        }
        function foo() {
            /*|{
                "info": "Place holder function for a blank function",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#foo",
                "returnType": "(void)"
            }|*/
        }
        function getUniqueId(prefix) {
            /*|{
                "info": "Create a unique id not used yet in the DOM",
                "category": "Utility",
                "parameters":[
                    {"prefix": "(String) ID prefix to use"}],

                "url": "http://www.craydent.com/library/1.9.3/docs#getUniqueId",
                "returnType": "(String)"
            }|*/
            try {
                var index = "";
                prefix = prefix || "";
                while (!isNull($(prefix + index)) || $(prefix + index).length) {
                    index = index || 0;
                    index++;
                }
                return {
                    id: prefix + index,
                    index: index
                };
            } catch (e) {
                error('getUniqueId', e);
            }
        }
        function isNull(value, defaultValue) {
            /*|{
                "info": "Check if a value is Null",
                "category": "Utility",
                "parameters":[
                    {"value": "(Mixed) Value to check"}],

                "overloads":[
                    {"parameters":[
                        {"value": "(Mixed) Value to check"},
                        {"defaultValue": "(Mixed) Value to return if null"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#isNull",
                "returnType": "(Mixed)"
            }|*/
            try {
                var isnull = value == null || value == undefined;
                if (arguments.length === 1) {
                    return isnull;
                }
                return isnull ? defaultValue : value;
            } catch (e) {
                error('isNull', e);
            }
        }
        function killPropagation(ev, bubble, returnValue) {
            /*|{
                "info": "Used to cancel any bubbling and propagation",
                "category": "Utility",
                "parameters":[
                    {"ev": "(Event) Event object tied to the event trigger"}],

                "overloads":[
                    {"parameters":[
                        {"ev": "(Event) Event object tied to the event trigger"},
                        {"bubble": "(Bool) Whether or not to cancel bubbling up"}]},
                    {"parameters":[
                        {"ev": "(Event) Event object tied to the event trigger"},
                        {"bubble": "(Bool) Whether or not to cancel bubbling up"},
                        {"returnValue": "(Bool) return value when propagating"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#killPropagation",
                "returnType": "(void)"
            }|*/
            try {
                ev = ev || $w.event;
                if (!ev) { return false; }
                bubble = bubble || true;
                returnValue = returnValue || false;
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                    ev.preventDefault();
                } else {
                    ev.cancelBubble = bubble;
                    ev.returnValue = returnValue;
                }
                return true;
            } catch (e) {
                error("killPropagation", e);
                return false;
            }
        }
        function logit() {
            /*|{
                "info": "Log to console when DEBUG_MODE is true and when the console is available",
                "category": "Utility",
                "parameters":[
                    {"infinite": "any number of arguments can be passed."}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#logit",
                "returnType": "(void)"
            }|*/
            try {
                var location = "", err = new Error(), args = [], arg, i = 0;

                $c.VERBOSE_LOGS && err.stack && (location = "\t\t\t\t    " + err.stack.split('\n')[2]);
                for (var i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
                if ($c.VERBOSE_LOGS) { args.push(location); }
                cout.apply(this, arguments);
            } catch (e) {
                error('logit', e);
            }
        }
        function noop() {
            /*|{
                "info": "Place holder function for a blank function",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#noop",
                "returnType": "(void)"
            }|*/
        }
        function observe(objs, callback, acceptList, parent) {
            /*|{
                "info": "Track and trigger events when the object(s) change",
                "category": "Utility",
                "featured": true,
                "parameters":[
                    {"obj": "(Object) Object to track changes"}],

                "overloads":[
                    {"parameters":[
                        {"objs": "(Object[]) Objects to track changes"}]},
                    {"parameters":[
                        {"obj": "(Object) Object to track changes"},
                        {"callback": "(Function) Method to call when the object changes"}]},
                    {"parameters":[
                        {"objs": "(Object[]) Objects to track changes"},
                        {"callback": "(Function) Method to call when the object changes"}]},
                    {"parameters":[
                        {"obj": "(Object) Object to track changes"},
                        {"callback": "(Function) Method to call when the object changes"},
                        {"acceptList": "(String[]) List of events to listen on"}]},
                    {"parameters":[
                        {"objs": "(Object[]) Objects to track changes"},
                        {"callback": "(Function) Method to call when the object changes"},
                        {"acceptList": "(String[]) List of events to listen on"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#observe",
                "returnType": "(void)"
            }|*/
            try {
                if (!_isArray(objs)) { objs = [objs]; }
                var i = 0, obj,
                    _observing = fillTemplate._observing,
                    _observing_previous = fillTemplate._observing_previous,
                    _observing_poll = fillTemplate._observing_poll,
                    index = _observing.length;
                callback = callback || foo;
                acceptList = acceptList || ["add", "update", "delete", "reconfigure", "setPrototype", "preventExtensions"];
                if (parent) {
                    _observing["parents_" + index] = _observing["parents_" + index] || [];
                    _observing["parents_" + index].push(parent);
                }

                if ($w["_$observer_overwrite"]) {
                    while (obj = objs[i++]) {
                        if (_observing.contains(obj)) { continue; }
                        _observing["hash_" + index] = suid();
                        _observing.push(obj);
                        $w["_$observer_overwrite"].call(Object, obj, function (changes) {
                            __on_observable_change(changes);
                            callback(changes);
                        }, acceptList);
                        $c.eachProperty(obj, function (value) {
                            __observe_helper(value, callback, acceptList, obj);
                        });
                    }
                    return;
                }

                if (!_observing_poll) {
                    function __observe_delta() {
                        __clean_micro_templates();
                        if (_observing.length) {
                            var options = ["add", "delete"];
                            if (!Object.defineProperty) { options.push("update"); }
                            for (var j = 0, jlen = _observing.length; j < jlen; j++) {
                                var obj = _observing[j],
                                    old = _observing_previous[j],
                                    analyses = $c.changes(old, obj);
                                for (var k = 0, option = options[k++]; option; option = options[k++]) {
                                    var diff = 0, prop;
                                    while (prop = analyses["$" + option][diff++]) {
                                        var changes = { name: prop, object: obj, type: option };
                                        if (option != "add") { changes.oldValue = old[prop]; }
                                        __on_observable_change([changes]);
                                        acceptList.contains(option) && callback.call(obj, [changes]);
                                    }
                                }
                                _observing_previous[j] = $c.duplicate(obj);
                            }
                            _observing_poll = setTimeout(__observe_delta, $c.OBSERVE_CHECK_INTERVAL);
                        }
                    }
                    _observing_poll = setTimeout(__observe_delta, $c.OBSERVE_CHECK_INTERVAL);
                }
                while (obj = objs[i++]) {
                    if (_observing.contains(obj)) { continue; }
                    _observing["hash_" + _observing.length] = suid();
                    _observing.push(obj);

                    //for (var prop in obj) {
                    $c.eachProperty(obj, function (value, prop) {
                        if (!value) { return; }
                        if (Object.defineProperty) {
                            if (value.constructor == Function) { value = obj[prop] = (obj[prop]).bind(obj); }
                            Object.defineProperty(obj, "_" + prop, {
                                enumerable: false,
                                writable: true,
                                value: value
                            });
                            obj.__defineGetter__(prop, eval("(function(){ return _getValue(this._" + prop + "); })"));
                            obj.__defineSetter__(prop, eval("(" +
                                "function(val){" +
                                "if (val.constructor == Function) { val = (val).bind(this); }" +
                                "var oldVal = this['" + prop + "'];" +
                                "this._" + prop + "=val;" +
                                "var changes = [{name:'" + prop + "',object:this,type:'update',oldVal:oldVal}];" +
                                "__on_observable_change(changes);" +
                                "acceptList.contains('update') && callback.call(changes);" +
                                "return val;" +
                                "})"));
                        }
                        __observe_helper(value, callback, acceptList, obj);
                    });
                    _observing_previous.push($c.duplicate(obj));
                }
            } catch (e) {
                error('observe', e);
            }
        }
        function parseBoolean(value, strict) {
            /*|{
                "info": "Try to parse value to a Boolean",
                "category": "Utility",
                "parameters":[
                    {"value": "(Mixed) value to parse as boolean"}],

                "overloads":[
                    {"parameters":[
                        {"value": "(Mixed) value to parse as boolean."},
                        {"strict": "(Boolean) Disable parsing of 0, 1, '0', and '1'."}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#parseBoolean",
                "returnType": "(Mixed)"
            }|*/
            try {
                if (_isString(value)) {
                    value = value.toLowerCase();
                    var valids = strict ? { "true": 1, "false": 1 } : { "true": 1, "false": 1, "0": 1, "1": 1 };
                    if (value in valids) {
                        return (value == "true" ? true : value == "false" ? false : value == "1" ? true : value == "0" ? false : undefined);
                    }
                } else if ($c.isNumber(value) && !strict) {
                    return (value === 1 ? true : value === 0 ? false : undefined);
                } else if ($c.isBoolean(value)) {
                    return value;
                }
                return undefined;
            } catch (e) {
                error('parseBoolean', e);
            }
        }
        function parseRaw(value, skipQuotes, saveCircular, __windowVars, __windowVarNames) {
            /*|{
                "info": "Creates an evaluable string",
                "category": "Utility",
                "parameters":[
                    {"value": "value to parse"}],

                "overloads":[
                    {"parameters":[
                        {"value": "(Mixed) Value to parse"},
                        {"skipQuotes": "(Bool) Flag to skip quotes for strings"},
                        {"saveCircular": "(Bool) Flag to save circular references"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#parseRaw",
                "returnType": "(String)"
            }|*/
            try {
                if (isNull(value)) { return value + ""; }
                var raw = "";
                if (_isString(value)) {
                    raw = (!skipQuotes ? "\"" + $c.replace_all(value, '"', '\\"') + "\"" : value);
                } else if (_isArray(value)) {
                    var tmp = [];
                    for (var i = 0, len = value.length; i < len; i++) {
                        tmp[i] = parseRaw(value[i], skipQuotes, saveCircular, __windowVars, __windowVarNames);
                    }
                    raw = "[" + tmp.join(',') + "]";
                } else if ($c.isDate(value)) {
                    return "new Date('" + value.toString() + "')";
                } else if ($c.isRegExp(value)) {
                    return value.toString();
                } else if (value instanceof Object && !_isFunction(value) && !$c.isGenerator(value) && !$c.isAsync(value)) {
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
                        raw = (sliceit ? raw.slice(0, -1) : raw) + "}";
                    } else {
                        if (!saveCircular) {
                            raw = "{}";
                        } else {
                            raw = "$g['" + __windowVarNames[index] + "']";
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
                "category": "Utility",
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
                    if (val == Math.max(num1, num2)) {
                        val -= 0.1
                    } else if (val == Math.min(num1, num2)) {
                        val += 0.1
                    }
                }
                return val;
            } catch (e) {
                error('rand', e);
            }
        }
        function suid(length) {
            /*|{
                "info": "Creates a short Craydent/Global Unique Identifier",
                "category": "Utility",
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
                    id += chars[parseInt(rand(0, 62))];
                }

                return id;
            } catch (e) {
                error('suid', e);
            }
        }
        function tryEval(expression, evaluator) {
            /*|{
                "info": "Evaluates an expression without throwing an error",
                "category": "Utility",
                "parameters":[
                    {"expression": "(Mixed) Expression to evaluate"}],

                "overloads":[
                    {"parameters":[
                        {"expression": "(Mixed) Expression to evaluate"},
                        {"evaluator": "(Function) Method to use to evaluate the expression"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#tryEval",
                "returnType": "(Mixed)"
            }|*/
            try {
                var value;
                if (evaluator) { value = evaluator(expression); }
                else { value = eval(expression); }
                if (value === undefined && expression != "undefined") {
                    throw '';
                }
                return value;
            } catch (e) {
                try {
                    return eval("(" + expression + ")");
                } catch (e) {
                    return null;
                }
            }
        }
        function wait(condition) { // TODO: allow for nested wait calls
            /*|{
                "info": "Stops execution until the condition is satisfied",
                "category": "Utility",
                "parameters":[
                    {"condition": "(Mixed) Condition equivalent to js true to resume execution"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#wait",
                "returnType": "(void)"
            }|*/
            try {
                var args = arguments.callee.caller.arguments,
                    funcOriginal = arguments.callee.caller.toString().
                        replace(/\/\/.*?[\r\n]/gi, '').
                        replace(/[\t\r\n]*/gi, '').
                        replace(/\/\*.*?\*\//gi, ''),
                    func = funcOriginal,
                    funcArgNames = func.trim().replace(/^function\s*?\((.*?)\).*/, '$1').replace(/\s*/gi, '').split(','),
                    fname = func.replace(/function\s*?(.*?)\s*?\(.*/, '$1'),
                    fnBefore = func.substr(0, func.indexOf('return wait')),
                    variableGroups = fnBefore.match(/var .*?;/gi),
                    condition = func.replace(/.*?(return)*\s*?wait\((.*?)\);.*/, '$2'),
                    fregex = /\s*?function\s*?\(\s*?\)\s*?\{/;
                func = func.replace(fname, '').replace(/(function\s*?\(.*?\)\s*?\{).*?(return)*\s*?wait\((.*?)\);/, '$1');
                for (var a = 0, alen = funcArgNames.length; a < alen; a++) {
                    var argName = funcArgNames[a];
                    if (argName) {
                        func = func.replace(fregex, 'function(){var ' + argName + '=' + parseRaw(args[a]) + ';');
                    }
                }
                for (var i = 0, len = variableGroups.length; i < len; i++) {
                    variableGroups[i] = variableGroups[i].replace(/^var\s(.*)?;/, '$1');
                    var variables = variableGroups[i].split(/^(?!.*\{.*,).*$/g);
                    if (!variables[0]) {
                        variables = variableGroups[i].split(',');
                    }
                    for (var j = 0, jlen = variables.length; j < jlen; j++) {
                        var variable = variables[j], regex, values;
                        if (~variable.indexOf('=')) {
                            variable = variable.split('=')[0].trim();
                        }
                        regex = new RegExp(variable + '\\s*?=\\s*?.*?\\s*?[,;]', 'gi');
                        values = fnBefore.match(regex) || [];
                        for (var k = values.length - 1; k >= 0; k--) {
                            try {
                                var value = eval(values[k].replace(/.*?=\s*?(.*?)\s*?;/, '$1').trim());
                                func = func.replace(fregex, 'function(){var ' + variable + '=' + parseRaw(value) + ';');
                            } catch (e) {
                                error("wait.eval-value", e)
                            }
                        }
                    }
                }

                if ($c.isNumber(condition)) {
                    setTimeout(eval(func), condition);
                } else {
                    var delayFunc = function () {
                        if (eval(condition)) {
                            (eval("(" + func + ")"))();
                        } else {
                            setTimeout(delayFunc, 1);
                        }
                    };
                    setTimeout(delayFunc, 1);
                }
            } catch (e) {
                error('wait', e);
            }
        }
        function zipit(files, content/*=NULL*/) {
            /*|{
                "info": "Download a zip of files from file contents",
                "category": "Utility",
                "featured": true,
                "parameters":[
                    {"files": "(Object[]) Objects containing properties name for file name and content for file content"}],

                "overloads":[
                    {"parameters":[
                        {"files": "(String) Name of the file"},
                        {"content": "(String) contents of the file"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#zipit",
                "returnType": "(void)"
            }|*/
            try {
                files = (content && _isString(files) && [{
                    name: files,
                    content: content
                }]) || $c.isObject(files) && [files] || _isArray(files) && files;
                var zip = new JSZip();
                for (var i = 0, len = files.length; i < len; i++) {
                    var file = files[i];
                    content = file.content;
                    if ($c.isObject(content)) {
                        file.content = JSON.stringify(content, null, "\t");
                    }

                    zip.add(file.name, (file.pretext || "") + file.content + (file.posttext || ""));
                }

                content = zip.generate();

                location.href = "data:application/zip;base64," + content;
            } catch (e) {
                error('zipit', e);
            }
        }


        _ao = addObjectPrototype;
        _ah = addHTMLPrototype;
        _df = _defineFunction;

        function syncroit(gen) {
            /*|{
                "info": "Generator based control flow to allow for more \"syncronous\" programing structure",
                "category": "Utility",
                "parameters":[
                    {"gen": "(GeneratorFunction) Generator function to execute"}],

                "overloads":[{
                    "parameters":[
                        {"async": "(AsyncFunction) Async function to execute"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#syncroit",
                "returnType": "(Promise)"
            }|*/
            try {
                if ($c.isAsync(gen)) { return gen(); }
                return new Promise(function (res) {
                    var geno = gen();
                    try {
                        $c.isGenerator(gen) && (function cb(value) {
                            var obj = geno.next(value);

                            if (!obj.done) {
                                if ($c.isPromise(obj.value)) {
                                    return obj.value.then(cb).catch(cb);
                                }
                                setTimeout(function () {
                                    cb(obj.value);
                                }, 0);
                            } else {
                                res($c.isNull(obj.value, value));
                            }
                        })();
                    } catch (e) {
                        throw e;
                    }
                });

            } catch (e) {
                error('syncroit', e);
                throw e;
            }
        }
        function yieldable(value, context, callbackIndex, returnIndex) {
            /*|{
                "info": "Makes a value yieldable via a Promise.",
                "category": "Control Flow|Utility",
                "parameters":[
                    {"value": "(Mixed) Value to make yieldable"}],

                "overloads":[
                    {"parameters":[
                        {"func": "(Function) Function to make yieldable"},
                        {"context": "(Mixed) Context to use to execute func."}]},

                    {"parameters":[
                        {"func": "(Function) Function to make yieldable"},
                        {"callbackIndex": "(Integer) Index of callback argument."}]},

                    {"parameters":[
                        {"func": "(Function) Function to make yieldable"},
                        {"context": "(Mixed) Context to use to execute func."},
                        {"callbackIndex": "(Integer) Index of callback argument."}]},

                    {"parameters":[
                        {"func": "(Function) Function to make yieldable"},
                        {"context": "(Mixed) Context to use to execute func."},
                        {"callbackIndex": "(Integer) Index of callback argument."},
                        {"returnIndex": "(Integer) Index of callback argument."}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#yieldable",
                "returnType": "(Promise)"
            }|*/
            try {
                if (arguments.length == 1 && $c.isObject(value)) {
                    context = value.context;
                    callbackIndex = value.callbackIndex;
                    returnIndex = value.returnIndex;
                    value = value.method;
                }
                if ($c.isPromise(value) || $c.isAsync(value)) { return value; }
                if ($c.isGenerator(value)) { return $c.syncroit(value); }
                if (_isFunction(value)) {
                    context = context || this;
                    return function () {
                        var args = [];
                        for (var i = 0, len = arguments.length; i < len; i++) {
                            args.push(arguments[i]);
                        }
                        return new Promise(function (res) {
                            var fn = function () {
                                if (args.length == 1) {
                                    return res(args[0]);
                                }
                                if ($c.isBoolean(returnIndex) && returnIndex) {
                                    for (var i = 0, len = args.length; i < len;) {
                                        if (args[i]) { return args[i]; }
                                    }
                                }
                                if ($c.isNumber(returnIndex)) { return args[returnIndex]; }
                                return res(args);
                            };
                            if ($c.isNull(callbackIndex)) {
                                args.push(fn);
                            } else {
                                _insertAt(args, callbackIndex, fn);
                            }
                            value.apply(context, args);
                        });
                    };
                }
                return new Promise(function (res) { return res(value); });

            } catch (e) {
                error('yieldable', e);
            }
        }


        function fillTemplate(htmlTemplate, objs, offset, max, bound, newlineToHtml, preserve_nonmatching) {
            /*|{
                "info": "Function for templetizing",
                "category": "Utility",
                "featured": true,
                "parameters":[
                    {"htmlTemplate": "(String) Template to be used"},
                    {"objs": "(Objects[]) Objects to fill the template variables"}],

                "overloads":[
                    {"parameters":[
                        {"htmlTemplate": "(String) Template to be used"},
                        {"objs": "(Objects[]) Objects to fill the template variables"},
                        {"options": "(Object) Options to use: max,offset,bound,newlineToHtml"}]},
                    {"parameters":[
                        {"htmlTemplate": "(String) Template to be used"},
                        {"objs": "(Objects[]) Objects to fill the template variables"},
                        {"max": "(Int) The maximum number of records to process"}]},
                    {"parameters":[
                        {"htmlTemplate": "(String) Template to be used"},
                        {"objs": "(Objects[]) Objects to fill the template variables"},
                        {"offset": "(Int) The start index of the Object array"},
                        {"max": "(Int) The maximum number of records to process"}]},
                    {"parameters":[
                        {"htmlTemplate": "(String) Template to be used"},
                        {"objs": "(Objects[]) Objects to fill the template variables"},
                        {"offset": "(Int) The start index of the Object array"},
                        {"max": "(Int) The maximum number of records to process"},
                        {"bound": "(Boolean) Flag to automatically bind the object to the rendered DOM"}]},
                    {"parameters":[
                        {"htmlTemplate": "(String) Template to be used"},
                        {"objs": "(Objects[]) Objects to fill the template variables"},
                        {"offset": "(Int) The start index of the Object array"},
                        {"max": "(Int) The maximum number of records to process"},
                        {"bound": "(Boolean) Flag to automatically bind the object to the rendered DOM"},
                        {"newlineToHtml":"(Boolean) Flag to replace all new line chars (\\n) to the HTML <br /> tag.  Default is true."},
                        {"preserve_nonmatching":"(Boolean) Flag to used to leave template variables that were not replaced."}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#fillTemplate",
                "returnType": "(String)"
            }|*/
            try {
                var nested = true;
                if (!fillTemplate.binding && !fillTemplate.declared && !fillTemplate.refs) {
                    nested = false;
                    fillTemplate.binding = { original: [], replacer: [] };
                    fillTemplate.declared = {};
                    fillTemplate.refs = [];
                }
                if (!htmlTemplate || !_isString(htmlTemplate)) { fillTemplate.declared = fillTemplate.refs = undefined; return ""; }
                if ($c.isObject(offset)) {
                    bound = offset.bound;
                    max = offset.max || 0;
                    newlineToHtml = isNull(offset.newlineToHtml, true);
                    preserve_nonmatching = offset.preserve_nonmatching;
                    offset = offset.offset;
                } else if ($c.isBoolean(offset)) {
                    bound = offset;
                    max = offset = 0;
                } else if (!isNull(offset) && isNull(max)) {
                    max = offset;
                    offset = 0;
                }
                if (htmlTemplate.trim() == "" || _isString(objs) && !(objs = $c.tryEval(objs))) { return ""; }

                var domRef;
                $c.isDomElement(htmlTemplate) && (domRef = htmlTemplate, htmlTemplate = htmlTemplate.toString());
                if (htmlTemplate.trim() == "") { return ""; }
                if (_isString(objs)) {
                    try {
                        objs = eval("(" + objs + ")");
                    } catch (ex) {
                        return "";
                    }
                }
                objs = objs || [{}];
                if (!_isArray(objs)) { objs = [objs]; }
                var html = "", variable, value, ttc = $c.TEMPLATE_TAG_CONFIG, tvs = $c.TEMPLATE_VARS,
                    hasDataProps = !!~htmlTemplate.indexOf('${dataproperties}'),
                    vsyntax = ttc.VARIABLE,
                    vnsyntax = ttc.VARIABLE_NAME, j = 0, tv, decl = false;
                while (tv = tvs[j++]) {
                    variable = tv.variable || tv.name;
                    value = tv.value;
                    if (!variable) { continue; }
                    value = _isFunction(value) ? value(variable, j - 1) : value;
                    htmlTemplate = $c.replace_all(htmlTemplate, "${" + variable + "}", value);
                }

                max = max || objs.length;
                offset = offset || 0;

                var props = _condense(htmlTemplate.match(vsyntax) || [], true);
                // prep template to allow binding
                if (bound) {
                    var nodes = htmlTemplate.toDomElement();
                    function __setBindAttribute(n, value, id) {
                        var prop, k = 0;
                        while (prop = props[k++]) {
                            if (_contains(value, prop)) {
                                var ca = n.getAttribute("data-craydent-bind") || "",
                                    property = _isFunction(vnsyntax) ? vnsyntax(prop) : vnsyntax.exec && vnsyntax.exec(prop);
                                !_contains(ca, "${craydent_bind}." + property) &&
                                    n.setAttribute("data-craydent-bind", (ca ? ca + "," : id + ":") + "${craydent_bind}." + property);
                            }
                        }
                    }
                    function __processNodes(n) {
                        var id = suid();
                        for (var i = 0, len = n.attributes.length; i < len; i++) {
                            __setBindAttribute(n, n.attributes[i].value, id);
                        }
                        var child, j = 0;
                        while (child = n.childNodes[j++]) {
                            if (child.nodeType == 3) { // is text node
                                __setBindAttribute(n, child.nodeValue, id);
                            } else {
                                __processNodes(child);
                            }
                        }
                        fillTemplate._micro_templates[id] = { template: n.toString() };

                    }
                    if (!nodes.length) { nodes = [nodes]; }
                    var node, i = 0;
                    while (node = nodes[i++]) {
                        __processNodes(node);
                    }
                    htmlTemplate = "";
                    i = 0;
                    while (node = nodes[i++]) {
                        htmlTemplate += node.toString();
                    }
                }
                var bindTemplate = { html: htmlTemplate }, _observing = fillTemplate._observing;

                for (var i = offset; i < max; i++) {
                    var obj = objs[i], regex, template = htmlTemplate, match, bind = "";

                    if (bound) {
                        $c.observe(obj);
                        bind = _observing["hash_" + _observing.indexOf(obj)];
                        _observing[bind] = { item: obj, template: bindTemplate };
                        template = $c.replace_all(template, "${craydent_bind}", bind);
                    }

                    if (~template.indexOf("${this}") || ~template.indexOf("${index}")) {
                        var uid = __add_fillTemplate_ref(obj);
                        template = $c.replace_all(template, ["${this}", "${index}"], ["fillTemplate.refs['" + uid + "']", i]);
                    }


                    while (~template.indexOf("${this.") && (match = /\$\{this\.(.+?)\}/.exec(template))) {
                        value = $c.getProperty(obj, match[1]);
                        if (typeof value == "object") {
                            value = "fillTemplate.refs['" + __add_fillTemplate_ref(value) + "']";
                        } else {
                            value = parseRaw(value, _isString(value));
                        }
                        template = $c.replace_all(template, "${this." + match[1] + "}", value);
                    }
                    var objval, expression;
                    for (var j = 0, jlen = props.length; j < jlen; j++) {
                        expression = props[j];
                        var property = _isFunction(vnsyntax) ? vnsyntax(expression) : vnsyntax.exec && vnsyntax.exec(expression);
                        if (!obj.hasOwnProperty(property) && !$c.getProperty(obj, property)) { continue; }
                        if (~template.indexOf(expression) && !isNull(objval = $c.getProperty(obj, property, null, { noInheritance: true }))) {
                            if (typeof objval == "object") {
                                objval = "fillTemplate.refs['" + __add_fillTemplate_ref(objval) + "']";
                            } else {
                                objval = parseRaw(objval, _isString(objval));
                            }
                            var replacee_arr = [';'], replacer_arr = [';\\'];
                            if (newlineToHtml) {
                                replacee_arr.push('\n');
                                replacer_arr.push('<br />');
                            }
                            objval = $c.replace_all(objval, replacee_arr, replacer_arr);
                            if (~objval.indexOf('${')) {
                                objval = fillTemplate(objval, [obj]);
                            }
                            template = $c.replace_all(template, expression, objval);

                            if (hasDataProps) {
                                template = $c.replace_all(template, '${dataproperties}', "data-" + property + "='" + (objval.indexOf('<') && "" || objval) + "' ${dataproperties}");
                            }
                        }
                    }
                    template = $c.replace_all(template, '\n', "fillTemplate.refs['newline']");
                    // special run sytax
                    template = ~template.indexOf("${COUNT") ? template.replace(/\$\{COUNT\[(.*?)\]\}/g, '${RUN[__count;$1]}') : template;
                    template = ~template.indexOf("${ENUM") ? template.replace(/\$\{ENUM\[(.*?)\]\}/g, '${RUN[__enum;$1]}') : template;
                    template = ~template.indexOf("${RUN") ? __run_replace(/\$\{RUN\[(.+?)\]\}/, template, true, obj) : template;
                    var tmp, rptmp, skiplogicals = false;
                    if (~template.indexOf('||') && (tmp = /\$\{(.+?\|\|?.+?)\}/.exec(template)) && tmp[1]) {
                        for (var tag in $c.TEMPLATE_TAG_CONFIG) {
                            if (!$c.TEMPLATE_TAG_CONFIG[tag].begin) { continue; }
                            if ($c.TEMPLATE_TAG_CONFIG[tag].begin.test(tmp[0])) {
                                skiplogicals = true;
                                break;
                            }
                        }
                        if (!skiplogicals) {
                            tmp = _strip(tmp[1], '|').replace(/\|{3,}/, '');
                            if (~tmp.indexOf('||')) {
                                rptmp = (tmp && "__or|" + $c.replace_all(tmp, '||', "|") || "");
                                template = $c.replace_all(template, tmp, rptmp);
                            }
                            template = template.replace("||", '|');
                        }
                    }
                    if (~template.indexOf('&&') && (tmp = /\$\{(.+?\&\&?.+?)\}/.exec(template)) && tmp[1]) {
                        for (var tag in $c.TEMPLATE_TAG_CONFIG) {
                            if (!$c.TEMPLATE_TAG_CONFIG[tag].begin) { continue; }
                            if ($c.TEMPLATE_TAG_CONFIG[tag].begin.test(tmp[0])) {
                                skiplogicals = true;
                                break;
                            }
                        }
                        if (!skiplogicals) {
                            tmp = tmp[1];
                            rptmp = (tmp && "__and|" + $c.replace_all(tmp, '&&', "|") || "");
                            template = $c.replace_all(template, tmp, rptmp);
                        }
                    }
                    var leftovervars = template.match(vsyntax);
                    if (leftovervars) {
                        for (var k = 0, klen = leftovervars.length; k < klen; k++) {
                            var variable = leftovervars[k];
                            if (~variable.indexOf('|')) {
                                var regex = new RegExp($c.replace_all(variable, ["$", '{', '}', '|'], ["\\$", '\\{(', ')\\}', '\\|']));
                                template = __run_replace(regex, template, false, obj);
                            }
                        }
                    }
                    template = /\$\{.*?(\|.*?)+?\}/.test(template) && !/\$\{.*?(\|\|.*?)+?\}/.test(template) ? __run_replace(/\$\{(.+?(\|?.+?)+)\}/, template, false, obj) : template;

                    var declarations = template.match(_addFlags(ttc.DECLARE.syntax, 'g')) || [];
                    for (var j = 0, jlen = declarations.length; j < jlen; j++) {
                        template = ttc.DECLARE.parser(template, declarations[j]);
                    }
                    template = __logic_parser(template, obj, bind);
                    html += $c.replace_all((!preserve_nonmatching && vsyntax.test(template) ? template.replace(vsyntax, "") : template), ';\\', ';');
                }

                if (domRef) {
                    domRef.parentNode.replaceChild(html.toDomElement(), domRef);
                }
                html = html.replace_all(fillTemplate.binding.original, fillTemplate.binding.replacer);
                if (!nested) {
                    html = html.replace(/fillTemplate.refs['newline']/g, "\n").replace(/fillTemplate.refs\['.*?']/g, "");
                    fillTemplate.binding = fillTemplate.declared = fillTemplate.refs = undefined;
                }
                return html;
            } catch (e) {
                error('fillTemplate', e);
            }
        }


        function xmlToJson(xml, ignoreAttributes) {
            /*|{
                "info": "Converts XML to JSON",
                "category": "Utility",
                "parameters":[
                    {"xml": "(Mixed) XML string or XML DOM"}],

                "overloads":[
                    {"parameters":[
                        {"xml": "(Mixed) XML string or XML DOM"},
                        {"ignoreAttributes": "(Bool) Flag to ignore attributes"}]}],

             "url": "http://www.craydent.com/library/1.9.3/docs#xmlToJson",
             "returnType": "(Object)"
            }|*/
            var ids = [], rtn = xml;
            try {
                var raws = xml.match(/<\!\[CDATA\[(.*?)\]\]>/g) || [];
                xmlToJson.ref = xmlToJson.ref || {};
                for (var i = 0, len = raws.length; i < len; i++) {
                    var id = suid();
                    ids.push(id);
                    xmlToJson.ref[id] = raws[i].replace(/<\!\[CDATA\[(.*?)\]\]>/, '$1');
                    xml = xml.replace(raws[i], "${" + id + "}");
                }
                xml = _strip(xml.replace(/<\?.*?\?>/, ''), '\n').replace(/>\s*?\n\s*/g, '>');

                var index = xml.indexOf('>'),
                    nodename = xml.substring(0, index + 1).replace(/<(\S*)?(?:\s?.*?)>/, '$1');

                if (nodename) {

                    var parts = xml.split(nodename), child = "", children = [];

                    // break down construct string of children
                    for (var i = 0, len = parts.length; i < len; i++) {
                        var part = parts[i] = _strip(parts[i], '\n');

                        if (part == ">" || part == "><") {
                            child += ">";
                            children.push(child);
                            child = part.substr(1) + nodename;
                        } else {
                            child += part + nodename;
                        }
                    }

                    // when there are different nodes
                    var scount = (xml.match(new RegExp("<" + nodename + ".*?>", 'g')) || []).length,
                        ecount = (xml.match(new RegExp("</" + nodename + ">", 'g')) || []).length;
                    if (xml && !children.length && scount == ecount) {
                        rtn = __processSiblings(xml);
                    } else {
                        rtn = __processChildren(nodename, children, xml);
                    }
                } else if (_isString(rtn)) {
                    rtn = fillTemplate(rtn, xmlToJson.ref);
                }
                for (var i = 0, len = ids.length; i < len; i++) {
                    delete xmlToJson.ref[ids[i]];
                }
                return rtn;
            } catch (e) {
                error('xmlToJson', e);
            }
        }



        /*----------------------------------------------------------------------------------------------------------------
        /-	Global Browser methods
        /---------------------------------------------------------------------------------------------------------------*/
        function ChromeVersion() {
            /*|{
                "info": "Get Chrome version",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#ChromeVersion",
                "returnType": "(Float)"
            }|*/
            try {
                return _getBrowserVersion.call(this, "Chrome");
            } catch (e) {
                error('ChromeVersion', e);
            }
        }
        function FirefoxVersion() {
            /*|{
                "info": "Get Firefox version",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#FirefoxVersion",
                "returnType": "(Float)"
            }|*/
            try {
                return _getBrowserVersion.call(this, "Firefox");
            } catch (e) {
                error('FirefoxVersion', e);
            }
        }
        function IEVersion() {
            /*|{
                "info": "Get Internet Explorer version",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#IEVersion",
                "returnType": "(Float)"
            }|*/
            try {
                var rv = -1;
                if (this.navigator.appName == 'Microsoft Internet Explorer') {
                    var ua = this.navigator.userAgent,
                        re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                    if (re.exec(ua) != null) {
                        rv = parseFloat(RegExp.$1);
                    }
                }
                return rv;
            } catch (e) {
                error('IEVersion', e);
            }
        }
        function isIE() {
            /*|{
                "info": "Check if browser is Internet Explorer",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isIE",
                "returnType": "(Bool)"
            }|*/
            try {
                return (!!~IEVersion());
            } catch (e) {
                error('isIE', e);
            }
        }
        function OperaVersion() {
            /*|{
                "info": "Get Opera version",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#OperaVersion",
                "returnType": "(Float)"
            }|*/
            try {
                return _getBrowserVersion.call(this, "Opera");
            } catch (e) {
                error('OperaVersion', e);
            }
        }
        function SafariVersion() {
            /*|{
                "info": "Get Safari version",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#SafariVersion",
                "returnType": "(Float)"
            }|*/
            try {
                return isChrome() ? -1 : _getBrowserVersion.call(this, "Safari");
            } catch (e) {
                error('SafariVersion', e);
            }
        }
        function isAmaya() {
            /*|{
                "info": "Check if browser is Amaya",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isAmaya",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/amaya/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isAmaya', e);
            }
        }
        function isAndroid() {
            /*|{
                "info": "Check if device is Android",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isAndroid",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/android/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isAndroid', e);
            }
        }
        function isBlackBerry() {
            /*|{
                "info": "Check if device is BlackBerry",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isBlackBerry",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/blackberry/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isBlackBerry', e);
            }
        }
        function isChrome() {
            /*|{
                "info": "Check if browser is Chrome",
                "category": "GUtilitylobal",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isChrome",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/chrome/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isChrome', e);
            }
        }
        function isFirefox() {
            /*|{
                "info": "Check if browser is Firefox",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isFirefox",
                "returnType": "(Bool)"
            }|*/
            try {
                var nu = this.navigator.userAgent;
                return (!/chrome/i.test(nu)
                    && !/apple/i.test(nu)
                    && !/opera/i.test(nu)
                    && /firefox/i.test(nu));
            } catch (e) {
                error('isFirefox', e);
            }
        }
        function isGecko() {
            /*|{
                "info": "Check if engine is Gecko",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                 "url": "http://www.craydent.com/library/1.9.3/docs#isGecko",
                 "returnType": "(Bool)"
            }|*/
            try {
                return !isWebkit() && !isKHTML() && (/gecko/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isGecko', e);
            }
        }
        function isIE6() {
            /*|{
                "info": "Check if browser is Internet Explorer 6",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isIE6",
                "returnType": "(Bool)"
            }|*/
            try {
                var rv = IEVersion();
                return !!(~rv && rv < 7.0);
            } catch (e) {
                error('isIE6', e);
            }
        }
        function isIPad() {
            /*|{
                "info": "Check if device is iPad",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isIPad",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/iPad|iPhone OS 3_[1|2]_2/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isIPad', e);
            }
        }
        function isIPhone() {
            /*|{
                "info": "Check if device is IPhone",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isIphone",
                "returnType": "(Bool)"
            }|*/
            try {
                return !isIPad() && /iphone/i.test(this.navigator.userAgent);
            } catch (e) {
                error('isIPhone', e);
            }
        }
        function isIPod() {
            /*|{
                "info": "Check if device is IPod",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isIPod",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/ipod/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isIPod', e);
            }
        }
        function isKHTML() {
            /*|{
                "info": "Check if engine is KHTML",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isKHTML",
                "returnType": "(Bool)"
            }|*/
            try {
                return !isWebkit() && (/khtml/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isKHTML', e);
            }
        }
        function isLinux() {
            /*|{
                "info": "Check if OS is Linux",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isLinux",
                "returnType": "(Bool)"
            }|*/
            try {
                return /linux/i.test(this.navigator.platform);
            } catch (e) {
                error('isLinux', e);
            }
        }
        function isMac() {
            /*|{
                "info": "Check if OS is Mac Based",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isMac",
                "returnType": "(Bool)"
            }|*/
            try {
                return /mac/i.test(this.navigator.platform);
            } catch (e) {
                error('isMac', e);
            }
        }
        function isMobile() {
            /*|{
                "info": "Check if the device is a Mobile device",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isMobile",
                "returnType": "(Bool)"
            }|*/
            try {
                return isAndroid() || isBlackBerry() || isIPad() || isIPhone() || isIPod() || isPalmOS() || isSymbian() || isWindowsMobile();
            } catch (e) {
                error('isMobile', e);
            }
        }
        function isOpera() {
            /*|{
                "info": "Check if browser is Opera",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isOpera",
                "returnType": "(Bool)"
            }|*/
            try {
                var nu = this.navigator.userAgent;
                return /chrome/i.test(nu)
                    && /apple/i.test(nu)
                    && /opera/i.test(nu);
            } catch (e) {
                error('isOpera', e);
            }
        }
        function isPalmOS() {
            /*|{
                "info": "Check if OS is PalmOS",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isPalmOS",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/palm/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isIPad', e);
            }
        }
        function isPresto() {
            /*|{
                "info": "Check if engine is Presto",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isPresto",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/presto/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isPresto', e);
            }
        }
        function isPrince() {
            /*|{
                "info": "Check if engine is Prince",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isPrince",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/prince/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isPrince', e);
            }
        }
        function isSafari() {
            /*|{
                "info": "Check if browser is Safari",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isSafari",
                "returnType": "(Bool)"
            }|*/
            try {
                var nu = this.navigator.userAgent;
                return !isChrome() && (/chrome/i.test(nu)) && (/apple/i.test(nu));
            } catch (e) {
                error('isSafari', e);
            }
        }
        function isSymbian() {
            /*|{
                "info": "Check if OS is Symbian",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isSymbian",
                "returnType": "(Bool)"
            }|*/
            try {
                var nu = this.navigator.userAgent;
                return (isWebkit() && (/series60/i.test(nu) || /symbian/i.test(nu)));
            } catch (e) {
                error('isIPad', e);
            }
        }
        function isTrident() {
            /*|{
                "info": "Check if engine is Trident",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isTrident",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/trident/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isTrident', e);
            }
        }
        function isWebkit() {
            /*|{
                "info": "Check if engine is Webkit",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isWebkit",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/webkit/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isWebkit', e);
            }
        }
        function isWindows() {
            /*|{
                "info": "Check if OS is Windows",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isWindows",
                "returnType": "(Bool)"
            }|*/
            try {
                return /win/i.test(this.navigator.platform);
            } catch (e) {
                error('isWindows', e);
            }
        }
        function isWindowsMobile() {
            /*|{
                "info": "Check if device is Windows Mobile",
                "category": "Utility",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#isWindowsMobile",
                "returnType": "(Bool)"
            }|*/
            try {
                return (/windows ce/i.test(this.navigator.userAgent));
            } catch (e) {
                error('isWindowsMobile', e);
            }
        }


        var _ie = IEVersion(),
            _ie = IEVersion(), _chrm = ChromeVersion(), _ff = FirefoxVersion(), _op = OperaVersion(), _saf = SafariVersion(),
            _droid = isAndroid(), _bbery = isBlackBerry(), _ipad = isIPad(), _ifon = isIPhone(), _ipod = isIPod(), _linx = isLinux(), _mac = isMac(), _palm = isPalmOS(), _symb = isSymbian(), _win = isWindows(), _winm = isWindowsMobile(),
            _amay = isAmaya(), _gekk = isGecko(), _khtm = isKHTML(), _pres = isPresto(), _prin = isPrince(), _trid = isTrident(), _webk = isWebkit(),
            console = $w.console,
            _browser = (~_ie && 'Internet Explorer') || (~_chrm && 'Chrome') || (~_ff && 'Firefox') || (~_saf && 'Safari'),
            _os = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_linx && 'Linux') || ((_ipad || _ifon || _ipod) && 'iOS') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
            _device = (_droid && 'Android') || (_bbery && 'BlackBerry') || (_ipad && 'iPad') || (_ifon && 'iPhone') || (_ipod && 'iPod') || (_linx && 'Linux') || (_mac && 'Mac') || (_palm && 'PalmOS') || (_symb && 'Symbian') || (_win && 'Windows') || (_winm && 'Windows Mobile'),
            _engine = (_amay && 'Amaya') || (_gekk && 'Gekko') || (_khtm && 'KHTML') || (_pres && 'Presto') || (_prin && 'Prince') || (_trid && 'Trident') || (_webk && 'WebKit'),
            _cors = (function () {
                return ('withCredentials' in new XMLHttpRequest() || typeof XDomainRequest !== "undefined");
            })();

        fillTemplate._observing = [];
        fillTemplate._micro_templates = {};
        fillTemplate._observing_poll = null;
        fillTemplate._observing_previous = [];
        $w["_$observer_overwrite"] = $w["_$observer_overwrite"] || Object.observe;
        Object.observe = observe;
        if (!$w.__craydentLoaded) {
            var $c;
            $c = $w.Craydent = $w.$c = {
                BROWSER: {
                    CURRENT: _browser,
                    CURRENT_VERSION: (~_ie && _ie) || (~_chrm && _chrm) || (~_ff && _ff) || (~_saf && _saf),
                    IE: isIE(),
                    IE_VERSION: _ie,
                    IE6: (_ie < 7.0 && _ie >= 6.0),
                    IE7: (_ie < 8.0 && _ie >= 7.0),
                    IE8: (_ie < 9.0 && _ie >= 8.0),
                    CHROME: isChrome(),
                    CHROME_VERSION: _chrm,
                    FIREFOX: isFirefox(),
                    FIREFOX_VERSION: _ff,
                    OPERA: isOpera(),
                    OPERA_VERSION: _op,
                    SAFARI: isSafari(),
                    SAFARI_VERSION: _saf,
                    SCROLLBAR_WIDTH: null
                },
                CLIENT: {
                    BROWSER: _browser,
                    CORES_SUPPORT: _cors,
                    DEVICE: _device,
                    ENGINE: _engine,
                    OS: _os
                },
                ENGINE: {
                    CURRENT: _engine,
                    AMAYA: _amay,
                    GEKKO: _gekk,
                    KHTML: _khtm,
                    PRESTO: _pres,
                    PRINCE: _prin,
                    TRIDENT: _trid,
                    WEBKIT: _webk
                },
                OS: {
                    CURRENT: _os,
                    ANDROID: _droid,
                    BLACKBERRY: _bbery,
                    LINUX: _linx,
                    IOS: (_ipad || _ifon || _ipod),
                    MAC: _mac,
                    PALM: _palm,
                    SYMBIAN: _symb,
                    WINDOWS: _win,
                    WINDOWS_MOBILE: _winm
                },
                DEVICE: {
                    CURRENT: _device,
                    ANDROID: _droid,
                    BLACKBERRY: _bbery,
                    IPAD: _ipad,
                    IPHONE: _ifon,
                    IPOD: _ipod,
                    LINUX: _linx,
                    MAC: _mac,
                    PALM: _palm,
                    SYMBIAN: _symb,
                    WINDOWS: _win,
                    WINDOWS_MOBILE: _winm
                },
                ANDROID: _droid,
                AMAYA: _amay,
                BLACKBERRY: _bbery,
                CHROME: isChrome(),
                CHROME_VERSION: _chrm,
                CLICK: "click",
                CORES_SUPPORT: _cors,
                DEBUG_MODE: !!$GET("debug"),
                FIREFOX: isFirefox(),
                FIREFOX_VERSION: FirefoxVersion(),
                FIREFOX: isFirefox(),
                GEKKO: isGecko(),
                HANDPOINT: "pointer",
                HIDDEN: "hidden",
                IE: isIE(),
                IE_VERSION: _ie,
                IE6: (_ie < 7.0 && _ie >= 6.0),
                IE7: (_ie < 8.0 && _ie >= 7.0),
                IE8: (_ie < 9.0 && _ie >= 8.0),
                IPAD: isIPad(),
                IPHONE: isIPhone(),
                IPOD: isIPod(),
                KHTML: isKHTML(),
                LINUX: isLinux(),
                MAC: isMac(),
                OBSERVE_CHECK_INTERVAL: 200,
                ONMOUSEDOWN: "onmousedown",
                ONMOUSEUP: "onmouseup",
                OPERA: isOpera(),
                OPERA_VERSION: OperaVersion(),
                PAGE_NAME: null,
                PAGE_NAME_RAW: null,
                PALM: isPalmOS(),
                POINTER: "default",
                PRESTO: isPresto(),
                PRINCE: isPrince(),
                PROTOCOL: $l.protocol,
                SAFARI: isSafari(),
                SAFARI_VERSION: SafariVersion(),
                SERVER: $l.host,
                SERVER_PATH: $l.pathname,
                SYMBIAN: isSymbian(),
                TEMPLATE_VARS: $c && $c.TEMPLATE_VARS || [],
                TEMPLATE_TAG_CONFIG: $c && $c.TEMPLATE_TAG_CONFIG || {
                    IGNORE_CHARS: ['\n'],
                    /* loop config */
                    FOR: {
                        "begin": /(?:\$\{for (.*?);(.*?);(.*?\}?)\})|(?:\{\{for (.*?);(.*?);(.*?\}?)\}\})/i,
                        "end": /(\$\{end for\})|(\{\{end for\}\})/i,
                        "helper": function (code, body) {
                            var ttc = $c.TEMPLATE_TAG_CONFIG,
                                mresult = code.match(ttc.FOR.begin),
                                condition, exec, dvars, vars = "", ovars = {}, code_result = "";

                            for (var j = 1, jlen = mresult.length; j < jlen; j++) {
                                if (!mresult[j]) { continue; }
                                mresult[j] = $c.replace_all(mresult[j], ['\\[', '\\]'], ['[', ']']).toString();
                            }

                            condition = ttc.VARIABLE_NAME(mresult[2] || mresult[5] || "");
                            exec = ttc.VARIABLE_NAME(mresult[3] || mresult[6] || "");
                            dvars = ttc.VARIABLE_NAME(mresult[1] || mresult[4] || "").split(',');

                            for (var i = 0, len = dvars.length; i < len; i++) {
                                var dvar = dvars[i];
                                var parts = dvar.split('=');
                                vars += "var " + parts[0] + "=" + parts[1] + ";";
                                ovars[parts[0]] = parts[0];
                            }
                            eval(vars);
                            while (eval(fillTemplate(condition, ovars))) {
                                code_result += "${i=" + i + ",''}" + body;
                                eval(exec);
                            }

                            return code_result;
                        },
                        "parser": function (code, oobj, bind) {
                            var ttc = $c.TEMPLATE_TAG_CONFIG,
                                FOR = ttc.FOR,
                                blocks = __processBlocks(FOR.begin, FOR.end, code),
                                code_result = "",
                                i = 0, obj;

                            while (obj = blocks[i++]) {
                                var block = obj.block,
                                    id = obj.id;

                                code_result = code_result || obj.code;
                                if (!~code_result.indexOf(obj.id)) { continue; }
                                code_result = $c.replace_all(code_result, id, FOR.helper(block, obj.body));
                            }
                            var ____execMatches = code_result.match($c.TEMPLATE_TAG_CONFIG.VARIABLE), ____execMatchIndex = 0;
                            while (____execMatchIndex < ____execMatches.length) {
                                code_result = code_result.replace(____execMatches[____execMatchIndex], $c.tryEval(ttc.VARIABLE_NAME(____execMatches[____execMatchIndex])));
                                ____execMatchIndex++;
                            }
                            if (code == code_result) { code_result = ""; }
                            return __logic_parser(code_result);
                        }
                    },
                    FOREACH: {
                        "begin": /(?:\$\{foreach (.*?)\s+in\s+(.*?)\s*\})|(?:\{\{foreach (.*?)\s+in\s+(.*?)\s*\}\})/i,
                        "end": /(?:\$\{end foreach\})|(?:\{\{end foreach\}\})/i,
                        "helper": function (code, body, rtnObject, uid, obj, bind, ref_obj) {
                            var ttc = $c.TEMPLATE_TAG_CONFIG,
                                FOREACH = ttc.FOREACH,
                                mresult = code.match(FOREACH.begin),
                                objs, var_name,
                                code_result = "";

                            for (var j = 0, jlen = mresult.length; j < jlen; j++) {
                                if (!mresult[j]) { continue; }
                                mresult[j] = $c.replace_all(mresult[j], ['\\[', '\\]'], ['[', ']']).toString();
                            }
                            var value = mresult[2] || mresult[4];
                            objs = $c.tryEval(value);
                            if (!objs && $c.startsWithAny(value, "${", "{{") && !value.endsWith("}")) {
                                return code;
                            }
                            var_name = ttc.VARIABLE_NAME(mresult[1] || mresult[3]);


                            rtnObject = rtnObject || {};
                            var vname = var_name + suid();
                            rtnObject[uid] += "var " + vname + "s," + var_name + ";";
                            rtnObject[vname + "s"] = objs;
                            if (_isArray(objs)) {
                                var i = 0, len = objs.length;
                                while (i < len) {
                                    code_result += "${i=" + i + "," + var_name + "=" + vname + "s[i],null}" + body;
                                    i++;
                                }
                            }

                            return objs ? code_result : "";

                        },
                        "parser": function (code, ref_obj, bind) {
                            var ttc = $c.TEMPLATE_TAG_CONFIG,
                                FOREACH = ttc.FOREACH,
                                uid = "##" + suid() + "##",
                                result_obj = {},
                                code_result = "", post = "",
                                blocks = __processBlocks(FOREACH.begin, FOREACH.end, code),
                                i = 0, obj;

                            result_obj[uid] = "";

                            while (obj = blocks[i++]) {
                                var block = obj.block,
                                    id = obj.id, index;
                                if (i == 1 && ~(index = obj.code.lastIndexOf("##"))) {
                                    post = obj.code.substring(index + 2);
                                    obj.code = obj.code.substring(0, index + 2);
                                }
                                code_result = code_result || obj.code;
                                if (!~code_result.indexOf(obj.id)) { continue; }
                                code_result = $c.replace_all(code_result, id, FOREACH.helper(block, obj.body, result_obj, uid, obj, bind, ref_obj));
                                if (!code_result) { break; }
                            }
                            eval(result_obj[uid]);
                            delete result_obj[uid];
                            for (var prop in result_obj) {
                                if (!result_obj.hasOwnProperty(prop)) { continue; }
                                eval(prop + "=" + "result_obj['" + prop + "']");
                            }

                            var matches = code_result.match(ttc.VARIABLE) || [];
                            for (var m = 0, mlen = matches.length; m < mlen; m++) {
                                var var_match = matches[m];
                                var var_match_name = ttc.VARIABLE_NAME(var_match),
                                    str = "";
                                try {
                                    str = eval(var_match_name);
                                } catch (e) { continue; }
                                if ($c.isObject(str) || _isArray(str)) {
                                    str = "fillTemplate.refs['" + __add_fillTemplate_ref(str) + "']";
                                }
                                code_result = code_result.replace(var_match, str || "");
                            }
                            if (code == code_result + post) { code_result = ""; }
                            return __logic_parser(code_result + post, obj, bind);
                        }
                    },
                    WHILE: {
                        "begin": /(?:\$\{while\s*\((.*?)\)\s*\})|(?:\{\{while\s*\((.*?)\)\s*\}\})/i,
                        "end": /(?:\$\{end while\})|(?:\{\{end while\}\})/i,
                        "helper": function (code, body) {
                            var ttc = $c.TEMPLATE_TAG_CONFIG,
                                WHILE = ttc.WHILE,
                                mresult = code.match(WHILE.begin),
                                vars = "", ovars = {}, code_result = "",
                                declared = fillTemplate.declared,
                                loop_limit = 100000;
                            for (var prop in declared) {
                                if (!declared.hasOwnProperty(prop) || !~code.indexOf("${" + prop + "}")) {
                                    continue;
                                }
                                var val = declared[prop];
                                vars += "var " + prop + "=" + val + ";";
                                ovars[prop] = prop;
                            }
                            eval(vars);
                            while (eval(fillTemplate(mresult[1] || mresult[2], ovars))) {
                                loop_limit--;
                                if (loop_limit < 1) {
                                    var msg = "fillTemplate While only support up to 100,000 iterations.  Possible infinite loop?";
                                    console.error(msg);
                                    throw msg;
                                }
                                code_result += body;
                                var matches = body.match(ttc.VARIABLE) || [];
                                for (var m = 0, mlen = matches.length; m < mlen; m++) {
                                    eval(ttc.VARIABLE_NAME(matches[m]));
                                }
                            }
                            fillTemplate.declared = declared;

                            var variable_initialization = "";
                            for (var prop in ovars) {
                                if (!ovars.hasOwnProperty(prop)) { continue; }
                                variable_initialization += "${" + prop + "=" + declared[prop] + ",null}";
                            }

                            return variable_initialization + code_result;
                        },
                        "parser": function (code, ref_obj, bind) {
                            var ttc = $c.TEMPLATE_TAG_CONFIG,
                                WHILE = ttc.WHILE,
                                lookups = {},
                                blocks = __processBlocks(WHILE.begin, WHILE.end, code, lookups),
                                code_result = "", vars = "", declared = fillTemplate.declared, post = "",
                                i = 0, obj;

                            while (obj = blocks[i++]) {
                                var block = obj.block,
                                    id = obj.id, index;

                                if (i == 1 && ~(index = obj.code.lastIndexOf("##"))) {
                                    post = obj.code.substring(index + 2);
                                    obj.code = obj.code.substring(0, index + 2);
                                }

                                code_result = code_result || obj.code;
                                if (!~code_result.indexOf(obj.id)) { continue; }
                                code_result = $c.replace_all(code_result, id, WHILE.helper(block, obj.body));
                            }

                            for (var prop in declared) {
                                if (!declared.hasOwnProperty(prop) || !~code.indexOf("${" + prop + "}")) { continue; }
                                vars += "var " + prop + "=" + declared[prop] + ";";
                            }
                            eval(vars);
                            var matches = code_result.match(ttc.VARIABLE) || [];
                            for (var m = 0, mlen = matches.length; m < mlen; m++) {
                                var var_match = matches[m],
                                    var_match_name = ttc.VARIABLE_NAME(var_match),
                                    var_match_index = code_result.indexOf(var_match),
                                    before, after;
                                if ($c.tryEval(var_match_name + ";") !== null) {
                                    var_match_index += var_match.length;
                                }

                                before = $c.replace_all(code_result.substring(0, var_match_index), var_match, eval(var_match_name));
                                after = code_result.substring(code_result.indexOf(var_match) + var_match.length);
                                code_result = before + after;
                            }
                            if (code == code_result + post) { code_result = ""; }
                            return __logic_parser(code_result + post);

                        }
                    },
                    /* end loop config*/

                    /* conditional config*/
                    IF: {
                        "begin": /\$\{if\s+\((.*?)(?!\{)\)\s*\}|\{\{if\s+\((.*?)(?!\{)\)\s*\}\}/i,
                        "elseif": /\$\{elseif\s+\((.*?)(?!\{)\)\s*\}|\{\{elseif\s+\((.*?)(?!\{)\)\s*\}\}/i,
                        "else": /\$\{else\}|\{\{else\}\}/i,
                        "end": /\$\{end if\}|\{\{end if\}\}/i,
                        "helper": function (code) {
                            var IF = $c.TEMPLATE_TAG_CONFIG.IF,
                                ifmatch = _condense((code.match(IF.begin) || [])),
                                endlength = code.match(IF.end)[0].length,
                                startindex = _indexOfAlt(code, IF.begin),
                                endindex = _indexOfAlt(code, IF.end),
                                vsyntax = $c.TEMPLATE_TAG_CONFIG.VARIABLE;

                            if (ifmatch.length) {
                                for (var j = 1, jlen = ifmatch.length; j < jlen; j++) {
                                    var ifm = ifmatch[j];
                                    ifmatch[j] = $c.replace_all(ifm, ['\\[', '\\]'], ['[', ']']).toString();
                                }
                                var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                                    ifsyntax = new RegExp(IF.begin.source + "|" + IF.elseif.source + "|" + IF["else"].source, 'i');

                                if (!code.match(new RegExp(IF.elseif.source + "|" + IF["else"].source, 'ig'))) {
                                    if ("undefined" == ifmatch[1] || !$c.tryEval(ifmatch[1])) {
                                        return pre + post;
                                    }
                                    return pre + code.substring(startindex + ifmatch[0].length, endindex) + post;
                                }
                                ifmatch = _condense((code.match(_addFlags(ifsyntax, 'g')) || []));
                                for (var i = 0, len = ifmatch.length; i < len; i++) {
                                    var ifm = ifmatch[i],
                                        ife = _condense(ifm.match(ifsyntax)),
                                        condition = ife[1],
                                        value = "undefined" == condition ? false : $c.tryEval(condition),
                                        sindex = code.indexOf(ifm) + ifm.length;

                                    if (condition && condition.length && condition != 'null' && !_contains(condition, vsyntax) && value === null) {
                                        value = condition;
                                    }

                                    if (value !== undefined && value) {
                                        var eindex = code.indexOf(ifmatch[i + 1]);
                                        if (!~eindex) {
                                            return pre + code.substring(sindex, endindex) + post;
                                        }
                                        return pre + code.substring(sindex, eindex) + post;
                                    } else if (ifm.match(IF["else"])) {
                                        return pre + code.substring(sindex, endindex) + post;
                                    }
                                }
                                return pre + post;
                            }
                            return code;
                        },
                        "parser": function (code, oobj, bind) {
                            var IF = $c.TEMPLATE_TAG_CONFIG.IF,
                                blocks = __processBlocks(IF.begin, IF.end, code),
                                code_result = "",
                                i = 0, obj;
                            while (obj = blocks[i++]) {
                                var block = obj.block,
                                    id = obj.id;

                                code_result = code_result || obj.code;
                                if (!~code_result.indexOf(obj.id)) { continue; }
                                code_result = IF.helper(code_result.replace(id, block));
                            }
                            if (code == code_result) { code_result = ""; }
                            return __logic_parser(code_result);
                        }
                    },
                    SWITCH: {
                        "begin": /(\$\{switch\s+\((.*?)\)\s*\})|(\{\{switch\s+\((.*?)\)\s*\}\})/i,
                        "end": /(\$\{end switch\})|(\{\{end switch\}\})/i,
                        "case": /(?:\$\{case\s+(.*?)\s*?:\})|(?:\{\{case\s+(.*?)\s*?:\}\})/i,
                        "default": /(\$\{default\})|(\{\{default\}\})/i,
                        "break": /(\$\{break\})|(\{\{break\}\})/i,
                        "helper": function (code) {
                            var SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH,
                                switchmatch = _condense((code.match(SWITCH.begin) || [])),
                                endlength = code.match(SWITCH.end)[0].length,
                                startindex = _indexOfAlt(code, SWITCH.begin),
                                endindex = _indexOfAlt(code, SWITCH.end),
                                brk = SWITCH["break"], dflt = SWITCH["default"];


                            if (switchmatch.length) {
                                for (var j = 1, jlen = switchmatch.length; j < jlen; j++) {
                                    var swmatch = switchmatch[j];
                                    switchmatch[j] = $c.replace_all(swmatch, ['\\[', '\\]'], ['[', ']']).toString();
                                }
                                var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                                    val = $c.tryEval(switchmatch[2]) || switchmatch[2],
                                    cgsyntax = _addFlags(SWITCH["case"], "g"),
                                    cases = code.match(cgsyntax);
                                code = code.substring(startindex + (switchmatch[0] || "").length, endindex);

                                if (!cases) {
                                    return pre + $c.cut(code, tartindex, endindex + endlength) + post;
                                }
                                for (var i = 0, len = cases.length; i < len; i++) {
                                    var cse = cases[i],
                                        cs = cse.match(SWITCH["case"]),
                                        cvalue = cs[1] || cs[2];
                                    cvalue = $c.tryEval(cvalue) || cvalue;
                                    if (val == cvalue) {
                                        var cindex = code.indexOf(cse),
                                            bindex = _indexOfAlt(code, brk, cindex);
                                        bindex = !~bindex ? code.length : bindex;
                                        return pre + code.substring(cindex + cse.length, bindex).replace(cgsyntax, '') + post;
                                    }
                                }
                                var dindex = _indexOfAlt(code, dflt);
                                if (~dindex) {
                                    return pre + code.substring(dindex + code.match(dflt)[0].length).replace(cgsyntax, '').replace(brk, '') + post;
                                }

                            }
                            return code;
                        },
                        "parser": function (code, oobj, bind) {
                            var SWITCH = $c.TEMPLATE_TAG_CONFIG.SWITCH,
                                blocks = __processBlocks(SWITCH.begin, SWITCH.end, code),
                                code_result = "", i = 0, obj;
                            while (obj = blocks[i++]) {
                                var block = obj.block,
                                    id = obj.id;

                                code_result = code_result || obj.code;
                                if (!~code_result.indexOf(obj.id)) { continue; }
                                code_result = SWITCH.helper(code_result.replace(id, block));
                            }
                            if (code == code_result) { code_result = ""; }
                            return __logic_parser(code_result);
                        }

                    },
                    /* end conditional config*/

                    /* error handling and execution config */
                    SCRIPT: {
                        "begin": /(\$\{script\})|(\{\{script\}\})/i,
                        "end": /(\$\{end script\})|(\{\{end script\}\})/i,
                        "parser": function (code, obj, bind) {
                            var SCRIPT = $c.TEMPLATE_TAG_CONFIG.SCRIPT,
                                sindex = _indexOfAlt(code, SCRIPT.begin),
                                slen = code.match(SCRIPT.begin)[0].length,
                                eindex = _indexOfAlt(code, SCRIPT.end),
                                elen = code.match(SCRIPT.end)[0].length;

                            if (!~eindex) {
                                eindex = undefined;
                            }
                            var block = code.substring(sindex + slen, eindex), str = "",
                                echo = function (value) {
                                    echo.out += value;
                                };
                            echo.out = "";
                            str = eval("(function(){" + block + ";return echo.out;})()");

                            return __logic_parser($c.cut(code, sindex, eindex + elen, str));
                        }

                    },
                    TRY: {
                        "begin": /(\$\{try\})|(\{\{try\}\})/i,
                        "catch": /(?:\$\{catch\s+\((.*)?\)\s*\})|(?:\{\{catch\s+\((.*)?\)\s*\}\})/i,
                        "finally": /(\$\{finally\})|(\{\{finally\}\})/i,
                        "end": /(\$\{end try\})|(\{\{end try\}\})/i,
                        "helper": function (code, lookups, exec) {
                            var TRY = $c.TEMPLATE_TAG_CONFIG.TRY,
                                cindex = _indexOfAlt(code, TRY["catch"]),
                                findex = _indexOfAlt(code, TRY["finally"]),
                                eindex = _indexOfAlt(code, TRY["end"]),
                                tend = cindex;

                            if (!~tend) {
                                tend = ~findex ? findex : eindex;
                            }

                            var tindex = _indexOfAlt(code, TRY.begin),
                                body = code.substring(tindex + code.match(TRY.begin)[0].length, tend),
                                pre = code.substring(0, tindex), post = code.substring(eindex + code.match(TRY.end)[0].length),
                                regex = /##[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}##/i,
                                match = body.match(regex), str = "", id,
                                echo = function (value) {
                                    echo.out += value;
                                };
                            echo.out = "";
                            while (match && match.length) {
                                id = match.splice(0)[0];
                                body = body.replace(id, ";echo('" + TRY.helper(lookups[id], lookups) + "');");
                            }
                            match = pre.match(regex);
                            while (match && match.length) {
                                id = match.splice(0)[0];
                                pre = pre.replace(id, TRY.helper(lookups[id], lookups));
                            }
                            match = post.match(regex);
                            while (match && match.length) {
                                id = match.splice(0)[0];
                                post = post.replace(id, TRY.helper(lookups[id], lookups));
                            }
                            exec && eval(exec);
                            try {
                                str = eval("(function(){" + body + ";return echo.out; })()");
                            } catch (e) {
                                if (~cindex) {
                                    tend = ~findex ? findex : eindex;
                                    var catchBlock = code.substring(cindex, tend),
                                        catchLine = catchBlock.match(TRY["catch"]),
                                        errorString = $c.replace_all(e.toString(), '\'', '\\\'');
                                    catchBlock = catchBlock.replace(catchLine[0], '');

                                    match = catchBlock.match(regex);
                                    while (match && match.length) {
                                        id = match.splice(0)[0];
                                        catchBlock = catchBlock.replace(id, ";echo('" + TRY.helper(lookups[id], lookups, "var " + catchLine[1] + "= new Error('" + errorString + "');") + "');");
                                    }
                                    str += eval("(function(" + catchLine[1] + "){" + catchBlock + ";return echo.out;})(new Error('" + errorString + "'))");
                                }
                            } finally {
                                if (~findex) {
                                    echo.out = "";
                                    str += eval("(function(){" + code.substring(findex + code.match(TRY["finally"])[0].length, eindex) + ";return echo.out; })()");
                                }
                            }
                            return pre + str + post;
                        },
                        "parser": function (code, oobj, bind) {
                            var TRY = $c.TEMPLATE_TAG_CONFIG.TRY,
                                lookups = {},
                                blocks = __processBlocks(TRY.begin, TRY.end, code, lookups);

                            var obj = blocks[0],
                                block = obj.block,
                                id = obj.id;

                            return __logic_parser(TRY.helper(obj.code.replace(id, block), lookups));
                        }

                    },
                    /* end error handling config */

                    /* tokens config */
                    VARIABLE: /(?:\$\{((?!\$)\S)*?\})|(?:\{\{((?!\{\{)\S)*?\}\})/gi,
                    VARIABLE_NAME: function (match) {
                        return match.slice(2, ~match.indexOf('}}') ? -2 : -1);
                    },
                    DECLARE: {
                        "syntax": /(?:\$\{declare (.*?);?\})|(?:\{\{declare (.*?);?\}\})/i,
                        "parser": function (htmlTemplate, declare) {
                            var matches = declare.match($c.TEMPLATE_TAG_CONFIG.DECLARE.syntax);
                            /*,
                            var_nameValue = (matches[1]||matches[2]).strip(';').split("=");

                            fillTemplate.declared[var_nameValue[0]] = var_nameValue[1];*/
                            $c.merge(fillTemplate.declared, $c.tryEval("({" + $c.replace_all(matches[1], '=', ":") + "})"));
                            return $c.replace_all(htmlTemplate, declare, '');
                        }
                    }
                    /* end tokens config */
                },
                TRIDENT: isTrident(),
                VERBOSE_LOGS: !!$GET("verbose"),
                VERSION: $w.__craydentVersion,
                VISIBLE: "visible",
                WAIT: "wait",
                WEBKIT: isWebkit(),
                WINDOWS: isWindows(),
                WINDOWS_MOBILE: isWindowsMobile()
            };
            var __$$ = [{
                "func": "$",
                "selector": 'getElementById',
                "overwrite": '_$overwrite'
            }, {
                "func": '$CSS',
                "selector": 'querySelectorAll',
                "overwrite": '_$CSSoverwrite',
                "default": '_querySelectorAll'
            }, {
                "func": '$TAG',
                "selector": 'getElementsByTagName',
                "overwrite": '_$TAGoverwrite'
            }];

            if (noconflict) { $c.__craydentNoConflict = true; }

            context && __contextualizeMethods(context);
            __contextualizeMethods(Craydent);
            $w._onload = $w.onload || foo;
            $w.onload = function () {
                $c.BROWSER.SCROLLBAR_WIDTH = (function () {
                    try {
                        var sizer_element, sizer_child, width;
                        sizer_element = '<div style="width:50px;height:50px;overflow:auto"><div></div></div>'.toDomElement();
                        $d.body.appendChild(sizer_element);
                        sizer_child = sizer_element.firstChild;
                        width = sizer_child.width();
                        sizer_child.style.height = '99px';
                        width -= sizer_child.width();
                        sizer_element.remove();
                        return width;
                    } catch (e) {
                        error("SCROLLBAR_WIDTH", e);
                    }
                })();
                $c.PAGE_NAME = (function () {
                    var pn = $l.href.substring($l.href.lastIndexOf('/') + 1).replace(/([^#^?]*).*/gi, '$1');
                    return !pn || !~pn.indexOf('.') ? "index.html" : pn;
                })();
                $c.PAGE_NAME_RAW = (function () {
                    var pn = $l.href.substring($l.href.lastIndexOf('/') + 1).replace(/(.*)?\?.*/gi, '$1');
                    return !pn || !~pn.indexOf('.') ? "index.html" : pn;
                })();

                $w._onload.apply(arguments);
            };

            for (var i = 0, len = __$$.length; i < len; i++) {
                var __$ = __$$[i];
                $w[__$.overwrite] = $w[__$.overwrite] || /*$w[__$.default] || */ $w[__$.func] || foo;
                $w[__$.func] = eval('$w.' + __$.func + ' = (function (object, single) {try {return _craydentSelector(\'' + __$.selector + '\', \'' + __$.overwrite + '\', object, single);} catch (e) {error(' + __$.func + ', e);}})');
                $w[__$.func].duplicate = __dup;
                $w[__$.overwrite] && $w[__$.func].duplicate($w[__$.overwrite]);
            }

            $w._showoverwrite = $w.show || foo;
            $w._hideoverwrite = $w.hide || foo;
            $w._toggleoverwrite = $w.toggle || foo;
            $w.show = function (object) {
                _displayHelper(object, "show");
            };
            $w.hide = function (object) {
                _displayHelper(object, "hide");
            };
            $w.toggle = function (object) {
                _displayHelper(object, "toggle");
            };
        }

        /*----------------------------------------------------------------------------------------------------------------
        /-	Array class Extensions
        /---------------------------------------------------------------------------------------------------------------*/
        _ext(Array, 'add', function (obj) {
            /*|{
                "info": "Array class extension to perform push and update indexes if used",
                "category": "Array",
                "featured": true,
                "parameters":[
                    {"value": "(Mixed) value to find"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.add",
                "returnType": "(Array)"
            }|*/
            try {
                this.push(obj);
                if (this.__indexed_buckets) {
                    _add_to_index(this.__indexed_buckets, obj);
                }
            } catch (e) {
                error("Array.add", e);
            }
        }, true);
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
                while (pipeline = pipelines[i++]) {
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
                return _average(this);
            } catch (e) {
                error("Array.average", e);
            }
        }, true);
        _ext(Array, 'buildTree', function (parentFinder, childFinder, options) {
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
                var i = 0, objt, cats = [], catDict = {}, tmp = {}, singles = {};
                var cprop = options.childProperty || "children";
                while (objt = this[i++]) {
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
            try {
                return _condense(this, check_values);
            } catch (e) {
                error("Array.condense", e);
            }
        }, true);
        _ext(Array, 'count', function (pipelines) {
            /*|{
                "info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
                "category": "Array|Object",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"option": "(Mixed) Query used in Array.where when counting elements in an Array"}]},

                    {"parameters":[
                        {"option": "(String) Word or phrase to count in the String"}]},

                    {"parameters":[
                        {"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.count",
                "returnType": "(Int)"
            }|*/
            try {
                return _count(this, option);
            } catch (e) {
                error("Array.count", e);
            }
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

                "url": "http://www.craydent.com/library/1.9.3/docs#array.createIndex",
                "returnType": "(Array)"
            }|*/
            try {
                __create_index(this, indexes);
            } catch (e) {
                error("Array.createIndex", e);
                return false;
            }
        });
        _ext(Array, 'delete', function (condition, justOne) {
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
                var thiz = this,
                    _isNull = $c.isNull,
                    _isObject = $c.isObject,
                    _isRegExp = $c.isRegExp,
                    _isInt = $c.isInt,
                    _qnp = __queryNestedProperty,
                    _clt = _contains_lessthan,
                    _clte = _contains_lessthanequal,
                    _cgt = _contains_greaterthan,
                    _cgte = _contains_greaterthanequal,
                    _ct = _contains_type,
                    _cm = _contains_mod;
                justOne = parseBoolean($c.isNull(justOne) ? true : $c.isNull(justOne.justOne, justOne));
                // if no condition was given, remove all
                if (!condition) { return this.splice(0, justOne ? 1 : this.length); }
                var arr = [], indexes = [], cb = function (obj, i) {
                    if (justOne) {
                        if (thiz.__indexed_buckets) {
                            _remove_from_index(thiz.__indexed_buckets, obj);
                        }
                        arr = arr.concat(this.splice(i, 1));
                        return false;
                    }
                    indexes.push(i);
                    return true;
                };

                var _refs = [], ifblock = _subQuery(condition, null, null, _refs), func = "(function (record,i) {" +
                    "	var values,finished;" +
                    "	if (" + ifblock + ") {" +
                    "		if(!cb.call(thiz,record,i)) { throw 'keep going'; }" +
                    "	}" +
                    "})";
                if (_refs.length) {
                    var varStrings = "";
                    for (var i = 0, len = _refs.length; i < len; i++) {
                        varStrings += "var __where_cb" + (i + 1) + "=_refs[" + i + "];"
                    }
                    eval(varStrings);
                }
                try {
                    this.filter(eval(func));
                } catch (e) {
                    if (e != 'keep going') { throw e; }
                }

                for (var i = indexes.length - 1; i >= 0; i--) {
                    var item = this.splice(indexes[i], 1);
                    if (thiz.__indexed_buckets) {
                        _remove_from_index(thiz.__indexed_buckets, item[0]);
                    }
                    arr = item.concat(arr);
                }

                return arr;
            } catch (e) {
                error("Array.delete", e);
                return false;
            }
        }, true);
        _ext(Array, 'distinct', function (fields, condition) {
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

                var records = $c.group(this, { field: fields, cond: condition }, true);
                if (fields.length == 1) {
                    var arr = [];
                    for (var i = 0, len = records.length; i < len; i++) {
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
        _ext(Array, "equals", function (compare, props) {
            /*|{
                "info": "Object class extension to check if object values are equal",
                "category": "Array|Object",
                "parameters":[
                    {"compare": "(Object) Object to compare against"}],

                "overloads":[
                    {"parameters":[
                        {"compare": "(Object) Object to compare against"},
                        {"props": "(String[]) Array of property values to compare against"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
                "returnType": "(Bool)"
            }|*/
            try {
                return _equals(this, compare, props);
            } catch (e) {
                error("Array.equals", e);
            }
        }, true);
        _ext(Array, 'every', function (callback, thisObject) {
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
        _ext(Array, 'filter', function (func /*, thiss*/) {
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
        _ext(Array, 'find', function (condition, projection) {
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
            try {
                return $c.where(this, condition, projection);
            } catch (e) {
                error("Array.find", e);
            }
        });
        _ext(Array, 'findOne', function (condition, projection) {
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
            try {
                return $c.where(this, condition, projection, 1)[0];
            } catch (e) {
                error("Array.findOne", e);
            }
        });
        _ext(Array, 'getValue', function (condition, projection) {
            /*|{
                "info": "Object class extension to retrieve value of an object property",
                "category": "Array|Object",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"dflt": "(Mixed) Default value to return if context is not a function"}]},

                    {"parameters":[
                        {"args": "(Mixed[]) An array of arguments to pass to context when it is a function"},
                        {"dflt": "(Mixed) Default value to return if context is not a function"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.getValue",
                "returnType": "(Mixed)"
            }|*/
            try {
                return _getValue(this, args, dflt);
            } catch (e) {
                error("Array.getValue", e);
            }
        });
        _ext(Array, 'group', function (params, removeProps) {
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
                    finalize = params.finalize || function (o) { return o; };

                if (_isString(key)) { key = key.split(','); }
                if (_isArray(key)) {
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
                            fields = _isFunction(keyf) ? keyf(doc) : keyf;
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


                var thiz = this,
                    _isNull = $c.isNull,
                    _isObject = $c.isObject,
                    _isRegExp = $c.isRegExp,
                    _isInt = $c.isInt,
                    _qnp = __queryNestedProperty,
                    _clt = _contains_lessthan,
                    _clte = _contains_lessthanequal,
                    _cgt = _contains_greaterthan,
                    _cgte = _contains_greaterthanequal,
                    _ct = _contains_type,
                    _cm = _contains_mod,
                    _refs = [], ifblock = _subQuery(condition, null, null, _refs), func = "(function (record,i) {" +
                        "	var values,finished;" +
                        "	if (" + ifblock + ") {" +
                        "		if(!cb.call(thiz,record,i)) { throw 'keep going'; }" +
                        "	}" +
                        "})";
                if (_refs.length) {
                    var varStrings = "";
                    for (var i = 0, len = _refs.length; i < len; i++) {
                        varStrings += "var __where_cb" + (i + 1) + "=_refs[" + i + "];"
                    }
                    eval(varStrings);
                }
                try {
                    var rarr = this.filter(eval(func));
                } catch (e) {
                    if (e != 'keep going') { throw e; }
                }

                var keyObj = $c.duplicate(initial);
                for (var prop in key) {
                    if (!key.hasOwnProperty(prop)) { continue; }
                    $c.setProperty(keyObj, prop, key[prop]);
                }
                for (var i = 0, len = arr.length; i < len; i++) {
                    var merge1 = $c.merge(arr[i], result[arr[i][id]]);
                    arr[i] = $c.merge(keyObj, finalize(merge1) || merge1, { clone: true, intersect: true });
                }
                return arr;
            } catch (e) {
                error("Array.group", e);
                return false;
            }
        });
        _ext(Array, 'indexOf', function (value) {
            /*|{
                "info": "Array class extension to implement indexOf",
                "category": "Array",
                "parameters":[
                    {"value": "(Mixed) value to find"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOf",
                "returnType": "(Int)"
            }|*/
            try {
                return _indexOf(this, value);
            } catch (e) {
                error("Array.indexOf", e);
            }
        }, true);
        _ext(Array, 'indexOfAlt', function (value, func) {
            /*|{
                "info": "Array class extension to find index of a value based on a callback function",
                "category": "Array",
                "parameters":[
                    {"value": "(Mixed) value to find"},
                    {"func": "(Function) Callback function used to do the comparison"}],

                "overloads":[
                    {"parameters":[
                        {"regex": "(RegExp) Regular expression to check value against"}]},
                    {"parameters":[
                        {"regex": "(RegExp) Regular expression to check value against"},
                        {"pos": "(Int) Index offset to start"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOfAlt",
                "returnType": "(Integer)"
            }|*/
            return _indexOfAlt(this, value, func);
        }, true);
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
        _ext(Array, 'insert', function (value) {
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
        _ext(Array, 'insertAfter', _insertAfter, true);
        _ext(Array, 'insertAt', _insertAt, true);
        _ext(Array, 'insertBefore', function (index, value) {
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
                if (this.__indexed_buckets) {
                    $c._add_to_index(this.__indexed_buckets, value);
                }
                return true;
            } catch (e) {
                error("Array.insertBefore", e);
                return false;
            }
        }, true);
        _ext(Array, "isEmpty", function () {
            /*|{
                "info": "Array class extension to check if it is empty",
                "category": "Array",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.isEmpty",
                "returnType": "(Array)"
            }|*/
            try {
                return _isEmpty(this);
            } catch (e) {
                error('Array.isEmpty', e);
            }
        });
        _ext(Array, "isSubset", function () {
            /*|{
                "info": "Object class extension to check if item is a subset",
                "category": "Array|Object",
                "parameters":[
                    {"compare": "(Mixed) Superset to compare against"}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
                "returnType": "(Bool)"
            }|*/
            try {
                return _isSubset(this, compare, sharesAny);
            } catch (e) {
                error('Array.isSubset', e);
            }
        });
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
        _ext(Array, 'limit', function (max, skip) {
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
                return this.slice(skip, max);
            } catch (e) {
                error("Array.limit", e);
            }
        }, true);
        _ext(Array, 'map', function (callback /*, thisObject*/) {
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
                    other = new Array(this.length);
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
        _ext(Array, 'mapReduce', function (map, reduce, options) {
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
                var obj = {}, results = $c.where(this, options.query, null, options.limit), rtnArr = [], final = options.finalize;
                if (options.sort) {
                    if ($c.isObject(options.sort)) {
                        var sortProps = [];
                        for (var prop in options.sort) {
                            if (!options.sort.hasOwnProperty(prop)) { continue; }
                            if (options.sort[prop] == 1) { sortProps.push(prop); }
                            if (!~options.sort[prop]) { sortProps.push("!" + prop); }
                        }
                        results = $c.sortBy(results, sortProps);
                    } else {
                        results = $c.sortBy(results, options.sort);
                    }
                }
                $c.on(map, 'emit', function (key, value) {
                    obj[key] = obj[key] || [];
                    obj[key].push(value);
                });
                for (var i = 0, len = results.length; i < len; i++) { map.call(results[i]) }
                for (var key in obj) {
                    if (!obj.hasOwnProperty(key)) { continue; }
                    var reducedValue = reduce(key, obj[key]);
                    if (_isFunction(final)) { reducedValue = final(key, reducedValue); }
                    rtnArr.push({ _id: key, value: reducedValue });
                }

                if (_isString(options.out)) {
                    $g[options.out] = $c.duplicate(rtnArr, true);
                } else if (_isArray(options.out)) {
                    $c.removeAll(options.out);
                    return $c.merge(options.out, rtnArr);
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
                for (var i = 0; i < len; i++) {
                    var json = this[i];
                    if (!$c.isObject(json)) {
                        error("normalize", { description: 'index: ' + i + ' (skipped) is not an object' });
                        continue;
                    }
                    for (var prop in json) {
                        if (json.hasOwnProperty(prop)) {
                            allProps[prop] = 1;
                        }
                    }
                }
                for (i = 0; i < len; i++) {
                    for (var prop in allProps) {
                        if (!allProps.hasOwnProperty(prop)) { continue; }
                        this[i][prop] = this[i][prop] || null;
                    }
                    arrObj.push(this[i]);
                }
                return arrObj;
            } catch (e) {
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
                    var isgen = $c.isGenerator(gen), isfunc = _isFunction(gen), isasync = $c.isAsync(gen);
                    return new Promise(function (res, rej) {
                        for (var i = 0; i < len; i++) {
                            if (isgen) {
                                eval('$c.syncroit(function*(){ results[' + i + '] = yield* gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } });');
                            } else if (isasync) {
                                eval('(async function (){ results[' + i + '] = await gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } })();');
                            } else if (isfunc) {
                                results[i] = gen.call(self, arr[i], i);
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
                        } else if (_isFunction(arr[i])) {
                            eval('setTimeout(function(){ results[' + i + '] = arr[' + i + '].apply(self,args);if (++completed == len) { res(results); } },0);');
                        } else {
                            results[i] = arr[i];
                            if (++completed == len) { res(results); }
                        }
                    }
                });
            } catch (e) {
                error("Array.parallelEach", e);
            }
        }, true);
        _ext(Array, 'remove', _remove, true);
        _ext(Array, 'removeAll', function (value, indexOf) {
            /*|{
                "info": "Array class extension to remove all items by value",
                "category": "Array",
                "parameters":[
                    {"value": "(Mixed) Value to remove"}],

                "overloads":[
                    {"parameters":[
                        {"value": "(Mixed) Value to remove"},
                        {"indexOf": "(Function) Callback function to use to find the item based on thevalue"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAll",
                "returnType": "(Array)"
            }|*/
            try {
                if (value) {
                    indexOf = indexOf || this.indexOf;
                    var removed = [], index = indexOf.call(this, value);
                    if (!~index) { return false; }
                    while (~index && $c.isInt(index)) {
                        removed.push($c.remove(this, value, indexOf));
                        index = indexOf.call(this, value);
                    }
                    return removed;
                }
                delete this.__indexed_buckets;
                return this.splice(0, this.length);

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
                if (this[index] === undefined) { return false; }
                if (this.__indexed_buckets) {
                    _remove_from_index(this.__indexed_buckets, this[index]);
                }
                return this.splice(index, 1)[0];
            } catch (e) {
                error("Array.removeAt", e);
            }
        }, true);
        _ext(Array, 'replaceAt', function (index, value) {
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
                var item = this.splice(index, 1, value)[0];
                if (this.__indexed_buckets) {
                    _remove_from_index(this.__indexed_buckets, item);
                    _add_to_index(this.__indexed_buckets, value);
                }
                return item;
            } catch (e) {
                error("Array.replaceAt", e);
            }
        }, true);
        _ext(Array, 'scramble', function () {
            /*|{
                "info": "Array class extension to scramble the order.",
                "category": "Array",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.scramble",
                "returnType": "(Array)"
            }|*/
            try {
                return this.sort(function () { return Math.round($c.rand(-1.5, 1.5)); });
            } catch (e) {
                error("Array.scramble", e);
            }
        }, true);
        _ext(Array, 'sortBy', function (props, rev, primer, lookup, options) {
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
                options = (_isString(options) && options in { "i": 1, "ignoreCase": 1 }) ? { i: 1 } : {};
                primer = primer || function (x) { return x; };
                if (_isString(props)) { props = props.split(','); }
                var key = function (x) { return primer(x[prop]); };
                var tmpVal;
                var prop_sort = function (a, b, p) {
                    p = p || 0;
                    var prop = props[p],
                        reverseProp = false;

                    if (!prop) { return -1; }
                    if (prop[0] == "!") {
                        prop = prop.replace('!', '');
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

                    if (aVal == bVal) { return prop_sort(a, b, p + 1); }
                    if (isNull(aVal)) { return 1; }
                    if (isNull(bVal)) { return -1; }
                    if (!reverseProp) {
                        if (aVal > bVal) { return 1; }
                        return -1;
                    }
                    if (aVal < bVal) { return 1; }
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
                var avg = _average(this),
                    sum = null, sdlen = 0;
                for (var i = 0, len = this.length; i < len; i++) {
                    if (!$c.isNumber(this[i])) { continue; }
                    sdlen++;
                    sum = sum || 0;
                    var diff = this[i] - avg;
                    sum += diff * diff;
                }
                return Math.sqrt(sum / sdlen);
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
                    value += $c.isNumber(this[i]) ? this[i] : 0;
                }
                return value;
            } catch (e) {
                error("Array.sum", e);
            }
        }, true);
        _ext(Array, 'toSet', function () {
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
                        if (_equals(item, citem)) {
                            $c.removeAt(this, j--);
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
        _ext(Array, 'update', function (condition, setClause, options) {
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
                if (_isString(condition)) {
                    condition = _processClause(condition);
                }
                var setObject = $c.isObject(setClause) ? setClause : { '$set': null };
                if (_isString(setClause)) {
                    setClause = setClause.split(',');
                    setObject['$set'] = {};
                    for (var i = 0, len = setClause.length; i < len; i++) {
                        var keyVal = setClause[i].split("=");
                        setObject['$set'][_trim(keyVal[0])] = _trim(keyVal[0]);
                    }
                }
                var found = false, plainObject = true, operations = {
                    "$set": 1, "$unset": 1, "$currentDate": 1, "$inc": 1, "$max": 1, "$min": 1, "$mul": 1, "$bit": 1, "$rename": 1
                    , "$": 1, "$addToSet": 1, "$pop": 1, "$pullAll": 1, "$pull": 1, "$pushAll": 1, "$push": 1
                };
                for (var prop in setObject) {
                    if (operations[prop]) {
                        plainObject = false;
                        break;
                    }
                }

                var thiz = this,
                    _qnp = __queryNestedProperty,
                    _clt = _contains_lessthan,
                    _clte = _contains_lessthanequal,
                    _cgt = _contains_greaterthan,
                    _cgte = _contains_greaterthanequal,
                    _ct = _contains_type,
                    _cm = _contains_mod,
                    _isNull = isNull,
                    _isObject = $c.isObject,
                    _isRegExp = $c.isRegExp,
                    _isInt = $c.isInt,
                    _refs = [], ifblock = _subQuery(condition, null, null, _refs), func = "(function (record,i) {" +
                        "	var values,finished;" +
                        "	if (" + ifblock + ") {" +
                        "		if(!cb.call(thiz,record,i)) { throw 'keep going'; }" +
                        "	}" +
                        "})", cb = function (obj, i) {
                            found = true;
                            if (plainObject) {
                                this.splice(i, 1, setObject);
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
                                    if (!setObject['$bit'].hasOwnProperty(prop) || !$c.isInt(obj[prop])) { continue; }
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
                            if (setObject["$"]) {

                            }
                            if (setObject['$addToSet']) {
                                for (var prop in setObject['$addToSet']) {
                                    if (!setObject['$addToSet'].hasOwnProperty(prop)) { continue; }
                                    var each;
                                    if (each = $c.getProperty(setObject, '$addToSet.' + prop + '.$each')) {
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
                                    if (!setObject['$pop'].hasOwnProperty(prop) || !_isArray(obj[prop])) { continue; }
                                    if (setObject['$pop'][prop] == 1) { obj[prop].pop(); }
                                    else if (!~setObject['$pop'][prop]) { obj[prop].shift(); }
                                }
                            }
                            if (setObject['$pullAll']) {
                                for (var prop in setObject['$pullAll']) {
                                    var arr = $c.getProperty(obj, prop),
                                        values = setObject['$pullAll'][prop];
                                    if (!_isArray(arr)) { continue; }
                                    __pullHelper(arr, values);
                                }
                            }
                            if (setObject['$pull']) {
                                for (var prop in setObject['$pull']) {
                                    var arr = $c.getProperty(obj, prop),
                                        values = setObject['$pullAll'][prop];
                                    if (!_isArray(arr)) { continue; }
                                    if (_isArray(values)) {
                                        __pullHelper(arr, values);
                                    } else if ($c.isObject(values)) {
                                        $c.delete(values, false);
                                    }
                                }
                            }
                            if (setObject['$push']) {
                                for (var prop in setObject['$push']) {
                                    if (!setObject['$push'].hasOwnProperty(prop)) { continue; }
                                    var each = $c.getProperty(setObject, '$push.' + prop + '.$each'),
                                        slice = $c.getProperty(setObject, '$push.' + prop + '.$slice'),
                                        sort = $c.getProperty(setObject, '$push.' + prop + '.$sort'),
                                        position = $c.getProperty(setObject, '$push.' + prop + '.$position');


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
                                                sorter.push("!" + p)
                                            }
                                        }
                                        $c.sortBy(obj[prop], sorter);
                                    }

                                    if (each && !_isNull(slice)) {
                                        obj[prop] = obj[prop].slice(slice);
                                    }
                                }
                            }


                            return !!options.multi;
                        };
                if (_refs.length) {
                    var varStrings = "";
                    for (var i = 0, len = _refs.length; i < len; i++) {
                        varStrings += "var __where_cb" + (i + 1) + "=_refs[" + i + "];"
                    }
                    eval(varStrings);
                }
                try {
                    this.filter(eval(func));
                } catch (e) {
                    if (e != 'keep going') { throw e; }
                }


                if (!found && options.upsert) {
                    this.push($c.update([{}], {}, setObject)[0] || setObject);
                }

                return this;
            } catch (e) {
                error("Array.update", e);
                return false;
            }
        }, true);
        _ext(Array, 'upsert', function (records, prop, callback) {
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
                if (!_isArray(records)) { records = [records]; }
                if (_isFunction(prop)) {
                    callback = prop;
                    prop = undefined;
                }
                if (!prop) { prop = "_id"; }
                if (callback) { usePrimaryKey = false; }

                var ids = [], refs = {}, insert = [];
                for (var i = 0, len = records.length; i < len; i++) {
                    var record = records[i];
                    refs[record[prop]] = { record: record, index: i };
                    ids.push(record[prop]);
                }


                var condition = {}, uIndex = [], iIndex = [], sIndex = [], uArr = [], iArr = [], sArr = [], j = 0;
                condition[prop] = { $in: ids };

                var cb = function (obj, i) {
                    var ref = refs[obj[prop]],
                        record = ref.record,
                        isEqual = callback && callback(obj, record),
                        index = uIndex,
                        arr = uArr;
                    if ($c.isNull(isEqual, _equals(record, obj))) {
                        index = sIndex;
                        arr = sArr;
                    } else {
                        $c.merge(obj, record);
                    }
                    index.push(i);
                    arr.push(obj);
                    ids.splice(ref.index - (j++), 1);
                    return true;
                };
                var where = $c.where,
                    _qnp = __queryNestedProperty,
                    _clt = _contains_lessthan,
                    _clte = _contains_lessthanequal,
                    _cgt = _contains_greaterthan,
                    _cgte = _contains_greaterthanequal,
                    _ct = _contains_type,
                    _cm = _contains_mod,
                    _isNull = isNull,
                    _isObject = $c.isObject,
                    _isRegExp = $c.isRegExp,
                    _isInt = $c.isInt;
                _refs = [],
                    ifblock = _subQuery(condition, null, null, _refs),
                    func = "(function (record,i) {" +
                    "	var values,finished;" +
                    "	if (" + ifblock + ") {" +
                    "		cb(record,i);" +
                    "	}" +
                    "})";
                if (_refs.length) {
                    var varStrings = "";
                    for (var i = 0, len = _refs.length; i < len; i++) {
                        varStrings += "var __where_cb" + (i + 1) + "=_refs[" + i + "];"
                    }
                    eval(varStrings);
                }
                this.filter(eval(func));

                for (var i = 0, len = ids.length; i < len; i++) {
                    var objRef = refs[ids[i]];
                    iIndex.push(this.length);
                    iArr.push(objRef.record);
                    $c.add(this, $c.duplicate(objRef.record));
                }

                return {
                    insertedIndexes: iIndex,
                    updatedIndexes: uIndex,
                    unchangedIndexes: sIndex,
                    inserted: iArr,
                    updated: uArr,
                    unchanged: sArr
                };
            } catch (e) {
                error("Array.upsert", e);
                return false;
            }
        }, true);
        _ext(Array, 'where', function (condition, projection, limit_arg) {
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
                if (!this) { return []; }
                var limit = limit_arg;

                // if no condition was given, return all
                if (!condition) { return this.slice(0, limit); }
                if ($c.isInt(projection)) {
                    limit = projection;
                    projection = undefined;
                }
                if (limit === 0) { return []; }
                limit = limit || 0;

                if (_isFunction(condition) && !projection) {
                    return _where_function({ obj: this, condition: condition, limit: limit });
                }
                // check if there is query MongoDB syntax
                var simple = !projection;
                if (simple) {
                    $c.tryEval(condition, function (cond) {
                        return JSON.stringify(condition, function (key, val) {
                            if (key[0] == "$") {
                                simple = false;
                                throw '';
                            }
                            return val;
                        });
                    });
                }

                // determine if indexes can be utilized
                var indexProps = [], ipi = 0, qcount = 0;
                if (this.__indexed_buckets) {
                    for (var prop in condition) {
                        if (condition.hasOwnProperty(prop)) {
                            qcount++;
                            if (this.__indexed_buckets[prop]) {
                                indexProps[ipi++] = prop;
                            }
                        }
                    }
                }
                var arr = this, ipHasLength = !!indexProps.length;
                if (ipHasLength) {
                    var prop, i = 0;

                    var orderedLists = [], fi = 0, len = arr.length, oli = 0;
                    while (prop = indexProps[i++]) {
                        var ordered = _rangeSearch(arr.__indexed_buckets[prop], {
                            prop: prop,
                            condition: condition[prop],
                            start_index: null,
                            end_index: null,
                            find_index: null
                        });

                        if (len > ordered.length) {
                            len = ordered.length;
                            fi = i - 1;
                        }
                        orderedLists[oli++] = ordered;
                    }
                    if (orderedLists.length == 1) {
                        arr = orderedLists[fi];
                    } else if (len < 1000) {
                        var farr = orderedLists[fi], ai = 0;
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
                            addit && (arr[ai++] = farr[i]);
                        }
                    }
                    if (qcount == ipi) {
                        return arr;
                    }
                }

                if (simple) {
                    var boolCond = '', useQueryNested = false;
                    for (var prop in condition) {
                        if (!condition.hasOwnProperty(prop) || ipHasLength && ~indexProps.indexOf(prop)) { continue; }
                        if (~prop.indexOf('.')) { useQueryNested = true; break; }
                        var q = _isString(condition[prop]) ? "\"" : "";
                        if ($c.isRegExp(condition[prop])) {
                            boolCond += condition[prop] + '.test(record[\'' + prop + '\']) && ';
                        } else if (typeof condition[prop] == 'object') {
                            boolCond += '_equals(record[\'' + prop + '\'],' + JSON.stringify(condition[prop]) + ') && ';
                        } else {
                            boolCond += 'record[\'' + prop + '\']==' + q + condition[prop] + q + ' && ';
                        }
                    }
                    boolCond = !useQueryNested ? boolCond + 'true' : '';
                    return _create_func({
                        ifblock: boolCond,
                        _refs: null,
                        arr: arr,
                        limit: limit,
                        condition: condition
                    });
                }


                var _refs = [],
                    ifblock = _subQuery(condition, null, null, _refs);

                return _create_func({
                    ifblock: ifblock,
                    projection: projection,
                    _refs: _refs,
                    arr: arr,
                    limit: limit,
                    condition: condition
                });
            } catch (e) {
                error("Array.where", e);
                return false;
            }
        }, true);


        /*----------------------------------------------------------------------------------------------------------------
        /-	Date class Extensions
        /---------------------------------------------------------------------------------------------------------------*/
        _ext(Date, 'format', function (format, options) {
            /*|{
                "info": "Date class extension to convert to formatted string",
                "category": "Date",
                "featured": true,
                "parameters":[
                    {"format": "(String) Format syntax to use to to format date"}],

                "overloads":[
                    {"parameters":[
                        {"format": "(String) Format syntax to use to to format date"},
                        {"options": "(Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset"}]}],

                "description":"<h2>Format syntax is as follows:</h2><br /><h3>Day Options</h3><p>d or %d: 2 digit day leading 0<br />D: textual representation of a day, three letters<br />j: day without leading 0<br />l (lower case L): full textual representation of the day of the week<br />N: ISO-8601 numeric representation of the day of the week<br />S: English ordinal suffix for the day of the month, 2 characters<br />w: Numeric representation of the day of the week (starting from 1)<br />%w: Numeric representation of the day of the week (starting from 0)<br />z: The day of the year (starting from 0)<br />%j: day of the year (starting from 1)</p><h3>Week Options</h3><p>W: ISO-8601 week number of the year, weeks starting on Monday<br />U: ISO-8601 week number of the year, weeks starting on Monday with leading 0<br /></p><h3>Month Options</h3><p>F: full textual representation of a month, such as January or March<br />m or %m: Numeric representation of a month, with leading zeros<br />M or %M: short textual representation of a month, three letters<br />n: Numeric representation of a month, without leading zeros<br />t: Number of days in the given month<br /></p><h3>Year Options</h3><p>L: 0 or 1 indicating whether it's a leap year<br />o: full numeric representation of a year, 4 digits.  If 'W' belongs to the previous or next year, that year is used instead.<br />Y or %Y: full numeric representation of a year, 4 digits<br />y: two digit representation of a year<br /></p><h3>Time Options</h3><p>a: Lowercase Ante Meridiem and Post Meridiem<br />A: Uppercase Ante Meridiem and Post Meridiem<br />B: Swatch Internet time<br />g: 12-hour format of an hour without leading zeros<br />G: 24-hour format of an hour without leading zeros<br />h: 12-hour format of an hour with leading zeros<br />H or %H: 24-hour format of an hour with leading zeros<br />i: Minutes with leading zeros<br />s or %S: Seconds, with leading zeros<br />u: Microseconds<br />%L: Milliseconds<br /></p><h3>Timezone Options</h3><p>e: Timezone identifier<br />I: 0 or 1 indicating whether or not the date is in daylight saving time<br />O: Difference to Greenwich time (GMT) in hours<br />P: Difference to Greenwich time (GMT) with colon between hours and minutes<br />T: Timezone abbreviation<br />Z: Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive<br /></p><h3>Other Options</h3><p>c: ISO 8601 date<br />r: RFC 2822 formatted date<br />U: Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)</p>",
                "url": "http://www.craydent.com/library/1.9.3/docs#date.format",
                "returnType": "(String)"
            }|*/
            try {
                if (!$c.isValidDate(this)) { return; }
                options = options || { offset: 0 };
                /*
                 *  options properties:
                 *  gmt:true - convert to GMT
                 *  offset:offset from GMT
                 **/
                var localTimeZoneOffset = _getGMTOffset.call(this),
                    datetime = options.offset ? new Date(this.valueOf() - (options.offset + (options.offset ? -1 : 1) * localTimeZoneOffset) * 60 * 60000) : this;

                if (options.gmt) {
                    datetime = new Date(datetime.valueOf() - localTimeZoneOffset * 60 * 60000);
                    currentTimezone = "\\G\\M\\T";
                    GMTDiff = 0;
                }

                var hour = datetime.getHours(),
                    uhour = datetime.getUTCHours(),
                    minute = datetime.getMinutes(),
                    second = datetime.getSeconds(),
                    GMTDiff = options.offset || hour - (hour > uhour ? 24 : 0) - uhour,
                    epoch = datetime.getTime(),
                    timezones = {
                        'Afghanistan Time': 'AFT',
                        'AIX specific equivalent of Central European Time': 'DFT',
                        'Alaska Daylight Time': 'AKDT',
                        'Alaska Standard Time': 'AKST',
                        'Arab Standard Time (Kuwait, Riyadh)': 'AST',
                        'Arab Standard Time': 'AST',
                        'Arabian Standard Time (Abu Dhabi, Muscat)': 'AST',
                        'Arabian Standard Time': 'AST',
                        'Arabic Standard Time (Baghdad)': 'AST',
                        'Arabic Standard Time': 'AST',
                        'Argentina Time': 'ART',
                        'Armenia Summer Time': 'AMST',
                        'Armenia Time': 'AMT',
                        'ASEAN Common Time': 'ACT',
                        'Atlantic Daylight Time': 'ADT',
                        'Atlantic Standard Time': 'AST',
                        'Australian Central Daylight Time': 'ACDT',
                        'Australian Central Standard Time': 'ACST',
                        'Australian Eastern Daylight Time': 'AEDT',
                        'Australian Eastern Standard Time': 'AEST',
                        'Australian Western Daylight Time': 'AWDT',
                        'Australian Western Standard Time': 'AWST',
                        'Azerbaijan Time': 'AZT',
                        'Azores Standard Time': 'AZOST',
                        'Baker Island Time': 'BIT',
                        'Bangladesh Standard Time': 'BST',
                        'Bhutan Time': 'BTT',
                        'Bolivia Time': 'BOT',
                        'Brasilia Time': 'BRT',
                        'British Indian Ocean Time': 'BIOT',
                        'British Summer Time (British Standard Time from Feb 1968 to Oct 1971)': 'BST',
                        'British Summer Time': 'BST',
                        'Brunei Time': 'BDT',
                        'Cape Verde Time': 'CVT',
                        'Central Africa Time': 'CAT',
                        'Central Daylight Time (North America)': 'CDT',
                        'Central Daylight Time': 'CDT',
                        'Central European Daylight Time': 'CEDT',
                        'Central European Summer Time (Cf. HAEC)': 'CEST',
                        'Central European Summer Time': 'CEST',
                        'Central European Time': 'CET',
                        'Central Standard Time (Australia)': 'ACST',
                        'Central Standard Time': 'CST',
                        'Central Standard Time (North America)': 'CST',
                        'Chamorro Standard Time': 'CHST',
                        'Chatham Daylight Time': 'CHADT',
                        'Chatham Standard Time': 'CHAST',
                        'Chile Standard Time': 'CLT',
                        'Chile Summer Time': 'CLST',
                        'China Standard Time': 'CST',
                        'China Time': 'CT',
                        'Christmas Island Time': 'CXT',
                        'Clipperton Island Standard Time': 'CIST',
                        'Cocos Islands Time': 'CCT',
                        'Colombia Summer Time': 'COST',
                        'Colombia Time': 'COT',
                        'Cook Island Time': 'CKT',
                        'Coordinated Universal Time': 'UTC',
                        'East Africa Time': 'EAT',
                        'Easter Island Standard Time': 'EAST',
                        'Eastern Caribbean Time (does not recognise DST)': 'ECT',
                        'Eastern Caribbean Time': 'ECT',
                        'Eastern Daylight Time (North America)': 'EDT',
                        'Eastern Daylight Time': 'EDT',
                        'Eastern European Daylight Time': 'EEDT',
                        'Eastern European Summer Time': 'EEST',
                        'Eastern European Time': 'EET',
                        'Eastern Standard Time (North America)': 'EST',
                        'Eastern Standard Time': 'EST',
                        'Ecuador Time': 'ECT',
                        'Falkland Islands Summer Time': 'FKST',
                        'Falkland Islands Time': 'FKT',
                        'Fiji Time': 'FJT',
                        'French Guiana Time': 'GFT',
                        'Further-eastern_European_Time': 'FET',
                        'Galapagos Time': 'GALT',
                        'Gambier Island Time': 'GIT',
                        'Georgia Standard Time': 'GET',
                        'Gilbert Island Time': 'GILT',
                        'Greenwich Mean Time': 'GMT',
                        'Gulf Standard Time': 'GST',
                        'Guyana Time': 'GYT',
                        'Hawaii Standard Time': 'HST',
                        'Hawaii-Aleutian Daylight Time': 'HADT',
                        'Hawaii-Aleutian Standard Time': 'HAST',
                        'Heard and McDonald Islands Time': 'HMT',
                        'Heure Avancée d\'Europe Centrale francised name for CEST': 'HAEC',
                        'Hong Kong Time': 'HKT',
                        'Indian Standard Time': 'IST',
                        'Indochina Time': 'ICT',
                        'Iran Standard Time': 'IRST',
                        'Irish Summer Time': 'IST',
                        'Irkutsk Time': 'IRKT',
                        'Israel Standard Time': 'IST',
                        'Israeli Daylight Time': 'IDT',
                        'Japan Standard Time': 'JST',
                        'Kamchatka Time': 'PETT',
                        'Korea Standard Time': 'KST',
                        'Krasnoyarsk Time': 'KRAT',
                        'Line Islands Time': 'LINT',
                        'Lord Howe Standard Time': 'LHST',
                        'Magadan Time': 'MAGT',
                        'Malaysia Time': 'MYT',
                        'Malaysian Standard Time': 'MST',
                        'Marquesas Islands Time': 'MIT',
                        'Mauritius Time': 'MUT',
                        'Middle European Saving Time Same zone as CEST': 'MEST',
                        'Middle European Time Same zone as CET': 'MET',
                        'Moscow Standard Time': 'MSK',
                        'Moscow Summer Time': 'MSD',
                        'Mountain Daylight Time (North America)': 'MDT',
                        'Mountain Daylight Time': 'MDT',
                        'Mountain Standard Time (North America)': 'MST',
                        'Mountain Standard Time': 'MST',
                        'Myanmar Standard Time': 'MST',
                        'Nepal Time': 'NPT',
                        'New Zealand Daylight Time': 'NZDT',
                        'New Zealand Standard Time': 'NZST',
                        'Newfoundland Daylight Time': 'NDT',
                        'Newfoundland Standard Time': 'NST',
                        'Newfoundland Time': 'NT',
                        'Norfolk Time': 'NFT',
                        'Omsk Time': 'OMST',
                        'Pacific Daylight Time (North America)': 'PDT',
                        'Pacific Daylight Time': 'PDT',
                        'Pacific Standard Time (North America)': 'PST',
                        'Pacific Standard Time': 'PST',
                        'Pakistan Standard Time': 'PKT',
                        'Philippine Standard Time': 'PST',
                        'Phoenix Island Time': 'PHOT',
                        'Reunion Time': 'RET',
                        'Samara Time': 'SAMT',
                        'Samoa Standard Time': 'SST',
                        'Seychelles Time': 'SCT',
                        'Singapore Standard Time': 'SST',
                        'Singapore Time': 'SGT',
                        'Solomon Islands Time': 'SBT',
                        'South African Standard Time': 'SAST',
                        'South Georgia and the South Sandwich Islands': 'GST',
                        'Sri Lanka Time': 'SLT',
                        'Tahiti Time': 'TAHT',
                        'Thailand Standard Time': 'THA',
                        'Uruguay Standard Time': 'UYT',
                        'Uruguay Summer Time': 'UYST',
                        'Venezuelan Standard Time': 'VET',
                        'Vladivostok Time': 'VLAT',
                        'West Africa Time': 'WAT',
                        'Western European Daylight Time': 'WEDT',
                        'Western European Summer Time': 'WEST',
                        'Western European Time': 'WET',
                        'Western Standard Time': 'WST',
                        'Yakutsk Time': 'YAKT',
                        'Yekaterinburg Time': 'YEKT'
                    },
                    ct = datetime.toTimeString().replace(/.*?\((.*?)\).*?/, '$1'),
                    ctkey = $c.keyOf(timezones, ct),
                    currentTimezone = "\\" + (!ctkey ? (timezones[ct] || "") : ct).split('').join("\\"),
                    currentTimezoneLong = "\\" + (ctkey || ct).split('').join("\\"),
                    minuteWithZero = (minute < 10 ? "0" + minute : minute),
                    secondsWithZero = (second < 10 ? "0" + second : second),
                    date = datetime.getDate(),
                    day = datetime.getDay(),
                    month = datetime.getMonth() + 1,
                    year = datetime.getFullYear(),
                    firstMonday = new Date((new Date('1/6/' + year)).getTime() + (1 - (new Date('1/6/' + year)).getDay()) * (24 * 60 * 60 * 1000)),
                    week = $c.getWeek(datetime) - 1,
                    dayOfYear = $c.getDayOfYear(datetime),
                    dayOfYearFrom1 = dayOfYear - 1,
                    dayOfYearWithZero = (dayOfYearFrom1 < 10 ? "00" + dayOfYearFrom1 : (dayOfYearFrom1 < 100 ? "0" + dayOfYearFrom1 : dayOfYearFrom1)),

                    dateWithZero = (date < 10 ? "0" + date : date),
                    threeLetterDay = ['\\S\\u\\n', '\\M\\o\\n', '\\T\\u\\e\\s', '\\W\\e\\d', '\\T\\h\\u', '\\F\\r\\i', '\\S\\a\\t'][day],
                    threeLetterMonth = ['\\J\\a\\n', '\\F\\e\\b', '\\M\\a\\r', '\\A\\p\\r', '\\M\\a\\y', '\\J\\u\\n', '\\J\\u\\l', '\\A\\u\\g', '\\S\\e\\p', '\\O\\c\\t', '\\N\\o\\v', '\\D\\e\\c'][month - 1],
                    hour24 = (hour < 10 ? "0" + hour : hour),
                    GMTDiffFormatted = (GMTDiff > 0 ? "+" : "-") + (Math.abs(GMTDiff) < 10 ? "0" : "") + Math.abs(GMTDiff) + "00",
                    hr = hour < 10 ? "0" + hour : (hour > 12 && hour - 12 < 10) ? "0" + (hour - 12) : hour - 12;

                hr = hr == 0 ? 12 : hr;

                // Double replace is used to fix concecutive character bug
                return format.
            // replace all d's with the 2 digit day leading 0
            /*option d or %d*/replace(/([^\\])%d|^%d|([^\\])d|^d/g, '$1$2' + dateWithZero).replace(/([^\\])%d|^%d|([^\\])d|^d/g, '$1$2' + dateWithZero).
            // replace all D's with A textual representation of a day, three letters
            /*option D*/replace(/([^\\])D|^D/g, '$1' + threeLetterDay).replace(/([^\\])D|^D/g, '$1' + threeLetterDay).
            // replace all j's with the day without leading 0
            /*option j*/replace(/([^\\%])j|^j/g, '$1' + date).replace(/([^\\%])j|^j/g, '$1' + date).
            // replace all l's (lower case L) with A full textual representation of the day of the week
            /*option l*/replace(/([^\\])l|^l/g, '$1' + ['\\S\\u\\n\\d\\a\\y', '\\M\\o\\n\\d\\a\\y', '\\T\\u\\e\\s\\d\\a\\y', '\\W\\e\\d\\n\\e\\s\\d\\a\\y', '\\T\\h\\u\\r\\s\\d\\a\\y', '\\F\\r\\i\\d\\a\\y', '\\S\\a\\t\\u\\r\\d\\a\\y'][day]).replace(/([^\\])l|^l/g, '$1' + ['\\S\\u\\n\\d\\a\\y', '\\M\\o\\n\\d\\a\\y', '\\T\\u\\e\\s\\d\\a\\y', '\\W\\e\\d\\n\\e\\s\\d\\a\\y', '\\T\\h\\u\\r\\s\\d\\a\\y', '\\F\\r\\i\\d\\a\\y', '\\S\\a\\t\\u\\r\\d\\a\\y'][day]).
            // replace all N's with ISO-8601 numeric representation of the day of the week
            /*option N*/replace(/([^\\])N|^N/g, '$1' + (day == 0 ? 7 : day)).replace(/([^\\])N|^N/g, '$1' + (day == 0 ? 7 : day)).
            // replace all S's with English ordinal suffix for the day of the month, 2 characters
            /*option S*/replace(/([^\\%]S)|^S/g, '$1' + (date > 3 ? '\\t\\h' : (date == 1 ? '\\s\\t' : (date == 2 ? '\\n\\d' : '\\r\\d')))).replace(/([^\\%]S)|^S/g, '$1' + (date > 3 ? '\\t\\h' : (date == 1 ? '\\s\\t' : (date == 2 ? '\\n\\d' : '\\r\\d')))).
            // replace all %w's with Numeric representation of the day of the week (starting from 0)
            /*option %w*/replace(/([^\\])%w|^%w/g, day + 1).replace(/([^\\])%w|^%w/g, day + 1).
            // replace all w's with Numeric representation of the day of the week (starting from 1)
            /*option w*/replace(/([^\\])w|^w/g, '$1' + day).replace(/([^\\])w|^w/g, '$1' + day).
            // replace all z's with The day of the year (starting from 0)
            /*option z*/replace(/([^\\])z|^z/g, '$1' + dayOfYearFrom1).replace(/([^\\])z|^z/g, '$1' + dayOfYearFrom1).
            // replace all %j's with The day of the year (starting from 1)
            /*option %j*/replace(/([^\\])%j|^%j/g, dayOfYear).replace(/([^\\])%j|^%j/g, dayOfYear).

            // replace all W's with ISO-8601 week number of the year, weeks starting on Monday
            /*option W*/replace(/([^\\])W|^W/g, '$1' + (week > 0 ? week : 52)).replace(/([^\\])W|^W/g, '$1' + (week > 0 ? week : 52)).
            // replace all %U's with ISO-8601 week number of the year, weeks starting on Monday with leading 0
            /*option W*/replace(/([^\\])%U|^%U/g, week < 10 ? "0" + week : week).replace(/([^\\])%U|^%U/g, week < 10 ? "0" + week : week).

            // replace all F's with A full textual representation of a month, such as January or March
            /*option F*/replace(/([^\\])F|^F/g, '$1' + ['\\J\\a\\n\\u\\a\\r\\y', '\\F\\e\\b\\r\\u\\a\\r\\y', '\\M\\a\\r\\c\\h', '\\A\\p\\r\\i\\l', '\\M\\a\\y', '\\J\\u\\n\\e', '\\J\\u\\l\\y', '\\A\\u\\g\\u\\s\\t', '\\S\\e\\p\\t\\e\\m\\b\\e\\r', '\\O\\c\\t\\o\\b\\e\\r', '\\N\\o\\v\\e\\m\\b\\e\\r', '\\D\\e\\c\\e\\m\\b\\e\\r'][month - 1]).replace(/([^\\])F|^F/g, '$1' + ['\\J\\a\\n\\u\\a\\r\\y', '\\F\\e\\b\\r\\u\\a\\r\\y', '\\M\\a\\r\\c\\h', '\\A\\p\\r\\i\\l', '\\M\\a\\y', '\\J\\u\\n\\e', '\\J\\u\\l\\y', '\\A\\u\\g\\u\\s\\t', '\\S\\e\\p\\t\\e\\m\\b\\e\\r', '\\O\\c\\t\\o\\b\\e\\r', '\\N\\o\\v\\e\\m\\b\\e\\r', '\\D\\e\\c\\e\\m\\b\\e\\r'][month - 1]).
            // replace all m's with Numeric representation of a month, with leading zeros
            /*option m* or %m*/replace(/([^\\])%m|^%m|([^\\])m|^m/g, '$1$2' + (month < 10 ? "0" + month : month)).replace(/([^\\])%m|^%m|([^\\])m|^m/g, '$1$2' + (month < 10 ? "0" + month : month)).
            // replace all M's with A short textual representation of a month, three letters
            /*option M or %M*/replace(/([^\\])%M|^%M|([^\\])M|^M/g, '$1$2' + threeLetterMonth).replace(/([^\\])%M|^%M|([^\\])M|^M/g, '$1$2' + threeLetterMonth).
            // replace all n's with Numeric representation of a month, without leading zeros
            /*option n*/replace(/([^\\])n|^n/g, '$1' + month).replace(/([^\\])n|^n/g, '$1' + month).
            // replace all t's with Number of days in the given month
            /*option t*/replace(/([^\\])t|^t/g, '$1' + (month == 2 && $c.isInt(year / 4) ? 29 : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1])).replace(/([^\\])t|^t/g, '$1' + (month == 2 && $c.isInt(year / 4) ? 29 : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1])).

            //replace all L's with Whether it's a leap year
            /*option L*/replace(/([^\\%])L|^L/g, '$1' + $c.isInt(year % 4) ? 1 : 0).replace(/([^\\%])L|^L/g, '$1' + $c.isInt(year % 4) ? 1 : 0).
            //replace all o's with A full numeric representation of a year, 4 digits.  If 'W' belongs to the previous or next year, that year is used instead.
            /*option o*/replace(/([^\\])o|^o/g, '$1' + (week > 0 ? year : year - 1)).replace(/([^\\])o|^o/g, '$1' + (week > 0 ? year : year - 1)).
            //replace all Y's with A full numeric representation of a year, 4 digits
            /*option Y or %Y*/replace(/([^\\])%Y|^%Y|([^\\])Y|^Y/g, '$1$2' + year).replace(/([^\\])%Y|^%Y|([^\\])Y|^Y/g, '$1$2' + year).
            //replace all t's with A two digit representation of a year
            /*option y*/replace(/([^\\])y|^y/g, '$1' + year.toString().substring(year.toString().length - 2)).replace(/([^\\])y|^y/g, '$1' + year.toString().substring(year.toString().length - 2)).

            //replace all a's with Lowercase Ante Meridiem and Post Meridiem
            /*option a*/replace(/([^\\])a|^a/g, '$1' + (hour > 11 ? "\\p\\m" : "\\a\\m")).replace(/([^\\])a|^a/g, '$1' + (hour > 11 ? "\\p\\m" : "\\a\\m")).
            //replace all A's with Uppercase Ante Meridiem and Post Meridiem
            /*option A*/replace(/([^\\])A|^A/g, '$1' + (hour > 11 ? "\\P\\M" : "\\A\\M")).replace(/([^\\])A|^A/g, '$1' + (hour > 11 ? "\\P\\M" : "\\A\\M")).
            //replace all B's with Swatch Internet time
            /*option B*/replace(/([^\\])B|^B/g, '$1' + Math.floor((((datetime.getUTCHours() + 1) % 24) + datetime.getUTCMinutes() / 60 + datetime.getUTCSeconds() / 3600) * 1000 / 24)).replace(/([^\\])B|^B/g, '$1' + Math.floor((((datetime.getUTCHours() + 1) % 24) + datetime.getUTCMinutes() / 60 + datetime.getUTCSeconds() / 3600) * 1000 / 24)).
            //replace all g's with 12-hour format of an hour without leading zeros
            /*option g*/replace(/([^\\])g|^g/g, '$1' + (hour == 0 ? 12 : hour > 12 ? hour - 12 : hour)).replace(/([^\\])g|^g/g, '$1' + (hour == 0 ? 12 : hour > 12 ? hour - 12 : hour)).
            //replace all G's with 24-hour format of an hour without leading zeros
            /*option G*/replace(/([^\\])G|^G/g, '$1' + hour).replace(/([^\\])G|^G/g, '$1' + hour).
            //replace all h's with 12-hour format of an hour with leading zeros
            /*option h*/replace(/([^\\])h|^h/g, '$1' + hr).replace(/([^\\])h|^h/g, '$1' + hr).
            //replace all H's with 24-hour format of an hour with leading zeros
            /*option H or %H*/replace(/([^\\])%H|^%H|([^\\])H|^H/g, '$1$2' + hour24).replace(/([^\\])%H|^%H|([^\\])H|^H/g, '$1$2' + hour24).
            //replace all i's with Minutes with leading zeros
            /*option i*/replace(/([^\\])i|^i/g, '$1' + minuteWithZero).replace(/([^\\])i|^i/g, '$1' + minuteWithZero).
            //replace all s's with Seconds, with leading zeros
            /*option s or %S*/replace(/([^\\])%S|^%S|([^\\])s|^s/g, '$1$2' + secondsWithZero).replace(/([^\\])%S|^%S|([^\\])s|^s/g, '$1$2' + secondsWithZero).
            //replace all u's with Microseconds
            /*option u*/replace(/([^\\])u|^u/g, '$1' + epoch * 1000).replace(/([^\\])u|^u/g, '$1' + epoch * 1000).
            //replace all L's with Milliseconds
            /*option %L*/replace(/([^\\])%L|^%L/g, epoch).replace(/([^\\])%L|^%L/g, epoch).

            //replace all e's with Timezone identifier
            /*option e*/replace(/([^\\])e|^e/g, '$1' + currentTimezoneLong).replace(/([^\\])e|^e/g, '$1' + currentTimezoneLong).
            //replace all I's with Whether or not the date is in daylight saving time
            /*option I*/replace(/([^\\])I|^I/g, '$1' + Math.max((new Date(datetime.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(datetime.getFullYear(), 6, 1)).getTimezoneOffset()) > datetime.getTimezoneOffset() ? 0 : 1).replace(/([^\\])I|^I/g, '$1' + Math.max((new Date(datetime.getFullYear(), 0, 1)).getTimezoneOffset(), (new Date(datetime.getFullYear(), 6, 1)).getTimezoneOffset()) > datetime.getTimezoneOffset() ? 0 : 1).

            //replace all O's with Difference to Greenwich time (GMT) in hours
            /*option O*/replace(/([^\\])O|^O/g, '$1' + GMTDiffFormatted).replace(/([^\\])O|^O/g, '$1' + GMTDiffFormatted).
            //replace all P's with Difference to Greenwich time (GMT) with colon between hours and minutes
            /*option P*/replace(/([^\\])P|^P/g, '$1' + GMTDiffFormatted.substr(0, 3) + ":" + GMTDiffFormatted.substr(3, 2)).replace(/([^\\])P|^P/g, '$1' + GMTDiffFormatted.substr(0, 3) + ":" + GMTDiffFormatted.substr(3, 2)).
            //replace all T's with Timezone abbreviation
            /*option T*/replace(/([^\\])T|^T/g, '$1' + currentTimezone).replace(/([^\\])T|^T/g, '$1' + currentTimezone).
            //replace all Z's with Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive
            /*option Z*/replace(/([^\\])Z|^Z/g, '$1' + (-1 * GMTDiff * 60)).replace(/([^\\])T|^T/g, '$1' + currentTimezone).

            //replace all c's with ISO 8601 date
            /*option c*/replace(/([^\\])c|^c/g, '$1' + (datetime.toISOString ? datetime.toISOString() : "")).replace(/([^\\])c|^c/g, '$1' + (datetime.toISOString ? datetime.toISOString() : "")).
            //replace all r's with RFC 2822 formatted date
            /*option r*/replace(/([^\\])r|^r/g, '$1' + threeLetterDay + ', ' + dateWithZero + ' ' + threeLetterMonth + ' ' + year + ' ' + hour24 + ':' + minuteWithZero + ':' + secondsWithZero + ' ' + GMTDiffFormatted).replace(/([^\\])r|^r/g, '$1' + threeLetterDay + ', ' + dateWithZero + ' ' + threeLetterMonth + ' ' + year + ' ' + hour24 + ':' + minuteWithZero + ':' + secondsWithZero + ' ' + GMTDiffFormatted).
            //replace all U's with Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
            /*option U*/replace(/([^\\])U|^U/g, '$1' + epoch / 1000).replace(/([^\\])U|^U/g, '$1' + epoch / 1000).
                    replace(/\\/gi, "");
            } catch (e) {
                error("Date.format", e);
            }
        }, true);
        _ext(Date, 'getDayOfYear', function () {
            /*|{
                "info": "Date class extension to retrieve the day of the year",
                "category": "Date",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.getDayOfYear",
                "returnType": "(Int)"
            }|*/
            try {
                return Math.floor((this - new Date(this.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            } catch (e) {
                error("Date.getDayOfYear", e);
            }
        });
        _ext(Date, 'getWeek', function () {
            /*|{
                "info": "Date class extension to retrieve the week number in the year",
                "category": "Date",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.getWeek",
                "returnType": "(Int)"
            }|*/
            try {
                var d = new Date(this);
                d.setHours(0, 0, 0);
                var fdate = new Date(d.getFullYear(), 0, 1);
                return Math.ceil((((d - fdate) / 8.64e7) + 1 + fdate.getDay()) / 7);
            } catch (e) {
                error("Date.getWeek", e);
            }
        });
        _ext(Date, 'isValidDate', function () {
            /*|{
                "info": "Date class extension to check if the date is valid",
                "category": "Date",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.isValidDate",
                "returnType": "(Bool)"
            }|*/
            try {
                return !isNaN(this.getTime());
            } catch (e) {
                error("Date.isValidDate", e);
            }
        });
        function now(format) {
            /*|{
                "info": "Get the DateTime of now",
                "category": "Utility",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"format": "(String) Format syntax to return formatted string of now"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#now",
                "returnType":"(Mixed)"
            }|*/
            try {
                return format ? $c.format((new Date()), format) : new Date();
            } catch (e) { error('now', e); }
        }


        /*----------------------------------------------------------------------------------------------------------------
        /-	DOM class Extensions
        /---------------------------------------------------------------------------------------------------------------*/
        _ah("addClass", function (names) {
            /*|{
                "info": "HTMLElement class extension to add a class to the DOM object",
                "category": "HTMLElement",
                "parameters":[
                    {"names": "(String[]) Name of the class to add"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.addClass",
                "returnType": "(Bool)"
            }|*/
            try {
                if (_isString(names)) {
                    names = [names];
                }
                var arr = this.className.split(' '), i = 0, name;
                while (name = names[i++]) {
                    ~arr.indexOf(name) || arr.push(name);
                    this.className = arr.join(' ').trim();
                }
                return true;
            } catch (e) {
                error("DOM.addClass", e);
                return false;
            }
        });
        _ah("blur", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger blur event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.blur",
                "returnType": "(void)"
            }|*/
            this.on("blur", callback);
        });
        _ah("change", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger change event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.change",
                "returnType": "(void)"
            }|*/
            this.on("change", callback);
        });
        _ah("click", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger click event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.click",
                "returnType": "(void)"
            }|*/
            this.on("click", callback);
        });
        _ah("contextmenu", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger contextmenu event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                    {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.contextmenu",
                "returnType": "(void)"
            }|*/
            this.on("contextmenu", callback);
        });
        _ah("dblclick", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger dblclick event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.dblclick",
                "returnType": "(void)"
            }|*/
            this.on("dblclick", callback);
        });
        _ah("drag", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger drag event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                    {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.drag",
                "returnType": "(void)"
            }|*/
            this.on("drag", callback);
        });
        _ah("dragend", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger dragend event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.dragend",
                "returnType": "(void)"
            }|*/
            this.on("dragend", callback);
        });
        _ah("dragenter", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger dragenter event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.dragenter",
                "returnType": "(void)"
            }|*/
            this.on("dragenter", callback);
        });
        _ah("dragleave", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger dragleave event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.dragleave",
                "returnType": "(void)"
            }|*/
            this.on("dragleave", callback);
        });
        _ah("dragover", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger dragover event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.dragover",
                "returnType": "(void)"
            }|*/
            this.on("dragover", callback);
        });
        _ah("dragstart", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger dragstart event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.dragstart",
                "returnType": "(void)"
            }|*/
            this.on("dragstart", callback);
        });
        _ah("drop", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger drop event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.drop",
                "returnType": "(void)"
            }|*/
            this.on("drop", callback);
        });
        _ah("focus", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger focus event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.focus",
                "returnType": "(void)"
            }|*/
            this.on("focus", callback);
        });
        _ah("formchange", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger formchange event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.formchange",
                "returnType": "(void)"
            }|*/
            this.on("formchange", callback);
        });
        _ah("forminput", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger forminput event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.forminput",
                "returnType": "(void)"
            }|*/
            this.on("forminput", callback);
        });
        _ah("getContainer", function (tagName) {
            /*|{
                "info": "HTMLElement class extension to retrieve direct parent",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"tagName": "(String) Used to get the direct parent with a specific HTML tag"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.getContainer",
                "returnType": "(HTMLElement)"
            }|*/
            try {
                var thiss = this.parentNode;
                if (tagName) {
                    while (thiss && thiss.tagName.toLowerCase() != tagName) {
                        thiss = thiss.parentNode;
                    }
                }
                return thiss;
            } catch (e) {
                error("DOM.getContainer", e);
                return false;
            }
        });
        _ah("hasClass", function (name) {
            /*|{
                "info": "HTMLElement class extension to check if element has the specified class",
                "category": "HTMLElement",
                "parameters":[
                    {"name": "(String) Class name to check"}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.hasClass",
                "returnType": "(Bool)"
            }|*/
            try {
                var regex = new RegExp('((^)|(\\s+))' + name + '(\\s+|$)');
                return regex.test(this.className);
            } catch (e) {
                error("DOM.addClass", e);
                return false;
            }
        });
        _ah("height", function (isBody) {
            /*|{
                "info": "HTMLElement class extension to get the pixel height as a number",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.height",
                "returnType": "(Number)"
            }|*/
            try {
                return _getDimension.call(this, isBody, 'height');
            } catch (e) {
                error("DOM.height", e);
                return false;
            }
        });
        _ah("hide", function () {
            /*|{
                "info": "HTMLElement class extension to hide (display:none;) the element",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.hide",
                "returnType": "(Bool)"
            }|*/
            try {
                if (this.tagName.toLowerCase() == "object") {
                    this.style.visibility = "hidden";
                    !parseInt(this.height) || this.setAttribute('data-height', this.height);
                    !parseInt(this.width) || this.setAttribute('data-width', this.width);

                    this.height = 0;
                    this.width = 0;
                } else {
                    this.style.display = "none";
                }
                return true;
            } catch (e) {
                error("DOM.hide", e);
                return false;
            }
        });
        _ah("input", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger input event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.input",
                "returnType": "(void)"
            }|*/
            this.on("input", callback);
        });
        _ah("insertAfter", _insertAfter);
        _ah("insertAlphabetically", function (elem) {
            /*|{
                "info": "HTMLElement class extension to insert element alphabetically by id attribute",
                "category": "HTMLElement",
                "parameters":[
                    {"elem": "(HTMLElement) Element to insert"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.insertAlphabetically",
                "returnType": "(Bool)"
            }|*/
            try {
                var childNodes = this.children,
                    eid = elem.id.toLowerCase(),
                    arr = [],
                    index = -1;

                for (var i = 0; i < childNodes.length; i++) {
                    arr[i] = childNodes[i].id.toLowerCase();
                }
                arr[arr.length] = eid;
                arr.sort();
                index = arr.indexOf(eid);
                if (arr.length > 1 && index != arr.length - 1) {
                    this.insertBefore(elem, childNodes[index]);
                } else {
                    this.appendChild(elem);
                }
                return true;
            } catch (e) {
                error("DOM.insertAlphabetically", e);
                return false;
            }
        });
        _ah("insertAt", _insertAt);
        _ah("invalid", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger invalid event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                    {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.invalid",
                "returnType": "(void)"
            }|*/
            this.on("invalid", callback);
        });
        _ah("isOrphan", function () {
            /*|{
                "info": "HTMLElement class extension to check if it is not part of the DOM tree",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.isOrphan",
                "returnType": "(void)"
            }|*/
            try {
                var node = this.parentNode,
                    dhtml = $CSS('html')[0];

                while (node) {
                    if (node == dhtml) {
                        return false;
                    }
                    node = node.parentNode;
                }
                return true;
            } catch (e) {
                error("DOM.isOrphan", e);
                return undefined;
            }
        });
        _ah("keydown", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger keydown event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                    {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.keydown",
                "returnType": "(void)"
            }|*/
            this.on("keydown", callback);
        });
        _ah("keypress", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger keypress event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                {"parameters":[
                    {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.keypress",
                "returnType": "(void)"
            }|*/
            this.on("keypress", callback);
        });
        _ah("keyup", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger keyup event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.keyup",
                "returnType": "(void)"
            }|*/
            this.on("keyup", callback);
        });
        _ah("left", function () {
            /*|{
                "info": "HTMLElement class extension to get the pixel left as a number",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.left",
                "returnType": "(Number)"
            }|*/
            try {
                return _getDimension.call(this, null, 'left');
            } catch (e) {
                error("DOM.left", e);
                return false;
            }
        });
        _ah("mousedown", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger mousedown event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.mousedown",
                "returnType": "(void)"
            }|*/
            this.on("mousedown", callback);
        });
        _ah("mousemove", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger mousemove event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.mousemove",
                "returnType": "(void)"
            }|*/
            this.on("mousemove", callback);
        });
        _ah("mouseout", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger mouseout event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.mouseout",
                "returnType": "(void)"
            }|*/
            this.on("mouseout", callback);
        });
        _ah("mouseover", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger mouseover event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.mouseover",
                "returnType": "(void)"
            }|*/
            this.on("mouseover", callback);
        });
        _ah("mouseup", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger mouseup event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.mouseup",
                "returnType": "(void)"
            }|*/
            this.on("mouseup", callback);
        });
        _ah("mousewheel", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger mousewheel event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.mousewheel",
                "returnType": "(void)"
            }|*/
            this.on("mousewheel", callback);
        });
        _ah("moveDown", function (tagName) {
            /*|{
                "info": "HTMLElement class extension to move an element after the next sibling",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"tagName": "(String) Used to get next sibling with a specific HTML tag"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.moveDown",
                "returnType": "(Bool)"
            }|*/
            try {
                var thiss = this;
                while (!isNull(thiss.nextSibling) && (thiss.nextSibling.nodeType != 1 || (tagName && thiss.nextSibling.tagName.toLowerCase() != tagName))) {
                    thiss = thiss.nextSibling;
                }
                //if not last element
                if (!isNull(thiss.nextSibling)) {
                    thiss.parentNode.insertBefore(this, thiss.nextSibling.nextSibling);
                    return true;
                }
                return false;
            } catch (e) {
                error("DOM.moveDown", e);
                return false;
            }
        });
        _ah("moveUp", function (tagName) {
            /*|{
                "info": "HTMLElement class extension to move an element before the previous sibling",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"tagName": "(String) Used to get previous sibling with a specific HTML tag"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.moveUp",
                "returnType": "(Bool)"
            }|*/
            try {
                var thiss = this;
                while (!isNull(thiss.previousSibling) && (thiss.previousSibling.nodeType != 1 || (tagName && thiss.previousSibling.tagName.toLowerCase() != tagName))) {
                    thiss = thiss.previousSibling;
                }
                //if not first element
                if (!isNull(thiss.previousSibling)) {
                    thiss.parentNode.insertBefore(this, thiss.previousSibling);
                    return true;
                }
                return false;
            } catch (e) {
                error("DOM.moveUp", e);
                return false;
            }
        });
        _ah("on", _on);
        _ah("remove", _remove);
        _ah("removeClass", function (names) {
            /*|{
                "info": "HTMLElement class extension to remove a class from the DOM object",
                "category": "HTMLElement",
                "parameters":[
                    {"names": "(String[]) Name of the class to remove"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.removeClass",
                "returnType": "(Bool)"
            }|*/
            try {
                names = _isArray(names) ? names : [names];
                var arr = this.className.split(' '), i = 0, name;
                while (name = names[i++]) {
                    var index = arr.indexOf(name);
                    if (~index) {
                        arr.splice(index, 1);
                    }
                }
                this.className = arr.join(' ').trim();
                return true;
            } catch (e) {
                error("DOM.removeClass", e);
                return false;
            }
        });
        _ah("replace", function (dom) {
            /*|{
                "info": "HTMLElement class extension to replace the DOM element",
                "category": "HTMLElement",
                "parameters":[
                    {"dom": "(HTMLElement) Element used to replace"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.replace",
                "returnType": "(Bool)"
            }|*/
            try {
                return this.parentNode.replaceChild(dom, this);
            } catch (e) {
                error("DOM.replace", e);
                return false;
            }
        });
        _ah("reset", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger reset event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                    {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.reset",
                "returnType": "(void)"
            }|*/
            this.on("reset", callback);
        });
        _ah("scroll", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger scroll event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.scroll",
                "returnType": "(void)"
            }|*/
            this.on("scroll", callback);
        });
        _ah("select", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger select event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                    {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.select",
                "returnType": "(void)"
            }|*/
            this.on("select", callback);
        });
        _ah("show", function () {
            /*|{
                "info": "HTMLElement class extension to show (display:block) the element",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.show",
                "returnType": "(Bool)"
            }|*/
            try {
                if (this.tagName.toLowerCase() == "object") {
                    this.style.visibility = "visible";
                    this.height = this.getAttribute('data-height') || this.height;
                    this.width = this.getAttribute('data-width') || this.width;
                    this.removeAttribute('data-height');
                    this.removeAttribute('data-width');
                } else {
                    this.style.display = "block";
                }
                return true;
            } catch (e) {
                error("DOM.show", e);
                return false;
            }
        });
        _ah("submit", function (callback) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger submit event",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.submit",
                "returnType": "(void)"
            }|*/
            this.on("submit", callback);
        });
        _ah("toString", function () {
            /*|{
                "info": "HTMLElement class extension to conver the HTMLElement to a string representation",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.toString",
                "returnType": "(String)"
            }|*/
            try {
                var domElemContainer = $d.createElement('div');
                domElemContainer.appendChild(this.cloneNode(true));
                return domElemContainer.innerHTML;
            } catch (e) {
                error("DOM.toString", e);
                return false;
            }
        }, true);
        _ah("toggle", function () {
            /*|{
                "info": "HTMLElement class extension to toggle show/hide on the element",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.hookEvent",
                "returnType": "(Bool)"
            }|*/
            try {
                var style = "visibility",
                    inheritedStyle,
                    parent = this.parentNode;
                this.tagName.toLowerCase() == "object" || (style = "display");
                // look for inherited style
                inheritedStyle = this.style[style] in {
                    none: 1,
                    hidden: 1
                };
                while (parent && !inheritedStyle) {
                    if (parent.style && parent.style[style]) {
                        inheritedStyle = parent.style[style] in {
                            none: 1,
                            hidden: 1
                        };
                        break;
                    }
                    parent = parent.parentNode;
                }
                //finally check if height and width are 0/false
                !this.width() && !this.height() && (inheritedStyle = true);
                inheritedStyle ? this.show() : this.hide();
                return true;
            } catch (e) {
                error("DOM.toggle", e);
                return false;
            }
        });
        _ah("top", function () {
            /*|{
                "info": "HTMLElement class extension to get the pixel top as a number",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.top",
                "returnType": "(Number)"
            }|*/
            try {
                return _getDimension.call(this, null, 'top');
                //return this.getClientRects && this.getClientRects()[0].top <= this.offsetTop ? this.getClientRects()[0].top : this.offsetTop;
            } catch (e) {
                error("DOM.top", e);
                return false;
            }
        });
        _ah("unbind", function (evt, func) {
            /*|{
                "info": "HTMLElement class extension to handle and trigger events",
                "category": "HTMLElement",
                "parameters":[
                    {"event": "(String) Event name"}],

                "overloads":[
                    {"parameters":[
                        {"event":"(String) Event name"},
                        {"callback": "(Function) Callback function when triggered"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.input",
                "returnType": "(void)"
            }|*/
            this.events = this.events || {};
            this.events[evt] = this.events[evt] || [];
            if (func) {
                var index = this.events[evt].indexOfAlt(func, function (obj, value) { return (obj.toString() == value.toString()); });
                ~index && this.events[evt].splice(index, 1);
            } else {
                this.events[evt] = [];
            }

            !this.events[evt].length && this.removeAttribute("on" + evt);
        });
        _ah("width", function (isBody) {
            /*|{
                "info": "HTMLElement class extension to get the pixel width as a number",
                "category": "HTMLElement",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#htmlelement.width",
                "returnType": "(Number)"
            }|*/
            try {
                return _getDimension.call(this, isBody, 'width');
            } catch (e) {
                error("DOM.width", e);
                return false;
            }
        });


        /*----------------------------------------------------------------------------------------------------------------
        /-	Function and Generator class Extensions
        /---------------------------------------------------------------------------------------------------------------*/
        _ext(Function, 'catch', function (func) {
            /*|{
                "info": "Function listener to register the catch event",
                "category": "Function",
                "parameters":[
                    {"func":"(Function) Function to call on emit"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#function.catch",
                "returnType": "(String)"
            }|*/
            try {
                $c.on(this, 'catch', func);
            } catch (e) {
                error("Function.catch", e);
            }
        }, true);
        function emit(ev) {
            /*|{
                "info": "Call the next function(s) in queue",
                "category": "Utility",
                "parameters":[
                    {"event": "Event to trigger."}],

                "overloads":[
                    {"parameters":[
                        {"event": "Event to trigger."},
                        {"infinite": "any number of arguments can be passed and will be applied to listening functions."}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#emit",
                "returnType":"(void)"
            }|*/
            try {
                var args = arguments, vals = [];
                if (!_isArray(args)) {
                    args = [];
                    for (var prop in arguments) {
                        args[prop] = arguments[prop];
                    }
                    args.callee = arguments.callee;
                }
                if (args.callee.caller['_emit']) {
                    vals = vals.concat(_run_func_array.call(this, args.callee.caller['_emit'], args));
                }
                if (ev && args.callee.caller['_' + ev]) {
                    vals = vals.concat(_run_func_array.call(this, args.callee.caller['_' + ev], args.splice(1)));
                }
                return vals;
            } catch (e) {
                return e != 'catch' && _run_func_array.call(this, arguments.callee.caller['_catch'], args.length == arguments.length ? args.splice(1) : args);
            }
        }
        _ext(Function, 'extends', function (extendee, inheritAsOwn) {
            /*|{
                "info": "Function class extension to extend another class",
                "category": "Function",
                "parameters":[
                    {"extendee":"(Object) Class to extend"}],

                "overloads":[
                    {"parameters":[
                        {"extendee":"(Object) Class to extend"},
                        {"inheritAsOwn":"(Boolean) Flag to inherit and for values hasOwnProperty to be true."}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#function.extends",
                "returnType": "(Function)"
            }|*/
            try {
                var className = _getFuncName(this),
                    cls = new extendee();
                $c.namespace[className] = $c.namespace && $c.namespace[className];
                for (var prop in cls) {
                    if (inheritAsOwn && !cls.hasOwnProperty(prop)) { continue; }
                    this.prototype[prop] = /* this[prop] || */ this.prototype[prop] || cls[prop];
                }
                if (!inheritAsOwn) {
                    for (var prop in extendee) {
                        if (!extendee.hasOwnProperty(prop)) { continue; }
                        this[prop] = this[prop] || extendee[prop];
                    }
                }
                this.prototype.construct = this.prototype.construct || cls.construct || foo;

                return this;
            } catch (e) {
                error("Function.extends", e);
            }
        }, true);
        _ext(Function, 'getName', function () {
            /*|{
                "info": "Function class extension to get the name of the function",
                "category": "Function",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#function.getName",
                "returnType": "(String)"
            }|*/
            try {
                return this.name || _getFuncName(this);
            } catch (e) {
                error("Function.getName", e);
            }
        }, true);
        _ext(Function, 'getParameters', function () {
            /*|{
                "info": "Function class extension to get parameters in definition",
                "category": "Function",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#function.getParameters",
                "returnType": "(Array)"
            }|*/
            try {
                return _getFuncArgs(this);
            } catch (e) {
                error("Function.getParameters", e);
            }
        }, true);
        function namespace(name, clazz, fn) {
            /*|{
                "info": "Adds the class to a namespace instead of the global space",
                "category": "Utility",
                "parameters":[
                    {"name":"(String) Name of the namespace to add to."},
                    {"clazz":"(Class) Class to add to the given namespace"}],

                "overloads":[
                    {"parameters":[
                        {"name":"(String) Name of the namespace to add to."},
                        {"clazz":"(Class) Class to add to the given namespace"},
                        {"fn":"(Function) Method to call after the class has been added to the namespace"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#namespace",
                "returnType":"(void)"
            }|*/
            try {
                var className = _getFuncName(clazz);
                $c.namespace = $c.namespace || {};
                var dclass = $c.getProperty($c.namespace, name + '.' + className);
                if (dclass) {
                    $g[name] = $g[name].replace(dclass.toString(), '');
                }
                $c.setProperty($c.namespace, name + "." + className, clazz);
                $g[name] = ($g[name] || "") + clazz.toString();
                fn && fn.call(clazz);
                return clazz;
            } catch (e) {
                error('namespace', e);
            }
        }
        function next() {
            /*|{
                "info": "Call the next function(s) in queue",
                "category": "Function",
                "parameters":[
                    {"infinite": "any number of arguments can be passed."}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#next",
                "returnType":"(void)"
            }|*/
            try {
                var args = arguments;
                if (!_isArray(args)) {
                    args = [];
                    for (var prop in arguments) {
                        args[prop] = arguments[prop];
                    }
                    args.callee = arguments.callee;
                }
                return _run_func_array.call(this, arguments.callee.caller._then, arguments);
            } catch (e) {
                return e != 'catch' && _run_func_array.call(this, arguments.callee.caller['_catch'], args.length == arguments.length ? args.splice(1) : args);
            }
        }
        _ext(Function, 'on', _on, true);
        _ext(Function, 'then', function (func) {
            /*|{
                "info": "Function listener to register the then event",
                "category": "Function",
                "parameters":[
                    {"func":"(Function) Function to call on emit"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#function.then",
                "returnType": "(String)"
            }|*/
            try {
                $c.on(this, 'then', func);
            } catch (e) {
                error("Function.then", e);
            }
        }, true);
        var _genConstruct = $c.tryEval(('(function *(){}).constructor'));
        _genConstruct && _ext(_genConstruct, 'toPromise', function () {
    		/*|{
    			"info": "Function listener to register events",
    			"category": "Function",
    			"parameters":[
    				{"event":"(String) Event to listen on and invoked on emit"},
    				{"func":"(Function) Function to call on emit"}],

    			"overloads":[],

    			"url": "http://www.craydent.com/library/1.9.3/docs#function.on",
    			"returnType": "(String)"
    		}|*/
            try {
                return new Promise(function (resolve, reject) {
                    $c.syncroit(_genConstruct);
                });
            } catch (e) {
                error("GeneratorFunction.toPromise", e);
            }
        }, true);


        /*----------------------------------------------------------------------------------------------------------------
        /-	Number class Extensions
        /---------------------------------------------------------------------------------------------------------------*/
        _ext(Number, 'aboutEqualTo', function (compare, giveOrTake) {
            /*|{
                "info": "Number class extension to check if values are approximately equal",
                "category": "Number",
                "parameters":[
                    {"compare": "(Number) Number to compare"},
                    {"giveOrTake": "(Number) Plus/minus value"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#number.aboutEqualTo",
                "returnType": "(Bool)"
            }|*/
            try {
                return $c.isBetween(this, compare - giveOrTake, compare + giveOrTake, true);
            } catch (e) {
                error("Number.aboutEqualTo", e);
            }
        }, true);
        _ext(Number, 'isEven', function () {
            /*|{
                "info": "Number class extension to check if number is even",
                "category": "Number",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#number.",
                "returnType": "(Bool)"
            }|*/
            try {
                return _even(this);
            } catch (e) {
                error("Number.isEven", e);
            }
        }, true);
        _ext(Number, 'isOdd', function () {
            /*|{
                "info": "Number class extension to check if number is odd",
                "category": "Number",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#number.",
                "returnType": "(Bool)"
            }|*/
            try {
                return !_even(this);
            } catch (e) {
                error("Number.isOdd", e);
            }
        }, true);
        _ext(Number, 'toCurrencyNotation', _toCurrencyNotation, true);


        /*----------------------------------------------------------------------------------------------------------------
        /-	Object class Extensions
        /---------------------------------------------------------------------------------------------------------------*/
        _ao("changes", function (compare) {
            /*|{
                "info": "Object class extension to compare properties that have changed",
                "category": "Object",
                "parameters":[
                    {"compare": "(Object) Object to compare against"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.",
                "returnType": "(Object)"
            }|*/
            try {
                if (this.constructor != Object || compare.constructor != Object) {
                    throw new TypeError();
                }
                var rtn = { $length: 0, $add: [], $update: [], $delete: [] };
                // loop through each property of the original
                for (var prop in this) {
                    if (this.hasOwnProperty(prop)) {
                        if (!compare.hasOwnProperty(prop)) {
                            rtn[prop] = null;
                            rtn.$delete.push(prop);
                            rtn.$length++;
                        } else if (!_equals(compare[prop], this[prop])) {
                            rtn[prop] = compare[prop];
                            rtn.$update.push(prop);
                            rtn.$length++;
                        }
                    }
                }
                // loop through each property of the compare to make sure
                // there are no properties from compare missing from the original
                for (var prop in compare) {
                    if (compare.hasOwnProperty(prop) && !this.hasOwnProperty(prop)) {
                        rtn[prop] = compare[prop];
                        rtn.$add.push(prop);
                        rtn.$length++;
                    }
                }
                return rtn;

            } catch (e) {
                error("Object.changes", e);
            }
        });
        _ao("contains", function (val, func) {
            /*|{
                "info": "Object class extension to check if value exists",
                "category": "Array|Object",
                "parameters":[
                    {"val": "(Mixed) Value to check or custom function to determine validity"}],

                "overloads":[
                    {"parameters":[
                        {"val": "(Mixed) Value to check"},
                        {"func": "(Function) Callback function used to do the comparison"}]},

                    {"parameters":[
                        {"arr": "(Array) Array of values to return first matching value"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
                "returnType": "(Bool)"
            }|*/
            try {
                return _contains(this, val, func);
            } catch (e) {
                error("Object.contains", e);
            }
        });
        _ao("copyObject", function () {
            /*|{
                "info": "Object class extension to copy an object excluding constructor",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.copyObject",
                "returnType": "(Object)"
            }|*/
            try {
                if (!this) { return undefined; }
                return _duplicate({}, this, true);
            } catch (e) {
                error("Object.copyObject", e);
            }
        });
        _ao("count", function (option) {
            /*|{
                "info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
                "category": "Object",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"option": "(Mixed) Query used in Array.where when counting elements in an Array"}]},

                    {"parameters":[
                        {"option": "(String) Word or phrase to count in the String"}]},

                    {"parameters":[
                        {"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.count",
                "returnType": "(Int)"
            }|*/
            try {
                return _count(this, option);
            } catch (e) {
                error('Object.count', e);
            }
        });
        _ao("duplicate", function (recursive) {
            /*|{
                "info": "Object class extension to copy an object including constructor",
                "category": "Object",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"recursive": "(Boolean) Flag to copy all child objects recursively"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.duplicate",
                "returnType": "(Object)"
            }|*/
            try {
                return _duplicate(new this.constructor(), this, recursive);
            } catch (e) {
                error('Object.duplicate', e);
            }
        });
        _ao("eachProperty", function (callback) {
            /*|{
                "info": "Object class extension to loop through all properties where hasOwnValue is true.",
                "category": "Object",
                "parameters":[
                    {"callback": "(Function) Function to call for each property.  Callback will have two arguments (the value of the object and the property name) passed"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.eachProperty",
                "returnType": "(Object)"
            }|*/
            try {
                for (var prop in this) {
                    if (!this.hasOwnProperty(prop)) { continue; }
                    if (callback.call(this, this[prop], prop)) { break; }
                }
            } catch (e) {
                error('Object.eachProperty', e);
            }
        });
        _ao("equals", function (compare, props) {
            /*|{
                "info": "Object class extension to check if object values are equal",
                "category": "Object",
                "parameters":[
                    {"compare": "(Object) Object to compare against"}],

                "overloads":[
                    {"parameters":[
                        {"compare": "(Object) Object to compare against"},
                        {"props": "(String[]) Array of property values to compare against"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
                "returnType": "(Bool)"
            }|*/
            try {
                if (_isArray(props)) {
                    var j = 0;
                    while (prop = props[j++]) {
                        if (this.hasOwnProperty(prop) && compare.hasOwnProperty(prop) && !_equals(this[prop], compare[prop])
                            || (!this.hasOwnProperty(prop) && compare.hasOwnProperty(prop)) || (this.hasOwnProperty(prop) && !compare.hasOwnProperty(prop))) {
                            return false;
                        }
                    }
                    return true;
                }
                if (($c.isObject(this) && $c.isObject(compare)) || (_isArray(this) && _isArray(compare))) {
                    for (var prop in compare) {
                        if (!compare.hasOwnProperty(prop)) { continue; }
                        if (!_equals(this[prop], compare[prop])) { return false; }
                    }
                    for (var prop in this) {
                        if (!this.hasOwnProperty(prop)) { continue; }
                        if (!_equals(this[prop], compare[prop])) { return false; }
                    }
                    return true;
                }
                if (this === undefined && compare !== undefined || this !== undefined && compare === undefined) { return false; }
                if (this === null && compare !== null || this !== null && compare === null) { return false; }
                if ($c.isRegExp(compare)) { return compare.test(this.toString()); }
                return (this.toString() == compare.toString() && this.constructor == compare.constructor);
            } catch (e) {
                error('Object.equals', e);
            }
        });
        _ao("every", function (callback, thisObject) {
            /*|{
                "info": "Object class extension to check property values against a function",
                "category": "Object",
                "parameters":[
                    {"callback": "(Function) Callback to apply to each value"}],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback to apply to each value"},
                        {"thisObject": "(Mixed) Context for the callback function"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.every",
                "returnType": "(Bool)"
            }|*/
            try {
                thisObject = thisObject || this;
                for (var prop in this)
                    if (/*this[prop] && */!callback.call(thisObject, this[prop], prop, this))
                        return false;
                return true;
            } catch (e) {
                error("Object.every", e);
            }
        });
        _ao("getClass", function () {
            /*|{
                "info": "Object class extension to get the constructor name",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.getClass",
                "returnType": "(String)"
            }|*/
            try {
                return _getFuncName(this.constructor);
            } catch (e) {
                error('Object.getClass', e)
            }
        });
        _ao("getKeys", function () {
            /*|{
                "info": "Object class extension to get the keys of the object",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.getKeys",
                "returnType": "(Array)"
            }|*/
            try {
                if (Object.keys) {
                    return Object.keys(this);
                }
                var arr = [];
                for (var prop in this) {
                    if (this.hasOwnProperty(prop)) {
                        arr.push(prop);
                    }
                }
                return arr;
            } catch (e) {
                error('Object.getKeys', e);
            }
        });
        _ao("getProperty", function (path, delimiter, options) {
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
                        {"options": "(Object) Options for ignoring inheritance, validPath, etc"}]},

                    {"parameters":[
                        {"path": "(String) Path to nested property"},
                        {"delimiter": "(Char) Separator used to parse path"},
                        {"options": "(Object) Options for ignoring inheritance, validPath, etc"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
                "returnType": "(Mixed)"
            }|*/
            try {
                if ($c.isRegExp(path)) {
                    for (var prop in this) {
                        if (!this.hasOwnProperty(prop)) { continue; }
                        if (path.test(prop)) { return this[prop]; }
                    }
                    return undefined;
                }

                if ($c.isObject(delimiter)) {
                    options = delimiter;
                    delimiter = undefined;
                }
                options = options || {};
                delimiter = delimiter || ".";
                path = _strip(path, delimiter);
                var props = path.split(delimiter);
                var value = this, i = 0, prop;
                while (prop = props[i++]) {
                    if (isNull(value[prop])
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
        });
        _ao("getValue", function (args, dflt) {
            /*|{
                "info": "Object class extension to retrieve value of an object property",
                "category": "Object",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"dflt": "(Mixed) Default value to return if context is not a function"}]},

                    {"parameters":[
                        {"args": "(Mixed[]) An array of arguments to pass to context when it is a function"},
                        {"dflt": "(Mixed) Default value to return if context is not a function"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.getProperty",
                "returnType": "(Mixed)"
            }|*/
            try {
                if (!_isFunction(this)) {
                    if (args && !dflt) { dflt = args; }
                    var args = [this];
                    if (dflt !== undefined) { args.push(dflt); }
                    return isNull.apply($c, args) || (_isArray(this) ? this : this.constructor(this));
                }
                var rtn = this.apply(this, args);
                return rtn === undefined ? dflt : rtn;
            } catch (e) {
                error('Object.getValue', e);
            }
        });
        _ao("has", function () {
            /*|{
                "info": "Alias to Object.prototype.hasOwnProperty",
                "category": "Object",
                "parameters":[
                    {"property": "(String) Property name to check"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.has",
                "returnType": "(Boolean)"
            }|*/
            try {
                var args = arguments;
                if (arguments.length > 1 && this == args[0]) {
                    args = [];
                    for (var i = 1, len = arguments.length; i < len; i++) {
                        args.push(arguments[i]);
                    }

                }
                return Object.prototype.hasOwnProperty.apply(this, args);
            } catch (e) {
                error('Object.has', e);
            }
        });
        _ao("isArray", function () {
            /*|{
                "info": "Object class extension to check if object is an array",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isArray",
                "returnType": "(Bool)"
            }|*/
            return _isArray(this);
        });
        _ao("isAsync", function () {
            /*|{
                "info": "Object class extension to check if object is a async function",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
                "returnType": "(Bool)"
            }|*/
            return _type_check(this, "AsyncFunction", true);
        });
        _ao("isBetween", function (lowerBound, upperBound, inclusive) {
            /*|{
                "info": "Object class extension to check if object is between lower and upper bounds",
                "category": "Object",
                "parameters":[
                    {"lowerBound": "(Mixed) Lower bound comparison"},
                    {"upperBound": "(Mixed) Upper bound comparison"}],

                "overloads":[
                    {"parameters":[
                        {"lowerBound": "(Mixed) Lower bound comparison"},
                        {"upperBound": "(Mixed) Upper bound comparison"},
                        {"inclusive": "(Bool) Flag to include give bounds"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
                "returnType": "(Bool)"
            }|*/
            try {
                if (isNull(this)) { return false; }
                if (inclusive) {
                    return (this >= lowerBound && this <= upperBound);
                } else {
                    return (this > lowerBound && this < upperBound);
                }
            } catch (e) {
                error('Object.isBetween', e);
            }
        });
        _ao("isBoolean", function () {
            /*|{
                "info": "Object class extension to check if object is a boolean",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isBoolean",
                "returnType": "(Bool)"
            }|*/
            return _type_check(this, Boolean);
        });
        _ao("isDate", function () {
            /*|{
                "info": "Object class extension to check if object is a date",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isDate",
                "returnType": "(Bool)"
            }|*/
            return _type_check(this, Date);
        });
        _ao("isDomElement", function () {
            /*|{
                "info": "Object class extension to check if object is a DOM element",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isDomElement",
                "returnType": "(Bool)"
            }|*/
            try {
                if (isNull(this)) { return false; }
                return (this.nodeType == 1);
            } catch (e) {
                error('Object.isDomElement', e);
            }
        });
        _ao('isEmpty', function () {
            /*|{
                "info": "Object class extension to check if it is empty",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isEmpty",
                "returnType": "(Bool)"
            }|*/
            try {
                if (_isArray(this) || _isString(this)) { return !this.length; }
                if ($c.isObject(this)) { return !_itemCount(this); }
                if (_isFunction(this)) {
                    return /function.*?\(.*?\)\{\}/.test(this.toString().replace(/[\n ]/g, ''));
                }
                return false;
            } catch (e) {
                error("Object.isEmpty", e);
                return false;
            }
        }, true);
        _ao('isError', function () {
            /*|{
                "info": "Object class extension to check if object is an error object",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isError",
                "returnType": "(Bool)"
            }|*/
            try {
                var is = _type_check(this, Error);
                return is || !!~$c.ERROR_TYPES.indexOf(obj) || !!~$c.ERROR_TYPES.indexOf(obj.constructor.name);
            } catch (e) {
                error('Object.isError', e);
            }
        });
        _ao("isFloat", function () {
            /*|{
                "info": "Object class extension to check if object is a float",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
                "returnType": "(Bool)"
            }|*/
            try {
                if (isNull(this)) { return false; }
                return ($c.isNumber(this) && (parseFloat(this) == this || parseFloat(this) === 0));
            } catch (e) {
                error('Object.isFloat', e);
            }
        });
        _ao("isFunction", function () {
            /*|{
                "info": "Object class extension to check if object is a function",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isFunction",
                "returnType": "(Bool)"
            }|*/
            return _isFunction(this);
        });
        _ao("isGenerator", function () {
            /*|{
                "info": "Object class extension to check if object is a generator function",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isGenerator",
                "returnType": "(Bool)"
            }|*/
            return _type_check(this, "GeneratorFunction", true);
        });
        _ao("isGeolocation", function () {
            /*|{
                "info": "Object class extension to check if object is a geolocation",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
                "returnType": "(Bool)"
            }|*/
            return _type_check(this, "Geolocation", true);
        });
        _ao("isInt", function () {
            /*|{
                "info": "Object class extension to check if object is an integer",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isInt",
                "returnType": "(Bool)"
            }|*/
            try {
                if (isNull(this) || _isArray(this)) { return false; }
                return (parseInt(this) == this || parseInt(this) === 0);
            } catch (e) {
                error('Object.isInt', e);
            }
        });
        _ao("isNumber", function () {
            /*|{
                "info": "Object class extension to check if object is a number",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isNumber",
                "returnType": "(Bool)"
            }|*/
            return _type_check(this, Number);
        });
        _ao("isObject", function (check_instance) {
            /*|{
                "info": "Object class extension to check if object is an object",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isObject",
                "returnType": "(Bool)"
            }|*/
            try {
                if (isNull(this)) { return false; }
                return (this.constructor == Object || (!!check_instance && this instanceof Object));
            } catch (e) {
                error('Object.isObject', e);
            }
        });
        _ao("isPromise", function () {
            /*|{
                "info": "Object class extension to check if object is a promise object",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isPromise",
                "returnType": "(Bool)"
            }|*/
            return _type_check(this, "Promise", true);
        });
        _ao("isRegExp", function () {
            /*|{
                "info": "Object class extension to check if object is a RegExp",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isRegExp",
                "returnType": "(Bool)"
            }|*/
            return _type_check(this, RegExp);
        });
        _ao("isString", function () {
            /*|{
                "info": "Object class extension to check if object is a string",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isString",
                "returnType": "(Bool)"
            }|*/
            return _type_check(this, String);
        });
        _ao("isSubset", function (compare, sharesAny) {
            /*|{
                "info": "Object class extension to check if item is a subset",
                "category": "Object",
                "parameters":[
                    {"compare": "(Mixed) Superset to compare against"}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
                "returnType": "(Bool)"
            }|*/
            try {
                var isArray = _isArray(this) && _isArray(compare);
                if (($c.isObject(this) && $c.isObject(compare)) || isArray) {

                    for (var prop in this) {
                        if (!this.hasOwnProperty(prop)) { continue; }
                        if (!isArray && !compare.hasOwnProperty(prop) || isArray && !_contains(compare, this[prop])) { return false; }
                        if (sharesAny) { return true; }
                    }

                    return true;
                } else {
                    return ~this.toString().indexOf(compare.toString()) && this.constructor == compare.constructor;
                }
            } catch (e) {
                error('Object.isSubset', e);
            }
        });
        _ao("itemCount", function () {
            /*|{
                "info": "Object class extension to count the properties in item",
                "category": "Object",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.itemCount",
                "returnType": "(Int)"
            }|*/
            try {
                if ($c.isObject(this)) {
                    var count = 0;
                    for (var prop in this) {
                        if (this.hasOwnProperty(prop)) { count++; }
                    }
                    return count;
                }
                return undefined;
            } catch (e) {
                error('Object.itemCount', e);
            }
        });
        _ao("keyOf", function (value) {
            /*|{
                "info": "Object class extension to get the key of the give value",
                "category": "Object",
                "parameters":[
                    {"value": "(Mixed) Value to compare against"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.keyOf",
                "returnType": "(String)"
            }|*/
            try {
                for (var prop in this) {
                    if (this.hasOwnProperty(prop)) {
                        if (this[prop] === value) { return prop; }
                    }
                }
                return null;
            } catch (e) {
                error('Object.keyOf', e);
            }
        });
        _ao("map", function (callback, thisObject) {
            /*|{
                "info": "Object class extension to apply method to every value",
                "category": "Object",
                "parameters":[
                    {"callback": "(Function) Callback to apply to each value"}],

                "overloads":[
                    {"parameters":[
                        {"callback": "(Function) Callback to apply to each value"},
                        {"thisObject": "(Mixed) Context for the callback function"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.map",
                "returnType": "(void)"
            }|*/
            try {
                thisObject = thisObject || this;
                for (var prop in this) {
                    if (this.hasOwnProperty(prop)) {
                        this[prop] = callback.call(thisObject, this[prop]);
                    }
                }
            } catch (e) {
                error('Object.map', e)
            }
        });
        _ao("merge", function (secondary, condition) {
            /*|{
                "info": "Object class extension to merge objects",
                "category": "Object",
                "parameters":[
                    {"secondary": "(Object) Object to merge with"}],

                "overloads":[
                    {"parameters":[
                        {"secondary": "(Object) Object to merge with"},
                        {"condition": "(Mixed) Flags to recurse, merge only shared value, clone, intersect etc"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.merge",
                "returnType": "(Object)"
            }|*/
            try {
                condition = condition || {};
                var recurse = condition == "recurse" || condition.recurse,
                    shared = condition == "onlyShared" || condition.onlyShared,
                    intersect = condition == "intersect" || condition.intersect,
                    objtmp = (condition == "clone" || condition.clone) ? $c.duplicate(this, true) : this,
                    compareFunction = _isFunction(condition) ? condition : condition.compareFunction,
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
                        } else if (compareFunction && _isFunction(compareFunction)) {
                            if (_isArray(objtmp) && objtmp.hasOwnProperty(prop) && compareFunction(objtmp[prop], secondary[prop])) {
                                objtmp[prop] = secondary[prop];
                                continue;
                            }
                            objtmp.push(duplicate(secondary[prop]));
                        } else {
                            if (_isArray(objtmp) && (isNull(condition) || recurse)) {
                                if (!~objtmp.indexOf(secondary[prop])) {
                                    objtmp.push(secondary[prop]);
                                }
                            } else if (recurse && (_isArray(objtmp[prop]) || $c.isObject(objtmp[prop])) && (_isArray(secondary[prop]) || $c.isObject(secondary[prop]))) {
                                objtmp[prop] = $c.merge(objtmp[prop], secondary[prop], condition);
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
        });
        _ao("setProperty", function (path, value, delimiter, options) {
            /*|{
                "info": "Object class extension to set nested properties creating necessary property paths",
                "category": "Object",
                "parameters":[
                    {"path": "(String) Path to nested property"},
                    {"value": "(Mixed) Value to set"}],

                "overloads":[
                    {"parameters":[
                        {"path": "(String) Path to nested property"},
                        {"value": "(Mixed) Value to set"},
                        {"delimiter": "(Char) Separator used to parse path"}]},

                    {"parameters":[
                        {"path": "(String) Path to nested property"},
                        {"delimiter": "(Char) Separator used to parse path"},
                        {"value": "(Mixed) Value to set"},
                        {"options": "(Object) Options for ignoring inheritance, validPath, etc"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
                "returnType": "(Bool)"
            }|*/
            try {
                options = options || {};
                delimiter = delimiter || ".";
                path = _strip(path, delimiter);
                var props = path.split(delimiter);
                var obj = this, i = 0, prop, len = props.length, pobj, pprop;
                while (prop = props[i++]) {
                    if (i == len) {
                        return obj[prop] = value, true;
                    }
                    if (pobj && pprop && !_isArray(pobj[pprop]) && parseInt(prop) >= 0) {
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
        });
        _ao("toStringAlt", function (delimiter, prefix, urlEncode) {
            /*|{
                "info": "Object class extension for an alternate way to stringify object to formatted string",
                "category": "Object",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"delimiter": "(Char) Character to separate the property from the value"}]},
                    {"parameters":[
                        {"delimiter": "(Char) Character to separate the property from the value"},
                        {"prefix": "(Char) Character to prefix the property name"}]},
                    {"parameters":[
                        {"delimiter": "(Char) Character to separate the property from the value"},
                        {"prefix": "(Char) Character to prefix the property name"},
                        {"urlEncode": "(Bool) Flag to url encode the property and value"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#",
                "returnType": "(String)"
            }|*/
            try {
                delimiter = delimiter || '=';
                prefix = prefix || '&';
                var str = '';
                for (var prop in this) {
                    if (this.hasOwnProperty(prop)) {
                        var value = $c.isObject(this[prop]) ? JSON.stringify(this[prop]) : this[prop];
                        urlEncode &&
                            (str += prefix + encodeURIComponent(prop) + delimiter + encodeURIComponent(value)) || (str += prefix + prop + delimiter + value);
                    }
                }
                return str;
            } catch (e) {
                error('Object.toStringAlt', e);
            }
        }, true);


        /*----------------------------------------------------------------------------------------------------------------
        /-	RegExp class Extensions
        /---------------------------------------------------------------------------------------------------------------*/
        _ext(RegExp, 'addFlags', function (flags) {
            /*|{
                "info": "RegExp class extension to add flags to regex",
                "category": "RegExp",
                "parameters":[
                    {"flags": "(String) Flags to add"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#regexp.addFlag",
                "returnType": "(RegExp)"
            }|*/
            try {
                return _addFlags(this, flags);
            } catch (e) {
                error("RegExp.addFlags", e);
            }
        }, true);


        /*----------------------------------------------------------------------------------------------------------------
        /-	String class Extensions
        /---------------------------------------------------------------------------------------------------------------*/
        _ext(String, 'acronymize', function (capsOnly, delimiter) {
            /*|{
                "info": "String class extension to create an acronym from the given string",
                "category": "String",
                "parameters":[
                    {"capsOnly": "(Boolean) Flag to indicate to use capital letters only."}],

                "overloads":[
                    {"parameters":[
                        {"match": "(RegExp) Pattern to match to qualify the Acronym."}]},

                    {"parameters":[
                        {"capsOnly": "(Boolean) Flag to indicate to use capital letters only."},
                        {"delimiter": "(String) Character that delimits the string."}]},

                    {"parameters":[
                        {"match": "(RegExp) Pattern to match to qualify the Acronym."},
                        {"delimiter": "(String) Character that delimits the string."}]},

                    {"parameters":[
                        {"capsOnly": "(Boolean) Flag to indicate to use capital letters only."},
                        {"delimiter": "(RegExp) RegExp pattern that delimits the string."}]},

                    {"parameters":[
                        {"match": "(RegExp) Pattern to match to qualify the Acronym."},
                        {"delimiter": "(RegExp) RegExp pattern that delimits the string."}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.acronymize",
                "returnType": "(String)"
            }|*/
            try {
                delimiter = delimiter || " ";
                if ($c.isBoolean(capsOnly)) {
                    if (capsOnly) {
                        capsOnly = /[A-Z]/
                    } else {
                        capsOnly = /[a-zA-Z]/
                    }
                }
                var words = this.split(delimiter),
                    acronym = "";
                for (var i = 0, len = words.length; i < len; i++) {
                    if (capsOnly.test(words[0])) { acronym += words[0]; }
                }
                return acronym.toUpperCase();
            } catch (e) {
                error("String.acronymize", e);
            }
        }, true);
        _ext(String, 'capitalize', function (pos, everyWord) {
            /*|{
                "info": "String class extension to capitalize parts of the string",
                "category": "String",
                "parameters":[
                    {"pos": "(Int[]) Index of the string to capitalize"}],

                "overloads":[
                    {"parameters":[
                        {"pos": "(Int) Index of the string to capitalize"},
                        {"everyWord": "(Bool) Flag to capital every word"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.capitalize",
                "returnType": "(String)"
            }|*/
            try {
                pos = pos || [0];
                !_isArray(pos) && (pos = [pos]);
                var wordArray = everyWord ? this.split(' ') : ([this]);
                for (var i = 0; i < pos.length; i++) {
                    for (var j = 0; j < wordArray.length; j++) {
                        wordArray[j] = wordArray[j].substring(0, pos[i]) + wordArray[j].charAt(pos[i]).toUpperCase() + wordArray[j].slice(pos[i] + 1);
                    }
                }
                return wordArray.join(' ');
            } catch (e) {
                error("String.capitalize", e);
            }
        }, true);
        _ext(String, 'convertUTCDate', function (delimiter) {
            /*|{
                "info": "String class extension to convert date string to UTC format",
                "category": "String",
                "parameters":[
                    {"delimiter": "(String) Character that delimits the date string"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.convertUTCDate",
                "returnType": "(String)"
            }|*/
            try {
                var dateAsString = this;
                if (dateAsString.substring(dateAsString.length - 2) == ".0") {
                    dateAsString = dateAsString.substring(0, dateAsString.length - 2);
                }
                var pattern = new RegExp("(\\d{4})" + delimiter + "(\\d{2})" + delimiter + "(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})");
                var parts = dateAsString.match(pattern);

                return parts ? parts[2] + "/" + parts[3] + "/" + parts[1] + " " + parts[4] + ":" + parts[5] + ":" + parts[6] : dateAsString;
            } catch (e) {
                error('String.convertUTCDate', e);
            }
        }, true);
        _ext(String, 'cut', function (si, ei, replacement) {
            /*|{
                "info": "String class extension to remove between the provided indexes",
                "category": "String",
                "parameters":[
                    {"start_index": "(Integer) Start index to cut"},
                    {"end_index": "(Integer) End index to cut"}],

                "overloads":[{
                    "parameters":[
                        {"start_index": "(Integer) Start index to cut"},
                        {"end_index": "(Integer) End index to cut"},
                        {"replacement": "(String) String to put in place of the cut"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.cut",
                "returnType": "(String)"
            }|*/
            try {
                if (isNull(si) || isNull(ei)) { return this; }
                if (ei == 0 && si != 0) { ei = si; }
                return this.slice(0, si) + (replacement || "") + this.slice(ei);
            } catch (e) {
                error("String.cut", e);
            }
        }, true);
        _ext(String, 'ellipsis', function (before, after) {
            /*|{
                "info": "String class extension to shorten by ellipsis",
                "category": "String",
                "parameters":[
                    {"before": "(Int) Number of characters to use before using ellipsis"}],

                "overloads":[
                    {"parameters":[
                        {"before": "(Int) Number of characters to use before using ellipsis"},
                        {"after": "(Int) Number of characters to use after the ellipsis"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.ellipsis",
                "returnType": "(String)"
            }|*/
            try {
                after = after || 0;
                if (before + after > this.length) { return this; }
                return $c.cut(this, before, -1 * after, "...");
            } catch (e) {
                error('String.ellipsis', e);
            }
        });
        _ext(String, 'endItWith', function (ending) {
            /*|{
                "info": "String class extension to guarantee the original string ends with the passed string",
                "category": "String",
                "parameters":[
                    {"ending": "(String) String to end with"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.endItWith",
                "returnType": "(String)"
            }|*/
            try {
                if (this.slice(-(ending.length)) == ending) { return this; }
                return this + ending;
            } catch (e) {
                error('String.endItWith', e);
            }
        });
        _ext(String, 'endsWith', _endsWith);
        _ext(String, 'endsWithAny', _endsWith);
        _ext(String, 'fillTemplate', function (arr_objs, offset, max, bound) {
            /*|{
                "info": "String class extension to fill template based on template syntax",
                "category": "String",
                "featured": true,
                "parameters":[
                    {"objs": "(Objects[]) Objects to fill the template variables"}],

                "overloads":[
                    {"parameters":[
                        {"objs": "(Objects[]) Objects to fill the template variables"},
                        {"offset": "(Int) The start index of the Object array"},
                        {"max": "(Int) The maximum number of records to process"}]},
                    {"parameters":[
                        {"objs": "(Objects[]) Objects to fill the template variables"},
                        {"max": "(Int) The maximum number of records to process"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.fillTemplate",
                "returnType": "(String)"
            }|*/
            try {
                return fillTemplate(this, arr_objs, offset, max, bound);
            } catch (e) {
                error('String.fillTemplate', e);
            }
        });
        _ext(String, 'highlight', function (search, cssClass, tag) {
            /*|{
                "info": "String class extension to surround search words with the given tag(default span) and class (default chighlight)",
                "category": "String",
                "parameters":[
                    {"search": "(String) String to search"}],

                "overloads":[
                    {"parameters":[
                        {"search": "(RegExp) Regular expression to search"}]},

                    {"parameters":[
                        {"search": "(String) String to search"},
                        {"cssClass": "(String) Class to add for highlighting"}]},

                    {"parameters":[
                        {"search": "(RegExp) Regular expression to search"},
                        {"cssClass": "(String) Class to add for highlighting"}]},

                    {"parameters":[
                        {"search": "(String) String to search"},
                        {"cssClass": "(String) Class to add for highlighting"},
                        {"tag": "(String) Tag to use to surround the search"}]},

                    {"parameters":[
                        {"search": "(RegExp) Regular expression to search"},
                        {"cssClass": "(String) Class to add for highlighting"},
                        {"tag": "(String) Tag to use to surround the search"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.highlight",
                "returnType": "(String)"
            }|*/
            try {
                cssClass = cssClass || "chighlight";
                tag = tag || "span";
                var txt = "", flags = "g";
                if ($c.isRegExp(search) && !~search.source.indexOf("(")) {
                    txt = "(" + search.source + ")";
                    if (search.ignoreCase) { flags += "i"; }
                    if (search.multiline) { flags += "m"; }
                } else if (!~search.indexOf("(")) {
                    txt = "(" + search + ")";
                }
                return this.replace(_addFlags((new RegExp(txt)), flags), "<" + tag + " class=\"" + cssClass + "\">$1</" + tag + ">");
            } catch (e) {
                error("String.highlight", e);
            }
        }, true);
        _ext(String, 'indexOfAlt', function (value, func) {
            /*|{
                "info": "String class extension to find the index based on a regular expression",
                "category": "Array",
                "parameters":[
                    {"value": "(Mixed) value to find"},
                    {"func": "(Function) Callback function used to do the comparison"}],

                "overloads":[
                    {"parameters":[
                        {"regex": "(RegExp) Regular expression to check value against"}]},
                    {"parameters":[
                        {"regex": "(RegExp) Regular expression to check value against"},
                        {"pos": "(Int) Index offset to start"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOfAlt",
                "returnType": "(Integer)"
            }|*/
            return _indexOfAlt(this, value, func);
        }, true);
        _ext(String, 'ireplace_all', function (replace, subject) {
            /*|{
                "info": "String class extension to replace all substrings ignoring case",
                "category": "String",
                "parameters":[
                    {"replace": "(String) String to replace"},
                    {"subject": "(String) String to replace with"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.ireplace_all",
                "returnType": "(String)"
            }|*/
            try {
                return _replace_all(this, replace, subject, "gi")
            } catch (e) {
                error("String.ireplace_all", e);
            }
        }, true);
        _ext(String, 'isBlank', function () {
            /*|{
                "info": "String class extension to check if the string is empty",
                "category": "String",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.isBlank",
                "returnType": "(Bool)"
            }|*/
            try {
                return !this.length;
            } catch (e) {
                error("String.isBlank", e);
            }
        }, true);
        _ext(String, 'isCuid', function (msFormat) {
            /*|{
                "info": "String class extension to check if the string is a cuid",
                "category": "String",
                "parameters":[
                    {"msFormat": "(Bool) use microsoft format if true"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.isCuid",
                "returnType": "(Bool)"
            }|*/
            try {
                var pre = "", post = "", length = 36;
                msFormat && ((pre = "{") && (post = "}"), length += 2);
                return this.length == length && (new RegExp(pre + "[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}" + post)).test(this);
            } catch (e) {
                error("String.isCuid", e);
            }
        }, true);
        _ext(String, 'isValidEmail', function () {
            /*|{
                "info": "String class extension to check if string is a valid email",
                "category": "String",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.isValidEmail",
                "returnType": "(Bool)"
            }|*/
            try {
                if (!$c.isBlank(this) && !isNull(this)) {
                    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    return (reg.test(this));
                }
                return false;
            } catch (e) {
                error("String.isValidEmail", e);
            }
        }, true);
        _ext(String, 'lastIndexOfAlt', function (regex, pos) {
            /*|{
                "info": "String class extension to find the last index based on a regular expression",
                "category": "String",
                "parameters":[
                    {"regex": "(RegExp) Regular expression to check value against"}],

                "overloads":[
                    {"parameters":[
                        {"regex": "(RegExp) Regular expression to check value against"},
                        {"pos": "(Int) Max index to go up to in the search"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.lastIndexOfAlt",
                "returnType": "(Int)"
            }|*/
            try {
                regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
                pos = $c.isNull(pos, this.length);
                if (pos < 0) { pos = 0; }
                var str = this.substring(0, pos + 1),
                    lindex = -1,
                    next = 0,
                    result;

                while ((result = regex.exec(str)) != null) {
                    lindex = result.index;
                    regex.lastIndex = ++next;
                }
                return lindex;
            } catch (e) {
                error("String.lastIndexOfAlt", e);
            }
        }, true);
        _ext(String, 'ltrim', function (character) {
            /*|{
                "info": "String class extension to remove characters from the beginning of the string",
                "category": "String",
                "parameters":[
                     {"character": "(Char[]) Character to remove"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.ltrim",
                "returnType": "(String)"
            }|*/
            try {
                return _trim(this, 'l', character);
            } catch (e) {
                error("String.ltrim", e);
            }
        }, true);
        _ext(String, 'pluralize', function () {
            /*|{
                "info": "String class extension to do a best guess pluralization of the string",
                "category": "String",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.pluralize",
                "returnType": "(String)"
            }|*/
            try {
                var str = this;

                if (_irregularNouns[str]) {
                    str = _irregularNouns[str];
                } else if (str.slice(-1) in { "s": 1, "x": 1, "o": 1 } || str.slice(-2) in { "ch": 1, "sh": 1, "is": 1 }) {
                    str += "es";
                } else if (str.slice(-1) == "f") {
                    str = str.slice(0, -1) + "ves";
                } else if (str.slice(-2) == "fe") {
                    str = str.slice(0, -2) + "ves";
                } else if (str.slice(-1) == "y") {
                    str = str.slice(0, -1) + "ies";
                } else if (str.slice(-2) == "us") {
                    str = str.slice(0, -2) + "i";
                } else if (str.slice(-2) == "tion") {
                    str = str.slice(0, -2) + "tions";
                } else if (str.slice(-2) == "on") {
                    str = str.slice(0, -2) + "a";
                } else { // regular nouns
                    str += "s";
                }
                return str;
            } catch (e) {
                error('String.pluralize', e);
            }
        });
        _ext(String, 'replace_all', function (replace, subject) {
            /*|{
                "info": "String class extension to replace all substrings (case sensitive)",
                "category": "String",
                "parameters":[
                    {"replace": "(String) String to replace"},
                    {"subject": "(String) String to replace with"}],

                "overloads":[{
                    "parameters":[
                        {"replace": "(String[]) Array of string to replace"},
                        {"subject": "(String[]) Array of string to replace with"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.replace_all",
                "returnType": "(String)"
            }|*/
            try {
                return _replace_all(this, replace, subject, "g")
            } catch (e) {
                error("String.replace_all", e);
            }
        }, true);
        _ext(String, 'reverse', function () {
            /*|{
                "info": "String class extension to reverse the string",
                "category": "String",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.reverse",
                "returnType": "(String)"
            }|*/
            try {
                return this.split('').reverse().join('');
            } catch (e) {
                error("String.reverse", e);
            }
        }, true);
        _ext(String, 'rtrim', function (character) {
            /*|{
                "info": "String class extension to remove characters from the end of the string",
                "category": "String",
                "parameters":[
                    {"character": "(Char[]) Character to remove"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.rtrim",
                "returnType": "(String)"
            }|*/
            try {
                return _trim(this, 'r', character);
            } catch (e) {
                error("String.rtrim", e);
            }
        }, true);
        _ext(String, 'sanitize', function () {
            /*|{
                "info": "String class extension to remove potential XSS threats",
                "category": "String",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.sanitize",
                "returnType": "(String)"
            }|*/
            try {
                return this.replace(/&/gi, "&#38;").
                    replace(/#/gi, "&#35;").
                    replace(/%/gi, "&#37;").
                    replace(/;/gi, "&#59;").
                    replace(/\+/gi, "&#43;").
                    replace(/\-/gi, "&#45;").
                    replace(/\'/gi, "&#39;").
                    replace(/\\"/gi, "&#34;").
                    replace(/\(/gi, "&#40;").
                    replace(/\)/gi, "&#41;").
                    replace(/\</gi, "&#60;").
                    replace(/\>/gi, "&#62;");
            } catch (e) {
                error("String.sanitize", e);
            }
        }, true);
        _ext(String, 'singularize', function () {
            /*|{
                "info": "String class extension to do a best guess singularization of the string",
                "category": "String",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.singularize",
                "returnType": "(String)"
            }|*/
            try {
                var str = this.toString(), key;

                if (key = $c.keyOf(_irregularNouns, str)) {
                    str = key;
                } else if (str.slice(-3) == "ves") {
                    if (str[str.length - 4] in { a: 1, e: 1, i: 1, o: 1, u: 1 }) {
                        str = str.slice(0, -3) + "fe";
                    } else {
                        str = str.slice(0, -3) + "f";
                    }
                } else if (str.slice(-3) == "ies") {
                    str = str.slice(0, -3) + "y";
                } else if (str.slice(-1) == "a") {
                    str = str.slice(0, -1) + "on";
                } else if (str.slice(-1) == "i") {
                    str = str.slice(0, -1) + "us";
                } else if (str.slice(-3) in { "ses": 1, "xes": 1, "oes": 1 } || str.slice(-4) in { "ches": 1, "shes": 1, "ises": 1 }) {
                    str = str.slice(0, -2);
                } else { // regular nouns
                    str = str.slice(0, -1);
                }
                return str;
            } catch (e) {
                error('String.singularize', e);
            }
        });
        _ext(String, 'startItWith', function (starting) {
            /*|{
                "info": "String class extension to guarantee the original string starts with the passed string",
                "category": "String",
                "parameters":[
                    {"starting": "(String) String to start with"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.startItWith",
                "returnType": "(String)"
            }|*/
            try {
                if (this.slice(-(starting.length)) == starting) { return this; }
                return this + starting;
            } catch (e) {
                error('String.startItWith', e);
            }
        });
        _ext(String, 'startsWith', _startsWith);
        _ext(String, 'startsWithAny', _startsWith);
        _ext(String, 'strip', function (character) {
            /*|{
                "info": "String class extension to remove characters from the beginning and end of the string",
                "category": "String",
                "parameters":[
                    {"character": "(Char[]) Character to remove"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.strip",
                "returnType": "(String)"
            }|*/
            return _strip(this, character);
        }, true);
        _ext(String, 'substringBetween', function (start, end) {
            /*|{
                "info": "String class extension to substring by character instead of using indexes",
                "category": "String",
                "parameters":[
                    {"start": "(Char) Character to use for the starting index"},
                    {"end": "(Char) Character to use for the ending index"}],

                "overloads":[
                    {"parameters":[
                        {"start": "(Char) Character to use for the starting index"}]},

                    {"parameters":[
                        {"start": "(Char) Character to use for the starting index"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.substringBetween",
                "returnType": "(String)"
            }|*/
            try {
                if ($c.isNull(start)) { return $c.substringEndAt(this, end); }
                if ($c.isNull(end)) { return $c.substringStartFrom(this, start); }
                var si = this.indexOf(start), ei = this.indexOf(end);
                if (!~si) { si = 0; }
                if (!~ei) { ei = this.length; }
                return $c.cut(this, si, ei);
            } catch (e) {
                error('Object.substringBetween', e);
            }
        }, true);
        _ext(String, 'substringEndAt', function (end) {
            /*|{
                "info": "String class extension to substring by character instead of using indexes",
                "category": "String",
                "parameters":[
                    {"end": "(Char) Character to use for the ending index"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.substringEndAt",
                "returnType": "(String)"
            }|*/
            try {
                return this.substring(0, this.indexOf(end));
            } catch (e) {
                error('Object.substringEndAt', e);
            }
        }, true);
        _ext(String, 'substringStartFrom', function (start) {
            /*|{
                "info": "String class extension to substring by character instead of using indexes",
                "category": "String",
                "parameters":[
                    {"start": "(Char) Character to use for the starting index"}],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.substringStartFrom",
                "returnType": "(String)"
            }|*/
            try {
                return this.substring(this.indexOf(start));
            } catch (e) {
                error('Object.substringStartFrom', e);
            }
        }, true);
        _ext(String, 'toCurrencyNotation', _toCurrencyNotation, true);
        _ext(String, 'toDomElement', function () {
            /*|{
                "info": "String class extension to convert html string to DOM element",
                "category": "String",
                "parameters":[],

                "overloads":[],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.toDomElement",
                "returnType": "(HTMLElement)"
            }|*/
            try {
                var div = $d.createElement('div'), children;

                // ie special case when creating options
                if ($c.BROWSER.IE && $c.BROWSER.IE_VERSION < 10 && this.startsWith("<option")) {
                    div = $d.createElement('select');
                    var parts = this.match(/<option(.*?)>(.*?)<\/option>/i),
                        attrs = parts[1].trim(),
                        arrAttr = [],
                        value = '',
                        text = parts[2];

                    if (attrs) {
                        arrAttr = attrs.match(/.*?=['].*?[']|.*?=["].*?["]/g).map(function (attr) {
                            var temp = attr.replace(/\s*(.*?)\s*?=\s*(.*?)\s*/, '$1=$2').split('=');
                            if (temp[0] == 'value') {
                                value = temp[1].strip(['"', '\'']);
                            }
                            return temp;
                        });
                    }
                    div.options[0] = new Option(text, value);
                    for (var i = 0, len = arrAttr.length; i < len; i++) {
                        div.childNodes[0].setAttribute(arrAttr[i][0], arrAttr[i][1]);
                    }
                    return div.childNodes[0];

                }
                div.innerHTML = this;
                children = div.childNodes;
                if (children.length == 1) {
                    return children[0];
                } else if (children.length == 0) {
                    return false;
                }
                return children;
            } catch (e) {
                error("String.toDomElement", e);
            }
        }, true);
        _ext(String, 'toDateTime', function (options) {
            /*|{
                "info": "String class extension to convert string to datetime",
                "category": "String",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                    {"options": "(Object) specs with optional properties:<br />(Bool) gmt<br />(Int) offset<br />(String) format"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.toDateTime",
                "returnType": "(Mixed)"
            }|*/
            try {
                /*
                 *  options properties:
                 *  gmt:true - convert to GMT
                 *  offset:offset from GMT
                 *  format:format used in Datetime.format
                 **/
                options = options || {};
                var strDatetime = this;
                var dt = new Date(strDatetime);
                if (/\d\d\d\d-\d\d-\d\d$/.test(strDatetime)) {
                    dt = new Date(this.replace("-", "/").replace("-", "/"));
                }
                if (!dt.getDate() && _isString(strDatetime)) {
                    dt = new Date(strDatetime.replace(/(am|pm)/i, ' $1'));
                }
                if (!dt.getDate()) {
                    var parts = [],
                        dtstring = this[0] == "(" ? this.substring(1, this.length - 1) : this,
                        chars = ["\\.", "\\/", "-", "\\s*?"], c, i = 0;

                    while (c = chars[i++] && !dt.getDate()) {
                        // using format m(m).d(d).yy(yy) or d(d).m(m).yy(yy) or yy(yy).m(m).d(d) or yy(yy).d(d).m(m)
                        // using format m(m)/d(d)/yy(yy) or d(d)/m(m)/yy(yy) or yy(yy)/m(m)/d(d) or yy(yy)/d(d)/m(m)
                        // using format m(m)-d(d)-yy(yy) or d(d)-m(m)-yy(yy) or yy(yy)-m(m)-d(d) or yy(yy)-d(d)-m(m)
                        var c = chars[i - 1],
                            regex = new RegExp("(\\d{1,4})" + c + "\\s*?(\\d{1,2})" + c + "\\s*?(\\d{2,4})(.*)");
                        if ((parts = dtstring.match(regex)) && parts.length > 1) {
                            // assume year is first
                            if (parts[1].length == 4) {
                                parts[0] = parts[1];
                                parts[1] = parts[2];
                                parts[3] = parts[0];
                            }
                            // assume month is first
                            if (parseInt(parts[1]) >= 1 && parseInt(parts[1]) <= 12) {
                                dt = new Date(parts[1] + "/" + parts[2] + "/" + parts[3] + parts[4]);
                            } else { // day is first
                                dt = new Date(parts[2] + "/" + parts[1] + "/" + parts[3] + parts[4]);
                            }
                        }
                        if (!dt.getDate() && (parts = dtstring.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})(.*)/)) && parts.length > 1) {
                            dt = new Date(parts[2] + "/" + parts[1] + "/" + parts[3] + parts[4]);
                        } else if (!dt.getDate() && (parts = dtstring.match(/(\d{1,2})-([a-zA-Z]{3,9})-(\d{2,4})(.*)/)) && parts.length > 1) {
                            dt = new Date(dtstring.replace("-", " "));
                        }
                    }
                }
                if (options.gmt) {
                    var offset = isNull(options.offset, _getGMTOffset.call(!dt.getDate() ? new Date() : dt));
                    dt = new Date(dt.valueOf() - offset * 60 * 60000);
                }
                return options.format ? $c.format(dt, options.format) : dt;
            } catch (e) {
                error("String.toDateTime", e);
            }
        }, true);
        _ext(String, 'toObject', function (assignmentChar, delimiter) {
            /*|{
                "info": "String class extension to convert to JSON",
                "category": "String",
                "parameters":[],

                "overloads":[
                    {"parameters":[
                        {"assignmentChar": "(Char) Character to use as assignment delimiter. Defaults to '='."}]},

                    {"parameters":[
                        {"assignmentChar": "(Char) Character to use as assignment delimiter. Defaults to '&'."},
                        {"delimiter": "(Char) Character to use as pair delimiter"}]}],

                "url": "http://www.craydent.com/library/1.9.3/docs#string.toObject",
                "returnType": "(Object)"
            }|*/
            try {
                assignmentChar = assignmentChar || "=";
                delimiter = delimiter || "&";
                var rtn = {}, kv_pairs = this.split(delimiter);
                for (var i = 0, len = kv_pairs.length; i < len; i++) {
                    var kv = kv_pairs[i].split(assignmentChar);
                    rtn[kv[0]] = kv[1];
                }
                return rtn;
            } catch (e) {
                error("String.toObject", e);
            }
        }, true);
        _ext(String, 'trim', __universal_trim, true);

        function JSZip(compression) {
            // default : no compression
            this.compression = (compression || "STORE").toUpperCase();
            this.files = [];

            // Where we are in the hierarchy
            this.root = "";

            // Default properties for a new file
            this.d = {
                base64: false,
                binary: false,
                dir: false,
                date: null
            };

            if (!JSZip.compressions[this.compression]) {
                throw compression + " is not a valid compression method !";
            }
        }
        var JSZipBase64 = function () {
            // private property
            var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            return {
                // public method for encoding
                encode: function (input, utf8) {
                    var output = "",
                        chr1, chr2, chr3, enc1, enc2, enc3, enc4,
                        i = 0;

                    while (i < input.length) {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
                        output = output +
                            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
                    }
                    return output;
                },
                // public method for decoding

                decode: function (input, utf8) {
                    var output = "",
                        chr1, chr2, chr3,
                        enc1, enc2, enc3, enc4,
                        i = 0;

                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                    while (i < input.length) {
                        enc1 = _keyStr.indexOf(input.charAt(i++));
                        enc2 = _keyStr.indexOf(input.charAt(i++));
                        enc3 = _keyStr.indexOf(input.charAt(i++));
                        enc4 = _keyStr.indexOf(input.charAt(i++));

                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;

                        output = output + String.fromCharCode(chr1);

                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }
                    }
                    return output;
                }
            };
        }();
        JSZip.prototype.add = function (name, data, o) {
            o = o || {};
            name = this.root + name;
            if (o.base64 === true && o.binary == null) o.binary = true;
            for (var opt in this.d) {
                o[opt] = o[opt] || this.d[opt];
            }

            // date
            // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
            // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
            // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

            o.date = o.date || new Date();
            var dosTime, dosDate;

            dosTime = o.date.getHours();
            dosTime = dosTime << 6;
            dosTime = dosTime | o.date.getMinutes();
            dosTime = dosTime << 5;
            dosTime = dosTime | o.date.getSeconds() / 2;

            dosDate = o.date.getFullYear() - 1980;
            dosDate = dosDate << 4;
            dosDate = dosDate | (o.date.getMonth() + 1);
            dosDate = dosDate << 5;
            dosDate = dosDate | o.date.getDate();

            if (o.base64 === true) data = JSZipBase64.decode(data);
            // decode UTF-8 strings if we are dealing with text data
            if (o.binary === false) data = this.utf8encode(data);


            var compression = JSZip.compressions[this.compression];
            var compressedData = compression.compress(data);

            var header = "";

            // version needed to extract
            header += "\x0A\x00";
            // general purpose bit flag
            header += "\x00\x00";
            // compression method
            header += compression.magic;
            // last mod file time
            header += this.decToHex(dosTime, 2);
            // last mod file date
            header += this.decToHex(dosDate, 2);
            // crc-32
            header += this.decToHex(this.crc32(data), 4);
            // compressed size
            header += this.decToHex(compressedData.length, 4);
            // uncompressed size
            header += this.decToHex(data.length, 4);
            // file name length
            header += this.decToHex(name.length, 2);
            // extra field length
            header += "\x00\x00";

            // file name

            this.files[name] = {
                header: header,
                data: compressedData,
                dir: o.dir
            };

            return this;
        };
        JSZip.prototype.clone = function () {
            var newObj = new JSZip();
            for (var i in this) {
                if (typeof this[i] !== "function") {
                    newObj[i] = this[i];

                }
            }

            return newObj;
        };
        JSZip.compressions = {
            "STORE": {
                magic: "\x00\x00",
                compress: function (content) {
                    return content; // no compression
                }
            }
        };
        JSZip.prototype.crc32 = function (str, crc) {

            if (str === "") return "\x00\x00\x00\x00";

            var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

            if (typeof (crc) == "undefined") {
                crc = 0;
            }
            var x = 0;
            var y = 0;

            crc = crc ^ (-1);
            for (var i = 0, iTop = str.length; i < iTop; i++) {
                y = (crc ^ str.charCodeAt(i)) & 0xFF;
                x = "0x" + table.substr(y * 9, 8);
                crc = (crc >>> 8) ^ x;
            }

            return crc ^ (-1);

        };
        JSZip.prototype.decToHex = function (dec, bytes) {
            var hex = "";
            for (var i = 0; i < bytes; i++) {
                hex += String.fromCharCode(dec & 0xff);
                dec = dec >>> 8;
            }
            return hex;
        };
        JSZip.prototype.find = function (needle) {
            var result = [], re;
            if (typeof needle === "string") {
                re = new RegExp("^" + needle + "$");
            }
            else {
                re = needle;
            }

            for (var filename in this.files) {
                if (re.test(filename)) {
                    var file = this.files[filename];
                    result.push({
                        name: filename,
                        data: file.data,
                        dir: !!file.dir
                    });
                }
            }

            return result;
        };
        JSZip.prototype.folder = function (name) {
            // Check the name ends with a /
            if (name.substr(-1) != "/") name += "/";

            // Does this folder already exist?
            if (typeof this.files[name] === "undefined") this.add(name, '', {
                dir: true
            });

            // Allow chaining by returning a new object with this folder as the root
            var ret = this.clone();
            ret.root = this.root + name;
            return ret;
        };
        JSZip.prototype.generate = function (asBytes) {
            asBytes = asBytes || false;

            // The central directory, and files data
            var directory = [], files = [], fileOffset = 0;

            for (var name in this.files) {
                if (!this.files.hasOwnProperty(name)) {
                    continue;
                }

                var fileRecord = "", dirRecord = "";
                fileRecord = "\x50\x4b\x03\x04" + this.files[name].header + name + this.files[name].data;

                dirRecord = "\x50\x4b\x01\x02" +
                    // version made by (00: DOS)
                    "\x14\x00" +
                    // file header (common to file and central directory)
                    this.files[name].header +
                    // file comment length
                    "\x00\x00" +
                    // disk number start
                    "\x00\x00" +
                    // internal file attributes TO DO
                    "\x00\x00" +
                    // external file attributes
                    (this.files[name].dir === true ? "\x10\x00\x00\x00" : "\x00\x00\x00\x00") +
                    // relative offset of local header
                    this.decToHex(fileOffset, 4) +
                    // file name
                    name;

                fileOffset += fileRecord.length;

                files.push(fileRecord);
                directory.push(dirRecord);
            }

            var fileData = files.join("");
            var dirData = directory.join("");

            var dirEnd = "";

            // end of central dir signature
            dirEnd = "\x50\x4b\x05\x06" +
                // number of this disk
                "\x00\x00" +
                // number of the disk with the start of the central directory
                "\x00\x00" +
                // total number of entries in the central directory on this disk
                this.decToHex(files.length, 2) +
                // total number of entries in the central directory
                this.decToHex(files.length, 2) +
                // size of the central directory   4 bytes
                this.decToHex(dirData.length, 4) +
                // offset of start of central directory with respect to the starting disk number
                this.decToHex(fileData.length, 4) +
                // .ZIP file comment length
                "\x00\x00";

            var zip = fileData + dirData + dirEnd;
            return (asBytes) ? zip : JSZipBase64.encode(zip);

        };
        JSZip.prototype.remove = function (name) {
            var file = this.files[name];
            if (!file) {
                // Look for any folders
                if (name.substr(-1) != "/") name += "/";
                file = this.files[name];
            }

            if (file) {
                if (name.match("/") === null) {
                    // file
                    delete this.files[name];
                }
                else {
                    // folder
                    var kids = this.find(new RegExp("^" + name));
                    for (var i = 0; i < kids.length; i++) {
                        if (kids[i].name == name) {
                            // Delete this folder
                            delete this.files[name];
                        }
                        else {
                            // Remove a child of this folder
                            this.remove(kids[i].name);
                        }
                    }
                }
            }

            return this;
        };
        JSZip.prototype.utf8encode = function (input) {
            input = encodeURIComponent(input);

            input = input.replace(/%.{2,2}/g, function (m) {

                var hex = m.substring(1);

                return String.fromCharCode(parseInt(hex, 16));

            });
            return input;

        };

        if (!window.JSON) {
            JSON = {};
        }

        (function () {
            //    'use strict';

            function f(n) {
                // Format integers to have at least two digits.
                return n < 10 ? '0' + n : n;
            }

            if (typeof Date.prototype.toJSON !== 'function') {

                Date.prototype.toJSON = function (key) {

                    return isFinite(this.valueOf())
                        ? this.getUTCFullYear() + '-' +
                        f(this.getUTCMonth() + 1) + '-' +
                        f(this.getUTCDate()) + 'T' +
                        f(this.getUTCHours()) + ':' +
                        f(this.getUTCMinutes()) + ':' +
                        f(this.getUTCSeconds()) + 'Z'
                        : null;
                };

                String.prototype.toJSON =
                    Number.prototype.toJSON =
                    Boolean.prototype.toJSON = function (key) {
                        return this.valueOf();
                    };
            }

            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap,
                indent,
                meta = {    // table of character substitutions
                    '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"': '\\"',
                    '\\': '\\\\'
                },
                rep;


            function quote(string) {

                // If the string contains no control characters, no quote characters, and no
                // backslash characters, then we can safely slap some quotes around it.
                // Otherwise we must also replace the offending characters with safe escape
                // sequences.

                escapable.lastIndex = 0;
                return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string'
                        ? c
                        : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' : '"' + string + '"';
            }


            function str(key, holder) {

                // Produce a string from holder[key].

                var i,          // The loop counter.
                    k,          // The member key.
                    v,          // The member value.
                    length,
                    mind = gap,
                    partial,
                    value = holder[key];

                // If the value has a toJSON method, call it to obtain a replacement value.

                if (value && typeof value === 'object' &&
                    typeof value.toJSON === 'function') {
                    value = value.toJSON(key);
                }

                // If we were called with a replacer function, then call the replacer to
                // obtain a replacement value.

                if (typeof rep === 'function') {
                    value = rep.call(holder, key, value);
                }

                // What happens next depends on the value's type.

                switch (typeof value) {
                    case 'string':
                        return quote(value);

                    case 'number':

                        // JSON numbers must be finite. Encode non-finite numbers as null.

                        return isFinite(value) ? String(value) : 'null';

                    case 'boolean':
                    case 'null':

                        // If the value is a boolean or null, convert it to a string. Note:
                        // typeof null does not produce 'null'. The case is included here in
                        // the remote chance that this gets fixed someday.

                        return String(value);

                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.

                    case 'object':

                        // Due to a specification blunder in ECMAScript, typeof null is 'object',
                        // so watch out for that case.

                        if (!value) {
                            return 'null';
                        }

                        // Make an array to hold the partial results of stringifying this object value.

                        gap += indent;
                        partial = [];

                        // Is the value an array?

                        if (Object.prototype.toString.apply(value) === '[object Array]') {

                            // The value is an array. Stringify every element. Use null as a placeholder
                            // for non-JSON values.

                            length = value.length;
                            for (i = 0; i < length; i += 1) {
                                partial[i] = str(i, value) || 'null';
                            }

                            // Join all of the elements together, separated with commas, and wrap them in
                            // brackets.

                            v = partial.length === 0
                                ? '[]'
                                : gap
                                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                                    : '[' + partial.join(',') + ']';
                            gap = mind;
                            return v;
                        }

                        // If the replacer is an array, use it to select the members to be stringified.

                        if (rep && typeof rep === 'object') {
                            length = rep.length;
                            for (i = 0; i < length; i += 1) {
                                if (typeof rep[i] === 'string') {
                                    k = rep[i];
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                    }
                                }
                            }
                        } else {

                            // Otherwise, iterate through all of the keys in the object.

                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                    }
                                }
                            }
                        }

                        // Join all of the member texts together, separated with commas,
                        // and wrap them in braces.

                        v = partial.length === 0
                            ? '{}'
                            : gap
                                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                                : '{' + partial.join(',') + '}';
                        gap = mind;
                        return v;
                }
            }

            // If the JSON object does not yet have a stringify method, give it one.

            if (typeof JSON.stringify !== 'function') {
                JSON.stringify = function (value, replacer, space) {

                    // The stringify method takes a value and an optional replacer, and an optional
                    // space parameter, and returns a JSON text. The replacer can be a function
                    // that can replace values, or an array of strings that will select the keys.
                    // A default replacer method can be provided. Use of the space parameter can
                    // produce text that is more easily readable.

                    var i;
                    gap = '';
                    indent = '';

                    // If the space parameter is a number, make an indent string containing that
                    // many spaces.

                    if (typeof space === 'number') {
                        for (i = 0; i < space; i += 1) {
                            indent += ' ';
                        }

                        // If the space parameter is a string, it will be used as the indent string.

                    } else if (typeof space === 'string') {
                        indent = space;
                    }

                    // If there is a replacer, it must be a function or an array.
                    // Otherwise, throw an error.

                    rep = replacer;
                    if (replacer && typeof replacer !== 'function' && (typeof replacer === 'string' && replacer.trim()) &&
                        (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                        throw new Error('JSON.stringify');
                    }

                    // Make a fake root object containing our value under the key of ''.
                    // Return the result of stringifying the value.

                    return str('', {
                        '': value
                    });
                };
            }


            // If the JSON object does not yet have a parse method, give it one.

            if (typeof JSON.parse !== 'function') {
                JSON.parse = function (text, reviver) {

                    // The parse method takes a text and an optional reviver function, and returns
                    // a JavaScript value if the text is a valid JSON text.

                    var j;

                    function walk(holder, key) {

                        // The walk method is used to recursively walk the resulting structure so
                        // that modifications can be made.

                        var k, v, value = holder[key];
                        if (value && typeof value === 'object') {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = walk(value, k);
                                    if (v !== undefined) {
                                        value[k] = v;
                                    } else {
                                        delete value[k];
                                    }
                                }
                            }
                        }
                        return reviver.call(holder, key, value);
                    }


                    // Parsing happens in four stages. In the first stage, we replace certain
                    // Unicode characters with escape sequences. JavaScript handles many characters
                    // incorrectly, either silently deleting them, or treating them as line endings.

                    text = String(text);
                    cx.lastIndex = 0;
                    if (cx.test(text)) {
                        text = text.replace(cx, function (a) {
                            return '\\u' +
                                ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                        });
                    }

                    // In the second stage, we run the text against regular expressions that look
                    // for non-JSON patterns. We are especially concerned with '()' and 'new'
                    // because they can cause invocation, and '=' because it can cause mutation.
                    // But just to be safe, we want to reject all unexpected forms.

                    // We split the second stage into 4 regexp operations in order to work around
                    // crippling inefficiencies in IE's and Safari's regexp engines. First we
                    // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
                    // replace all simple value tokens with ']' characters. Third, we delete all
                    // open brackets that follow a colon or comma or that begin the text. Finally,
                    // we look to see that the remaining characters are only whitespace or ']' or
                    // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

                    if (/^[\],:{}\s]*$/
                        .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                        // In the third stage we use the eval function to compile the text into a
                        // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                        // in JavaScript: it can begin a block or an object literal. We wrap the text
                        // in parens to eliminate the ambiguity.

                        j = eval('(' + text + ')');

                        // In the optional fourth stage, we recursively walk the new structure, passing
                        // each name/value pair to a reviver function for possible transformation.

                        return typeof reviver === 'function'
                            ? walk({
                                '': j
                            }, '')
                            : j;
                    }

                    // If the text is not JSON parseable, then a SyntaxError is thrown.

                    throw new SyntaxError('JSON.parse');
                };
            }

        }());
    }
})();