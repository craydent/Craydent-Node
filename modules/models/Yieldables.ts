import { AsyncFunction } from '../models/AsyncFunction';

export type Yieldables = Promise<any>
    | GeneratorFunction
    | AsyncFunction
    | Function;