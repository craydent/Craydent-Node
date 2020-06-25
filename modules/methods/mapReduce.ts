
import error from './error';
import { ArrayIterator, MongoReducer, MongoMapReduceOptions } from '../models/Arrays';
import where from './where';
import sortBy from './sortBy';
import on from './on';
import removeAll from './removeAll';
import merge from './merge';
import duplicate from './duplicate';
import isArray from './isArray';
import isFunction from './isFunction';
import isObject from './isObject';
import isString from './isString';

export default function mapReduce<T, TResult>(objs: T[], map: ArrayIterator<T>, reduce: MongoReducer<TResult>, options?: MongoMapReduceOptions<TResult>): TResult[] {
    try {
        options = options || {};
        let obj = {}, results = where(objs, options.query, null, options.limit), rtnArr = [], final = options.finalize;
        if (options.sort) {
            if (isObject(options.sort)) {
                let sortProps = [];
                for (let prop in options.sort) {
                    if (!options.sort.hasOwnProperty(prop)) { continue; }
                    if (options.sort[prop] == 1) { sortProps.push(prop); }
                    if (!~options.sort[prop]) { sortProps.push(`!${prop}`); }
                }
                results = sortBy(results, sortProps);
            } else {
                results = sortBy(results, options.sort);
            }
        }
        on(map, 'emit', function (key, value) {
            obj[key] = obj[key] || [];
            obj[key].push(value);
        });
        for (let i = 0, len = results.length; i < len; i++) { map.call(results[i]) }
        for (let key in obj) {
            if (!obj.hasOwnProperty(key)) { continue; }
            let reducedValue = reduce(key, obj[key]);
            if (isFunction(final)) { reducedValue = final(key, reducedValue); }
            rtnArr.push({ _id: key, value: reducedValue });
        }

        if (isString(options.out)) {
            global[options.out] = duplicate(rtnArr, true);
        } else if (isArray(options.out)) {
            removeAll(options.out as any);
            return merge(options.out, rtnArr);
        }
        return rtnArr;
    } catch (e) {
        error && error("Array.mapReduce", e);
        return [];
    }
}