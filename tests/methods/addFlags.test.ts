import addFlags from '../../modules/methods/addFlags';
describe('addFlags', () => {
    it('should add flags to the RegExp when it does not exist', () => {
        const regex = /a/, expected = /a/gim;
        expect(addFlags(regex, 'gim')).toEqual(expected);
    });
    it('should add flags to the RegExp', () => {
        const regex = /a/gim, expected = /a/gim;
        expect(addFlags(regex, '')).toEqual(expected);
    });
});
