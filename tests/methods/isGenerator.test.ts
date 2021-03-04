import isGenerator from '../../compiled/transformedMinor/craydent.isgenerator';

describe('isGenerator', () => {
    it('should check if variable is async', () => {
        expect(isGenerator(null)).toBe(false);
        expect(isGenerator(() => { })).toBe(false);
        expect(isGenerator(async () => { })).toBe(false);
        expect(isGenerator(function* () { })).toBe(true);
        // emulate actual generator
        expect(isGenerator({ constructor: { name: 'GeneratorFunction' } })).toBe(true);
    });
});