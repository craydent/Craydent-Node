import _fsHelper from '../protected/_fsHelper';

export default function ftruncate(fd: number, len?: number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of ftruncate.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#ftruncate",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['ftruncate', ...arguments as any]);
}