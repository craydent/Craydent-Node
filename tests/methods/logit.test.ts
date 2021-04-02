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
    describe('foreground styled logs', () => {
        const reset: string = "\x1b[0m";
        type Color = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";
        beforeEach(() => {
            cout = () => { }
        });
        it.each`
            color           | expected
            ${"black"}      | ${"\x1b[30m"}
            ${"red"}        | ${"\x1b[31m"}
            ${"green"}      | ${"\x1b[32m"}
            ${"yellow"}     | ${"\x1b[33m"}
            ${"blue"}       | ${"\x1b[34m"}
            ${"magenta"}    | ${"\x1b[35m"}
            ${"cyan"}       | ${"\x1b[36m"}
            ${"white"}      | ${"\x1b[37m"}
        `('should use $color to add $expected', ({ color, expected }) => {
            cout = jest.fn();
            logit[color as Color]('hello');
            expect(cout).toHaveBeenCalledWith(expected, 'hello', reset);
        });

    })
    describe('background styled logs', () => {
        const reset: string = "\x1b[0m";
        type Color = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";
        beforeEach(() => {
            cout = () => { }
        });
        it.each`
            color           | expected
            ${"bgBlack"}    | ${"\x1b[40m"}
            ${"bgRed"}      | ${"\x1b[41m"}
            ${"bgGreen"}    | ${"\x1b[42m"}
            ${"bgYellow"}   | ${"\x1b[43m"}
            ${"bgBlue"}     | ${"\x1b[44m"}
            ${"bgMagenta"}  | ${"\x1b[45m"}
            ${"bgCyan"}     | ${"\x1b[46m"}
            ${"bgWhite"}    | ${"\x1b[47m"}
        `('should use $color to add $expected', ({ color, expected }) => {
            cout = jest.fn();
            logit[color as Color]('hello');
            expect(cout).toHaveBeenCalledWith(expected, 'hello', reset);
        });

    })
    describe('custom styled logs', () => {
        const reset: string = "\x1b[0m";
        const red: string = "\x1b[31m";
        const bgred: string = "\x1b[41m";
        const bright: string = "\x1b[1m";
        beforeEach(() => {
            cout = () => { }
        });
        it('should use custom style when no attributes defined', () => {
            cout = jest.fn();
            logit.custom({}, 'hello');
            expect(cout).toHaveBeenCalledWith('hello', reset);
        });
        it('should use custom foreground style', () => {
            cout = jest.fn();
            logit.custom({ fgColor: "red" }, 'hello');
            expect(cout).toHaveBeenCalledWith(red, 'hello', reset);
        });
        it('should use custom background style', () => {
            cout = jest.fn();
            logit.custom({ bgColor: "red" }, 'hello');
            expect(cout).toHaveBeenCalledWith(bgred, 'hello', reset);
        });
        it('should use custom style', () => {
            cout = jest.fn();
            logit.custom({ style: "bright" }, 'hello');
            expect(cout).toHaveBeenCalledWith(bright, 'hello', reset);
        });

    })
});