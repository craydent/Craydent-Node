import addObjectPrototype from '../../modules/methods/addObjectPrototype';
jest.mock('../../modules/private/__defineFunction', () => {
    return {
        "default": (...args) => __defineFunction.apply(this, args)
    }
});
let __defineFunction = () => { };
declare var $g: any;
describe('addObjectPrototype', () => {
    const RealObject = Object;
    const RealGeoLocation = (global as any).GeoLocation;
    const RealArray = Array;
    const RealFunction = Function;
    const RealString = String;
    const RealNumber = Number;
    const RealBoolean = Boolean;
    const RealError = Error;
    const g = (global as any).$g;
    beforeEach(() => {
        __defineFunction = jest.fn();
        (global as any).$g = {};
        (global as any).GeoLocation = { prototype: {} };
    });

    afterAll(() => {
        g ? ((global as any).$g = g) : delete (global as any).$g;
        RealGeoLocation ? ((global as any).GeoLocation = RealGeoLocation) : delete (global as any).GeoLocation;
    });
    it('should not add prototypes when the name is get or set', () => {
        let OBJ = (global as any).Object = { prototype: {}, defineProperty: jest.fn() };
        const fn = () => { };
        addObjectPrototype('get', fn);
        (global as any).Object = RealObject;

        expect(OBJ.prototype['get']).not.toBe(fn);
        expect(__defineFunction).toHaveBeenLastCalledWith('get', fn);
        __defineFunction = jest.fn();
        addObjectPrototype('set', fn);
        expect(OBJ.prototype['set']).not.toBe(fn);
        expect(__defineFunction).toHaveBeenLastCalledWith('set', fn);
    });
    it('should not add prototypes when it exists', () => {
        let OBJ = (global as any).Object = { prototype: {}, defineProperty: jest.fn(), keys: RealObject.keys };

        const fn = () => { };
        OBJ.prototype['newProto'] = fn;
        addObjectPrototype('newProto', () => { });
        (global as any).Object = RealObject;
        expect(OBJ.prototype['newProto']).toBe(fn);
        expect(__defineFunction).toHaveBeenLastCalledWith('newProto', expect.any(Function));
    });
    it('should not add prototypes when mode is noConflict', () => {
        (global as any).$g.__craydentNoConflict = true;
        let OBJ = (global as any).Object = { prototype: {}, defineProperty: jest.fn(), keys: RealObject.keys };

        const fn = () => { };
        addObjectPrototype('newProto', fn);
        (global as any).Object = RealObject;

        expect(OBJ.defineProperty).not.toHaveBeenCalled();
        expect(__defineFunction).toHaveBeenLastCalledWith('newProto', fn);
    });
    it('should add prototypes when the name is not get or set', () => {
        let OBJ = (global as any).Object = { prototype: {}, defineProperty: jest.fn(), keys: RealObject.keys };
        const fn = () => { };
        addObjectPrototype('newProto', fn);
        (global as any).Object = RealObject;
        expect(OBJ.defineProperty).toHaveBeenCalledWith(OBJ.prototype, 'newProto', {
            writable: true,
            enumerable: false,
            configurable: true,
            value: fn
        });
        expect(__defineFunction).toHaveBeenLastCalledWith('newProto', fn);
    });
    it('should add prototypes when the name exists but override is set to true', () => {
        const fn = () => { }, expected = () => { };
        let OBJ = (global as any).Object = { prototype: {}, defineProperty: jest.fn(), keys: RealObject.keys };
        OBJ.prototype['newProto'] = fn;
        addObjectPrototype('newProto', expected, true);
        (global as any).Object = RealObject;
        expect(OBJ.defineProperty).toHaveBeenCalledWith(OBJ.prototype, 'newProto', {
            writable: true,
            enumerable: false,
            configurable: true,
            value: expected
        });
        expect(__defineFunction).toHaveBeenLastCalledWith('newProto', expected);
    });
    it('should not add prototypes when defineProperty is not supported and the name exists', () => {
        const expected = () => { }, name = 'newProto';
        (global as any).Object = { prototype: {}, defineProperty: () => { throw ''; }, keys: RealObject.keys };
        let ARR = (global as any).Array = { prototype: {} };
        let ERR = (global as any).Error = { prototype: {} };
        let FUN = (global as any).Function = { prototype: {} };
        let STR = (global as any).String = { prototype: {} };
        let NUM = (global as any).Number = { prototype: {} };
        let BOO = (global as any).Boolean = { prototype: {} };

        addObjectPrototype(name, expected);
        (global as any).Object = RealObject;
        (global as any).Array = RealArray;
        (global as any).Error = RealError;
        (global as any).Function = RealFunction;
        (global as any).String = RealString;
        (global as any).Number = RealNumber;
        (global as any).Boolean = RealBoolean;

        expect(ARR.prototype[name]).toBe(expected);
        expect(ERR.prototype[name]).toBe(expected);
        expect(FUN.prototype[name]).toBe(expected);
        expect(STR.prototype[name]).toBe(expected);
        expect(NUM.prototype[name]).toBe(expected);
        expect(BOO.prototype[name]).toBe(expected);
        expect((global as any).GeoLocation.prototype[name]).toBe(expected);
        expect(__defineFunction).toHaveBeenLastCalledWith(name, expected);
    });
    it('should add prototypes when defineProperty is not supported and the name exists but override is set to true', () => {
        const fn = () => { }, expected = () => { }, name = 'newProto';
        (global as any).Object = { prototype: { newProp: fn }, defineProperty: () => { throw ''; }, keys: RealObject.keys };
        let ARR = (global as any).Array = { prototype: { newProp: fn } };
        let ERR = (global as any).Error = { prototype: { newProp: fn } };
        let FUN = (global as any).Function = { prototype: { newProp: fn } };
        let STR = (global as any).String = { prototype: { newProp: fn } };
        let NUM = (global as any).Number = { prototype: { newProp: fn } };
        let BOO = (global as any).Boolean = { prototype: { newProp: fn } };

        addObjectPrototype(name, expected, true);
        (global as any).Object = RealObject;
        (global as any).Array = RealArray;
        (global as any).Error = RealError;
        (global as any).Function = RealFunction;
        (global as any).String = RealString;
        (global as any).Number = RealNumber;
        (global as any).Boolean = RealBoolean;

        expect(ARR.prototype[name]).toBe(expected);
        expect(ERR.prototype[name]).toBe(expected);
        expect(FUN.prototype[name]).toBe(expected);
        expect(STR.prototype[name]).toBe(expected);
        expect(NUM.prototype[name]).toBe(expected);
        expect(BOO.prototype[name]).toBe(expected);
        expect((global as any).GeoLocation.prototype[name]).toBe(expected);
        expect(__defineFunction).toHaveBeenLastCalledWith(name, expected);
    });
});