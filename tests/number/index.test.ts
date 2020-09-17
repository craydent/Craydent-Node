import $c from '../../transformed/number/noConflict';

describe('No Conflict Number', function () {
    it('aboutEqualTo', function () {
        expect($c.aboutEqualTo(10, 9, 1)).toBe(true);
        expect($c.aboutEqualTo(10, 9, 1.1)).toBe(true);
        expect($c.aboutEqualTo(10, 9, 0.9)).toBe(false);
        expect($c.aboutEqualTo(8, 9, 1)).toBe(true);
        expect($c.aboutEqualTo(8, 9, 1.1)).toBe(true);
        expect($c.aboutEqualTo(8, 9, 0.9)).toBe(false);
        expect($c.aboutEqualTo(7, 9, 1.1)).toBe(false);
    });
    it('isOdd', function () {
        expect($c.isOdd(10)).toBe(false);
        expect($c.isOdd(9)).toBe(true);
    });
    it('isEven', function () {
        expect($c.isEven(10)).toBe(true);
        expect($c.isEven(9)).toBe(false);
    });

    it('toCurrencyNotation', function () {
        expect($c.toCurrencyNotation(1000)).toBe("1,000");
        expect($c.toCurrencyNotation(1000000)).toBe("1,000,000");
        expect($c.toCurrencyNotation(1000, '.')).toBe('1.000');
    });

});
