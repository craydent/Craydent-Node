import parseBoolean from '../../modules/methods/parseBoolean';
describe('parseBoolean', () => {
    it('should parse boolean', () => {
        expect(parseBoolean('true')).toBe(true);
        expect(parseBoolean('false')).toBe(false);
        expect(parseBoolean('1')).toBe(true);
        expect(parseBoolean('0')).toBe(false);
        expect(parseBoolean(1)).toBe(true);
        expect(parseBoolean(0)).toBe(false);
        expect(parseBoolean(true)).toBe(true);
        expect(parseBoolean(false)).toBe(false);
        expect(parseBoolean('adfa')).toBe(undefined);
        expect(parseBoolean(10)).toBe(undefined);
    })
    it('should parse boolean using strict', () => {
        expect(parseBoolean('true', true)).toBe(true);
        expect(parseBoolean('false', true)).toBe(false);
        expect(parseBoolean('1', true)).toBe(undefined);
        expect(parseBoolean('0', true)).toBe(undefined);
        expect(parseBoolean(1, true)).toBe(undefined);
        expect(parseBoolean(0, true)).toBe(undefined);
        expect(parseBoolean(true, true)).toBe(true);
        expect(parseBoolean(false, true)).toBe(false);
    })
});
