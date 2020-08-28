import isCuid from '../../modules/methods/isCuid';
describe('isCuid', () => {
    it('should check if string is a cuid', () => {
        expect(isCuid(null)).toBe(false);
        expect(isCuid("19bf5aeb-de12-496c-aa05-097a4f11f5bd")).toBe(true);
        expect(isCuid("some random string")).toBe(false);
        expect(isCuid("{19bf5aeb-de12-496c-aa05-097a4f11f5bd}")).toBe(false);
        expect(isCuid("19bf5aeb-de12-496c-aa05-097a4f11f5bd")).toBe(true);
        expect(isCuid("{19bf5aeb-de12-496c-aa05-097a4f11f5bd}", true)).toBe(true);

    })
});
