import _parseAdvanced from '../../modules/protected/_parseAdvanced';

declare var $g: any;
describe('_parseAdvanced', () => {
    it('should parse object with refs from different file using current path', () => {
        const relativePathType = { routes: { hi: "hello", oha: { "ref": "routes/hi" }, obj: { "$ref": "./test.json" }, obj2: { "$ref": "./test.json" } } };
        const expected = { routes: { hi: "hello", oha: { ref: "routes/hi" }, obj: { test: "testing" }, obj2: { test: "testing" } } };
        expect(_parseAdvanced(relativePathType)).toEqual(expected);
    });
    it('should parse object with refs from different file using relative path', () => {
        const relativePathType = { routes: { hi: "hello", oha: { "ref": "routes/hi" }, obj: { "$ref": "../test.json" } } };
        const expected = { routes: { hi: "hello", oha: { ref: "routes/hi" }, obj: { test: "testing" } } };
        expect(_parseAdvanced(relativePathType)).toEqual(expected);
    });
    it('should parse object with refs from different file using absolute path', () => {
        const absolutePathType = { routes: { hi: "hello", oha: { "ref": "routes/hi" }, obj: { "$ref": "/tests/protected/test.json" } } };
        const expected = { routes: { hi: "hello", oha: { ref: "routes/hi" }, obj: { test: "testing" } } };
        expect(_parseAdvanced(absolutePathType)).toEqual(expected);
    });
    it('should parse object with refs from different file name', () => {
        const fileNameType = { routes: { hi: "hello", oha: { "ref": "routes/hi" }, obj: { "$ref": "test.json" } } };
        const expected = { routes: { hi: "hello", oha: { ref: "routes/hi" }, obj: { test: "testing" } } };
        expect(_parseAdvanced(fileNameType)).toEqual(expected);
    });
    it('should parse object with refs with # absolute path', () => {
        const localPathType = { routes: { hi: "hello", oha: { "$ref": "#/routes/hi" } } };
        const expected = { routes: { hi: "hello", oha: "hello" } };
        expect(_parseAdvanced(localPathType)).toEqual(expected);
    });
    it('should parse object with refs with # relative path', () => {
        const localPathType = { routes: { hi: "hello", hello2: { "$ref": "#hi" }, hello: { "$ref": "#./hi" }, oha: { "$ref": "#../routes/hi" }, ohaUndefined: { "$ref": "#../../routes/hi" } } };
        const expected = { routes: { hi: "hello", hello2: "hello", hello: "hello", oha: "hello", ohaUndefined: undefined } };
        expect(_parseAdvanced(localPathType)).toEqual(expected);
    });
    it('should parse object with templates', function () {
        expect(_parseAdvanced({ "routes": { "${domain}": "${bb}" } }, null, { domain: "property", bb: "baby" })).toEqual({ routes: { property: 'baby' } });
        //
    });
    it('should parse object with templates and types', function () {
        function TempFunctionClass() { };
        $g.TempFunctionClass = TempFunctionClass;
        const objWithType = {
            "routes": {
                "Number.num": "0",
                "RegExp.reg": "/pattern/",
                "TempFunctionClass.cls": "{}",
                "Function.${bb.b}": "function(${domain}){}",
                "${domain}": "${bb.b}"
            },
            "o.prop": {},
            "a.prop": []
        };
        const templateValues = { domain: "property", bb: { b: "baby" } };
        const expected = { routes: { num: 0, reg: /pattern/, cls: new (TempFunctionClass as any)(), baby: (property: any) => { }, property: "baby" }, "o.prop": {}, "a.prop": [] };
        const result = _parseAdvanced(objWithType, null, templateValues)
        expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
        delete $g.TempFunctionClass;
    });
    it('should return undefined when given invalid object', function () {
        expect(_parseAdvanced(null)).toBeUndefined();
    });
    it('should parse normal objects', function () {
        expect(_parseAdvanced({ a: 1, b: "", c: true, d: /a/ })).toEqual({ a: 1, b: "", c: true, d: /a/ });
    });
});