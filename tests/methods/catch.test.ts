import catchIt from '../../modules/methods/catch';
jest.mock('../../modules/methods/on', () => {
    return {
        "default": (...args) => _on.apply(this, args)
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
