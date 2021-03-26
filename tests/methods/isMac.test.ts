import isMac from '../../compiled/transformedMinor/craydent.ismac';
describe('isMac', () => {
    it('should check if machine is Mac', () => {
        expect(isMac.call({ navigator: { platform: 'mac' } } as any)).toBe(true);
        expect(isMac.call({ navigator: { userAgent: 'linux' } } as any)).toBe(false);
    });
});
