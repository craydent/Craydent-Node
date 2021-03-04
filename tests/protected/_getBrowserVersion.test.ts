import _getBrowserVersion from '../../modules/protected/_getBrowserVersion';
import isChrome from '../../compiled/transformedMinor/craydent.ischrome';
import isFirefox from '../../compiled/transformedMinor/craydent.isfirefox';
import isSafari from '../../compiled/transformedMinor/craydent.issafari';
import isOpera from '../../compiled/transformedMinor/craydent.isopera';

describe('_getBrowserVersion', () => {
    const win = {
        isChrome,
        isFirefox,
        isSafari,
        isOpera,
        navigator: {
            userAgent: ''
        }
    };
    beforeEach(() => {
        win.navigator.userAgent = '';
    });
    it('should provide correct version on Mac Chrome', () => {
        win.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36';
        expect(_getBrowserVersion(win as any, "Chrome")).toBe(83);
        expect(_getBrowserVersion(win as any, "Firefox")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Safari")).toBe(537.36);
        expect(_getBrowserVersion(win as any, "Opera")).toBe(-1);
    });
    it('should provide correct version on Mac Safari', () => {
        win.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Safari/605.1.15';

        expect(_getBrowserVersion(win as any, "Chrome")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Firefox")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Safari")).toBe(605.1);
        expect(_getBrowserVersion(win as any, "Opera")).toBe(-1);
    });
    it('should provide correct version on Mac Firefox', () => {
        win.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:71.0) Gecko/20100101 Firefox/71.0';

        expect(_getBrowserVersion(win as any, "Chrome")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Firefox")).toBe(71);
        expect(_getBrowserVersion(win as any, "Safari")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Opera")).toBe(-1);
    });
    it('should provide correct version on Mac Opera', () => {
        win.navigator.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 OPR/69.0.3686.49';

        expect(_getBrowserVersion(win as any, "Chrome")).toBe(83);
        expect(_getBrowserVersion(win as any, "Firefox")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Safari")).toBe(537.36);
        expect(_getBrowserVersion(win as any, "Opera")).toBe(69);
    });


    it('should provide correct version on Windows Chrome', () => {
        win.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';

        expect(_getBrowserVersion(win as any, "Chrome")).toBe(83);
        expect(_getBrowserVersion(win as any, "Firefox")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Safari")).toBe(537.36);
        expect(_getBrowserVersion(win as any, "Opera")).toBe(-1);
    });
    it('should provide correct version on Windows Firefox', () => {
        win.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:78.0) Gecko/20100101 Firefox/78.0';

        expect(_getBrowserVersion(win as any, "Chrome")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Firefox")).toBe(78);
        expect(_getBrowserVersion(win as any, "Safari")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Opera")).toBe(-1);
    });
    it('should provide correct version on Windows Opera', () => {
        win.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 OPR/69.0.3686.56';

        expect(_getBrowserVersion(win as any, "Chrome")).toBe(83);
        expect(_getBrowserVersion(win as any, "Firefox")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Safari")).toBe(537.36);
        expect(_getBrowserVersion(win as any, "Opera")).toBe(69);
    });
    it('should provide correct version on Windows Safari', () => {
        win.navigator.userAgent = 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2';

        expect(_getBrowserVersion(win as any, "Chrome")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Firefox")).toBe(-1);
        expect(_getBrowserVersion(win as any, "Safari")).toBe(534.57);
        expect(_getBrowserVersion(win as any, "Opera")).toBe(-1);
    });



});