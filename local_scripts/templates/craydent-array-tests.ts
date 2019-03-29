import * as $c from '@craydent/craydent-array/noConflict';

interface AbcObject {
    a: number;
    b: string;
    c: boolean;
}
interface AbObject {
    a: number;
    b: string;
}
interface AbcdObject {
    a: number;
    b?: string;
    c?: boolean;
    d?: {
        da: number;
    };
    date?: Date;
    array: Array<any>;
}
interface RedactObject {
    tags: string[];
    subsections: { tags:string[] }[];
}
interface UnwindObject {
    fk: number;
    sizes: string[];
}
interface UnwoundObject {
    sizes: string;
    ind?: number;
}
interface LookUpObject extends AbcObject {
    sub: UnwoundObject[];
}
interface GroupObject {
    _id:number;
    totalPrice:number;
    averageQuantity:number;
    count:number;
    f?:string;
    l?:string;
    max?:number;
    min?:number;
    pushed?:string[];
    theset?:string[];
    stdsamp?:number;
    stdpop?:number;
}
interface TreeObject {
    id: number;
    share: string;
    index?: number;
    odd?: boolean;
    children?: any[];
    cc?: any[];
}
interface UpsertObject {
    insertedIndexes:number[];
    updatedIndexes:number[];
    unchangedIndexes:number[];
    inserted: object[];
    updated:object[];
    unchanged:object[];
}
let redact: RedactObject[] = [{
    tags : [ "G", "STLW" ],
    subsections : [
        {
            tags : [ "SI", "G" ]
        },
        {
            tags : [ "STLW" ]
        },
        {
            tags: [ "TK" ]
        }
    ]
}];
let abc = [{a:1,b:"",c:true}];
let abcd = [{a:1,b:"",c:true,d:{da:1}, array:[]}];
let whereElemMatch: AbcdObject[] = [{a:1,b:"",c:true,d:{da:1}, array:[{bb:'hi'}]}];
let unwind = [{ fk: 1, sizes: [ "S", "M", "L"] }];
let group = [{id:1,p:"10",share:"shared", index: 10,std:4}];
let tree = [
    {id:1,share:"shared", index: 10},
    {id:2,share:"shared", index : 20},
    {id:3,share:"shared", index: 30},
    {id:4,share:"shared", odd:false},
    {id:5,share:"shared1", odd:true}
];
var reduceFunction1 = function(a:any) {
    return $c.sum(a);
};
var mapFunction1 = function(this:AbcObject) {
    $c.emit(this.b, this.a);
};


