import logit from '../../compiled/transformedMinor/craydent.logit';
import { $c } from '../../compiled/transformedMinor/craydent.logit/private/__common';
jest.mock('../../compiled/transformedMinor/craydent.cout', () => {
    return {
        "default": (...args: any[]) => cout.apply(this, args as any)
    }
});
let cout = () => { }
describe('logit', () => {
    beforeEach(() => {
        cout = () => { }
    });
    it('should handle no args', () => {
        cout = jest.fn();
        logit();
        expect(cout).toHaveBeenCalled();
    });
    it('should handle one arg', () => {
        cout = jest.fn();
        logit({});
        expect(cout).toHaveBeenCalledWith({});
    });
    it('should handle multiple args', () => {
        cout = jest.fn();
        logit({}, {}, 1, '');
        expect(cout).toHaveBeenCalledWith({}, {}, 1, '');

    });
    describe('verbose logs', () => {
        let VERBOSE_LOGS = $c.VERBOSE_LOGS;
        beforeEach(() => {
            $c.VERBOSE_LOGS = true;
        });
        afterAll(() => {
            $c.VERBOSE_LOGS = VERBOSE_LOGS;
        });
        it('should handle no args', () => {
            cout = jest.fn();
            logit();
            expect(cout).toHaveBeenCalledWith('\t\t\t\t        at Object.<anonymous> (/Users/cinada/source/cprojects/craydent-npm-library/tests/methods/logit.test.ts:39:18)');
        });
        it('should handle one arg', () => {
            cout = jest.fn();
            logit({});
            expect(cout).toHaveBeenCalledWith({}, '\t\t\t\t        at Object.<anonymous> (/Users/cinada/source/cprojects/craydent-npm-library/tests/methods/logit.test.ts:44:18)');
        });
        it('should handle multiple args', () => {
            cout = jest.fn();
            logit({}, {}, 1, '');
            expect(cout).toHaveBeenCalledWith({}, {}, 1, '', '\t\t\t\t        at Object.<anonymous> (/Users/cinada/source/cprojects/craydent-npm-library/tests/methods/logit.test.ts:49:18)');

        });

    })
});