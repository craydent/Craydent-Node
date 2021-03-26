import clusterit from '../../compiled/transformedMinor/craydent.clusterit';
import * as cluster from 'cluster';
jest.mock('cluster', () => {
    return {
        "isMaster": false,
        'fork': (...args: any[]) => _fork.apply(this, args as any)
    }
});
let _fork = () => { }
describe('clusterit', () => {
    beforeEach(() => {
        (cluster as any).isMaster = false;
        _fork = () => { }
    });
    it('should create cluster with no options', () => {
        const expected = {
            isMaster: false,
            disconnect: expect.any(Function),
            fork: expect.any(Function),
            isWorker: true,
            schedulingPolicy: 0,
            settings: {},
            setupMaster: expect.any(Function),
            worker: {},
            workers: {},
            on: expect.any(Function)
        };
        const callback = jest.fn();
        const func = (...args: any[]) => callback.apply(this, args);
        expect(clusterit(func)).toEqual(expected);
        expect(callback).toHaveBeenCalledWith(cluster);
    })
    it('should create cluster with options', () => {
        (cluster as any).isMaster = true;
        const on = jest.fn().mockImplementationOnce((ev, cb) => {
            cb(0, 1);
        });
        const child = { on };
        _fork = jest.fn()
            .mockImplementationOnce(() => child)
            .mockImplementationOnce(() => child);
        const callback = jest.fn();
        const func = (...args: any[]) => callback.apply(this, args);
        const onexit = jest.fn();
        const options = { auto_spawn: true, max_cpu: 1, onexit };
        expect(clusterit(options, func)).toEqual(cluster);

        // expect(_fork).toHaveBeenCalledTimes(4);
        expect(onexit).toHaveBeenCalledWith(child, 0, 1);
        expect(callback).toHaveBeenCalledWith(child);
    })
    it('should create cluster with options without onexit handler', () => {
        (cluster as any).isMaster = true;
        const on = jest.fn().mockImplementationOnce((ev, cb) => {
            cb(0, 1);
        });
        const child = { on };
        _fork = jest.fn()
            .mockImplementationOnce(() => child)
            .mockImplementationOnce(() => child);
        const callback = jest.fn();
        const func = (...args: any[]) => callback.apply(this, args);
        const options = { auto_spawn: true, max_cpu: 1 };
        expect(clusterit(options, func)).toEqual(cluster);

        expect(callback).toHaveBeenCalledWith(child);
    })
});