// /*********
//  * Array *
//  *********/
// $c.aggregate
{
    // $project
    $c.aggregate(abc,[{$project:{a:1,b:1,c:1}}]); // $ExpectType AbcObject[]
    $c.aggregate(abc,[{$project:{b:1,c:1,a:{$multiply:['$a',10]}}}]); // $ExpectType AbcObject[]
    $c.aggregate(abc,[{$project:{a:1,b:1}}]); // $ExpectType AbObject

    // $match
    $c.aggregate(abc,[{$match:{a:1}}]); // $ExpectType AbcObject[]

    // $redact
    $c.aggregate(redact,[{
        $redact:{
            $cond: {
                if: { $gt: [ { $size: { $setIntersection: [ "$tags", [ "STLW", "G" ] ] } }, 0 ] },
                then: "$$KEEP",
                else: "$$PRUNE"
            }
        }
    }]); // $ExpectType RedactObject[]
    $c.aggregate(redact,[{$redact:{
        $cond: {
            if: { $gt: [ { $size: { $setIntersection: [ "$tags", [ "STLW", "G" ] ] } }, 0 ] },
            then: "$$DESCEND",
            else: "$$PRUNE"
        }
    }}]); // $ExpectType RedactObject[]

    // $limit
    $c.aggregate([abc],[{$limit:1}]);  // $ExpectType AbcObject[]

    // $skip
    $c.aggregate(abc.concat(abc, abc, abc),[{$skip:3}]);  // $ExpectType AbcObject[]

    // $unwind
    $c.aggregate(unwind,[{ $unwind : "$sizes" }]); // $ExpectType UnwoundObject[]
    $c.aggregate(unwind,[{ $unwind : {path:"$sizes",preserveNullAndEmptyArrays:true} }]); // $ExpectType UnwoundObject[]
    $c.aggregate(unwind,[{ $unwind : {path:"$sizes",preserveNullAndEmptyArrays:true,includeArrayIndex:"ind"} }]); // $ExpectType UnwoundObject[]

    // $group & $sample
    $c.aggregate(group,[
        {$sample:{size: 4}},
        {$group: {
            _id: null,
            count: {$sum: 1},
            averageQuantity: {$avg: "index"},
            totalPrice: {$sum: {$multiply: ["$id", "$index"]}},
            f: {$first: "$p"},
            l: {$last: "$p"},
            max: {$max:'$index'},
            min: {$min:'$index'},
            pushed:{$push:"$share"},
            theset:{$addToSet:"$share"},
            stdsamp:{$stdDevSamp:"$std"},
            stdpop:{$stdDevPop:"$std"}
    }}]); // $ExpectType GroupObject[]

    // $sample
    $c.aggregate(abc,[{$sample: { size: 1}}]); // $ExpectType AbcObject[]

    // $sort
    $c.aggregate(abc,[{$sort: { a: -1, b: 1}}]); // $ExpectType AbcObject[]

    // $lookup
    $c.aggregate(abc,[{$lookup: {from:unwind,localField:"a",foreignField:"fk",as:"sub"}}]); // $ExpectType LookUpObjec[]

    // $out
    var arrOut: AbcObject[] = [];
    $c.aggregate(group,[
        {$group: {
            _id: null,
            count: {$sum: 1},
            averageQuantity: {$avg: "index"},
            totalPrice: {$sum: {$multiply: ["$id", "$index"]}},
        }},{$out:arrOut}]);
    arrOut; // $ExpectType GroupObject[]

}

// $c.average
{
    $c.average([1,{},"adsf",10]); // $ExpectType number
}

// $c.buildTree
{
    // childFinder:string
    $c.buildTree(tree, item => { return !item.index; }, 'share'); // $ExpectType TreeObject[]

    // childFinder: string with options
    $c.buildTree(tree, item => { return !item.index; }, 'share', {childProperty:"cc"}); // $ExpectType TreeObject[]

    // childFinder: function
    $c.buildTree(tree, item => { return item.odd !== undefined }, item => { return !!(item.id%2); }, {childProperty: "cc"}); // $ExpectType TreeObject[]
}

// $c.condense
{
    $c.condense(['a','','b',0,'c',false,'d',null,'e',undefined]); // $ExpectType any[]
    $c.condense(['a','','b',0,'c',false,'d',null,'e',undefined,'e','a','c'],true); // $ExpectType any[]

    // check values
    $c.condense(['a','','b',0,'c',false,'d',null,'e',undefined,'e','a','c'], true); // $ExpectType any[]
}

// $c.contains
{
    // value
    $c.contains(['a'], 'b'); // $ExpectType boolean
    $c.contains(['a'], 'a'); // $ExpectType boolean

    // regex
    $c.contains(['abcd'], /dc/); // $ExpectType boolean
    $c.contains(['abcd'], /bc/); // $ExpectType boolean

    // function
    $c.contains(['a','b'], val => val == "c"); // $ExpectType boolean
    $c.contains(['a','b'], val => val == "b"); // $ExpectType boolean

    // value and function
    $c.contains<{prop:string;},{prop:string;}[]>([{prop:'a'}], 'a', item => !!item.prop); // $ExpectType boolean
    $c.contains<{prop:string;},{prop:string;}[]>([{prop:'a'}], 'b', item => !!item.prop); // $ExpectType boolean

    // value and string
    var arrInt = [1,2,3,4];
    $c.contains([1,2,3,4], 2, '$lt'); // $ExpectType boolean
    $c.contains([1,2,3,4], 1, '$lt'); // $ExpectType boolean
    $c.contains([1,2,3,4], 1, '$lte'); // $ExpectType boolean
    $c.contains([1,2,3,4], 0, '$lte'); // $ExpectType boolean
    $c.contains([1,2,3,4], 3, '$gt'); // $ExpectType boolean
    $c.contains([1,2,3,4], 4, '$gt'); // $ExpectType boolean
    $c.contains([1,2,3,4], 4, '$gte'); // $ExpectType boolean
    $c.contains([1,2,3,4], 5, '$gte'); // $ExpectType boolean
    $c.contains([1,2,3,4], [4,0], '$mod'); // $ExpectType boolean
    $c.contains([1,2,3,4], [1,1], '$mod'); // $ExpectType boolean
    $c.contains([1,2,3,4], Number, '$type'); // $ExpectType boolean
    $c.contains([1,2,3,4], String, '$type'); // $ExpectType boolean

    // array
    $c.contains([1,2,3,4], [1,5]); // $ExpectType number
    $c.contains([1,2,3,4], [2,3]); // $ExpectType number
    $c.contains([1,2,3,4], [5,6]); // $ExpectType boolean
}

