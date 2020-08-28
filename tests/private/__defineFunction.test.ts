import __defineFunction from '../../modules/private/__defineFunction';
import * as Common from '../../modules/private/__common';

describe('__defineFunction', () => {
    let c;
    beforeEach(() => {
        Common.scope.eval = jest.fn().mockImplementationOnce(() => '');
        c = (global as any).$c;
    });
    afterEach(() => {
        if (c) { (global as any).$c = c; }
    });
    it('should generate function string when there are no args', () => {
        (global as any).$c = null;
        __defineFunction('name', function name() { this.property = 0; });
        expect(Common.scope.eval).toHaveBeenCalledWith('$c.name = function name (craydent_ctx){if(arguments.length == 0 && this == $c){return;} craydent_ctx.property = 0; }');

    })
    it('should generate function string with args', () => {
        (global as any).$c = null;
        __defineFunction('name', function name(arg1) { this.property = arg1; });
        expect(Common.scope.eval).toHaveBeenCalledWith('$c.name = (function name(craydent_ctx,arg1){if(arguments.length == 0 && this == $c){return;} craydent_ctx.property = arg1; })');

    })
    it('should when there are no args', () => {
        __defineFunction('name', function name() { this.property = 0; });
        expect(Common.scope.eval).toHaveBeenCalledWith('global.$c.name = $c.name = function name (craydent_ctx){if(arguments.length == 0 && this == $c){return;} craydent_ctx.property = 0; }');

    })
    it('should with args', () => {
        __defineFunction('name', function name(arg1) { this.property = arg1; });
        expect(Common.scope.eval).toHaveBeenCalledWith('global.$c.name = $c.name = (function name(craydent_ctx,arg1){if(arguments.length == 0 && this == $c){return;} craydent_ctx.property = arg1; })');

    })
});