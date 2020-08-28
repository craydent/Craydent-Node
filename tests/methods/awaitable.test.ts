import awaitable from '../../modules/methods/awaitable';
jest.mock('../../modules/methods/yieldable', () => {
    return {
        "default": (...args) => _yieldable.apply(this, args)
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