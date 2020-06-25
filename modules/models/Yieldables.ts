import { AsyncFunction } from './AsyncFunction';

export type Yieldables = Promise<any>
    | GeneratorFunction
    | AsyncFunction
    | Function;