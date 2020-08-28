import isGeolocation from '../../modules/methods/isGeolocation';
jest.mock('../../modules/protected/_typeCheck', () => {
    return {
        "default": (...args) => _typeCheck.apply(this, args)
    }
});
let _typeCheck = () => { }
describe('isGeolocation', () => {
    beforeEach(() => {
        _typeCheck = () => { }
    });

    it('should check if value is a Generator', () => {
        _typeCheck = jest.fn(() => true);
        const geo =  { };
        isGeolocation(geo);
        expect(_typeCheck).toHaveBeenCalledWith(geo, "Geolocation", true);
    });
});