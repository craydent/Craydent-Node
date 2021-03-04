import getWeek from '../../compiled/transformedMinor/craydent.getweek';
describe('getWeek', () => {
    it('should get the numberic week of the year', () => {
        const date = new Date('02/02/2020');
        expect(getWeek(date)).toBe(6);
    })
});
