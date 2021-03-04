import toCurrencyNotation from '../../compiled/transformedMinor/craydent.tocurrencynotation';
describe('toCurrencyNotation', () => {
    it('should convert string to currency notation', () => {
        expect(toCurrencyNotation('1000000')).toBe('1,000,000');
        expect(toCurrencyNotation('1000000.00')).toBe('1,000,000.00');
        expect(toCurrencyNotation('1000000', '.')).toBe('1.000.000');
        expect(toCurrencyNotation('1000000,00', '.')).toBe('1.000.000,00');
    });
    it('should convert number to currency notation', () => {
        expect(toCurrencyNotation(1000000)).toBe('1,000,000');
        expect(toCurrencyNotation(1000000.01)).toBe('1,000,000.01');
        expect(toCurrencyNotation(1000000.0)).toBe('1,000,000');
        expect(toCurrencyNotation(1000000, '.')).toBe('1.000.000');
    });
});
