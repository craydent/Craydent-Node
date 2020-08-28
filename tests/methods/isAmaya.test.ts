import isAmaya from '../../modules/methods/isAmaya';
describe('isAmaya', () => {
    it('should check if browser is Amaya', () => {
        const dis = { navigator: { userAgent: 'amaya' } };
        expect(isAmaya.call(dis)).toBe(true);
    })
});
