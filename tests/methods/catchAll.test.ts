import catchAll from '../../modules/methods/catchAll';
describe('catchAll', () => {
    const _process = process;
    beforeEach(() => {
        (global as any).process = { ..._process, on: jest.fn() };
        delete (catchAll as any).listeners;
    });
    afterAll(() => {
        (global as any).process = _process;
    });
    it('should catch all exceptions when no listeners are defined', () => {
        const func = () => { };
        catchAll(func)
        expect((catchAll as any).listeners).toEqual([func.toString()]);
        expect(process.on).toHaveBeenCalledWith('uncaughtException', func);
    })
    it('should not add listener when listener is defined', () => {
        const listener = () => { };
        const func = () => { };
        (catchAll as any).listeners = [listener.toString()];
        catchAll(func);
        expect((catchAll as any).listeners).toEqual([listener.toString()]);
        expect(process.on).not.toHaveBeenCalled();
    });
    it('should catch all exceptions as append', () => {
        const listener = () => { };
        const func = () => { };
        (catchAll as any).listeners = [listener.toString()];
        catchAll(func, true);
        expect((catchAll as any).listeners).toEqual([listener.toString(), func.toString()]);
        expect(process.on).toHaveBeenCalledWith('uncaughtException', func);
    })
});
