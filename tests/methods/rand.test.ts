import rand from '../../modules/methods/rand';

describe('rand', () => {
    const random = Math.random;
    beforeEach(() => {
        Math.random = jest.fn(() => 0.4186963546050291);
    });
    afterAll(() => {
        Math.random = random;
    });
    it('should provide a random number', () => {
        expect(rand()).toBe(0.4186963546050291);
    });
    it('should provide a random number between 2 numbers', () => {
        expect(rand(1, 2)).toBe(1.4186963546050291);
    });
    it('should provide a random number between 2 numbers when random returns 0', () => {
        Math.random = jest.fn()
            .mockImplementationOnce(() => 0)
        expect(rand(1, 2)).toBe(1.1);
    });
    it('should provide a random number between 2 numbers inclusive and given upper bound', () => {
        Math.random = jest.fn()
            .mockImplementationOnce(() => 0.9999999999999999)
            .mockImplementationOnce(() => 0.4186963546050291);
        expect(rand(1, 2, true)).toBe(2);
    });
    it('should provide a random number between 2 numbers inclusive and not given upperboud', () => {
        Math.random = jest.fn()
            .mockImplementationOnce(() => 0.9999999999999998)
            .mockImplementationOnce(() => 0.4186963546050291);
        expect(rand(1, 2, true)).toBe(1.9999999999999998);
    });
    it('should provide a random number between 2 numbers inclusive and not flip', () => {
        Math.random = jest.fn()
            .mockImplementationOnce(() => 0.9999999999999999)
            .mockImplementationOnce(() => 0.4186963546050292);
        expect(rand(1, 2, true)).toBe(2);
    });
});