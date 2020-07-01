import error from './error';
import isAsync from './isAsync';
import isGenerator from './isGenerator';
import isPromise from './isPromise';
import isNull from './isNull';
import { AsyncFunction } from '../models/AsyncFunction';

export default function syncroit<T, TReturn, TNext>(gen: GeneratorFunction | Generator<T, TReturn, TNext> | AsyncFunction | Function): Promise<any> {
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
                isGenerator(gen) && (function cb(value) {
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
            } catch (e) {
                if (process.listenerCount('uncaughtException')) {
                    return process.emit('uncaughtException', e);
                }
                throw e;
            }
        });

    } catch (e) {
        error && error('syncroit', e);
        throw e;
    }
}