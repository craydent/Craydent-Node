import isIPod from '../../modules/methods/isIPod';
describe('iPod', () => {
    it('should check if device is an iPod', () => {
        expect(isIPod.call({ navigator: { userAgent: 'ipod' } })).toBe(true);
        expect(isIPod.call({ navigator: { userAgent: 'IOS' } })).toBe(false);
    });
});
