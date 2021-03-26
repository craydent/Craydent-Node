import _fsHelper from '../protected/_fsHelper';

export default function lchown(this: any, path: string, uid: number, gid: number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of lchown.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#lchown",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['lchown', ...arguments as any]) as any;
}