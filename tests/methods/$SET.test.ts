import $SET from '../../compiled/transformedMinor/craydent.http.set';
jest.mock('../../compiled/transformedMinor/craydent.http.set/protected/_set', () => {
    return {
        "default": (variable, value, defer, options, loc) => _set(variable, value, defer, options, loc)
    }
});
let _set = (variable, value, defer, options, loc) => loc;
describe('$SET', () => {
    describe('NodeJS', () => {
        const win = window;
        beforeAll(() => {
            delete (window as any).window;
        });
        afterAll(() => {
            (global as any).window = win;
        });
        it('should set location using object', () => {
            const dis = { location: { search: '', hash: '' } };
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET.call(dis, { theKey: 'theValue' });
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, {}, { search: '', hash: '' });
            expect(dis.location.search).toBe('theKey=theValue');
            expect(dis.location.hash).toBe('value');
        });
        it('should set location using strings', () => {
            const dis = { location: { search: '', hash: '' } };
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET.call(dis, 'theKey', 'theValue');
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, {}, { search: '', hash: '' });
            expect(dis.location.search).toBe('theKey=theValue');
            expect(dis.location.hash).toBe('value');
        });
        it('should set location using array of key/value pairs', () => {
            const dis = { location: { search: '', hash: '' } };
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET.call(dis, [{ variable: 'theKey', value: 'theValue' }]);
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, {}, { search: '', hash: '' });
            expect(dis.location.search).toBe('theKey=theValue');
            expect(dis.location.hash).toBe('value');
        });
        it('should set location using strings with options', () => {
            const dis = { location: { search: '', hash: '' } };
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET.call(dis, 'theKey', 'theValue', { ignoreCase: true });
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, { ignoreCase: true }, { search: '', hash: '' });
            expect(dis.location.search).toBe('theKey=theValue');
            expect(dis.location.hash).toBe('value');
        });
    });
    describe('JS', () => {
        let location = window.location;
        beforeEach(() => {
            delete (window as any).location;
            (window as any).location = {
                search: '',
                hash: '',
                href: '',
                replace: jest.fn()
            } as any;
        });
        afterAll(() => {
            location && ((window as any).location = location);
        })

        it('should set location using object', () => {
            window.location.search = '';
            window.location.hash = '';
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET({ theKey: 'theValue' });
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, {}, { search: '', hash: '' });
            expect(window.location.search).toBe('theKey=theValue');
            expect(window.location.hash).toBe('value');
        });
        it('should set location using object with options', () => {
            window.location.search = '';
            window.location.hash = '';
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET({ theKey: 'theValue' }, { noHistory: true });
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, { noHistory: true }, { search: '', hash: '' });
            expect(window.location.replace).toHaveBeenCalledWith('?theKey=theValue#value');
        });
        it('should set location using strings', () => {
            window.location.search = '';
            window.location.hash = '';
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET('theKey', 'theValue');
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, {}, { search: '', hash: '' });
            expect(window.location.search).toBe('theKey=theValue');
            expect(window.location.hash).toBe('value');
        });
        it('should set location using array of key/value pairs', () => {
            window.location.search = '';
            window.location.hash = '';
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET([{ variable: 'theKey', value: 'theValue' }]);
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, {}, { search: '', hash: '' });
            expect(window.location.search).toBe('theKey=theValue');
            expect(window.location.hash).toBe('value');
        });
        it('should set location using strings with options', () => {
            window.location.search = '';
            window.location.hash = '';
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET('theKey', 'theValue', {});
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, {}, { search: '', hash: '' });
            expect(window.location.search).toBe('theKey=theValue');
            expect(window.location.hash).toBe('value');
        });
        it('should not set location using strings with options when deferred', () => {
            window.location.search = '';
            window.location.hash = '';
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET('theKey', 'theValue', { ignoreCase: true, defer: true });
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', true, { ignoreCase: true, defer: true }, { search: '', hash: '' });
            expect(window.location.search).toBe('');
            expect(window.location.hash).toBe('');
        });
        it('should set location using strings with noHistory object', () => {
            window.location.search = '';
            window.location.hash = '';
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET('theKey', 'theValue', { noHistory: true });
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, { noHistory: true }, { search: '', hash: '' });
            expect(window.location.replace).toHaveBeenCalledWith('?theKey=theValue#value');
        });
        it('should set location using strings with "noHistory"', () => {
            window.location.search = '';
            window.location.hash = '';
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET('theKey', 'theValue', 'noHistory');
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, 'noHistory', { search: '', hash: '' });
            expect(window.location.replace).toHaveBeenCalledWith('?theKey=theValue#value');
        });
        it('should set location using strings with "h"', () => {
            window.location.search = '';
            window.location.hash = '';
            _set = jest.fn().mockImplementationOnce((key, value) => {
                return { search: `${key}=${value}`, hash: 'value' };
            });
            $SET('theKey', 'theValue', 'h');
            expect(_set).toHaveBeenCalledWith('theKey', 'theValue', false, 'h', { search: '', hash: '' });
            expect(window.location.replace).toHaveBeenCalledWith('?theKey=theValue#value');
        });
    });
});