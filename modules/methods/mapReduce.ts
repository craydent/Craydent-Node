
import error from '../methods/error';
import { ArrayIterator, MongoReducer, MongoMapReduceOptions } from '../models/Arrays';
import where from '../methods/where';
import sortBy from '../methods/sortBy';
import on from '../methods/on';
import removeAll from '../methods/removeAll';
import merge from '../methods/merge';
import duplicate from '../methods/duplicate';
import isArray from '../methods/isArray';
import isFunction from '../methods/isFunction';
import isString from '../methods/isString';

export default function mapReduce<T, TResult>(objs: T[], map: ArrayIterator<T>, reduce: MongoReducer<TResult>, options?: MongoMapReduceOptions<TResult>): TResult[] {
    try {
        options = options || {};
        let obj = {}, results = where(objs, options.query, null, options.limit), rtnArr = [], final = options.finalize;
        if (options.sort) {
            results = sortBy(results, options.sort);
        }
        on(map, 'emit', function (key, value) {
            obj[key] = obj[key] || [];
            obj[key].push(value);
        });
        for (let i = 0, len = results.length; i < len; i++) { map.call(results[i]) }
        for (let key in obj) {
            /* istanbul ignore if */
            if (!obj.hasOwnProperty(key)) { continue; }
            let reducedValue = reduce(key, obj[key]);
            if (isFunction(final)) { reducedValue = final(key, reducedValue); }
            rtnArr.push({ _id: key, value: reducedValue });
        }

        if (isString(options.out)) {
            global[options.out as string] = duplicate(rtnArr, true);
        } else if (isArray(options.out)) {
            removeAll(options.out as any);
            return merge(options.out, rtnArr);
        }
        return rtnArr;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.mapReduce", e);
        return [];
    }
}