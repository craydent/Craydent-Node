import has from '../../modules/methods/has';
describe('has', () => {
    it('should be an alias for hasOwnProperty', () => {
        expect(has({}, 'prop')).toBe(false);
        expect(has({ prop: 1 }, 'prop')).toBe(true);
    })
});
