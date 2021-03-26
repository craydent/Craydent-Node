import _getFuncName from '../../modules/protected/_getFuncName';

describe('_getFuncName', () => {
    it('should process function args when there are no args', () => {
        expect(_getFuncName(function f() { })).toEqual('f');
    });
    it('should process function args when there is one arg', () => {
        expect(_getFuncName(function f(a: any) { })).toEqual('f');
    });
    it('should process function args when there are multiple args', () => {
        expect(_getFuncName(function f(a: any, b: any, c: any) { })).toEqual('f');
    });
    it('should process function args when there are multiple args with comments', () => {
        expect(_getFuncName(function f(a: any, b: any, c: any/* more comments */) { })).toEqual('f');
    });
})