import _ext from '../../modules/protected/_ext';
import * as Common from '../../modules/private/__common';
jest.mock('../../modules/private/__defineFunction');


declare var $g: any;
describe('_ext', () => {
    let g: any, func: any;
    let SomeClass: any;
    beforeEach(() => {
        Common.scope.eval = jest.fn().mockImplementationOnce(() => '');
        g = (global as any).$g;
        func = () => { };
        SomeClass = function () { }
    });
    afterEach(() => {
        if (g) { (global as any).$g = g; }
    });
    it('should not add prototype when noConflict mode', () => {
        $g.__craydentNoConflict = true;
        _ext(SomeClass, 'fake', func);
        expect(SomeClass.prototype.fake).toBeUndefined();
    });
    it('should not add prototype when override flag set to false and prototype exists', () => {
        $g.__craydentNoConflict = false;
        const fake = () => { }
        SomeClass.prototype.fake = fake;
        _ext(SomeClass, 'fake', func, false);
        expect(SomeClass.prototype.fake).toBe(fake);
        expect(SomeClass.prototype.fake).not.toBe(func);
    });
    it('should add prototype when override flag set to false and prototype does not exists', () => {
        $g.__craydentNoConflict = false;
        _ext(SomeClass, 'fake', func, false);
        expect(SomeClass.prototype.fake).toBe(func);
    });
    it('should add prototype when override flag set to true', () => {
        $g.__craydentNoConflict = false;
        const fake = () => { }
        SomeClass.prototype.fake = fake;
        _ext(SomeClass, 'fake', func, true);
        expect(SomeClass.prototype.fake).not.toBe(fake);
        expect(SomeClass.prototype.fake).toBe(func);
    });

});
// export default function _exts(cls: object, property: string, func: Function, override?: boolean): void {
//     try {
//         if (!$g.__craydentNoConflict) {
//             if (override) {
//                 cls['prototype'][property] = func;
//             } else {
//                 cls['prototype'][property] = cls['prototype'][property] || func;
//             }
//         }
//         __defineFunction(property, func);
//     } catch (e) {
//         error && error('_ext', e);
//     }
// }