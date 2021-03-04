import globalize from '../../compiled/transformedMinor/craydent.globalize';
jest.mock('../../compiled/transformedMinor/craydent.globalize/private/__contextualizeMethods', () => {
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
