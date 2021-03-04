import suid from '../../compiled/transformedMinor/craydent.suid';
describe('suid', () => {
    it('should generate a short unique id', () => {
        const id = suid();
        expect(id).toMatch(/[a-zA-Z0-9]/);
        expect(id.length).toBe(10);
    })
    it('should generate a short unique id having specified length', () => {
        const id = suid(11);
        expect(id).toMatch(/[a-zA-Z0-9]/);
        expect(id.length).toBe(11);
    })
});
