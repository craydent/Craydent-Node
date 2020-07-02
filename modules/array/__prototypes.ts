import {
    TreeParentFinder,
    TreeChildFinder,
    TreeOptions,
    GroupOptions,
    IndexedArray,
    ArrayIterator,
    MongoReducer,
    MongoMapReduceOptions,
    ContainsObjectIterator,
    ContainsValue,
    ComparisonOperator,
    WhereCondition,
    DeleteOptions,
    Fields,
    AnyObject,
    Documents,
    MongoPipelines,
    AnyObjects,
    MongoSet,
    Yieldables,
} from '../models/Arrays';
import * as IAdd from '../methods/add';
import * as IAggregate from '../methods/aggregate';
import * as IAverage from '../methods/average';
import * as IBuildTree from '../methods/buildTree';
import * as IDeleteIt from '../methods/delete';
import * as IDistinct from '../methods/distinct';
import * as ICondense from '../methods/condense';
import * as IContains from '../methods/contains';
import * as ICount from '../methods/count';
import * as ICreateIndex from '../methods/createIndex';
import * as IEquals from '../methods/equals';
import * as IEvery from '../methods/every';
import * as IFilter from '../methods/filter';
import * as IFind from '../methods/find';
import * as IFindOne from '../methods/findOne';
import * as IGetValue from '../methods/getValue';
import * as IGroup from '../methods/group';
import * as IIndexOfAlt from '../methods/indexOfAlt';
import * as IInnerJoin from '../methods/innerJoin';
import * as IInsert from '../methods/insert';
import * as IInsertAfter from '../methods/insertAfter';
import * as IInsertAt from '../methods/insertAt';
import * as IInsertBefore from '../methods/insertBefore';
import * as IIsEmpty from '../methods/isEmpty';
import * as IIsSubset from '../methods/isSubset';
import * as IJoinLeft from '../methods/joinLeft';
import * as IJoinRight from '../methods/joinRight';
import * as ILast from '../methods/last';
import * as ILimit from '../methods/limit';
import * as IMap from '../methods/map';
import * as IMapReduce from '../methods/mapReduce';
import * as INormalize from '../methods/normalize';
import * as IParallelEach from '../methods/parallelEach';
import * as IRemove from '../methods/remove';
import * as IRemoveAll from '../methods/removeAll';
import * as IRemoveAt from '../methods/removeAt';
import * as IReplaceAt from '../methods/replaceAt';
import * as IScramble from '../methods/scramble';
import * as ISortBy from '../methods/sortBy';
import * as IStdev from '../methods/stdev';
import * as ISum from '../methods/sum';
import * as IToSet from '../methods/toSet';
import * as IUpdate from '../methods/update';
import * as IUniversalTrim from '../methods/universalTrim';
import * as IUpsert from '../methods/upsert';
import * as IWhere from '../methods/where';
import { _containsMod, _containsType } from '../protected/_containsComparisons';

