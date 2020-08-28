import isWindows from '../../modules/methods/isWindows';
describe('isWindows', () => {
    it('should check if machine is Windows', () => {
        expect(isWindows.call({ navigator: { platform: 'win' } })).toBe(true);
        expect(isWindows.call({ navigator: { platform: 'mac' } })).toBe(false);
        expect(isWindows.call({ navigator: { platform: 'linux' } })).toBe(false);
    });
});
