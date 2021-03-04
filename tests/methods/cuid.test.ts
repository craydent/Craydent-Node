import cuid from '../../compiled/transformedMinor/craydent.cuid';
describe('cuid', () => {
    it('should generate a cuid', () => {
        const uidRegex = /[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}/;
        const muidRegex = /\{[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}\}/;
        expect(cuid()).toMatch(uidRegex);
        expect(cuid(true)).toMatch(muidRegex);
    })
});