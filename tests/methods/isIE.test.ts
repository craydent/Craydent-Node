import isIE from '../../compiled/transformedMinor/craydent.isie';
jest.mock('../../compiled/transformedMinor/craydent.ieversion', () => {
    return {
        "default": (...args) => IEVersion.apply(this, args)
    }
});
let IEVersion = () => { }
describe('isIE', () => {
    beforeEach(() => {
        IEVersion = () => { }
    });
    it('should check if browser is IE', () => {
        IEVersion = jest.fn()
            .mockImplementationOnce(() => 1)
            .mockImplementationOnce(() => -1);
        const dis = {};
        expect(isIE.call(dis)).toBe(true);
        expect(isIE.call(dis)).toBe(false);
    });
});