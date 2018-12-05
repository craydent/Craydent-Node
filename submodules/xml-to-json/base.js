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

    require($s.dir + 'fillTemplate')($s);
    $c.TEMPLATE_VARS = $c.TEMPLATE_VARS || $s.TEMPLATE_VARS;
    $c.TEMPLATE_TAG_CONFIG = $c.TEMPLATE_TAG_CONFIG || $s.TEMPLATE_TAG_CONFIG;

    function __processAttributes(node) {
        var obj = {},
            tagend = node.indexOf('>'),
            tag = node.substring(1, tagend),
            attIndex = tag.search(/\s|>/),
            attr = !~attIndex ? "" : tag.substring(attIndex),
            text = node.substring(tagend + 1, node.indexOf('<', tagend));

        if (attr[attr.length - 1] == "/") { attr = attr.substring(0,attr.length - 1); }
        attr = $s._general_trim(attr);

        if (attr) {
            obj['#text'] = $s.fillTemplate(text,xmlToJson.refs);
            var attributes = attr.split(' ');
            for (var i = 0, len = attributes.length; i < len; i++) {
                var attribute = attributes[i];
                if (!attribute) { continue; }
                var key_val = attribute.split('=');
                obj['@attributes'] = obj['@attributes'] || {};
                obj['@attributes'][key_val[0].trim()] = $s.tryEval(key_val[1]) || key_val[1].trim();
            }
        }
        return obj;
    }
    function __processChildren(nodename, children) {
        var child, i = 0, obj = {};
        if (!children.length) {
            obj[nodename] = __processAttributes(xml);
        }
        while (child = children[i++]) {
            var index = child.indexOf('>'),
                lindex = child.lastIndexOf('</'),
                attributes = __processAttributes(child),
                childXML = $s.strip(child.substring(index + 1, lindex),'\n').trim();
            if (children.length == 1) {
                obj[nodename] = $s.merge(xmlToJson(childXML), attributes);
            } else {
                obj[nodename] = obj[nodename] || [];
                obj[nodename].push($s.merge(attributes, xmlToJson(childXML)));
            }
        }
        return obj;
    }
    function __processSiblings(xml) {
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
                        obj['#text'] += $s.fillTemplate($s.strip(part, ['\n', ' ']),xmlToJson.refs);
                    } else {
                        node += part;
                    }
                    continue;
                }
                tag = part.split(/\s|>/)[0];
                node += "<" + part;
            } else if (~(etag = part.indexOf('/' + tag + '>'))) {
                var text = $s.strip(part.substr(etag + tag.length + 2),['\n', ' ']);
                if (text) {
                    obj['#text'] += $s.fillTemplate(text,xmlToJson.refs);
                }
                node += "<" + part.substring(0, etag + tag.length + 2);
                if (obj[tag] && $s.isArray(obj[tag])) {
                    obj[tag].push(xmlToJson(node)[tag]);
                } else if (obj[tag]) {
                    obj[tag] = [obj[tag]];
                    obj[tag].push(xmlToJson(node)[tag]);
                } else {
                    obj = $s.merge(obj, xmlToJson(node));
                }
                tag = "", node = "";
            } else {
                node += "<" + part;
            }

        }
        if (!obj['#text'] && !(obj['#text'] = $s.fillTemplate(node,xmlToJson.refs))) {
            delete obj['#text'];
        }
        return obj;
    }
    function _xmlToJson(xml, ignoreAttributes) {
        var ids = [], rtn = xml;
        var raws = xml.match(/<\!\[CDATA\[(.*?)\]\]>/g) || [];
        xmlToJson.ref = xmlToJson.ref || {};
        for (var i = 0, len = raws.length; i < len; i++) {
            var id = suid();
            ids.push(id);
            xmlToJson.ref[id] = raws[i].replace(/<\!\[CDATA\[(.*?)\]\]>/,'$1');
            xml = xml.replace(raws[i],"${" + id + "}");
        }
        xml = $s.strip(xml.replace(/<\?.*?\?>/,''),'\n').replace(/>\s*?\n\s*/g,'>');

        var index = xml.indexOf('>'),
            nodename = xml.substring(0, index + 1).replace(/<(\S*)?(?:\s?.*?)>/,'$1');

        if (nodename) {

            var parts = xml.split(nodename), child = "", children = [];

            // break down construct string of children
            for (var i = 0, len = parts.length; i < len; i++) {
                var part = parts[i] = $s.strip(parts[i], '\n');

                if (part == ">" || part == "><") {
                    child += ">";
                    children.push(child);
                    child = part.substr(1) + nodename;
                } else {
                    child += part + nodename;
                }
            }

            // when there are different nodes
            var scount = (xml.match(new RegExp("<" + nodename + ".*?>",'g')) || []).length,
                ecount = (xml.match(new RegExp("</" + nodename + ">",'g')) || []).length;
            if (xml && !children.length && scount == ecount) {
                rtn = __processSiblings(xml);
            } else {
                rtn = __processChildren(nodename, children, xml);
            }
        } else if ($s.isString(rtn)) {
            rtn = $s.fillTemplate(rtn, xmlToJson.ref);
        }
        for (var i = 0, len = ids.length; i < len; i++) {
            delete xmlToJson.ref[ids[i]];
        }
        return rtn;
    }
    function xmlToJson(xml, ignoreAttributes) {
        /*|{
            "info": "Converts XML to JSON",
            "category": "XML to JSON",
            "parameters":[
                {"xml": "(String|XMLDOM) XML string or XML DOM"},
                {"ignoreAttributes?": "(Bool) Flag to ignore attributes"}],

            "overloads":[],

            "url": "http://www.craydent.com/library/1.9.3/docs#xmlToJson",
            "returnType": "(Object)"
        }|*/
        try {
            return _xmlToJson.call(this, xml, ignoreAttributes);
        } catch (e) {
            error('xmlToJson', e);
            return false;
        }
    }

    $c.xmlToJson = xmlToJson;

    module.exports = $c;
}