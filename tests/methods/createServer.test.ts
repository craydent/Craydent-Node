import createServer from '../../compiled/transformedMinor/craydent.createserver';
import { $c } from '../../compiled/transformedMinor/craydent.createserver/private/__common';

jest.mock('../../compiled/transformedMinor/craydent.createserver/private/__setPath', () => {
    return {
        "default": (...args: any[]) => __setPath.apply(this, args as any)
    }
});
jest.mock('fs', () => {
    return {
        "readFile": (...args: any[]) => fs.apply(this, args as any)
    }
});
let __setPath = () => { }
let fs = () => { }
describe('createServer', () => {
    const win = window;
    const bsl = $c.BALANCE_SERVER_LIST;
    const rc = $c.RESPONSES;
    beforeEach(() => {
        __setPath = () => { }
        fs = () => { }
        delete (global as any).window;
        $c.BALANCE_SERVER_LIST = [];
        $c.RESPONSES = {
            200: '200',
            404: '404',
            500: '500'
        };
    });
    afterAll(() => {
        $c.BALANCE_SERVER_LIST = bsl;
        $c.RESPONSES = rc;
        (global as any).window = win;
    });

    it('should create a new instance', () => {
        const http = createServer((req: any, res: any) => { });
        expect(http.loadBalance).toEqual(expect.any(Function));
        expect(http.routes).toEqual([]);
        expect(http.use).toEqual(expect.any(Function));
        expect(http.delete).toEqual(expect.any(Function));
        expect(http.get).toEqual(expect.any(Function));
        expect(http.post).toEqual(expect.any(Function));
        expect(http.put).toEqual(expect.any(Function));
        expect(http.all).toEqual(expect.any(Function));
    });
    it('should handle favicon.ico with 200', () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => f(null, 'content'));
        const req = {
            url: '/favicon.ico',
            headers: { host: 'www.example.com' },
            connection: {}
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };
        createServer({ createServer: (func: any) => { return func(req, res), {} as any; }, favicon: 'fav' });
        expect(res.writeHead).toHaveBeenCalledWith(200, { "Content-Type": "image/x-icon" });
        expect(res.end).toHaveBeenCalledWith('content');
    });
    it('should handle favicon.ico with 500', () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => { throw '1' });
        const req = {
            url: '/favicon.ico',
            headers: { host: 'www.example.com' },
            connection: {}
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };

        const http = createServer({ createServer: (func: any) => { return func(req, res), {} as any; }, favicon: 'fav' });
        expect(res.writeHead).toHaveBeenCalledWith(500, { "Content-Type": "image/x-icon" });
        expect(res.end).toHaveBeenCalledWith('500');
    });
    it('should handle post request', () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => { throw '' });
        const req = {
            url: '/path',
            headers: { host: 'www.example.com', 'content-type': '/x-www-form-urlencoded' },
            connection: {},
            method: 'post',
            on: (event: any, func: any) => func('post=1')
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };
        let callback:any, cb = jest.fn();
        const http = createServer({ createServer: (func: any) => { callback = func; return {} as any; }, favicon: 'fav' });
        http.routes = [{ path: '/to/the/path', callback: [cb], method: 'all' }, { path: '/path', callback: [cb], method: 'post' }];
        callback(req, res);
        expect(cb).toHaveBeenCalledWith(req, res, { post: 1 }, undefined);
    });
    it('should handle delete request', () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => { throw '' });
        const req = {
            url: '/path/hi',
            headers: { host: 'www.example.com', 'content-type': '/x-www-form-urlencoded' },
            connection: {},
            method: 'delete',
            on: (event: any, func: any) => func('')
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };
        let callback: any, cb = jest.fn();
        const http = createServer({ createServer: (func: any) => { callback = func; return {} as any; }, favicon: 'fav' });
        http.routes = [{ path: '/path/to', callback: [cb], method: 'delete' }];
        callback(req, res);
        expect(cb).not.toHaveBeenCalled();
        expect(res.end).toHaveBeenCalledWith('"404"');
    });
    it('should handle put request', () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => { throw '' });
        const req = {
            url: '/path/10/1/how',
            headers: { host: 'www.example.com', 'content-type': '/json' },
            connection: {},
            method: 'put',
            on: (event: any, func: any) => func('{id2:11}')
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };
        let callback:any, cb = jest.fn();
        const http = createServer({ createServer: (func: any) => { callback = func; return {} as any; }, favicon: 'fav' });
        http.routes = [{ path: '/path/${id}/${id2}/*', callback: [cb], method: 'put' }];
        callback(req, res);
        expect(cb).toHaveBeenCalledWith(req, res, { id: 10, id2: 11 }, undefined);
    });
    it('should handle get request', () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => { throw '' });
        const req = {
            url: '/?a=a',
            headers: { host: 'www.example.com', 'content-type': '/json' },
            connection: {},
            method: 'get'
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };
        let callback: any, cb = jest.fn();
        const http = createServer({ createServer: (func: any) => { callback = func; return {} as any; }, favicon: 'fav' });
        http.routes = [{ path: '/*', callback: [cb], method: 'get' }];
        callback(req, res);
        expect(cb).toHaveBeenCalledWith(req, res, { "a": "a" }, undefined);
    });
    it('should handle multiple listener types', async () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => { throw '' });
        const req = {
            url: '/?a=a',
            headers: { host: 'www.example.com', 'content-type': '/json' },
            connection: {},
            method: 'get'
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };
        let callback: any, cbs = [
            async function (req: any, res: any, params: any, next: any) {
                return await next();
            },
            function* (req: any, res: any, params: any, next: any):any {
                return yield next();
            },
            function () {
                return new Promise((res) => { res({ f: 1 }) });
            }
        ];
        const cb = jest.fn();
        const http = createServer({
            createServer: (func: any) => { callback = func; return {} as any; },
            favicon: 'fav',
            callback: async (req: any, res: any, value: any) => { cb(req, res, value); }
        });
        http.routes = [{ path: '/*', callback: cbs, method: 'get' }];
        await callback(req, res);
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({ f: 1 }));
        expect(cb).toHaveBeenCalledWith(req, res, { f: 1 });
    });
    it('should handle generator listener', async () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => { throw '' });
        const req = {
            url: '/?a=a',
            headers: { host: 'www.example.com', 'content-type': '/json' },
            connection: {},
            method: 'get'
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };
        let callback: any, cbs = [
            function* (req: any, res: any, params: any, next: any): any {
                return yield next();
            },
            async function (req: any, res: any, params: any, next:any) {
                return await next();
            },
            function (): any {
                return new Promise((res) => { res({ f: 1 }) });
            }
        ];
        const cb = jest.fn();
        const http = createServer({
            createServer: (func: any) => { callback = func; return {} as any; },
            favicon: 'fav',
            callback: function* (req: any, res: any, value: any) { cb(req, res, value); }
        });
        http.routes = [{ path: '/*', callback: cbs, method: 'get' }];
        await callback(req, res);
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({ f: 1 }));
        expect(cb).toHaveBeenCalledWith(req, res, { f: 1 });
    });
    it('should process as 404 when listeners do not return a value and send is not called', async () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => { throw '' });
        const req = {
            url: '/?a=a',
            headers: { host: 'www.example.com', 'content-type': '/json' },
            connection: {},
            method: 'get'
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };
        let callback:any;
        const http = createServer({ createServer: (func: any) => { callback = func; return {} as any; }, favicon: 'fav' });
        http.routes = [];
        await callback(req, res);
        expect(res.end).toHaveBeenCalledWith('"404"');
    });
    it('should invalidate parameters', () => {
        fs = jest.fn().mockImplementationOnce((name: any, f: any) => { throw '' });
        const req = {
            url: '/path',
            headers: { host: 'www.example.com', 'content-type': '/x-www-form-urlencoded' },
            connection: {},
            method: 'post',
            on: (event: any, func: any) => func('post=1&dtInvalid=abc&postNumber=def&email2=ghi')
        };
        const res = { writeHead: jest.fn(), end: jest.fn() };
        let callback: any, cb = jest.fn();
        const http = createServer({ createServer: (func: any) => { callback = func; return {} as any; }, favicon: 'fav' });
        http.routes = [{
            path: '/path',
            callback: [cb],
            method: 'post',
            parameters: [
                { name: 'post', type: 'number' },
                { name: 'postNumber', type: 'number' },
                { name: 'email', type: 'email' },
                { name: 'email2', type: 'email' },
                { name: 'none', default: '' },
                { name: 'regex', type: 'regexp' },
                { name: 'str', type: 'string' },
                { name: 'bool', type: 'bool' },
                { name: 'dtNone', type: 'date', default: '2019-02-02' },
                { name: 'dt', type: 'date' },
                { name: 'dtInvalid', type: 'date' },
                { name: 'required', required: true }
            ]
        }];
        callback(req, res);
        const errors = [
            "Invalid parameter type, postNumber must be a number.",
            "Invalid parameter type, email2 must be a email.",
            "Invalid parameter type, dtInvalid must be a date.",
            "Required parameter required was not provided."
        ]
        expect(cb).not.toHaveBeenCalled();
        expect(res.end).toHaveBeenCalledWith(JSON.stringify({ errors }))
    });
    describe('instance methods', () => {
        it('use', () => {
            const cb = () => { };
            const http = createServer((req: any, res: any) => { });
            http.use('path', cb);
            http.use(cb);
            const expected = [
                { path: 'path', callback: [cb], method: 'middleware' },
                { path: '/*', callback: [cb], method: 'middleware' }
            ]
            expect(http.routes).toEqual(expected);
        });
        it('use without callback', () => {
            const http = createServer((req: any, res: any) => { });
            http.use('path');
            const expected = [
                { path: 'path', callback: [], method: 'middleware' }
            ]
            expect(http.routes).toEqual(expected);
        });
        it('use with array of callbacks', () => {
            const cb = () => { };
            const http = createServer((req: any, res: any) => { });
            http.use('path', [cb]);
            const expected = [
                { path: 'path', callback: [cb], method: 'middleware' }
            ]
            expect(http.routes).toEqual(expected);
        });
        it('loadBalance', () => {
            const cb = () => { };
            const http = createServer((req: any, res: any) => { });
            http.loadBalance('1.1.1.1,2.2.2.2');
            expect($c.BALANCE_SERVER_LIST).toEqual(['1.1.1.1', '2.2.2.2']);
        });
        it('loadBalance using array', () => {
            const cb = () => { };
            const http = createServer((req: any, res: any) => { });
            http.loadBalance(['1.1.1.1', '2.2.2.2']);
            expect($c.BALANCE_SERVER_LIST).toEqual(['1.1.1.1', '2.2.2.2']);
        });
        it('delete', () => {
            __setPath = jest.fn();
            const cb = () => { };
            const http = createServer((req: any, res: any) => { });
            http.delete('path', cb);
            expect(__setPath).toHaveBeenCalledWith('delete', http, 'path', cb);
        });
        it('get', () => {
            __setPath = jest.fn();
            const cb = () => { };
            const http = createServer((req: any, res: any) => { });
            http.get('path', cb);
            expect(__setPath).toHaveBeenCalledWith('get', http, 'path', cb);
        });
        it('post', () => {
            __setPath = jest.fn();
            const cb = () => { };
            const http = createServer((req: any, res: any) => { });
            http.post('path', cb);
            expect(__setPath).toHaveBeenCalledWith('post', http, 'path', cb);
        });
        it('put', () => {
            __setPath = jest.fn();
            const cb = () => { };
            const http = createServer((req: any, res: any) => { });
            http.put('path', cb);
            expect(__setPath).toHaveBeenCalledWith('put', http, 'path', cb);
        });
        it('all', () => {
            __setPath = jest.fn();
            const cb = () => { };
            const http = createServer((req: any, res: any) => { });
            http.all('path', cb);
            expect(__setPath).toHaveBeenCalledWith('all', http, 'path', cb);
        });
    });
});