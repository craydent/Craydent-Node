import _fsHelper from '../protected/_fsHelper';

export default function truncate(this: any, path: string, len?: number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of truncate.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#truncate",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['truncate', ...arguments as any]) as any;
}