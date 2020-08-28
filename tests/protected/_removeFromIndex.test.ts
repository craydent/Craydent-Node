import _removeFromIndex from '../../modules/protected/_removeFromIndex';

describe('_removeFromIndex', () => {
    it('should remove from index when value exists', () => {
        const obj = { prop: 'value' };
        const buckets = {
            prop: { value: [obj], __bucket__keys: ['value'] }
        };
        const expected = {
            prop: { __bucket__keys: [] }
        }
        _removeFromIndex(buckets, obj)
        expect(buckets).toEqual(expected);
    });
    it('should fail when obj is null/undefined', () => {
        const buckets = {
            prop: { value: [], __bucket__keys: ['value'] }
        };
        const expected = {
            prop: { value: [], __bucket__keys: ['value'] }
        }
        _removeFromIndex(buckets, null);
        expect(buckets).toEqual(expected);
        _removeFromIndex(buckets, undefined);
        expect(buckets).toEqual(expected);
    });
    it('should remove not from index when value does not exist', () => {
        const obj = { prop: 'value' };
        const buckets = {
            prop: { value: [obj], __bucket__keys: ['value'] }
        };
        const expected = {
            prop: { value: [obj], __bucket__keys: ['value'] }
        }
        _removeFromIndex(buckets, { prop: 'value' });
        expect(buckets).toEqual(expected);
    });
});