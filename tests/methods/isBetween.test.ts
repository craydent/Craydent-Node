import isBetween from '../../modules/methods/isBetween';
describe('isBetween', () => {
    it('should value is Between', () => {
        expect(isBetween(null, '', '')).toBe(false);
        expect(isBetween('e', 'a', 'c')).toBe(false);
        expect(isBetween('b', 'a', 'c')).toBe(true);
        expect(isBetween('b', 'b', 'c')).toBe(false);
        expect(isBetween('b', 'b', 'c', true)).toBe(true);

        expect(isBetween(5, 1, 3)).toBe(false);
        expect(isBetween(2, 1, 3)).toBe(true);
        expect(isBetween(2, 2, 3)).toBe(false);
        expect(isBetween(2, 2, 3, true)).toBe(true);
    })
});
