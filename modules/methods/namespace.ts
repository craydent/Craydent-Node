import error from '../methods/error';
import _getFuncName from '../protected/_getFuncName';
import getProperty from '../methods/getproperty';
import setProperty from '../methods/setproperty';

let raw: any = {};

export default function namespace(name: string, clazz: Function, callback?: Function): Function {
    /*|{
        "info": "Adds the class to a namespace instead of the global space",
        "category": "Utility",
        "parameters":[
            {"name":"(String) Name of the namespace to add to."},
            {"clazz":"(Class) Class to add to the given namespace"},
            {"fn":"(Function) Method to call after the class has been added to the namespace"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#namespace",
        "returnType":"(void)"
    }|*/
    try {
        const className = _getFuncName(clazz);
        const prop = `${name}.${className}`;
        const cpath = `${prop}.class`;
        const dclass = getProperty(namespace, prop);
        raw[name] = raw[name] || { string: "" };
        if (dclass) {
            raw[name].string = raw[name].string.replace(dclass.toString(), '');
        }
        raw[name].string = raw[name].string + clazz.toString()
        setProperty(raw, cpath, clazz);
        setProperty(namespace, prop, clazz);
        (namespace as any)[name].toString = function () {
            return raw[name].string;
        };
        callback && callback.call(clazz);
        return clazz;
    } catch (e) /* istanbul ignore next */ {
        error && error('namespace', e);
        return null as any;
    }
}
