import isValidEmail from '../../compiled/transformedMinor/craydent.isvalidemail';
describe('isValidEmail', () => {
    it('should check if the value is a valid email', () => {
        expect(isValidEmail('clark@craydent.com')).toBe(true);
        expect(isValidEmail('clark.inada@craydent.com')).toBe(true);
        expect(isValidEmail('clark_inada@craydent.com')).toBe(true);
        expect(isValidEmail('clark-inada@craydent.com')).toBe(true);
        expect(isValidEmail(null as any)).toBe(false);
        expect(isValidEmail('')).toBe(false);
        expect(isValidEmail('clark-inada@craydent')).toBe(false);
        expect(isValidEmail('clark-inada@craydent.')).toBe(false);
        expect(isValidEmail('clark-inada@craydent.c')).toBe(false);
    })
});
