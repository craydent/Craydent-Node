import _fsHelper from '../protected/_fsHelper';
import * as fs from 'fs';

export default function lstat(this: any, path: string): Promise<NodeJS.ErrnoException | fs.Stats> {
    /*|{
        "info": "A promisified version of lstat.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#lstat",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['lstat', ...arguments as any]) as any;
}