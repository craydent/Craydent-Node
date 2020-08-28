import endItWith from '../../modules/methods/endItWith';
describe('endItWith', () => {
    it('should add ending if not present', () => {
        expect(endItWith('path', '/')).toBe('path/');
    })
    it('should not add ending if present', () => {
        expect(endItWith('path/', '/')).toBe('path/');
    })
});
