import _fsHelper from '../protected/_fsHelper';

export default function fchown(this: any, fd: number, uid: number, gid: number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of fchown.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#fchown",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['fchown', ...arguments as any]) as any;
}