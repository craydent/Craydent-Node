import getDayOfYear from '../../modules/methods/getDayOfYear';
describe('getDayOfYear', () => {
    it('should get the numberic day of the year', () => {
        const date = new Date('02/02/2020');
        expect(getDayOfYear(date)).toBe(33);
    })
});
