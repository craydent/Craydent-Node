import _fsHelper from '../protected/_fsHelper';
import * as fs from 'fs';

export default function appendFile(file: string | number | Buffer | URL, data: any, options?: fs.WriteFileOptions): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of appendFile.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#appendFile",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['appendFile', ...arguments as any]);
}