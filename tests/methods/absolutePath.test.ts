import absolutePath from '../../modules/methods/absolutePath';
describe('absolutePath', () => {
    it('should get the relative path', () => {
        process.cwd()
        expect(absolutePath('./here')).toBe(`${process.cwd()}/tests/methods/./here`);
        expect(absolutePath('/here')).toBe('/here');
    })
});
