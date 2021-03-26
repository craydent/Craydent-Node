import globalize from '../../compiled/transformedMinor/craydent.globalize';
jest.mock('../../compiled/transformedMinor/craydent.globalize/private/__contextualizeMethods', () => {
    return {
        "default": (...args: any[]) => {
            return __contextualizeMethods.apply(this, args as any);
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
