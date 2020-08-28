import insert from '../../modules/methods/insert';
jest.mock('../../modules/methods/add', () => {
    return {
        "default": (...args) => add.apply(this, args)
    }
});
let add = () => { }
describe('insert', () => {
    beforeEach(() => {
        add = () => { }
    });
    it('should insert value to the array', () => {
        add = jest.fn();
        expect(insert([], 'ab')).toBe(true);
        expect(add).toHaveBeenCalledWith([], 'ab')
    });
    it('should insert an array of values to the array', () => {
        add = jest.fn();
        expect(insert([], ['ab'])).toBe(true);
        expect(add).toHaveBeenCalledWith([], 'ab')
    });
});