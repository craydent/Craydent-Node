import isNull from '../methods/isnull';

export default function isBetween(obj: any, lowerBound: any, upperBound: any, inclusive?: boolean): boolean {
    /*|{
        "info": "Object class extension to check if object is between lower and upper bounds",
        "category": "Object|TypeOf",
        "parameters":[
            {"lowerBound": "(any) Lower bound comparison"},
            {"upperBound": "(any) Upper bound comparison"},
            {"inclusive?": "(Bool) Flag to include give bounds"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isBetween",
        "returnType": "(Bool)"
    }|*/
    if (isNull(obj)) { return false; }
    if (inclusive) {
        return (obj >= lowerBound && obj <= upperBound);
    } else {
        return (obj > lowerBound && obj < upperBound);
    }
}