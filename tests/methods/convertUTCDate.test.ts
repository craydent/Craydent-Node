import convertUTCDate from '../../compiled/transformedMinor/craydent.convertutcdate';
describe('convertUTCDate', () => {
    it('should convertUTCDate', () => {
        expect(convertUTCDate("2020-07-23 03:11:17.585Z", '/')).toBe('2020-07-23 03:11:17.585Z');
        expect(convertUTCDate("2020-07-23 03:11:17.585Z")).toBe('07/23/2020 03:11:17');
        expect(convertUTCDate("2020-07-23 03:11:17.0")).toBe('07/23/2020 03:11:17');
    })
});
