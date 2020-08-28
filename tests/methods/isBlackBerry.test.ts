import isBlackBerry from '../../modules/methods/isBlackBerry';
describe('isBlackBerry', () => {
    it('should check if browser is BlackBerry', () => {
        const dis = { navigator: { userAgent: 'blackberry' } };
        expect(isBlackBerry.call(dis)).toBe(true);
    })
});
