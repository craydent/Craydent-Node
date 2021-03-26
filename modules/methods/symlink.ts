import _fsHelper from '../protected/_fsHelper';
import * as fs from 'fs';

export default function symlink(this: any, target: string, path: string, type?: fs.symlink.Type): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of symlink.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#symlink",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['symlink', ...arguments as any]) as any;
}