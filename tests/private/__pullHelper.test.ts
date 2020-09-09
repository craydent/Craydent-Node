import __pullHelper from '../../modules/private/__pullHelper';
jest.mock('../../modules/methods/removeAt', () => {
    return {
        "default": (...args) => removeAt.apply(this, args)
    }
});
let removeAt = () => { }
describe('__pullHelper', () => {
    beforeEach(() => {
        removeAt = () => { }
    });
    it('should pull items from the array', () => {
        removeAt = jest.fn();
        let arr = [{ a: 1 }];
        __pullHelper(arr, [{ a: 1 }, { a: 2 }]);
        expect(removeAt).toHaveBeenCalledWith(arr, 0);
    })
    it('should pull item from the array', () => {
        removeAt = jest.fn();
        let arr = [{ a: 1 }];
        __pullHelper(arr, { a: 1 } as any);
        expect(removeAt).toHaveBeenCalledWith(arr, 0);
    })
});
