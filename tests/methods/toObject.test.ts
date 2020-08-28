import toObject from '../../modules/methods/toObject';
describe('toObject', () => {
    it('should url query string to object', () => {
        expect(toObject('?q=1&r=string')).toEqual({ q: '1', r: 'string' });
        expect(toObject('q=1&r=string')).toEqual({ q: '1', r: 'string' });
    })
});