//#region dependencies
const add: typeof IAdd.default = require('../methods/add');
const aggregate: typeof IAggregate.default = require('../methods/aggregate');
const average: typeof IAverage.default = require('../methods/average');
const buildTree: typeof IBuildTree.default = require('../methods/buildTree');
const condense: typeof ICondense.default = require('../methods/condense');
const contains: typeof IContains.default = require('../methods/contains');
const count: typeof ICount.default = require('../methods/count');
const createIndex: typeof ICreateIndex.default = require('../methods/createIndex');
const deleteIt: typeof IDeleteIt.default = require('../methods/delete');
const distinct: typeof IDistinct.default = require('../methods/distinct');
const equals: typeof IEquals.default = require('../methods/equals');
const filter: typeof IFilter.default = require('../methods/filter');
const find: typeof IFind.default = require('../methods/find');
const findOne: typeof IFindOne.default = require('../methods/findOne');
const every: typeof IEvery.default = require('../methods/every');
const getValue: typeof IGetValue.default = require('../methods/getValue');
const group: typeof IGroup.default = require('../methods/group');
const indexOfAlt: typeof IIndexOfAlt.default = require('../methods/indexOfAlt');
const innerJoin: typeof IInnerJoin.default = require('../methods/innerJoin');
const insert: typeof IInsert.default = require('../methods/insert');
const insertAfter: typeof IInsertAfter.default = require('../methods/insertAfter');
const insertAt: typeof IInsertAt.default = require('../methods/insertAt');
const insertBefore: typeof IInsertBefore.default = require('../methods/insertBefore');
const isEmpty: typeof IIsEmpty.default = require('../methods/isEmpty');
const isSubset: typeof IIsSubset.default = require('../methods/isSubset');
const joinLeft: typeof IJoinLeft.default = require('../methods/joinLeft');
const joinRight: typeof IJoinRight.default = require('../methods/joinRight');
const last: typeof ILast.default = require('../methods/last');
const limit: typeof ILimit.default = require('../methods/limit');
const map: typeof IMap.default = require('../methods/map');
const mapReduce: typeof IMapReduce.default = require('../methods/mapReduce');
const normalize: typeof INormalize.default = require('../methods/normalize');
const parallelEach: typeof IParallelEach.default = require('../methods/parallelEach');
const remove: typeof IRemove.default = require('../methods/remove');
const removeAll: typeof IRemoveAll.default = require('../methods/removeAll');
const removeAt: typeof IRemoveAt.default = require('../methods/removeAt');
const replaceAt: typeof IReplaceAt.default = require('../methods/replaceAt');
const scramble: typeof IScramble.default = require('../methods/scramble');
const sortBy: typeof ISortBy.default = require('../methods/sortBy');
const stdev: typeof IStdev.default = require('../methods/stdev');
const sum: typeof ISum.default = require('../methods/sum');
const toSet: typeof IToSet.default = require('../methods/toSet');
const universalTrim: typeof IUniversalTrim.default = require('../methods/universalTrim');
const update: typeof IUpdate.default = require('../methods/update');
const upsert: typeof IUpsert.default = require('../methods/upsert');
const where: typeof IWhere.default = require('../methods/where');
//#endregion

