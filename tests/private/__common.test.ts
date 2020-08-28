import * as Common from '../../modules/private/__common';

describe('__common', () => {
    it.each`
        variable                                  | name
        ${Common.info}                            | ${'info'}
        ${Common._craydent_version}               | ${'_craydent_version'}
        ${Common.$c}                              | ${'$c'}
        ${(global as any).$g}                     | ${'$g'}
        ${(global as any).$g.navigator}           | ${'navigator'}
        ${(global as any).$g.$c}                  | ${'$c'}
        ${(global as any).$g.$c.VERSION}          | ${'VERSION'}
        ${(global as any).$g.$c.MODULES_LOADED}   | ${'MODULES_LOADED'}
        ${(global as any).$g.$c.DEBUG_MODE}       | ${'DEBUG_MODE'}
        ${(global as any).$g.$c.CONSOLE_COLORS}   | ${'CONSOLE_COLORS'}
        ${(global as any).$g.$c.globalize}        | ${'globalize'}
        ${(global as any).$g.$c.LOCAL_IP}         | ${'LOCAL_IP'}
        ${(global as any).$g.$c.PUBLIC_IP}        | ${'PUBLIC_IP'}
        ${(global as any).$g.$c.ERROR_TYPES}      | ${'ERROR_TYPES'}
    `('$name should exists', ({ variable }) => {
        expect(typeof variable).not.toBe('undefined');
    });
});
