import error from '../methods/error';
import isNull from '../methods/isnull';

export default function randIndex(str: string): number;
export default function randIndex(arr: any[]): number;
export default function randIndex(subject: any): number {
    /*|{
        "info": "Return a random index without the bounds",
        "category": "Utility",
        "parameters":[
            {"subject?": "(Array|String) String or Array to get valid random index"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#randIndex",
        "returnType": "(Number)"
    }|*/
    try {
        const rn = Math.random();
        if (isNull(subject) || !subject.length as any) {
            return -1;
        }
        const lastIndex = subject.length - 1;

        let val = Math.round(lastIndex * rn);

        return val;
    } catch (e) /* istanbul ignore next */ {
        error && error('randIndex', e);
        return NaN;
    }
}