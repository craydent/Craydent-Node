import * as IXmlToJson from '../methods/xmlToJson';
import { scope } from '../private/__common';

if (typeof (global as any) == 'undefined') {
    (window as any).global = window;
}
scope.eval = str => eval(str);
//#region dependencies
const xmlToJson: typeof IXmlToJson.default = require('../methods/xmlToJson').default;
//#endregion

export function _xmlToJson(this: string | XMLDocument, ignoreAttributes?: boolean) {
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
    return xmlToJson(this, ignoreAttributes);

}