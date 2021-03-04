import highlight from '../../compiled/transformedMinor/craydent.highlight';
describe('highlight', () => {
    it('should highlight html with default values', () => {
        expect(highlight('word of the day', 'the')).toBe('word of <span class="chighlight">the</span> day');
        expect(highlight('word of the day', /the/)).toBe('word of <span class="chighlight">the</span> day');
        expect(highlight('word of the day', /(the)/)).toBe('word of <span class="chighlight">the</span> day');
        expect(highlight('word of The day', /the/im)).toBe('word of <span class="chighlight">The</span> day');
    })
    it('should highlight html with options', () => {
        expect(highlight('word of the day', 'the', 'h', 'div')).toBe('word of <div class="h">the</div> day');
        expect(highlight('word of (the) day', '(the)', 'h', 'div')).toBe('word of <div class="h">(the)</div> day');
    })
});
