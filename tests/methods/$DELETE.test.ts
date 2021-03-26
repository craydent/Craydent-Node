import $DELETE from '../../compiled/transformedMinor/craydent.http.delete';
import * as $COMMIT from '../../compiled/transformedMinor/craydent.http.commit';
jest.mock('../../compiled/transformedMinor/craydent.http.commit', () => {
    return {
        "default": {}
    }
});
jest.mock('../../compiled/transformedMinor/craydent.http.delete/protected/_invokeHashChange', () => {
    return {
        "default": () => { _invokeHashChange(); }
    }
});
jest.mock('../../compiled/transformedMinor/craydent.http.delete/protected/_verbPayloadHelper', () => {
    return {
        "default": (dis: any, variable: any, method: any, options: any) => { _verbPayloadHelper(dis, variable, method, options); }
    }
});
let _invokeHashChange = () => { }, _verbPayloadHelper = (dis: any, variable: any, method: any, options: any) => { };
describe('$DELETE', () => {
    describe('NodeJS', () => {
        const win = window;
        beforeAll(() => {
            delete (window as any).window;
        });
        afterAll(() => {
            (global as any).window = win;
        });
        beforeEach(() => {
            _verbPayloadHelper = () => { };
        });
        it('should run nodeJS logic', () => {
            const dis: any = {};
            _verbPayloadHelper = jest.fn();
            $DELETE.call(dis, '');
            expect(_verbPayloadHelper).toHaveBeenCalledWith(dis, '', 'delete', undefined);
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
            _invokeHashChange = () => { };
        });
        afterAll(() => {
            location && ((window as any).location = location);
        })
        it('should not delete single when variable does not exist', () => {
            _invokeHashChange = jest.fn();
            window.location.search = '?variable=value';
            expect($DELETE('variables')).toBe(true);
            expect(window.location.search).toBe('?variable=value');
            expect(_invokeHashChange).not.toHaveBeenCalled();
        });
        it('should delete single in search', () => {
            _invokeHashChange = jest.fn();
            window.location.search = '?variable=value';
            expect($DELETE('variable')).toBe(true);
            expect(window.location.search).toBe('?');
            expect(_invokeHashChange).not.toHaveBeenCalled();
        });
        it('should delete multiple in search and ignore case', () => {
            _invokeHashChange = jest.fn();
            window.location.search = '?VARIABLE=value&variable2=2';
            expect($DELETE(['variable', 'variable2'], 'ignoreCase')).toBe(true);
            expect(window.location.search).toBe('?');
            expect(_invokeHashChange).not.toHaveBeenCalled();
        });
        it('should delete single in hash', () => {
            _invokeHashChange = jest.fn();
            window.location.hash = '#@variable=value';
            expect($DELETE('variable')).toBe(true);
            expect(window.location.hash).toBe('#');
            expect(_invokeHashChange).toHaveBeenCalled();
        });
        it('should defer delete single in search', () => {
            _invokeHashChange = jest.fn();
            window.location.search = '?variable=value';
            expect($DELETE('variable', { defer: true })).toBe(true);
            expect(window.location.search).toBe('?variable=value');
            expect(_invokeHashChange).not.toHaveBeenCalled();
            expect(($COMMIT.default as any)['search']).toBe('?');
            expect(($COMMIT.default as any)['update']).toBe(true);
        });
        it('should delete single in search without adding history using options object and ignore case', () => {
            _invokeHashChange = jest.fn();
            window.location.search = '?VARiable=value';
            expect($DELETE('variable', { noHistory: true, ignoreCase: true })).toBe(true);
            expect(_invokeHashChange).not.toHaveBeenCalled();
            expect(window.location.replace).toHaveBeenCalledWith('?');
        });
        it('should delete single in search without adding history using "noHistory"', () => {
            _invokeHashChange = jest.fn();
            window.location.search = '&variable=value';
            expect($DELETE('variable', 'noHistory')).toBe(true);
            expect(_invokeHashChange).not.toHaveBeenCalled();
            expect(window.location.replace).toHaveBeenCalledWith('?');
        });

        it('should defer delete single in hash without adding history using "h"', () => {
            _invokeHashChange = jest.fn();
            window.location.hash = '@variable=value';
            expect($DELETE('variable', 'h')).toBe(true);
            expect(_invokeHashChange).not.toHaveBeenCalled();
            expect(window.location.replace).toHaveBeenCalledWith('#');
        });
    })
});