import error from '../methods/error';
import _getFuncName from '../protected/_getFuncName';
import namespace from '../methods/namespace';
import foo from '../methods/foo';

export default function extend(func: VoidFunction, extendee: VoidFunction, inheritAsOwn?: boolean): Function {
    /*|{
        "info": "Function class extension to extend another class",
        "category": "Function",
        "parameters":[
            {"extendee":"(Class) Class to extend"}],

        "overloads":[
            {"parameters":[
                {"extendee":"(Class) Class to extend"},
                {"inheritAsOwn":"(Boolean) Flag to inherit and for values hasOwnProperty to be true."}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.extend",
        "returnType": "(Function)"
    }|*/
    try {
        let className = _getFuncName(func),
            cls: any = new (extendee as any)();
        (namespace as any)[className] = namespace && (namespace as any)[className];
        for (let prop in cls) {
            if (inheritAsOwn && !cls.hasOwnProperty(prop)) { continue; }
            func.prototype[prop] = /* func[prop] || */ func.prototype[prop] || cls[prop];
        }
        if (!inheritAsOwn) {
            for (let prop in extendee) {
                /* istanbul ignore if */
                if (!extendee.hasOwnProperty(prop)) {
                    continue;
                }
                (func as any)[prop] = (func as any)[prop] || (extendee as any)[prop];
            }
        }
        func.prototype.construct = func.prototype.construct || (cls as any).construct || foo;

        return func;
    } catch (e) /* istanbul ignore next */ {
        error && error("Function.extend", e);
        return null as any;
    }
}