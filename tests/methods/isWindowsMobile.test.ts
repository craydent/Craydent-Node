import isWindowsMobile from '../../compiled/transformedMinor/craydent.iswindowsmobile';
describe('isWindowsMobile', () => {
    it('should check if machine is WindowsMobile', () => {
        expect(isWindowsMobile.call({ navigator: { userAgent: 'windows ce' } })).toBe(true);
        expect(isWindowsMobile.call({ navigator: { userAgent: 'windows' } })).toBe(false);
        expect(isWindowsMobile.call({ navigator: { userAgent: 'mac' } })).toBe(false);
        expect(isWindowsMobile.call({ navigator: { userAgent: 'linux' } })).toBe(false);
    });
});
