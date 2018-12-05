/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
//TODO: remove all $c refs
var $s = require('./dependencies/common')(),
    $c = $s.$c,
    ext = $s._ext,
    error = $s.error,
    _irregularNouns = {
        "addendum":"addenda",
        "alga":"algae",
        "alumna":"alumnae",
        "apparatus":"apparatuses",
        "appendix":"appendices",
        "bacillus":"bacilli",
        "bacterium":"bacteria",
        "beau":"beaux",
        "bison":"bison",
        "bureau":"bureaus",
        "child":"children",
        "corps":"corps",
        "corpus":"corpora",
        "curriculum":"curricula",
        "datum":"data",
        "deer":"deer",
        "die":"dice",
        "diagnosis":"diagnoses",
        "erratum":"errata",
        "fireman":"firemen",
        "focus":"focuses",
        "foot":"feet",
        "genus":"genera",
        "goose":"geese",
        "index":"indices",
        "louse":"lice",
        "man":"men",
        "matrix":"matrices",
        "means":"means",
        "medium":"media",
        "memo":"memos",
        "memorandum":"memoranda",
        "moose":"moose",
        "mouse":"mice",
        "nebula":"nebulae",
        "ovum":"ova",
        "ox":"oxen",
        "person":"people",
        "radius":"radii",
        "series":"series",
        "sheep":"sheep",
        "scissors":"scissors",
        "species":"species",
        "stratum":"strata",
        "syllabus":"syllabi",
        "tableau":"tableaux",
        "that":"those",
        "this":"these",
        "tooth":"teeth",
        "vertebra":"vertebrae",
        "vita":"vitae",
        "woman":"women",
        "zero":"zeros"
    };

