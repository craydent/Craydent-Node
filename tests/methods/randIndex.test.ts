import randIndex from '../../compiled/transformedMinor/craydent.rand-index';

describe('randIndex', () => {
    const random = Math.random;
    beforeEach(() => {
        Math.random = jest.fn(() => 0.4186963546050291);
    });
    afterAll(() => {
        Math.random = random;
    });
    it('should return -1', () => {
        expect(randIndex([])).toBe(-1);
        expect(randIndex("")).toBe(-1);
        expect(randIndex(undefined)).toBe(-1);
        expect(randIndex(null)).toBe(-1);
    });
    it('should provide a random index of an array', () => {
        expect(randIndex([1, 2])).toBe(0);
        Math.random = jest.fn()
            .mockImplementationOnce(() => 0.5186963546050291)
        expect(randIndex([1, 2])).toBe(1);
    });
    it('should provide a random index of a string', () => {
        expect(randIndex('ab')).toBe(0);
        Math.random = jest.fn()
            .mockImplementationOnce(() => 0.5186963546050291)
        expect(randIndex('ab')).toBe(1);
    });
    it('should return 0 when random returns 0', () => {
        Math.random = jest.fn()
            .mockImplementationOnce(() => 0)
        expect(randIndex([1, 2])).toBe(0);
        Math.random = jest.fn()
            .mockImplementationOnce(() => 0)
        expect(randIndex('ab')).toBe(0);
    });

});