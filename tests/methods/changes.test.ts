import changes from '../../compiled/transformedMinor/craydent.changes';
describe('capitalize', () => {
    it('should throw error type error and return null', () => {
        expect(changes({}, "" as any)).toBe(null);
        expect(changes("" as any, {})).toBe(null);
    })
    it('should return the diff', () => {
        const obj = { prop0: '', prop1: { innerProp: "" }, prop2: {}, prop3: 1 };
        const compare = { prop0: '', prop1: {}, prop2: '', prop4: 2 };
        const expected = {
            $length: 4,
            $add: ['prop4'],
            $update: ['prop1', 'prop2'],
            $delete: ['prop3'],
            prop1: {},
            prop2: '',
            prop3: null,
            prop4: 2
        };
        expect(changes(obj, compare)).toEqual(expected);
    })
});
