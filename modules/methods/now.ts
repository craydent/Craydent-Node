import error from './error';
import format from './format';

export default function now(fmt?: string): Date | string {
    /*|{
        "info": "Get the DateTime of now",
        "category": "Utility",
        "parameters":[
            {"format?": "(String) Format syntax to return formatted string of now"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#now",
        "returnType":"(Date|String)"
    }|*/
    try {
        return fmt ? format((new Date()), fmt) : new Date();
    } catch (e) /* istanbul ignore next */ {
        error && error('now', e);
        return '';
    }
}