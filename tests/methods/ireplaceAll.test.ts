import ireplaceAll from '../../compiled/transformedMinor/craydent.ireplaceall';
jest.mock('../../compiled/transformedMinor/craydent.ireplaceall/protected/_replaceAll', () => {
    return {
        "default": (...args: any[]) => _replaceAll.apply(this, args as any)
    }
});
let _replaceAll = () => { }
describe('ireplaceAll', () => {
    beforeEach(() => {
        _replaceAll = () => { }
    });
    it('should do an inner join', () => {
        _replaceAll = jest.fn();
        ireplaceAll('str', 'replacer', 'subject');
        expect(_replaceAll).toHaveBeenCalledWith('str', 'replacer', 'subject', 'gi');
    });
});