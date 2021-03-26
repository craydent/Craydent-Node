import _fsHelper from '../protected/_fsHelper';
import * as fs from 'fs';

export default function mkdir(this: any, path: string, options?: string | number | fs.MakeDirectoryOptions): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of mkdir.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#mkdir",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['mkdir', ...arguments as any]) as any;
}