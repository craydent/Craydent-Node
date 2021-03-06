import isSafari from '../../compiled/transformedMinor/craydent.issafari';
describe('isSafari', () => {
    it('should check if browser is isSafari', () => {
        expect(isSafari.call({ navigator: { userAgent: 'chrome safari' } })).toBe(true);
        expect(isSafari.call({ navigator: { userAgent: 'apple firefox' } })).toBe(false);
    });
});
