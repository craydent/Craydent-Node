import $COMMIT from '../../compiled/transformedMinor/craydent.http.commit';
import * as $COOKIE from '../../compiled/transformedMinor/craydent.http.cookie';
jest.mock('../../compiled/transformedMinor/craydent.http.cookie', () => {
    return {
        "default": jest.fn()
    }
});
jest.mock('../../compiled/transformedMinor/craydent.http.commit/protected/_invokeHashChange', () => {
    return {
        "default": () => { _invokeHashChange(); }
    }
});
let _invokeHashChange = () => { };
describe('$COMMIT', () => {
    let loc = window.location;
    beforeEach(() => {
        delete (window as any).location;
        window.location = {} as any;
        _invokeHashChange = () => { };

        delete ($COMMIT as any)['hash'];
        delete ($COMMIT as any)['noHistory'];
        delete ($COMMIT as any)['onhashchange'];
        delete ($COMMIT as any)['search'];
        delete ($COMMIT as any)['update'];


    });
    afterAll(() => {
        loc && ((global as any).location = loc);
    })
    it('should do nothing when commiting without changes', () => {
        $COMMIT();
        expect(window.location).toEqual({});
    });
    it('should call $ROLLBACK and do nothing when commiting without changes but update is true', () => {
        ($COMMIT as any)['update'] = true;
        $COMMIT();
        expect(window.location).toEqual({});
    });
    it('should set href when commiting without options and search has changed', () => {
        ($COMMIT as any)['update'] = true;
        ($COMMIT as any)['search'] = 'search';
        $COMMIT();
        expect(window.location.href).toBe('search');
    });
    it('should set href when commiting without options and hash has changed', () => {
        ($COMMIT as any)['update'] = true;
        ($COMMIT as any)['search'] = '';
        ($COMMIT as any)['hash'] = '#hash';
        $COMMIT();
        expect($COOKIE.default).toHaveBeenCalledWith("CRAYDENTHASH", '#hash');
        expect(window.location.hash).toBe('#hash');
    });
    it('should set href when commiting without options and search and hash has changed', () => {
        ($COMMIT as any)['update'] = true;
        ($COMMIT as any)['search'] = 'search';
        ($COMMIT as any)['hash'] = '#hash';
        $COMMIT();
        expect(window.location.href).toBe('search#hash');
    });
    it('should call replace when commiting with options and search has changed', () => {
        location.replace = jest.fn();
        ($COMMIT as any)['update'] = true;
        ($COMMIT as any)['search'] = 'search';
        $COMMIT({ noHistory: true });
        expect(location.replace).toHaveBeenCalledWith('search');
    });
    it('should call replace when commiting with options and hash has changed', () => {
        location.replace = jest.fn();
        ($COMMIT as any)['update'] = true;
        ($COMMIT as any)['search'] = '';
        ($COMMIT as any)['hash'] = 'hash';
        $COMMIT({ noHistory: true });
        expect(location.replace).toHaveBeenCalledWith('#hash');
        expect($COOKIE.default).toHaveBeenCalledWith("CRAYDENTHASH", '#hash');
    });
    it('should call replace when commiting with options and search and hash has changed', () => {
        location.replace = jest.fn();
        ($COMMIT as any)['update'] = true;
        ($COMMIT as any)['search'] = 'search';
        ($COMMIT as any)['hash'] = '#hash';
        $COMMIT({ noHistory: true });
        expect(location.replace).toHaveBeenCalledWith('search#hash');
    });
    it('should call replace when commiting with options as "noHistory"', () => {
        location.replace = jest.fn();
        ($COMMIT as any)['update'] = true;
        ($COMMIT as any)['search'] = 'search';
        $COMMIT("noHistory");
        expect(location.replace).toHaveBeenCalledWith('search');
    });
    it('should call replace when commiting with options as "h"', () => {
        location.replace = jest.fn();
        ($COMMIT as any)['update'] = true;
        ($COMMIT as any)['search'] = 'search';
        $COMMIT("h");
        expect(location.replace).toHaveBeenCalledWith('search');
    });
});
