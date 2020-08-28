import _fsHelper from '../protected/_fsHelper';

export default function fdatasync(fd: number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of fdatasync.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#fdatasync",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['fdatasync', ...arguments as any]);
}