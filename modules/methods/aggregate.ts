import error from './error';
import { Documents, MongoPipelines } from '../models/Arrays';
import { __processStage } from '../methods/where';

export default function aggregate<T, TResult>(arr: Documents<T>, pipelines: MongoPipelines[]): TResult[] {
    try {
        let rtn = arr, pipeline, i = 0, hasGroup = false;
        while (pipeline = pipelines[i++]) {
            if (pipeline["$group"]) { hasGroup = true; }
            rtn = __processStage(rtn, pipeline);
        }
        return rtn.sample && !hasGroup ? rtn.sample : rtn;
    } catch (e) {
        error && error("Array.aggregate", e);
        return [];
    }
}