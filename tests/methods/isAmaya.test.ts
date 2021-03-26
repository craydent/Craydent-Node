import isAmaya from '../../compiled/transformedMinor/craydent.isamaya';
describe('isAmaya', () => {
    it('should check if browser is Amaya', () => {
        const dis:any = { navigator: { userAgent: 'amaya' } };
        expect(isAmaya.call(dis)).toBe(true);
    })
});
