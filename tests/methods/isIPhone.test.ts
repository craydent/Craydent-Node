import isIPhone from '../../modules/methods/isIPhone';
describe('isIPhone', () => {
    it('should check if device is an iPhone', () => {
        expect(isIPhone.call({ navigator: { userAgent: 'iphone' } })).toBe(true);
        expect(isIPhone.call({ navigator: { userAgent: 'IOS' } })).toBe(false);
    });
});
