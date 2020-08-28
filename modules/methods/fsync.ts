import _fsHelper from '../protected/_fsHelper';

export default function fsync(fd: number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of fsync.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#fsync",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['fsync', ...arguments as any]);
}