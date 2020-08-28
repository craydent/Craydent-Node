import _fsHelper from '../protected/_fsHelper';

export default function chmod(path: string, mode: string | number): Promise<NodeJS.ErrnoException | void> {
    /*|{
        "info": "A promisified version of chmod.  The arguments are the same as the native fs methods minus the callback.",
        "category": "FS",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#chmod",
        "returnType": "(any)"
    }|*/

    return _fsHelper.apply(this, ['chmod', ...arguments as any]);
}