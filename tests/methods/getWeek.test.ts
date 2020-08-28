import getWeek from '../../modules/methods/getWeek';
describe('getWeek', () => {
    it('should get the numberic week of the year', () => {
        const date = new Date('02/02/2020');
        expect(getWeek(date)).toBe(6);
    })
});
