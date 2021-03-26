import ChromeVersion from '../../compiled/transformedMinor/craydent.chromeversion';
jest.mock('../../compiled/transformedMinor/craydent.chromeversion/protected/_getBrowserVersion', () => {
    return {
        "default": (...args: any[]) => {
            return _getBrowserVersion.apply(this, args as any);
        }
    }
});
let _getBrowserVersion = () => { };
describe('ChromeVersion', () => {
    beforeEach(() => {
        _getBrowserVersion = jest.fn().mockImplementationOnce(() => 1);
    })
    it('should return version of Chrome Version', async () => {
        const dis: any = {};
        expect(ChromeVersion.call(dis)).toBe(1);
        expect(_getBrowserVersion).toHaveBeenLastCalledWith(dis, 'Chrome')
    })
});
