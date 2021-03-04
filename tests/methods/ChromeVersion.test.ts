import ChromeVersion from '../../compiled/transformedMinor/craydent.chromeversion';
jest.mock('../../compiled/transformedMinor/craydent.chromeversion/protected/_getBrowserVersion', () => {
    return {
        "default": (...args) => {
            return _getBrowserVersion.apply(this, args);
        }
    }
});
let _getBrowserVersion = () => { };
describe('ChromeVersion', () => {
    beforeEach(() => {
        _getBrowserVersion = jest.fn().mockImplementationOnce(() => 1);
    })
    it('should return version of Chrome Version', async () => {
        const dis = {};
        expect(ChromeVersion.call(dis)).toBe(1);
        expect(_getBrowserVersion).toHaveBeenLastCalledWith(dis, 'Chrome')
    })
});
