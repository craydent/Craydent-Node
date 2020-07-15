import _invokeHashChange from '../../modules/protected/_invokeHashChange';
import { $c } from '../../modules/private/__common';
import isNull from '../../modules/methods/isNull';
jest.mock('../../modules/methods/isFunction', () => {
    return {
        "default": (obj: any) => {
            if (isNull(obj)) { return false; }
            let a = obj.constructor == Function || obj._isMockFunction || false;
            return obj.constructor == Function || obj._isMockFunction || false;
        }
    }
});
describe('_invokeHashChange', () => {
    let $COMMIT: any,
        onhashchange: any;
    beforeAll(() => {
        $COMMIT = $c.$COMMIT;
        onhashchange = $c.onhashchange;
    });
    afterAll(() => {
        $c.$COMMIT = $COMMIT;
        $c.onhashchange = onhashchange;
    });
    beforeEach(() => {
        $c.$COMMIT = {};
        $c.onhashchange = undefined;
    });
    it('should invoke onhashchange on the $COMMIT', () => {
        const onhashchange = jest.fn();
        $c.$COMMIT = { onhashchange };
        _invokeHashChange();
        expect(onhashchange).toHaveBeenCalled();
    });
    it('should invoke onhashchange on the $c', () => {
        const onhashchange = jest.fn();
        $c.onhashchange = onhashchange;
        _invokeHashChange();
        expect(onhashchange).toHaveBeenCalled();
    });
    it('should not invoke onhashchange when invalid', () => {
        $c.$COMMIT = { onhashchange: true }
        expect(_invokeHashChange()).toBe(false);
    });

});