//$c.count
{
    //no args
    $c.count([]); // $ExpectType number

    // query
    $c.count([{id: 1}],{id:1}); // $ExpectType number

    // string
    $c.count(["string 1","string 2","string 3","string 4"], '1'); // $ExpectType number
    $c.count(["string 1","string 2","string 3","string 4"], 'string'); // $ExpectType number
    $c.count(["string 1","string 2","string 3","string 4"], 'strings'); // $ExpectType number

    // regex
    $c.count(["string 1","string 2","string 3","string 4"], /1/); // $ExpectType number
    $c.count(["string 1","string 2","string 3","string 4"], /string/); // $ExpectType number
    $c.count(["string 1","string 2","string 3","string 4"], /strings/); // $ExpectType number
}

// $c.createIndex
{
    // string
    $c.createIndex(abc, "a, b"); // $ExpectType AbcObject[]

    // array
    $c.createIndex(abc, ["a","b"]); // $ExpectType AbcObject[]
}

// $c.delete
{
    // primary
    $c.delete(abc,{a:2}); // $ExpectType AbcObject[]

    // justOne:false
    $c.delete(abc,{a:2},false); // $ExpectType AbcObject[]
}

// $c.distinct
{
    // array
    $c.distinct(abc, ["a","b"]); // $ExpectType AbObject[]

    // string
    $c.distinct(abc, "a,b"); // $ExpectType AbObject[]
    $c.distinct(abcd, "d.da"); // $ExpectType AbcdObject[]

    // string with query
    $c.distinct(abcd,"a,b",{a:{$exists:1}}); // $ExpectType AbcdObject[]
    $c.distinct(abcd,"a",{a:{$exists:1}}); // $ExpectType AbcdObject[]

    // array with query
    $c.distinct(abcd,["a","b"],{a:{$exists:1}}); // $ExpectType AbcdObject[]
    $c.distinct(abcd,["a"],{a:{$exists:1}}); // $ExpectType AbcdObject[]

    // string with sql query
    $c.distinct(abcd,"a,b",""); // $ExpectType AbcdObject[]
    $c.distinct(abcd,"a",""); // $ExpectType AbcdObject[]

    // array with sql query
    $c.distinct(abcd,["a","b"],""); // $ExpectType AbcdObject[]
    $c.distinct(abcd,["a"],""); // $ExpectType AbcdObject[]

}

// $c.every
{
    $c.every(['a','','b',0,'c',false,'d',null,'e',undefined], function(item){ return item!=undefined; }); // $ExpectType boolean
    $c.every(['a','b',0,'c','d','e'], function(item){ return item!=undefined; }); // $ExpectType boolean
}

