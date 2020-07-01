import { AnyObject } from "../models/Arrays";
import error from "./error";
import fillTemplate from "./fillTemplate";
import isArray from "./isArray";
import isString from "./isString";
import strip from "./strip";
import suid from "./suid";
import __processAttributes from "../private/__processAttributes";
import merge from "../methods/merge";

export function __processChildren(nodename: string, children: string[], xml: string, refs: any, ignoreAttributes?: boolean): AnyObject {
    let child, i = 0, obj = {};
    if (!children.length && !ignoreAttributes) {
        obj[nodename] = __processAttributes(xml, refs);
    }
    while (child = children[i++]) {
        let index = child.indexOf('>'),
            lindex = child.lastIndexOf('</'),
            attributes = ignoreAttributes ? {} : __processAttributes(child, refs),
            childXML = strip(child.substring(index + 1, lindex), '\n').trim();
        if (children.length == 1) {
            obj[nodename] = merge(xmlToJson(childXML), attributes);
        } else {
            obj[nodename] = obj[nodename] || [];
            obj[nodename].push(merge(attributes, xmlToJson(childXML)));
        }
    }
    return obj;
}
export function __processSiblings(xml: string, refs: any): AnyObject {
    let parts = xml.split('<'), obj = {},
        tag = "", node = "", etag;
    obj['#text'] = obj['#text'] || "";
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (!part) {
            continue;
        }
        if (!tag && !~part.indexOf('/>')) {
            etag = part.indexOf('>');
            if (!~etag) {
                if (!i) {
                    obj['#text'] += fillTemplate(strip(part, ['\n', ' ']), refs);
                } else {
                    node += part;
                }
                continue;
            }
            tag = part.split(/\s|>/)[0];
            node += "<" + part;
        } else if (~(etag = part.indexOf('/' + tag + '>'))) {
            let text = strip(part.substr(etag + tag.length + 2), ['\n', ' ']);
            if (text) {
                obj['#text'] += fillTemplate(text, refs);
            }
            node += "<" + part.substring(0, etag + tag.length + 2);
            if (obj[tag] && isArray(obj[tag])) {
                obj[tag].push(xmlToJson(node)[tag]);
            } else if (obj[tag]) {
                obj[tag] = [obj[tag]];
                obj[tag].push(xmlToJson(node)[tag]);
            } else {
                obj = merge(obj, xmlToJson(node));
            }
            tag = "", node = "";
        } else {
            node += "<" + part;
        }

    }
    if (!obj['#text'] && !(obj['#text'] = fillTemplate(node, refs))) {
        delete obj['#text'];
    }
    return obj;
}
export default function xmlToJson(xml: string | XMLDocument, ignoreAttributes?: boolean): AnyObject {
    /*|{
        "info": "Converts XML to JSON",
        "category": "XML to JSON",
        "parameters":[
            {"xml": "(String|XMLDocument) XML string or XML DOM"},
            {"ignoreAttributes?": "(Bool) Flag to ignore attributes"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#xmlToJson",
        "returnType": "(Object)"
    }|*/
    try {
        xml = (xml as any).outerHTML || xml;
        let ids = [], rtn: any = xml;
        let raws = (xml as string).match(/<\!\[CDATA\[(.*?)\]\]>/g) || [];
        (xmlToJson as any).refs = (xmlToJson as any).refs || {};
        for (let i = 0, len = raws.length; i < len; i++) {
            let id = suid();
            ids.push(id);
            (xmlToJson as any).refs[id] = raws[i].replace(/<\!\[CDATA\[(.*?)\]\]>/, '$1');
            xml = (xml as string).replace(raws[i], `\${${id}}`);
        }
        xml = strip((xml as string).replace(/<\?.*?\?>/, ''), '\n').replace(/>\s*?\n\s*/g, '>');

        let index = (xml as string).indexOf('>'),
            nodename = (xml as string).substring(0, index + 1).replace(/<(\S*)?(?:\s?.*?)>/, '$1');

        if (nodename) {

            let parts = (xml as string).split(nodename), child = "", children = [];

            // break down construct string of children
            for (let i = 0, len = parts.length; i < len; i++) {
                let part = parts[i] = strip(parts[i], '\n');

                if (part == ">" || part == "><") {
                    child += ">";
                    children.push(child);
                    child = part.substr(1) + nodename;
                } else {
                    child += part + nodename;
                }
            }

            // when there are different nodes
            let scount = ((xml as string).match(new RegExp("<" + nodename + ".*?>", 'g')) || []).length,
                ecount = ((xml as string).match(new RegExp("</" + nodename + ">", 'g')) || []).length;
            if (xml && !children.length && scount == ecount) {
                rtn = __processSiblings((xml as string), (xmlToJson as any).refs);
            } else {
                rtn = __processChildren(nodename, children, (xml as string), (xmlToJson as any).refs, ignoreAttributes);
            }
        } else if (isString(rtn)) {
            rtn = fillTemplate(rtn, (xmlToJson as any).refs);
        }
        for (let i = 0, len = ids.length; i < len; i++) {
            delete (xmlToJson as any).refs[ids[i]];
        }
        return rtn;
    } catch (e) {
        error && error('xmlToJson', e);
        return null;
    }
}
