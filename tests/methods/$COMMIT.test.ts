import $COMMIT from '../../modules/methods/$COMMIT';
import * as $ROLLBACK from '../../modules/methods/$ROLLBACK';
import * as $COOKIE from '../../modules/methods/$COOKIE';
jest.mock('../../modules/methods/$COOKIE', () => {
    return {
        "default": jest.fn()
    }
});
jest.mock('../../modules/methods/$ROLLBACK', () => {
    return {
        "default": jest.fn()
    }
});
jest.mock('../../modules/protected/_invokeHashChange', () => {
    return {
        "default": () => { _invokeHashChange(); }
    }
});
let _invokeHashChange = () => { };
describe('$COMMIT', () => {
    let loc = window.location;
    beforeEach(() => {
        delete window.location;
        window.location = {} as any;
        _invokeHashChange = () => { };

        delete $COMMIT['hash'];
        delete $COMMIT['noHistory'];
        delete $COMMIT['onhashchange'];
        delete $COMMIT['search'];
        delete $COMMIT['update'];
    });
    afterAll(() => {
        loc && ((global as any).location = loc);
    })
    it('should do nothing when commiting without changes', () => {
        $COMMIT();
        expect(window.location).toEqual({});
    });
    it('should call $ROLLBACK and do nothing when commiting without changes but update is true', () => {
        $COMMIT['update'] = true;
        $COMMIT();
        expect(window.location).toEqual({});
        expect($ROLLBACK.default).toHaveBeenCalled();
    });
    it('should set href when commiting without options and search has changed', () => {
        $COMMIT['update'] = true;
        $COMMIT['search'] = 'search';
        $COMMIT();
        expect($ROLLBACK.default).toHaveBeenCalled();
        expect(window.location.href).toBe('search');
    });
    it('should set href when commiting without options and hash has changed', () => {
        $COMMIT['update'] = true;
        $COMMIT['search'] = '';
        $COMMIT['hash'] = '#hash';
        $COMMIT();
        expect($ROLLBACK.default).toHaveBeenCalled();
        expect($COOKIE.default).toHaveBeenCalledWith("CRAYDENTHASH", '#hash');
        expect(window.location.hash).toBe('#hash');
    });
    it('should set href when commiting without options and search and hash has changed', () => {
        $COMMIT['update'] = true;
        $COMMIT['search'] = 'search';
        $COMMIT['hash'] = '#hash';
        $COMMIT();
        expect($ROLLBACK.default).toHaveBeenCalled();
        expect(window.location.href).toBe('search#hash');
    });
    it('should call replace when commiting with options and search has changed', () => {
        location.replace = jest.fn();
        $COMMIT['update'] = true;
        $COMMIT['search'] = 'search';
        $COMMIT({ noHistory: true });
        expect(location.replace).toHaveBeenCalledWith('search');
        expect($ROLLBACK.default).toHaveBeenCalled();
    });
    it('should call replace when commiting with options and hash has changed', () => {
        location.replace = jest.fn();
        $COMMIT['update'] = true;
        $COMMIT['search'] = '';
        $COMMIT['hash'] = 'hash';
        $COMMIT({ noHistory: true });
        expect(location.replace).toHaveBeenCalledWith('#hash');
        expect($ROLLBACK.default).toHaveBeenCalled();
        expect($COOKIE.default).toHaveBeenCalledWith("CRAYDENTHASH", '#hash');
    });
    it('should call replace when commiting with options and search and hash has changed', () => {
        location.replace = jest.fn();
        $COMMIT['update'] = true;
        $COMMIT['search'] = 'search';
        $COMMIT['hash'] = '#hash';
        $COMMIT({ noHistory: true });
        expect(location.replace).toHaveBeenCalledWith('search#hash');
        expect($ROLLBACK.default).toHaveBeenCalled();
    });
    it('should call replace when commiting with options as "noHistory"', () => {
        location.replace = jest.fn();
        $COMMIT['update'] = true;
        $COMMIT['search'] = 'search';
        $COMMIT("noHistory");
        expect(location.replace).toHaveBeenCalledWith('search');
        expect($ROLLBACK.default).toHaveBeenCalled();
    });
    it('should call replace when commiting with options as "h"', () => {
        location.replace = jest.fn();
        $COMMIT['update'] = true;
        $COMMIT['search'] = 'search';
        $COMMIT("h");
        expect(location.replace).toHaveBeenCalledWith('search');
        expect($ROLLBACK.default).toHaveBeenCalled();
    });
});
