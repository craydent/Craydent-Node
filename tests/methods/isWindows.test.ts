import isWindows from '../../compiled/transformedMinor/craydent.iswindows';
describe('isWindows', () => {
    it('should check if machine is Windows', () => {
        expect(isWindows.call({ navigator: { platform: 'win' } } as any)).toBe(true);
        expect(isWindows.call({ navigator: { platform: 'mac' } } as any)).toBe(false);
        expect(isWindows.call({ navigator: { platform: 'linux' } } as any)).toBe(false);
    });
});
