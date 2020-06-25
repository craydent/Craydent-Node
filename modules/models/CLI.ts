import { AnyObject } from "./Generics";
import * as IChildProcess from 'child_process';

export interface CLIOptions {
    name?: string;
    info?: string;
    synopsis?: string;
    copyright?: string;
    optionsDescription?: string;
    description?: string;
    commands?: AnyObject;
    options?: Options[];
    notes?: string;
}
export interface Options {
    option: string;
    type: string;
    description: string;
    default: string;
    command: string;
    required: boolean;
    _property: string;
}
export interface ExecOptions {
    silent?: boolean;
    alwaysResolve?: boolean;
    outputOnly?: boolean;
}
export type ExecCallback = (cprocess: typeof IChildProcess, err: IChildProcess.ExecException, output: string) => any;

