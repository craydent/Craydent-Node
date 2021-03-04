import $GET from '../../compiled/transformedMinor/craydent.http.get';
import * as $COMMIT from '../../compiled/transformedMinor/craydent.http.commit';
jest.mock('../../compiled/transformedMinor/craydent.http.commit', () => {
    return {
        "default": {}
    }
});
describe('$GET', () => {
    describe('NodeJS', () => {
        const win = window;
        beforeAll(() => {
            delete (window as any).window;
        });
        afterAll(() => {
            (global as any).window = win;
        });

        it('should return {} when there are no values', () => {
            const dis = { location: {} }
            expect($GET.call(dis)).toEqual({});
        });
        it('should get all values', () => {
            const dis = { location: { search: 'key=value', hash: '@key2=value2' } };
            expect($GET.call(dis,)).toEqual({ key: 'value', key2: 'value2' });
            expect($GET.call(dis,)).toEqual({ key: 'value', key2: 'value2' });
        });
        it('should get all values from provided url', () => {
            const dis = { location: { search: 'key=value', hash: '@key2=value2' } };
            expect($GET.call(dis, { url: '?keys=values#@keys2=values2' })).toEqual({ keys: 'values', keys2: 'values2' });
            expect($GET.call(dis, { url: '?keys=values' })).toEqual({ keys: 'values' });
            expect($GET.call(dis, { url: 'http://www.example.com?keys=values=value' })).toEqual({ keys: 'values=value' });
            expect($GET.call(dis, 'keys', 'http://www.example.com?keys=values=value#@keys2=values2')).toEqual('values=value');
            expect($GET.call(dis, 'keys2', 'http://www.example.com?keys=values=value#@keys2=values2')).toEqual('values2');
        });
        it('should get value', () => {
            const dis = { location: { search: 'key=value' } };
            expect($GET.call(dis, 'key')).toBe('value');
        });
        it('should get value ignoring case', () => {
            const dis = { location: { search: 'KEY=value' } };
            expect($GET.call(dis, 'key', { ignoreCase: true })).toBe('value');
            expect($GET.call(dis, 'key', 'ignoreCase')).toBe('value');
        });
        it('should get value from option', () => {
            const dis = { location: { search: 'key=value' } };
            expect($GET.call(dis, 'key', { url: 'key=thevalue' })).toBe('thevalue');
        });
        it('should not get value', () => {
            const dis = { location: { search: 'key=value' } };
            expect($GET.call(dis, 'keys')).toBe(null);
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
            ($COMMIT as any).default = {};
        });
        afterAll(() => {
            location && ((window as any).location = location);
        })

        it('should return {} when there are no values', () => {
            expect($GET()).toEqual({});
        });
        it('should get all values', () => {
            window.location.search = 'key=value';
            window.location.hash = '@key2=value2';
            expect($GET()).toEqual({ key: 'value', key2: 'value2' });
            window.location.search = '?key=value';
            window.location.hash = '#@key2=value2';
            expect($GET()).toEqual({ key: 'value', key2: 'value2' });
        });
        it('should get all values from provided url', () => {
            window.location.search = 'key=value';
            window.location.hash = '@key2=value2';
            expect($GET({ url: '?keys=values#@keys2=values2' })).toEqual({ keys: 'values', keys2: 'values2' });
            expect($GET({ url: '?keys=values' })).toEqual({ keys: 'values' });
            expect($GET({ url: 'http://www.example.com?keys=values=value' })).toEqual({ keys: 'values=value' });
            expect($GET('keys', 'http://www.example.com?keys=values=value#@keys2=values2')).toEqual('values=value');
            expect($GET('keys2', 'http://www.example.com?keys=values=value#@keys2=values2')).toEqual('values2');
        });
        it('should get value', () => {
            window.location.search = 'key=value';
            expect($GET('key')).toBe('value');
        });
        it('should get value ignoring case', () => {
            window.location.search = 'KEY=value';
            expect($GET('key', { ignoreCase: true })).toBe('value');
            expect($GET('key', 'ignoreCase')).toBe('value');
        });
        it('should get value from option', () => {
            window.location.search = 'key=value';
            expect($GET('key', { url: 'key=thevalue' })).toBe('thevalue');
        });
        it('should not get value', () => {
            window.location.search = 'key=value';
            expect($GET('keys')).toBe(null);
        });
        it('should get value when deferred', () => {
            window.location.search = 'key=value';
            window.location.hash = '@key2=value2';
            expect($GET('key', { defer: true })).toBe(null);
        });
        it('should get value when deferred with previous values', () => {
            window.location.search = 'key=value';
            window.location.hash = '@key2=value2';
            ($COMMIT as any).default.hash = '@key2=value2Deferred';
            ($COMMIT as any).default.search = 'key=valueDeferred';
            expect($GET('key', { defer: true })).toBe('valueDeferred');
        });
    })
});
