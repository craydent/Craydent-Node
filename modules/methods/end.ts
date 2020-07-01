import isInt from './isInt';
import isString from './isString';
import echo from './echo';
import logit from './logit';
import merge from './merge';

export default function end(status?: number, output?: string, encoding?: string);
export default function end(output?: string, encoding?: string);
export default function end(status?, output?, encoding?) {
    /*|{
        "info": "Call the next function(s) in queue",
        "category": "HTTP",
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"status?": "(Integer) HTTP status code."},
                {"output?": "(String) output to send as response."},
                {"encoding?": "(String) encoding for the response."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#end",
        "returnType":"(void)"
    }|*/
    if (this.response_sent) { return; }
    if (status && !isInt(status)) {
        encoding = output;
        output = status;
        status = undefined;
    }
    output = output || "";
    let response = this.response;
    if (encoding && !isString(encoding)) { response = encoding; }
    // response already ended
    if (!response) { return; }

    try {
        // Release memory for objects
        let obj;
        while (obj = $c.GarbageCollector.splice(0, 1)[0]) { obj.destruct && obj.destruct(); }
        this.writeSession();

        // @ts-ignore
        let heads = typeof header != "undefined" ? header : { headers: {} };
        // @ts-ignore
        // eco = (typeof echo != "undefined" ? echo : this.echo);

        let headers = merge(heads.headers, this.header.headers) as any,
            code = status || heads.code || this.header.code,
            eco = ((echo as any).out || "") + (this.echo.out || "") + output;

        if (!eco) {
            code = 404;
            let ctype = headers.contentType || headers['ContentType'] || headers['Content-type'] || headers['content-type'] || headers['Content-Type'] || "";

            switch (true) {
                case !!~ctype.indexOf('/plain'):
                    eco = "Resource Not Found";
                    break;
                case !!~ctype.indexOf('/html'):
                    eco = $c.HTTP_STATUS_TEMPLATE[404] || "<html><head></head><body><h1>" + code + ": Resource Not Found</h1><p>The resource you are trying to receive was not found</p></body></html>";
                    break;
                case !!~ctype.indexOf('/json'):
                    eco = JSON.stringify($c.RESPONSES["404"]);
                    break;
            }

        }

        let cb = this.$GET('callback'), pre = "", post = "";
        if (cb) {
            pre = cb + "(";
            post = ")";
        }

        !response.headersSent && response.writeHead(code, headers);
        response.end(isString(output) ? pre + eco + post : output, encoding);
        this.respond_sent = true;
        logit('end*******************************************************');
    } catch (e) {
        response.writeHead(500, this.header.headers);
        response.end($c.DEBUG_MODE ? e.stack : JSON.stringify($c.RESPONSES["500"]));
    } finally {
        logit("response ended");
    }
}