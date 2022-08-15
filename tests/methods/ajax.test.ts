import * as ctx from '../../compiled/transformedMinor/craydent.ajax';
import ajax, { __ajaxServerResponse } from '../../compiled/transformedMinor/craydent.ajax';
jest.mock('http', () => {
    return {
        "request": (...args: any[]) => _nodeRequest.apply(this, args as any)
    }
});
jest.mock('https', () => {
    return {
        "request": (...args: any[]) => _nodeRequest.apply(this, args as any)
    }
});
jest.mock('../../compiled/transformedMinor/craydent.request', () => {
    return {
        "default": (...args: any[]) => _jsRequest.apply(this, args as any)
    }
});
jest.mock('../../compiled/transformedMinor/craydent.isfunction', () => {
    return {
        "default": (obj: any) => !!obj && obj.constructor.name == 'Function'
    }
});
jest.mock('../../compiled/transformedMinor/craydent.ieversion', () => {
    return {
        "default": () => -1
    }
});
jest.mock('../../compiled/transformedMinor/craydent.rand', () => {
    return {
        "default": () => _rand()
    }
});
let _nodeRequest = () => { };
let _jsRequest = () => { };
let _rand = () => { }

describe('ajax', () => {
    describe('NodeJS', () => {
        const win = window;
        let res: any, req: any;
        beforeAll(() => {
            delete (window as any).window;
        });
        afterAll(() => {
            (global as any).window = win;
        });
        beforeEach(() => {
            _nodeRequest = jest.fn().mockImplementationOnce((data: any, cb: any) => {
                setTimeout(() => { cb(res) }, 1)
                return req;
            });
            res = {
                on: (ev: any, method: any) => {
                    switch (ev) {
                        case 'error':
                            break;
                        case 'data':
                            setTimeout(() => { method('{success:true}') }, 5);
                            break;
                        case 'end':
                            setTimeout(() => { method() }, 15);
                            break;
                    }
                },
                statusCode: 200
            };
            req = {
                on: (ev: any, method: any) => {
                    switch (ev) {
                        case 'error':
                            break;
                    }
                },
                setTimeout: (time: any, method: any) => { },
                write: jest.fn(),
                end: jest.fn()
            }
        });
        it('should handle response error with default values', async () => {
            res.on = (ev: any, method: any) => {
                switch (ev) {
                    case 'error':
                        setTimeout(() => {
                            method({ error: true })
                        }, 5);
                        break;
                    case 'data':
                        break;
                    case 'end':
                        break;
                }
            };
            let params = {
                url: "http://www.example.com",
                alwaysResolve: true,
                dataType: 'json',
                hitch: {},
                query: 'q=query&l=location',
                timeout: 100,
                context: {},
                headers: {},
                method: 'get',
                contentType: 'application/json',
                run: 'run',

                onstatechange: jest.fn(),
                onfileload: jest.fn(),
                onprogress: jest.fn(),
                onabort: jest.fn(),
                onresponse: jest.fn(),
                onloadstart: jest.fn(),
                onbefore: jest.fn(),
                oncomplete: jest.fn(),
                ondata: jest.fn(),
                onerror: jest.fn(),
                onsuccess: jest.fn(),
                json_parser: jest.fn().mockImplementationOnce(() => { return ''; }),
            };
            let catchIt = jest.fn();
            let finaly = jest.fn();
            let result = await ajax(params, 'request').catch(catchIt).finally(finaly);
            expect(result).toEqual({ error: true });
            expect(params.onstatechange).not.toHaveBeenCalled();
            expect(params.onfileload).not.toHaveBeenCalled();
            expect(params.onprogress).not.toHaveBeenCalled();
            expect(params.onabort).not.toHaveBeenCalled();
            expect(params.onresponse).not.toHaveBeenCalled();
            expect(params.onloadstart).not.toHaveBeenCalled();

            // expect(params.onbefore).toHaveBeenCalledWith(require('http'), params.hitch, ctx);
            expect(params.onbefore.mock.instances[0]).toBe(params.context);
            expect(params.oncomplete).toHaveBeenCalledWith({ error: true }, params.hitch, res, res.statusCode);
            expect(params.oncomplete.mock.instances[0]).toBe(params.context);
            expect(finaly).toHaveBeenCalledWith({ error: true }, params.hitch, res, res.statusCode);
            expect(params.ondata).not.toHaveBeenCalled();
            expect(params.onerror).toHaveBeenCalledWith({ error: true }, params.hitch, res, 200);
            expect(catchIt).toHaveBeenCalledWith({ error: true }, params.hitch, res, 200)
            expect(params.onsuccess).not.toHaveBeenCalled();
            expect(params.json_parser).toHaveBeenCalledWith('');
        });
        it('should handle response error code with default values', async () => {
            res.statusCode = 400;
            let params = {
                url: "http://www.example.com",
                alwaysResolve: true,
                dataType: 'json',
                hitch: {},
                query: 'q=query&l=location',
                timeout: 100,
                context: {},
                headers: {},
                method: 'get',
                contentType: 'application/json',
                run: 'run',

                onstatechange: jest.fn(),
                onfileload: jest.fn(),
                onprogress: jest.fn(),
                onabort: jest.fn(),
                onresponse: jest.fn(),
                onloadstart: jest.fn(),
                onbefore: jest.fn(),
                oncomplete: jest.fn(),
                ondata: jest.fn(),
                onerror: jest.fn(),
                onsuccess: jest.fn()
            };
            let result = await ajax(params, 'response');
            expect(result).toEqual(res);
            expect(params.onstatechange).not.toHaveBeenCalled();
            expect(params.onfileload).not.toHaveBeenCalled();
            expect(params.onprogress).not.toHaveBeenCalled();
            expect(params.onabort).not.toHaveBeenCalled();
            expect(params.onresponse).not.toHaveBeenCalled();
            expect(params.onloadstart).not.toHaveBeenCalled();

            // expect(params.onbefore).toHaveBeenCalledWith(require('http'), params.hitch, ctx);
            expect(params.onbefore.mock.instances[0]).toBe(params.context);
            expect(params.oncomplete).toHaveBeenCalledWith({ success: true }, params.hitch, res, res.statusCode);
            expect(params.oncomplete.mock.instances[0]).toBe(params.context);
            expect(params.ondata).toHaveBeenCalledWith('{success:true}', { data: '{success:true}' }, req, params.hitch, res);
            expect(params.onerror).toHaveBeenCalledWith({ success: true }, params.hitch, res, 400);
            expect(params.onsuccess).not.toHaveBeenCalled();
        });
        it('should handle request error with default values', async () => {
            req.on = (ev: any, method: any) => {
                switch (ev) {
                    case 'error':
                        setTimeout(() => { method({ errno: "", code: 100 }) }, 1)
                        break;
                }
            }
            let params = {
                url: "http://www.example.com",
                alwaysResolve: true,
                dataType: 'json',
                hitch: {},
                query: 'q=query&l=location',
                timeout: 100,
                headers: {},
                method: 'get',
                contentType: 'application/json',
                run: 'run',

                onstatechange: jest.fn(),
                onfileload: jest.fn(),
                onprogress: jest.fn(),
                onabort: jest.fn(),
                onresponse: jest.fn(),
                onloadstart: jest.fn(),
                onbefore: jest.fn(),
                oncomplete: jest.fn(),
                ondata: jest.fn(),
                onerror: jest.fn(),
                onsuccess: jest.fn()
            };
            let result = await ajax(params, 'request');
            expect(result).toEqual({ errno: "", code: 100 });
            expect(params.onstatechange).not.toHaveBeenCalled();
            expect(params.onfileload).not.toHaveBeenCalled();
            expect(params.onprogress).not.toHaveBeenCalled();
            expect(params.onabort).not.toHaveBeenCalled();
            expect(params.onresponse).not.toHaveBeenCalled();
            expect(params.onloadstart).not.toHaveBeenCalled();

            // expect(params.onbefore).toHaveBeenCalledWith(require('http'), params.hitch, ctx);
            expect(params.oncomplete).toHaveBeenCalledWith(null, params.hitch, req, 100);
            expect(params.ondata).not.toHaveBeenCalled();
            expect(params.onerror).toHaveBeenCalledWith(null, params.hitch, req, 100);
            expect(params.onsuccess).not.toHaveBeenCalled();
        });
        it('should simulate timeout request error with default values', async () => {
            _nodeRequest = jest.fn().mockImplementationOnce((data, cb) => {
                return req;
            });

            req.setTimeout = (time: any, method: any) => {
                setTimeout(() => { method() }, 2)
            };
            req.on = (ev: any, method: any) => {
                switch (ev) {
                    case 'error':
                        setTimeout(() => { method({ errno: "ETIMEDOUT", code: 504 }) }, 1)
                        break;
                }
            }
            let params = {
                url: "http://www.example.com",
                alwaysResolve: true,
                dataType: 'json',
                hitch: {},
                timeout: 100,
                headers: {},
                method: 'get',
                contentType: 'application/json',

                onstatechange: jest.fn(),
                onfileload: jest.fn(),
                onprogress: jest.fn(),
                onabort: jest.fn(),
                onresponse: jest.fn(),
                onloadstart: jest.fn(),
                onbefore: jest.fn(),
                oncomplete: jest.fn(),
                ondata: jest.fn(),
                onerror: jest.fn(),
                onsuccess: jest.fn()
            };
            let result = await ajax(params as any, 'request');
            expect(result).toEqual({ code: 504, errno: "ETIMEDOUT" });
            expect(params.onstatechange).not.toHaveBeenCalled();
            expect(params.onfileload).not.toHaveBeenCalled();
            expect(params.onprogress).not.toHaveBeenCalled();
            expect(params.onabort).not.toHaveBeenCalled();
            expect(params.onresponse).not.toHaveBeenCalled();
            expect(params.onloadstart).not.toHaveBeenCalled();

            // expect(params.onbefore).toHaveBeenCalledWith(require('http'), params.hitch, ctx);
            expect(params.oncomplete).toHaveBeenCalledWith(null, params.hitch, req, 504);
            expect(params.ondata).not.toHaveBeenCalled();
            expect(params.onerror).toHaveBeenCalledWith(null, params.hitch, req, 504);
            expect(params.onsuccess).not.toHaveBeenCalled();
        });
        it('should make request with default values', async () => {
            let result = await ajax({});
            expect(result).toEqual({ success: true });
        });
        it('should make request given a url', async () => {
            let result = await ajax('https://www.example.com', 'request');
            expect(result).toEqual(req);
        });
        it('should make request with query as object', async () => {
            let result = await ajax({ url: 'https://www.example.com', data: { key: 'value' } });
            expect(result).toEqual({ success: true });
        });
        it('should make request with values', async () => {
            const body = { success: true };
            let params = {
                url: "http://www.example.com",
                alwaysResolve: true,
                dataType: 'json',
                hitch: {},
                query: 'q=query&l=location',
                timeout: 100,
                context: {},
                headers: {},
                method: 'get',
                contentType: 'application/json',
                run: 'run',

                onstatechange: jest.fn(),
                onfileload: jest.fn(),
                onprogress: jest.fn(),
                onabort: jest.fn(),
                onresponse: jest.fn(),
                onloadstart: jest.fn(),
                onbefore: jest.fn(),
                oncomplete: jest.fn(),
                ondata: jest.fn(),
                onerror: jest.fn(),
                onsuccess: jest.fn(),
                json_parser: jest.fn().mockImplementationOnce(() => { return body; }),
            };
            let result = await ajax(params);
            expect(result).toEqual({ success: true });
            expect(params.onstatechange).not.toHaveBeenCalled();
            expect(params.onfileload).not.toHaveBeenCalled();
            expect(params.onprogress).not.toHaveBeenCalled();
            expect(params.onabort).not.toHaveBeenCalled();
            expect(params.onresponse).not.toHaveBeenCalled();
            expect(params.onloadstart).not.toHaveBeenCalled();

            // expect(params.onbefore).toHaveBeenCalledWith(require('http'), params.hitch, ctx);
            expect(params.onbefore.mock.instances[0]).toBe(params.context);
            expect(params.oncomplete).toHaveBeenCalledWith(body, params.hitch, res, res.statusCode);
            expect(params.oncomplete.mock.instances[0]).toBe(params.context);
            expect(params.ondata).toHaveBeenCalledWith('{success:true}', { data: '{success:true}' }, req, params.hitch, res);
            expect(params.ondata.mock.instances[0]).toBe(params.context);
            expect(params.onerror).not.toHaveBeenCalled();
            expect(params.onsuccess).toHaveBeenCalledWith(body, params.hitch, res, res.statusCode);
            expect(params.onsuccess.mock.instances[0]).toBe(params.context);
            expect(params.json_parser).toHaveBeenCalledWith('{success:true}');
        });
        it('should make request with values when then method is added', async () => {
            _nodeRequest = jest.fn().mockImplementationOnce((data, cb) => {
                setTimeout(() => { cb(res) }, 10)
                return req;
            });
            const body = { success: true };
            let params = {
                url: "http://www.example.com",
                alwaysResolve: true,
                dataType: 'json',
                hitch: {},
                query: 'q=query&l=location',
                timeout: 100,
                context: {},
                headers: {},
                method: 'get',
                contentType: 'application/json',
                run: 'run',
                json_parser: () => { return body; }
            };
            let then = jest.fn().mockImplementationOnce((data) => data);
            let result = await ajax(params).then(then);
            expect(result).toEqual({ success: true });
            expect(then).toHaveBeenCalledWith(body, params.hitch, res, res.statusCode);

        });
        it('should make request with default values using get', async () => {
            let result = await ajax.get({});
            expect(result).toEqual({ success: true });
        });
        it('should make request with default values using delete', async () => {
            let result = await ajax.delete({});
            expect(result).toEqual({ success: true });
        });
        it('should make request with default values using post', async () => {
            let result = await ajax.post({});
            expect(result).toEqual({ success: true });
        });
        it('should make request with default values using put', async () => {
            let result = await ajax.put({});
            expect(result).toEqual({ success: true });
        });
    });
    describe('JS', () => {
        describe('json', () => {
            let xp: any = {}, httpRequest: any;
            beforeEach(() => {
                httpRequest = {
                    responseText: '{"responseText":""}',
                    readyState: 4,
                    status: 201,
                    onreadystatechange: null,
                    open: jest.fn(),
                    setRequestHeader: jest.fn(),
                    send: jest.fn()
                };
                _jsRequest = jest.fn().mockImplementationOnce(() => {
                    const self = this;
                    setTimeout(() => { httpRequest.onreadystatechange.call(httpRequest, xp) }, 1);
                    return httpRequest;
                });
            });
            it('should make request with default values', async () => {
                let params = {
                    url: "http://www.example.com",
                    alwaysResolve: true,
                    dataType: 'json',
                    hitch: {},
                    query: 'q=query&l=location',
                    timeout: 100,
                    context: {},
                    headers: {},
                    method: 'get',
                    contentType: 'application/json',
                    run: 'run',

                    onstatechange: jest.fn(),
                    onfileload: jest.fn(),
                    onprogress: jest.fn(),
                    onabort: jest.fn(),
                    onresponse: jest.fn(),
                    onloadstart: jest.fn(),
                    onbefore: jest.fn(),
                    oncomplete: jest.fn(),
                    ondata: jest.fn(),
                    onerror: jest.fn(),
                    onsuccess: jest.fn(),
                    json_parser: jest.fn().mockImplementationOnce(() => { return { "responseText": "" }; }),
                };
                let catchIt = jest.fn();
                let finaly = jest.fn();
                let result = await ajax(params).catch(catchIt).finally(finaly);
                expect(result).toEqual({ "responseText": "" });
                expect(params.onstatechange).not.toHaveBeenCalled();
                expect(params.onfileload).not.toHaveBeenCalled();
                expect(params.onprogress).not.toHaveBeenCalled();
                expect(params.onabort).not.toHaveBeenCalled();
                expect(params.onresponse).not.toHaveBeenCalled();
                expect(params.onloadstart).not.toHaveBeenCalled();

                // expect(params.onbefore).toHaveBeenCalledWith(httpRequest, params.hitch, ctx);
                expect(params.onbefore.mock.instances[0]).toBe(params.context);
                expect(httpRequest.open).toHaveBeenCalledWith(params.method, "http://www.example.com?run=runq=query&l=location", true);
                expect(httpRequest.setRequestHeader).toHaveBeenCalledWith('Content-type', params.contentType);
                expect(httpRequest.send).toHaveBeenCalled();
                expect(params.ondata).toHaveBeenCalledWith('{"responseText":""}', { data: '{"responseText":""}' }, httpRequest, params.hitch, xp);
                expect(params.ondata.mock.instances[0]).toBe(params.context);
                expect(params.json_parser).toHaveBeenCalled();
                expect(params.onsuccess).toHaveBeenCalledWith({ responseText: "" }, params.hitch, httpRequest, xp, 201);
                expect(params.ondata.mock.instances[0]).toBe(params.context);
                expect(params.oncomplete).toHaveBeenCalledWith({ responseText: "" }, params.hitch, httpRequest, xp, 201);
                expect(params.oncomplete.mock.instances[0]).toBe(params.context);

                expect(finaly).toHaveBeenCalledWith({ responseText: "" }, params.hitch, httpRequest, xp, 201);
                expect(catchIt).not.toHaveBeenCalled();
            });
            it('should handle response error with default values', async () => {
                httpRequest.status = 500;

                let params = {
                    url: "http://www.example.com",
                    alwaysResolve: true,
                    dataType: 'json',
                    hitch: {},
                    query: 'q=query&l=location',
                    timeout: 100,
                    context: {},
                    headers: {},
                    method: 'get',
                    contentType: 'application/json',
                    run: 'run',

                    onstatechange: jest.fn(),
                    onfileload: jest.fn(),
                    onprogress: jest.fn(),
                    onabort: jest.fn(),
                    onresponse: jest.fn(),
                    onloadstart: jest.fn(),
                    onbefore: jest.fn(),
                    oncomplete: jest.fn(),
                    ondata: jest.fn(),
                    onerror: jest.fn(),
                    onsuccess: jest.fn(),
                    json_parser: jest.fn(),
                };
                let catchIt = jest.fn();
                let finaly = jest.fn();
                let result = await ajax(params).catch(catchIt).finally(finaly);
                expect(result).toEqual({ "responseText": "" });
                expect(params.onstatechange).not.toHaveBeenCalled();
                expect(params.onfileload).not.toHaveBeenCalled();
                expect(params.onprogress).not.toHaveBeenCalled();
                expect(params.onabort).not.toHaveBeenCalled();
                expect(params.onresponse).not.toHaveBeenCalled();
                expect(params.onloadstart).not.toHaveBeenCalled();

                // expect(params.onbefore).toHaveBeenCalledWith(httpRequest, params.hitch, ctx);
                expect(params.onbefore.mock.instances[0]).toBe(params.context);
                expect(httpRequest.open).toHaveBeenCalledWith(params.method, "http://www.example.com?run=runq=query&l=location", true);
                expect(httpRequest.setRequestHeader).toHaveBeenCalledWith('Content-type', params.contentType);
                expect(httpRequest.send).toHaveBeenCalled();
                expect(params.ondata).toHaveBeenCalledWith('{"responseText":""}', { data: '{"responseText":""}' }, httpRequest, params.hitch, xp);
                expect(params.ondata.mock.instances[0]).toBe(params.context);
                expect(params.onerror).toHaveBeenCalledWith({ responseText: "" }, params.hitch, httpRequest, xp, 500);
                expect(params.onsuccess).not.toHaveBeenCalled();
                expect(params.ondata.mock.instances[0]).toBe(params.context);
                expect(params.oncomplete).toHaveBeenCalledWith({ responseText: "" }, params.hitch, httpRequest, xp, 500);
                expect(params.oncomplete.mock.instances[0]).toBe(params.context);

                expect(finaly).toHaveBeenCalledWith({ responseText: "" }, params.hitch, httpRequest, xp, 500);
                expect(catchIt).toHaveBeenCalledWith({ responseText: "" }, params.hitch, httpRequest, xp, 500);
            });
            it('should make request with default values and return request object', async () => {
                let params = {
                    url: "http://www.example.com",
                    alwaysResolve: true,
                    dataType: 'json',
                    hitch: {},
                    query: 'q=query&l=location',
                    timeout: 100,
                    context: {},
                    headers: [{ type: 'x-data', value: 'data' }],
                    method: 'get',
                    contentType: 'application/json',
                    run: 'run'
                };
                let result = await ajax(params, 'request');
                expect(result).toBe(httpRequest);
                expect(httpRequest.setRequestHeader).toHaveBeenNthCalledWith(2, 'x-data', 'data');
            });
            it('should make request with default values and return response object', async () => {
                let params = {
                    url: "http://www.example.com",
                    alwaysResolve: true,
                    dataType: 'json',
                    hitch: {},
                    query: 'q=query&l=location',
                    timeout: 100,
                    context: {},
                    headers: { 'x-data': 'data' },
                    method: 'get',
                    contentType: 'application/json',
                    run: 'run'
                };
                let result = await ajax(params, 'response');
                expect(result).toBe(xp);
                expect(httpRequest.setRequestHeader).toHaveBeenNthCalledWith(2, 'x-data', 'data');
            });
            it('should make request with values when then method is added', async () => {
                let params = {
                    url: "http://www.example.com",
                    alwaysResolve: true,
                    dataType: 'json',
                    hitch: {},
                    query: 'q=query&l=location',
                    timeout: 100,
                    context: {},
                    headers: { 'x-data': 'data' },
                    method: 'get',
                    contentType: 'application/json',
                    run: 'run'
                };
                let then = jest.fn().mockImplementationOnce((data) => data);
                let result = await ajax(params).then(then);
                expect(result).toEqual({ responseText: "" });
                expect(then).toHaveBeenCalledWith({ responseText: "" }, params.hitch, httpRequest, xp, 201);

            });
            it('should make request with values when Promise is not supported', async () => {
                const RealPromise = Promise;
                delete (window as any).Promise;

                let params = {
                    url: "http://www.example.com",
                    alwaysResolve: true,
                    dataType: 'json',
                    hitch: {},
                    query: 'q=query&l=location',
                    timeout: 100,
                    context: {},
                    headers: { 'x-data': 'data' },
                    method: 'get',
                    contentType: 'application/json',
                    run: 'run'
                };
                let then = jest.fn().mockImplementationOnce((data) => data);
                let result = await ajax(params).then(then);
                expect(result).toEqual({ responseText: "" });
                expect(then).toHaveBeenCalledWith({ responseText: "" }, params.hitch, httpRequest, xp, 201);
                (window as any).Promise = RealPromise;
            });
        });
        describe('jsonp', () => {
            let tag: any;
            let doc = window.document;
            let head: any = { firstChild: {}, removeChild: jest.fn() };
            beforeEach(() => {
                _rand = () => { }
                tag = {
                    onload: () => { },
                    readyState: '',
                    parentNode: {}
                };
                delete (window as any).document;
                head['insertBefore'] = jest.fn();
                (window as any).document = {
                    getElementsByTagName: () => [head],
                    addEventListener: doc.addEventListener.bind(doc)
                } as any;
            });
            afterAll(() => {
                doc && ((window as any).document = doc);
            })
            it('should make request with values', async () => {
                tag.readyState = 'complete';
                (window as any).document.createElement = jest.fn().mockImplementationOnce(() => {
                    setTimeout(() => { tag.onload.call(tag) }, 1);
                    setTimeout(() => { (window as any)['_cjson']({ success: {} }) }, 10);
                    return tag;
                });

                let params = {
                    url: "http://www.example.com",
                    alwaysResolve: true,
                    dataType: 'jsonp',
                    hitch: {},
                    query: 'q=query&l=location',
                    timeout: 100,
                    context: {},
                    headers: {},
                    method: 'get',
                    contentType: 'application/json',
                    run: 'run',
                    jsonpCallback: '_cjson',

                    onstatechange: jest.fn(),
                    onfileload: jest.fn(),
                    onprogress: jest.fn(),
                    onabort: jest.fn(),
                    onresponse: jest.fn(),
                    onloadstart: jest.fn(),
                    onbefore: jest.fn(),
                    oncomplete: jest.fn(),
                    ondata: jest.fn(),
                    onerror: jest.fn(),
                    onsuccess: jest.fn(),
                    json_parser: jest.fn().mockImplementationOnce(() => { return { "responseText": "" }; }),
                };
                let catchIt = jest.fn();
                let finaly = jest.fn();
                let result = await ajax(params).catch(catchIt).finally(finaly);
                expect(result).toEqual({ success: {} });
                expect(params.onstatechange).not.toHaveBeenCalled();
                expect(params.onfileload).not.toHaveBeenCalled();
                expect(params.onprogress).not.toHaveBeenCalled();
                expect(params.onabort).not.toHaveBeenCalled();
                expect(params.onresponse).not.toHaveBeenCalled();
                expect(params.onloadstart).not.toHaveBeenCalled();

                // expect(params.onbefore).toHaveBeenCalledWith(tag, params.hitch, ctx);
                expect(params.onbefore.mock.instances[0]).toBe(params.context);
                expect(head['insertBefore']).toHaveBeenCalledWith(tag, head.firstChild);
                expect(params.ondata).toHaveBeenCalledWith(tag.readyState, {}, tag, params.hitch, tag);
                expect(params.ondata.mock.instances[0]).toBe(params.context);
                expect(params.json_parser).not.toHaveBeenCalled();
                expect(head.removeChild).toHaveBeenCalledWith(tag);
                expect(params.onsuccess).toHaveBeenCalledWith({ success: {} }, params.hitch, tag, tag, 200);
                expect(params.oncomplete).toHaveBeenCalledWith({ success: {} }, params.hitch, tag, tag, 200);
                expect(params.oncomplete.mock.instances[0]).toBe(params.context);

                expect(finaly).toHaveBeenCalledWith({ success: {} }, params.hitch, tag, tag, 200);
                expect(catchIt).not.toHaveBeenCalled();
                expect((window as any)['_cjson']).toBeUndefined();
            });
            it('should handle response error with values', async () => {
                tag.parentNode = null;
                (window as any).document.createElement = jest.fn().mockImplementationOnce(() => {
                    setTimeout(() => { tag.onload.call(tag) }, 1);
                    setTimeout(() => { (window as any)['_cjson20']({ fail: {} }) }, 10);
                    return tag;
                });
                (window as any)['_cjson10'] = () => { }
                _rand = jest.fn()
                    .mockImplementationOnce(() => 10)
                    .mockImplementationOnce(() => 20)

                let params = {
                    url: "http://www.example.com",
                    alwaysResolve: true,
                    dataType: 'jsonp',
                    hitch: {},
                    query: 'q=query&l=location',
                    timeout: 100,
                    context: {},
                    headers: {},
                    method: 'get',
                    contentType: 'application/json',
                    run: 'run',

                    onerror: jest.fn()
                };
                let catchIt = jest.fn();
                let finaly = jest.fn();
                let result = await ajax(params, 'request').catch(catchIt).finally(finaly);
                expect(result).toEqual(tag);
                expect(params.onerror).toHaveBeenCalledWith({ fail: {} }, params.hitch, tag, tag, 500);
                expect(finaly).toHaveBeenCalledWith({ fail: {} }, params.hitch, tag, tag, 500);
                expect(catchIt).toHaveBeenCalledWith({ fail: {} }, params.hitch, tag, tag, 500);
                expect((window as any)['_cjson20']).toBeUndefined();

                delete (window as any)['_cjson10'];
            });
        });
    })
    describe('__ajaxServerResponse', () => {
        it('should return response', () => {
            expect(__ajaxServerResponse({ readyState: 4, status: 210, responseText: ' {} ' })).toEqual({})
            expect(__ajaxServerResponse({ readyState: 4, status: 400, responseText: ' {} ' })).toEqual({});
        });
        it('should return false', () => {
            expect(__ajaxServerResponse({ readyState: 5, status: 200, responseText: ' {} ' })).toBe(false);
            expect(__ajaxServerResponse({ readyState: 4, status: 200, responseText: '  ' })).toBe(false);
            expect(__ajaxServerResponse({ readyState: 4, status: 200, responseText: ' {"hasErrors":true} ' })).toBe(false);
        });
    })
});
