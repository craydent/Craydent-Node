import isBlackBerry from '../../compiled/transformedMinor/craydent.isblackberry';
describe('isBlackBerry', () => {
    it('should check if browser is BlackBerry', () => {
        const dis: any = { navigator: { userAgent: 'blackberry' } };
        expect(isBlackBerry.call(dis)).toBe(true);
    })
});
