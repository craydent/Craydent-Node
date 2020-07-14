import error from './error';
import __contextualizeMethods from '../private/__contextualizeMethods';

declare var $g: any;
export default function globalize(): void {
    /*|{
        "info": "Module method to globalize functions",
        "category": "Module",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.globalize",
        "returnType": "(void)"
    }|*/
    try {
        __contextualizeMethods($g);
    } catch (e) {
        /* istanbul ignore next */
        error && error('globalize', e);
    }
}