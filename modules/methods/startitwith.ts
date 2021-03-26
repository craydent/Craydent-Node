import error from '../methods/error';

export default function startItWith(str: string, starting: string): string {
    /*|{
        "info": "String class extension to guarantee the original string starts with the passed string",
        "category": "String",
        "parameters":[
            {"starting": "(String) String to start with"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#string.startItWith",
        "returnType": "(String)"
    }|*/
    try {
        if (str.slice(0, (starting.length)) == starting) { return str; }
        return starting + str;
    } catch (e) /* istanbul ignore next */ {
        error && error('String.startItWith', e);
        return null as any;
    }
}