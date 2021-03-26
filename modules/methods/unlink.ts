import _fsHelper from '../protected/_fsHelper';

export default function unlink(this: any, path: string): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of unlink.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#unlink",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['unlink', ...arguments as any]) as any;
}