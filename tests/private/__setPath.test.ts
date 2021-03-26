
import __setPath from '../../modules/private/__setPath';
import { CraydentHttp } from '../../modules/models/CraydentHttp';

describe('__setPath', () => {
    let http: CraydentHttp;
    beforeEach(() => {
        http = { routes: [] } as any
    })
    it('should accept no callback and string as path', () => {
        __setPath('get', http, '/path/1');
        expect(http).toEqual({ routes: [{ method: 'get', callback: [], path: '/path/1' }] });
    })
    it('should accept no callback and string[] as path', () => {
        __setPath('post', http, ['/path/2', '/path/3']);
        expect(http).toEqual({ routes: [{ method: 'post', callback: [], path: '/path/2' }, { method: 'post', callback: [], path: '/path/3' }] });
    })
    it('should accept function as callback', () => {
        let callback = () => { };
        __setPath('put', http, '/path/4', callback);
        expect(http).toEqual({ routes: [{ method: 'put', callback: [callback], path: '/path/4' }] });
    })
    it('should accept array of functions as callback', () => {
        let callbacks = [() => { }];
        __setPath('delete', http, ['/path/5'], callbacks);
        expect(http).toEqual({ routes: [{ method: 'delete', callback: callbacks, path: '/path/5' }] });
    })
    it('should accept mixture of Route and string paths as callback', () => {
        let callback = () => { };
        __setPath('delete', http, ['path6', { path: 'route', callback, method: 'delete' }], callback);
        expect(http).toEqual({
            routes: [
                { method: 'delete', callback: [callback], path: 'path6' },
                { method: 'delete', callback: [callback, callback], path: 'route' }
            ]
        });
    })
    it('should accept Route as path', () => {
        let callback = () => { };
        __setPath('all', http, { path: 'route2', callback, method: 'get' }, callback);
        expect(http).toEqual({ routes: [{ method: 'all', callback: [callback, callback], path: 'route2' }] });
    })
    it('should accept Route as path with no callback', () => {
        let callback = () => { };
        __setPath(null as any, http, { path: 'route3', callback: [callback], method: 'middleware' });
        expect(http).toEqual({ routes: [{ method: 'middleware', callback: [callback], path: 'route3' }] });
    })
    it('should accept Route as path with callback and route callback is null', () => {
        let callback = () => { };
        __setPath(null as any, http, { path: 'route4', callback: null, method: 'middleware' } as any, callback);
        expect(http).toEqual({ routes: [{ method: 'middleware', callback: [callback], path: 'route4' }] });
    })
    it('should accept Route as path with no callback and route callback is null', () => {
        __setPath(null as any, http, { path: 'route5', callback: null, method: 'middleware' } as any);
        expect(http).toEqual({ routes: [{ method: 'middleware', callback: [], path: 'route5' }] });
    })
    it('should accept asyc function as callback', () => {
        let callback = async () => { };
        __setPath('all', http, '/path/6', callback);
        expect(http).toEqual({ routes: [{ method: 'all', callback: [callback], path: '/path/6' }] });
    })
    it('should accept generator function as callback', () => {
        let callback = function* () { };
        __setPath('all', http, '/path/7', callback);
        expect(http).toEqual({ routes: [{ method: 'all', callback: [callback], path: '/path/7' }] });
    })

});