// $c.filter
{
    $c.filter(['a','','b',0,'c',false,'d',null,'e',undefined], function(item){ return item; }); // $ExpectType string[]
}
// $c.group
{
    $c.group(abcd, {
        key:{'d.da': 1, a: 1 },
        reduce:function(curr, result){ },
        initial: {}
    }); // $ExpectType AbcdObject[]

    $c.group(abcd, {
        cond: {a:{$exists:true}},
        key:{'d.da': 1},
        reduce:function(curr, result){ result.a += curr.a || 0; },
        initial: { a: 0},
    }); // $ExpectType AbcdObject[]

    $c.group(abcd, {
        cond: {a:{$exists:true}},
        key:{'d.da': 1 },
        reduce:function(curr, result){ result.a += curr.a || 0; },
        initial: { a: 0},
        finalize: function(result){ return {a:0}; }
    }); // $ExpectType AbcdObject[]

    $c.group(abcd, {
        cond: {neverTrue: ""},
        key:{'d.da': 1 },
        reduce:function(curr, result){ },
        initial: {},
    }); // $ExpectType Object[]
}

// $c.indexOf
{
    $c.indexOf([],"string 1"); // $ExpectType number
}

// $c.indexOfAlt
{
    $c.indexOfAlt([],"20",function(item){ return item}); // $ExpectType number
}

// $c.innerJoin
{
    // full
    $c.innerJoin(abc,abcd,"a=a"); // $ExpectType AbcdObject[]

    // shorthand
    $c.innerJoin(abc, abcd,"a"); // $ExpectType AbcdObject[]

}

// $c.insert
{
    // single
    $c.insert(abcd,{a:1}); // $ExpectType boolean

    // multiple
    $c.insert(abcd,[{a:1},{a:2}]); // $ExpectType boolean
}

// $c.insertAfter
{
    // single
    $c.insertAfter(abcd,1,{a:1}); // $ExpectType boolean

    // multiple
    $c.insertAfter(abcd,1,[{a:1},{a:2}]); // $ExpectType boolean
}

// $c.insertBefore
{
    // single
    $c.insertBefore(abcd,1,{a:1}); // $ExpectType boolean

    // multiple
    $c.insertBefore(abcd,1,[{a:1},{a:2}]); // $ExpectType boolean

}

// $c.isEmpty
{
    $c.isEmpty(abc); // $ExpectType boolean
    $c.isEmpty([]); // $ExpectType boolean
}

// $c.joinLeft
{
    // full
    $c.joinLeft(abc,abcd,"a=a"); // $ExpectType AbcdObject[]

    // shorthand
    $c.joinLeft(abc,abcd,"a"); // $ExpectType AbcdObject[]
}

// $c.joinRight
{
    // full
    $c.joinRight(abcd,abc,"a=a"); // $ExpectType AbcdObject[]

    // shorthand
    $c.joinRight(abcd,abc,"a"); // $ExpectType AbcdObject[]
}

// $c.limit
{
    $c.limit(abc,1); // $ExpectType AbcObject[]
}

// $c.map
{
    $c.map<AbcObject,AbcObject>(abc,function(item){ item.a++; return item; }); // $ExpectType AbcObject[]
}

// $c.mapReduce
{
    // simple
    $c.mapReduce(abc,mapFunction1,reduceFunction1); // $ExpectType AbcObject[]

    // query
    $c.mapReduce(abc,mapFunction1,reduceFunction1,{query:{a:1}}); // $ExpectType AbcObject[]

    // limit
    $c.mapReduce(abc,mapFunction1,reduceFunction1,{limit:1}); // $ExpectType AbcObject[]

    // out
    var rarr: AbcObject[] = [];
    $c.mapReduce(abc,mapFunction1,reduceFunction1,{out:rarr});
    rarr; // $ExpectType AbcObject[]

    // limit/final
    $c.mapReduce(abc,mapFunction1,reduceFunction1,{limit:1,finalize:function(){return {a:1};}}); // $ExpectType AbcdObject[]

}

// $c.normalize
{
    $c.normalize([abcd]); // $ExpectType AbcdObject[]
}

// $c.parallelEach
{
    $c.parallelEach([new Promise((res)=>{res();})]) // $ExpectType Promise<any>[]
}

// $c.remove
{
    // simple
    $c.remove([1,{},"adsf",10],"adsf"); // $ExpectType string

    // callback
    $c.remove([1,{},"adsf",10],"adsf",function(){return 1;}); // $ExpectType object
}

// $c.removeAll
{
    // simple
    $c.removeAll([]); // $ExpectType Array<any>

    // complex
    $c.removeAll([],"10",function(){ return 1;}); // $ExpectType Array<any>
}

