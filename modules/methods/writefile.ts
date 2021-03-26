import _fsHelper from '../protected/_fsHelper';
import * as fs from 'fs';

export default function writeFile(this: any, path: string | number | Buffer | URL, data: any, options: fs.WriteFileOptions): Promise<NodeJS.ErrnoException | void>;
export default function writeFile(this: any, path: string | number | Buffer | URL, data: any): Promise<NodeJS.ErrnoException | void>;
export default function writeFile(this: any, path: any, data: any, options?: any): Promise<any> {
    /*|{
        "info": "A promisified version of writeFile.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#writeFile",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['writeFile', ...arguments as any]);
}