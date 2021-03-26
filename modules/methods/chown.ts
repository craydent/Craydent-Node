import _fsHelper from '../protected/_fsHelper';

export default function chown(this: any, path: string, uid: number, gid: number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of chown.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#chown",
        "returnType": "(any)"
    }|*/

    return _fsHelper.apply(this, ['chown', ...arguments as any]) as any;
}