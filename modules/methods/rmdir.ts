import _fsHelper from '../protected/_fsHelper';

export default function rmdir(path: string): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of rmdir.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#rmdir",
        "returnType": "(any)"
    }|*/
    return _fsHelper.apply(this, ['rmdir', ...arguments as any]);
}