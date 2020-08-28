import Benchmarker from '../../modules/methods/benchmarker';
describe('benchmarker', () => {
    const RealDate = Date;
    beforeEach(() => {
        (global as any).Date = jest.fn()
            .mockImplementationOnce(() => new RealDate('2019-04-22T10:20:30Z'))
            .mockImplementationOnce(() => new RealDate('2019-04-22T10:20:31Z'));
    });
    afterEach(() => {
        global.Date = RealDate;
    });

    it('should give time diff', () => {
        let b = new Benchmarker();
        b.start();
        expect(b.stop()).toBe(1);
        expect(b.executionTime).toBe(1);
    });
});