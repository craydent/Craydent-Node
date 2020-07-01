import error from './error';
import _getFuncName from '../protected/_getFuncName';
import namespace from './namespace';
import foo from './foo';

export default function extend(func: Function, extendee: FunctionConstructor, inheritAsOwn?: boolean): Function {
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
            cls = new extendee();
        namespace[className] = namespace && namespace[className];
        for (let prop in cls) {
            if (inheritAsOwn && !cls.hasOwnProperty(prop)) { continue; }
            func.prototype[prop] = /* func[prop] || */ func.prototype[prop] || cls[prop];
        }
        if (!inheritAsOwn) {
            for (let prop in extendee) {
                if (!extendee.hasOwnProperty(prop)) {
                    continue;
                }
                func[prop] = func[prop] || extendee[prop];
            }
        }
        func.prototype.construct = func.prototype.construct || (cls as any).construct || foo;

        return func;
    } catch (e) {
        error && error("Function.extend", e);
    }
}