import error from '../methods/error';
import isAsync from '../methods/isAsync';
import isGenerator from '../methods/isGenerator';
import isPromise from '../methods/isPromise';
import isNull from '../methods/isNull';
import { AsyncFunction } from '../models/AsyncFunction';

export default function syncroit(gen: GeneratorFunction | Generator | AsyncFunction | Function): Promise<any> {
    /*|{
        "info": "Generator/Async based control flow to allow for more \"syncronous\" programing structure",
        "category": "Control Flow|Utility",
        "parameters":[
            {"func": "(GeneratorFunction|AsyncFunction) function to execute"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#syncroit",
        "returnType": "(Promise<any>)"
    }|*/
    try {
        //@ts-ignore
        if (isAsync(gen)) { return gen(); }
        return new Promise(function (res) {
            //@ts-ignore
            let geno = gen();
            try {
                if (isGenerator(gen)) {
                    return (function cb(value) {
                        let obj = geno.next(value);

                        if (!obj.done) {
                            if (isPromise(obj.value)) {
                                return obj.value.then(cb).catch(cb);
                            }
                            setTimeout(function () {
                                cb(obj.value);
                            }, 0);
                        } else {
                            res(isNull(obj.value, value));
                        }
                    })();
                }
                res(geno);
            } catch (e) /* istanbul ignore next */ {
                if (process.listenerCount('uncaughtException')) {
                    return process.emit('uncaughtException', e);
                }
                throw e;
            }
        });

    } catch (e) /* istanbul ignore next */ {
        error && error('syncroit', e);
        throw e;
    }
}