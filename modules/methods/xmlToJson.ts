import { AnyObject } from '../models/Arrays';
import error from '../methods/error';
import fillTemplate from '../methods/fillTemplate';
import isArray from '../methods/isArray';
import isString from '../methods/isString';
import strip from '../methods/strip';
import suid from '../methods/suid';
import __processAttributes from '../private/__processAttributes';
import merge from '../methods/merge';
import isEmpty from '../methods/isEmpty';
import isNull from '../methods/isNull';

export function __processChildren(nodename: string, children: string[], xml: string, refs: any, ignoreAttributes?: boolean): AnyObject {
    let child, i = 0, obj = {};
    if (!children.length && !ignoreAttributes) {
        const attributes = __processAttributes(xml, refs);
        if (isEmpty(attributes)) {
            obj[nodename] = '';
        } else {
            obj[nodename] = __processAttributes(xml, refs);
        }
    }
    while (child = children[i++]) {
        let index = child.indexOf('>'),
            lindex = child.lastIndexOf('</'),
            attributes = ignoreAttributes ? {} : __processAttributes(child, refs),
            childXML = strip(child.substring(index + 1, lindex), '\n').trim();
        if (children.length == 1) {
            // @ts-ignore
            childXML = xmlToJson(childXML, ignoreAttributes, refs);
            if (!isString(childXML)) {
                childXML = merge(attributes, childXML)
            }
            obj[nodename] = childXML;
        } else {
            obj[nodename] = obj[nodename] || [];
            // @ts-ignore
            childXML = xmlToJson(childXML, ignoreAttributes, refs);
            if (!isString(childXML)) {
                childXML = merge(attributes, childXML)
            }
            obj[nodename].push(childXML);
        }
    }
    return obj;
}
export function __processSiblings(xml: string, refs: any, ignoreAttributes?: boolean): AnyObject {
    let parts = xml.split('<'), obj = {},
        tag = "", node = "", etag, tagCount = 0;
    obj['#text'] = obj['#text'] || "";
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (!part) {
            continue;
        }
        /* istanbul ignore else */
        if (!~part.indexOf('/>')) {
            /* istanbul ignore else */
            if (!tag) {
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
                tagCount++;
                node += `<${part}`;
                continue;
            } else if (part.indexOf(tag) == 0) {
                tagCount++;
            } else if (part.indexOf(`/${tag}>`) == 0) {
                tagCount--;
            }
        } else if (!tagCount) {
            tag = part.replace('/>', '').trim();
        }
        etag = part.indexOf(`/${tag}>`);
        if (!~etag) {
            let selfClosing = new RegExp(`${tag}(\\s*)/>`);
            const matching = part.match(selfClosing);
            if (matching && !isNull(matching[1])) {
                etag = part.search(selfClosing) + matching[1].length;
            }
        }
        if (!tagCount && ~etag) {
            let text = strip(part.substr(etag + tag.length + 2), ['\n', ' ']);
            if (text) {
                obj['#text'] += fillTemplate(text, refs);
            }
            node += `<${part.substring(0, etag + tag.length + 2)}`;
            if (obj[tag]) {
                if (!isArray(obj[tag])) {
                    obj[tag] = [obj[tag]];
                }
                // @ts-ignore
                let child = xmlToJson(node, ignoreAttributes, refs);
                obj['#text'] += child['#text'] || '';
                obj[tag].push(child[tag]);
            } else {
                // @ts-ignore
                obj = merge(obj, xmlToJson(node, ignoreAttributes, refs));
            }
            tag = "", node = "";
        } else {
            node += `<${part}`;
        }

    }
    if (!obj['#text'] && !(obj['#text'] = fillTemplate(node, refs))) {
        delete obj['#text'];
    }
    return obj;
}

export default function xmlToJson(xml: string | XMLDocument, ignoreAttributes?: boolean): AnyObject;
export default function xmlToJson(xml: string | XMLDocument, ignoreAttributes?: boolean, _refs?: any): AnyObject {
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
            nodename = (xml as string).substring(0, index + 1).replace(/<([^\s\/]*)?(?:\s*?.*?)>/, '$1').replace(/<(\S*)?(?:\s*?.*?)>/, '$1');

        let hasSiblings = false;
        /* istanbul ignore else */
        if (nodename) {
            let parts = (xml as string).split(nodename),
                child = "",
                children = [],
                openCount = 0;

            // break down construct string of children
            for (let i = 0, len = parts.length; i < len; i++) {
                let part = parts[i] = strip(parts[i], '\n');

                if (!(openCount) && (part == ">" /* || part == "><" */)) {
                    child += ">";
                    children.push(child);
                    child = part.substr(1) + nodename;
                } else {
                    /* istanbul ignore else */
                    if (part.slice(-1) == "<") {
                        openCount++;
                    } else if (~part.indexOf("</") || part.slice(-2) == "/>") {
                        openCount--;
                        let offset = 2;
                        if (part == "/>") {
                            offset = 1;
                        }
                        if (!openCount && i != len - offset) {
                            hasSiblings = true;
                        }
                    }
                    child += part + nodename;
                }
            }
            if (children.length == 1 && children[0] == xml && hasSiblings) {
                children = [];
            }

            // when there are different nodes
            const xmlWithoutSelfClosing: string = xml.replace(new RegExp(`<${nodename}[^>]*?/>`, 'g'), '');
            let scount = (xmlWithoutSelfClosing.match(new RegExp(`<${nodename}.*?>`, 'g')) || []).length,
                ecount = (xmlWithoutSelfClosing.match(new RegExp(`</${nodename}>`, 'g')) || []).length;
            if (xmlWithoutSelfClosing && !children.length && scount == ecount) {
                rtn = __processSiblings((xml as string), (xmlToJson as any).refs, ignoreAttributes);
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
    } catch (e) /* istanbul ignore next */ {
        error && error('xmlToJson', e);
        return null;
    }
}