// $c.removeAt
{
    $c.removeAt([1,true,"adsf",10],1); // $ExpectType boolean
}

// $c.replaceAt
{
    $c.replaceAt([1,true,"adsf",10],1,{}); // $ExpectType boolean
}

// $c.scrambe
{
    $c.scramble(abc); // $ExpectType AbcObject[]
}

// $c.sort
{
    // simple
    $c.sortBy(abc,'a'); // $ExpectType AbcObject[]

    // simple negate
    $c.sortBy(abc,['!a']); // $ExpectType AbcObject[]

    // simple comma separated
    $c.sortBy(abc,'a,!b'); // $ExpectType AbcObject[]

    $c.sortBy(abc,'a,!b', true); // $ExpectType AbcObject[]

    // primer
    $c.sortBy(abc,['a','!b'],false, function(val){
        if (!!(val.a%2)) { val.a - 1;}
        return val.toString();
    }); // $ExpectType AbcObject[]

    // lookup
    $c.sortBy(abc,['a'],false,null,{a:{s:"a"},b:{s:"B"},c:{s:"c"},d:{s:"d"}}); // $ExpectType AbcObject[]

    // lookup string ignore case
    $c.sortBy(abc,['a'],false,null,{a:{s:"a"},b:{s:"B"},c:{s:"c"},d:{s:"d"}}, 'i'); // $ExpectType AbcObject[]
}

// $c.stdev
{
    $c.stdev([1,2,3]); // $ExpectType number
}

// $c.sum
{
    $c.sum([1,2]); // $ExpectType number
}

// $c.toSet
{
    $c.toSet([{},{},{},{}]); // $ExpectType object[]
}

// $c.trim
{
    $c.trim(["     string 1    "]); // $ExpectType string[]
    $c.trim(["     string 1    "], true); // $ExpectType object[]
}

// $c.update
{
    // $set/single
    $c.update(abc,{a:1},{$set:{a:1}}); // $ExpectType AbcObject[]

    // $set/multiple
    $c.update(abc,{a:1},{$set:{a:1}},{multi:true}); // $ExpectType AbcObject[]

    // replace/single
    $c.update(abc,{a:1},{a:1,b:"",c:true}); // $ExpectType AbcObject[]

    // replace/multiple
    $c.update(abc,{a:1},{a:1,b:"",c:true},{multi:true}); // $ExpectType AbcObject[]

    // $inc
    $c.update(abc,{a:1},{$inc:{index:1}},{multi:true}); // $ExpectType AbcObject[]

    // $unset
    $c.update(abc,{a:1},{$set:{index:1}});
    $c.update(abc,{share:"shared"},{$unset:{index:1}}); // $ExpectType AbcObject[]

    // $currentDate
    $c.update(abcd,{a:1},{$currentDate:{date:1}}); // $ExpectType AbcdObject[]

    // $min/$max/$mul/$rename
    $c.update(abcd,{},{$rename:{date:'dated'}});
    $c.update(abcd,{},{$min:{a:20},$max:{a:20},$mul:{a:2},$rename:{dated:'date'}}); // $ExpectType AbcdObject[]

    // $push
    $c.update(abcd,{},{$push:{array:{
        $each: [ 1 ],
        $sort: { a: 1 }
    }}}); // $ExpectType AbcdObject[]

    $c.update(abcd,{},{$push:{array:{
        $each: [ 1 ],
        $slice: -2
    }}}); // $ExpectType AbcdObject[]


    $c.update(abcd,{},{$push:{array:{
        $each: [ 1 ],
        $position: 1
    }}});

    // $pop
    $c.update(abcd,{},{$pop:{array: -1}}); // $ExpectType AbcdObject[]

    $c.update(abcd,{},{$pop:{array: 1}});

    // $pullAll
    $c.update(abcd,{},{$pullAll:{a: [1]}}); // $ExpectType AbcdObject[]

    // $upsert/$set
    $c.update(abcd,{nonexistant:"shared"},{$set:{a:15}},{upsert:true}); // $ExpectType AbcdObject[]

    // $upsert/replace
    $c.update(abcd,{nonexistant:"shared"},{a:15},{upsert:true}); // $ExpectType AbcdObject[]
}

