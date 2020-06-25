import error from './error';
import __contextualizeMethods from '../private/__contextualizeMethods';

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
        error && error('globalize', e);
    }
}