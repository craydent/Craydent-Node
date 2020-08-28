import isMac from '../../modules/methods/isMac';
describe('isMac', () => {
    it('should check if machine is Mac', () => {
        expect(isMac.call({ navigator: { platform: 'mac' } })).toBe(true);
        expect(isMac.call({ navigator: { userAgent: 'linux' } })).toBe(false);
    });
});
