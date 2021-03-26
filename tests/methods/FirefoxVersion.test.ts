import FirefoxVersion from '../../compiled/transformedMinor/craydent.firefoxversion';
jest.mock('../../compiled/transformedMinor/craydent.firefoxversion/protected/_getBrowserVersion', () => {
    return {
        "default": (...args: any[]) => {
            return _getBrowserVersion.apply(this, args as any);
        }
    }
});
let _getBrowserVersion = () => { };
describe('FirefoxVersion', () => {
    beforeEach(() => {
        _getBrowserVersion = jest.fn().mockImplementationOnce(() => 1);
    })
    it('should return version of Firefox Version', async () => {
        const dis: any = {};
        expect(FirefoxVersion.call(dis)).toBe(1);
        expect(_getBrowserVersion).toHaveBeenCalledWith(dis, 'Firefox')
    })
});
