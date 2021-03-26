import next from '../../compiled/transformedMinor/craydent.next';
describe('next', () => {
    it('should not invoke next when there are no listeners', () => {
        function a() {
            return next();
        }
        (a as any)._then = null;
        expect(a()).toEqual([]);
    });
    it('should invoke next', () => {
        function a() {
            next('event', 1, 2);
        }
        const _then = jest.fn();
        a._then = function () { return _then.apply(this, arguments); }
        a();
        expect(_then).toHaveBeenCalledWith("event", 1, 2);
    });
    it('should invoke next and event listener when event throws and error', () => {
        function a() {
            next('event', 1, 2);
        }
        const _catch = jest.fn();
        const _then = jest.fn().mockImplementationOnce(() => { throw 'error' });
        a._catch = function () { return _catch.apply(this, arguments); }
        a._then = function () { return _then.apply(this, arguments); }
        a();
        expect(_then).toHaveBeenCalledWith("event", 1, 2);
        expect(_catch).toHaveBeenCalledWith("event", 1, 2);
    })
});
