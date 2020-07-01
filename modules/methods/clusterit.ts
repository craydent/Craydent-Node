import error from './error';
import * as cluster from 'cluster';
import * as os from 'os';
import isFunction from './isFunction';
import isNull from './isNull';
import foo from './foo';
import { AnyObject } from '../models/Arrays';

export interface ClusterOptions {
    max_cpu?: number;
    onfork?: (worker: cluster.Worker) => void;
    auto_spawn?: boolean;
    onexit?: (worker: cluster.Worker, code?: number, signal?: string) => void;
}
export interface ClusterReturnType {
    isMaster: boolean,
    disconnect: Function,
    fork: Function,
    isWorker: boolean,
    schedulingPolicy: number,
    settings: AnyObject
    setupMaster: Function,
    worker: AnyObject
    workers: AnyObject
    on: Function
}

export default function clusterit(options, callback: (data: typeof cluster | cluster.Worker) => void): ClusterReturnType | typeof cluster {
    /*|{
        "info": "Enable clustering",
        "category": "Utility",
        "parameters":[
            {"callback": "(ClusterCallback) Method to call for Workers.  Callback is passed the cluster object as an argument."}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#clusterit",
        "returnType": "(void)"
    }|*/
    try {
        if (!callback && isFunction(options)) {
            callback = options;
            options = {};
        }

        const CPUs = os.cpus().length;
        const numCPUs = Math.min(isNull(options.max_cpu, CPUs), CPUs);

        if (cluster.isMaster) {
            // Fork workers.
            for (let i = 0; i < numCPUs; i++) {
                let child = cluster.fork();
                (options.onfork || foo)(child);
                if (options.auto_spawn) {
                    child.on('exit', function (code, signal) {
                        (options.onexit || foo)(child, code, signal);
                        callback(cluster.fork());
                    });
                }
            }
            return cluster;

        }
        // child process
        callback(cluster);

        return {
            isMaster: false,
            disconnect: foo,
            fork: foo,
            isWorker: true,
            schedulingPolicy: 0,
            settings: {},
            setupMaster: foo,
            worker: {},
            workers: {},
            on: foo
        }
    } catch (e) {
        error && error('clusterit', e);
    }
}