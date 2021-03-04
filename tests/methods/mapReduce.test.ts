import mapReduce from '../../compiled/transformedMinor/craydent.mapreduce';
import emit from '../../compiled/transformedMinor/craydent.emit';
describe('mapReduce', () => {
    const arr = [{ a: 1 }, { a: 1 }, { a: 1 }];
    it('should do a map reduce', () => {
        expect(mapReduce(arr,
            () => { (this as any).a++; emit('a', 1); },
            (key, values: any[]) => {
                let sum = 0;
                for (let i = 0, len = values.length; i < len; i++) {
                    sum += values[i];
                }
                return sum;
            })).toEqual([{ _id: 'a', value: 3 }])
    })
    it('should do a map reduce with options', () => {
        const options = { finalize: (key, value) => value * 10, sort: 'a', out: 'tempOut' };
        const expected = [{ _id: 'a', value: 30 }];
        expect(mapReduce(arr,
            () => { (this as any).a++; emit('a', 1); },
            (key, values: any[]) => {
                let sum = 0;
                for (let i = 0, len = values.length; i < len; i++) {
                    sum += values[i];
                }
                return sum;
            }, options)).toEqual(expected);
        expect((global as any).tempOut).toEqual(expected);
        delete (global as any).tempOut;
    })
    it('should do a map reduce with out option as object array', () => {
        let out = [];
        const options = { finalize: (key, value) => value * 10, sort: { a: 1, b: -1 }, out };
        const expected = [{ _id: 'a', value: 30 }];
        expect(mapReduce(arr,
            () => { (this as any).a++; emit('a', 1); },
            (key, values: any[]) => {
                let sum = 0;
                for (let i = 0, len = values.length; i < len; i++) {
                    sum += values[i];
                }
                return sum;
            }, options)).toEqual(expected);
        expect((global as any).tempOut).toBeUndefined();
        expect(out).toEqual(expected);
    })
});
