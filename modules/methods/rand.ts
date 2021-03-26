import error from '../methods/error';

export default function rand(): number;
export default function rand(lower: number, upper: number, inclusive?: boolean): number;
export default function rand(num1?: number, num2?: number, inclusive?: boolean): number {
    /*|{
        "info": "Create a random number between two numbers",
        "category": "Utility",
        "parameters":[
            {"num?1": "(Number) Lower bound"},
            {"num2?": "(Number) Upper bound"},
            {"inclusive?": "(Bool) Flag to include the given numbers"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#rand",
        "returnType": "(Number)"
    }|*/
    try {
        const rn = Math.random()
        if (num1 == null || num2 == null || num1 == undefined || num2 == undefined) {
            return rn;
        }
        let val = (num2 - num1) * rn + num1;
        const flip = (Math.random() * 10000000000000000) & 1;
        if (inclusive && flip) {
            if (val == Math.max(num1, num2) - 0.0000000000000001) {
                val -= 0.0000000000000001;
            }
            return val;
        }
        if (!inclusive && val == Math.min(num1, num2)) {
            val += 0.1
        }
        return val;
    } catch (e) /* istanbul ignore next */ {
        error && error('rand', e);
        return NaN;
    }
}