import acronymize from '../../compiled/transformedMinor/craydent.acronymize';

describe('acronymize', () => {
    it('should create an acronym using default values', () => {
        expect(acronymize('World Wrestling Entertainment')).toBe('WWE');
        expect(acronymize('world wrestling entertainment')).toBe('WWE');
    })
    it('should create acyronym with custom values', () => {
        expect(acronymize('World Wrestling entertainment', true)).toBe('WW');
        expect(acronymize('World Wrestling entertainment', false)).toBe('WWE');
        expect(acronymize('World;Wrestling;Entertainment', true, ';')).toBe('WWE');
        expect(acronymize('world wrestling entertainment', /w/)).toBe('WW');
    })
});

