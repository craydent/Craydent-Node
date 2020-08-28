import cout from '../../modules/methods/cout';
import { $c } from '../../modules/private/__common';
describe('cout', () => {
    let _log = console.log;
    let DMODE = $c.DEBUG_MODE
    beforeEach(() => {
        $c.DEBUG_MODE = false;
        console.log = jest.fn();
    });
    afterAll(() => {
        $c.DEBUG_MODE = DMODE;
        console.log = _log;
    });
    it('should not call console.log when DEBUG_MODE is false', () => {
        cout('log it');
        expect(console.log).not.toHaveBeenCalled();
    });
    it('should call console.log when DEBUG_MODE is true', () => {
        $c.DEBUG_MODE = true;
        cout('log it');
        expect(console.log).toHaveBeenCalledWith('log it');
    });
});
