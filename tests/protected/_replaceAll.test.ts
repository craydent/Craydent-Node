import _replaceAll from '../../modules/protected/_replaceAll';

describe('_removeFromIndex', () => {
    it('should replace single string instance', () => {
        const expected = 'th is a sentence';
        expect(_replaceAll('this is a sentence', 'is', '')).toBe(expected);
    });
    it('should replace all corresponding strings', () => {
        const expected = 'th  a sentence';
        expect(_replaceAll('this is a sentence', 'is', '', 'g')).toBe(expected);
    });
    it('should replace even array of strings for replacer and subject', () => {
        const expected = 'th  a istence';
        expect(_replaceAll('this is a sentence', ['is', 'sen'], ['', 'is'], 'g')).toBe(expected);
    });
    it('should replace uneven array of strings for replacer and subject', () => {
        const expected = 'th  a tence';
        expect(_replaceAll('this is a sentence', ['is', 'sen'], [''], 'g')).toBe(expected);
    });
    it('should replace single string ignoreing case', () => {
        const expected = 'th IS a sentence';
        expect(_replaceAll('thIs IS a sentence', 'is', '', 'i')).toBe(expected);
    });
    it('should replace all corresponding strings ignoreing case', () => {
        const expected = 'th  a sentence';
        expect(_replaceAll('thIs IS a sentence', 'is', '', 'gi')).toBe(expected);
    });
});