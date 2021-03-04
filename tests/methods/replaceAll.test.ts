import replaceAll from '../../compiled/transformedMinor/craydent.replaceall';
jest.mock('../../compiled/transformedMinor/craydent.replaceall/protected/_replaceAll', () => {
    return {
        "default": (...args) => _replaceAll.apply(this, args)
    }
});
let _replaceAll = () => { }
describe('replaceAll', () => {
    beforeEach(() => {
        _replaceAll = () => { }
    });
    it('should do an inner join', () => {
        _replaceAll = jest.fn();
        replaceAll('str', 'replacer', 'subject');
        expect(_replaceAll).toHaveBeenCalledWith('str', 'replacer', 'subject', 'g');
    });
});