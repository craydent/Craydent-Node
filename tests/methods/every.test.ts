import every from '../../compiled/transformedMinor/craydent.every';
describe('every', () => {
    it('should check all values in the array', () => {
        const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
        expect(every([], () => { })).toBe(true);
        expect(every(arr, (value, index, arr) => value.hasOwnProperty('id'))).toBe(true);
        expect(every(arr, (value, index, arr) => value.id == 1)).toBe(false);
    })
    it('should check all values in the object', () => {
        const obj = { id: 1, prop: 2 };
        expect(every({}, () => { })).toBe(true);
        expect(every(obj, (value, prop, obj) => value)).toBe(true);
        expect(every(obj, (value, prop, obj) => value == 1)).toBe(false);
    })
});
