import syncroit from '../../compiled/transformedMinor/craydent.syncroit';
describe('syncroit', () => {
    it('should allow generator methods to be called and wrapped in a Promise', async () => {
        const result = await syncroit(function* () {
            yield new Promise((res) => { res(1) });
            yield 10;
            return 1;
        });
        expect(result).toBe(1);
    })
    it('should allow asyncrounous methods to be called and wrapped in a Promise', async () => {
        const result = await syncroit(async () => { return 1; });
        expect(result).toBe(1);
    })
    it('should allow methods to be called async and wrapped in a Promise', async () => {
        const result = await syncroit(() => { return 1; });
        expect(result).toBe(1);
    })
});
