import indexOfAlt from '../../modules/methods/indexOfAlt';
describe('indexOfAlt', () => {
    const arr = ['ac', 'ab', 'ab', 'ac'];
    const str = 'acababac';
    it('should return -1 when not found', () => {
        expect(indexOfAlt(arr, null)).toBe(-1);
        expect(indexOfAlt(arr, null, () => null)).toBe(-1);
        expect(indexOfAlt(str, null)).toBe(-1);
        expect(indexOfAlt(str, 'z')).toBe(-1);
        expect(indexOfAlt(str, /z/)).toBe(-1);
        expect(indexOfAlt(null, null)).toBe(-1);

    });
    it('should retrieve index of an array', () => {
        expect(indexOfAlt(arr, /^ab/)).toBe(1);
        expect(indexOfAlt(arr, /^ab/, 2)).toBe(2);
        expect(indexOfAlt(arr, 'ac', (item, value, arr) => item == value)).toBe(0);
        expect(indexOfAlt(arr, 'ac', (item, value, arr) => item == value, 1)).toBe(3);

    });
    it('should retrieve index of an string', () => {
        expect(indexOfAlt(str, /ab/)).toBe(2);
        expect(indexOfAlt(str, /ab/, 3)).toBe(4);
        expect(indexOfAlt(str, 'c')).toBe(1);
        expect(indexOfAlt(str, 'c', 2)).toBe(7);
    })
});
