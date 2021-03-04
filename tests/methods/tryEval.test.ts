import tryEval from '../../compiled/transformedMinor/craydent.tryeval';
describe('tryEval', () => {
    it('should evaluate without throwing an error', () => {
        expect(tryEval('{')).toBe(null);
        expect(tryEval('{}')).toEqual({});
        expect(tryEval('({})')).toEqual({});
    });
    it('should evaluate without throwing an error using a parser', () => {
        expect(tryEval('{', JSON.parse)).toBe(null);
        expect(tryEval('{}', JSON.parse)).toEqual({});
        expect(tryEval('({})', JSON.parse)).toEqual({});
    });
});
