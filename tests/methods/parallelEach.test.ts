import parallelEach from '../../compiled/transformedMinor/craydent.paralleleach';
describe('parallelEach', () => {
    it('should run async', async () => {
        expect(await parallelEach([])).toEqual([]);
        expect(await parallelEach([], [])).toEqual([]);
        expect(await parallelEach([1, 2], async (value, i) => value + i)).toEqual([1, 3]);
        expect(await parallelEach([1, 2], function* (value, i) { return value + i; })).toEqual([1, 3]);
        expect(await parallelEach([1, 2], (value, i) => value + i)).toEqual([1, 3]);

        const asyncArr = [
            () => 1,
            function* () { yield 3; yield 2; return 1; },
            async () => 1,
            new Promise((res) => { res(1) }),
            1
        ];
        expect(await parallelEach(asyncArr as any)).toEqual([1, 1, 1, 1, 1]);

        expect(await parallelEach([() => 1])).toEqual([1]);
        expect(await parallelEach([function* () { yield 3; yield 2; return 1; }])).toEqual([1]);
        expect(await parallelEach([async () => 1])).toEqual([1]);
        expect(await parallelEach([new Promise((res) => { res(1) })])).toEqual([1]);
        expect(await parallelEach([1 as any])).toEqual([1]);
    });
});
