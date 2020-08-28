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
        let path = "", err = new Error();

        $c.VERBOSE_LOGS && err.stack && (path = `\t\t\t\t    ${err.stack.split('\n')[2]}`);
        // for (let i = 0, len = args.length; i < len; i++) { args.push(args[i]); }
        if ($c.VERBOSE_LOGS && path) { args.push(path); }
        cout.apply(this, args);
    } catch (e) /* istanbul ignore next */ {
        error && error('logit', e);
    }
}