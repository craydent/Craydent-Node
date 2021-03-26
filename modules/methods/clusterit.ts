import error from '../methods/error';
import * as ICluster from 'cluster';
import * as os from 'os';
import isFunction from '../methods/isfunction';
import isNull from '../methods/isnull';
import foo from '../methods/foo';
import { AnyObject } from '../models/Generics';
import include from '../methods/include';

export interface ClusterOptions {
    max_cpu?: number;
    onfork?: (worker: ICluster.Worker) => void;
    auto_spawn?: boolean;
    onexit?: (worker: ICluster.Worker, code?: number, signal?: string) => void;
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

export default function clusterit(callback: (data: typeof ICluster | ICluster.Worker) => void): ClusterReturnType | typeof ICluster;
export default function clusterit(options: ClusterOptions, callback?: (data: typeof ICluster | ICluster.Worker) => void): ClusterReturnType | typeof ICluster;
export default function clusterit(options: any, callback?: any): ClusterReturnType | typeof ICluster {
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
        const cluster = include('cluster');
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
                /* istanbul ignore else */
                if (options.auto_spawn) {
                    child.on('exit', function (code: any, signal: any) {
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
    } catch (e) /* istanbul ignore next */ {
        error && error('clusterit', e);
        return null as any;
    }
}