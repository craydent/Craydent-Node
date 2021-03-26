import _fsHelper from '../protected/_fsHelper';

export default function readFile(this: any, path: string | number | Buffer | URL, options?: { encoding?: null; flag?: string; }): Promise<NodeJS.ErrnoException | Buffer>;
export default function readFile(this: any, path: string | number | Buffer | URL, options?: string | { encoding: string; flag?: string; }): Promise<NodeJS.ErrnoException | string>;
export default function readFile(this: any, path: string | number | Buffer | URL, options?: string | { encoding?: string; flag?: string; }): Promise<NodeJS.ErrnoException | string | Buffer>;
export default function readFile(this: any, path: string | number | Buffer | URL): Promise<NodeJS.ErrnoException | Buffer>;
export default function readFile(this: any, path: any, options?: any): Promise<any> {
    /*|{
        "info": "A promisified version of readFile.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#readFile",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['readFile', ...arguments as any]);
}