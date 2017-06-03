/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
//TODO: remove all $c refs
var c = require('./common'),
    $c = c.$c,
    ext = c.ext,
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
        if (c.isString(this)) {
            return c.trim(this, undefined, chars);
        }
        throw "Invalid String";
    } catch (e) {
        error("String.trim", e);
        return false;
    }
}

function _endsWith () {
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
        if (arguments.length < 3 && (c.isArray(arguments[0]) || c.isArray(arguments[1]))) {
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
function _indexOfAlt(value,option) {
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
        if (c.isString(this)) {
            var regex = value, pos = option;
            if (c.isNull(regex)) {
                return -1;
            }
            pos = pos || 0;
            var index = this.substring(pos).search(regex);
            return (index >= 0) ? (index + pos) : index;
        }
        throw "Invalid String";
    } catch (e) {
        error("String.indexOfAlt", e);
    }
}
function _startsWith () {
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
        var args = arguments;
        if (arguments.length < 3 && (c.isArray(arguments[0]) || c.isArray(arguments[1]))) {
            args = arguments[1] || arguments[0];
        }
        for (var i = typeof craydent_ctx != "undefined" ? 1 : 0, len = args.length; i < len; i++) {
            var arg = args[i];
            if (arg == this.slice(0, arg.length)) { return arg; }
        }
        return false;
    } catch (e) {
        error('String.startsWith', e);
    }
}


ext(String, 'acronymize', function (capsOnly, delimiter) {
	/*|{
		"info": "String class extension to capitalize parts of the string",
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

		"url": "http://www.craydent.com/library/1.9.3/docs#string.capitalize",
		"returnType": "(String)"
	}|*/
    try {
        delimiter = delimiter || " ";
        if (c.isBoolean(capsOnly)) {
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
        !c.isArray(pos) && (pos = [pos]);
        var wordArray = everyWord ? this.split(' ') : ([this]);
        for (var i = 0; i < pos.length; i++) {
            for (var j = 0; j < wordArray.length; j++) {
                wordArray[j] = wordArray[j].substring(0,pos[i]) + wordArray[j].charAt(pos[i]).toUpperCase() + wordArray[j].slice(pos[i] + 1);
            }
        }
        return wordArray.join(' ');
    } catch (e) {
        error("String.capitalize", e);
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
ext(String, 'cut', function (si, ei, replacement) {
	/*|{
		"info": "String class extension to remove between the provided indexes",
		"category": "String",
		"parameters":[
			{"start_index": "(Integer) Start index to cut"},
			{"end_index": "(Integer) End index to cut"}],

		"overloads":[
			{"parameters":[
				{"start_index": "(Integer) Start index to cut"},
				{"end_index": "(Integer) End index to cut"},
				{"replacement": "(String) String to put in place of the cut"}]}],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.cut",
		"returnType": "(String)"
	}|*/
    try {
        if (c.isNull(si) || c.isNull(ei)) { return this; }
        if (ei == 0 && si != 0) { ei = si; }
        return this.slice(0, si) + (replacement || "")+ this.slice(ei);
    } catch (e) {
        error("String.cut", e);
    }
}, true);
ext(String, 'ellipsis', function (before, after) {
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
ext(String, 'endsWith', _endsWith);
ext(String, 'endsWithAny', _endsWith);
ext(String, 'fillTemplate', function (arr_objs, offset, max, bound) {
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
ext(String, 'highlight', function (search, cssClass, tag) {
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

		"url": "http://www.craydent.com/library/1.9.3/docs#string.cut",
		"returnType": "(String)"
	}|*/
    try {
        cssClass = cssClass || "chighlight";
        tag = tag || "span";
        var txt = "", flags = "g";
        if (c.isRegExp(search) && !~search.source.indexOf("(")) {
            txt = "(" + search.source + ")";
            if (search.ignoreCase) { flags += "i"; }
            if (search.multiline) { flags += "m"; }
        } else if (!~search.indexOf("(")) {
            txt = "(" + search + ")";
        }
        return this.replace($c.addFlags((new RegExp(txt)),flags),"<" + tag + " class=\"" + cssClass + "\">$1</" + tag + ">");
    } catch (e) {
        error("String.highlight", e);
    }
}, true);
ext(String, 'indexOfAlt', _indexOfAlt, true);
ext(String, 'ireplace_all', function(replace, subject) {
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
        return c.replace_all.call(this, replace, subject, "gi")
    } catch (e) {
        error("String.ireplace_all", e);
    }
}, true);
ext(String, 'isCuid', function (msFormat) {
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
        msFormat && ((pre = "{") && (post = "}"),length += 2);
        return this.length == length && (new RegExp(pre+"[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"+post)).test(this);
    } catch (e) {
        error("String.isCuid", e);
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
        if (!$c.isBlank(this) && !c.isNull(this)) {
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
        pos = c.isNull(pos, this.length);
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
			 {"character": "(Char[]) Character to remove"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.ltrim",
		"returnType": "(String)"
	}|*/
    try {
        return c.trim(this, 'l', character);
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
        return c.replace_all.call(this, replace, subject, "g")
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
			{"character": "(Char[]) Character to remove"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.rtrim",
		"returnType": "(String)"
	}|*/
    try {
        return c.trim(this, 'r', character);
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
        var str = this, key;

        if (key = c.keyOf(_irregularNouns, str)) {
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
ext(String, 'startsWith', _startsWith);
ext(String, 'startsWithAny', _startsWith);
ext(String, 'strip', function(character) {
	/*|{
		"info": "String class extension to remove characters from the beginning and end of the string",
		"category": "String",
		"parameters":[
			{"character": "(Char[]) Character to remove"}],

		"overloads":[],

		"url": "http://www.craydent.com/library/1.9.3/docs#string.strip",
		"returnType": "(String)"
	}|*/
    return c.strip(this, character);
}, true);
ext(String, 'substringBetween', function(start, end) {
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
    if (c.isNull(start)) { return $c.substringEndAt(this, end); }
    if (c.isNull(end)) { return $c.substringStartFrom(this, start); }
    var si = this.indexOf(start), ei = this.indexOf(end);
    if (!~si) { si = 0; }
    if (!~ei) { ei = this.length; }
    return $c.cut(this, si, ei);
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
    return this.substring(this.indexOf(start));
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
    return this.substring(0, this.indexOf(end));
}, true);
ext(String, 'toCurrencyNotation', c.toCurrencyNotation, true);
ext(String, 'toDateTime', function (options) {
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
            dt = new Date(this.replace("-","/").replace("-","/"));
        }
        if (!dt.getDate() && c.isString(strDatetime)) {
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
            var offset = c.isNull(options.offset, c.getGMTOffset(!dt.getDate() ? new Date() : dt));
            dt = new Date(dt.valueOf() - offset * 60*60000);
        }
        return options.format ? $c.format(dt,options.format) : dt;
    } catch (e) {
        error("String.toDateTime", e);
    }
}, true);
ext(String, 'toObject', function(assignmentChar, delimiter) {
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
        error("String.indexOfAlt", e);
    }
}, true);
ext(String, 'trim', __universal_trim, true);
