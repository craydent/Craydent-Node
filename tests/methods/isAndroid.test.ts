import isAndroid from '../../compiled/transformedMinor/craydent.isandroid';
describe('isAndroid', () => {
    it('should check if browser is Android', () => {
        const dis: any = { navigator: { userAgent: 'android' } };
        expect(isAndroid.call(dis)).toBe(true);
    })
});
