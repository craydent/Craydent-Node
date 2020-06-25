import error from './error';
import strip from './strip';
import isArray from './isArray';

export default function setProperty(obj: any, path: string, value: any, delimiter?: string): boolean {
    /*|{
        "info": "Object class extension to set nested properties creating necessary property paths",
        "category": "Object",
        "parameters":[
            {"path": "(String) Path to nested property"},
            {"value": "(any) Value to set"},
            {"delimiter?": "(Char) Separator used to parse path"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.setProperty",
        "returnType": "(Bool)"
    }|*/
    try {
        delimiter = delimiter || ".";
        path = strip(path, delimiter);
        let props = path.split(delimiter);
        let i = 0, prop, len = props.length, pobj, pprop;
        while (prop = props[i++]) {
            if (i == len) {
                return obj[prop] = value, true;
            }
            if (pobj && pprop && !isArray(pobj[pprop]) && parseInt(prop) >= 0) {
                let tmp = pobj[pprop];
                pobj[pprop] = [];
                for (let p in tmp) {
                    if (tmp.hasOwnProperty(p)) { pobj[p] = tmp[p]; }
                }
                obj = pobj[pprop];
            }
            obj[prop] = obj[prop] || {};
            pobj = obj;
            pprop = prop;
            obj = obj[prop];
        }
        return false;
    } catch (e) {
        error && error('Object.setProperty', e);
        return null;
    }
}