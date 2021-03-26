import $c from '../../compiled/transformedMajor/json-parser/noConflict';

describe('No Conflict Global methods', function () {
    it('JSON.parseAdvanced', function () {
        expect($c.parseAdvanced({ "routes": { "${domain}": "${bb}" } }, null, { domain: "property", bb: "baby" })).toEqual({ routes: { property: 'baby' } });
        expect(JSON.stringify($c.parseAdvanced({ "routes": { "Function.${bb.b}": "function(${domain}){}", "${domain}": "${bb.b}" } }, null, { domain: "property", bb: { b: "baby" } }))).toEqual(JSON.stringify({ routes: { baby: function (property: any) { }, property: "baby" } }));
        expect($c.parseAdvanced({ routes: { hi: "hello", oha: { "$ref": "#/routes/hi" }, obj: { "$ref": "/tests/test.json" } } })).toEqual({ routes: { hi: "hello", oha: "hello", obj: { test: "testing" } } });
        expect($c.parseAdvanced({ routes: { hi: "hello", oha: { "$ref": "#/routes/hi" }, obj: { "$ref": "./test.json" } } })).toEqual({ routes: { hi: "hello", oha: "hello", obj: { test: "testing" } } });
        expect($c.parseAdvanced({ routes: { hi: "hello", oha: { "$ref": "#/routes/hi" }, obj: { "$ref": "test.json" } } })).toEqual({ routes: { hi: "hello", oha: "hello", obj: { test: "testing" } } });

    });

});