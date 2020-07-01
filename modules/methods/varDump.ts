import error from "./error";
import echo from "./echo";

export default function var_dump(...args) {
    /*|{
        "info": "Dump of variables to response.",
        "category": "HTTP",
        "parameters":[
            {"...infinite": "(any) any number of arguments can be passed."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#var_dump",
        "returnType": "(void)"
    }|*/
    try {
        let type = "", value;
        for (let i = 0, len = arguments.length; i < len; i++) {
            value = type = arguments[i];
            if (type !== undefined || type !== null) {
                type = value.constructor.toString().replace(/function (.*)?\(.*/, '$1');
                switch (type) {
                    case "String":
                    case "Array":
                        type += " (" + value.length + ") " + JSON.stringify(value);
                        break;
                    case "Date":
                    case "Number":
                    case "Boolean":
                        type += " (" + JSON.stringify(value) + ") ";
                        break;
                    default:
                        type += JSON.stringify(value);
                }
            }
            (echo as any).out += type + " ";
        }
    } catch (e) {
        error && error('varDump', e);
    }
}