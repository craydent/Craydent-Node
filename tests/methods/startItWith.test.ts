import startItWith from '../../compiled/transformedMinor/craydent.startitwith';
describe('startItWith', () => {
    it('should add prefix if not present', () => {
        expect(startItWith('path', '/')).toBe('/path');
    })
    it('should not add prefix if present', () => {
        expect(startItWith('/path', '/')).toBe('/path');
    })
});
