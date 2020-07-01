import error from './error';
import syncroit from './syncroit';

export default function toPromise(gen: Generator): Promise<any> {
    /*|{
        "info": "Function listener to register events",
        "category": "Function",
        "parameters":[
            {"gen":"(Generator) Generator function to convert"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#generator.toPromise",
        "returnType": "(Promise<any>)"
    }|*/
    try {
        return syncroit(gen);
    } catch (e) {
        error && error("Generator.toPromise", e);
    }
}