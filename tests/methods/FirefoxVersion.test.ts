import FirefoxVersion from '../../modules/methods/FirefoxVersion';
jest.mock('../../modules/protected/_getBrowserVersion', () => {
    return {
        "default": (...args) => {
            return _getBrowserVersion.apply(this, args);
        }
    }
});
let _getBrowserVersion = () => { };
describe('FirefoxVersion', () => {
    beforeEach(() => {
        _getBrowserVersion = jest.fn().mockImplementationOnce(() => 1);
    })
    it('should return version of Firefox Version', async () => {
        const dis = {};
        expect(FirefoxVersion.call(dis)).toBe(1);
        expect(_getBrowserVersion).toHaveBeenCalledWith(dis, 'Firefox')
    })
});
