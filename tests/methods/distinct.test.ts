import distinct from '../../modules/methods/distinct';
describe('distinct', () => {
    it('should retrieve distinct list', () => {
        const arr = [{ id: 1 }, { id: 1 }, { id: 2 }];
        const expected = [1, 2];
        const result = distinct(arr, 'id', {});
        expect(result).toEqual(expected);
    })
    it('should retrieve distinct list using multiple fields', () => {
        const arr = [{ id: 1, p: 1 }, { id: 1, p: 1 }, { id: 1, p: 2 }, { id: 2 }];
        const expected = [{ id: 1, p: 1 }, { id: 1, p: 2 }, { id: 2 }];
        const result = distinct(arr, ['id', 'p'], {});
        expect(result).toEqual(expected);
    })
});
