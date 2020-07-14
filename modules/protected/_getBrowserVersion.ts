///<reference path="../globalTypes/global.base.ts" />
import error from '../methods/error';

export default function _getBrowserVersion(win: Window | Craydent, browser: string) {
    try {
        let index = (win as Window).navigator.userAgent.indexOf(browser);
        if (!~index && win[`is${browser}`]()) {
            /* istanbul ignore else */
            if (browser.toLowerCase() == "opera") { return _getBrowserVersion(win, "OPR"); }
            /* istanbul ignore next */
            return -1;
        }
        const startIndex = index + browser.length + 1;
        let endIndex = (win as Window).navigator.userAgent.indexOf(' ', index);
        if (!~endIndex) { endIndex = undefined }
        let version = parseFloat((win as Window).navigator.userAgent.substring(startIndex, endIndex));
        return version === 0 || version ? version : -1;
    } catch (e) {
        /* istanbul ignore next */
        error && error('_getBrowserVersion', e);
    }
}