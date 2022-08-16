import error from '../methods/error';
import { Documents, MongoPipelines } from '../models/Arrays';
import { __processStage } from '../methods/where';

export default function aggregate<T>(arr: Documents<T>, pipelines: MongoPipelines[]): Documents<T> {
    /*|{
        "info": "Array class extension to perform mongo style aggregation",
        "category": "Array",
        "featured": true,
        "parameters":[
                {"pipelines": "(Array<MongoPipelines>) Array of stages defined in mongodb. ($project, $match, $redact, $limit, $skip, $unwind, $group, $sample, $sort, $lookup, $out)"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.aggregate",
        "typeParameter": "<T>",
        "returnType": "(Documents<T>) returns an array of aggregates"
    }|*/
    try {
        let rtn = arr, pipeline, i = 0, hasGroup = false;
        while (pipeline = pipelines[i++]) {
            if (pipeline["$group"]) { hasGroup = true; }
            rtn = __processStage(rtn, pipeline) as Documents<T>;
        }
        return rtn.sample && !hasGroup ? rtn.sample : rtn;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.aggregate", e);
        return [];
    }
}