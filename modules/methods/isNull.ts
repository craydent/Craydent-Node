import error from './error'
export default function isNull(value: any, defaultValue?: any): boolean | any {
    /*|{
        "info": "Check if a value is Null",
        "category": "Utility|TypeOf",
        "parameters":[
            {"value": "(any) Value to check"}],

        "overloads":[
            {"parameters":[
                {"value": "(any) Value to check"},
                {"defaultValue": "(any) Value to return if null"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#isNull",
        "returnType": "(Bool|any)"
    }|*/
    try {
        let isnull = value == null || value == undefined;
        if (arguments.length === 1) {
            return isnull;
        }
        return isnull ? defaultValue : value;
    } catch (e) {
        error && error('isNull', e);
    }
}