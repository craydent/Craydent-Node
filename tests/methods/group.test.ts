import group from '../../compiled/transformedMinor/craydent.group';
describe('group', () => {
    it('should retrieve grouped list using field', () => {
        const arr = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: [1, 3] }];
        const expected = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const result = group(arr, { field: ['id'] });
        expect(result).toEqual(expected);
    })
    it('should retrieve grouped list using key', () => {
        const arr = [{ id: 1 }, { id: 1 }, { id: 2 }];
        const expected = [{ id: 1 }, { id: 2 }];
        const result = group(arr, { key: 'id' });
        expect(result).toEqual(expected);
    })
    it('should retrieve grouped list using key with condition and finalize', () => {
        const arr = [{ id: 1 }, { id: 1 }, { id: 2 }];
        const expected = [{ id: 1 }];
        const result = group(arr, {
            key: ['id'],
            cond: { $where: function () { return this.id == 1 } },
            finalize: () => { }
        });
        expect(result).toEqual(expected);

    })
    it('should retrieve grouped list using keyf as a function', () => {
        const arr = [{ id: 1 }, { id: 1 }, { id: 2 }];
        const expected = [{ id: 1 }, { id: 2 }];
        const result = group(arr, { keyf: () => ['id'] });
        expect(result).toEqual(expected);
    })
    it('should retrieve grouped list using keyf as a value', () => {
        const arr = [{ id: 1 }, { id: 1 }, { id: 2 }];
        const expected = [{ id: 1 }, { id: 2 }];
        const result = group(arr, { keyf: ['id'] });
        expect(result).toEqual(expected);
    })
    it('should retrieve grouped list using multiple fields', () => {
        const arr = [{ id: 1, p: 1 }, { id: 1, p: 1 }, { id: 1, p: 2 }, { id: 2 }];
        const expected = [{ id: 1, p: 1 }, { id: 1, p: 2 }, { id: 2 }];
        const result = group(arr, { field: ['id', 'p'] }, true);
        expect(result).toEqual(expected);
    })
});
