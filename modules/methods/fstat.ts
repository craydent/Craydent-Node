import _fsHelper from '../protected/_fsHelper';
import * as fs from 'fs';

export default function fstat(fd: number): Promise<NodeJS.ErrnoException | fs.Stats> {
    /*|{
        "info": "A promisified version of fstat.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#fstat",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['fstat', ...arguments as any]);
}