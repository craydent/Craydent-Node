import globalize from '../../modules/methods/globalize';
jest.mock('../../modules/private/__contextualizeMethods', () => {
    return {
        "default": (...args) => {
            return __contextualizeMethods.apply(this, args);
        }
    }
});
let __contextualizeMethods = () => { };
describe('globalize', () => {
    beforeEach(() => {
        __contextualizeMethods = jest.fn();
    })
    it('should globalize methods', async () => {
        globalize();
        expect(__contextualizeMethods).toHaveBeenCalledWith(global)
    })
});
