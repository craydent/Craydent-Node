import _getFuncArgs from '../../modules/protected/_getFuncArgs';

describe('_getFuncArgs', () => {
    it('should process function args when there are no args', () => {
        expect(_getFuncArgs(function f() { })).toEqual([]);
    });
    it('should process function args when there is one arg', () => {
        expect(_getFuncArgs(function f(a) { })).toEqual(['a']);
    });
    it('should process function args when there are multiple args', () => {
        expect(_getFuncArgs(function f(a, b, c) { })).toEqual(['a', 'b', 'c']);
    });
    it('should process function args when there are multiple args with comments', () => {
        expect(_getFuncArgs(function f(a, b, c/* more comments */) { })).toEqual(['a', 'b', 'c']);
    });
})
