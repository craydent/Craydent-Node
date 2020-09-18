import error from '../methods/error';
import isAndroid from '../methods/isAndroid';
import isBlackBerry from '../methods/isBlackBerry';
import isIPad from '../methods/isIPad';
import isIPhone from '../methods/isIPhone';
import isIPod from '../methods/isIPod';
import isPalmOS from '../methods/isPalmOS';
import isSymbian from '../methods/isSymbian';
import isWindowsMobile from '../methods/isWindowsMobile';

export default function isMobile(this: Craydent | Window): boolean {
    /*|{
        "info": "Check if the device is a Mobile device",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isMobile",
        "returnType": "(Bool)"
    }|*/
    try {
        return isAndroid.call(this) || isBlackBerry.call(this) || isIPad.call(this) || isIPhone.call(this) || isIPod.call(this) || isPalmOS.call(this) || isSymbian.call(this) || isWindowsMobile.call(this);
    } catch (e) /* istanbul ignore next */ {
        error && error('isMobile', e);
    }
}