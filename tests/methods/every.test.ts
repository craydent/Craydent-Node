import every from '../../compiled/transformedMinor/craydent.every';
describe('every', () => {
    it('should check all values in the array', () => {
        const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
        expect(every([], () => { })).toBe(true);
        expect(every(arr, (value: any, index: any, arr: any) => value.hasOwnProperty('id'))).toBe(true);
        expect(every(arr, (value: any, index: any, arr: any) => value.id == 1)).toBe(false);
    })
    it('should check all values in the object', () => {
        const obj = { id: 1, prop: 2 };
        expect(every({}, () => { })).toBe(true);
        expect(every(obj, (value: any, prop: any, obj: any) => value)).toBe(true);
        expect(every(obj, (value: any, prop: any, obj: any) => value == 1)).toBe(false);
    })
});
