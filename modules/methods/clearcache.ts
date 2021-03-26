/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.9.0                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
import error from '../methods/error';

export default function clearCache(module?: string): boolean {
    /*|{
        "info": "Clear a module from the require cache.",
        "category": "Utility",
        "parameters":[
            {"module?": "(String) Single module to remove."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#clearCache",
        "returnType": "(Bool)"
    }|*/
    try {
        if (module) {
            return _clearCacheHelper(require.resolve(module));
        }
        for (let prop in require.cache) {
            /* istanbul ignore next */
            if (require.cache.hasOwnProperty && !require.cache.hasOwnProperty(prop)) {
                continue;
            }
            _clearCacheHelper(prop);
        }
        return true;
    } catch (e) /* istanbul ignore next */ {
        error && error('clearCache', e);
        return false;
    }
}
export const _clearCacheHelper = (module: string) => {
    return delete require.cache[module];
}
