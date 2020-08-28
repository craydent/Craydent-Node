import getClass from '../../modules/methods/getClass';
describe('getClass', () => {
    it('should retrieve class name', () => {
        function className() { }
        expect(getClass(new className())).toBe("className");
    })
});
