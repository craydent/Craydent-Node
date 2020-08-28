import error from "./error";
import isString from './isString';
import { AnyObject } from "../models/Arrays";
import { VerbOptions } from "../models/VerbOptions";
import $COMMIT from "./$COMMIT";
import isObject from "./isObject";

export default function $GET(this: Craydent | void, options: VerbOptions): AnyObject | string;
export default function $GET(this: Craydent | void, variable: string, url?: string): AnyObject | string;
export default function $GET(this: Craydent | void, variable?: string, options?: VerbOptions): AnyObject | string;
export default function $GET(variable?, options?): AnyObject | string {
    /*|{
       "info": "Retrieve all or specific variables in the url",
       "category": "HTTP",
       "featured": true,
       "parameters":[],

       "overloads":[
           {"parameters":[
               {"key": "(String) key for query value"},
               {"options?": "(GetOptions|VerbOptionsTypes|String) Options to defer, ignore case, etc"}]}],

       "url": "http://www.craydent.com/library/1.9.3/docs#$GET",
       "returnType": "(Bool|Object)"
   }|*/
    try {
        const isNode = typeof window == 'undefined';
        if (isObject(variable)) {
            options = variable;
            variable = undefined;
        }
        options = options || {};
        let url = (options as any).url;
        let search = (isNode ? (this as any).location.search : location.search) || "";
        let hash = (isNode ? (this as any).location.hash : location.hash) || "";
        if (!variable) {
            if (url) {
                let index = -1;
                /* istanbul ignore else */
                if (~(index = url.indexOf("#"))) {
                    hash = url.substring(index);
                    search = url.substring(0, index);
                } else if (~(index = url.indexOf("?"))) {
                    search = url.substring(index);
                    hash = ""
                }
            }
            let allkeyvalues = {},
                mapFunc = function (value) {
                    if (value == "") { return; }
                    let keyvalue = value.split('='),
                        len = keyvalue.length;
                    if (len > 2) {
                        let i = 2, kv;
                        while (kv = keyvalue[i++]) {
                            keyvalue[1] += `=${kv}`;
                        }
                    }
                    return allkeyvalues[keyvalue[0]] = keyvalue[1];
                };

            (search[0] == "?" ? search.substr(1) : search).split('&').map(mapFunc);
            (hash[0] == "#" ? hash.substr(1) : hash).split('@').map(mapFunc);
            return allkeyvalues;
        }
        let ignoreCase = (options as any).ignoreCase || options == "ignoreCase" ? "i" : "",
            defer = ((options as any).defer || options == "defer"),
            regex = new RegExp(`[\\?|&|@]?${variable}=`, ignoreCase),
            attr = "search",
            loc = { hash: null, search: null } as Location;
        loc.hash = hash;
        loc.search = search;

        if (defer && !isNode) {
            loc.hash = ($COMMIT as any).hash || "";
            loc.search = ($COMMIT as any).search || "";
        } else if (url || (isString(options) && (~(options as string).indexOf("?") || ~(options as string).indexOf("#")))) {
            let query = url || options,
                hindex, qindex = query.indexOf("?");

            ~qindex && (query = query.substr(qindex));

            hindex = query.indexOf("#");
            if (~hindex) {
                loc.hash = query.substr(hindex);
                query = query.substr(0, hindex);
            }
            loc.search = query;
        }
        let delimiter = "&";
        if (regex.test(loc.hash)) {
            attr = 'hash';
            delimiter = "@";
        } else if (!regex.test(loc.search)) {
            return null;
        }
        regex = new RegExp(`(.*)?(${variable}=)(.*?)(([${delimiter}])(.*)|$)`, ignoreCase);
        return decodeURI(loc[attr].replace(regex, '$3'));
    } catch (e) /* istanbul ignore next */ {
        error && error('$GET', e);
    }
}
