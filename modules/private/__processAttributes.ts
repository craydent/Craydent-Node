import { AnyObject } from '../models/Generics';
import _generalTrim from '../protected/_generalTrim';
import fillTemplate from '../methods/filltemplate';
import tryEval from '../methods/tryeval';


export default function __processAttributes(node: string, refs: any): AnyObject {
    let obj = {},
        tagend = node.indexOf('>'),
        tag = node.substring(1, tagend),
        attIndex = tag.search(/\s|>/),
        attr = !~attIndex ? "" : tag.substring(attIndex),
        textEnd = node.indexOf('<', tagend),
        text = node.substring(tagend + 1, textEnd);
    if (!~textEnd) { text = ''; }

    // self closing
    if (attr[attr.length - 1] == "/") {
        attr = attr.substring(0, attr.length - 1);
        text = "";
    }
    attr = _generalTrim(attr);

    if (text) { obj['#text'] = fillTemplate(text, refs); }
    if (attr) {
        let attributes = attr.split(' ');
        for (let i = 0, len = attributes.length; i < len; i++) {
            let attribute = attributes[i];
            if (!attribute) { continue; }
            let key_val = attribute.split('=');
            obj['@attributes'] = obj['@attributes'] || {};
            obj['@attributes'][key_val[0].trim()] = tryEval(key_val[1]) || key_val[1].trim();
        }
    }
    return obj;
}