export interface IndexedArray<T> extends Array<T> {
    [index: number]: T;
    __indexed_buckets?: {
        [indexedProp: string]: IndexedBucket<T>;
    };
}
export interface IndexedBucket<T> {
    __bucket_keys: any[];
    [value: string]: T | any;
}
export interface Documents<T> extends Array<T> {
    [index: number]: T;
    sample?: any[];
}
export interface UnwindOptions {
    path?: string;
    includeArrayIndex?: string;
    preserveNullAndEmptyArrays?: boolean;
}
export interface Meta {
    index: number;
    length: number;
    sample: any[];
    stop?: boolean;
}
export interface Stage {
    $project?: any;
    $match?: any;
    $redact?: any;
    $limit?: any;
    $skip?: any;
    $unwind?: any;
    $group?: any;
    $sort?: any;
    $out?: any;
    $sample?: any;
    $lookup?: any;
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
}
export declare type MongoReducer<T> = (key?: string, values?: T[]) => T;
export declare type MongoMapReduceOptions<T> = {
    sort?: string | any;
    query?: WhereCondition;
    limit?: number;
    finalize?: MongoFinalize<T>;
    out?: string | Array<any>;
};
export declare type MongoFinalize<T> = (key: string, value: T) => T;
export declare type MongoGroupFinalize<T> = (value: T) => T | void;
export declare type MongoSet = any;
export interface ExtendedArray extends Array<any> {
    [index: number]: any;
    items?: number;
}
export interface SearchRangeOptions {
    condition: any;
    findIndex?: boolean;
}
export interface CreateFuncOptions {
    ifblock?: string | boolean;
    projection?: any;
    _refs?: any;
    arr: any[];
    limit: number;
    condition: any;
}
export declare type TreeParentFinder<T> = (value?: T) => boolean;
export declare type TreeChildFinder<T> = (value?: T) => boolean;
export declare type TreeOptions = { childProperty?: string; };
export declare type WhereCondition = any;
export declare type DeleteOptions = { justOne: boolean; };
export declare type GroupOptions<T> = {
    key?: any;
    field?: any;
    condition?: string | any;
    cond?: string | any;
    reduce?: (current: any, accumulator: any) => void;
    initial?: any;
    keyf?: string[] | ((doc: any) => string[]);
    finalize?: MongoGroupFinalize<T>;
};
export declare type ArrayIterator<T> = (obj: T, index?: number, objs?: T[]) => any;
export interface Fields {
    [key: string]: boolean | 0 | 1;
}
