import isIPod from '../../compiled/transformedMinor/craydent.isipod';
describe('iPod', () => {
    it('should check if device is an iPod', () => {
        expect(isIPod.call({ navigator: { userAgent: 'ipod' } })).toBe(true);
        expect(isIPod.call({ navigator: { userAgent: 'IOS' } })).toBe(false);
    });
});
