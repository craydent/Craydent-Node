import error from '../methods/error';
import isWebkit from '../methods/iswebkit';
import isKHTML from '../methods/iskhtml';

export default function isGecko(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if engine is Gecko",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isGecko",
        "returnType": "(Bool)"
    }|*/
    try {
        return !isWebkit.call(this) && !isKHTML.call(this) && (/gecko/i.test(this.navigator.userAgent));
    } catch (e) /* istanbul ignore next */ {
        error && error('isGecko', e);
        return null as any;
    }
}