if (!$c.MODULES_LOADED[$s.info.name]) {
    $s.__log_module();
    $s.scope.eval = function (str) { return eval(str); };

    require($s.dir + 'addFlags')($s);
    require($s.dir + 'contains')($s);
    require($s.dir + 'count')($s);
    require($s.dir + 'cut')($s);
    require($s.dir + 'date')($s);
    require($s.dir + 'getValue')($s);
    require($s.dir + 'keyOf')($s);
    require($s.dir + 'startsWithAny')($s);
    require($s.dir + 'toCurrencyNotation')($s);
    require($s.dir + 'universal_trim')($s);

    function endsWith () {
        /*|{
            "info": "String class extension to check if the string ends with the given string",
            "category": "String",
            "parameters":[
                {"...infinite": "(String) any number of arguments can be passed"}],

            "overloads":[
                {"parameters":[
                    {"arr": "(String[]) An array of strings to check"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.endsWith",
            "returnType": "(Bool|String)"
        }|*/
        try {
            var str = this || "";
            var args = arguments;
            if (arguments.length < 3 && ($s.isArray(arguments[0]) || $s.isArray(arguments[1]))) {
                args = arguments[1] || arguments[0];
            }
            for (var i = typeof craydent_ctx != "undefined" ? 1 : 0, len = args.length; i < len; i++) {
                var arg = args[i];
                if (arg == str.slice(-arg.length)) { return arg; }
            }
            return false;
        } catch (e) {
            error('String.endsWith', e);
        }
    }
    function startsWith () {
        /*|{
            "info": "String class extension to check if the string starts with the given string",
            "category": "String",
            "parameters":[
                {"...infinite": "(String) any number of String arguments can be passed"}],

            "overloads":[
                {"parameters":[
                    {"arr": "(String[]) An array of strings to check"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.startsWith",
            "returnType": "(Bool|String)"
        }|*/
        try {
            var args = [this];
            for (var i = typeof craydent_ctx != "undefined" ? 1 : 0, len = arguments.length; i < len; i++) {
                args.push(arguments[i]);
            }
            return $s.startsWithAny.apply($s, args);
        } catch (e) {
            error('String.startsWith', e);
        }
    }


    ext(String, 'acronymize', function (capsOnly, delimiter) {
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
                    {"delimiter": "(String|RegExp) Character or RegExp pattern that delimits the string."}]},

                {"parameters":[
                    {"match": "(RegExp) Pattern to match to qualify the Acronym."},
                    {"delimiter": "(String|RegExp) Character or RegExp pattern that delimits the string."}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.acronymize",
            "returnType": "(String)"
        }|*/
        try {
            delimiter = delimiter || " ";
            if ($s.isBoolean(capsOnly)) {
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
    ext(String, 'capitalize', function (pos, everyWord) {
        /*|{
            "info": "String class extension to capitalize parts of the string",
            "category": "String",
            "parameters":[
                {"pos": "(Int|Int[]) Index of the string to capitalize"},
                {"everyWord?": "(Bool) Flag to capital every word"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.capitalize",
            "returnType": "(String)"
        }|*/
        try {
            return $s.capitalize(this, pos, everyWord);
        } catch (e) {
            error('Object.capitalize', e);
        }
    }, true);
    ext(String, "contains", function(val, func){
        /*|{
            "info": "Object class extension to check if value exists",
            "category": "String|Object",
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
                    {"arr": "(Array<T>) Array of values to return first matching value"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
            "typeParameter": "<T, TValue>",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.contains(this, val, func);
        } catch (e) {
            error('Object.contains', e);
        }
    }, true);
    ext(String, 'convertUTCDate', function (delimiter) 	{
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
            var pattern = new RegExp( "(\\d{4})" + delimiter + "(\\d{2})" + delimiter + "(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})" );
            var parts = dateAsString.match( pattern );

            return parts ? parts[2] + "/" + parts[3] + "/" + parts[1] + " " + parts[4] + ":" + parts[5] + ":" + parts [6] : dateAsString;
        } catch (e) {
            error('String.convertUTCDate', e);
        }
    }, true);
    ext(String, "count", function(option){
        /*|{
            "info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
            "category": "String|Object",
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"option": "(WhereCondition) Query used in Array.where when counting elements in an Array"}]},

                {"parameters":[
                    {"option": "(String) Word or phrase to count in the String"}]},

                {"parameters":[
                    {"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.count",
            "returnType": "(Int)"
        }|*/
        try {
            return $s.count(this, option);
        } catch (e) {
            error('Object.count', e);
        }
    }, true);
    ext(String, 'cut', function (si, ei, replacement) {
        /*|{
            "info": "String class extension to remove between the provided indexes",
            "category": "String",
            "parameters":[
                {"start_index": "(Integer) Start index to cut"},
                {"end_index": "(Integer) End index to cut"},
                {"replacement?": "(String) String to put in place of the cut"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.cut",
            "returnType": "(String)"
        }|*/
        try {
            return $s.cut(this, si, ei, replacement);
        } catch (e) {
            error('Object.cut', e);
        }
    }, true);
    ext(String, 'ellipsis', function (before, after) {
        /*|{
            "info": "String class extension to shorten by ellipsis",
            "category": "String",
            "parameters":[
                {"before": "(Int) Number of characters to use before using ellipsis"},
                {"after?": "(Int) Number of characters to use after the ellipsis"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.ellipsis",
            "returnType": "(String)"
        }|*/
        try {
            after = after || 0;
            if (before + after > this.length) { return this; }
            return $c.cut(this,before, -1*after, "...");
        } catch (e) {
            error('String.ellipsis', e);
        }
    });
    ext(String, 'endItWith', function (ending) {
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
    ext(String, 'endsWith', endsWith);
    ext(String, 'endsWithAny', endsWith);
    ext(String, "equals", function (compare, props){
        /*|{
            "info": "Object class extension to check if object values are equal",
            "category": "String|Object",
            "parameters":[
                {"compare": "(any) Object to compare against"},
                {"props?": "(String[]) Array of property values to compare against"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.equals(this, compare, props);
        } catch (e) {
            error('Object.equals', e);
        }
    }, true);
    ext(String, "getValue" ,function (args, dflt) {
        /*|{
            "info": "Object class extension to retrieve value of an object property",
            "category": "String|Object",
            "parameters":[],

            "overloads":[
                {"parameters":[
                    {"dflt": "(any) Default value to return if context is not a function"}]},

                {"parameters":[
                    {"args": "(any[]) An array of arguments to pass to context when it is a function"},
                    {"dflt": "(any) Default value to return if context is not a function"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#object.getValue",
            "returnType": "(any)"
        }|*/
        try {
            return $s.getValue(this, args, dflt);
        } catch (e) {
            error('Object.getValue', e);
        }
    }, true);
    ext(String, 'highlight', function (search, cssClass, tag) {
        /*|{
            "info": "String class extension to surround search words with the given tag(default span) and class (default chighlight)",
            "category": "String",
            "parameters":[
                {"search": "(String|RegExp) String or Regular expression to search"},
                {"cssClass?": "(String) Class to add for highlighting"},
                {"tag?": "(String) Tag to use to surround the search"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.highlight",
            "returnType": "(String)"
        }|*/
        try {
            cssClass = cssClass || "chighlight";
            tag = tag || "span";
            var txt = "", flags = "g";
            if ($s.isRegExp(search) && !~search.source.indexOf("(")) {
                txt = "(" + search.source + ")";
                if (search.ignoreCase) { flags += "i"; }
                if (search.multiline) { flags += "m"; }
            } else if (!~search.indexOf("(")) {
                txt = "(" + search + ")";
            }
            return this.replace($s.addFlags((new RegExp(txt)),flags),"<" + tag + " class=\"" + cssClass + "\">$1</" + tag + ">");
        } catch (e) {
            error("String.highlight", e);
        }
    }, true);
    ext(String, 'indexOfAlt', function (value, option) {
        /*|{
            "info": "Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression",
            "category": "String|Array",
            "parameters":[
                {"value": "(any) value to find"},
                {"func": "(ArrayIterator<T, TResult>) Callback function used to do the comparison"}],

            "overloads":[
                {"parameters":[
                    {"regex": "(RegExp) Regular expression to check value against"},
                    {"pos?": "(Int) Index offset to start"}]}],

            "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOfAlt",
            "typeParameter": "<T, TResult>",
            "returnType": "(Integer)"
        }|*/
        try {
            return $s.indexOfAlt(this, value, option);
        } catch (e) {
            error('Object.indexOfAlt', e);
        }
    }, true);
    ext(String, 'ireplace_all', function(replace, subject) {
        /*|{
            "info": "String class extension to replace all substrings ignoring case",
            "category": "String",
            "parameters":[
                {"replace": "(String|String[]) String or Array of strings to replace"},
                {"subject": "(String|String[]) String or Array of strings to replace with"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.ireplace_all",
            "returnType": "(String)"
        }|*/
        try {
            return $s.replace_all(this, replace, subject, "gi")
        } catch (e) {
            error("String.ireplace_all", e);
        }
    }, true);
    ext(String, 'isBlank', function () {
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
    ext(String, 'isCuid', function (msFormat) {
        /*|{
            "info": "String class extension to check if the string is a cuid",
            "category": "String",
            "parameters":[
                {"msFormat?": "(Bool) use microsoft format if true"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.isCuid",
            "returnType": "(Bool)"
        }|*/
        try {
            var pre = "", post = "", length = 36;
            msFormat && ((pre = "{") && (post = "}"),length += 2);
            return this.length == length && (new RegExp(pre+"[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"+post)).test(this);
        } catch (e) {
            error("String.isCuid", e);
        }
    }, true);
    ext(String, 'isValidEmail', function () {
        /*|{
            "info": "String class extension to check if string is a valid email",
            "category": "String",
            "parameters":[],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.isValidEmail",
            "returnType": "(Bool)"
        }|*/
        try {
            if (!$c.isBlank(this) && !$s.isNull(this)) {
                var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                return (reg.test(this));
            }
            return false;
        } catch (e) {
            error("String.isValidEmail", e);
        }
    }, true);
    ext(String, 'lastIndexOfAlt', function(regex, pos) {
        /*|{
            "info": "String class extension to find the last index based on a regular expression",
            "category": "String",
            "parameters":[
                {"regex": "(RegExp) Regular expression to check value against"},
                {"pos?": "(Int) Max index to go up to in the search"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.lastIndexOfAlt",
            "returnType": "(Int)"
        }|*/
        try {
            regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));
            pos = $s.isNull(pos, this.length);
            if(pos < 0) { pos = 0; }
            var str = this.substring(0, pos + 1),
                lindex = -1,
                next = 0,
                result;

            while((result = regex.exec(str)) != null) {
                lindex = result.index;
                regex.lastIndex = ++next;
            }
            return lindex;
        } catch (e) {
            error("String.lastIndexOfAlt", e);
        }
    }, true);
    ext(String, 'ltrim', function (character) {
        /*|{
            "info": "String class extension to remove characters from the beginning of the string",
            "category": "String",
            "parameters":[
                {"character?": "(Char[]) Character to remove"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.ltrim",
            "returnType": "(String)"
        }|*/
        try {
            return $s._general_trim(this, 'l', character);
        } catch (e) {
            error("String.ltrim", e);
        }
    }, true);
    ext(String, 'pluralize', function () {
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
            } else if (str.slice(-1) in {"s":1,"x":1,"o":1} || str.slice(-2) in {"ch":1,"sh":1,"is":1}) {
                str += "es";
            } else if (str.slice(-1) == "f") {
                str = str.slice(0,-1) + "ves";
            } else if (str.slice(-2) == "fe") {
                str = str.slice(0,-2) + "ves";
            } else if (str.slice(-1) == "y") {
                str = str.slice(0,-1) + "ies";
            } else if (str.slice(-2) == "us") {
                str = str.slice(0,-2) + "i";
            } else if (str.slice(-2) == "tion") {
                str = str.slice(0,-2) + "tions";
            } else if (str.slice(-2) == "on") {
                str = str.slice(0,-2) + "a";
            } else { // regular nouns
                str += "s";
            }
            return str;
        } catch (e) {
            error('String.pluralize', e);
        }
    });
    ext(String, 'replace_all', function(replace, subject) {
        /*|{
            "info": "String class extension to replace all substrings (case sensitive)",
            "category": "String",
            "parameters":[
                {"replace": "(String|String[]) String or Array of strings to replace"},
                {"subject": "(String|String[]) String or Array of strings to replace with"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.replace_all",
            "returnType": "(String)"
        }|*/
        try {
            return $s.replace_all(this, replace, subject, "g")
        } catch (e) {
            error("String.replace_all", e);
        }
    }, true);
    ext(String, 'reverse', function () {
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
    ext(String, 'rtrim', function (character) {
        /*|{
            "info": "String class extension to remove characters from the end of the string",
            "category": "String",
            "parameters":[
                {"character?": "(Char[]) Character to remove"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.rtrim",
            "returnType": "(String)"
        }|*/
        try {
            return $s._general_trim(this, 'r', character);
        } catch (e) {
            error("String.rtrim", e);
        }
    }, true);
    ext(String, 'sanitize', function () {
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
    ext(String, 'singularize', function () {
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

            if (key = $s.keyOf(_irregularNouns, str)) {
                str = key;
            } else if (str.slice(-3) == "ves") {
                if (str[str.length - 4] in {a:1,e:1,i:1,o:1,u:1}) {
                    str = str.slice(0,-3) + "fe";
                } else {
                    str = str.slice(0,-3) + "f";
                }
            } else if (str.slice(-3) == "ies") {
                str = str.slice(0,-3) + "y";
            } else if (str.slice(-1) == "a") {
                str = str.slice(0,-1) + "on";
            } else if (str.slice(-1) == "i") {
                str = str.slice(0,-1) + "us";
            } else if (str.slice(-3) in {"ses":1,"xes":1,"oes":1} || str.slice(-4) in {"ches":1,"shes":1,"ises":1}) {
                str = str.slice(0,-2);
            } else { // regular nouns
                str = str.slice(0,-1);
            }
            return str;
        } catch (e) {
            error('String.singularize', e);
        }
    });
    ext(String, 'startItWith', function (starting) {
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
    ext(String, 'startsWith', startsWith);
    ext(String, 'startsWithAny', startsWith);
    ext(String, 'strip', function(character) {
        /*|{
            "info": "String class extension to remove characters from the beginning and end of the string",
            "category": "String",
            "parameters":[
                {"character?": "(Char[]) Character to remove"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.strip",
            "returnType": "(String)"
        }|*/
        try {
            return $s.strip(this, character);
        } catch (e) {
            error('Object.strip', e);
        }
    }, true);
    ext(String, 'substringBetween', function(start, end) {
        /*|{
            "info": "String class extension to substring by character instead of using indexes",
            "category": "String",
            "parameters":[
                {"start?": "(Char) Character to use for the starting index (required if end is not passed)"},
                {"end?": "(Char) Character to use for the ending index (required if start is null or undefined)"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.substringBetween",
            "returnType": "(String)"
        }|*/
        try {
            if ($s.isNull(start)) { return $c.substringEndAt(this, end); }
            if ($s.isNull(end)) { return $c.substringStartFrom(this, start); }
            var si = this.indexOf(start), ei = this.indexOf(end);
            if (!~si) { si = 0; }
            if (!~ei) { ei = this.length; }
            return $c.cut(this, si, ei);
        } catch (e) {
            error('Object.substringBetween', e);
        }
    }, true);
    ext(String, 'substringStartFrom', function(start) {
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
    ext(String, 'substringEndAt', function(end) {
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
    ext(String, 'toCurrencyNotation', function (sep) {
        /*|{
            "info": "String class extension to change number to use separater character",
            "category": "String",
            "parameters":[
                {"separator?": "(Char) Character to use as delimiter"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#String.toCurrencyNotation",
            "returnType": "(String)"
        }|*/
        try {
            return $s.toCurrencyNotation(this, sep);
        } catch (e) {
            error('Object.toCurrencyNotation', e);
        }
    }, true);
    ext(String, 'toDateTime', function (options) {
        /*|{
            "info": "String class extension to convert string to datetime",
            "category": "String",
            "parameters":[
                {"options?": "(DateTimeOptions) specs with optional properties:<br />(Bool) gmt<br />(Int) offset<br />(String) format"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#string.toDateTime",
            "returnType": "(Date|String)"
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
                dt = new Date(this.replace("-","/").replace("-","/"));
            }
            if (!dt.getDate() && $s.isString(strDatetime)) {
                dt = new Date(strDatetime.replace(/(am|pm)/i,' $1'));
            }
            if (!dt.getDate()) {
                var parts = [],
                    dtstring = this[0] == "(" ? this.substring(1,this.length-1) : this,
                    chars = ["\\.","\\/","-","\\s*?"], c, i = 0;

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
                        if (parseInt(parts[1]) >= 1  && parseInt(parts[1]) <= 12) {
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
                var offset = $s.isNull(options.offset, $s.getGMTOffset(!dt.getDate() ? new Date() : dt));
                dt = new Date(dt.valueOf() - offset * 60*60000);
            }
            return options.format ? $s.format(dt,options.format) : dt;
        } catch (e) {
            error("String.toDateTime", e);
        }
    }, true);
    ext(String, 'toObject', function(assignmentChar, delimiter) {
        /*|{
            "info": "String class extension to convert to JSON",
            "category": "String",
            "parameters":[
                {"assignmentChar?": "(Char) Character to use as assignment delimiter. Defaults to '&'."},
                {"delimiter?": "(Char) Character to use as pair delimiter"}],

            "overloads":[],

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
    ext(String, 'trim', function (chars) {
        /*|{
            "info": "String class extension to remove characters from the beginning and end of the string.",
            "category": "String",
            "parameters":[
                {"character?": "(Char[]) Character to remove in the String"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#String.trim",
            "returnType": "(Bool)"
        }|*/
        try {
            return $s.universal_trim(this, chars);
        } catch (e) {
            error("String.aggregate", e);
        }
    }, true);

    module.exports = $c;
}