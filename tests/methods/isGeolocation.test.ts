import isGeolocation from '../../compiled/transformedMinor/craydent.isgeolocation';
jest.mock('../../compiled/transformedMinor/craydent.isgeolocation/protected/_typeCheck', () => {
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
        const geo = {};
        isGeolocation(geo);
        expect(_typeCheck).toHaveBeenCalledWith(geo, "Geolocation", true);
    });
});