
import _runFuncArray from '../../modules/protected/_runFuncArray';

describe('_runFuncArray', () => {
    function func() {
        return 'func';
    }
    async function async() {
        return 'async';
    }
    function* generator() {
        return 'generator';
    }
    function funcWithArgs(value) {
        return value;
    }
    async function asyncWithArgs(value) {
        return value;
    }
    function* generatorWithArgs(value) {
        return value;
    }
    it('should return [] when given null, undefined, or non executable', () => {
        expect(_runFuncArray(null)).toEqual([]);
        expect(_runFuncArray(undefined)).toEqual([]);
        expect(_runFuncArray(true as any)).toEqual([]);
    });
    it('should run a function', () => {
        expect(_runFuncArray(func)).toEqual(['func']);
    });
    it('should run multiple functions', () => {
        expect(_runFuncArray([func, func])).toEqual(['func', 'func']);
    });
    it('should run multiple function with args', () => {
        expect(_runFuncArray([funcWithArgs, funcWithArgs], ['value'])).toEqual(['value', 'value']);
    });
    it('should run an async function', async () => {
        const promises = _runFuncArray(async);
        expect(promises).toEqual([new Promise(() => { })]);
        const values = await Promise.all(promises);
        expect(values).toEqual(['async']);
    });
    it('should run multiple async functions', () => {
        expect(_runFuncArray([async, async])).toEqual([new Promise(() => { }), new Promise(() => { })]);
    });
    it('should run multiple async function with args', async () => {
        const promises = _runFuncArray([asyncWithArgs, asyncWithArgs], ['value']);
        expect(promises).toEqual([new Promise(() => { }), new Promise(() => { })]);
        const values = await Promise.all(promises);
        expect(values).toEqual(['value', 'value']);
    });
    it('should run an generator function', async () => {
        const promises = _runFuncArray(generator);
        expect(promises).toEqual([new Promise(() => { })]);
    });
    it('should run multiple generator functions', () => {
        expect(_runFuncArray([generator, generator])).toEqual([new Promise(() => { }), new Promise(() => { })]);
    });
    it('should run multiple generator function with args', async () => {
        const promises = _runFuncArray([generatorWithArgs, generatorWithArgs], ['value']);
        expect(promises).toEqual([new Promise(() => { }), new Promise(() => { })]);
    });
});