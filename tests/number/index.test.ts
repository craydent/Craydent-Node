import $c from '../../compiled/transformedMajor/number/index';
$c;
describe('No Conflict Number', function () {
    const ten = 10, nine = 9, eight = 8, seven = 7;
    it('aboutEqualTo', function () {
        expect(ten.aboutEqualTo(9, 1)).toBe(true);
        expect(ten.aboutEqualTo(9, 1.1)).toBe(true);
        expect(ten.aboutEqualTo(9, 0.9)).toBe(false);
        expect(eight.aboutEqualTo(9, 1)).toBe(true);
        expect(eight.aboutEqualTo(9, 1.1)).toBe(true);
        expect(eight.aboutEqualTo(9, 0.9)).toBe(false);
        expect(seven.aboutEqualTo(9, 1.1)).toBe(false);
    });
    it('isOdd', function () {
        expect(ten.isOdd()).toBe(false);
        expect(nine.isOdd()).toBe(true);
    });
    it('isEven', function () {
        expect(ten.isEven()).toBe(true);
        expect(nine.isEven()).toBe(false);
    });

    it('toCurrencyNotation', function () {
        expect((1000).toCurrencyNotation()).toBe("1,000");
        expect((1000000).toCurrencyNotation()).toBe("1,000,000");
        expect((1000).toCurrencyNotation('.')).toBe('1.000');
    });

});
