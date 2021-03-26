import _fsHelper from '../protected/_fsHelper';

export default function utimes(this: any, path: string, atime: string | number | Date, mtime: string | number | Date): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of utimes.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#utimes",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['utimes', ...arguments as any]) as any;
}