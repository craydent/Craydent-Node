import error from './error';
import isAndroid from './isAndroid';
import isBlackBerry from './isBlackBerry';
import isIPad from './isIPad';
import isIPhone from './isIPhone';
import isIPod from './isIPod';
import isPalmOS from './isPalmOS';
import isSymbian from './isSymbian';
import isWindowsMobile from './isWindowsMobile';

export default function isMobile(this: Craydent | Window) {
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
    } catch (e) {
        error && error('isMobile', e);
    }
}