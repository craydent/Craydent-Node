import _typeCheck from '../protected/_typeCheck';

export default function isGeolocation(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a geolocation",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isGeoLocation",
        "returnType": "(Bool)"
    }|*/
    return _typeCheck(obj, "Geolocation", true);
}