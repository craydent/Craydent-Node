/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var cm = require('./common'),
    strip = cm.strip,
    merge = cm.merge,
    tryEval = cm.tryEval;

function __processAttributes(node) {
    try {
        var obj = {},
            tagend = node.indexOf('>'),
            tag = node.substring(1, tagend),
            attIndex = tag.search(/\s|>/),
            attr = !~attIndex ? "" : tag.substring(attIndex),
            text = node.substring(tagend + 1, node.indexOf('<', tagend));

        if (attr) {
            obj['#text'] = text;
            var attributes = attr.split(' ');
            for (var i = 0, len = attributes.length; i < len; i++) {
                var attribute = attributes[i];
                if (!attribute) { continue; }
                var key_val = attribute.split('=');
                obj['@attributes'] = obj['@attributes'] || {};
                obj['@attributes'][key_val[0].trim()] = tryEval(key_val[1]) || key_val[1].trim();
            }
        }
        return obj;
    } catch (e) {
        error('xmlToJson.__processAttributes', e);
    }
}
function __processChildren(nodename, children) {
    try {
        var child, i = 0, obj = {};
        while (child = children[i++]) {
            var index = child.indexOf('>'),
                lindex = child.lastIndexOf('</'),
                attributes = __processAttributes(child),
                childXML = strip(child.substring(index + 1, lindex),'\n').trim();
            if (children.length == 1) {
                obj[nodename] = merge(xmlToJson(childXML), attributes);
            } else {
                obj[nodename] = obj[nodename] || [];
                obj[nodename].push(merge(attributes, xmlToJson(childXML)));
            }
        }
        return obj;
    } catch (e) {
        error('xmlToJson.__processChildren', e);
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
            if (!tag) {
                etag = part.indexOf('>');
                if (!~etag) {
                    if (!i) {
                        obj['#text'] += strip(part, ['\n', ' ']);
                    } else {
                        node += part;
                    }
                    continue;
                }
                tag = part.split(/\s|>/)[0];
                node += "<" + part;
            } else if (~(etag = part.indexOf('/' + tag + '>'))) {
                var text = strip(part.substr(etag + tag.length + 2),['\n', ' ']);
                if (text) {
                    obj['#text'] += text;
                }
                node += "<" + part.substring(0, etag + tag.length + 2);
                obj = merge(obj, xmlToJson(node));
                tag = "", node = "";
            }

        }
        if (!obj['#text']) {
            delete obj['#text'];
        }
        return obj;
    } catch (e) {
        error('xmlToJson.__processSiblings', e);
    }
}
function xmlToJson(xml, ignoreAttributes) {
    /*|{
        "info": "Converts XML to JSON",
        "category": "Global",
        "parameters":[
            {"xml": "(Mixed) XML string or XML DOM"}],

        "overloads":[
            {"parameters":[
                {"xml": "(Mixed) XML string or XML DOM"},
                {"ignoreAttributes": "(Bool) Flag to ignore attributes"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#xmlToJson",
        "returnType": "(Object)"
    }|*/
    try {
        xml = strip(xml.replace(/<\?.*?\?>/,''),'\n').replace(/>\s*?\n\s*/g,'>');

        var index = xml.indexOf('>'),
            nodename = xml.substring(0, index + 1).replace(/<(\S*)?(?:\s?.*?)>/,'$1');

        if (!nodename) { return xml; }

        var parts = xml.split(nodename), child = "", children = [];

        // break down construct string of children
        for (var i = 0, len = parts.length; i < len; i++) {
            var part = parts[i] = strip(parts[i],'\n');

            if (part == ">" || part == "><") {
                child += ">";
                children.push(child);
                child = part.substr(1) + nodename;
            } else {
                child += part + nodename;
            }
        }

        // when there are different nodes
        if (xml && !children.length) {
            return __processSiblings(xml);
        }
        return __processChildren(nodename, children);
    } catch (e) {
        error('xmlToJson', e);
    }
}

module.exports.xmlToJson = xmlToJson;