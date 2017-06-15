//var expect = require('chai').expect;
require.cache[require.resolve('../common.js')] && delete require.cache[require.resolve('../common.js')];
require.cache[require.resolve('../craydent.js')] && delete require.cache[require.resolve('../craydent.js')];
var craydent = require('../craydent.js');
$c.DEBUG_MODE = true;
describe ('String', function () {
	it('capitalize',function(){
		expect("word of the day".capitalize()).toBe("Word of the day");
		expect("word of the day".capitalize(1)).toBe("wOrd of the day");
		expect("word of the day".capitalize(0,true)).toBe("Word Of The Day");
		expect("word of the day".capitalize(1,true)).toBe("wOrd oF tHe dAy");
	});
	it('convertUTCDate',function(){
		expect("2016/12/13 10:01:33".convertUTCDate("/")).toBe("12/13/2016 10:01:33");
		expect("2016.12.13 10:01:33".convertUTCDate( ".")).toBe("12/13/2016 10:01:33");
		expect("2016-12-13 10:01:33".convertUTCDate( "-")).toBe("12/13/2016 10:01:33");
	});
	it('count',function(){
		expect("calaiedc8a".count("a")).toBe(3);
		expect("calaiedc8a".count("c")).toBe(2);
		expect("calaiedc8a".count("-")).toBe(0);
	});
	it('cut',function(){
		expect("cala".cut(1,2)).toBe("cla");
		expect("cala".cut(1,2,"p")).toBe("cpla");
	});
	it('ellipsis',function(){
		expect("calasdfadfasdfasdfadf".ellipsis(1)).toBe("c...alasdfadfasdfasdfadf");
		expect("calasdfadfasdfasdfadf".ellipsis(1,2)).toBe("c...df");
	});
	it('endsWithAny',function(){
		expect("calasdfadfasdfasdfadf".endsWithAny('a','p','f')).toBe("f");
		expect("calasdfadfasdfasdfadf".endsWithAny(['a','p','f'])).toBe("f");
		expect("calasdfadfasdfasdfadf".endsWithAny('a')).toBe(false);
		expect("calasdfadfasdfasdfadf".endsWithAny(['a'])).toBe(false);
		expect("build".endsWithAny("build","pull","npm")).toBe("build");
		expect("pull".endsWithAny("build","pull","npm")).toBe("pull");
	});
	it('highlight',function(){
		expect("cal".highlight('a')).toBe("c<span class=\"chighlight\">a</span>l");
		expect("cal".highlight(/a/)).toBe("c<span class=\"chighlight\">a</span>l");
		expect("cal".highlight('a','chl')).toBe("c<span class=\"chl\">a</span>l");
		expect("cal".highlight(/a/,'chl')).toBe("c<span class=\"chl\">a</span>l");
		expect("cal".highlight('a',null,'div')).toBe("c<div class=\"chighlight\">a</div>l");
		expect("cal".highlight(/a/,null,'div')).toBe("c<div class=\"chighlight\">a</div>l");
		expect("cal".highlight('a',"chl",'div')).toBe("c<div class=\"chl\">a</div>l");
		expect("cal".highlight(/a/,"chl",'div')).toBe("c<div class=\"chl\">a</div>l");
	});
	it('indexOfAlt',function(){
		expect("cal".indexOfAlt(/a/)).toBe(1);
		expect("cala".indexOfAlt(/a/,2)).toBe(3);
	});
	it('ireplace_all',function(){
		expect("calA".ireplace_all('a','')).toBe('cl');
	});
	it('isCuid',function(){
		var c = $c.cuid();
		expect(c.isCuid()).toBe(true);
	});
	it('isBlank',function(){
		expect("cal".isBlank()).toBe(false);
		expect("".isBlank()).toBe(true);
	});
	it('isValidEmail',function(){
		expect("cal".isValidEmail()).toBe(false);
		expect("cal@craydent.com".isValidEmail()).toBe(true);
	});
	it('lastIndexOfAlt',function(){
		expect("caal".lastIndexOfAlt(/a/)).toBe(2);
		expect("caal".lastIndexOfAlt(/a/,0)).toBe(-1);
	});
	it('ltrim',function(){
		expect("     cal ".ltrim()).toBe("cal ");
		expect("     aacalaaa".ltrim('a')).toBe("     aacalaaa");
		expect("aacalaaa".ltrim('a')).toBe("calaaa");
	});
	it('pluralize',function(){
		expect("life".pluralize()).toBe("lives");
		expect("history".pluralize()).toBe("histories");
		expect("deer".pluralize()).toBe("deer");
	});
	it('replace_all',function(){
		expect("calA".replace_all('a','')).toBe("clA");
		expect("calaaa".replace_all('a','')).toBe("cl");
		expect("calaaa".replace_all('a','b')).toBe("cblbbb");
		expect("calaaa".replace_all(['c','a'],['d','b'])).toBe("dblbbb");
		expect("calaaa".replace_all(['c','a'],['b'])).toBe("bblbbb");
	});
	it('reverse',function(){
		expect("cal".reverse()).toBe("lac");
	});
	it('rtrim',function(){
		expect(" cal  ".rtrim()).toBe(" cal");
		expect("     aacalaaa".rtrim('a')).toBe("     aacal");
		expect("aacalaaa".rtrim('a')).toBe("aacal");
	});
	// TO/DO sanitize
	it('sanitize',function(){
		// expect($c.rtrim(" cal  ")).toBe(" cal");
		// expect($c.rtrim("     aacalaaa",'a')).toBe("     aacal");
		// expect($c.rtrim("aacalaaa",'a')).toBe("aacal");
	});
	it('singularize',function(){
		expect("lives".singularize()).toBe("life");
		expect("histories".singularize()).toBe("history");
		expect("deer".singularize()).toBe("deer");
	});
	it('startsWithAny',function(){
		expect("calasdfadfasdfasdfadf".startsWithAny('a','c','f')).toBe("c");
		expect("calasdfadfasdfasdfadf".startsWithAny(['a','c','f'])).toBe("c");
		expect("calasdfadfasdfasdfadf".startsWithAny('a')).toBe(false);
		expect("calasdfadfasdfasdfadf".startsWithAny(['a'])).toBe(false);
		expect("build".startsWithAny("build", "pull","npm")).toBe("build");
		expect("pull".startsWithAny("poull", "pull","npm")).toBe("pull");
	});
	it('strip',function(){
		expect("aaaaaaaaaaaacalaaaaaaaaaa".strip('a')).toBe("cal");
		expect("aaaaaaaaaaaacalaaaaaaaaaab".strip('a')).toBe("calaaaaaaaaaab");
		expect("aaaaaaaaaaaacalaaaaaaaaaa".strip(['a','l'])).toBe('c');
	});
	it('toCurrencyNotation',function(){
		expect("1000".toCurrencyNotation()).toBe("1,000");
		expect("1000000".toCurrencyNotation()).toBe("1,000,000");
		expect("1000".toCurrencyNotation('.')).toBe('1.000');
	});
	it('toDateTime',function(){
		//console.log($c.toDateTime("30-12-2012"));
		expect("30-12-2012".toDateTime()).toEqual(new Date("12/30/2012"));
		expect("30.12.2012".toDateTime()).toEqual(new Date("12/30/2012"));
		expect("2012-12-30".toDateTime()).toEqual(new Date("12/30/2012"));
		expect("2012.12.30".toDateTime()).toEqual(new Date("12/30/2012"));
		expect("2012.12.30".toDateTime({format:'m/d/Y'})).toEqual("12/30/2012");
		expect("2012.12.30".toDateTime({format:'d/m/Y'})).toEqual("30/12/2012");
		//expect($c.toDateTime("1000",'.')).toBe('1.000');
	});
	it('toObject',function(){
		expect(JSON.stringify("p1=1&p2=2&p3=3".toObject())).toBe(JSON.stringify({p1:"1",p2:"2",p3:"3"}));
		expect(JSON.stringify("p1=1".toObject())).toBe(JSON.stringify({p1:"1"}));
		expect(JSON.stringify("p1=&p2".toObject())).toBe(JSON.stringify({p1:"",p2:undefined}));
	});
	it('trim',function(){
		expect("    cal    ".trim()).toBe("cal");
		expect("    cal".trim()).toBe("cal");
		expect("cal   ".trim()).toBe("cal");
	});

});
describe ('Array', function () {
	var arrObjs = [
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}],
		arrStrings = ["string 1","string 2","string 3","string 4"],
		arrMix = [1,{},"adsf",10],
		arrSort = [{id:1, s:5},{id:2, s:5},{id:3, s:6},{id:4, s:3},{id:5, s:2}],
		arrLookup = [{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2 },{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1 },{ "_id" : 3  }],
		arrLookupJoiner = [{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70 },
			{ "_id" : 5, "sku": null, description: "Incomplete" },
			{ "_id" : 6 }],
		arrGroup = [
			{ "_id" : 1, item: { "sku" : "111" }, name : "p1", status: "ordered", "instock" : 10 },
			{ "_id" : 2, item: { "sku" : "222" }, name : "p2", status: "ordered", "instock" : 80 },
			{ "_id" : 3, item: { "sku" : "111" }, name : "p1", status: "ordered", "instock" : 60 },
			{ "_id" : 4, item: { "sku" : "333" }, name : "p3", status: "ordered", "instock" : 70 },
			{ "_id" : 5, item: { "sku" : "111" }, name : "p1", status: "incomplete" },
			{ "_id" : 6 }],
		arrTree = [
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,share:"shared", odd:false},
			{id:5,share:"shared1", odd:true}
		];
	it('aggregate',function(){
		// $project
		expect(arrObjs.duplicate(true).aggregate([{$project:{p:1,index:1,b:10}}])).toEqual([
			{p:"10", index: 10, b: 10},
			{p:"20", index: 20, b: 10},
			{p:"30", index: 30, b: 10},
			{b: 10}]);
		expect(arrObjs.duplicate(true).aggregate([{$project:{p:1,index:1,b:{$multiply:['$index',10]}}}])).toEqual([
			{p:"10", index: 10, b: 100},
			{p:"20", index: 20, b: 200},
			{p:"30", index: 30, b: 300},
			{b: 0}]);
		expect(arrObjs.duplicate(true).aggregate([{$project:{p:1,index:1}}])).toEqual([
			{p:"10", index: 10},
			{p:"20", index: 20},
			{p:"30", index: 30},
			{}]);
		// $match
		expect(arrObjs.duplicate(true).aggregate([{$match:{p:"10"}}])).toEqual([
			{id:1,p:"10",share:"shared",index:10,std:4}
		]);
		// $redact
		expect([{
			_id: 1,
			title: "123 Department Report",
			tags: [ "G", "STLW" ],
			year: 2014,
			subsections: [
				{
					subtitle: "Section 1: Overview",
					tags: [ "SI", "G" ],
					content:  "Section 1: This is the content of section 1."
				},
				{
					subtitle: "Section 2: Analysis",
					tags: [ "STLW" ],
					content: "Section 2: This is the content of section 2."
				},
				{
					subtitle: "Section 3: Budgeting",
					tags: [ "TK" ],
					content: {
						text: "Section 3: This is the content of section3.",
						tags: [ "HCS" ]
					}
				}
			]
		}].aggregate([{$redact:{
			$cond: {
				if: { $gt: [ { $size: { $setIntersection: [ "$tags", [ "STLW", "G" ] ] } }, 0 ] },
				then: "$$KEEP",
				else: "$$PRUNE"
			}
		}}])).toEqual([
			{
				"_id" : 1,
				"title" : "123 Department Report",
				"tags" : [ "G", "STLW" ],
				"year" : 2014,
				"subsections" : [
					{
						"subtitle" : "Section 1: Overview",
						"tags" : [ "SI", "G" ],
						"content" : "Section 1: This is the content of section 1."
					},
					{
						"subtitle" : "Section 2: Analysis",
						"tags" : [ "STLW" ],
						"content" : "Section 2: This is the content of section 2."
					},
					{
						subtitle: "Section 3: Budgeting",
						tags: [ "TK" ],
						content: {
							text: "Section 3: This is the content of section3.",
							tags: [ "HCS" ]
						}
					}
				]
			}
		]);
		expect([{
			_id: 1,
			title: "123 Department Report",
			tags: [ "G", "STLW" ],
			year: 2014,
			subsections: [
				{
					subtitle: "Section 1: Overview",
					tags: [ "SI", "G" ],
					content:  "Section 1: This is the content of section 1."
				},
				{
					subtitle: "Section 2: Analysis",
					tags: [ "STLW" ],
					content: "Section 2: This is the content of section 2."
				},
				{
					subtitle: "Section 3: Budgeting",
					tags: [ "TK" ],
					content: {
						text: "Section 3: This is the content of section3.",
						tags: [ "HCS" ]
					}
				}
			]
		}].aggregate([{$redact:{
			$cond: {
				if: { $gt: [ { $size: { $setIntersection: [ "$tags", [ "STLW", "G" ] ] } }, 0 ] },
				then: "$$DESCEND",
				else: "$$PRUNE"
			}
		}}])).toEqual([
			{
				"_id" : 1,
				"title" : "123 Department Report",
				"tags" : [ "G", "STLW" ],
				"year" : 2014,
				"subsections" : [
					{
						"subtitle" : "Section 1: Overview",
						"tags" : [ "SI", "G" ],
						"content" : "Section 1: This is the content of section 1."
					},
					{
						"subtitle" : "Section 2: Analysis",
						"tags" : [ "STLW" ],
						"content" : "Section 2: This is the content of section 2."
					}
				]
			}
		]);
		// $limit
		expect(arrObjs.duplicate(true).aggregate([{$limit:1}])).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		// $skip
		expect(arrObjs.duplicate(true).aggregate([{$skip:3}])).toEqual([{id:4,std:4}]);
		// $unwind
		expect([{ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] }].aggregate([{ $unwind : "$sizes" }])).toEqual([
			{ "_id" : 1, "item" : "ABC1", "sizes" : "S" },
			{ "_id" : 1, "item" : "ABC1", "sizes" : "M" },
			{ "_id" : 1, "item" : "ABC1", "sizes" : "L" }
		]);
		expect([{ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] },{ "_id" : 2, "item" : "ABC1" }].aggregate([{ $unwind : {path:"$sizes",preserveNullAndEmptyArrays:true} }])).toEqual([
			{ "_id" : 1, "item" : "ABC1", "sizes" : "S" },
			{ "_id" : 1, "item" : "ABC1", "sizes" : "M" },
			{ "_id" : 1, "item" : "ABC1", "sizes" : "L" },
			{ "_id" : 2, "item" : "ABC1" }
		]);
		expect(
			[{ "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] },{ "_id" : 2, "item" : "ABC1" }].aggregate(
			[{ $unwind : {path:"$sizes",preserveNullAndEmptyArrays:true,includeArrayIndex:"ind"} }])).toEqual([
				{ "_id" : 1, "item" : "ABC1", "sizes" : "S",ind:0 },
				{ "_id" : 1, "item" : "ABC1", "sizes" : "M",ind:1 },
				{ "_id" : 1, "item" : "ABC1", "sizes" : "L",ind:2 },
				{ "_id" : 2, "item" : "ABC1",ind:0 }
			]);
		// $group & $sample
		expect(arrObjs.duplicate(true).aggregate([
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
		}}])).toEqual([{_id:null,totalPrice:140,averageQuantity:20,count:4,f:"10",l:"30",max:30,min:10,pushed:["shared","shared","shared"],theset:["shared"],stdsamp:0,stdpop:0}]);
		// $sample
		expect(arrObjs.duplicate(true).aggregate([{$sample: { size: 2}}]).length).toBe(2);
		// $sort
		expect(arrSort.duplicate(true).aggregate([{$sort: { s: -1, id: 1}}])).toEqual([{id:3,s:6},{id:1,s:5},{id:2,s:5},{id:4,s:3},{id:5,s:2}]);
		// $geoNear *****not implemented
		// $lookup
		expect(arrLookup.duplicate(true).aggregate([{$lookup: {from:arrLookupJoiner.duplicate(true),localField:"item",foreignField:"sku",as:"idocs"}}])).toEqual([
			{
				"_id" : 1,
				"item" : "abc",
				"price" : 12,
				"quantity" : 2,
				"idocs" : [
					{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120 }
				]
			},
			{
				"_id" : 2,
				"item" : "jkl",
				"price" : 20,
				"quantity" : 1,
				"idocs" : [
					{ "_id" : 4, "sku" : "jkl", "description" : "product 4", "instock" : 70 }
				]
			},
			{
				"_id" : 3,
				"idocs" : [
					{ "_id" : 5, "sku" : null, "description" : "Incomplete" },
					{ "_id" : 6 }
				]
			}
		]);
		// $out
		var arrOut = [];
		expect(arrObjs.duplicate(true).aggregate([
			{$group: {
				_id: null,
				count: {$sum: 1},
				averageQuantity: {$avg: "index"},
				totalPrice: {$sum: {$multiply: ["$id", "$index"]}},
			}},{$out:arrOut}])).toBe(arrOut);
		expect(arrOut).toEqual([{_id:null,totalPrice:140,averageQuantity:20,count:4}]);

	});
	it('average',function(){
		expect(arrMix.average()).toBe(11/2);
	});
	it('buildTree',function(){
		expect(arrTree.duplicate(true).buildTree(function(item){
			return !item.index;
		},'share')).toEqual([{id:4,share:"shared",odd:false,children:[
			{id:1,p:"10",share:"shared", index: 10,std:4,children:[]},
			{id:2,p:"20",share:"shared", index : 20,std:4,children:[]},
			{id:3,p:"30",share:"shared", index: 30,std:4,children:[]}
		]},{id:5,share:"shared1",odd:true,children:[]}]);
		expect(arrTree.duplicate(true).buildTree( function(item){
			return !item.index;
		},'share',{childProperty:"cc"})).toEqual([{id:4,share:"shared",odd:false,cc:[
			{id:1,p:"10",share:"shared", index: 10,std:4,cc:[]},
			{id:2,p:"20",share:"shared", index : 20,std:4,cc:[]},
			{id:3,p:"30",share:"shared", index: 30,std:4,cc:[]}]
		},{id:5,share:"shared1",odd:true,cc:[]}]);
		expect(arrTree.duplicate(true).buildTree( function(item){
			return !$c.isNull(item.odd);
		},function(item){ return $c.isOdd(item.id); },{childProperty:"cc"})).toEqual([
			{id:4,share:"shared",odd:false,cc:[{id:2,p:"20",share:"shared", index : 20,std:4,cc:[]}]},
			{id:5,share:"shared1",odd:true,cc:[{id:1,p:"10",share:"shared", index: 10,std:4,cc:[]}, {id:3,p:"30",share:"shared", index: 30,std:4,cc:[]}]}
		]);
	});
	// TO/DO complexSort
	//it('complexSort',function(){
	//
	//});
	it('condense',function(){
		expect(['a','','b',0,'c',false,'d',null,'e',undefined].condense()).toEqual(['a','b',0,'c',false,'d','e']);
		expect(['a','','b',0,'c',false,'d',null,'e',undefined,'e','a','c'].condense(true)).toEqual(['a','b',0,'c',false,'d','e']);
	});
	it('count',function(){
		expect(arrObjs.count()).toBe(4);
		expect(arrObjs.count({id:1})).toBe(1);
	});
	it('delete',function(){
		var temp = arrObjs.duplicate(true);
		expect(temp.delete({share:"shared"})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect(temp).toEqual([
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		expect(temp.delete({share:"shared"},false)).toEqual([
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect(temp).toEqual([{id:4,std:4}]);
	});
	it('distinct',function(){
		var temp = arrObjs.duplicate(true);
		expect(temp.distinct(["share","std"])).toEqual([
			{share:"shared",std:4},{share:undefined,std:4}]);
		expect(temp.distinct("share,std")).toEqual([
			{share:"shared",std:4},{share:undefined,std:4}]);

		expect(temp.distinct(["share"])).toEqual(["shared",undefined]);
		expect(temp.distinct("share")).toEqual(["shared",undefined]);


		expect(temp.distinct(["share","std"],{share:{$exists:1}})).toEqual([
			{share:"shared",std:4}]);
		expect(temp.distinct("share,std",{share:{$exists:1}})).toEqual([
			{share:"shared",std:4}]);

		expect(temp.distinct(["share"],{share:{$exists:1}})).toEqual(["shared"]);
		expect(temp.distinct("share",{share:{$exists:1}})).toEqual(["shared"]);


	});
	it('every',function(){
		var arr = ['a','','b',0,'c',false,'d',null,'e',undefined];
		expect(arr.every(function(item,i,arr){ return !$c.isNull(item); })).toBe(false);
		expect(arr.condense().every(function(item,i,arr){ return !$c.isNull(item); })).toBe(true);
	});
	it('filter',function(){
		var arr = ['a','','b',0,'c',false,'d',null,'e',undefined];
		expect(arr.filter(function(item,i,arr){ return item; })).toEqual(['a','b','c','d','e']);
	});
	it('group',function(){
		var temp = arrGroup.duplicate();
		expect(temp.group( {key:{'item.sku': 1, name: 1 },reduce:function(curr, result){ }, initial: {},})).toEqual([
			{item:{sku:'111'}, name: 'p1' },
			{item:{sku:'222'}, name: 'p2' },
			{item:{sku:'333'}, name: 'p3' },
			{item:{sku : null}, name : null}
		]);

		temp = arrGroup.duplicate();
		expect(temp.group( {
			cond: {_id:{$exists:true}},
			key:{'item.sku': 1, name: 1 },
			reduce:function(curr, result){ result.total += curr.instock || 0; },
			initial: { total: 0},
		})).toEqual([
			{item:{sku:'111'}, name: 'p1', total : 70 },
			{item:{sku:'222'}, name: 'p2', total : 80 },
			{item:{sku:'333'}, name: 'p3', total : 70 },
			{item:{sku : null}, name : null, total : 0}
		]);

		temp = arrGroup.duplicate();
		expect(temp.group({
			cond: {_id:{$exists:true}},
			key:{'item.sku': 1, name: 1 },
			reduce:function(curr, result){ result.total += curr.instock || 0; },
			initial: { total: 0},
			finalize: function(result){ return {}; }
		})).toEqual([{ }, { }, { }, { }]);

		expect(temp.group( {
			cond: {neverTrue: ""},
			key:{'item.sku': 1, name: 1 },
			reduce:function(curr, result){ },
			initial: {},
		})).toEqual([]);
	});
	// TO/DO groupBy
	//it('groupBy',function(){
	//
	//});
	it('indexOf',function(){
		expect(arrStrings.indexOf("string 1")).toBe(0);
		expect(arrStrings.indexOf("string 10")).toBe(-1);
	});
	it('indexOfAlt',function(){
		expect(arrObjs.indexOfAlt("20",function(item){ return item.p})).toBe(1);
		expect(arrObjs.indexOfAlt("201",function(item){ return item.p})).toBe(-1);
	});
	it('innerJoin',function(){
		expect(arrLookup.duplicate(true).innerJoin(arrLookupJoiner.duplicate(true),"_id=_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);
		expect(arrLookup.duplicate(true).innerJoin(arrLookupJoiner.duplicate(true),"_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);
	});
	it('insert',function(){
		arrMix = [1,{},"adsf",10];
		var temp = arrMix.duplicate(true);
		expect(temp.insert('abcd')).toEqual(true);
		expect(temp).toEqual([1,{},"adsf",10,'abcd']);

		temp = arrMix.duplicate(true);
		expect(temp.insert(['abcd',99])).toEqual(true);
		expect(temp).toEqual([1,{},"adsf",10,'abcd',99]);

	});
	it('insertAfter',function(){
		arrMix = [1,{},"adsf",10];
		var temp = arrMix.duplicate(true);
		expect(temp.insertAfter(1,'abcd')).toEqual(true);
		expect(temp).toEqual([1,{},'abcd',"adsf",10]);

		temp = arrMix.duplicate(true);
		expect(temp.insertAfter(1,['abcd',99])).toEqual(true);
		expect(temp).toEqual([1,{},['abcd',99],"adsf",10]);
	});
	it('insertBefore',function(){
		arrMix = [1,{},"adsf",10];
		var temp = arrMix.duplicate(true);
		expect(temp.insertBefore(1,'abcd')).toEqual(true);
		expect(temp).toEqual([1,'abcd',{},"adsf",10]);

		temp = arrMix.duplicate(true);
		expect(temp.insertBefore(1,['abcd',99])).toEqual(true);
		expect(temp).toEqual([1,['abcd',99],{},"adsf",10]);

	});
	it('isEmpty',function(){
		expect(arrObjs.isEmpty()).toBe(false);
		expect([].isEmpty()).toBe(true);
	});
	it('joinLeft',function(){
		expect(arrLookup.duplicate(true).joinLeft(arrLookupJoiner.duplicate(true),"_id=_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);
		expect(arrLookup.duplicate(true).joinLeft(arrLookupJoiner.duplicate(true),"_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);


		expect(arrLookupJoiner.duplicate(true).joinLeft(arrLookup.duplicate(true),"_id=_id")).toEqual([
			{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120, "item" : "abc", "price" : 12, "quantity" : 2 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80, "item" : "jkl", "price" : 20, "quantity" : 1 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70, "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 5, "sku": null, description: "Incomplete", "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 6, "item" : null, "price" : null, "quantity" : null }]);
		expect(arrLookupJoiner.duplicate(true).joinLeft(arrLookup.duplicate(true),"_id")).toEqual([
			{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120, "item" : "abc", "price" : 12, "quantity" : 2 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80, "item" : "jkl", "price" : 20, "quantity" : 1 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70, "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 5, "sku": null, description: "Incomplete", "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 6, "item" : null, "price" : null, "quantity" : null }]);
	});
	it('joinRight',function(){
		expect(arrLookupJoiner.duplicate(true).joinRight(arrLookup.duplicate(true),"_id=_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);
		expect(arrLookupJoiner.duplicate(true).joinRight(arrLookup.duplicate(true),"_id")).toEqual([
			{ "_id" : 1, "item" : "abc", "price" : 12, "quantity" : 2, "sku" : "abc", description: "product 1", "instock" : 120 },
			{ "_id" : 2, "item" : "jkl", "price" : 20, "quantity" : 1, "sku" : "def", description: "product 2", "instock" : 80 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 }]);


		expect(arrLookup.duplicate(true).joinRight(arrLookupJoiner.duplicate(true),"_id=_id")).toEqual([
			{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120, "item" : "abc", "price" : 12, "quantity" : 2 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80, "item" : "jkl", "price" : 20, "quantity" : 1 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70, "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 5, "sku": null, description: "Incomplete", "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 6, "item" : null, "price" : null, "quantity" : null }]);
		expect(arrLookup.duplicate(true).joinRight(arrLookupJoiner.duplicate(true),"_id")).toEqual([
			{ "_id" : 1, "sku" : "abc", description: "product 1", "instock" : 120, "item" : "abc", "price" : 12, "quantity" : 2 },
			{ "_id" : 2, "sku" : "def", description: "product 2", "instock" : 80, "item" : "jkl", "price" : 20, "quantity" : 1 },
			{ "_id" : 3, "sku" : "ijk", description: "product 3", "instock" : 60 },
			{ "_id" : 4, "sku" : "jkl", description: "product 4", "instock" : 70, "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 5, "sku": null, description: "Incomplete", "item" : null, "price" : null, "quantity" : null },
			{ "_id" : 6, "item" : null, "price" : null, "quantity" : null }]);
	});
	it('limit',function(){
		expect(arrObjs.limit(1)).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
	});
	it('map',function(){
		var temp = arrObjs.duplicate(true);
		temp.map(function(item){ item.p = 10; return item; });
		expect(temp).toEqual([
			{id:1,p:10,share:"shared", index: 10,std:4},
			{id:2,p:10,share:"shared", index : 20,std:4},
			{id:3,p:10,share:"shared", index: 30,std:4},
			{id:4,p:10, std:4}]);
	});
	it('mapReduce',function(){
		var reduceFunction1 = function(keyCustId, valuesPrices) {
			return valuesPrices.sum();
		};
		var mapFunction1 = function() {
			$c.emit(this.cust_id, this.price);
		};
		var arr = [{
			_id: 1,
			cust_id: "abc123",
			ord_date: new Date("Oct 04, 2012"),
			status: 'A',
			price: 25,
			items: [ { sku: "mmm", qty: 5, price: 2.5 },
				{ sku: "nnn", qty: 5, price: 2.5 } ]
		},{
			_id: 2,
			cust_id: "abc123",
			ord_date: new Date("Oct 04, 2012"),
			status: 'A',
			price: 25,
			items: [ { sku: "mmm", qty: 5, price: 2.5 },
				{ sku: "nnn", qty: 5, price: 2.5 } ]
		},{
			_id: 1,
			cust_id: "abc124",
			ord_date: new Date("Oct 04, 2012"),
			status: 'B',
			price: 30,
			items: [ { sku: "ooo", qty: 5, price: 2.5 },
				{ sku: "ppp", qty: 5, price: 2.5 } ]
		}];
		expect(arr.mapReduce(mapFunction1,reduceFunction1)).toEqual([{_id:'abc123',value:50},{_id:'abc124',value:30}]);
		expect(arr.mapReduce(mapFunction1,reduceFunction1,{query:{cust_id:'abc123'}})).toEqual([{_id:'abc123',value:50}]);

		expect(arr.mapReduce(mapFunction1,reduceFunction1,{limit:1})).toEqual([{_id:'abc123',value:25}]);

		var rarr = [];
		expect(arr.mapReduce(mapFunction1,reduceFunction1,{out:rarr})).toBe(rarr);

		expect(arr.mapReduce(mapFunction1,reduceFunction1,{limit:1,finalize:function(){return {};}})).toEqual([{_id:'abc123',value:{}}]);
	});
	it('normalize',function(){
		var temp = arrObjs.duplicate(true);
		expect(temp.normalize()).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,p:null,share:null, index:null,std:4}]);
	});
	describe("parallelEach async test",function(){
		var results = [];
		var usersdata = { users:
			[ { username: 'mtglass', name: 'Mark Glass', age: 10 },
				{ username: 'urdum', name: 'Ursula Dumfry', age: 10 },
				{ username: 'hydere', name: 'Henry Dere', age: 10 },
				{ username: 'cumhere', name: 'Cass Umhere', age: 10 },
				{ username: 'bstill', name: 'Bob Stillman', age: 10 },
				{ username: 'cirfuksalot', name: 'Camron', age: 10 },
				{ username: 'chadden', name: 'Corey Hadden', age: 30 },
				{ username: 'squeeb', name: 'Joseph Esquibel', age: 32 },
				{ username: 'cinada', name: 'Clark Inada', age: 31 },
				{ username: 'shurliezalot', name: 'Josh N', age: 10 },
				{ username: 'noze_nutin', name: 'Mai Boss', age: 10 },
				{ username: 'czass', name: 'Cater Zass', age: 10 },
				{ username: 'awesome_game', name: 'clash of clans', age: 21 }]};
		beforeEach(function (done) {
			$c.syncroit(function *() {
				results = yield [
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },
					function*(){ return yield $c.ajax('http://craydent.com/test/users.js'); },


					$c.ajax('http://craydent.com/test/users.js'),
					$c.ajax('http://craydent.com/test/users.js'),
					$c.ajax('http://craydent.com/test/users.js'),
					$c.ajax('http://craydent.com/test/users.js'),
					$c.ajax('http://craydent.com/test/users.js'),
					$c.ajax('http://craydent.com/test/users.js'),
					$c.ajax('http://craydent.com/test/users.js'),
					$c.ajax('http://craydent.com/test/users.js'),
					$c.ajax('http://craydent.com/test/users.js'),
					$c.ajax('http://craydent.com/test/users.js'),

					function (a) { return 1 + a; },
					function (a) { return 2 + a; },
					function (a) { return 3 + a; },
					function (a) { return 4 + a; },
					function (a) { return 5 + a; },
					function (a) { return 6 + a; },
					function (a) { return 7 + a; },
					function (a) { return 8 + a; },
					function (a) { return 9 + a; },
					function (a) { return 10 + a; },
					"asdf"

				].parallelEach([1]);
				if (!results) { console.log('wtf'); }
				done();
			});
		});

		it('parallelEach',function(){
			expect(results).toEqual([
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				usersdata,
				2,3,4,5,6,7,8,9,10,11,"asdf"
			]);
		});

	});
	it('remove',function(){
		//arrMix = [1,{},"adsf",10];
		var temp = arrMix.duplicate(true);
		expect(temp.remove("adsf")).toBe("adsf");
		expect(temp).toEqual([1,{},10]);
		expect(temp.remove("adsf",function(){return 1;})).toEqual({});
		expect(temp).toEqual([1,10]);
	});
	it('removeAll',function(){
		var temp = arrObjs.duplicate(true);
		temp.removeAll();
		expect(temp).toEqual([]);
		expect([].removeAll()).toEqual([]);
		temp = arrObjs.duplicate(true);
		temp.removeAll("10",function(item){ return item.p;});
		temp.removeAll("10",function(value){ return this.indexOfAlt(value,function(item){ return item.p; }); });
		expect(temp).toEqual([
			{ id : 2, p : '20', share : 'shared', index : 20, std : 4 },
			{ id : 3, p : '30', share : 'shared', index : 30, std : 4 },
			{ id : 4, std : 4 }]);
	});
	it('removeAt',function(){
		var temp = arrObjs.duplicate(true);
		expect(temp.removeAt(1)).toEqual({id:2,p:"20",share:"shared", index : 20,std:4});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);
	});
	it('replaceAt',function(){
		var temp = arrObjs.duplicate(true);
		expect(temp.replaceAt(1,{id:5,p:"50",share:"shared", index : 50,std:4})).toEqual({id:2,p:"20",share:"shared", index : 20,std:4});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:5,p:"50",share:"shared", index : 50,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);
	});
	it('scramble',function(){
		var temp = arrObjs.duplicate(true);
		expect(temp.scramble()).not.toEqual(arrObjs);
		expect(temp.length).toEqual(arrObjs.length);
	});
	it('sortBy',function(){
		var temp = arrSort.duplicate(true);
		expect(temp.sortBy('s')).toEqual( [{id:5, s:2},{id:4, s:3},{id:1, s:5},{id:2, s:5},{id:3, s:6}]);

		temp = arrSort.duplicate(true);
		expect(temp.sortBy(['s','!id'])).toEqual( [{id:5, s:2},{id:4, s:3},{id:2, s:5},{id:1, s:5},{id:3, s:6}]);

		temp = arrSort.duplicate(true);
		expect(temp.sortBy('s,!id')).toEqual( [{id:5, s:2},{id:4, s:3},{id:2, s:5},{id:1, s:5},{id:3, s:6}]);

		temp = arrSort.duplicate(true);
		expect(temp.sortBy('s,!id', true)).toEqual([{id:3, s:6},{id:1, s:5},{id:2, s:5},{id:4, s:3},{id:5, s:2}]);

		temp = arrSort.duplicate(true);
		var primer = function(val){ if (val.isOdd()) { return val - 1;} return val;};
		expect(temp.sortBy(['s','id'],false,primer)).toEqual( [{id:4, s:3},{id:5, s:2},{id:1, s:5},{id:2, s:5},{id:3, s:6}]);

		var arr = ['a','b','c','d'], lookup = {a:{s:4},b:{s:3},c:{s:2},d:{s:1}};
		expect(arr.sortBy(['s'],false,null,lookup)).toEqual( ['d','c','b','a']);

		var lookup2 = {a:{s:"a"},b:{s:"B"},c:{s:"c"},d:{s:"d"}};
		expect(arr.sortBy(['s'],false,null,lookup2)).toEqual( ['b','a','c','d']);
		expect(arr.sortBy(['s'],false,null,lookup2,'i')).toEqual( ['a','b','c','d']);
	});
	it('stdev',function(){
		var arr = [1,2,3,4,5,6,7,8,9,0];
		var arr2 = [1,undefined,2,'',3,{},4,[],5,null,function(){},6,7,8,9,0];
		expect(arr.stdev('asdf')).toBe(2.8722813232690143);
		expect(arr2.stdev('asdf2')).toBe(2.8722813232690143);
	});
	it('sum',function(){
		expect(arrMix.sum()).toBe(11);
	});
	it('toSet',function(){
		var arr = arrStrings.duplicate();
		arr.push("string 1");
		arr.toSet();
		expect(arr).toEqual(arrStrings);
		arr = [{},{},{},{}];
		arr.toSet();
		expect(arr).toEqual([{}]);
	});
	it('trim',function(){
		var arr = ["     string 1    ", "  string 2  ", " string 3 ", "string 4"];
		expect(arr.trim()).toEqual(["string 1","string 2","string 3","string 4"]);
		expect(arr).toEqual(["     string 1    ", "  string 2  ", " string 3 ", "string 4"]);
		arr.trim(true);
		expect(arr).toEqual(["string 1","string 2","string 3","string 4"]);
	});
	it('update',function(){
		var temp = arrObjs.duplicate(true);
		temp.update({share:"shared"},{$set:{index:15}});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 15,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		temp.update({share:"shared"},{$set:{index:15}},{multi:true});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 15,std:4},
			{id:2,p:"20",share:"shared", index : 15,std:4},
			{id:3,p:"30",share:"shared", index: 15,std:4},
			{id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		temp.update({share:"shared"},{},{multi:true});
		expect(temp).toEqual([{}, {}, {}, {id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		temp.update({share:"shared"},{});
		expect(temp).toEqual([
			{},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		temp.update({share:"shared"},{$inc:{index:1}},{multi:true});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 11,std:4},
			{id:2,p:"20",share:"shared", index : 21,std:4},
			{id:3,p:"30",share:"shared", index: 31,std:4},
			{id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		temp.update({share:"shared"},{$unset:{index:1}});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		temp.update({share:"shared"},{$currentDate:{currentDate:1}});
		expect(temp[0].currentDate.toString()).toBe((new Date()).toString());
		delete temp[0].currentDate;
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);


		temp = arrObjs.duplicate(true);
		temp.update({},{$min:{index:20},$max:{index:20},$mul:{std:2},$rename:{share:'shared'}},{multi:true});
		expect(temp).toEqual([
			{id:1,p:"10",shared:"shared", index: 20,std:8},
			{id:2,p:"20",shared:"shared", index : 20,std:8},
			{id:3,p:"30",shared:"shared", index: 20,std:8},
			{id:4,index:20,std:8}]);

		var arrArr = [
			{id:1,arr:[
				{ "id" : 1, "score" : 6 },
				{ "id" : 2, "score" : 9 }
			]}
		];
		temp = arrArr.duplicate(true);
		temp.update({},{$push:{arr:{
			$each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ],
			$sort: { score: 1 }
		}}});
		expect(temp).toEqual([{id:1,arr:[
			{ "id" : 1, "score" : 6 },
			{ "id" : 5, "score" : 6 },
			{ "id" : 4, "score" : 7 },
			{ "id" : 3, "score" : 8 },
			{ "id" : 2, "score" : 9 }
		]}]);

		temp = arrArr.duplicate(true);
		temp.update({},{$push:{arr:{
			$each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ],
			$slice: -2
		}}});
		expect(temp).toEqual([{id:1,arr:[
			{ id: 4, score: 7 }, { id: 5, score: 6 }
		]}]);

		temp = arrArr.duplicate(true);
		temp.update({},{$push:{arr:{
			$each: [ { id: 3, score: 8 }, { id: 4, score: 7 }, { id: 5, score: 6 } ],
			$position: 1
		}}});
		expect(temp).toEqual([{id:1,arr:[
			{ "id" : 1, "score" : 6 },
			{ "id" : 3, "score" : 8 },
			{ "id" : 4, "score" : 7 },
			{ "id" : 5, "score" : 6 },
			{ "id" : 2, "score" : 9 }
		]}]);

		temp = arrArr.duplicate(true);
		temp.update({},{$pop:{arr: -1}});
		expect(temp).toEqual([{id:1,arr:[
			{ "id" : 2, "score" : 9 }
		]}]);

		temp = arrArr.duplicate(true);
		temp.update({},{$pop:{arr: 1}});
		expect(temp).toEqual([{id:1,arr:[
			{ "id" : 1, "score" : 6 }
		]}]);

		temp = [{ id: 1, scores: [ 0, 2, 5, 5, 1, 0 ] }];
		temp.update({},{$pullAll:{scores: [0,5]}});
		expect(temp).toEqual([{id:1,scores:[2,1]}]);

		temp = arrObjs.duplicate(true);
		temp.update({nonexistant:"shared"},{$set:{index:15}},{upsert:true});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4},{index:15}]);

		temp = arrObjs.duplicate(true);
		temp.update({nonexistant:"shared"},{index:15},{upsert:true});
		expect(temp).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4},{index:15}]);
	});
	it('upsert',function(){
		var temp = arrObjs.duplicate(true);
		// temp = arrObjs.duplicate(true);
		expect(temp.upsert({id:1,p:"10",share:"shared", index: 10,std:4},"id")).toEqual({
			insertedIndexes:[],
			updatedIndexes:[],
			unchangedIndexes:[0],
			inserted: [],
			updated:[],
			unchanged:[{id:1,p:"10",share:"shared", index: 10,std:4}]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		expect(temp.upsert({id:5,p:"10",share:"shared", index: 10,std:4},"id")).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
				{id:2,p:"20",share:"shared", index : 20,std:4},
				{id:3,p:"30",share:"shared", index: 30,std:4},
				{id:4,std:4},{id:5,p:"10",share:"shared", index: 10,std:4}]);
		temp = arrObjs.duplicate(true);
		expect(temp.upsert({id:5,p:"10",share:"shared", index: 10,std:4},"id")).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]
		});

		temp = arrObjs.duplicate(true);
		expect(temp.upsert({id:5,p:"10",share:"shared", index: 10,std:4},"id",function(doc,record){
			return true;
		})).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]
		});
		temp = arrObjs.duplicate(true);
		expect(temp.upsert({id:1,p:"10",share:"shared", index: 10,std:4},"id",function(){return true;})).toEqual({
			insertedIndexes:[],
			updatedIndexes:[],
			unchangedIndexes:[0],
			inserted: [],
			updated:[],
			unchanged:[{id:1,p:"10",share:"shared", index: 10,std:4}]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		expect(temp.upsert({id:1,p:"10",share:"shared", index: 10,std:4},"id",function(){return false;})).toEqual({
			insertedIndexes:[],
			updatedIndexes:[0],
			unchangedIndexes:[],
			inserted: [],
			updated:[{id:1,p:"10",share:"shared", index: 10,std:4}],
			unchanged:[]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);




		temp = arrObjs.duplicate(true);
		expect(temp.upsert([{id:1,p:"10",share:"shared", index: 10,std:4}],"id")).toEqual({
			insertedIndexes:[],
			updatedIndexes:[],
			unchangedIndexes:[0],
			inserted: [],
			updated:[],
			unchanged:[{id:1,p:"10",share:"shared", index: 10,std:4}]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		expect(temp.upsert([{id:5,p:"10",share:"shared", index: 10,std:4}],"id")).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4},{id:5,p:"10",share:"shared", index: 10,std:4}]);
		temp = arrObjs.duplicate(true);
		expect(temp.upsert([{id:5,p:"10",share:"shared", index: 10,std:4}],"id")).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]
		});

		temp = arrObjs.duplicate(true);
		expect(temp.upsert([{id:5,p:"10",share:"shared", index: 10,std:4}],"id",function(doc,record){
			return true;
		})).toEqual({
			insertedIndexes:[4],
			updatedIndexes:[],
			unchangedIndexes:[],
			inserted: [{id:5,p:"10",share:"shared", index: 10,std:4}],
			updated:[],
			unchanged:[]
		});
		temp = arrObjs.duplicate(true);
		expect(temp.upsert([{id:1,p:"10",share:"shared", index: 10,std:4}],"id",function(){return true;})).toEqual({
			insertedIndexes:[],
			updatedIndexes:[],
			unchangedIndexes:[0],
			inserted: [],
			updated:[],
			unchanged:[{id:1,p:"10",share:"shared", index: 10,std:4}]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);

		temp = arrObjs.duplicate(true);
		expect(temp.upsert([{id:1,p:"10",share:"shared", index: 10,std:4}],"id",function(){return false;})).toEqual({
			insertedIndexes:[],
			updatedIndexes:[0],
			unchangedIndexes:[],
			inserted: [],
			updated:[{id:1,p:"10",share:"shared", index: 10,std:4}],
			unchanged:[]
		});
		expect(temp).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4},
			{id:4,std:4}]);
	});
	it('where',function(){
		var temp = arrObjs.duplicate(true);
		expect(arrObjs.where({share:"shared"})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4}]);

		expect(arrObjs.where({index:{$eq:10}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect(arrObjs.where({index:{$gt:20}})).toEqual([{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect(arrObjs.where({index:{$lt:20}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect(arrObjs.where({index:{$gte:20}})).toEqual([{id:2,p:"20",share:"shared", index : 20,std:4},{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect(arrObjs.where({index:{$lte:20}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect(arrObjs.where({index:{$ne:20}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect(arrObjs.where({index:{$in:[10,20]}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect(arrObjs.where({index:{$nin:[10,20]}})).toEqual([{id:3,p:"30",share:"shared", index: 30,std:4},{id:4,std:4}]);
		expect(arrObjs.where({$and:[{std:4},{index:10}]})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect(arrObjs.where({$and:[{std:5},{index:10}]})).toEqual([]);
		expect(arrObjs.where({$or:[{index:20},{index:10}]})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect(arrObjs.where({index:{ $not: { $gte: 20 }}})).toEqual([{id:1,p:"10",share:"shared", index: 10,std:4},{id:4,std:4}]);
		expect(arrObjs.where({$nor:[{index:20},{index:10}]})).toEqual([{id:3,p:"30",share:"shared", index: 30,std:4},{id:4,std:4}]);
		expect(arrObjs.where({index:{$exists:true}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect(arrObjs.where({index:{$exists:false}})).toEqual([{id:4,std:4}]);
		expect(arrObjs.where({index:{$type:Number}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4},
			{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect(arrObjs.where({index:{$mod:[3,2]}})).toEqual([
			{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect(arrObjs.where({index:{$regex:/[12]/}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4},
			{id:2,p:"20",share:"shared", index : 20,std:4}]);
		expect(arrObjs.where({$where:"this.index > 20"})).toEqual([
			{id:3,p:"30",share:"shared", index: 30,std:4}]);
		expect(arrObjs.where({$where:function(){ return this.index < 20;}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect(arrObjs.where(function(){ return this.index < 20;})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4}]);
		expect([{id:1,p:"10",share:"shared", index: 10,std:4,tags:['a','b']}].where({tags:{$all:['b','a']}})).toEqual([
			{id:1,p:"10",share:"shared", index: 10,std:4,tags:['a','b']}]);
		expect([{id:1,p:"10",share:"shared", index: 10,std:4,tags:['c','b']}].where({tags:['b','a']})).toEqual([]);

		temp = [
			{ _id: 1, results: [
				{ product: "abc", score: 10 },
				{ product: "xyz", score: 5 } ] },
			{ _id: 2, results: [
				{ product: "xyz", score: 7 } ] },
			{ _id: 3, results: [
				{ product: "abc", score: 7 },
				{ product: "xyz", score: 8 } ] },
			{ _id: 3 },
			{ _id: 4, results: [ ] }];
		expect(temp.where( { results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } } })).toEqual([
			{"_id":3,"results":[{"product":"abc","score":7},{"product":"xyz","score":8}]}
		]);
		expect(temp.where( { results: { $size: 1 } })).toEqual([
			{ _id: 2, results: [ { product: "xyz", score: 7 } ] }
		]);
		expect(temp.where( { results: { $size: 0 } })).toEqual([{_id:3},{ _id: 4, results: [ ] }]);
		expect(temp.where( { results: { $size: 2 } })).toEqual([
			{ _id: 1, results: [ { product: "abc", score: 10 }, { product: "xyz", score: 5 } ] },
			{"_id":3,"results":[{"product":"abc","score":7},{"product":"xyz","score":8}]}
		]);

		temp = [
			{section: 'Result',category:"imaging"},
			{section: 'Result',category:"blahimagingblah"},
			{section: 'Result',category:"Imaging"},
			{section: 'Result',category:"image"}];
		expect(temp.where( { category:/imaging/i, section: { '$ne': 'history' } })).toEqual([
			{section: 'Result',category:"imaging"},
			{section: 'Result',category:"blahimagingblah"},
			{section: 'Result',category:"Imaging"}]);
	});
});
describe ('Date', function () {
	it('format',function(){
		var date = new Date('1/8/2016 13:00:00');

		expect(date.format('m/d/Y')).toBe("01/08/2016");

		// Day
		expect(date.format('d')).toBe('08');
		expect(date.format('%d')).toBe('08');
		expect(date.format('D')).toBe('Fri');
		expect(date.format('j')).toBe('8');
		expect(date.format('l')).toBe('Friday');
		expect(date.format('N')).toBe('5');
		expect(date.format('S')).toBe('th');
		expect(date.format('w')).toBe('5');
		expect(date.format('%w')).toBe('6');
		expect(date.format('z')).toBe('7');
		expect(date.format('%j')).toBe('8');

		// Week
		expect(date.format('W')).toBe('1');
		expect(date.format('%U')).toBe('01');

		// Month
		expect(date.format('F')).toBe('January');
		expect(date.format('m')).toBe('01');
		expect(date.format('%m')).toBe('01');
		expect(date.format('M')).toBe('Jan');
		expect(date.format('%M')).toBe('Jan');
		expect(date.format('n')).toBe('1');
		expect(date.format('t')).toBe('31');

		// Year
		expect(date.format('L')).toBe('1');
		expect(date.format('o')).toBe('2016');
		expect(date.format('Y')).toBe('2016');
		expect(date.format('%Y')).toBe('2016');
		expect(date.format('y')).toBe('16');

		// Time
		expect(date.format('a')).toBe('pm');
		expect(date.format('A')).toBe('PM');
		expect(date.format('B')).toBe('916');
		expect(date.format('g')).toBe('1');
		expect(date.format('G')).toBe('13');
		expect(date.format('h')).toBe('01');
		expect(date.format('H')).toBe('13');
		expect(date.format('i')).toBe('00');
		expect(date.format('s')).toBe('00');
		expect(date.format('u')).toBe((date.getTime() * 1000).toString());
		expect(date.format('%L')).toBe((date.getTime()).toString());

		// Timezone
		expect(date.format('e')).toBe('Pacific Standard Time (North America)');
		expect(date.format('I')).toBe('1');
		expect(date.format('O')).toBe('-0800');
		expect(date.format('P')).toBe('-08:00');
		expect(date.format('T')).toBe('PST');
		expect(date.format('Z')).toBe('480');

		// Other
		expect(date.format('c')).toBe('2016-01-08T21:00:00.000Z');
		expect(date.format('r')).toBe('Fri, 08 Jan 2016 13:00:00 -0800');
		expect(date.format('U')).toBe('1452286800');

		expect(date.format('yymmdd')).toBe('161601010808');
	});
	it('getDayOfYear',function(){
		expect($c.getDayOfYear(new Date('1/1/2016'))).toBe(1);
		expect($c.getDayOfYear(new Date('3/1/2016'))).toBe(61);
	});
	it('getWeek',function(){
		expect($c.getWeek(new Date('1/1/2016'))).toBe(1);
		expect($c.getWeek(new Date('1/8/2016'))).toBe(2);
		expect($c.getWeek(new Date('2/1/2016'))).toBe(6);
		expect($c.getWeek(new Date('2/7/2016'))).toBe(7);
		expect($c.getWeek(new Date('12/31/2016'))).toBe(53);
	});
	it('isValidDate',function(){
		var ndate = new Date('adsfaf');
		expect($c.isValidDate(ndate)).toBe(false);
		expect($c.isValidDate(new Date())).toBe(true);
	});
});
describe ('Number', function () {
	it('aboutEqualTo',function(){
		expect((10).aboutEqualTo(9,1)).toBe(true);
		expect((10).aboutEqualTo(9,1.1)).toBe(true);
		expect((10).aboutEqualTo(9,0.9)).toBe(false);
		expect((8).aboutEqualTo(9,1)).toBe(true);
		expect((8).aboutEqualTo(9,1.1)).toBe(true);
		expect((8).aboutEqualTo(9,0.9)).toBe(false);
		expect((7).aboutEqualTo(9,1.1)).toBe(false);
	});
	it('isOdd',function(){
		expect((10).isOdd()).toBe(false);
		expect((9).isOdd()).toBe(true);
	});
	it('isEven',function(){
		expect((10).isEven()).toBe(true);
		expect((9).isEven()).toBe(false);
	});

	it('toCurrencyNotation',function(){
		expect((1000).toCurrencyNotation()).toBe("1,000");
		expect((1000000).toCurrencyNotation()).toBe("1,000,000");
		expect((1000).toCurrencyNotation('.')).toBe('1.000');
	});

});
describe ('Function', function () {
	function temp (par1,par2) {
		this.p = 1;
		this.p2 = 2;
	}
	it('getParameters',function(){
		expect(temp.getParameters()).toEqual(['par1','par2']);
	});
	it('getName',function(){
		expect(temp.getName()).toEqual('temp');
	});
	it('extends',function(){
		function cls(){
			this.p3 = 0;
		}
		cls.extends(temp,true);
		var clz = new cls();
		 //console.log(cls.extends(temp).toString(), (new cls()).p1, cls.prototype);
        expect(clz.p).toEqual(1);
        expect(clz.p2).toEqual(2);
        expect(clz.p3).toEqual(0);
        expect(clz.construct.toString()).toEqual($c.foo.toString());
	});
	it('on',function(){
		function testEmit() { return $c.emit('listener'); }
		testEmit.on('listener',function(){ return 'hello world'; });
		testEmit.on('listener',function(){ return 'hello world again'; });

		expect(testEmit()).toEqual(['hello world','hello world again']);
	});
	it('then',function(){
		function testNext() { return $c.next(); }
		testNext.then(function(){ return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);
	});
	it('catch',function(){
		function testNext() { return $c.next(); }
		testNext.then(function(){ throw 'adsf'; });
		testNext.catch(function(){ return 'hello world'; });
		expect(testNext()).toEqual(['hello world']);

	});
});
describe ('RegExp', function () {
	it('addFlags',function(){
		expect(/a/.addFlags('gim').source).toBe((/a/gim).source);
		expect(/a/.addFlags('igm').source).toBe((/a/igm).source);
		expect(/a/.addFlags('g').source).toBe((/a/g).source);
		expect(/a/.addFlags('i').source).toBe((/a/i).source);
		expect(/a/.addFlags('m').source).toBe((/a/m).source);
	});
});
describe ('Object', function () {
	it('changes',function(){
		var obj1 = {id:1,prop1:"prop1",prop3:""};
		var obj2 = {id:2,prop1:"propupdated",prop2:"prop2"};
		expect(obj1.changes(obj2)).toEqual({
			$length:4,
			$add:['prop2'],
			$update:["id","prop1"],
			$delete:["prop3"],
			id:2,
			prop1:"propupdated",
			prop2:"prop2",
			prop3:null
		});

	});
	it('contains',function(){
		expect("asdf".contains("a")).toBe(true);
		expect("asdf".contains("e")).toBe(false);
		expect("asdf".contains(/^as/)).toBe(true);
		expect("asdf".contains(/ad/)).toBe(false);
		expect(['q','b'].contains("b")).toBe(true);
		expect(['q','b'].contains("c")).toBe(false);
		expect(['q','b'].contains(/b/)).toBe(true);
		expect(['q','b'].contains(['a','c'])).toBe(false);
		expect(['q','b'].contains(['a','q'])).toBe("q");
		expect(['q','b'].contains('a',function(){ return 'a';})).toBe(true);
		expect(['q','b'].contains(function(val,prop,arr){ return val=='b';})).toBe(true);
		expect({q:"asdf",b:"abbb"}.contains("abbb")).toBe(true);
		expect({q:"asdf",b:"abbb"}.contains("asdfb")).toBe(false);
	});
	it('copyObject',function(){
		function B(){ this.hi = "hello"; }
		var b = new B();
		var tb = b.copyObject();
		expect(tb).toEqual({hi:"hello"});
		expect(tb.constructor).not.toEqual(B);
	});
	it('duplicate',function(){
		var obj = {hi:"hello",bye:"ciao",o:{blah:''}};
		var tobj = obj.duplicate();
		expect(tobj).not.toBe(obj);
		expect(tobj.o).toBe(tobj.o);
		tobj = obj.duplicate(true);
		expect(tobj.o).not.toBe(obj.o);


		function B(){ this.hi = "hello"; }
		var b = new B();
		var tb = b.duplicate();
		expect(tb).toEqual({hi:"hello"});
		expect(tb.constructor).toEqual(B);


		function A(){console.log('');}
		var obj = {use:A};
		var obj2 = obj.duplicate(true);
		var obj3 = obj.duplicate();
		expect(obj.use).toEqual(A);
		expect(obj2).not.toBe(obj);
		expect(obj2.use).not.toBe(obj.use);
		expect(obj3.use).toBe(obj.use);
	});
	it('eachProperty',function(){
		var arrp = [], arrv = [], obj = {a:"a1",b:'b1',c:'c1'};
		obj.eachProperty(function(val,prop){
			arrp.push(prop);
			arrv.push(val);
		});
		expect(arrp).toEqual(['a','b','c']);
		expect(arrv).toEqual(['a1','b1','c1']);
	});
	it('equals',function(){
		expect("s".equals("s")).toBe(true);
		expect("s".equals("ss")).toBe(false);
		expect((0).equals(0)).toBe(true);
		expect((1).equals(2)).toBe(false);
		expect({}.equals({})).toBe(true);
		expect({}.equals({hi:''})).toBe(false);
		expect({hi:'',bye:''}.equals({hi:''},['hi'])).toBe(true);
		expect([].equals([])).toBe(true);
		expect([].equals([''])).toBe(false);

	});
	it('every',function(){
		expect(['a','b','c'].every(function(val,prop,arr){ return val; })).toBe(true);
		expect(['a','','c'].every(function(val,prop,arr){ return val; })).toBe(false);

		expect({a:'a',b:'b',c:'c'}.every(function(val,prop,arr){ return val; })).toBe(true);
		expect({a:'a',b:'',c:'c'}.every(function(val,prop,arr){ return val; })).toBe(false);

	});
	it('getClass',function(){
		function C1() {}
		var c = new C1();
		expect(c.getClass()).toBe("C1");
	});
	it('getProperty',function(){
		var o = {path:{path:"hello world",arr:[{foo:"bar"}]}};
		expect(o.getProperty("path.path")).toBe("hello world");
		expect(o.getProperty("path.arr.foo")).toBe(undefined);
		expect(o.getProperty("path.arr.0.foo")).toBe("bar");
	});
	it('getValue',function(){
		var f = function(num){return (num || 0 ) + 1; };
		var n = 10;
		var s = "s";
		var o = {};
		var a = [];
		expect(f.getValue()).toBe(1);
		expect(n.getValue()).toBe(10);
		expect(s.getValue()).toBe("s");
		expect(o.getValue()).toEqual({});
		expect([].getValue()).toEqual([]);


		expect($c.foo.getValue([-1],1)).toBe(1);
		expect($c.getValue(null,n)).toBe(10);
		expect($c.getValue(null,s)).toBe("s");
		expect($c.getValue(null,o)).toEqual({});
		expect($c.getValue(null,[])).toEqual([]);
	});
	it('has',function(){
		var obj = {hi:""};
		expect(obj.has("hi")).toBe(true);
		expect(obj.has("hasOwnProperty")).toBe(false);

	});
	it('isArray',function(){
		expect([].isArray()).toBe(true);
		expect((true).isArray()).toBe(false);
		expect((new Date()).isArray()).toBe(false);
		expect(({nodeType:1}).isArray()).toBe(false);
		expect((2.001).isArray()).toBe(false);
		expect((function(){}).isArray()).toBe(false);
		expect((function*(){}).isArray()).toBe(false);
		expect((2).isArray()).toBe(false);
		expect(((new Promise(function(){}))).isArray()).toBe(false);
		expect(({}).isArray()).toBe(false);
		expect((/k/).isArray()).toBe(false);
		expect(("").isArray()).toBe(false);
	});
	it('isBetween',function(){
		expect((10).isBetween(11,9)).toBe(false);
		expect((10).isBetween(9,11)).toBe(true);
		expect((10).isBetween(10,11)).toBe(false);
		expect((10).isBetween(10,11,true)).toBe(true);
		expect(("b").isBetween("a","c")).toBe(true);
		expect(("b").isBetween("b","c")).toBe(false);
		expect(("b").isBetween("b","c",true)).toBe(true);
	});
	it('isBoolean',function(){
		expect([].isBoolean()).toBe(false);
		expect((true).isBoolean()).toBe(true);
		expect((new Date()).isBoolean()).toBe(false);
		expect(({nodeType:1}).isBoolean()).toBe(false);
		expect((2.001).isBoolean()).toBe(false);
		expect((function(){}).isBoolean()).toBe(false);
		expect((function*(){}).isBoolean()).toBe(false);
		expect((2).isBoolean()).toBe(false);
		expect((new Promise(function(){})).isBoolean()).toBe(false);
		expect(({}).isBoolean()).toBe(false);
		expect((/k/).isBoolean()).toBe(false);
		expect(("").isBoolean()).toBe(false);
	});
	it('isDate',function(){
		expect(([]).isDate()).toBe(false);
		expect((true).isDate()).toBe(false);
		expect((new Date()).isDate()).toBe(true);
		expect(({nodeType:1}).isDate()).toBe(false);
		expect((2.001).isDate()).toBe(false);
		expect((function(){}).isDate()).toBe(false);
		expect((function*(){}).isDate()).toBe(false);
		expect((2).isDate()).toBe(false);
		expect((new Promise(function(){})).isDate()).toBe(false);
		expect(({}).isDate()).toBe(false);
		expect((/k/).isDate()).toBe(false);
		expect(("").isDate()).toBe(false);

	});
	it('isDomElement',function(){
		expect(([]).isDomElement()).toBe(false);
		expect((true).isDomElement()).toBe(false);
		expect((new Date()).isDomElement()).toBe(false);
		expect(({nodeType:1}).isDomElement()).toBe(true);
		expect((2.001).isDomElement()).toBe(false);
		expect((function(){}).isDomElement()).toBe(false);
		expect((function*(){}).isDomElement()).toBe(false);
		expect((2).isDomElement()).toBe(false);
		expect((new Promise(function(){})).isDomElement()).toBe(false);
		expect(({}).isDomElement()).toBe(false);
		expect((/k/).isDomElement()).toBe(false);
		expect(("").isDomElement()).toBe(false);

	});
	it('isEmpty',function(){
		expect((function(){}).isEmpty()).toBe(true);
		expect(({}).isEmpty()).toBe(true);
		expect(([]).isEmpty()).toBe(true);


		expect((function(){ var b; }).isEmpty()).toBe(false);
		expect(({hi:""}).isEmpty()).toBe(false);
		expect((['']).isEmpty()).toBe(false);
	});
	it('isFloat',function(){
		expect(([]).isFloat()).toBe(false);
		expect((true).isFloat()).toBe(false);
		expect((new Date()).isFloat()).toBe(false);
		expect(({nodeType:1}).isFloat()).toBe(false);
		expect((2.001).isFloat()).toBe(true);
		expect((function(){}).isFloat()).toBe(false);
		expect((function*(){}).isFloat()).toBe(false);
		expect((2).isFloat()).toBe(true);
		expect((new Promise(function(){})).isFloat()).toBe(false);
		expect(({}).isFloat()).toBe(false);
		expect((/k/).isFloat()).toBe(false);
		expect(("").isFloat()).toBe(false);

	});
	it('isFunction',function(){
		expect(([]).isFunction()).toBe(false);
		expect((true).isFunction()).toBe(false);
		expect((new Date()).isFunction()).toBe(false);
		expect(({nodeType:1}).isFunction()).toBe(false);
		expect((2.001).isFunction()).toBe(false);
		expect((function(){}).isFunction()).toBe(true);
		expect((function*(){}).isFunction()).toBe(false);
		expect((2).isFunction()).toBe(false);
		expect((new Promise(function(){})).isFunction()).toBe(false);
		expect(({}).isFunction()).toBe(false);
		expect((/k/).isFunction()).toBe(false);
		expect(("").isFunction()).toBe(false);

	});
	it('isGenerator',function(){
		expect(([]).isGenerator()).toBe(false);
		expect((true).isGenerator()).toBe(false);
		expect((new Date()).isGenerator()).toBe(false);
		expect(({nodeType:1}).isGenerator()).toBe(false);
		expect((2.001).isGenerator()).toBe(false);
		expect((function(){}).isGenerator()).toBe(false);
		expect((function*(){}).isGenerator()).toBe(true);
		expect((2).isGenerator()).toBe(false);
		expect((new Promise(function(){})).isGenerator()).toBe(false);
		expect(({}).isGenerator()).toBe(false);
		expect((/k/).isGenerator()).toBe(false);
		expect(("").isGenerator()).toBe(false);

	});
	it('isGeolocation',function(){
		function Geolocation () {};
		var g = new Geolocation();
		expect(([]).isGeolocation()).toBe(false);
		expect((g).isGeolocation()).toBe(true);
	});
	it('isInt',function(){
		expect(([]).isInt()).toBe(false);
		expect((true).isInt()).toBe(false);
		expect((new Date()).isInt()).toBe(false);
		expect(({nodeType:1}).isInt()).toBe(false);
		expect((2.001).isInt()).toBe(false);
		expect((function(){}).isInt()).toBe(false);
		expect((function*(){}).isInt()).toBe(false);
		expect((2).isInt()).toBe(true);
		expect((new Promise(function(){})).isInt()).toBe(false);
		expect(({}).isInt()).toBe(false);
		expect((/k/).isInt()).toBe(false);
		expect(("").isInt()).toBe(false);

	});
	it('isNumber',function(){
		expect(([]).isNumber()).toBe(false);
		expect((true).isNumber()).toBe(false);
		expect((new Date()).isNumber()).toBe(false);
		expect(({nodeType:1}).isNumber()).toBe(false);
		expect((2.001).isNumber()).toBe(true);
		expect((function(){}).isNumber()).toBe(false);
		expect((function*(){}).isNumber()).toBe(false);
		expect((2).isNumber()).toBe(true);
		expect((new Promise(function(){})).isNumber()).toBe(false);
		expect(({}).isNumber()).toBe(false);
		expect((/k/).isNumber()).toBe(false);
		expect(("").isNumber()).toBe(false);

	});
	it('isPromise',function(){
		expect(([]).isPromise()).toBe(false);
		expect((true).isPromise()).toBe(false);
		expect((new Date()).isPromise()).toBe(false);
		expect(({nodeType:1}).isPromise()).toBe(false);
		expect((2.001).isPromise()).toBe(false);
		expect((function(){}).isPromise()).toBe(false);
		expect((function*(){}).isPromise()).toBe(false);
		expect((2).isPromise()).toBe(false);
		expect((new Promise(function(){})).isPromise()).toBe(true);
		expect(({}).isPromise()).toBe(false);
		expect((/k/).isPromise()).toBe(false);
		expect(("").isPromise()).toBe(false);

	});
	it('isObject',function(){
		expect(([]).isObject()).toBe(false);
		expect((true).isObject()).toBe(false);
		expect((new Date()).isObject()).toBe(false);
		expect(({nodeType:1}).isObject()).toBe(true);
		expect((2.001).isObject()).toBe(false);
		expect((function(){}).isObject()).toBe(false);
		expect((function*(){}).isObject()).toBe(false);
		expect((2).isObject()).toBe(false);
		expect((new Promise(function(){})).isObject()).toBe(false);
		expect(({}).isObject()).toBe(true);
		expect((/k/).isObject()).toBe(false);
		expect(("").isObject()).toBe(false);

	});
	it('isRegExp',function(){
		expect(([]).isRegExp()).toBe(false);
		expect((true).isRegExp()).toBe(false);
		expect((new Date()).isRegExp()).toBe(false);
		expect(({nodeType:1}).isRegExp()).toBe(false);
		expect((2.001).isRegExp()).toBe(false);
		expect((function(){}).isRegExp()).toBe(false);
		expect((function*(){}).isRegExp()).toBe(false);
		expect((2).isRegExp()).toBe(false);
		expect((new Promise(function(){})).isRegExp()).toBe(false);
		expect(({}).isRegExp()).toBe(false);
		expect((/k/).isRegExp()).toBe(true);
		expect(("").isRegExp()).toBe(false);

	});
	it('isString',function(){
		expect(([]).isString()).toBe(false);
		expect((true).isString()).toBe(false);
		expect((new Date()).isString()).toBe(false);
		expect(({nodeType:1}).isString()).toBe(false);
		expect((2.001).isString()).toBe(false);
		expect((function(){}).isString()).toBe(false);
		expect((function*(){}).isString()).toBe(false);
		expect((2).isString()).toBe(false);
		expect((new Promise(function(){})).isString()).toBe(false);
		expect(({}).isString()).toBe(false);
		expect((/k/).isString()).toBe(false);
		expect(("").isString()).toBe(true);

	});
	it('itemCount',function(){
		var obj = {hi:""};
		expect((obj).itemCount()).toBe(1);
		expect(({}).itemCount()).toBe(0);
		expect($c.itemCount(undefined)).toBe(undefined);
	});
	it('keyOf',function(){
		expect(({hi:"hello",world:"worlds"}).keyOf("worlds")).toBe("world");
		expect(({hi:"worlds",world:"worlds"}).keyOf("worlds")).toBe("hi");
	});
	it('map',function(){
		var obj = {hi:"hello",world:"world",index:1};
		obj.map(function(val){ return val += 10;});
		expect(obj).toEqual({hi:"hello10",world:"world10",index:11});
	});
	it('merge',function(){
		var obj1 = {id:1,prop1:"prop1"};
		var obj2 = {id:2,prop2:"prop2"};
		var merged = obj1.merge(obj2);
		expect(merged).toBe(obj1);
		merged = obj1.merge(obj2,{clone:true});
		expect(merged).not.toBe(obj1);
		obj1 = {id:1,prop1:"prop1"};
		obj2 = {id:2,prop2:"prop2"};
		expect(obj1.merge(obj2,{onlyShared:true,clone:true})).toEqual({id:2,prop1:"prop1"});
		expect(obj1.merge(obj2,{intersect:true,clone:true})).toEqual({id:2});
		obj1 = {id:1,prop1:{p1:"adsf"},arr:[]};
		obj2 = {id:2,prop1:{p2:";lkj"},arr:['1234']};
		expect(obj1.merge(obj2,{recurse:true})).toEqual({id:2,prop1:{p1:"adsf",p2:";lkj"},arr:['1234']});
	});
	it('setProperty',function(){
		var o = {};
		expect(o.setProperty("path.path","hello world")).toBe(true);
		expect(o).toEqual({path:{path:"hello world"}});
		expect(o.setProperty("path.arr.0.foo","bar")).toBe(true);
		expect(o).toEqual({path:{path:"hello world",arr:[{foo:"bar"}]}});
	});
	it('toStringAlt',function(){
		var obj = {hi:"hello ",place:"world"};
		expect(obj.toStringAlt()).toBe("&hi=hello &place=world");
		expect(obj.toStringAlt("-")).toBe("&hi-hello &place-world");
		expect(obj.toStringAlt("=","@")).toBe("@hi=hello @place=world");
		expect(obj.toStringAlt("=","@",true)).toBe("@hi=hello%20@place=world");
	});
});
describe ('Global classes', function () {
	var arr = [1,2,4,5,6],
		obj = {p1:1,p2:2,p4:4,p5:5,p6:6},
		oarr = [{p:1},{p:2},{p:4},{p:5},{p:6}],
		setarr = [{p:1},{p:2},{p:4},{p:5},{p:5},{p:6}];
	// TO/DO Benchmarker
	//it('Benchmarker',function(){
	//
	//});
	it('Cursor',function(){
		var cursor = new $c.Cursor(arr);
		expect(cursor.current).toBe(1);
		expect(cursor.hasNext()).toBe(true);
		cursor.setNextIndex(10);
		expect(cursor.hasNext()).toBe(true);
		expect(cursor.next()).toEqual({value:6,done:true});
		expect(cursor.current).toBe(6);
		expect(cursor.hasNext()).toBe(false);
		cursor.setNextIndex(-10);
		expect(cursor.hasNext()).toBe(true);
		expect(cursor.current).toBe(1);
		expect(cursor.next()).toEqual({value:1,done:false});
		expect(cursor.current).toBe(1);


		cursor = new $c.Cursor(obj);
		expect(cursor.current).toBe(1);
		expect(cursor.hasNext()).toBe(true);
		cursor.setNextIndex(10);
		expect(cursor.hasNext()).toBe(true);
		expect(cursor.next()).toEqual({value:6,done:true});
		expect(cursor.current).toBe(6);
		expect(cursor.hasNext()).toBe(false);
		cursor.setNextIndex(-10);
		expect(cursor.hasNext()).toBe(true);
		expect(cursor.current).toBe(1);
		expect(cursor.next()).toEqual({value:1,done:false});
		expect(cursor.current).toBe(1);
	});
	it('OrderedList',function(){
		var ol = new $c.OrderedList(arr);
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:1,done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:2,done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:4,done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:5,done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:6,done:true});
		expect(ol.add(3)).toEqual(true);
		expect(ol.length).toEqual(6);
		expect(ol[2]).toBe(3);



		ol = new $c.OrderedList(oarr,function(a,b){if (a.p < b.p) {return -1;}if (a.p > b.p) {return 1;}return 0;});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:1},done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:2},done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:4},done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:5},done:false});
		expect(ol.hasNext()).toBe(true);
		expect(ol.next()).toEqual({value:{p:6},done:true});
		expect(ol.add({p:3})).toEqual(true);
		expect(ol.length).toEqual(6);
		expect(ol[2].p).toBe(3);
	});
	it('Queue',function(){
		var queue = new $c.Queue(oarr);
		expect([].concat(queue)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6}]);
		expect(queue.hasNext()).toBe(true);
		queue.enqueue({p:7});
		expect([].concat(queue)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6},{p:7}]);
		expect(queue.dequeue()).toEqual({p:1});
		expect([].concat(queue)).toEqual([{p:2},{p:4},{p:5},{p:6},{p:7}]);
		expect(queue.next()).toEqual({value:{p:2},done:false});
		expect(queue.next()).toEqual({value:{p:4},done:false});
		expect(queue.next()).toEqual({value:{p:5},done:false});
		expect(queue.next()).toEqual({value:{p:6},done:false});
		expect(queue.next()).toEqual({value:{p:7},done:true});
	});
	it('Set',function(){
		var set = new $c.Set(setarr);
		expect([].concat(set)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6}]);
		expect(set.hasNext()).toBe(true);
		expect(set.push({p:1})).toBe(6);
		expect([].concat(set)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6},{p:1}]);
		set.clean();
		expect([].concat(set)).toEqual([{p:1},{p:2},{p:4},{p:5},{p:6}]);
		expect(set.next()).toEqual({value:{p:1},done:false});
		expect(set.next()).toEqual({value:{p:2},done:false});
		expect(set.next()).toEqual({value:{p:4},done:false});
		expect(set.next()).toEqual({value:{p:5},done:false});
		expect(set.next()).toEqual({value:{p:6},done:true});
		set.clear();
		expect([].concat(set)).toEqual([]);
	});
});
// TODO: Global http methods
describe ('Global http methods', function () {
	// TODO $COOKIE
	it('$COOKIE',function(){

	});
	// TODO $DELETE
	it('$DELETE',function(){

	});
	// TODO $GET
	it('$GET',function(){

	});
	// TODO $HEADER
	it('$HEADER',function(){

	});
	// TODO $PAYLOAD
	it('$PAYLOAD',function(){

	});
	// TODO $POST
	it('$POST',function(){

	});
	// TODO $PUT
	it('$PUT',function(){

	});
	// TODO echo
	it('echo',function(){

	});
	// TODO end
	it('end',function(){

	});
	// TODO send
	it('send',function(){

	});
	// TODO getSessionID
	it('getSessionID',function(){

	});
	// TODO getSession
	it('getSession',function(){

	});
	// TODO getSessionSync
	it('getSessionSync',function(){

	});
	// TODO header
	it('header',function(){

	});
	// TODO var_dump
	it('var_dump',function(){

	});
	// TODO writeSession
	it('writeSession',function(){

	});

	// TODO ChromVersion
	it('ChromVersion',function(){

	});
	// TODO FireFoxVersion
	it('FireFoxVersion',function(){

	});
	// TODO IEVersion
	it('IEVersion',function(){

	});
	// TODO OperaVersion
	it('OperaVersion',function(){

	});
	// TODO SafariVersion
	it('SafariVersion',function(){

	});
	// TODO isAmaya
	it('isAmaya',function(){

	});
	// TODO isAndroid
	it('isAndroid',function(){

	});
	// TODO isBlackBerry
	it('isBlackBerry',function(){

	});
	// TODO isChrome
	it('isChrome',function(){

	});
	// TODO isFirefox
	it('isFirefox',function(){

	});
	// TODO isGecko
	it('isGecko',function(){

	});
	// TODO isIE6
	it('isIE6',function(){

	});
	// TODO isIE
	it('isIE',function(){

	});
	// TODO isIPad
	it('isIPad',function(){

	});
	// TODO isIPhone
	it('isIPhone',function(){

	});
	// TODO isIPod
	it('isIPod',function(){

	});
	// TODO isKHTML
	it('isKHTML',function(){

	});
	// TODO isLinux
	it('isLinux',function(){

	});
	// TODO isMac
	it('isMac',function(){

	});
	// TODO isMobile
	it('isMobile',function(){

	});
	// TODO isOpera
	it('isOpera',function(){

	});
	// TODO isPalmOS
	it('isPalmOS',function(){

	});
	// TODO isPresto
	it('isPresto',function(){

	});
	// TODO isPrince
	it('isPrince',function(){

	});
	// TODO isSafari
	it('isSafari',function(){

	});
	// TODO isSymbian
	it('isSymbian',function(){

	});
	// TODO isTrident
	it('isTrident',function(){

	});
	// TODO isWebkit
	it('isWebkit',function(){

	});
	// TODO isWindows
	it('isWindows',function(){

	});
	// TODO isWindowsMobile
	it('isWindowsMobile',function(){

	});

});
describe ('Global methods', function () {
	beforeEach(function() {
		this.addMatchers({
			toMatchPropAndConstructor: function (expected) {
				if (expected === undefined) {
					expected = {};
				}
				for (var prop in this.actual) {
					if (!this.actual.hasOwnProperty(prop)) { continue; }
					if (expected[prop] == undefined || expected[prop].constructor != this.actual[prop].constructor) {
						return false;
					}
				}
				return true;
			}
		});
	});
	it('JSON.parseAdvanced',function(){
		expect(JSON.parseAdvanced({"routes": {"${domain}":"${bb}"}},null,{domain:"property",bb:"baby"})).toEqual({ routes: { property: 'baby' } });
		expect(JSON.stringify(JSON.parseAdvanced({"routes": {"Function.${bb.b}":"function(${domain}){}","${domain}":"${bb.b}"}},null,{domain:"property",bb:{b:"baby"}}))).toEqual(JSON.stringify({ routes: { baby: function(property){}, property: "baby" } }));
		// expect(JSON.parseAdvanced({routes:{hi:"hello",oha:{"$ref":"#/routes/hi"},obj:{"$ref":"/test/test.json"}}})).toEqual({routes:{hi:"hello",oha:"hello",obj:{test:"testing"}}});
		expect(JSON.parseAdvanced({routes:{hi:"hello",oha:{"$ref":"#/routes/hi"},obj:{"$ref":"./test.json"}}})).toEqual({routes:{hi:"hello",oha:"hello",obj:{test:"testing"}}});
		expect(JSON.parseAdvanced({routes:{hi:"hello",oha:{"$ref":"#/routes/hi"},obj:{"$ref":"test.json"}}})).toEqual({routes:{hi:"hello",oha:"hello",obj:{test:"testing"}}});

	});
	it('addObjectPrototype',function(){
		expect($c.addObjectPrototype("addingProperty",function(){ return "hello world!";},true)()).toBe('hello world!');
		var obj = {},props = [];
		expect(obj.addingProperty()).toBe('hello world!');
		for (var prop in obj) { props.push(prop); }
		expect(props.contains("addingProperty")).toBe(false);

	});
	it('ajax',function(){
		var usersdata = { users:
				[ { username: 'mtglass', name: 'Mark Glass', age: 10 },
					{ username: 'urdum', name: 'Ursula Dumfry', age: 10 },
					{ username: 'hydere', name: 'Henry Dere', age: 10 },
					{ username: 'cumhere', name: 'Cass Umhere', age: 10 },
					{ username: 'bstill', name: 'Bob Stillman', age: 10 },
					{ username: 'cirfuksalot', name: 'Camron', age: 10 },
					{ username: 'chadden', name: 'Corey Hadden', age: 30 },
					{ username: 'squeeb', name: 'Joseph Esquibel', age: 32 },
					{ username: 'cinada', name: 'Clark Inada', age: 31 },
					{ username: 'shurliezalot', name: 'Josh N', age: 10 },
					{ username: 'noze_nutin', name: 'Mai Boss', age: 10 },
					{ username: 'czass', name: 'Cater Zass', age: 10 },
					{ username: 'awesome_game', name: 'clash of clans', age: 21 }]};
		$c.ajax({
			url:"http://www.craydent.com/test/users.js",
			onsuccess:function(data,req,ctx,status_code){
				expect(data).toEqual(usersdata);
				expect(status_code).toBe(200);
			}
		});

		var errored = false, prm1 = $c.ajax({
			url:"http://www.craydent.com/test/userss.js",
			onsuccess:function(data,req,ctx,status_code){
				expect('Should not execute').toBe(true);
			},
			onerror:function(data,req,ctx,status_code){
				expect(status_code).toBe(404);
				expect(errored).toBe(false);
				errored = true;
			}
		});
		prm1.otherwise(function(data,req,ctx,status_code){
			expect(status_code).toBe(404);
			expect(errored).toBe(true);
		});

		var stage = 1,
			hobj = {hitch:true},
			ctx = {thectx:true};
		var prm2 = $c.ajax({
			url:"http://www.craydent.com/test/users.js",
			query:{a:"hello",b:"world"},
			hitch:hobj,
			context:ctx,
			//onstatechange:function(){
			//	expect(stage).toBe(1);
			//	console.log(arguments,'statechange');
			//},
			onbefore:function(request,hitch,thiz){
				expect(stage++).toBe(1);
				expect(hitch).toBe(hobj);
				expect(thiz).toBe($c);
				expect(this).toBe(ctx);
			},
			oncomplete:function(data,hitch,req,status_code){
				expect(stage++).toBe(4);
				expect(hitch).toBe(hobj);
				expect(data).toEqual(usersdata);
				expect(this).toBe(ctx);
				expect(status_code).toBe(200);
			},
			//onresponse:function(){
			//	console.log(arguments,'response');
			//},
			//onloadstart:function(){
			//	expect(stage++).toBe(1);
			//	console.log(arguments,'loadstart');
			//},
			onsuccess:function(data,hitch,req,status_code){
				expect(stage++).toBe(2);
				expect(hitch).toBe(hobj);
				expect(data).toEqual(usersdata);
				expect(this).toBe(ctx);
				expect(status_code).toBe(200);
			}
		});
		prm2.then(function(data,req,ctx,status_code){
			expect(stage++).toBe(3);
			expect(data).toEqual(usersdata);
			expect(ctx).toBe(ctx);
			expect(status_code).toBe(200);
		});

		prm2.finally(function(data,hitch,req,status_code){
			expect(stage++).toBe(5);
			expect(hitch).toBe(hobj);
			expect(data).toEqual(usersdata);
			expect(this).toBe(ctx);
			expect(status_code).toBe(200);
		});
	});
	it('cuid',function(){
		expect($c.cuid().length).toBe(36);
	});
	it('emit',function(){
		function testEmit() { return $c.emit('listener',1,2); }
		$c.on(testEmit,'listener',function(f,s){ return 'hello world' + (f+s); });
		$c.on(testEmit,'listener',function(f,s){ return 'hello world again' + (s-f); });

		expect(testEmit()).toEqual(['hello world3','hello world again1'])
	});
	it('fillTemplate',function(){
		var obj = [{arr:[{hi:"b"},{hi:"c"}],name:"operation"},{arr:[{hi:"b"},{hi:"c"}],name:"operation"}],
		obj2 = {arr:['monday','tuesday']},
		obj3 = {a:'monday',b:'tuesday'},
		obj4 = {a:'monday',b:'tuesday',hello:'world'},
		obj5 = {a:'monday',b:'tuesday',hello:'bite'},
		simple = {hello:"world"},
		simple2 = {a:{hello:"world"}};
		$c.TEMPLATE_VARS.push({variable:"TNAME",value:"this template var"});
		expect($c.fillTemplate("<div>${name}<div>${foreach ${item} in ${arr}}${item.hi}8888${name}9999${end foreach}</div></div>",obj))
			.toBe("<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>")
		expect($c.fillTemplate("<div>${TNAME}<div>")).toBe("<div>this template var<div>");
		expect($c.fillTemplate("<div ${dataproperties}>${hello}<div>",simple)).toBe("<div data-hello='world' >world<div>");
		expect($c.fillTemplate("<div>${this.a.hello}${index}<div>",simple2)).toBe("<div>world0<div>");
		expect($c.fillTemplate("<div>${COUNT[${arr}]}<div>",obj)).toBe("<div>2<div><div>2<div>");
		expect($c.fillTemplate("<div>${ENUM[${arr};]}<div>",obj2)).toBe("<div>monday, tuesday<div>");
		expect($c.fillTemplate("<div>${ENUM[${this};\"?\";[\"{ENUM_VAL}-\",\"-{ENUM_VAR}\"]]}<div>",obj3)).toBe("<div>monday-a-a?tuesday-b-b<div>");
		expect($c.fillTemplate("<div>${${novar}||${hello}}<div>",simple)).toBe("<div>world<div>");
		expect($c.fillTemplate("<div>${${hello}||${novar}}<div>",simple)).toBe("<div>world<div>");
		expect($c.fillTemplate("<div>${${novar}&&${hello}}<div>",simple)).toBe("<div><div>");
		expect($c.fillTemplate("<div>${${hello}&&'hello'}<div>",simple)).toBe("<div>hello<div>");
		expect($c.fillTemplate("<div>${function add (a,b) { return a+b; }|1|2}<div>",simple)).toBe("<div>3<div>");
		$g.tempFunc = function (o) { return o.a + " & " + o.b; }
		expect($c.fillTemplate("<div>${RUN[tempFunc;${this}]}<div>",obj3)).toBe("<div>monday & tuesday<div>");
		expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",obj3)).toBe("<div><a>monday</a></div>");
		expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",{hi:"hello"})).toBe("<div><span>hello</span></div>");
		expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",{bye:"bbye"})).toBe("<div><p>bbye</p></div>");
		expect($c.fillTemplate("<div>${if (${this.bye.value})}<span>${hi}</span>${elseif (${bye})}<p>${bye}</p>${else}<a>${a}</a>${end if}</div>",{hi:"hello",bye:{value:"bbye"}})).toBe("<div><span>hello</span></div>");
		expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${this.bye.value})}<p>${this.bye.value}</p>${end if}</div>",{bye:{value:"bbye"}})).toBe("<div><p>bbye</p></div>");
		expect($c.fillTemplate("<div>${if (${this.bye.value})}<span>${this.bye.value}</span>${elseif (${bye})}<p>${bye}</p>${end if}</div>",{bye:{value:"bbye"}})).toBe("<div><span>bbye</span></div>");
		expect($c.fillTemplate("<div>${if (${hi})}<span>${hi}</span>${elseif (${this.bye.value})}<p>${this.bye.value}</p>${end if}</div>",{bye:{value:"bbye"}})).toBe("<div><p>bbye</p></div>");
		expect($c.fillTemplate("divhere${if (${this.User.length} || ${this.User})}div${end if}ending",{User:['']})).toBe("divheredivending");
		expect($c.fillTemplate("divhere${if (${this.User.length} || ${this.User})}div${end if}ending",{User:[]})).toBe("divheredivending");
		expect($c.fillTemplate("divhere${if (${this.User})}div${end if}ending",{User:[]})).toBe("divheredivending");
		expect($c.fillTemplate("divhere${if (${this.User.length})}div${end if}ending",{User:[]})).toBe("divhereending");
		expect($c.fillTemplate("divhere${if ('${this.User}')}div${end if}ending",{User:"adsf"})).toBe("divheredivending");
		expect($c.fillTemplate("<div>${name}<div>${for ${i=0,len=${arr}.length};${i<len};${i++}}${${arr}[i].hi}8888${name}9999${end for}</div></div>",obj))
				.toBe("<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>")
		expect($c.fillTemplate("<div>${name}<div>${declare i=0,len=${arr}.length}${while (${i}<${len})}${${arr}[i].hi}8888${name}9999${i++,null}${end while}</div></div>",obj))
				.toBe("<div>operation<div>b8888operation9999c8888operation9999</div></div><div>operation<div>b8888operation9999c8888operation9999</div></div>")
		expect($c.fillTemplate("<div>${script}var a = 0;a += 20;echo('${a} number is: ');echo(a);echo(10);${end script}<div>",obj3)).toBe("<div>monday number is: 2010<div>");
		expect($c.fillTemplate("<div>${try}echo('asdf');var a = null; a.foo;${catch (e)}echo(e);${finally}echo('finallyy')${end try}<div>",obj3)).toBe("<div>asdfError: TypeError: Cannot read property 'foo' of nullfinallyy<div>");
		expect($c.fillTemplate("<div>" +
				"${switch (${hello})}" +
					"${case 'world':}<span>${a}</span>" +
					"${case 'bite':}<p>${b}</p>" +
					"${break}" +
					"${case 'me':}<a>${a}</a>" +
					"${default}<div>${b}</div>" +
				"${end switch}</div>",obj3)).toBe("<div><div>tuesday</div></div>");
		expect($c.fillTemplate("<div>" +
				"${switch (${hello})}" +
					"${case 'world':}<span>${a}</span>" +
					"${case 'bite':}<p>${b}</p>" +
					"${break}" +
					"${case 'me':}<a>${a}</a>" +
					"${default}<div>${b}</div>" +
				"${end switch}</div>",obj4)).toBe("<div><span>monday</span><p>tuesday</p></div>");
		expect($c.fillTemplate("<div>" +
				"${switch (${hello})}" +
					"${case 'world':}<span>${a}</span>" +
					"${case 'bite':}<p>${b}</p>" +
					"${break}" +
					"${case 'me':}<a>${a}</a>" +
					"${default}<div>${b}</div>" +
				"${end switch}</div>",obj5)).toBe("<div><p>tuesday</p></div>");
		expect($c.fillTemplate('${foreach ${item} in ${this.DATA.page}}${if (${true})}<div>${item.name}</div>${end if}${end foreach}',
				{DATA:{page:[{name:'name1'},{name:'name2'}]}})).toBe('<div>name1</div><div>name2</div>');
		expect($c.fillTemplate('${foreach ${item} in ${this.TASK.subtasks}}\
			${if (${item.sub_complete})}\
				True\
			${else}\
				False\
			${end if}\
		${end foreach}',{TASK:{subtasks:[{sub_complete:true}]}}).trim()).toBe('True');
	});
	it('include',function(){
		expect($c.include('./modules/module1').toString()).toBe('function (){return "module 1"}');
		expect($c.include('./modules/module2').toString()).toBe('function (){return "module 2"}');
		expect($c.include('./modules/module3').toString()).toBe("false");
	});
	it('isNull',function(){
		expect($c.isNull(undefined)).toBe(true);
		expect($c.isNull(null)).toBe(true);
		expect($c.isNull(true)).toBe(false);
		expect($c.isNull("")).toBe(false);
		expect($c.isNull(4)).toBe(false);
		expect($c.isNull("adsf")).toBe(false);

		expect($c.isNull("adsf", "hello")).toBe("adsf");
		expect($c.isNull(null, "hello")).toBe("hello");
	});
	it('md5',function(){
		expect($c.md5('A')).toBe('7fc56270e7a70fa81a5935b72eacbe29');
	});
	it('mkdirRecursive',function(){
		$c.mkdirRecursive('/test/modules/createdModulesFolder/folder',function(err,path){
			expect(err).toBeNull();
			expect(path).toBe("/test/modules/createdModulesFolder/folder");
		});
	});
	it('namespace',function(){
		expect($c.namespace("Test2",function TestClass(){}).toString()).toEqual('function TestClass(){}');
		expect($c.getClass(new $c.namespaces.Test2.TestClass())).toBe("TestClass");
		expect(Test2).toBe('function TestClass(){}');
	});
	it('next',function(){
		function testNext() { return $c.next(1,2); }
		$c.then(testNext,function(f,s){ return 'hello world' + (f+s); });
		expect(testNext()).toEqual(['hello world3']);
	});
	it('now',function(){
		expect($c.now().getTime()).toBeCloseTo(new Date().getTime(),-1);
		expect($c.now('m')).toBeCloseTo((new Date()).format('m'),20);
	});
	it('parseBoolean',function(){
		expect($c.parseBoolean("true")).toBe(true);
		expect($c.parseBoolean(true)).toBe(true);
		expect($c.parseBoolean("1")).toBe(true);
		expect($c.parseBoolean("0")).toBe(false);
		expect($c.parseBoolean(1)).toBe(true);
		expect($c.parseBoolean(0)).toBe(false);
		expect($c.parseBoolean("false")).toBe(false);
		expect($c.parseBoolean(false)).toBe(false);
		expect($c.parseBoolean(undefined)).toBe(undefined);
		expect($c.parseBoolean(null)).toBe(undefined);
		expect($c.parseBoolean("adfad")).toBe(undefined);
		expect($c.parseBoolean("")).toBe(undefined);
	});
	it('parseRaw',function(){
		expect($c.parseRaw("str")).toBe("\"str\"");
		expect($c.parseRaw({})).toBe("{}");
		expect($c.parseRaw([])).toBe("[]");

		expect($c.parseRaw("str",true)).toBe("str");
		expect($c.parseRaw(function(){},true)).toBe("function (){}");
		expect($c.parseRaw(function*(){},true)).toBe("function* (){}");
	});
	it('rand',function(){
		var i = 0;
		while (i < 1000) {
			expect($c.isBetween($c.rand(1, 2, true), 1, 2, true)).toBe(true);
			expect($c.isBetween($c.rand(1, 2), 1, 2)).toBe(true);
			i++;
		}
	});
	it('requireDirectory',function(){
		var mods = $c.requireDirectory('./modules');
		expect(mods).toMatchPropAndConstructor({'/module1.js':$c.foo,'/module2.js':$c.foo});

		var mods = $c.requireDirectory('modules');
		expect(mods).toMatchPropAndConstructor({'/module1.js':$c.foo,'/module2.js':$c.foo});

		mods = $c.requireDirectory('./modules','r');
		expect(mods).toMatchPropAndConstructor({'/module1.js':$c.foo,'/module2.js':$c.foo,'/submodule/smodule1.js':$c.foo});

		mods = $c.requireDirectory('./modules',{recursive:true});
		expect(mods).toMatchPropAndConstructor({'/module1.js':$c.foo,'/module2.js':$c.foo,'/submodule/smodule1.js':$c.foo});

		mods = $c.requireDirectory('modules',{recursive:true});
		expect(mods).toMatchPropAndConstructor({'/module1.js':$c.foo,'/module2.js':$c.foo,'/submodule/smodule1.js':$c.foo});
	});
	it('suid',function(){
		expect($c.suid().length).toBe(10);
		expect($c.suid(5).length).toBe(5);
	});
	describe("syncroit async test",function(){
		var result = [];
		beforeEach(function (done) {
		$c.syncroit(function *() {
			var resolve = true;

			function testPromise(){
				return new Promise(function(res,rej){
					if (resolve) { return res({resolve:resolve}); }
					return rej({resolve:resolve});
				});
			}

				result.push(yield testPromise());

			resolve = false;
				result.push(yield testPromise());
				result.push(yield $c.ajax("http://www.craydent.com/test/users.js"));
				done();

			});
		});
		it('syncoit',function(){
			var shouldbe = [
				{resolve: true},
				{resolve: false},
				{
					users: [{username: 'mtglass', name: 'Mark Glass', age: 10},
						{ username: 'urdum', name: 'Ursula Dumfry', age: 10 },
						{ username: 'hydere', name: 'Henry Dere', age: 10 },
						{ username: 'cumhere', name: 'Cass Umhere', age: 10 },
						{ username: 'bstill', name: 'Bob Stillman', age: 10 },
						{ username: 'cirfuksalot', name: 'Camron', age: 10 },
						{ username: 'chadden', name: 'Corey Hadden', age: 30 },
						{ username: 'squeeb', name: 'Joseph Esquibel', age: 32 },
						{ username: 'cinada', name: 'Clark Inada', age: 31 },
						{ username: 'shurliezalot', name: 'Josh N', age: 10 },
						{ username: 'noze_nutin', name: 'Mai Boss', age: 10 },
						{ username: 'czass', name: 'Cater Zass', age: 10 },
						{username: 'awesome_game', name: 'clash of clans', age: 21}]
				}
			];
			for (var i = 0, len = result.length; i < len; i++) {
				expect(result[i]).toEqual(shouldbe[i]);
			}
		});

	});
	it('tryEval',function(){
		expect($c.tryEval("{}")).toEqual({});
		expect($c.tryEval("{{}")).toEqual(null);
		expect($c.tryEval("4")).toEqual(4);
		expect($c.tryEval("\"s\"")).toEqual("s");
	});
	// TO/DO wait
	//it('wait',function(){
	//
	//});
	it('xmlToJson',function(){
		var fs = require('fs');
		var data = fs.readFileSync('./test/test.xml');
		expect($c.xmlToJson(data.toString())).toEqual({
			employees : {
				employee : [{
					'#text' : '22222adsfa1111',
					id : '1',
					firstName : 'aadsf',
					lastName : 'DiCaprio',
					photo : 'http://1.bp.blogspot.com/-zvS_6Q1IzR8/T5l6qvnRmcI/AAAAAAAABcc/HXO7HDEJKo0/s200/Leonardo+Dicaprio7.jpg',
					'@attributes' : { att2 : 'eeeewwww' }
				},{
					id : '2',
					firstName : 'Johnny',
					lastName : 'Depp',
					photo : 'http://4.bp.blogspot.com/_xR71w9-qx9E/SrAz--pu0MI/AAAAAAAAC38/2ZP28rVEFKc/s200/johnny-depp-pirates.jpg'
				},{
					id : '3',
					firstName : 'Hritik',
					lastName : 'Roshan',
					photo : 'http://thewallmachine.com/files/1411921557.jpg'
				}],
				'#text' : '',
				'@attributes' : { att1 : 'wwww' }
			}
		});
	});
	// TO/DO zipit
	it('zipit',function(){

	});

});