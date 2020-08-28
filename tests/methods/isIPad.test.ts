import isIPad from '../../modules/methods/isIPad';
describe('isIPad', () => {
    it('should check if device is an iPad', () => {
        expect(isIPad.call({ navigator: { userAgent: 'iPad' } })).toBe(true);
        expect(isIPad.call({ navigator: { userAgent: 'iPhone OS 3_1_2' } })).toBe(true);
        expect(isIPad.call({ navigator: { userAgent: 'IOS' } })).toBe(false);
    });
});
