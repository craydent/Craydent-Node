import isValidDate from '../../modules/methods/isValidDate';
describe('isValidDate', () => {
    it('should check if the value is a valid date', () => {
        expect(isValidDate(new Date())).toBe(true);
        expect(isValidDate(new Date(''))).toBe(false);
    })
});
