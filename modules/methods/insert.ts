import error from '../methods/error';
import add from '../methods/add';
import isArray from '../methods/isarray';

export default function insert<T>(objs: T[], value: any | any[]): boolean {
    /*|{
        "info": "Array class extension to add to the array",
        "category": "Array",
        "parameters":[
            {"value": "(Mixed) value to add"}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.insert",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isArray(value)) {
            for (let i = 0, len = value.length; i < len; i++) {
                add(objs, value[i]);
            }
        } else {
            add(objs, value);
        }
        return true;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.insert", e);
        return null;
    }
}