import startsWithAny from '../../compiled/transformedMinor/craydent.startswithany';
describe('startsWithAny', () => {
    it('should return the searchString if string ends with any of the given searchStrings', () => {
        expect(startsWithAny('/path', ['s', '/'])).toBe('/');
        expect(startsWithAny('/path', 's', '/')).toBe('/');
        expect(startsWithAny('', 's', '/')).toBe(false);
        expect(startsWithAny('path', 's', '/')).toBe(false);
        expect(startsWithAny('path', null)).toBe(false);
    })
});
