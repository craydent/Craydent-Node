import error from '../methods/error';
import getProperty from '../methods/getproperty';


export default function toMap<T>(objs: T[], key: string): { [key: string]: T } {
    /*|{
        "info": "Array class extension to convert the array to a map",
        "category": "Array",
        "parameters":[
            {"key": "(String) path to the value to use as they key (delimited by '.')"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.toMap",
        "typeParameter": "<T>",
        "returnType": "({ [key: string]: T }) returns the resulting object."
    }|*/
    try {
        return (objs as T[]).reduce((obj, item) => ({
            ...obj,
            [getProperty(item, key)]: item
        }), {});
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.toMap", e);
        return null as any;
    }
}