import toStringAlt from '../../modules/methods/toStringAlt';
describe('toStringAlt', () => {
    it('should convert the object to a string', () => {
        expect(toStringAlt({ a: {}, b: 2 })).toEqual('&a={}&b=2');
        expect(toStringAlt({ a: {}, b: 2 }, null, null, true)).toEqual('&a=%7B%7D&b=2');
    })
});
