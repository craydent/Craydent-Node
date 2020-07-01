import error from "./error";
import isString from './isString';
import { AnyObject } from "../models/Arrays";
import { VerbOptions } from "../models/VerbOptions";
import $COMMIT from "./$COMMIT";

export default function $GET(this: Craydent | Window, variable?: string, options?: VerbOptions): AnyObject | string {
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
    if (typeof window != 'undefined') {
        return _node$GET.call(this, variable, options);
    }
    return _js$GET.call(this, variable, options);
}

function _node$GET(this: Craydent | Window, variable?: string, options?: VerbOptions): AnyObject | string {
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
        options = options || {};
        if (!variable) {
            let search = this.location.search || "";
            let hash = this.location.hash || "";
            if ((options as any).url) {
                let index = -1;
                let url = (options as any).url;
                if (~(index = url.indexOf("#"))) {
                    hash = url.substring(index);
                    search = url.substring(0, index);
                }
                if (~(index = url.indexOf("?"))) {
                    search = url.substring(index);
                }
            }
            let allkeyvalues = {},
                mapFunc = function (value) {
                    if (value == "") { return; }
                    let keyvalue = value.split('='),
                        len = keyvalue.length;
                    if (len > 2) {
                        for (let i = 2; i < len; i++) {
                            keyvalue[1] += keyvalue[i];
                        }
                    }
                    return allkeyvalues[keyvalue[0]] = keyvalue[1];
                };

            (search[0] == "?" ? search.substr(1) : search).split('&').map(mapFunc);
            (hash[0] == "#" ? hash.substr(1) : hash).split('@').map(mapFunc);
            return allkeyvalues;
        }
        let ignoreCase = (options as any).ignoreCase || options == "ignoreCase" ? "i" : "",
            regex = new RegExp(`[\\?|&|@]?${variable}=`, ignoreCase),
            attr = "search",
            location = {} as Location;
        location.hash = this.location.hash;
        location.search = this.location.search;

        if ((options as any).url || (isString(options) && (~(options as any).indexOf("?") || ~(options as any).indexOf("#")))) {
            var query = (options as any).url || options,
                hindex, qindex = query.indexOf("?");

            ~qindex && (query = query.substr(qindex));

            hindex = query.indexOf("#");
            if (~hindex) {
                location.hash = query.substr(hindex);
                query = query.substr(0, hindex);
            }
            location.search = query;
        }
        if (regex.test(location.hash)) {
            attr = 'hash';
        } else if (!regex.test(location.search)) {
            return null;
        }
        regex = new RegExp('(.*)?(' + variable + '=)(.*?)(([&]|[@])(.*)|$)', ignoreCase);
        return decodeURI(location[attr].replace(regex, '$3'));
    } catch (e) {
        error && error('$GET', e);
    }
}

function _js$GET(variable?: string, options?: VerbOptions) {
    /*|{
        "info": "Retrieve all or specific variables in the url",
        "category": "Utility",
        "featured": true,
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"keyValue": "(Object) specify the key value pair"}]},
            {"parameters":[
                {"keyValue": "(Object) specify the key value pair"},
                {"options": "(Object) options to defer, ignore case, etc"}]},
            {"parameters":[
                {"key": "(String) key for query value"},
                {"value": "(String) value to store"}]},
            {"parameters":[
                {"key": "(String) key for query value"},
                {"value": "(String) value to store"},
                {"options": "(Object) Options to defer, ignore case, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$GET",
        "returnType": "(Mixed)"
    }|*/
    try {
        options = options || {};
        let url = (options as any).url;
        if (!variable) {
            let search = location.search || "";
            let hash = location.hash || "";
            if (url) {
                let index = -1;
                if (~(index = url.indexOf("#"))) {
                    hash = url.substring(index);
                    search = url.substring(0, index);
                }
                if (~(index = url.indexOf("?"))) {
                    search = url.substring(index);
                }
            }
            let allkeyvalues = {},
                mapFunc = function (value) {
                    if (value == "") {
                        return;
                    }
                    let keyvalue = value.split('='),
                        len = keyvalue.length;
                    if (len > 2) {
                        let i = 2, kv;
                        while (kv = keyvalue[i++]) {
                            keyvalue[1] += kv;
                        }
                    }
                    return allkeyvalues[keyvalue[0]] = keyvalue[1];
                };
            (location.search[0] == "?" ? location.search.substr(1) : location.search).split('&').map(mapFunc);
            (location.hash[0] == "#" ? location.hash.substr(1) : location.hash).split('@').map(mapFunc);
            return allkeyvalues;
        }
        let ignoreCase = (options as any).ignoreCase || options == "ignoreCase" ? "i" : "",
            defer = /*!!$COMMIT.update && */((options as any).defer || options == "defer"),
            regex = new RegExp("[\?|&|@]" + variable + "=", ignoreCase),
            attr = "search",
            loc = { hash: null, search: null };
        loc.hash = location.hash;
        loc.search = location.search;

        if (defer) {
            loc.hash = ($COMMIT as any).hash || "";
            loc.search = ($COMMIT as any).search || "";
        } else if (url || $c && isString && (isString(options) && (~(options as string).indexOf("?") || ~(options as string).indexOf("#")))) {
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
            return false;
        }
        regex = new RegExp('(.*)?(' + variable + '=)(.*?)(([' + delimiter + '])(.*)|$)', ignoreCase);
        return decodeURI(loc[attr].replace(regex, '$3'));
    } catch (e) {
        error && error('$GET', e);
    }
}