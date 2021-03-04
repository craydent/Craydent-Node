import getGMTOffset from '../../compiled/transformedMinor/craydent.getgmtoffset';
describe('getGMTOffset', () => {
    it('should getGMTOffset based on options', () => {
        const date = new Date('2020-02-02T08:00:00.000Z');
        expect(getGMTOffset(date)).toBe(date.getHours() - date.getUTCHours());
    })
});


