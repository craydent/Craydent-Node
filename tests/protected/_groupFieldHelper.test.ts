import _groupFieldHelper from '../../modules/protected/_groupFieldHelper';
describe('_groupFieldHelper', () => {
    it('should retrieve group key', () => {
        expect(_groupFieldHelper({id:1,name:'name'},['id','name'])).toBe('id:1,name:name,');
        expect(_groupFieldHelper({id:1},['id','name'])).toBe('id:1,');
    })
});
