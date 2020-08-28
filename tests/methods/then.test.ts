import then from '../../modules/methods/then';

jest.mock('../../modules/methods/on', () => {
    return {
        "default": (...args) => on.apply(this, args)
    }
});
let on = () => { }
describe('then', () => {
    beforeEach(() => {
        on = () => { }
    });
    it('should add to the array and index', () => {
        on = jest.fn(() => ({}));
        const func = () => { };
        const cb = () => { };
        expect(then(func, cb)).toEqual({});
        expect(on).toHaveBeenCalledWith(func, 'then', cb);
    });
});