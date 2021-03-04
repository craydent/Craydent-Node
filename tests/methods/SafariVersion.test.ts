import SafariVersion from '../../compiled/transformedMinor/craydent.safariversion';
jest.mock('../../compiled/transformedMinor/craydent.safariversion/protected/_getBrowserVersion', () => {
    return {
        "default": (...args) => {
            return _getBrowserVersion.apply(this, args);
        }
    }
});
let _getBrowserVersion = () => { };
describe('SafariVersion', () => {
    beforeEach(() => {
        _getBrowserVersion = jest.fn().mockImplementationOnce(() => 1);
    })
    it('should return version of Safari Version', async () => {
        const dis = { isChrome: () => false };
        expect(SafariVersion.call(dis)).toBe(1);
        expect(_getBrowserVersion).toHaveBeenLastCalledWith(dis, 'Safari')
    })
    it('should return version of Safari Version', async () => {
        const dis = { isChrome: () => true };
        expect(SafariVersion.call(dis)).toBe(-1);
        expect(_getBrowserVersion).not.toHaveBeenCalled()
    })
});
