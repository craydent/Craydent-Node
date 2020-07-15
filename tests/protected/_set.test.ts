import _set from '../../modules/protected/_set';
import $COMMIT from '../../modules/methods/$COMMIT';
import * as $COOKIE from '../../modules/methods/$COOKIE';
jest.mock('../../modules/methods/$COMMIT', () => {
    return {
        "default": {}
    }
});
jest.mock('../../modules/methods/$COOKIE', () => {
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
describe('_set', () => {
    beforeEach(() => {
        _invokeHashChange = () => { };
        delete $COMMIT['hash'];
        delete $COMMIT['noHistory'];
        delete $COMMIT['onhashchange'];
        delete $COMMIT['search'];
        delete $COMMIT['update'];
    });
    it('should set $COMMIT or loc', () => {
        let loc = { search: '&a=value&b=value&c=value', hash: '' };
        expect(_set('A', 'avalue', true, { ignoreCase: true }, loc)).toBe(loc);
        expect($COMMIT['search']).toBe('?a=avalue&b=value&c=value');
        expect(_set('B', 'bvalue', true, 'ignoreCase', loc)).toBe(loc);
        expect($COMMIT['search']).toBe('?a=avalue&b=bvalue&c=value');
        expect(_set('C', 'cvalue', true, 'i', loc)).toBe(loc);
        expect($COMMIT['search']).toBe('?a=avalue&b=bvalue&c=value&C=cvalue');
    });
    it('should defer update existing search value', () => {
        let loc = { search: 's=something', hash: '' };
        $COMMIT['search'] = '&s=something';
        expect(_set('s', 'search', true, 'i', loc)).toBe(loc);
        expect($COMMIT['search']).toBe('?s=search');
        expect($COMMIT['update']).toBe(true);
    });
    it('should defer adding new search value using location argument', () => {
        let loc = { search: '', hash: '' };
        expect(_set('a', 'search', true, 'i', loc)).toBe(loc);
        expect($COMMIT['search']).toBe('?a=search');
        expect($COMMIT['update']).toBe(true);
    });
    it('should defer adding new search value having previous values in $COMMIT', () => {
        let loc = { search: 'something', hash: '' };
        $COMMIT['search'] = '?s=something';
        expect(_set('a', 'search', true, 'i', loc)).toBe(loc);
        expect($COMMIT['search']).toBe('?s=something&a=search');
        expect($COMMIT['update']).toBe(true);
    });
    it('should update existing search value', () => {
        let loc = { search: '&s=something', hash: '' };
        expect(_set('s', 'search', false, 'i', loc)).toBe(loc);
        expect(loc['search']).toBe('?s=search');
    });
    it('should _invokeHashChange when using hash', () => {
        let loc = { search: '&s=something', hash: '#' }
        _invokeHashChange = jest.fn();
        expect(_set('@a', 'search', false, 'i', loc)).toBe(loc);
        expect(loc['hash']).toBe('#@a=search');
        expect($COOKIE.default).toHaveBeenCalledWith("CRAYDENTHASH", '@a=search');
        expect(_invokeHashChange).toHaveBeenCalled();
    });
    it('should adding new hash value having previous values in location', () => {
        let loc = { search: '', hash: '@s=something' }
        _invokeHashChange = jest.fn();
        expect(_set('@a', 'search', false, 'i', loc)).toBe(loc);
        expect(loc['hash']).toBe('@s=something@a=search');
        expect($COOKIE.default).toHaveBeenCalledWith("CRAYDENTHASH", '@s=something@a=search');
        expect(_invokeHashChange).toHaveBeenCalled();
    });
});
