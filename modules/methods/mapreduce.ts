
import error from '../methods/error';
import { ArrayIterator, MongoReducer, MongoMapReduceOptions } from '../models/Arrays';
import where from '../methods/where';
import sortBy from '../methods/sortby';
import on from '../methods/on';
import removeAll from '../methods/removeall';
import merge from '../methods/merge';
import duplicate from '../methods/duplicate';
import isArray from '../methods/isarray';
import isFunction from '../methods/isfunction';
import isString from '../methods/isstring';

export default function mapReduce<T, TResult>(objs: T[], map: ArrayIterator<T>, reduce: MongoReducer<TResult>, options?: MongoMapReduceOptions<TResult>): TResult[] {
    /*|{
        "info": "Array class extension to run map-reduce aggregation over records",
        "category": "Array",
        "parameters":[
            {"map": "(ArrayIterator<T, TResult>) Function to apply to each item"},
            {"reduce": "(MongoReducer<T>) Function used to condense the items"},
            {"options?": "(MongoMapReduceOptions<T, TResult>) Options specified in the Mongo Doc"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.mapReduce",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) returns the map reduced array."
    }|*/
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