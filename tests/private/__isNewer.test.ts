import __isNewer from '../../modules/private/__isNewer';

describe('__isNewer', () => {
    it('should return true when thisVersion is newer', () => {
        expect(__isNewer(['1', '1', '1'], ['1', '1', '2'])).toBe(true);
        expect(__isNewer(['1', '1', '1'], ['1', '2', '2'])).toBe(true);
        expect(__isNewer(['1', '1', '1'], ['1', '2', '1'])).toBe(true);
        expect(__isNewer(['1', '1', '1'], ['2', '1', '1'])).toBe(true);
        expect(__isNewer(['1', '1', '1'], ['2', '0', '0'])).toBe(true);
        expect(__isNewer(['1', '1', '1'], ['2', '0', '1'])).toBe(true);
        expect(__isNewer(['1', '1', '1'], ['2', '1', '0'])).toBe(true);
    })
    it('should return false when thisVersion is older', () => {
        expect(__isNewer(['1', '1', '1'], ['1', '1', '1'])).toBe(false);
        expect(__isNewer(['1', '1', '1'], ['1', '1', '0'])).toBe(false);
        expect(__isNewer(['1', '1', '1'], ['1', '0', '2'])).toBe(false);
        expect(__isNewer(['1', '1', '1'], ['1', '0', '0'])).toBe(false);
        expect(__isNewer(['1', '1', '1'], ['0', '1', '1'])).toBe(false);
        expect(__isNewer(['1', '1', '1'], ['0', '0', '0'])).toBe(false);
        expect(__isNewer(['1', '1', '1'], ['0', '0', '1'])).toBe(false);
        expect(__isNewer(['1', '1', '1'], ['0', '1', '0'])).toBe(false);
        expect(__isNewer(['1', '1', '1'], ['1', '1'])).toBe(false);
    })
});