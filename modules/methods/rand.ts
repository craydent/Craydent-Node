import error from './error';

export default function rand(num1: number, num2: number, inclusive?: boolean): number {
    /*|{
        "info": "Create a random number between two numbers",
        "category": "Utility",
        "parameters":[
            {"num1": "(Number) Lower bound"},
            {"num2": "(Number) Upper bound"},
            {"inclusive?": "(Bool) Flag to include the given numbers"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#rand",
        "returnType": "(Number)"
    }|*/
    try {
        let val = (num2 - num1) * Math.random() + num1;
        if (inclusive) {
            if (val == Math.max(num1, num2)) {
                val -= 0.1
            } else if (val == Math.min(num1, num2)) {
                val += 0.1
            }
        }
        return val;
    } catch (e) {
        error && error('rand', e);
        return NaN;
    }
}