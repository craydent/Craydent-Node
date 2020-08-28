import isAndroid from '../../modules/methods/isAndroid';
describe('isAndroid', () => {
    it('should check if browser is Android', () => {
        const dis = { navigator: { userAgent: 'android' } };
        expect(isAndroid.call(dis)).toBe(true);
    })
});
