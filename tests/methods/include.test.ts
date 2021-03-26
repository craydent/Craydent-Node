import include from '../../compiled/transformedMinor/craydent.include';
jest.mock('../../compiled/transformedMinor/craydent.clearcache', () => {
    return {
        "default": (...args: any[]) => clearCache.apply(this, args as any)
    }
});
let clearCache = () => { }
jest.mock('../../compiled/transformedMinor/craydent.absolutepath', () => {
    return {
        "default": (...args: any[]) => absolutePath.apply(this, args as any)
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
        expect(absolutePath).toHaveBeenCalledWith('fakeModule', 1);
    })
    it('should find jest', () => {
        expect(include('jest')).toBeTruthy();
        expect(absolutePath).not.toHaveBeenCalled();
    })
    it('should find /fakeModule', () => {
        absolutePath = jest.fn().mockImplementationOnce(() => 'jest');

        expect(include('/fakeModule')).toBeTruthy();
        expect(absolutePath).toHaveBeenCalledWith('/fakeModule', 1);
    })
    it('should find ../fakeModule', () => {
        absolutePath = jest.fn().mockImplementationOnce(() => 'jest');
        expect(include('../fakeModule')).toBeTruthy();
        expect(absolutePath).toHaveBeenCalledWith('../fakeModule', 1);
    })
    it('should find fakeModule', () => {
        absolutePath = jest.fn().mockImplementationOnce(() => 'jest');
        expect(include('fakeModule')).toBeTruthy();
        expect(absolutePath).toHaveBeenCalledWith('fakeModule', 1);
    })
});
