/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from "./error";

export default function toCurrencyNotation(obj: string | number, sep?: string): string {
    /*|{
        "info": "Number class extension to change number to use separater character",
        "category": "Number|String",
        "parameters":[
            {"separator?": "(Char) Character to use as delimiter"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#String.toCurrencyNotation",
        "returnType": "(String)"
    }|*/
    try {
        sep = sep || ",";
        let whole = obj.toString(), fraction = "";
        if (sep != ".") {
            let part = whole.split('.');
            if (part.length > 1) {
                whole = part[0];
                fraction = '.' + part[1];
            }
        }
        return whole.replace(/\B(?=(\d{3})+(?!\d))/g, sep) + fraction;
    } catch (e) /* istanbul ignore next */ {
        error && error('Number.toCurrencyNotation', e);
    }
}
