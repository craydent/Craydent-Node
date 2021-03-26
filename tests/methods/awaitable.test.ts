import awaitable from '../../compiled/transformedMinor/craydent.awaitable';
jest.mock('../../compiled/transformedMinor/craydent.yieldable', () => {
    return {
        "default": (...args: any[]) => _yieldable.apply(this, args as any)
    }
});
let _yieldable = () => { }
describe('awaitable', () => {
    beforeEach(() => { _yieldable = jest.fn(); })
    it('should call yieldable', () => {
        awaitable(new Promise(() => { }));
        expect(_yieldable).toHaveBeenCalledWith(new Promise(() => { }), undefined, undefined, undefined);
    })
});