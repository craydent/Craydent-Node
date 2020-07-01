import error from '../methods/error';

export default function _getBrowserVersion(win: Window | Craydent, browser: string) {
    try {
        let index = win.navigator.userAgent.indexOf(browser);
        if (!~index && win[`is${browser}`]()) return -1;
        let version = parseFloat(win.navigator.userAgent.substring(index + browser.length + 1));
        return version === 0 || version ? version : -1;
    } catch (e) {
        error && error('_getBrowserVersion', e);
    }
}