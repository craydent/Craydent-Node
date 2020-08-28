import isChrome from '../../modules/methods/isChrome';
describe('isChrome', () => {
    it('should check if browser is Chrome', () => {
        const dis = { navigator: { userAgent: 'chrome' } };
        expect(isChrome.call(dis)).toBe(true);
    })
});
