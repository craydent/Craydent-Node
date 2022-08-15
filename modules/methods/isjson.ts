import error from '../methods/error';
import _isJSON from '../protected/_isJSON';

export default function isJSON(obj: any): boolean {
    /*|{
        "info": "Check if object is a valid JSON",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isJSON",
        "returnType": "(Bool)"
    }|*/
    try {
        return _isJSON(obj);
    } catch (e) /* istanbul ignore next */ {
        error && error('isJSON', e);
        return null as any;
    }
}