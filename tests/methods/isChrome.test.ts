import isChrome from '../../compiled/transformedMinor/craydent.ischrome';
describe('isChrome', () => {
    it('should check if browser is Chrome', () => {
        const dis: any = { navigator: { userAgent: 'chrome' } };
        expect(isChrome.call(dis)).toBe(true);
    })
});
