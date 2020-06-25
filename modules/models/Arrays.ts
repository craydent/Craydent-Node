export { Yieldables } from '../models/Yieldables';
export { AllTypes, AnyObject, AnyObjects } from '../models/Generics';
export { ComparisonOperator } from '../models/ComparisonOperator';
export { ContainsObjectIterator, ContainsValue } from '../models/Contains'

export interface IndexedArray<T> extends Array<T> {
    [index: number]: T;
    __indexed_buckets?: {
        [key: string]: IndexedBucket
    }
}
export interface IndexedBucket { __bucket__keys: any[] }


export interface Documents<T> extends Array<T> {
    [index: number]: T;
    sample?: any[]
}
export interface UnwindOptions {
    path?: string;
    includeArrayIndex?: number;
    preserveNullAndEmptyArrays?: boolean;
}
export interface Meta {
    index: number;
    length: number;
    sample: any[];
    stop?: boolean;
}
export interface Stage {
    $project: any;
    $match: any;
    $redact: any;
    $limit: any;
    $skip: any;
    $unwind: any;
    $group: any;
    $sort: any;
    $out: any;
    $sample: any;
    $lookup: any;
}
export interface MongoPipelines {
    $project?: any;
    $match?: any;
    $redact?: any;
    $limit?: any;
    $skip?: any;
    $unwind?: any;
    $group?: any;
    $sample?: any;
    $sort?: any;
    $lookup?: any;
    $out?: any;
};
export type MongoReducer<T> = (key?: string, values?: T[]) => T;
export type MongoMapReduceOptions<T> = {
    sort?: string | any;
    query?: WhereCondition;
    limit?: number;
    finalize?: MongoFinalize<T>;
    out?: string;
};
export type MongoFinalize<T> = (key: string, value: T) => T;
export type MongoGroupFinalize<T> = (value: T) => T | void;
export type MongoSet = any;

export interface ExtendedArray extends Array<any> {
    [index: number]: any;
    items?: number;
}
export interface SearchRangeOptions {
    prop;
    condition;
    findIndex;
    startIndex;
    endIndex;
}
export interface CreateFuncOptions {
    ifblock?;
    projection?;
    _refs?;
    arr;
    limit;
    condition;
}

export type TreeParentFinder<T> = (value?: T) => boolean;
export type TreeChildFinder<T> = (value?: T) => boolean;
export type TreeOptions = { childProperty?: string; };
export type WhereCondition = any;
export type DeleteOptions = { justOne: boolean };
export type GroupOptions<T> = {
    key?: any,
    field?: any,
    condition?: string | any,
    cond?: string | any,
    reduce?: (current: any, accumulator: any) => void,
    initial?: any,
    keyf?: (doc: any) => string[] | string[],
    finalize?: MongoGroupFinalize<T>
};
export type ArrayIterator<T> = (obj: T, index?: number, objs?: T[]) => any

export interface Fields {
    [key: string]: boolean
}