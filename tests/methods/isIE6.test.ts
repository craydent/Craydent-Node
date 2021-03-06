import isIE6 from '../../compiled/transformedMinor/craydent.isie6';
jest.mock('../../compiled/transformedMinor/craydent.ieversion', () => {
    return {
        "default": (...args) => IEVersion.apply(this, args)
    }
});
let IEVersion = () => { }
describe('isIE6', () => {
    beforeEach(() => {
        IEVersion = () => { }
    });
    it('should check if browser is IE6 or', () => {
        IEVersion = jest.fn()
            .mockImplementationOnce(() => 6)
            .mockImplementationOnce(() => -1);
        const dis = {};
        expect(isIE6.call(dis)).toBe(true);
        expect(isIE6.call(dis)).toBe(false);
    });
});