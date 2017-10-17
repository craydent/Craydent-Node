/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    scope = {eval:function (str) { return eval(str); }},
    _error = $c.error,
    _suid = $c.suid,
    _isArray = $c.isArray,
    _isObject = $c.isObject,
    _isString = $c.isString,
    _isFunction = $c.isFunction,
    _isNull = $c.isNull,
    _foo = $c.foo,
    _merge = $c.merge,
    _parseRaw = $c.parseRaw,
    _getProperty = $c.getProperty,
    _replace_all = function (str, replace, subject) { return $c.replace_all(str, replace, subject, 'g'); },
    _indexOfAlt = $c.indexOfAlt,
    _condense = $c.condense,
    _strip = $c.strip;

require('./addFlags')($c);
require('./count')($c);
require('./cut')($c);
require('./eachProperty')($c);
require('./orderedlist')($c);
require('./removeAt')($c);
require('./startsWithAny')($c);

function __add_fillTemplate_ref (obj){
    try {
        var uid = _suid();
        scope.ctx.fillTemplate.refs["ref_" + scope.ctx.fillTemplate.refs.length] = uid;
        scope.ctx.fillTemplate.refs[uid] = obj;
        scope.ctx.fillTemplate.refs.push(obj);
        return uid;
    } catch (e) {
        _error && _error('fillTemplate.__add_fillTemplate_ref', e);
    }
}
function __and (){
    try {
        var a = 0;
        for (var len = arguments.length; a < len; a++) {
            var arg = arguments[a];
            if (!arg) { return ""; }
        }
        return arguments[a - 1];
    } catch (e) {
        _error && _error('fillTemplate.__and', e);
    }
}
function __count(arr){
    try {
        return arr.length;
    } catch (e) {
        _error && _error('fillTemplate.count', e);
    }
}
function __enum(obj, delimiter, prePost){
    try {
        delimiter = delimiter || ", ";
        prePost = prePost || ["",""];
        var props = [],
            str = "";
        if (_isArray(obj)) {
            props = obj.slice(0);
        } else if (_isObject(obj)) {
            for (var prp in obj) {
                if (obj.hasOwnProperty(prp)) {
                    props.push(prp);
                }
            }
        }
        for (var i = 0, len = props.length; i < len; i++) {
            var prop = props[i];
            var pre = _replace_all(prePost[0],['{ENUM_VAR}','{ENUM_VAL}'],[prop,obj[prop]]),
                post = _replace_all(prePost[1],['{ENUM_VAR}','{ENUM_VAL}'],[prop,obj[prop]]);
            str += pre + prop + post + delimiter;
        }
        return str.slice(0,-1*delimiter.length);
    } catch (e) {
        _error && _error('fillTemplate.enum', e);
    }
}
function __logic_parser (code, obj, bind) {
    if (!code) { return ""; }
    var ttc = $c.TEMPLATE_TAG_CONFIG, indexes = [], logic = {};
    code = _replace_all(code,ttc.IGNORE_CHARS,['']);
    $c.eachProperty(ttc, function (value) {
        if (!value.begin) { return; }
        var index = _indexOfAlt(code,value.begin);
        indexes.push(index);
        logic[index] = value;
    });
    var index = Math.min.apply(Math,_condense(indexes,[-1]));

    if (!logic[index]) { return code; }

    return code.substring(0,index) + logic[index].parser(code.substring(index),obj, bind);
}
function __or (){
    try {
        for (var a = 0, len = arguments.length; a < len; a++) {
            var arg = arguments[a];
            if(arg){ return arg; }
        }
        return "";
    } catch (e) {
        _error && _error('fillTemplate.__or', e);
    }
}
function __processBlocks (start, end, code, lookups) {
    lookups = lookups || {};
    var blocks = [], sindexes = [], sindex = 0, eindexes = [], eindex = 0;
    while (~(sindex = _indexOfAlt(code,start, sindex)) && ~(eindex = _indexOfAlt(code,end, eindex))) {
        ~sindex && (sindexes.push(sindex), sindex++);
        ~eindex && (eindexes.push(eindex), eindex++);
    }
    // if true syntax error, start end missmatch
    if (sindexes.length != eindexes.length) {
        blocks.push({id: "##" + _suid() + "##", block: "", body:"", code: code});
        return blocks;
    }

    var pairs = $c.OrderedList([], function (a, b) {
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
        pairs.add({begin: sindexes[e], end: eindexes[0]});
        $c.removeAt(sindexes,e);
        $c.removeAt(eindexes,0);
    }

    var endlength = code.match(end)[0].length;
    var k = 0, pair;
    while (pair = pairs[k++]) {
        var uid = "##" + _suid() + "##",
            block = code.slice(pair.begin, pair.end + endlength),
            beginLength = block.match(start)[0].length,
            body = code.slice(pair.begin + beginLength, pair.end);
        code = code.replace(block, uid);
        blocks.push({id: uid, block: block, body: body, code: code});
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
function __run_replace (reg, template, use_run, obj) {
    try {
        var pre = "", post = "", split_param = "|", match;
        use_run && (pre="RUN[",post="]", split_param=/;(?!\\)/);

        while ((match = reg.exec(template)) && match[1]) {
            var funcValue = [],
                func = "";

            funcValue = _replace_all(match[1],['\\[','\\]'],['[',']']).split(split_param);
            while ($c.count(funcValue[0],"{") != $c.count(funcValue[0],"}")) {
                if (scope.tryEval(funcValue[0])) { break; }
                funcValue[0]+= (_isString(split_param)?split_param:";")+funcValue[1];
                funcValue.splice(1,1);
            }
            func = _strip(funcValue.splice(0,1)[0],";");
            for (var i = 0, len = funcValue.length; i < len; i++) {
                var fv = funcValue[i];
                if (~fv.indexOf("${")) {
                    funcValue[i] = scope.ctx.fillTemplate(fv, obj);
                }
                try {
                    funcValue[i] = eval("(" + _replace_all(fv,[';\\'], [';']) + ")");
                } catch (e) {}
            }
            funcValue = funcValue.map(function(item){ return scope.tryEval(item) || item; });
            template = ~template.indexOf(match[1]) ? template.replace(match[1], (match[1] = _replace_all(match[1],['\\[', '\\]'], ['[', ']']))) : template;
            template = _replace_all(template,"${" + pre + match[1] + post +"}",
                _getProperty($g, func) ? _getProperty($g, func).apply(obj, funcValue) : (scope.tryEval("("+func+")")||_foo).apply(obj,funcValue) || "");
        }
        return template;
    } catch (e) {
        _error && _error('fillTemplate.__run_replace', e);
    }
}


function fillTemplate (htmlTemplate, objs, offset, max, newlineToHtml, preserve_nonmatching) {
    /*|{
        "info": "Function for templetizing",
        "category": "Global",
        "featured": true,
        "parameters":[
            {"htmlTemplate": "(String) Template to be used"},
            {"objs": "(Objects[]) Objects to fill the template variables"}],

        "overloads":[
            {"parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Objects[]) Objects to fill the template variables"},
                {"max": "(Int) The maximum number of records to process"}]}

            {"parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Objects[]) Objects to fill the template variables"},
                {"options": "(Object) Options to use: max,offset,newlineToHtml"}]},

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
                {"newlineToHtml":"(Boolean) Flag to replace all new line chars (\\n) to the HTML <br /> tag.  Default is true."}]},

            {"parameters":[
                {"htmlTemplate": "(String) Template to be used"},
                {"objs": "(Objects[]) Objects to fill the template variables"},
                {"offset": "(Int) The start index of the Object array"},
                {"max": "(Int) The maximum number of records to process"},
                {"newlineToHtml":"(Boolean) Flag to replace all new line chars (\\n) to the HTML <br /> tag.  Default is true."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#fillTemplate",
        "returnType": "(String)"
    }|*/
    try {
        var nested = true;
        if (!scope.ctx.fillTemplate.declared && !scope.ctx.fillTemplate.refs) {
            nested = false;
            scope.ctx.fillTemplate.declared = {};
            scope.ctx.fillTemplate.refs = [];
        }
        if (!htmlTemplate || !_isString(htmlTemplate)) { scope.ctx.fillTemplate.declared = scope.ctx.fillTemplate.refs = undefined; return ""; }
        if (_isObject(offset)) {
            max = offset.max || 0;
            newlineToHtml = _isNull(offset.newlineToHtml, true);
            preserve_nonmatching = offset.preserve_nonmatching;
            offset = offset.offset;
        } else if (!_isNull(offset) && _isNull(max)) {
            max = offset;
            offset = 0;
        }
        if (htmlTemplate.trim() == "" || _isString(objs) && !(objs = scope.tryEval(objs))) { return ""; }

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
            value = _isFunction(value) ? value(variable, j - 1):value;
            htmlTemplate = _replace_all(htmlTemplate,"${"+variable+"}", value);
        }

        max = max || objs.length;
        offset = offset || 0;

        var props = _condense(htmlTemplate.match(vsyntax) || [], true);

        for (var i = offset; i < max; i++) {
            var obj = objs[i], regex, template = htmlTemplate, match, bind = "";

            if (~template.indexOf("${this}") || ~template.indexOf("${index}")) {
                var uid = __add_fillTemplate_ref(obj);
                template = _replace_all(template, ["${this}","${index}"],["scope.ctx.fillTemplate.refs['" + uid + "']",i]);
            }


            while (~template.indexOf("${this.") && (match=/\$\{this\.(.+?)\}/.exec(template))) {
                value = _getProperty(obj, match[1]);
                if (typeof value == "object") {
                    value = "scope.ctx.fillTemplate.refs['" + __add_fillTemplate_ref(value) + "']";
                } else {
                    value = _parseRaw(value, _isString(value));
                }
                template = _replace_all(template,"${this."+match[1]+"}", value);
            }
            var objval, expression;
            for (var j = 0, jlen = props.length; j < jlen; j++) {
                expression = props[j];
                var property = _isFunction(vnsyntax) ? vnsyntax(expression) : vnsyntax.exec && vnsyntax.exec(expression);
                if (!obj.hasOwnProperty(property) && !_getProperty(obj,property)) { continue; }
                if (~template.indexOf(expression) && !_isNull(objval = _getProperty(obj,property,null,{noInheritance:true}))) {
                    if (typeof objval == "object") {
                        objval = "scope.ctx.fillTemplate.refs['" + __add_fillTemplate_ref(objval) + "']";
                    } else {
                        objval = _parseRaw(objval, _isString(objval));
                    }
                    var replacee_arr = [';'], replacer_arr = [';\\'];
                    if (newlineToHtml) {
                        replacee_arr.push('\n');
                        replacer_arr.push('<br />');
                    }
                    objval = _replace_all(objval,replacee_arr,replacer_arr);
                    if (~objval.indexOf('${')) {
                        objval = scope.ctx.fillTemplate(objval,[obj]);
                    }
                    template = _replace_all(template,expression, objval);

                    if (hasDataProps) {
                        template = _replace_all(template,'${dataproperties}', "data-" + property + "='" + (objval.indexOf('<') && "" || objval) + "' ${dataproperties}");
                    }
                }
            }
            template = _replace_all(template,'\n', "scope.ctx.fillTemplate.refs['newline']");
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
                        rptmp = (tmp && "__or|" + _replace_all(tmp, '||', "|") || "");
                        template = _replace_all(template, tmp, rptmp);
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
                    rptmp = (tmp && "__and|" + _replace_all(tmp, '&&', "|") || "");
                    template = _replace_all(template, tmp, rptmp);
                }
            }
            var leftovervars = template.match(vsyntax);
            if (leftovervars) {
                for (var k = 0, klen = leftovervars.length; k < klen; k++) {
                    var variable = leftovervars[k];
                    if (~variable.indexOf('|')) {
                        var regex = new RegExp(_replace_all(variable,['$','{','}','|'],['\\$','\\{(',')\\}','\\|']));
                        template = __run_replace (regex, template, false, obj);
                    }
                }
            }
            template = /\$\{.*?(\|.*?)+?\}/.test(template) && !/\$\{.*?(\|\|.*?)+?\}/.test(template) ? __run_replace (/\$\{(.+?(\|?.+?)+)\}/, template, false,obj) : template;

            var declarations = template.match($c.addFlags(ttc.DECLARE.syntax,'g')) || [];
            for (var j = 0, jlen = declarations.length; j < jlen; j++) {
                template = ttc.DECLARE.parser(template, declarations[j]);
            }
            template = __logic_parser(template, obj, bind);
            html += _replace_all(( !preserve_nonmatching && vsyntax.test(template) ? template.replace(vsyntax,"") : template),';\\', ';');
        }

        if (!nested) {
            html = html.replace(/scope.ctx.fillTemplate.refs['newline']/g,"\n").replace(/scope.ctx.fillTemplate.refs\['.*?']/g,"");
            scope.ctx.fillTemplate.declared = scope.ctx.fillTemplate.refs = undefined;
        }
        return html;
    } catch (e) {
        _error && _error('fillTemplate', e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    require('./addFlags')($c);
    require('./count')($c);
    require('./cut')($c);
    require('./eachProperty')($c);
    require('./orderedlist')($c);
    require('./removeAt')($c);
    require('./startsWithAny')($c);

    scope.tryEval = eval("("+($c.tryEval || ctx.tryEval).toString()+")");
    scope.ctx = $c;

    _error = ctx.error || $c.error;
    _suid = ctx.suid || $c.suid;
    _isArray = ctx.isArray || $c.isArray;
    _isObject = ctx.isObject || $c.isObject;
    _isString = ctx.isString || $c.isString;
    _isFunction = ctx.isFunction || $c.isFunction;
    _isNull = ctx.isNull || $c.isNull;
    _foo = ctx.foo || $c.foo;
    _merge = ctx.merge || $c.merge;
    _parseRaw = ctx.parseRaw|| $c.parseRaw;
    _getProperty = ctx.getProperty || $c.getProperty;
    _replace_all = ctx.replace_all ?
        function (str, replace, subject) { return ctx.replace_all(str, replace, subject, 'g'); } :
        function (str, replace, subject) { return $c.replace_all(str, replace, subject, 'g'); };
    _indexOfAlt = ctx.indexOfAlt || $c.indexOfAlt;
    _condense = ctx.condense || $c.condense;
    _strip = ctx.strip || $c.strip;

    $c.fillTemplate = ctx.fillTemplate = $c.fillTemplate || ctx.fillTemplate || fillTemplate;

    $c.TEMPLATE_VARS = ctx.TEMPLATE_VARS = $c.TEMPLATE_VARS || ctx.TEMPLATE_VARS || [];
    $c.TEMPLATE_TAG_CONFIG = ctx.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || ctx.TEMPLATE_TAG_CONFIG || {
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
                        mresult[j] = _replace_all(mresult[j],['\\[', '\\]'], ['[', ']']).toString();
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
                    while (eval(scope.ctx.fillTemplate(condition, ovars))) {
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
                        code_result = _replace_all(code_result,id, FOR.helper(block, obj.body));
                    }
                    var ____execMatches = code_result.match($c.TEMPLATE_TAG_CONFIG.VARIABLE), ____execMatchIndex = 0;

                    while (____execMatchIndex < ____execMatches.length) {
                        code_result = code_result.replace(____execMatches[____execMatchIndex],scope.tryEval(ttc.VARIABLE_NAME(____execMatches[____execMatchIndex])));
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
                        mresult[j] = _replace_all(mresult[j],['\\[', '\\]'], ['[', ']']).toString();
                    }
                    var value = mresult[2] || mresult[4];
                    objs = scope.tryEval(value);
                    if (!objs && $c.startsWithAny(value, "${","{{") && !value.endsWith("}")) {
                        return code;
                    }
                    var_name = ttc.VARIABLE_NAME(mresult[1] || mresult[3]);


                    rtnObject = rtnObject || {};
                    var vname = var_name + $c.suid();
                    rtnObject[uid] += "var " + vname + "s," + var_name + ";";
                    rtnObject[vname + "s"] = objs;
                    if ($c.isArray(objs)) {
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
                        uid = "##" + $c.suid() + "##",
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
                        code_result = _replace_all(code_result,id, FOREACH.helper(block, obj.body, result_obj, uid, obj, bind, ref_obj));
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
                        if ($c.isObject(str) || $c.isArray(str)) {
                            str = "scope.ctx.fillTemplate.refs['" + __add_fillTemplate_ref(str) + "']";
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
                        declared = scope.ctx.fillTemplate.declared,
                        loop_limit = 100000;
                    for (var prop in declared) {
                        if (!declared.hasOwnProperty(prop) || !~code.indexOf("${" + prop + "}")) {
                            // if (!~code.indexOf("${" + prop + "}") || !declared.hasOwnProperty(prop)) {
                            continue;
                        }
                        var val = declared[prop];
                        vars += "var " + prop + "=" + val + ";";
                        ovars[prop] = prop;
                    }
                    eval(vars);
                    while (eval(scope.ctx.fillTemplate(mresult[1] || mresult[2], ovars))) {
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
                    scope.ctx.fillTemplate.declared = declared;

                    var variable_initialization = "";
                    for (var prp in ovars) {
                        if (!ovars.hasOwnProperty(prp)) { continue; }
                        variable_initialization += "${" + prp + "=" + declared[prp] + ",null}";
                    }

                    return variable_initialization + code_result;
                },
                "parser": function (code, ref_obj, bind) {
                    var ttc = $c.TEMPLATE_TAG_CONFIG,
                        WHILE = ttc.WHILE,
                        lookups = {},
                        blocks = __processBlocks(WHILE.begin, WHILE.end, code, lookups),
                        code_result = "", vars = "", declared = scope.ctx.fillTemplate.declared, post = "",
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
                        code_result = _replace_all(code_result,id, WHILE.helper(block, obj.body));
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
                        if (scope.tryEval(var_match_name + ";") !== null) {
                            var_match_index += var_match.length;
                        }

                        before = _replace_all(code_result.substring(0, var_match_index),var_match, eval(var_match_name));
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
                        ifmatch = $c.condense((code.match(IF.begin) || [])),
                        endlength = code.match(IF.end)[0].length,
                        startindex = $c.indexOfAlt(code,IF.begin),
                        endindex = $c.indexOfAlt(code,IF.end),
                        vsyntax = $c.TEMPLATE_TAG_CONFIG.VARIABLE;

                    if (ifmatch.length) {
                        for (var j = 1, jlen = ifmatch.length; j < jlen; j++) {
                            var ifm = ifmatch[j];
                            ifmatch[j] = _replace_all(ifm,['\\[', '\\]'], ['[', ']']).toString();
                        }
                        var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                            ifsyntax = new RegExp(IF.begin.source + "|" + IF.elseif.source + "|" + IF["else"].source, 'i');

                        if (!code.match(new RegExp(IF.elseif.source + "|" + IF["else"].source, 'ig'))) {
                            if ("undefined" == ifmatch[1] || !scope.tryEval(ifmatch[1])) {
                                return pre + post;
                            }
                            return pre + code.substring(startindex + ifmatch[0].length, endindex) + post;
                        }
                        ifmatch = $c.condense((code.match($c.addFlags(ifsyntax,'g')) || []));
                        for (var i = 0, len = ifmatch.length; i < len; i++) {
                            var ifm2 = ifmatch[i],
                                ife = $c.condense(ifm2.match(ifsyntax)),
                                condition = ife[1],
                                value = "undefined" == condition ? false : scope.tryEval(condition),
                                sindex = code.indexOf(ifm2) + ifm2.length;

                            if (condition && condition.length && condition != 'null' && !$c.contains(condition, vsyntax) && value === null) {
                                value = condition;
                            }

                            if (value !== undefined && value) {
                                var eindex = code.indexOf(ifmatch[i + 1]);
                                if (!~eindex) {
                                    return pre + code.substring(sindex, endindex) + post;
                                }
                                return pre + code.substring(sindex, eindex) + post;
                            } else if (ifm2.match(IF["else"])) {
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
                        switchmatch = $c.condense((code.match(SWITCH.begin) || [])),
                        endlength = code.match(SWITCH.end)[0].length,
                        startindex = $c.indexOfAlt(code, SWITCH.begin),
                        endindex = $c.indexOfAlt(code,SWITCH.end),
                        brk = SWITCH["break"], dflt = SWITCH["default"];


                    if (switchmatch.length) {
                        for (var j = 1, jlen = switchmatch.length; j < jlen; j++) {
                            var swmatch = switchmatch[j];
                            switchmatch[j] = _replace_all(swmatch,['\\[', '\\]'], ['[', ']']).toString();
                        }
                        var pre = code.substring(0, startindex), post = code.substring(endindex + endlength),
                            val = scope.tryEval(switchmatch[2]) || switchmatch[2],
                            cgsyntax = $c.addFlags(SWITCH["case"],"g"),
                            cases = code.match(cgsyntax);
                        code = code.substring(startindex + (switchmatch[0] || "").length, endindex);

                        if (!cases) {
                            return pre + $c.cut(code,tartindex, endindex + endlength) + post;
                        }
                        for (var i = 0, len = cases.length; i < len; i++) {
                            var cse = cases[i],
                                cs = cse.match(SWITCH["case"]),
                                cvalue = cs[1] || cs[2];
                            cvalue = scope.tryEval(cvalue) || cvalue;
                            if (val == cvalue) {
                                var cindex = code.indexOf(cse),
                                    bindex = $c.indexOfAlt(code,brk, cindex);
                                bindex = !~bindex ? code.length : bindex;
                                return pre + code.substring(cindex + cse.length, bindex).replace(cgsyntax, '') + post;
                            }
                        }
                        var dindex = $c.indexOfAlt(code,dflt);
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
                        sindex = $c.indexOfAlt(code,SCRIPT.begin),
                        slen = code.match(SCRIPT.begin)[0].length,
                        eindex = $c.indexOfAlt(code,SCRIPT.end),
                        elen = code.match(SCRIPT.end)[0].length;

                    if (!~eindex) {
                        eindex = undefined;
                    }
                    var block = code.substring(sindex + slen, eindex),
                        echo = function (value) {
                            echo.out += value;
                        };
                    echo.out = "";
                    str = eval("(function(){" + block + ";return echo.out;})()");

                    return __logic_parser($c.cut(code,sindex, eindex + elen, str));
                }

            },
            TRY: {
                "begin": /(\$\{try\})|(\{\{try\}\})/i,
                "catch": /(?:\$\{catch\s+\((.*)?\)\s*\})|(?:\{\{catch\s+\((.*)?\)\s*\}\})/i,
                "finally": /(\$\{finally\})|(\{\{finally\}\})/i,
                "end": /(\$\{end try\})|(\{\{end try\}\})/i,
                "helper": function (code, lookups, exec) {
                    var TRY = $c.TEMPLATE_TAG_CONFIG.TRY,
                        cindex = $c.indexOfAlt(code,TRY["catch"]),
                        findex = $c.indexOfAlt(code,TRY["finally"]),
                        eindex = $c.indexOfAlt(code,TRY["end"]),
                        tend = cindex;

                    if (!~tend) {
                        tend = ~findex ? findex : eindex;
                    }

                    var tindex = $c.indexOfAlt(code,TRY.begin),
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
                                errorString = _replace_all(e.toString(),'\'','\\\'');
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

                     scope.ctx.fillTemplate.declared[var_nameValue[0]] = var_nameValue[1];*/
                    _merge(scope.ctx.fillTemplate.declared, scope.tryEval('({' + _replace_all(matches[1],'=', ':') + '})'));
                    return _replace_all(htmlTemplate,declare, '');
                }
            }
            /* end tokens config */
        };
}
init.fillTemplate = fillTemplate;
module.exports = init;
