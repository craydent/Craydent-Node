import _fsHelper from '../protected/_fsHelper';

export default function lchmod(path: string, mode: string | number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of lchmod.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#lchmod",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['lchmod', ...arguments as any]);
}