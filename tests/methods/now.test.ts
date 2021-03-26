import now from '../../compiled/transformedMinor/craydent.now';
jest.mock('../../compiled/transformedMinor/craydent.format', () => {
    return {
        "default": (...args: any[]) => format.apply(this, args as any)
    }
});
let format = () => { }
describe('now', () => {
    const RealDate = Date;
    beforeEach(() => {
        (global as any).Date = jest.fn(() => new RealDate('2019-04-22T10:20:30Z'));
        format = () => { }
    });
    afterEach(() => {
        global.Date = RealDate;
    });
    it('should retrieve the current date time', () => {
        format = jest.fn();
        expect(now()).toEqual(new Date());
        expect(format).not.toHaveBeenCalled();
    });
    it('should retrieve the formatted current date time', () => {
        format = jest.fn(() => 'abc');
        expect(now('mdy')).toEqual('abc');
        expect(format).toHaveBeenCalledWith(new Date(), 'mdy');
    });
});