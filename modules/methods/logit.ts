import error from './error';
import cout from './cout';
import { $c } from '../private/__common';


export default function logit(...args): void {
    /*|{
        "info": "Log to console when DEBUG_MODE is true and when the console is available",
        "category": "Utility",
        "parameters":[
            {"...infinite": "(any) any number of arguments can be passed."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#logit",
        "returnType": "(void)"
    }|*/
    try {
        let location = "", err = new Error(), args = [], arg, i = 0;

        $c.VERBOSE_LOGS && err.stack && (location = "\t\t\t\t    " + err.stack.split('\n')[2]);
        for (let i = 0, len = arguments.length; i < len; i++) { args.push(arguments[i]); }
        if ($c.VERBOSE_LOGS) { args.push(location); }
        cout.apply(this, arguments);
    } catch (e) {
        error && error('logit', e);
    }
}