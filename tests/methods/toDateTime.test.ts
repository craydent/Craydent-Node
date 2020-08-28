import toDateTime from '../../modules/methods/toDateTime';

jest.mock('../../modules/methods/format', () => {
    return {
        "default": (...args) => format.apply(this, args)
    }
});
let format = () => { }
describe('toDateTime', () => {
    beforeEach(() => {
        format = () => { }
    });
    it('should convert sql date string to date time', () => {
        format = jest.fn();
        expect(toDateTime('2019-01-02')).toEqual(new Date('01/02/2019'));
        expect(format).not.toHaveBeenCalled();
    });
    it('should convert sql date string to formatted date time', () => {
        format = jest.fn(() => '2019');
        expect(toDateTime('2019-01-02', { format: 'Y' })).toEqual('2019');
        expect(format).toHaveBeenCalledWith(new Date('01/02/2019'), 'Y');
    });
    it('should convert date string to date time', () => {
        expect(toDateTime('01/02/2019 8:00am')).toEqual(new Date('01/02/2019 8:00 am'));
        expect(toDateTime('(01.02.2019)')).toEqual(new Date('01/02/2019'));
        expect(toDateTime('(2019.01.02)')).toEqual(new Date('01/02/2019'));
        expect(toDateTime('19.20.01')).toEqual(new Date('01/20/2019'));
        expect(toDateTime('(99-01-20)')).toEqual(new Date('01/20/1999'));
        expect(toDateTime('(99-20-02)')).toEqual(new Date('02/20/1999'));
        expect(toDateTime('30.03.2019')).toEqual(new Date('03/30/2019'));
        expect(toDateTime('30/03/2019')).toEqual(new Date('03/30/2019'));
        expect(toDateTime('(01-Feb-2019)')).toEqual(new Date('02/01/2019'));
        expect(toDateTime('2019-01-02', { gmt: true, offset: 0 })).toEqual(new Date('01/02/2019'));

    });
});