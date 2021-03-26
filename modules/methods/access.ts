import _fsHelper from '../protected/_fsHelper';

export default function access(this: any, path: string, mode?: number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of access.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#access",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['access', ...arguments as any]) as any;
}