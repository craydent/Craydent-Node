import replaceAll from '../../modules/methods/replaceAll';
jest.mock('../../modules/protected/_replaceAll', () => {
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