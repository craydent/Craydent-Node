import error from './error';
import _getFuncName from '../protected/_getFuncName';

export default function getClass(obj: any): string {
    /*|{
        "info": "Object class extension to get the constructor name",
        "category": "Object",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getClass",
        "returnType": "(String)"
    }|*/
    try {
        return _getFuncName(obj.constructor);
    } catch (e) {
        error && error('Object.getClass', e)
    }
}