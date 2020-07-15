import _even from '../../modules/protected/_even';

describe('_even', () => {
    it('should be true when number is even', () => {
        expect(_even(2)).toBe(true);
    });
    it('should be false when number is odd or decimal', () => {
        expect(_even(1)).toBe(false);
        expect(_even(0.2)).toBe(false);
    });
    it('should be false when number is NaN', () => {
        expect(_even(NaN)).toBe(false);
    });
});