import where, { WhereProjection } from '../methods/where';
import error from '../methods/error';
import { WhereCondition } from '../models/Arrays';

export default function findOne<T>(arr: T[], condition: WhereCondition | string, projection?: WhereProjection): T {
    /*|{
        "info": "Array class extension to use mongo or sql queries returning the first item match",
        "category": "Array",
        "featured": true,
        "parameters":[
            {"condition": "(WhereCondition | string) Query following find/where clause syntax"}],

        "overloads":[
            {"parameters":[
                {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                {"projection": "(Fields | string) Indicate which properties to return"}]},

            {"parameters":[
                {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                {"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
        "typeParameter": "<T>",
        "returnType": "(T)"
    }|*/
    try {
        return where<T>(arr, condition, projection, 1)[0];
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.where", e);
        return null as any;
    }
}