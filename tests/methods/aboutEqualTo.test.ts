import aboutEqualTo from '../../compiled/transformedMinor/craydent.aboutequalto';

describe('aboutEqualTo', () => {
    it('should be false when out of range', () => {
        expect(aboutEqualTo(10.2, 10, 0.1)).toBe(false);
        expect(aboutEqualTo(9.8, 10, 0.1)).toBe(false);
    })
    it('should be true when in range', () => {
        expect(aboutEqualTo(10.2, 10, 0.2)).toBe(true);
        expect(aboutEqualTo(9.8, 10, 0.2)).toBe(true);
    })
});
