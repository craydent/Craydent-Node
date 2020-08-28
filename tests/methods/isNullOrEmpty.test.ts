import isNullOrEmpty from '../../modules/methods/isNullOrEmpty';
describe('isNullOrEmpty', () => {
    it('should check if value is null or empty', () => {
        expect(isNullOrEmpty({})).toBe(true);
        expect(isNullOrEmpty(undefined)).toBe(true);
        expect(isNullOrEmpty("adsf")).toBe(false);
    })
});
