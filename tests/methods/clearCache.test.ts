import * as CC from '../../modules/methods/clearCache';
import indexOfAlt from '../../modules/methods/indexOfAlt';

describe('clearCache', () => {
    it('should remove specific module', () => {
        const spy = jest.spyOn(CC, '_clearCacheHelper');
        require('../../modules/methods/isNull');
        require('../../modules/methods/isNullOrEmpty');
        expect(CC.default("../../modules/methods/isNull")).toBe(true);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(require.resolve('../../modules/methods/isNull'));
    })
    it('should remove modules', () => {
        const spy = jest.spyOn(CC, '_clearCacheHelper');
        const finder = (call, value) => { return call[0] == value };
        const isNullPath = require.resolve('../../modules/methods/isNull');
        const isNullOrEmpty = require.resolve('../../modules/methods/isNullOrEmpty');
        require('../../modules/methods/isNull');
        require('../../modules/methods/isNullOrEmpty');
        expect(CC.default()).toBe(true);
        expect(spy.mock.calls.length).toBeGreaterThanOrEqual(2);
        expect(spy).toHaveBeenNthCalledWith(indexOfAlt(spy.mock.calls, isNullPath, finder) + 1, isNullPath);
        expect(spy).toHaveBeenNthCalledWith(indexOfAlt(spy.mock.calls, isNullOrEmpty, finder) + 1, isNullOrEmpty);
    })
});
