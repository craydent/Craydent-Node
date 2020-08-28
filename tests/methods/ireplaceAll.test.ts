import ireplaceAll from '../../modules/methods/ireplaceAll';
jest.mock('../../modules/protected/_replaceAll', () => {
    return {
        "default": (...args) => _replaceAll.apply(this, args)
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