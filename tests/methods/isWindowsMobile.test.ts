import isWindowsMobile from '../../compiled/transformedMinor/craydent.iswindowsmobile';
describe('isWindowsMobile', () => {
    it('should check if machine is WindowsMobile', () => {
        expect(isWindowsMobile.call({ navigator: { userAgent: 'windows ce' } } as any)).toBe(true);
        expect(isWindowsMobile.call({ navigator: { userAgent: 'windows' } } as any)).toBe(false);
        expect(isWindowsMobile.call({ navigator: { userAgent: 'mac' } } as any)).toBe(false);
        expect(isWindowsMobile.call({ navigator: { userAgent: 'linux' } } as any)).toBe(false);
    });
});
