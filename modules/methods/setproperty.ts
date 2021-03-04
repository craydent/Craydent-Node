import error from '../methods/error';
import strip from '../methods/strip';
import isArray from '../methods/isarray';
import isObject from '../methods/isobject';

export default function setProperty<T>(obj: T, path: string, value: any, delimiter?: string): boolean {
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
        const original = obj;
        delimiter = delimiter || ".";
        path = strip(path, delimiter);
        if (/\[\d*?\]/.test(path)) {
            path = path.replace(/\[(\d*?)\]/g, '.$1');
        }
        let props = path.split(delimiter);
        let i = 0, prop, len = props.length, pobj, pprop;
        while (prop = props[i++]) {
            if (i == len) {
                return obj[prop] = value, true;
            }
            if (pobj && pprop && !isArray(pobj[pprop]) && parseInt(prop) >= 0 && !obj.hasOwnProperty(prop)) {
                let tmp = pobj[pprop];
                pobj[pprop] = [];
                for (let p in tmp) {
                    /* istanbul ignore else */
                    if (tmp.hasOwnProperty(p)) {
                        if (isObject(tmp) && !isObject(pobj[pprop])) {
                            pobj[pprop] = {};
                        }
                        pobj[pprop][p] = tmp[p];
                    }
                }
                obj = pobj[pprop];
            }
            obj[prop] = obj[prop] || {};
            pobj = obj;
            pprop = prop;
            obj = obj[prop];
        }
    } catch (e) /* istanbul ignore next */ {
        error && error('Object.setProperty', e);
        return null;
    }
}