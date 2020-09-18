import isNull from '../methods/isNull';

export default function send(status: number, data: any): void;
export default function send(data: any): void;
export default function send(status, data?): void {
    /*|{
        "info": "Recursively require the entire directory and returns an object containing the required modules.",
        "category": "HTTP",
        "parameters":[
            {"data": "(Object) Object to send in response."}],

        "overloads":[
            {"parameters":[
                {"status": "(Integer) Status code for response."},
                {"data": "(Object) Object to send in response."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#send",
        "returnType": "(void)"
    }|*/
    if (!data && typeof status == "object") {
        data = status;
        status = undefined;
    }
    if (typeof data == "object") { this.header({ 'Content-Type': 'application/json' }); }
    let args = [status || 200];
    data = JSON.stringify(data);
    !isNull(data) && args.push(data);
    this.end.apply(this, args);
}