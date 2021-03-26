import isNull from '../methods/isnull';
import error from '../methods/error';

export default function isAsync(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a async function",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isAsnyc",
        "returnType": "(Bool)"
    }|*/
    try {
        if (isNull(obj)) { return false; }
        const __awaiterSyntax = '__awaiter(this, void 0, void 0';
        const __awaiterSyntax2 = '__awaiter(_this, void 0, void 0';
        const __awaiterSyntax3 = '__awaiter(void 0, void 0, void 0';
        const fConstruct = obj.prototype ? obj.prototype.constructor : obj.constructor
        const fString = obj.toString();
        const fConstructString = fConstruct.toString();

        if (~fString.indexOf(__awaiterSyntax)
            || ~fConstructString.indexOf(__awaiterSyntax)
            || ~fString.indexOf(__awaiterSyntax2)
            || ~fConstructString.indexOf(__awaiterSyntax2)
            || ~fString.indexOf(__awaiterSyntax3)
            || ~fConstructString.indexOf(__awaiterSyntax3)) {
            return true;
        }
        return fConstruct.name == 'async' || fConstruct.name == 'AsyncFunction';
    } catch (e) /* istanbul ignore next */ {
        error && error('isAsync', e);
        return null as any;
    }
}