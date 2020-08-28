import emit from '../../modules/methods/emit';
describe('emit', () => {
    it('should not invoke events when there are no listeners', () => {
        function a() {
            return emit('event', 1, 2);
        }
        a._emit = null;
        a._event = null;
        expect(a()).toEqual([]);
    });
    it('should invoke events', () => {
        function a() {
            emit('event', 1, 2);
        }
        const _emit = jest.fn();
        const _event = jest.fn();
        a._emit = function () { return _emit.apply(this, arguments); }
        a._event = function () { return _event.apply(this, arguments); }
        a();
        expect(_emit).toHaveBeenCalledWith("event", 1, 2);
        expect(_event).toHaveBeenCalledWith(1, 2);
    });
    it('should invoke emit and event listener when event throws and error', () => {
        function a() {
            emit('event', 1, 2);
        }
        const _catch = jest.fn();
        const _emit = jest.fn();
        const _event = jest.fn().mockImplementationOnce(() => { throw 'error' });
        a._catch = function () { return _catch.apply(this, arguments); }
        a._emit = function () { return _emit.apply(this, arguments); }
        a._event = function () { return _event.apply(this, arguments); }
        a();
        expect(_emit).toHaveBeenCalledWith("event", 1, 2);
        expect(_event).toHaveBeenCalled();
        expect(_catch).toHaveBeenCalledWith("event", 1, 2);
    })
    it('should not invoke the event listener when emit throws an error', () => {
        function a() {
            emit('event', 1, 2);
        }
        const _catch = jest.fn();
        const _emit = jest.fn().mockImplementationOnce(() => { throw 'error' });
        const _event = jest.fn();
        a._catch = function () { return _catch.apply(this, arguments); }
        a._emit = function () { return _emit.apply(this, arguments); }
        a._event = function () { return _event.apply(this, arguments); }
        a();
        expect(_emit).toHaveBeenCalledWith("event", 1, 2);
        expect(_event).not.toHaveBeenCalled();
        expect(_catch).toHaveBeenCalledWith("event", 1, 2);
    })
});
