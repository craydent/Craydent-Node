#!/usr/bin/env node
/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-vx.x.x                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var root = require.resolve('../package.json').replace('/package.json', '');
var pkg = require(root + '/package.json');
var fs = require('fs').promises;
async function start(prefix, publish) {
    pkg.name = prefix + "craydent";

    if (publish) {
        pkg.dependencies = {};
        pkg.dependencies[prefix + "craydent-array"] = pkg.version;
        pkg.dependencies[prefix + "craydent-class"] = pkg.version;
        pkg.dependencies[prefix + "craydent-cli"] = pkg.version;
        pkg.dependencies[prefix + "craydent-control-flow"] = pkg.version;
        pkg.dependencies[prefix + "craydent-date"] = pkg.version;
        pkg.dependencies[prefix + "craydent-fs"] = pkg.version;
        pkg.dependencies[prefix + "craydent-function"] = pkg.version;
        pkg.dependencies[prefix + "craydent-logger"] = pkg.version;
        pkg.dependencies[prefix + "craydent-http"] = pkg.version;
        pkg.dependencies[prefix + "craydent-json-parser"] = pkg.version;
        pkg.dependencies[prefix + "craydent-number"] = pkg.version;
        pkg.dependencies[prefix + "craydent-object"] = pkg.version;
        pkg.dependencies[prefix + "craydent-regexp"] = pkg.version;
        pkg.dependencies[prefix + "craydent-string"] = pkg.version;
        pkg.dependencies[prefix + "craydent-template"] = pkg.version;
        pkg.dependencies[prefix + "craydent-typeof"] = pkg.version;
        pkg.dependencies[prefix + "craydent-utility"] = pkg.version;
        pkg.dependencies[prefix + "craydent-xml-to-json"] = pkg.version;

    } else {
        pkg.dependencies = {};
        pkg.dependencies[prefix + "craydent-array"] = "file:./compiled/transformedMajor/array";
        pkg.dependencies[prefix + "craydent-class"] = "file:./compiled/transformedMajor/class";
        pkg.dependencies[prefix + "craydent-cli"] = "file:./compiled/transformedMajor/cli";
        pkg.dependencies[prefix + "craydent-control-flow"] = "file:./compiled/transformedMajor/control-flow";
        pkg.dependencies[prefix + "craydent-date"] = "file:./compiled/transformedMajor/date";
        pkg.dependencies[prefix + "craydent-fs"] = "file:./compiled/transformedMajor/fs";
        pkg.dependencies[prefix + "craydent-function"] = "file:./compiled/transformedMajor/function";
        pkg.dependencies[prefix + "craydent-logger"] = "file:./compiled/transformedMajor/logger";
        pkg.dependencies[prefix + "craydent-http"] = "file:./compiled/transformedMajor/http";
        pkg.dependencies[prefix + "craydent-json-parser"] = "file:./compiled/transformedMajor/json-parser";
        pkg.dependencies[prefix + "craydent-number"] = "file:./compiled/transformedMajor/number";
        pkg.dependencies[prefix + "craydent-object"] = "file:./compiled/transformedMajor/object";
        pkg.dependencies[prefix + "craydent-regexp"] = "file:./compiled/transformedMajor/regexp";
        pkg.dependencies[prefix + "craydent-string"] = "file:./compiled/transformedMajor/string";
        pkg.dependencies[prefix + "craydent-template"] = "file:./compiled/transformedMajor/template";
        pkg.dependencies[prefix + "craydent-typeof"] = "file:./compiled/transformedMajor/typeof";
        pkg.dependencies[prefix + "craydent-utility"] = "file:./compiled/transformedMajor/utility";
        pkg.dependencies[prefix + "craydent-xml-to-json"] = "file:./compiled/transformedMajor/xml-to-json";


        pkg.dependencies[prefix + "craydent.aboutequalto"] = "file:./compiled/transformedMinor/craydent.aboutequalto";
        pkg.dependencies[prefix + "craydent.absolutepath"] = "file:./compiled/transformedMinor/craydent.absolutepath";
        pkg.dependencies[prefix + "craydent.access"] = "file:./compiled/transformedMinor/craydent.access";
        pkg.dependencies[prefix + "craydent.acronymize"] = "file:./compiled/transformedMinor/craydent.acronymize";
        pkg.dependencies[prefix + "craydent.add"] = "file:./compiled/transformedMinor/craydent.add";
        pkg.dependencies[prefix + "craydent.addflags"] = "file:./compiled/transformedMinor/craydent.addflags";
        pkg.dependencies[prefix + "craydent.addobjectprototype"] = "file:./compiled/transformedMinor/craydent.addobjectprototype";
        pkg.dependencies[prefix + "craydent.aggregate"] = "file:./compiled/transformedMinor/craydent.aggregate";
        pkg.dependencies[prefix + "craydent.ajax"] = "file:./compiled/transformedMinor/craydent.ajax";
        pkg.dependencies[prefix + "craydent.appendfile"] = "file:./compiled/transformedMinor/craydent.appendfile";
        pkg.dependencies[prefix + "craydent.average"] = "file:./compiled/transformedMinor/craydent.average";
        pkg.dependencies[prefix + "craydent.awaitable"] = "file:./compiled/transformedMinor/craydent.awaitable";
        pkg.dependencies[prefix + "craydent.benchmarker"] = "file:./compiled/transformedMinor/craydent.benchmarker";
        pkg.dependencies[prefix + "craydent.buildtree"] = "file:./compiled/transformedMinor/craydent.buildtree";
        pkg.dependencies[prefix + "craydent.capitalize"] = "file:./compiled/transformedMinor/craydent.capitalize";
        pkg.dependencies[prefix + "craydent.catch"] = "file:./compiled/transformedMinor/craydent.catch";
        pkg.dependencies[prefix + "craydent.catchall"] = "file:./compiled/transformedMinor/craydent.catchall";
        pkg.dependencies[prefix + "craydent.changes"] = "file:./compiled/transformedMinor/craydent.changes";
        pkg.dependencies[prefix + "craydent.chmod"] = "file:./compiled/transformedMinor/craydent.chmod";
        pkg.dependencies[prefix + "craydent.chown"] = "file:./compiled/transformedMinor/craydent.chown";
        pkg.dependencies[prefix + "craydent.chromeversion"] = "file:./compiled/transformedMinor/craydent.chromeversion";
        pkg.dependencies[prefix + "craydent.clearcache"] = "file:./compiled/transformedMinor/craydent.clearcache";
        pkg.dependencies[prefix + "craydent.close"] = "file:./compiled/transformedMinor/craydent.close";
        pkg.dependencies[prefix + "craydent.clusterit"] = "file:./compiled/transformedMinor/craydent.clusterit";
        pkg.dependencies[prefix + "craydent.http.commit"] = "file:./compiled/transformedMinor/craydent.http.commit";
        pkg.dependencies[prefix + "craydent.condense"] = "file:./compiled/transformedMinor/craydent.condense";
        pkg.dependencies[prefix + "craydent.contains"] = "file:./compiled/transformedMinor/craydent.contains";
        pkg.dependencies[prefix + "craydent.convertutcdate"] = "file:./compiled/transformedMinor/craydent.convertutcdate";
        pkg.dependencies[prefix + "craydent.http.cookie"] = "file:./compiled/transformedMinor/craydent.http.cookie";
        pkg.dependencies[prefix + "craydent.copyfile"] = "file:./compiled/transformedMinor/craydent.copyfile";
        pkg.dependencies[prefix + "craydent.copyobject"] = "file:./compiled/transformedMinor/craydent.copyobject";
        pkg.dependencies[prefix + "craydent.count"] = "file:./compiled/transformedMinor/craydent.count";
        pkg.dependencies[prefix + "craydent.cout"] = "file:./compiled/transformedMinor/craydent.cout";
        pkg.dependencies[prefix + "craydent.createindex"] = "file:./compiled/transformedMinor/craydent.createindex";
        pkg.dependencies[prefix + "craydent.createserver"] = "file:./compiled/transformedMinor/craydent.createserver";
        pkg.dependencies[prefix + "craydent.cuid"] = "file:./compiled/transformedMinor/craydent.cuid";
        pkg.dependencies[prefix + "craydent.cursor"] = "file:./compiled/transformedMinor/craydent.cursor";
        pkg.dependencies[prefix + "craydent.cut"] = "file:./compiled/transformedMinor/craydent.cut";
        pkg.dependencies[prefix + "craydent.http.del"] = "file:./compiled/transformedMinor/craydent.http.del";
        pkg.dependencies[prefix + "craydent.http.delete"] = "file:./compiled/transformedMinor/craydent.http.delete";
        pkg.dependencies[prefix + "craydent.delete"] = "file:./compiled/transformedMinor/craydent.delete";
        pkg.dependencies[prefix + "craydent.distinct"] = "file:./compiled/transformedMinor/craydent.distinct";
        pkg.dependencies[prefix + "craydent.duplicate"] = "file:./compiled/transformedMinor/craydent.duplicate";
        pkg.dependencies[prefix + "craydent.eachproperty"] = "file:./compiled/transformedMinor/craydent.eachproperty";
        pkg.dependencies[prefix + "craydent.echo"] = "file:./compiled/transformedMinor/craydent.echo";
        pkg.dependencies[prefix + "craydent.ellipsis"] = "file:./compiled/transformedMinor/craydent.ellipsis";
        pkg.dependencies[prefix + "craydent.emit"] = "file:./compiled/transformedMinor/craydent.emit";
        pkg.dependencies[prefix + "craydent.end"] = "file:./compiled/transformedMinor/craydent.end";
        pkg.dependencies[prefix + "craydent.enditwith"] = "file:./compiled/transformedMinor/craydent.enditwith";
        pkg.dependencies[prefix + "craydent.endswith"] = "file:./compiled/transformedMinor/craydent.endswith";
        pkg.dependencies[prefix + "craydent.endswithany"] = "file:./compiled/transformedMinor/craydent.endswithany";
        pkg.dependencies[prefix + "craydent.equals"] = "file:./compiled/transformedMinor/craydent.equals";
        pkg.dependencies[prefix + "craydent.error"] = "file:./compiled/transformedMinor/craydent.error";
        pkg.dependencies[prefix + "craydent.every"] = "file:./compiled/transformedMinor/craydent.every";
        pkg.dependencies[prefix + "craydent.exclude"] = "file:./compiled/transformedMinor/craydent.exclude";
        pkg.dependencies[prefix + "craydent.extend"] = "file:./compiled/transformedMinor/craydent.extend";
        pkg.dependencies[prefix + "craydent.fchmod"] = "file:./compiled/transformedMinor/craydent.fchmod";
        pkg.dependencies[prefix + "craydent.fchown"] = "file:./compiled/transformedMinor/craydent.fchown";
        pkg.dependencies[prefix + "craydent.fdatasync"] = "file:./compiled/transformedMinor/craydent.fdatasync";
        pkg.dependencies[prefix + "craydent.filltemplate"] = "file:./compiled/transformedMinor/craydent.filltemplate";
        pkg.dependencies[prefix + "craydent.filter"] = "file:./compiled/transformedMinor/craydent.filter";
        pkg.dependencies[prefix + "craydent.find"] = "file:./compiled/transformedMinor/craydent.find";
        pkg.dependencies[prefix + "craydent.findone"] = "file:./compiled/transformedMinor/craydent.findone";
        pkg.dependencies[prefix + "craydent.firefoxversion"] = "file:./compiled/transformedMinor/craydent.firefoxversion";
        pkg.dependencies[prefix + "craydent.foo"] = "file:./compiled/transformedMinor/craydent.foo";
        pkg.dependencies[prefix + "craydent.format"] = "file:./compiled/transformedMinor/craydent.format";
        pkg.dependencies[prefix + "craydent.fstat"] = "file:./compiled/transformedMinor/craydent.fstat";
        pkg.dependencies[prefix + "craydent.fsync"] = "file:./compiled/transformedMinor/craydent.fsync";
        pkg.dependencies[prefix + "craydent.ftruncate"] = "file:./compiled/transformedMinor/craydent.ftruncate";
        pkg.dependencies[prefix + "craydent.futimes"] = "file:./compiled/transformedMinor/craydent.futimes";
        pkg.dependencies[prefix + "craydent.http.get"] = "file:./compiled/transformedMinor/craydent.http.get";
        pkg.dependencies[prefix + "craydent.getclass"] = "file:./compiled/transformedMinor/craydent.getclass";
        pkg.dependencies[prefix + "craydent.getdayofyear"] = "file:./compiled/transformedMinor/craydent.getdayofyear";
        pkg.dependencies[prefix + "craydent.getgmtoffset"] = "file:./compiled/transformedMinor/craydent.getgmtoffset";
        pkg.dependencies[prefix + "craydent.getkeys"] = "file:./compiled/transformedMinor/craydent.getkeys";
        pkg.dependencies[prefix + "craydent.getname"] = "file:./compiled/transformedMinor/craydent.getname";
        pkg.dependencies[prefix + "craydent.getparameters"] = "file:./compiled/transformedMinor/craydent.getparameters";
        pkg.dependencies[prefix + "craydent.getproperty"] = "file:./compiled/transformedMinor/craydent.getproperty";
        pkg.dependencies[prefix + "craydent.getsession"] = "file:./compiled/transformedMinor/craydent.getsession";
        pkg.dependencies[prefix + "craydent.getsessionid"] = "file:./compiled/transformedMinor/craydent.getsessionid";
        pkg.dependencies[prefix + "craydent.getsessionsync"] = "file:./compiled/transformedMinor/craydent.getsessionsync";
        pkg.dependencies[prefix + "craydent.getvalue"] = "file:./compiled/transformedMinor/craydent.getvalue";
        pkg.dependencies[prefix + "craydent.getweek"] = "file:./compiled/transformedMinor/craydent.getweek";
        pkg.dependencies[prefix + "craydent.globalize"] = "file:./compiled/transformedMinor/craydent.globalize";
        pkg.dependencies[prefix + "craydent.group"] = "file:./compiled/transformedMinor/craydent.group";
        pkg.dependencies[prefix + "craydent.has"] = "file:./compiled/transformedMinor/craydent.has";
        pkg.dependencies[prefix + "craydent.http.header"] = "file:./compiled/transformedMinor/craydent.http.header";
        pkg.dependencies[prefix + "craydent.highlight"] = "file:./compiled/transformedMinor/craydent.highlight";
        pkg.dependencies[prefix + "craydent.ieversion"] = "file:./compiled/transformedMinor/craydent.ieversion";
        pkg.dependencies[prefix + "craydent.include"] = "file:./compiled/transformedMinor/craydent.include";
        pkg.dependencies[prefix + "craydent.indexofalt"] = "file:./compiled/transformedMinor/craydent.indexofalt";
        pkg.dependencies[prefix + "craydent.innerjoin"] = "file:./compiled/transformedMinor/craydent.innerjoin";
        pkg.dependencies[prefix + "craydent.insert"] = "file:./compiled/transformedMinor/craydent.insert";
        pkg.dependencies[prefix + "craydent.insertafter"] = "file:./compiled/transformedMinor/craydent.insertafter";
        pkg.dependencies[prefix + "craydent.insertat"] = "file:./compiled/transformedMinor/craydent.insertat";
        pkg.dependencies[prefix + "craydent.insertbefore"] = "file:./compiled/transformedMinor/craydent.insertbefore";
        pkg.dependencies[prefix + "craydent.ireplaceall"] = "file:./compiled/transformedMinor/craydent.ireplaceall";
        pkg.dependencies[prefix + "craydent.isamaya"] = "file:./compiled/transformedMinor/craydent.isamaya";
        pkg.dependencies[prefix + "craydent.isandroid"] = "file:./compiled/transformedMinor/craydent.isandroid";
        pkg.dependencies[prefix + "craydent.isarray"] = "file:./compiled/transformedMinor/craydent.isarray";
        pkg.dependencies[prefix + "craydent.isasync"] = "file:./compiled/transformedMinor/craydent.isasync";
        pkg.dependencies[prefix + "craydent.isbetween"] = "file:./compiled/transformedMinor/craydent.isbetween";
        pkg.dependencies[prefix + "craydent.isblackberry"] = "file:./compiled/transformedMinor/craydent.isblackberry";
        pkg.dependencies[prefix + "craydent.isblank"] = "file:./compiled/transformedMinor/craydent.isblank";
        pkg.dependencies[prefix + "craydent.isboolean"] = "file:./compiled/transformedMinor/craydent.isboolean";
        pkg.dependencies[prefix + "craydent.ischrome"] = "file:./compiled/transformedMinor/craydent.ischrome";
        pkg.dependencies[prefix + "craydent.iscuid"] = "file:./compiled/transformedMinor/craydent.iscuid";
        pkg.dependencies[prefix + "craydent.isdate"] = "file:./compiled/transformedMinor/craydent.isdate";
        pkg.dependencies[prefix + "craydent.isdomelement"] = "file:./compiled/transformedMinor/craydent.isdomelement";
        pkg.dependencies[prefix + "craydent.isempty"] = "file:./compiled/transformedMinor/craydent.isempty";
        pkg.dependencies[prefix + "craydent.iserror"] = "file:./compiled/transformedMinor/craydent.iserror";
        pkg.dependencies[prefix + "craydent.iseven"] = "file:./compiled/transformedMinor/craydent.iseven";
        pkg.dependencies[prefix + "craydent.isfirefox"] = "file:./compiled/transformedMinor/craydent.isfirefox";
        pkg.dependencies[prefix + "craydent.isfloat"] = "file:./compiled/transformedMinor/craydent.isfloat";
        pkg.dependencies[prefix + "craydent.isfunction"] = "file:./compiled/transformedMinor/craydent.isfunction";
        pkg.dependencies[prefix + "craydent.isgecko"] = "file:./compiled/transformedMinor/craydent.isgecko";
        pkg.dependencies[prefix + "craydent.isgenerator"] = "file:./compiled/transformedMinor/craydent.isgenerator";
        pkg.dependencies[prefix + "craydent.isgeolocation"] = "file:./compiled/transformedMinor/craydent.isgeolocation";
        pkg.dependencies[prefix + "craydent.isie"] = "file:./compiled/transformedMinor/craydent.isie";
        pkg.dependencies[prefix + "craydent.isie6"] = "file:./compiled/transformedMinor/craydent.isie6";
        pkg.dependencies[prefix + "craydent.isint"] = "file:./compiled/transformedMinor/craydent.isint";
        pkg.dependencies[prefix + "craydent.isipad"] = "file:./compiled/transformedMinor/craydent.isipad";
        pkg.dependencies[prefix + "craydent.isiphone"] = "file:./compiled/transformedMinor/craydent.isiphone";
        pkg.dependencies[prefix + "craydent.isipod"] = "file:./compiled/transformedMinor/craydent.isipod";
        pkg.dependencies[prefix + "craydent.iskhtml"] = "file:./compiled/transformedMinor/craydent.iskhtml";
        pkg.dependencies[prefix + "craydent.islinux"] = "file:./compiled/transformedMinor/craydent.islinux";
        pkg.dependencies[prefix + "craydent.ismac"] = "file:./compiled/transformedMinor/craydent.ismac";
        pkg.dependencies[prefix + "craydent.ismobile"] = "file:./compiled/transformedMinor/craydent.ismobile";
        pkg.dependencies[prefix + "craydent.isnull"] = "file:./compiled/transformedMinor/craydent.isnull";
        pkg.dependencies[prefix + "craydent.isnullorempty"] = "file:./compiled/transformedMinor/craydent.isnullorempty";
        pkg.dependencies[prefix + "craydent.isnumber"] = "file:./compiled/transformedMinor/craydent.isnumber";
        pkg.dependencies[prefix + "craydent.isobject"] = "file:./compiled/transformedMinor/craydent.isobject";
        pkg.dependencies[prefix + "craydent.isodd"] = "file:./compiled/transformedMinor/craydent.isodd";
        pkg.dependencies[prefix + "craydent.isopera"] = "file:./compiled/transformedMinor/craydent.isopera";
        pkg.dependencies[prefix + "craydent.ispalmos"] = "file:./compiled/transformedMinor/craydent.ispalmos";
        pkg.dependencies[prefix + "craydent.ispresto"] = "file:./compiled/transformedMinor/craydent.ispresto";
        pkg.dependencies[prefix + "craydent.isprince"] = "file:./compiled/transformedMinor/craydent.isprince";
        pkg.dependencies[prefix + "craydent.ispromise"] = "file:./compiled/transformedMinor/craydent.ispromise";
        pkg.dependencies[prefix + "craydent.isregexp"] = "file:./compiled/transformedMinor/craydent.isregexp";
        pkg.dependencies[prefix + "craydent.issafari"] = "file:./compiled/transformedMinor/craydent.issafari";
        pkg.dependencies[prefix + "craydent.isstring"] = "file:./compiled/transformedMinor/craydent.isstring";
        pkg.dependencies[prefix + "craydent.issubset"] = "file:./compiled/transformedMinor/craydent.issubset";
        pkg.dependencies[prefix + "craydent.issymbian"] = "file:./compiled/transformedMinor/craydent.issymbian";
        pkg.dependencies[prefix + "craydent.istrident"] = "file:./compiled/transformedMinor/craydent.istrident";
        pkg.dependencies[prefix + "craydent.isvaliddate"] = "file:./compiled/transformedMinor/craydent.isvaliddate";
        pkg.dependencies[prefix + "craydent.isvalidemail"] = "file:./compiled/transformedMinor/craydent.isvalidemail";
        pkg.dependencies[prefix + "craydent.iswebkit"] = "file:./compiled/transformedMinor/craydent.iswebkit";
        pkg.dependencies[prefix + "craydent.iswindows"] = "file:./compiled/transformedMinor/craydent.iswindows";
        pkg.dependencies[prefix + "craydent.iswindowsmobile"] = "file:./compiled/transformedMinor/craydent.iswindowsmobile";
        pkg.dependencies[prefix + "craydent.itemcount"] = "file:./compiled/transformedMinor/craydent.itemcount";
        pkg.dependencies[prefix + "craydent.joinleft"] = "file:./compiled/transformedMinor/craydent.joinleft";
        pkg.dependencies[prefix + "craydent.joinright"] = "file:./compiled/transformedMinor/craydent.joinright";
        pkg.dependencies[prefix + "craydent.jszip"] = "file:./compiled/transformedMinor/craydent.jszip";
        pkg.dependencies[prefix + "craydent.keyof"] = "file:./compiled/transformedMinor/craydent.keyof";
        pkg.dependencies[prefix + "craydent.last"] = "file:./compiled/transformedMinor/craydent.last";
        pkg.dependencies[prefix + "craydent.lastindexofalt"] = "file:./compiled/transformedMinor/craydent.lastindexofalt";
        pkg.dependencies[prefix + "craydent.lchmod"] = "file:./compiled/transformedMinor/craydent.lchmod";
        pkg.dependencies[prefix + "craydent.lchown"] = "file:./compiled/transformedMinor/craydent.lchown";
        pkg.dependencies[prefix + "craydent.limit"] = "file:./compiled/transformedMinor/craydent.limit";
        pkg.dependencies[prefix + "craydent.link"] = "file:./compiled/transformedMinor/craydent.link";
        pkg.dependencies[prefix + "craydent.logit"] = "file:./compiled/transformedMinor/craydent.logit";
        pkg.dependencies[prefix + "craydent.lstat"] = "file:./compiled/transformedMinor/craydent.lstat";
        pkg.dependencies[prefix + "craydent.ltrim"] = "file:./compiled/transformedMinor/craydent.ltrim";
        pkg.dependencies[prefix + "craydent.map"] = "file:./compiled/transformedMinor/craydent.map";
        pkg.dependencies[prefix + "craydent.mapreduce"] = "file:./compiled/transformedMinor/craydent.mapreduce";
        pkg.dependencies[prefix + "craydent.md5"] = "file:./compiled/transformedMinor/craydent.md5";
        pkg.dependencies[prefix + "craydent.merge"] = "file:./compiled/transformedMinor/craydent.merge";
        pkg.dependencies[prefix + "craydent.mkdir"] = "file:./compiled/transformedMinor/craydent.mkdir";
        pkg.dependencies[prefix + "craydent.mkdirrecursive"] = "file:./compiled/transformedMinor/craydent.mkdirrecursive";
        pkg.dependencies[prefix + "craydent.mkdtemp"] = "file:./compiled/transformedMinor/craydent.mkdtemp";
        pkg.dependencies[prefix + "craydent.namespace"] = "file:./compiled/transformedMinor/craydent.namespace";
        pkg.dependencies[prefix + "craydent.next"] = "file:./compiled/transformedMinor/craydent.next";
        pkg.dependencies[prefix + "craydent.noop"] = "file:./compiled/transformedMinor/craydent.noop";
        pkg.dependencies[prefix + "craydent.normalize"] = "file:./compiled/transformedMinor/craydent.normalize";
        pkg.dependencies[prefix + "craydent.now"] = "file:./compiled/transformedMinor/craydent.now";
        pkg.dependencies[prefix + "craydent.on"] = "file:./compiled/transformedMinor/craydent.on";
        pkg.dependencies[prefix + "craydent.open"] = "file:./compiled/transformedMinor/craydent.open";
        pkg.dependencies[prefix + "craydent.operaversion"] = "file:./compiled/transformedMinor/craydent.operaversion";
        pkg.dependencies[prefix + "craydent.orderedlist"] = "file:./compiled/transformedMinor/craydent.orderedlist";
        pkg.dependencies[prefix + "craydent.paralleleach"] = "file:./compiled/transformedMinor/craydent.paralleleach";
        pkg.dependencies[prefix + "craydent.parseadvanced"] = "file:./compiled/transformedMinor/craydent.parseadvanced";
        pkg.dependencies[prefix + "craydent.parseboolean"] = "file:./compiled/transformedMinor/craydent.parseboolean";
        pkg.dependencies[prefix + "craydent.parseraw"] = "file:./compiled/transformedMinor/craydent.parseraw";
        pkg.dependencies[prefix + "craydent.http.payload"] = "file:./compiled/transformedMinor/craydent.http.payload";
        pkg.dependencies[prefix + "craydent.pluralize"] = "file:./compiled/transformedMinor/craydent.pluralize";
        pkg.dependencies[prefix + "craydent.http.post"] = "file:./compiled/transformedMinor/craydent.http.post";
        pkg.dependencies[prefix + "craydent.http.put"] = "file:./compiled/transformedMinor/craydent.http.put";
        pkg.dependencies[prefix + "craydent.queue"] = "file:./compiled/transformedMinor/craydent.queue";
        pkg.dependencies[prefix + "craydent.rand"] = "file:./compiled/transformedMinor/craydent.rand";
        pkg.dependencies[prefix + "craydent.read"] = "file:./compiled/transformedMinor/craydent.read";
        pkg.dependencies[prefix + "craydent.readdir"] = "file:./compiled/transformedMinor/craydent.readdir";
        pkg.dependencies[prefix + "craydent.readfile"] = "file:./compiled/transformedMinor/craydent.readfile";
        pkg.dependencies[prefix + "craydent.readlink"] = "file:./compiled/transformedMinor/craydent.readlink";
        pkg.dependencies[prefix + "craydent.realpath"] = "file:./compiled/transformedMinor/craydent.realpath";
        pkg.dependencies[prefix + "craydent.remove"] = "file:./compiled/transformedMinor/craydent.remove";
        pkg.dependencies[prefix + "craydent.removeall"] = "file:./compiled/transformedMinor/craydent.removeall";
        pkg.dependencies[prefix + "craydent.removeat"] = "file:./compiled/transformedMinor/craydent.removeat";
        pkg.dependencies[prefix + "craydent.rename"] = "file:./compiled/transformedMinor/craydent.rename";
        pkg.dependencies[prefix + "craydent.replaceall"] = "file:./compiled/transformedMinor/craydent.replaceall";
        pkg.dependencies[prefix + "craydent.replaceat"] = "file:./compiled/transformedMinor/craydent.replaceat";
        pkg.dependencies[prefix + "craydent.request"] = "file:./compiled/transformedMinor/craydent.request";
        pkg.dependencies[prefix + "craydent.requiredirectory"] = "file:./compiled/transformedMinor/craydent.requiredirectory";
        pkg.dependencies[prefix + "craydent.reverse"] = "file:./compiled/transformedMinor/craydent.reverse";
        pkg.dependencies[prefix + "craydent.rmdir"] = "file:./compiled/transformedMinor/craydent.rmdir";
        pkg.dependencies[prefix + "craydent.http.rollback"] = "file:./compiled/transformedMinor/craydent.http.rollback";
        pkg.dependencies[prefix + "craydent.rtrim"] = "file:./compiled/transformedMinor/craydent.rtrim";
        pkg.dependencies[prefix + "craydent.runfuncarray"] = "file:./compiled/transformedMinor/craydent.runfuncarray";
        pkg.dependencies[prefix + "craydent.safariversion"] = "file:./compiled/transformedMinor/craydent.safariversion";
        pkg.dependencies[prefix + "craydent.sanitize"] = "file:./compiled/transformedMinor/craydent.sanitize";
        pkg.dependencies[prefix + "craydent.scramble"] = "file:./compiled/transformedMinor/craydent.scramble";
        pkg.dependencies[prefix + "craydent.send"] = "file:./compiled/transformedMinor/craydent.send";
        pkg.dependencies[prefix + "craydent.servermanager"] = "file:./compiled/transformedMinor/craydent.servermanager";
        pkg.dependencies[prefix + "craydent.http.set"] = "file:./compiled/transformedMinor/craydent.http.set";
        pkg.dependencies[prefix + "craydent.set"] = "file:./compiled/transformedMinor/craydent.set";
        pkg.dependencies[prefix + "craydent.set-header"] = "file:./compiled/transformedMinor/craydent.set-header";
        pkg.dependencies[prefix + "craydent.setproperty"] = "file:./compiled/transformedMinor/craydent.setproperty";
        pkg.dependencies[prefix + "craydent.singularize"] = "file:./compiled/transformedMinor/craydent.singularize";
        pkg.dependencies[prefix + "craydent.sortby"] = "file:./compiled/transformedMinor/craydent.sortby";
        pkg.dependencies[prefix + "craydent.startitwith"] = "file:./compiled/transformedMinor/craydent.startitwith";
        pkg.dependencies[prefix + "craydent.startswith"] = "file:./compiled/transformedMinor/craydent.startswith";
        pkg.dependencies[prefix + "craydent.startswithany"] = "file:./compiled/transformedMinor/craydent.startswithany";
        pkg.dependencies[prefix + "craydent.stat"] = "file:./compiled/transformedMinor/craydent.stat";
        pkg.dependencies[prefix + "craydent.stdev"] = "file:./compiled/transformedMinor/craydent.stdev";
        pkg.dependencies[prefix + "craydent.stringifyadvanced"] = "file:./compiled/transformedMinor/craydent.stringifyadvanced";
        pkg.dependencies[prefix + "craydent.strip"] = "file:./compiled/transformedMinor/craydent.strip";
        pkg.dependencies[prefix + "craydent.substringbetween"] = "file:./compiled/transformedMinor/craydent.substringbetween";
        pkg.dependencies[prefix + "craydent.substringendat"] = "file:./compiled/transformedMinor/craydent.substringendat";
        pkg.dependencies[prefix + "craydent.substringstartfrom"] = "file:./compiled/transformedMinor/craydent.substringstartfrom";
        pkg.dependencies[prefix + "craydent.suid"] = "file:./compiled/transformedMinor/craydent.suid";
        pkg.dependencies[prefix + "craydent.sum"] = "file:./compiled/transformedMinor/craydent.sum";
        pkg.dependencies[prefix + "craydent.symlink"] = "file:./compiled/transformedMinor/craydent.symlink";
        pkg.dependencies[prefix + "craydent.syncroit"] = "file:./compiled/transformedMinor/craydent.syncroit";
        pkg.dependencies[prefix + "craydent.then"] = "file:./compiled/transformedMinor/craydent.then";
        pkg.dependencies[prefix + "craydent.tocurrencynotation"] = "file:./compiled/transformedMinor/craydent.tocurrencynotation";
        pkg.dependencies[prefix + "craydent.todatetime"] = "file:./compiled/transformedMinor/craydent.todatetime";
        pkg.dependencies[prefix + "craydent.toobject"] = "file:./compiled/transformedMinor/craydent.toobject";
        pkg.dependencies[prefix + "craydent.topromise"] = "file:./compiled/transformedMinor/craydent.topromise";
        pkg.dependencies[prefix + "craydent.toset"] = "file:./compiled/transformedMinor/craydent.toset";
        pkg.dependencies[prefix + "craydent.tostringalt"] = "file:./compiled/transformedMinor/craydent.tostringalt";
        pkg.dependencies[prefix + "craydent.truncate"] = "file:./compiled/transformedMinor/craydent.truncate";
        pkg.dependencies[prefix + "craydent.tryeval"] = "file:./compiled/transformedMinor/craydent.tryeval";
        pkg.dependencies[prefix + "craydent.universaltrim"] = "file:./compiled/transformedMinor/craydent.universaltrim";
        pkg.dependencies[prefix + "craydent.unlink"] = "file:./compiled/transformedMinor/craydent.unlink";
        pkg.dependencies[prefix + "craydent.update"] = "file:./compiled/transformedMinor/craydent.update";
        pkg.dependencies[prefix + "craydent.upsert"] = "file:./compiled/transformedMinor/craydent.upsert";
        pkg.dependencies[prefix + "craydent.utimes"] = "file:./compiled/transformedMinor/craydent.utimes";
        pkg.dependencies[prefix + "craydent.vardump"] = "file:./compiled/transformedMinor/craydent.vardump";
        pkg.dependencies[prefix + "craydent.wait"] = "file:./compiled/transformedMinor/craydent.wait";
        pkg.dependencies[prefix + "craydent.where"] = "file:./compiled/transformedMinor/craydent.where";
        pkg.dependencies[prefix + "craydent.write"] = "file:./compiled/transformedMinor/craydent.write";
        pkg.dependencies[prefix + "craydent.writefile"] = "file:./compiled/transformedMinor/craydent.writefile";
        pkg.dependencies[prefix + "craydent.writesession"] = "file:./compiled/transformedMinor/craydent.writesession";
        pkg.dependencies[prefix + "craydent.yieldable"] = "file:./compiled/transformedMinor/craydent.yieldable";
        pkg.dependencies[prefix + "craydent.zipit"] = "file:./compiled/transformedMinor/craydent.zipit";
    }
    try { await fs.unlink(root + "/package.json"); } catch (e) { /*console.log(e);*/ }
    await fs.writeFile(root + '/package.json', JSON.stringify(pkg, null, 4));
    await updateCompiled(publish, 'transformedMajor', prefix);
    await updateCompiled(publish, 'transformedMinor', prefix);
}


async function updateCompiled(publish, dir, prefix) {
    if (!require('fs').existsSync(`${root}/compiled/${dir}`)) {
        return;
    }
    let folders = await fs.readdir(`${root}/compiled/${dir}`);
    let promises = [];
    for (let i = 0, len = folders.length; i < len; i++) {
        let folder = folders[i];
        let json = require(`${root}/compiled/${dir}/${folder}/package.json`);
        for (let module in json.dependencies) {
            let path = `file:${root}/compiled/transformedMajor/${module.replace(prefix, '')}`
            if (~module.indexOf('.')) {
                path = `file:${root}/compiled/transformedMinor/${module.replace(prefix, '')}`;
            }
            json.dependencies[module] = publish ? pkg.version : path;
        }
        promises.push(fs.writeFile(
            `${root}/compiled/${dir}/${folder}/package.json`,
            JSON.stringify(json, null, 4)
        ));
    }
    await Promise.all(promises);
}
module.exports.start = start;