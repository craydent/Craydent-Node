import error from "./error";
import _verbPayloadHelper from "../protected/_verbPayloadHelper";
import { VerbOptions } from "../models/VerbOptions";
import $COMMIT from "./$COMMIT";
import isString from "./isString";
import _invokeHashChange from "../protected/_invokeHashChange";


export default function $DELETE(this: Craydent, variable?: string, options?: VerbOptions) {
    /*|{
        "info": "Retrieve all or specific variables in the Body",
        "category": "HTTP",
        "featured": true,
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"key": "(String) key for query value"},
                {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$DELETE",
        "returnType": "(Bool|Object)"
    }|*/
    if (typeof window != 'undefined') {
        return _node$DELETE.call(this, variable, options);
    }
    return _js$DELETE.call(this, variable, options);
}
function _node$DELETE(this: Craydent, variable?: string, options?: VerbOptions) {
    /*|{
        "info": "Retrieve all or specific variables in the Body",
        "category": "HTTP",
        "featured": true,
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"key": "(String) key for query value"},
                {"options?": "(VerbOptionsTypes|VerbOptions) Options to defer, ignore case, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$DELETE",
        "returnType": "(Bool|Object)"
    }|*/
    try {
        return _verbPayloadHelper(this, variable, options);
    } catch (e) {
        error && error('$DELETE', e);
    }
}
function _js$DELETE(variables?: string[] | string, options?: VerbOptions) {
    /*|{
        "info": "Delete variable in url",
        "category": "Utility",
        "featured": true,
        "parameters":[
            {"variables": "(String[]) variable names"}],

        "overloads":[
            {"parameters":[
                {"variables": "(String[]) variable names"},
                {"options": "(Object) options to ignoreCase, defer, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$DEL",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isString(variables)) {
            //@ts-ignore
            variables = [variables];
        }
        options = options || {};
        let ignoreCase = (options as any).ignoreCase || options == "ignoreCase" ? "i" : "",
            defer = !!((options as any).defer || options == "defer"),
            loc = {
                'search': location.search,
                'hash': location.hash
            },
            regex, attr;
        for (let i = 0, len = variables.length; i < len; i++) {
            let variable = variables[i];
            regex = new RegExp(`[\\?|&|@]${variable}=`, ignoreCase);
            attr = "search";
            if (regex.test(location.hash)) {
                attr = 'hash';
            } else if (!regex.test(location.search)) {
                continue;
            }

            $COMMIT[attr] = $COMMIT[attr] || "";

            regex = new RegExp(`([&]?|[@])(${variable}=([^&|^@]*)[&]?)`, ignoreCase);

            if (!defer) {
                let noHistory = (options as any).noHistory || options == "noHistory" || options == "h";
                if (noHistory) {
                    if (loc.hash[0] != "#") {
                        loc.hash = `#${loc.hash}`;
                    }
                    if (loc.search && loc.search[0] != "?") {
                        loc.search = `?${loc.search}`;
                    }
                    location.replace(loc.search.replace(regex, '') + loc.hash.replace(regex, ''));
                    return true;
                }
                location[attr] = location[attr].replace(regex, '');
                if (attr == 'hash') {
                    _invokeHashChange();
                }
            } else {
                $COMMIT[attr] = ($COMMIT[attr] || location[attr]);
                $COMMIT[attr] = $COMMIT[attr].replace(regex, '');
                ($COMMIT as any).update = true;
            }
        }
        return true;
    } catch (e) {
        error && error("$DEL", e);
        return false;
    }
}