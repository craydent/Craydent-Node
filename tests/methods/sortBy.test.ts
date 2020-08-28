import sortBy from '../../modules/methods/sortBy';
describe('sortBy', () => {
    it('should sort the array by the field', () => {
        let arr = [{ _id: 2 }, { _id: 1 }];
        expect(sortBy(arr, '_id')).toEqual([{ _id: 1 }, { _id: 2 }])
    });
    it('should reverse sort the array by the field', () => {
        let arr = [{ _id: 2 }, { _id: 1 }];
        expect(sortBy(arr, '_id', true)).toEqual([{ _id: 2 }, { _id: 1 }])
    });
    it('should sort the array by multiple fields', () => {
        let arr = [{ _id: 2, a: 1 }, { _id: 1, a: 3 }, { _id: 2, a: 2 }];
        expect(sortBy(arr, ['_id', 'a'], null, null, null, { ignoreCase: true })).toEqual([{ _id: 1, a: 3 }, { _id: 2, a: 1 }, { _id: 2, a: 2 }])
    });
    it('should sort the array by multiple fields as object', () => {
        let arr = [{ _id: 2, a: 'A' }, { _id: 1, a: 'C' }, { _id: 2, a: 'b' }];
        expect(sortBy(arr, { '!_id': 1, a: 1 }, 'i')).toEqual([{ _id: 2, a: 'A' }, { _id: 2, a: 'b' }, { _id: 1, a: 'C' }])
    });
    it('should sort the array by multiple fields as object where object has equivalent', () => {
        let arr = [{ _id: 2, a: 'A' }, { _id: 2, a: 'A' }, { _id: 1, a: null }, { a: 'b' }, { _id: 1, a: 1 }, { a: 'b' }];
        const expected = [{ _id: 2, a: 'A' }, { _id: 2, a: 'A' }, { _id: 1, a: 1 }, { _id: 1, a: null }, { a: 'b' }, { a: 'b' }];
        expect(sortBy(arr, { _id: -1, a: 1 }, 'i')).toEqual(expected)
    });
    it('should sort the array using primer', () => {
        let arr = [{ _id: 2 }, { _id: 1 }, { _id: 3 }, { _id: 4 }];
        const expected = [{ _id: 2 }, { _id: 4 }, { _id: 1 }, { _id: 3 }];
        const primer = (value, prop) => value % 2;
        const lookup = {};
        expect(sortBy(arr, { _id: 1 }, null, primer, lookup)).toEqual(expected);
    });
    it('should sort the array using lookup', () => {
        let arr = [{ _id: 2 }, { _id: 1 }, { _id: 3 }, { _id: 4 }];
        const expected = [{ _id: 2 }, { _id: 4 }, { _id: 1 }, { _id: 3 }];
        const lookup = {
            1: { _id: 1 },
            2: { _id: 0 },
            3: { _id: 1 },
            4: { _id: 0 }
        };
        expect(sortBy(arr, { _id: 1 }, null, null, lookup)).toEqual(expected);
    });
});
