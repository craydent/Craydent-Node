import OperaVersion from '../../compiled/transformedMinor/craydent.operaversion';
jest.mock('../../compiled/transformedMinor/craydent.operaversion/protected/_getBrowserVersion', () => {
    return {
        "default": (...args: any[]) => {
            return _getBrowserVersion.apply(this, args as any);
        }
    }
});
let _getBrowserVersion = () => { };
describe('OperaVersion', () => {
    beforeEach(() => {
        _getBrowserVersion = jest.fn().mockImplementationOnce(() => 1);
    })
    it('should return version of Opera Version', async () => {
        const dis: any = {};
        expect(OperaVersion.call(dis)).toBe(1);
        expect(_getBrowserVersion).toHaveBeenCalledWith(dis, 'Opera')
    })
});
