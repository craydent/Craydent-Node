import lastIndexOfAlt from '../../compiled/transformedMinor/craydent.lastindexofalt';
describe('lastIndexOfAlt', () => {
    const arr = ['ac', 'ab', 'ab', 'ac'];
    const str = 'acababac';
    '01234567'
    it('should return -1 when not found or invalid', () => {
        expect(lastIndexOfAlt(arr, null)).toBe(-1);
        expect(lastIndexOfAlt(arr, null, () => null)).toBe(-1);
        expect(lastIndexOfAlt(str, null)).toBe(-1);
        expect(lastIndexOfAlt(str, 'z')).toBe(-1);
        expect(lastIndexOfAlt(str, 'c', -1)).toBe(-1);
        expect(lastIndexOfAlt(str, 'c', 0)).toBe(-1);
        expect(lastIndexOfAlt(str, /z/)).toBe(-1);
        expect(lastIndexOfAlt(null, null)).toBe(-1);
        expect(lastIndexOfAlt(1 as any, null)).toBe(-1);

    });
    it('should retrieve index of an array', () => {
        expect(lastIndexOfAlt(arr, /^ab/)).toBe(2);
        expect(lastIndexOfAlt(arr, /^ab/, 2)).toBe(2);
        expect(lastIndexOfAlt(arr, 'ac', (item, value, arr) => item == value)).toBe(3);
        expect(lastIndexOfAlt(arr, 'ac', (item, value, arr) => item == value, 0)).toBe(0);
        expect(lastIndexOfAlt(arr, 'ac', (item, value, arr) => item == value, -1)).toBe(0);
        expect(lastIndexOfAlt(arr, 'ac', (item, value, arr) => item == value, 2)).toBe(0);

    });
    it('should retrieve index of an string', () => {
        expect(lastIndexOfAlt(str, /ab/g)).toBe(4);
        expect(lastIndexOfAlt(str, /ab/im, 3)).toBe(2);
        expect(lastIndexOfAlt(str, 'a', -5)).toBe(0);
        expect(lastIndexOfAlt(str, 'c')).toBe(7);
        expect(lastIndexOfAlt(str, 'c', 2)).toBe(1);
    })
});