export function _add(this: any[], item: any): boolean {
    /*|{
        "info": "Array class extension to perform push and update indexes if used",
        "category": "Array",
        "featured": true,
        "parameters":[
            {"value": "(Object) value to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.add",
        "typeParameter": "",
        "returnType": "(Bool) Value to indicate success or failure"
    }|*/
    return add(this, item);
}
export function _aggregate<T>(this: Documents<T>, pipelines: MongoPipelines[]): Documents<T> {
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
    return aggregate(this, pipelines);
}
export function _average(this: number[],): number {
    /*|{
        "info": "Array class extension to perform average of all the values (any value which is not a number is skipped).",
        "category": "Array",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.aggregate",
        "typeParameter": "",
        "returnType": "(number)"
    }|*/
    return average(this);
}
export function _buildTree<T, TResult>(this: T[], parentFinder: TreeParentFinder<T>, childFinder: string | TreeChildFinder<T>, options?: TreeOptions): TResult[] {
    /*|{
        "info": "Array class extension to create a parent/child hierarchy",
        "category": "Array",
        "parameters":[
            {"parentFinder": "(TreeParentFinder<T>) Function to determine the parent.  Should return a boolean value and is passed the current item as an argument."},
            {"childFinder": "(String|TreeChildFinder<T>) Property name of the object to use as a grouping."},
            {"options?":"(TreeOptions) Options to customize properties,  Valid property is:<br />childProperty"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.buildTree",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) returns a hierarchical array."
    }|*/
    return buildTree(this, parentFinder, childFinder, options);
}
export function _condense(this: any[], check_values?: boolean): any[] {
    /*|{
        "info": "Array class extension to reduce the size of the Array removing blank strings, undefined's, and nulls",
        "category": "Array",
        "parameters":[
            {"check_values?": "(Bool) Set this flag to remove duplicates"}
        ],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns a condensed version of the array."
    }|*/
    return condense(this, check_values);
}
export function _contains<T, TValue>(this: T[], func: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, func: ContainsObjectIterator<T, TValue>): boolean;
export function _contains<T, TValue>(this: T[], val: ContainsValue, operator: ComparisonOperator): boolean;
export function _contains<T, TValue>(this: T, val: ContainsValue, func: ContainsObjectIterator<T, TValue>): boolean;
export function _contains(this: string, val: ContainsValue): boolean;
export function _contains(this: number, val: ContainsValue): boolean;
export function _contains(val, func?) {
    /*|{
        "info": "Object class extension to check if value exists",
        "category": "Array|Object",
        "parameters":[
            {"val": "(ContainsValue|ContainsObjectIterator<T, TValue>) Value to check or custom function to determine validity"}],

        "overloads":[
            {"parameters":[
                {"val": "(ContainsValue) Value to check"},
                {"func": "(ContainsIterator<T>) Callback function used to do the comparison"}]},
            {"parameters":[
                {"val": "(ContainsValue) Value to check"},
                {"func": "(ComparisonOperator) String indicating logical operator (\"$lt\"|\"$lte\"|\"$gt\"|\"$gte\"|\"$mod\"|\"$type\")" }]},
            {"parameters":[
                {"arr": "(Array<ContainsValue>) Array of values to return first matching value"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.contains",
        "typeParameter": "<T, TValue>",
        "returnType": "(Bool) returns if there was a match."
    }|*/
    return contains(this, val, func);
}
export function _count(this: AnyObject): number;
export function _count(this: AnyObjects, option?: WhereCondition): number;
export function _count(this: string[], option?: string | RegExp): number;
export function _count(this: string, option?: string | RegExp): number;
export function _count(option?): number {
    /*|{
          "info": "Object class extension to count the properties in the object/elements in arrays/characters in strings.",
          "category": "Array|Object",
          "parameters":[],

          "overloads":[
              {"parameters":[
                  {"option": "(WhereCondition) Query used in Array.where when counting elements in an Array"}]},

              {"parameters":[
                  {"option": "(String) Word or phrase to count in the String"}]},

              {"parameters":[
                  {"option": "(RegExp) Word or phrase pattern to count in the String"}]}],

          "url": "http://www.craydent.com/library/1.9.3/docs#object.count",
          "typeParameter": "<T>",
          "returnType": "(Int | NaN) returns the count"
      }|*/
    return count(this, option);
}
export function _createIndex<T>(this: T[], indexes: string | string[]): IndexedArray<T> | boolean {
    /*|{
        "info": "Array class extension to create indexes for faster searches during where",
        "category": "Array",
        "parameters":[
            {"properties": "(string) Property or comma delimited property list to index."}],

        "overloads":[
            {"parameters":[
                {"indexes": "(Array<string>) Array of properties to index"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.condense",
        "typeParameter": "<T>",
        "returnType": "(Array<T> | Bool) returns the Array<T> if successfull otherwise false."
    }|*/
    return createIndex(this, indexes);
}
export function _delete<T>(this: T[], condition, justOne?: DeleteOptions): T[] {
    /*|{
        "info": "Array class extension to delete records",
        "category": "Array",
        "defaults": {
            "justOne": true
        },
        "parameters":[
            {"condition": "(WhereCondition) Query following find/where clause syntax"},
            {"justOne?": "(Bool) Flag for deleting just one records [Default is: true]"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.delete",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns a list of the deleted objects."
    }|*/
    return deleteIt(this, condition, justOne);
}
export function _distinct<T>(this: T[], fields: string | string[], condition?: WhereCondition | string): T[] {
    /*|{
        "info": "Array class extension to get all unique records by fields specified",
        "category": "Array",
        "parameters":[
            {"fields": "(String|Array<String>) Fields to use as the projection and unique comparison (comma delimited) or array of fields"},
            {"condition?": "(String|WhereCondition) Query following SQL where clause syntax"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.distinct",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns an array with distinct values"
    }|*/
    return distinct(this, fields, condition);
}
export function _equals(this: any[], compare: any, props?: string[]): boolean;
export function _equals(this: any[], compare: any): boolean;
export function _equals(compare, props?): boolean {
    /*|{
           "info": "Object class extension to check if object values are equal",
           "category": "Array|Object",
           "parameters":[
               {"compare": "(any) Object to compare against"},
               {"props?": "(Array<string>) Array of property values to compare against"}],

           "overloads":[],

           "url": "http://www.craydent.com/library/1.9.3/docs#object.equals",
           "typeParameter": "",
           "returnType": "(Bool | undefined) returns if the the two arrays have equivalent values"
       }|*/
    return equals(this, compare, props);
}
export function _every<T>(this: T[], callback: ArrayIterator<T>, thisObject?: any): boolean {
    /*|{
        "info": "Array class extension to implement .every method",
        "category": "Array",
        "parameters":[
            {"callback": "(ArrayIterator<T>) Callback to test for each element. Callback will get the current item, index, context as arguments."},
            {"thisObject?": "(any) Context for the callback function"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.every",
        "typeParameter": "<T>",
        "returnType": "(Bool)"
    }|*/
    return every(this, callback, thisObject);
}
export function _filter<T>(this: T[], callback: ArrayIterator<T>, context?: any): T[] {
    /*|{
        "info": "Array class extension to implement filter",
        "category": "Array",
        "parameters":[
            {"func": "(ArrayIterator<T>) Callback function used to determine if value should be returned. Callback will get the current item, index, context as arguments."},
            {"thiss?": "(any) Specify the context on callback function"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.filter",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    return filter(this, callback, context);
}
export function _find<T>(this: T[], condition: WhereCondition | string, projection?: string | Fields | boolean): T[] {
    /*|{
        "info": "Array class extension to use mongo or sql queries (Alias of Where minus the limit argument)",
        "category": "Array",
        "featured": true,
        "parameters":[
            {"condition": "(WhereCondition | string) Query following find/where clause syntax"}],

        "overloads":[
            {"parameters":[
                {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                {"projection": "(Fields | string) Indicate which properties to return"}]},

            {"parameters":[
                {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                {"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    return find(this, condition, projection);
}
export function _findOne<T>(this: T[], condition: WhereCondition | string, projection?: string | Fields | boolean): T {
    /*|{
        "info": "Array class extension to use mongo or sql queries returning the first item match",
        "category": "Array",
        "featured": true,
        "parameters":[
            {"condition": "(WhereCondition | string) Query following find/where clause syntax"}],

        "overloads":[
            {"parameters":[
                {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                {"projection": "(Fields | string) Indicate which properties to return"}]},

            {"parameters":[
                {"condition": "(WhereCondition | string) Query following find/where clause syntax"},
                {"useReference": "(Bool) Flag to make a copy instead of using references"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
        "typeParameter": "<T>",
        "returnType": "(T)"
    }|*/
    return findOne(this, condition, projection);
}
export function _getValue(this: any[], args?: any[], dflt?: any): any {
    /*|{
        "info": "Object class extension to retrieve value of an object property",
        "category": "Array|Object",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"default": "(any) Default value to return if context is not a function"}]},

            {"parameters":[
                {"arguments": "(any[]) An array of arguments to pass to context when it is a function"},
                {"default": "(any) Default value to return if context is not a function"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.getValue",
        "typeParameter": "<T>",
        "returnType": "(any) the value of any type.  if the type is a method, it will execute the methed and use its return value."
    }|*/
    return getValue(this, args, dflt);
}
export function _group<T>(this: T[], params: GroupOptions<T>, removeProps: boolean): T[] {
    /*|{
        "info": "Array class extension to group records by fields",
        "category": "Array",
        "parameters":[
            {"params": "(GroupOptions<T>) specs with common properties:<br />(Object) key<br />(Object | string) condition<br />(Function) reduce<br />(Object) initial<br />(Array<string> | Function) keyf<br />(Function) finalize"},
            {"removeProps?": "(Bool) Flag to preserve property if the value is null or undefined."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.group",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    return group(this, params, removeProps);
}
export function _indexOfAlt<T>(this: any[], value: any, callback: ArrayIterator<T>): number;
export function _indexOfAlt(this: any[], regex: RegExp, pos: number): number;
export function _indexOfAlt(value, option): number {
    /*|{
        "info": "Array class extension to find index of a value based on a callback function & String class extension to find the index based on a regular expression",
        "category": "Array",
        "parameters":[
            {"value": "(any) value to find"},
            {"func": "(ArrayIterator<T, TResult>) Callback function used to do the comparison"}],

        "overloads":[
            {"parameters":[
                {"regex": "(RegExp) Regular expression to check value against"},
                {"pos?": "(Int) Index offset to start"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.indexOfAlt",
        "typeParameter": "<T, TResult>",
        "returnType": "(Int) returns the index of the item that matches or -1. "
    }|*/
    return indexOfAlt(this, value, option);

}
export function _innerJoin<T, R, TResult>(this: T[], arr: R[], on: string): TResult[] {
    /*|{
        "info": "Array class extension to do an inner join on arrays",
        "category": "Array",
        "parameters":[
            {"arr": "(Array<T>) Array to be joined with"},
            {"on": "(String) Condition to join on"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.innerJoin",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) resulting array of the join."
    }|*/
    return innerJoin(this, arr, on);
}
export function _insert(this: any[], value: any): boolean {
    return insert(this, value);
}
export function _insertAfter(this: any[], index: number, value: any): boolean {
    /*|{
        "info": "Array class extension to add to the array after a specific index",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index to add after"},
            {"value": "(any) Value to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.insertAfter",
        "typeParameter": "<T>",
        "returnType": "(Bool) returns true for success and false for failure."
    }|*/
    return insertAfter(this, index, value);
}
export function _insertAt(this: any[], index: number, value: any): boolean {
    /*|{
        "info": "Array class extension to add to the array at a specific index and push the all indexes down",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index to add after"},
            {"value": "(any) Value to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.insertAt",
        "typeParameter": "<T>",
        "returnType": "(Bool) returns true for success and false for failure."
    }|*/

    return insertAt(this, index, value);
}
export function _insertBefore(this: any[], index: number, value: any): boolean {
    /*|{
        "info": "Array class extension to add to the array before a specific index",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index to add before"},
            {"value": "(any) Value to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.insertBefore",
        "typeParameter": "<T>",
        "returnType": "(Bool) returns true for success and false for failure."
    }|*/
    return insertBefore(this, index, value);
}
export function _isEmpty(this: any[]): boolean {
    /*|{
        "info": "Array class extension to check if it is empty",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.isEmpty",
        "typeParameter": "",
        "returnType": "(Bool) returns true if the array is empty, otherwise false."
    }|*/
    return isEmpty(this);
}
export function _isSubset<T, R>(this: T[], compare: R[], sharesAny?: boolean): boolean;
export function _isSubset<T, R>(this: T, compare: R, sharesAny?: boolean): boolean;
export function _isSubset(compare, sharesAny?): boolean {
    /*|{
        "info": "Object class extension to check if item is a subset",
        "category": "Array|Object",
        "parameters":[
            {"compare": "(Array<T>|Object) Superset to compare against"}],

        "overloads": [],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isSubset",
        "typeParameter": "<R>",
        "returnType": "(Bool) returns true if the array is a subset, otherwise false."
    }|*/

    return isSubset(this, compare, sharesAny);
}
export function _joinLeft<T, R, TResult>(this: T[], arr: R[], on: string): TResult[] {
    /*|{
        "info": "Array class extension to do an outer left join on arrays",
        "category": "Array",
        "parameters":[
            {"arr": "(Array<T>) Secondary array to be joined with"},
            {"on": "(String) Condition to join on"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.joinLeft",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) resulting array of the join."
    }|*/
    return joinLeft(this, arr, on);
}
export function _joinRight<T, R, TResult>(this: T[], arr: R[], on: string): TResult[] {
    /*|{
        "info": "Array class extension to do an outer right join on arrays",
        "category": "Array",
        "parameters":[
            {"arr": "(Array<T>) Secondary array to be joined with"},
            {"on": "(String) Condition to join on"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.joinRight",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) resulting array of the join."
    }|*/
    return joinRight(this, arr, on);
}
export function _last<T>(this: any[]): T {
    /*|{
        "info": "Array class extension to retrieve the last item in the array.",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.last",
        "typeParameter": "<T>",
        "returnType": "(T) returns the last item in the array."
    }|*/
    return last(this);
}
export function _limit<T>(this: any[], max: number, skip?: number): T[] {
    /*|{
        "info": "Array class extension to return a limited amount of items",
        "category": "Array",
        "parameters":[
            {"max": "(Int) Maximum number of items to return"},
            {"skip?": "(Int) Number of items to skip"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.limit",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns the first n items in the array."
    }|*/
    return limit(this, max, skip);
}
export function _map<T>(this: any[], callback: ArrayIterator<T>, context: any): T[] {
    /*|{
        "info": "Array class extension to implement map",
        "category": "Array",
        "parameters":[
            {"callback": "(ArrayIterator<T, TResult>) Callback function used to apply changes"},
            {"thisObject?": "(any) Specify the context on callback function"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.map",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) returns the resulting array."
    }|*/
    return map(this, callback, context);
}
export function _mapReduce<T, TResult>(this: T[], map: ArrayIterator<T>, reduce: MongoReducer<TResult>, options: MongoMapReduceOptions<TResult>): TResult[] {
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
    return mapReduce(this, map, reduce, options);
}
export function _normalize(this: AnyObjects) {
    /*|{
        "info": "Array class extension to normalize all properties in the object array",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.normalize",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) returns a normalized version of the objects."
    }|*/
    return normalize(this);
}
export function _parallelEach(this: any[], args: any[]): Promise<any[]>;
export function _parallelEach(this: any[], gen: Yieldables, args?: any[]): Promise<any[]>;
export function _parallelEach(this: Yieldables[]): Promise<any[]>;
export function _parallelEach(gen?, args?): Promise<any[]> {
    /*|{
        "info": "Array class extension to execute each array item in parallel or run each item against a generator/function in parallel",
        "category": "Array|Control Flow",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"gen": "(GeneratorFunction) Generator function to apply to each item"}]},

            {"parameters":[
                {"func": "(ArrayIterator<T, TResult>) Function to apply to each item"}]},

            {"parameters":[
                {"args": "(Array<T>) Argument array to apply to pass to generator or function (only should be used when the array contains generators, promises, or functions)"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.parallelEach",
        "typeParameter": "<T, TResult>",
        "returnType": "(Promise<Array<T>>) returns a promise of the resulting items in the array."
    }|*/
    return parallelEach(this, gen, args);
}
export function _remove<T>(this: T[], value: any, indexOf?: ArrayIterator<T>): T | boolean {
    /*|{
        "info": "Array class extension to remove an item by value",
        "category": "Array",
        "parameters":[
            {"value": "(any) Value to remove"},
            {"indexOf?": "(ArrayIterator<T>) Callback function to use to find the item based on the value"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.remove",
        "typeParameter": "<T>",
        "returnType": "(T | undefined) returns the removed item."
    }|*/
    return remove(this, value, indexOf);
}
export function _removeAll<T>(this: T[], value: any, indexOf?: ArrayIterator<T>): T[] | boolean {
    /*|{
        "info": "Array class extension to remove all items by value",
        "category": "Array",
        "parameters":[
            {"value?": "(any) Value to remove"},
            {"indexOf?": "(IndexOf<T>) Callback function to use to find the item based on the value"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAll",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns an array of all the removed items."
    }|*/
    return removeAll(this, value, indexOf);
}
export function _removeAt<T>(this: T[], index: number): T | boolean {
    /*|{
        "info": "Array class extension to remove item at a specific index",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index of the item to remove"}],

        "overloads": [],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.removeAt",
        "typeParameter": "<T>",
        "returnType": "(T | undefined) returns the removed item."
    }|*/
    return removeAt(this, index);
}
export function _replaceAt<T>(this: T[], index: number, value: T): T {
    /*|{
        "info": "Array class extension to replace item at a specific index",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index of the item to remove"},
            {"value": "(any) Value to replace with"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.replaceAt",
        "typeParameter": "<T>",
        "returnType": "(T | undefined) returns the item removed."
    }|*/
    return replaceAt(this, index, value);
}
export function _scramble(this: any[]): any[] {
    /*|{
        "info": "Array class extension to scramble the order.",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.scramble",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    return scramble(this);
}
export function _sortBy<T>(props: string | string[], rev?: boolean, primer?: ISortBy.SortPrimer<T>, lookup?, options?: ISortBy.SortOptions): T[] {
    /*|{
        "info": "Array class extension to sort the array",
        "category": "Array",
        "parameters":[
            {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"}],

        "overloads":[
            {"parameters":[
                {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"}]},

            {"parameters":[
                {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"}]},

            {"parameters":[
                {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"}]},

            {"parameters":[
                {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."}]},

            {"parameters":[
                {"props": "(Array<String>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."}]},

            {"parameters":[
                {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."}]},

            {"parameters":[
                {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."}]},

            {"parameters":[
                {"props": "(string) Property/Comma delimited list of properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."},
                {"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]},

            {"parameters":[
                {"props": "(Array<string>) Properties to sort by. If the first character is '!', the sort order is reversed"},
                {"rev": "(Bool) Flag to reverse the sort"},
                {"primer": "(SortPrimer<T>|null|undefined) Function to apply to values in the array."},
                {"lookup": "(Object) Look up object to use as values instead of the array values."},
                {"options": "(Object) Options to pass. Valid options are:<br />i<br />ignoreCase"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.sortBy",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    return sortBy(this, props, rev, primer, lookup, options);
}
export function _stdev(this: number[]): number {
    /*|{
        "info": "Array class extension to perform standard deviation (any value which is not a number is 0).",
        "category": "Array",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.stdev",
        "typeParameter": "<T>",
        "returnType": "(number | NaN) returns the standard deviation of the array of numbers"
    }|*/
    return stdev(this);
}
export function _sum(this: number[]): number {
    /*|{
        "info": "Array class extension to perform summation of all the values (any value which is not a number is 0).",
        "category": "Array",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.sum",
        "typeParameter": "<T>",
        "returnType": "(number | NaN) returns the sum of the array of numbers"
    }|*/
    return sum(this);
}
export function _toSet<T>(this: any[]): Set<T> {
    /*|{
        "info": "Array class extension to convert the array to a set",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.toSet",
        "typeParameter": "<T>",
        "returnType": "(Set<T>) returns a Set from the array Values"
    }|*/

    return toSet(this);
}
export function _trim(this: string[], chars?: string | string[], ref?: boolean): string[] {
    /*|{
        "info": "Array class extension to remove all white space/chars from the beginning and end of all string values in the array.",
        "category": "Array",
        "parameters":[
            {"character?": "(Char[]) Character to remove in the String"},
            {"ref?":"(Bool) Whether or not to mutate the original array."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#Array.trim",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) returns the trimmed version of the array."
    }|*/
    return universalTrim(this, chars, ref);
}
export function _update<T>(this: T[], condition: WhereCondition, setClause: MongoSet, options?: IUpdate.UpdateOptions): T[] {
    /*|{
        "info": "Array class extension to update records in the array",
        "category": "Array",
        "parameters":[
            {"condition": "(WhereCondition) Query following find/where clause syntax"},
            {"setClause": "(MongoSet) Set clause used to update the records"},
            {"options?": "(UpdateOptions) Options to specify if mulit update and/or upsert"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.update",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    return update(this, condition, setClause, options);
}
export function _upsert<T>(this: T[], records: T[] | T): IUpsert.UpsertResults<T>;
export function _upsert<T>(this: T[], records: T[] | T, callback: IUpsert.UpsertIterator<T>): IUpsert.UpsertResults<T>;
export function _upsert<T>(this: T[], records: T[] | T, prop: string, callback?: IUpsert.UpsertIterator<T>): IUpsert.UpsertResults<T>;
export function _upsert<T>(records, prop?, callback?): IUpsert.UpsertResults<T> {
    /*|{
        "info": "Array class extension to upsert records to array",
        "category": "Array",
        "parameters":[
            {"records": "(Array<T>|T) Record(s) to use to insert/update array"}],

        "overloads":[
            {"parameters":[
                {"records": "(Array<T>|T) Records to use to insert/update array"},
                {"callback": "(UpsertIterator<T>) Method to use to determine if the records are equal"}]},

            {"parameters":[
                {"records": "(Array<T>|T) Records to use to insert/update array"},
                {"prop": "(string) Property to use as the primary key"},
                {"callback?": "(UpsertIterator<T>) Method to use to determine if the records are equal"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.upsert",
        "typeParameter": "<T>",
        "returnType": "(UpsertResult<T>) returns the information for resulting operation."
    }|*/
    return upsert(this, records, prop, callback);
}
export function _where<T>(this: AnyObjects, condition?: IWhere.MongoQuery, limit?: number): T[];
export function _where<T>(this: AnyObjects, condition?: IWhere.MongoQuery, useReference?: boolean, limit?: number): T[];
export function _where<T>(this: AnyObjects, condition?: IWhere.MongoQuery, projection?: any, limit?: number): T[];
export function _where<T>(condition?, projection?, limit?): T[] {
    /*|{
        "info": "Array class extension to use mongo or sql queries",
        "category": "Array",
        "featured": true,
        "parameters":[
            {"condition": "(WhereCondition) Query following mongo find/where clause syntax"}],

        "overloads":[
            {"parameters":[
                {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                {"limit": "(number) Limit the number of the results returned."}]},

            {"parameters":[
                {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                {"projection": "(Object) Indicate which properties to return"}]},

            {"parameters":[
                {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                {"useReference": "(Bool) Flag to make a copy instead of using references"}]},

            {"parameters":[
                {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                {"projection": "(Object) Indicate which properties to return"},
                {"limit": "(Int) Limit the number of the results returned."}]},

            {"parameters":[
                {"condition": "(WhereCondition) Query following mongo find/where clause syntax"},
                {"useReference": "(Bool) Flag to make a copy instead of using references"},
                {"limit": "(Int) Limit the number of the results returned."}]},


            {"parameters":[
                {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                {"limit": "(number) Limit the number of the results returned."}]},

            {"parameters":[
                {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                {"projection": "(Object) Indicate which properties to return"}]},

            {"parameters":[
                {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                {"useReference": "(Bool) Flag to make a copy instead of using references"}]},

            {"parameters":[
                {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                {"projection": "(Object) Indicate which properties to return"},
                {"limit": "(Int) Limit the number of the results returned."}]},

            {"parameters":[
                {"condition": "(WhereIterator<T>) The funciton invoked per iteration."},
                {"useReference": "(Bool) Flag to make a copy instead of using references"},
                {"limit": "(Int) Limit the number of the results returned."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.where",
        "typeParameter": "<T>",
        "returnType": "(Array<T>) returns a filtered subset of the array."
    }|*/
    return where(this, condition, projection, limit);

}