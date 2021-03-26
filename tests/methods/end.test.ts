import end from '../../compiled/transformedMinor/craydent.end';
import echo from '../../compiled/transformedMinor/craydent.echo';
import { $c } from '../../compiled/transformedMinor/craydent.end/private/__common';
import logit from '../../compiled/transformedMinor/craydent.logit';
jest.mock('../../compiled/transformedMinor/craydent.logit', () => {
    return {
        "default": (...args: any[]) => _logit.apply(this, args as any)
    }
});
let _logit = () => { }
describe('end', () => {
    beforeEach(() => {
        _logit = () => { }
        (echo as any).out = "";
        $c.GarbageCollector = [];
        delete $c.RESPONSES;
    });
    afterAll(() => {
        (echo as any).out = "";
        $c.GarbageCollector = [];
        delete $c.RESPONSES;
    })
    it('should end the request', () => {
        $c.GarbageCollector = [{ destruct: jest.fn() }];
        _logit = jest.fn();
        echo("hello ");
        const httpMock = {
            response_sent: false,
            response: { headersSent: false, writeHead: jest.fn(), end: jest.fn() },
            writeSession: jest.fn(),
            header: { headers: { 'content-type': 'json' }, code: 200 },
            echo: { out: "world" },
            $GET: () => "cb"
        };
        end.apply(httpMock, []);
        expect($c.GarbageCollector).toEqual([]);
        expect(httpMock.writeSession).toHaveBeenCalled();
        expect(httpMock.response_sent).toBe(true);
        expect(httpMock.response.writeHead).toHaveBeenCalledWith(200, { 'content-type': 'json' });
        expect(httpMock.response.end).toHaveBeenCalledWith("cb(hello world)");
        expect(_logit).toHaveBeenCalledTimes(2);
    });
    it('should end the request when encoding is the response object', () => {
        const response = { headersSent: false, writeHead: jest.fn(), end: jest.fn() }
        const httpMock = {
            response_sent: false,
            response: null,
            writeSession: jest.fn(),
            header: { headers: { 'content-type': 'json' }, code: 200 },
            echo: { out: "world" },
            $GET: () => "cb"
        };
        end.apply(httpMock, [{}, response] as any);
        expect(response.end).toHaveBeenCalledWith({});
    });
    it('should end the request when given as status', () => {
        const response = { headersSent: false, writeHead: jest.fn(), end: jest.fn() }
        const httpMock = {
            response_sent: false,
            response: null,
            writeSession: jest.fn(),
            header: { headers: { 'content-type': 'json' }, code: 200 },
            echo: { out: "world" },
            $GET: () => "cb"
        };
        end.apply(httpMock, [200] as any);
        expect(response.end).not.toHaveBeenCalled();
    });
    it('should end the request when not given status', () => {
        $c.GarbageCollector = [{ destruct: jest.fn() }];
        _logit = jest.fn();
        echo("hello ");
        const httpMock = {
            response_sent: false,
            response: { headersSent: false, writeHead: jest.fn(), end: jest.fn() },
            writeSession: jest.fn(),
            header: { headers: { 'content-type': 'json' }, code: 200 },
            echo: { out: "world" },
            $GET: () => "cb"
        };
        end.apply(httpMock, [{}, "encoding"] as any);
        expect(httpMock.response.end).toHaveBeenCalledWith({}, "encoding");
        expect(_logit).toHaveBeenCalledTimes(2);
    });
    it('should end the with 500 when an error occurs', () => {
        $c.RESPONSES = { 500: {} };
        _logit = jest.fn();
        echo("hello ");
        const httpMock = {
            response_sent: false,
            response: { headersSent: false, writeHead: jest.fn(), end: jest.fn() },
            writeSession: jest.fn(),
            header: { headers: { 'content-type': 'json' }, code: 200 },
            echo: { out: "world" },
            $GET: () => { throw ''; }
        };
        end.apply(httpMock, [{}, "encoding"] as any);
        expect(httpMock.response.writeHead).toHaveBeenCalledWith(500, { 'content-type': 'json' });
        expect(httpMock.response.end).toHaveBeenCalledWith("{}");
        expect(_logit).toHaveBeenCalledTimes(1);
    });
    it.each`
        prop                | contentType | output
        ${'Content-type'}   | ${'/plain'} | ${'Resource Not Found'}
        ${'content-type'}   | ${'/html'}  | ${'template'}
        ${'Content-Type'}   | ${'/json'}  | ${JSON.stringify({ status: 404 })}
        ${'ContentTypes'}   | ${'/nobe'}  | ${""}
    `
        ('should end when no output is provided and content type is $output', ({ prop, contentType, output }) => {
            $c.RESPONSES = { 404: { status: 404 } };
            $c.HTTP_STATUS_TEMPLATE = { 404: output };
            _logit = jest.fn();
            const httpMock:any = {
                response_sent: false,
                response: { headersSent: false, writeHead: jest.fn(), end: jest.fn() },
                writeSession: jest.fn(),
                header: { headers: {}, code: 200 },
                echo: { out: "" },
                $GET: () => ""
            };
            httpMock.header.headers[prop] = contentType
            end.apply(httpMock, [200, "", "encoding"] as any);
            expect(httpMock.response.end).toHaveBeenCalledWith(output, "encoding");
        });
    it('should short circuit if response has already been sent', () => {
        const httpMock = {
            response_sent: true,
            response: {},
            writeSession: jest.fn(),
            header: { headers: {}, code: 200 },
            echo: { out: "" },
            $GET: () => ""
        };
        end.apply(httpMock, []);
        expect(httpMock.writeSession).not.toHaveBeenCalled();
    });

    it('should short circuit if response is not set', () => {
        const httpMock = {
            response_sent: true,
            response: null,
            writeSession: jest.fn(),
            header: { headers: {}, code: 200 },
            echo: { out: "" },
            $GET: () => ""
        };
        end.apply(httpMock, []);
        expect(httpMock.writeSession).not.toHaveBeenCalled();
    });
});