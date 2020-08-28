import getName from '../../modules/methods/getName';
describe('getName', () => {

    it('should get function name when .name is not defined', () => {
        function a() { }
        delete (a as any).name;
        expect(getName(a)).toBe('a');
    });
    it('should get function name when .name is defined', () => {
        function a() { };
        expect(getName(a)).toBe('a');
    });
});
