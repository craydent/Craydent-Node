import getClass from '../../compiled/transformedMinor/craydent.getclass';
describe('getClass', () => {
    it('should retrieve class name', () => {
        function className() { }
        expect(getClass(new (className as any)())).toBe("className");
    })
});
