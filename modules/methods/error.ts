/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
declare var $c;
/* istanbul ignore next */
export default function error(fname: string, e: Error): void {
    /*|{
        "info": "User implemented place holder function to handle errors",
        "category": "Utility",
        "parameters":[
            {"fname": "(String) The function name the error was thrown"},
            {"e": "(Error) Exception object thrown"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#error",
        "returnType": "(void)"
    }|*/
    try {
        typeof $c != 'undefined' && $c.DEBUG_MODE
            && console.log(`Error in ${fname}\n${(e.message || (e as any).description || e)}`, e, e.stack);
    } catch (e) {
        console.log(`Error in ${fname}\n${(e.description || e)}`);
    }
}