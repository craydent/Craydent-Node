import runFuncArray from '../../modules/methods/runFuncArray';
describe('runFuncArray', () => {
    it('should execute a single function', () => {
        expect(runFuncArray(function () { return 1 })).toEqual([1]);
    })
    it('should execute array of functions', () => {
        const arr = [
            function () { return 1 },
            function () { return 2 },
            function () { return 3 }
        ];
        expect(runFuncArray(arr)).toEqual([1, 2, 3]);
        expect(runFuncArray(arr, [])).toEqual([1, 2, 3]);
    })
    it('should execute array of asyncronous functions', async () => {
        const arr = [
            function () { return 1 },
            function* () { yield 1; return 2; },
            async function () { return 3 }
        ];
        expect(await runFuncArray(arr)).toEqual([1, 2, 3]);
    })
});
