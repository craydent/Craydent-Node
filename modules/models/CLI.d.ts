/// <reference types="node" />
import { AnyObject } from '../models/Generics';
import * as IChildProcess from 'child_process';
export interface CLIOptions {
    name?: string;
    info?: string;
    synopsis?: string;
    copyright?: string;
    optionsDescription?: string;
    description?: string;
    commands?: AnyObject;
    options?: Option[];
    notes?: string;
}
export interface Option {
    option: string;
    type?: string;
    description: string;
    default?: any;
    command?: string;
    required?: boolean;
}
export interface ExecOptions {
    silent?: boolean;
    alwaysResolve?: boolean;
    outputOnly?: boolean;
}
export declare type ExecCallback = (cprocess: typeof IChildProcess, err: IChildProcess.ExecException, output: string) => any;
