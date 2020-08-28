import isLinux from '../../modules/methods/isLinux';
describe('isLinux', () => {
    it('should check if machine is Linux', () => {
        expect(isLinux.call({ navigator: { platform: 'linux' } })).toBe(true);
        expect(isLinux.call({ navigator: { userAgent: 'osx' } })).toBe(false);
    });
});
