import error from "./error";

export default function echo(output: string) {
    /*|{
        "info": "Echo to buffer and use in response",
        "category": "HTTP",
        "parameters":[
            {"output": "(String) Data to send in response"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#echo",
        "returnType":"(void)"
    }|*/
    try {
        (echo as any).out = (echo as any).out || "";
        (echo as any).out += output;
    }
    catch (e) /* istanbul ignore next */ {
        error && error('echo', e);
    }
}