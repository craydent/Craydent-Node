import _fsHelper from '../protected/_fsHelper';

export default function fchmod(this: any, fd: number, mode: string | number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of fchmod.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#fchmod",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['fchmod', ...arguments as any]) as any;
}