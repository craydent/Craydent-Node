import then from '../../compiled/transformedMinor/craydent.then';

jest.mock('../../compiled/transformedMinor/craydent.on', () => {
    return {
        "default": (...args: any[]) => on.apply(this, args as any)
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