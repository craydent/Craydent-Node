import * as CC from '../../compiled/transformedMinor/craydent.clearcache';
import indexOfAlt from '../../compiled/transformedMinor/craydent.indexofalt';

describe('clearCache', () => {
    it('should remove specific module', () => {
        const spy = jest.spyOn(CC, '_clearCacheHelper');
        require('../../compiled/transformedMinor/craydent.isnull');
        require('../../compiled/transformedMinor/craydent.isnullorempty');
        expect(CC.default("../../compiled/transformedMinor/craydent.isnull")).toBe(true);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(require.resolve('../../compiled/transformedMinor/craydent.isnull'));
    })
    it('should remove modules', () => {
        const spy = jest.spyOn(CC, '_clearCacheHelper');
        const finder = (call: any, value: any) => { return call[0] == value };
        const isNullPath = require.resolve('../../compiled/transformedMinor/craydent.isnull');
        const isNullOrEmpty = require.resolve('../../compiled/transformedMinor/craydent.isnullorempty');
        require('../../compiled/transformedMinor/craydent.isnull');
        require('../../compiled/transformedMinor/craydent.isnullorempty');
        expect(CC.default()).toBe(true);
        expect(spy.mock.calls.length).toBeGreaterThanOrEqual(2);
        expect(spy).toHaveBeenNthCalledWith(indexOfAlt(spy.mock.calls, isNullPath, finder) + 1, isNullPath);
        expect(spy).toHaveBeenNthCalledWith(indexOfAlt(spy.mock.calls, isNullOrEmpty, finder) + 1, isNullOrEmpty);
    })
});
