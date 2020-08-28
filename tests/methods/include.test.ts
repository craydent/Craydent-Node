import include from '../../modules/methods/include';
jest.mock('../../modules/methods/clearCache', () => {
    return {
        "default": (...args) => clearCache.apply(this, args)
    }
});
let clearCache = () => { }
jest.mock('../../modules/methods/absolutePath', () => {
    return {
        "default": (...args) => absolutePath.apply(this, args)
    }
});
let absolutePath = () => { }
describe('include', () => {
    beforeEach(() => {
        clearCache = jest.fn();
        absolutePath = jest.fn();
    })
    it('should return null if module does not exist', () => {
        absolutePath = jest.fn().mockImplementationOnce(() => 'fakeModule');
        expect(include('fakeModule', true)).toEqual(null);
        expect(clearCache).toHaveBeenCalledWith('fakeModule');
        expect(absolutePath).toHaveBeenCalledWith('fakeModule');
    })
    it('should find jest', () => {
        expect(include('jest')).toBeTruthy();
        expect(absolutePath).not.toHaveBeenCalled();
    })
    it('should find /fakeModule', () => {
        absolutePath = jest.fn().mockImplementationOnce(() => 'jest');

        expect(include('/fakeModule')).toBeTruthy();
        expect(absolutePath).toHaveBeenCalledWith('/fakeModule');
    })
    it('should find ../fakeModule', () => {
        absolutePath = jest.fn().mockImplementationOnce(() => 'jest');
        expect(include('../fakeModule')).toBeTruthy();
        expect(absolutePath).toHaveBeenCalledWith('../fakeModule');
    })
    it('should find fakeModule', () => {
        absolutePath = jest.fn().mockImplementationOnce(() => 'jest');
        expect(include('fakeModule')).toBeTruthy();
        expect(absolutePath).toHaveBeenCalledWith('fakeModule');
    })
});
