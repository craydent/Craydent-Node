import catchIt from '../../compiled/transformedMinor/craydent.catch';
jest.mock('../../compiled/transformedMinor/craydent.on', () => {
    return {
        "default": (...args: any[]) => _on.apply(this, args as any)
    }
});
let _on = () => { }
describe('catch', () => {
    beforeEach(() => {
        _on = jest.fn()
    });
    it('should return average of all numbers', () => {
        const func = () => { };
        const callback = () => { };
        catchIt(func, callback);
        expect(_on).toHaveBeenCalledWith(func, 'catch', callback);
    })
});
