import endsWithAny from '../../compiled/transformedMinor/craydent.endswithany';
describe('endsWithAny', () => {
    it('should return the searchString if string ends with any of the given searchStrings', () => {
        expect(endsWithAny('path/', ['s', '/'])).toBe('/');
        expect(endsWithAny('path/', 's', '/')).toBe('/');
        expect(endsWithAny('', 's', '/')).toBe(false);
        expect(endsWithAny('path', 's', '/')).toBe(false);
        expect(endsWithAny('path', null)).toBe(false);
    })
});
