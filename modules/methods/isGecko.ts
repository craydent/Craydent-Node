import error from './error';
import isWebkit from './isWebkit';
import isKHTML from './isKHTML';

export default function isGecko(this: Craydent | Window) {
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
    } catch (e) {
        error && error('isGecko', e);
    }
}