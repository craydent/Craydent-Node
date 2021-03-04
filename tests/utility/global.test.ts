import $c from '../../compiled/transformedMajor/utility/global';
import _getFuncName from '../../modules/protected/_getFuncName';
import isBetween from '../../compiled/transformedMinor/craydent.isbetween';
$c;
describe('No Conflict Global methods', function () {
    let win = (global as any).window;
    beforeAll(() => { delete (global as any).window; });
    afterAll(() => { (global as any).window = win; });
    var usersdata = {
        users:
            [{ username: 'mtglass', name: 'Mark Glass', age: 10 },
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
            { username: 'awesome_game', name: 'clash of clans', age: 21 }]
    };
    it('ajax success', function () {
        ajax({
            url: "http://www.craydent.com:8000/test/users.js",
            onsuccess: function (data, req, ctx, status_code) {
                expect(data).toEqual(usersdata);
                expect(status_code).toBe(200);
            }
        });
    });
    it('ajax error', function () {
        var errored = false, prm1 = ajax({
            url: "http://www.craydent.com:8000/test/userss.js",
            onsuccess: function (data, req, ctx, status_code) {
                expect('Should not execute').toBe(true);
            },
            onerror: function (data, req, ctx, status_code) {
                expect(status_code).toBe(404);
                expect(errored).toBe(false);
                errored = true;
            }
        });
        (prm1 as any).otherwise(function (data, req, ctx, status_code) {
            expect(status_code).toBe(404);
            expect(errored).toBe(true);
        });
    });
    it('ajax - hitch', function () {
        var stage = 1,
            hobj = { hitch: true },
            ctx = { thectx: true };
        var prm2 = ajax({
            url: "http://www.craydent.com:8000/test/users.js",
            query: { a: "hello", b: "world" },
            hitch: hobj,
            context: ctx,
            //onstatechange:function(){
            //	expect(stage).toBe(1);
            //	console.log(arguments,'statechange');
            //},
            onbefore: function (request, hitch, thiz) {
                expect(stage++).toBe(1);
                expect(hitch).toBe(hobj);
                expect(thiz).toBe(global);
                expect(this).toBe(ctx);
            },
            oncomplete: function (data, hitch, req, status_code) {
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
            onsuccess: function (data, hitch, req, status_code) {
                expect(stage++).toBe(2);
                expect(hitch).toBe(hobj);
                expect(data).toEqual(usersdata);
                expect(this).toBe(ctx);
                expect(status_code).toBe(200);
            }
        });
        prm2.then(function (data, req, ctx, status_code) {
            expect(stage++).toBe(3);
            expect(data).toEqual(usersdata);
            expect(ctx).toBe(ctx);
            expect(status_code).toBe(200);
        } as any);

        prm2.finally(function (data, hitch, req, status_code) {
            expect(stage++).toBe(5);
            expect(hitch).toBe(hobj);
            expect(data).toEqual(usersdata);
            expect(this).toBe(ctx);
            expect(status_code).toBe(200);
        } as any);
    });
    it('cuid', function () {
        expect(cuid().length).toBe(36);
    });
    it('include', function () {
        expect(include('./modules/module1.js')()).toBe('module 1');
        expect(include('./modules/module2.js')()).toBe('module 2');
        expect(include('./modules/module3.js')).toBe(null);
    });
    it('md5', function () {
        expect(md5('A')).toBe('7fc56270e7a70fa81a5935b72eacbe29');
    });
    it('mkdirRecursive', function () {
        mkdirRecursive('/tests/modules/createdModulesFolder/folder', function (err, path) {
            expect(err).toBeNull();
            expect(path).toBe("/tests/modules/createdModulesFolder/folder");
        });
    });
    it('namespace', function () {
        expect(namespace("Test2", function TestClass() { }).toString()).toEqual('function TestClass() { }');
        expect(_getFuncName((new ((namespace as any).Test2.TestClass)()).constructor)).toBe("TestClass");
        expect((namespace as any).Test2 + '').toBe('function TestClass() { }');
        // @ts-ignore
        expect(typeof Test2).toBe('undefined');
    });
    it('now', function () {
        expect((now() as Date).getTime()).toBeCloseTo(new Date().getTime(), -1);
        expect(now('n')).toBe(((new Date()).getMonth() + 1).toString());
    });
    it('parseRaw', function () {
        expect(parseRaw("str")).toBe("\"str\"");
        expect(parseRaw({})).toBe("{}");
        expect(parseRaw([])).toBe("[]");

        expect(parseRaw("str", true)).toBe("str");
        expect(parseRaw(function () { }, true)).toBe("function () { }");
        expect(parseRaw(function* () { }, true).replace(/[\n]/g, '').replace(/\s/g, '')).toBe(`function(){return__generator(this,function(_a){return[2/*return*/];});}`);
    });
    it('rand', function () {
        var i = 0;
        while (i < 1000) {
            expect(isBetween(rand(1, 2, true), 1, 2, true)).toBe(true);
            expect(isBetween(rand(1, 2), 1, 2)).toBe(true);
            i++;
        }
    });
    it('requireDirectory relative path', async function () {
        var mods = await requireDirectory('./modules');
        expect(mods).toEqual({ '/module1.js': expect.any(Function), '/module2.js': expect.any(Function) });

        mods = requireDirectory('modules', 's');
        expect(mods).toEqual({ '/module1.js': expect.any(Function), '/module2.js': expect.any(Function) });
    });
    it('requireDirectory recursive', function () {
        var mods = requireDirectory('./modules', 'sr');
        expect(mods).toEqual({ '/module1.js': expect.any(Function), '/module2.js': expect.any(Function), '/submodule/submodule1.js': expect.any(Function) });

        mods = requireDirectory('./modules', { recursive: true, syncronous: true });
        expect(mods).toEqual({ '/module1.js': expect.any(Function), '/module2.js': expect.any(Function), '/submodule/submodule1.js': expect.any(Function) });

        mods = requireDirectory('modules', { recursive: true, syncronous: true });
        expect(mods).toEqual({ '/module1.js': expect.any(Function), '/module2.js': expect.any(Function), '/submodule/submodule1.js': expect.any(Function) });
    });
    it('suid', function () {
        expect(suid().length).toBe(10);
        expect(suid(5).length).toBe(5);
    });
    describe("syncroit async test", function () {
        var result = [];

        beforeEach(function (done) {
            syncroit(function* () {
                var resolve = true;

                function testPromise() {
                    return new Promise(function (res, rej) {
                        if (resolve) { return res({ resolve: resolve }); }
                        return rej({ resolve: resolve });
                    });
                }
                result.push(yield testPromise());

                resolve = false;
                result.push(yield testPromise());
                result.push(yield ajax("http://www.craydent.com:8000/test/users.js"));
                done();
            });
        });
        it('syncroit', function () {
            var shouldbe = [
                { resolve: true },
                { resolve: false },
                {
                    users: [{ username: 'mtglass', name: 'Mark Glass', age: 10 },
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
                    { username: 'awesome_game', name: 'clash of clans', age: 21 }]
                }
            ];
            for (var i = 0, len = result.length; i < len; i++) {
                expect(result[i]).toEqual(shouldbe[i]);
            }
        });

    });
    it('tryEval', function () {
        expect(tryEval("{}")).toEqual({});
        expect(tryEval("{{}")).toEqual(null);
        expect(tryEval("4")).toEqual(4);
        expect(tryEval("\"s\"")).toEqual("s");
    });
    // TO/DO wait
    //it('wait',function(){
    //
    //});
    // TO/DO zipit
    it('zipit', function () {
    });

});