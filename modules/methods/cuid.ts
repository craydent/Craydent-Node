import error from '../methods/error';

export default function cuid(msFormat?: boolean): string {
    /*|{
        "info": "Creates a Craydent/Global Unique Identifier",
        "category": "Utility",
        "parameters":[
            {"msFormat?": "(Bool) use microsoft format if true"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#cuid",
        "returnType": "(String)"
    }|*/
    try {
        let pr = "", pt = "";
        msFormat && (pr = "{", pt = "}");
        return pr + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }) + pt;
    } catch (e) /* istanbul ignore next */ {
        error && error('cuid', e);
    }
}