import __logModule from '../../modules/private/__logModule';

(global as any).$c = global.$c || { MODULES_LOADED: {}, VERSION: "1" }

describe('__logModule', () => {
    it('should set the loaded Module', () => {
        const name = 'ModuleName';
        __logModule(name);
        expect((global as any).$c.MODULES_LOADED[name]).toBe('1');
    })
});