import isLinux from '../../compiled/transformedMinor/craydent.islinux';
describe('isLinux', () => {
    it('should check if machine is Linux', () => {
        expect(isLinux.call({ navigator: { platform: 'linux' } } as any)).toBe(true);
        expect(isLinux.call({ navigator: { userAgent: 'osx' } } as any)).toBe(false);
    });
});
