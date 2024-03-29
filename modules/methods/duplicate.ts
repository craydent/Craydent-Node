import _duplicate from '../protected/_duplicate';
import isNull from '../methods/isnull';
import isJSON from '../methods/isjson';

export default function duplicate<T>(obj: T, recursive?: boolean): T {
    /*|{
        "info": "Object class extension to copy an object including constructor",
        "category": "Object",
        "parameters":[
            {"recursive?": "(Boolean) Flag to copy all child objects recursively"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.duplicate",
        "returnType": "(any)"
    }|*/
    if (isNull(obj)) { return obj; }
    if (recursive && isJSON(obj)) {
        return JSON.parse(JSON.stringify(obj));
    }
    return _duplicate(new ((obj as any).constructor)(), obj, recursive as any);
}