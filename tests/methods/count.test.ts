import count from '../../compiled/transformedMinor/craydent.count';
describe('count', () => {
    it('should props in an object', () => {
        expect(count({ key: 'value' })).toBe(1);
    });
    it('should items in an array', () => {
        expect(count([])).toBe(0);
    });
    it('should items in an array with options for where claus', () => {
        expect(count([{ key: 'value' }, { key: 'nomatch' }], { key: 'value' })).toBe(1);
    });
    it('should items in an array with options as string', () => {
        expect(count(['abc', 'ab'], 'abc')).toBe(1);
    });
    it('should items in an array with options as regex', () => {
        expect(count(['abc', 'ab'], /ab/)).toBe(2);
    });
    it('should get the count of string using regex', () => {
        expect(count('abcdab', 'ab')).toBe(2);
    });
    it('should get the count of string', () => {
        expect(count('abcdab', /ab/)).toBe(2);
    });
    it('should get the count of string', () => {
        expect(count('abcdab', /jjj/)).toBe(0);
    });
    it('should return NaN when given an inavlid', () => {
        expect(count(6 as any, /ab/)).toBe(NaN);
    });
});