// $c.upsert
{
    // unchanged
    $c.upsert(abc, { a:1, b:"", c:true }, "a"); // $ExpectType UpsertObject

    // insert
    $c.upsert(abc,{a:5, b:"10", c:true},"a"); // $ExpectType UpsertObject

    // insert/function
    $c.upsert(abc,{a:6, b:"10", c:false},"a",function(){ return true; });

    // unchanged/function
    $c.upsert(abc,{a:6, b:"10", c:false},"a",function(){return true;});

    // updated/function
    $c.upsert(abc,{a:6, b:"11", c:false},"a",function(){return false;});

    // unchanged/array
    $c.upsert(abc,[{a:6, b:"11", c:false}],"a"); // $ExpectType UpsertObject

    // insert/array
    $c.upsert(abc,[{a:5, b:"10", c:true}],"a"); // $ExpectType UpsertObject

    // insert/array/function
    $c.upsert(abc,[{a:7, b:"10", c:false}],"a",function(){ return true;}); // $ExpectType UpsertObject

    // unchanged/array/function
    $c.upsert(abc,[{a:7, b:"10", c:false}],"a",function(){ return true;}); // $ExpectType UpsertObject

    // updated/array/function
    $c.upsert(abc,[{a:7, b:"10", c:true}],"a",function(){return false;}); // $ExpectType UpsertObject
}

// $c.where
{
    // simple
    $c.where(abc,{a:1}); // $ExpectType AbcObject[]

    // comparison
    $c.where(abc,{a:{$eq:1}}); // $ExpectType AbcObject[]
    $c.where(abc,{a:{$gt:3}}); // $ExpectType AbcObject[]
    $c.where(abc,{a:{$lt:3}}); // $ExpectType AbcObject[]
    $c.where(abc,{a:{$gte:3}}); // $ExpectType AbcObject[]
    $c.where(abc,{a:{$lte:3}}); // $ExpectType AbcObject[]
    $c.where(abc,{a:{$ne:3}}); // $ExpectType AbcObject[]

    // $in & $nin
    $c.where(abc,{a:{$in:[1,2]}}); // $ExpectType AbcObject[]
    $c.where(abc,{a:{$nin:[1,2]}}); // $ExpectType AbcObject[]

    // logical
    $c.where(abc,{$and:[{a:1},{c:true}]}); // $ExpectType AbcObject[]
    $c.where(abc,{$or:[{a:1},{a:2}]}); // $ExpectType AbcObject[]
    $c.where(abc,{a:{ $not: { $gte: 2 }}}); // $ExpectType AbcObject[]
    $c.where(abc,{$nor:[{a:1},{a:2}]}); // $ExpectType AbcObject[]

    // $exists
    $c.where(abc,{a:{$exists:true}}); // $ExpectType AbcObject[]

    // $type
    $c.where(abc,{a:{$type:Number}}); // $ExpectType AbcObject[]

    // $mod
    $c.where(abc,{a:{$mod:[3,2]}}); // $ExpectType AbcObject[]

    // $regex
    $c.where(abc,{a:{$regex:/[12]/}}); // $ExpectType AbcObject[]

    // $where
    $c.where(abc,{$where:"this.a > 2"}); // $ExpectType AbcObject[]
    $c.where(abc,{$where:function(){ return this.a < 2;}}); // $ExpectType AbcObject[]

    // function
    $c.where(abc,function(this:AbcObject){ return this.a < 2;}); // $ExpectType AbcObject[]

    // $all
    $c.where(abcd,{array:{$all:[1]}}); // $ExpectType AbcdObject[]

    // array
    $c.where(abcd,{array:[1]}); // $ExpectType AbcdObject[]

    // $elemMatch
    $c.where(whereElemMatch, { array: { $elemMatch: { bb: 'hi' } } }); // $ExpectType AbcdObject[]

    // $size
    $c.where(abcd, { array: { $size: 1 } }); // $ExpectType AbcdObject[]

    // regex
    $c.where(abcd, { b:/1/i }); // $ExpectType AbcdObject[]
}