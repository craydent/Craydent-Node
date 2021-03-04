import error from '../methods/error';
import isAndroid from '../methods/isandroid';
import isBlackBerry from '../methods/isblackberry';
import isIPad from '../methods/isipad';
import isIPhone from '../methods/isiphone';
import isIPod from '../methods/isipod';
import isPalmOS from '../methods/ispalmos';
import isSymbian from '../methods/issymbian';
import isWindowsMobile from '../methods/iswindowsmobile';

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