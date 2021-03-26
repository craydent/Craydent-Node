import CLI from '../../compiled/transformedMinor/craydent.cli';
import { _searchRange } from '../../compiled/transformedMinor/craydent.where';
jest.mock('child_process', () => {
    return {
        "exec": (...args: any[]) => {
            return _exec.apply(this, args);
        }
    }
});
let _exec = (...args: any[]) => { };
describe('CLI', () => {
    describe('CLI Class', () => {
        let argv = process.argv;
        beforeEach(() => {
            process.argv = [
                '/usr/local/bin/node',
                '/bin/script',
                'com'
            ]
        });
        afterAll(() => {
            process.argv = argv;
        });

        it('should create new instance with values with options', () => {
            process.argv = [
                '/usr/local/bin/node',
                '/bin/script',
                '-l',
                '--optionname',
                '12'
            ]

            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes",
                options: [{
                    option: '--optionname,-o',
                    type: 'number',
                    description: 'option description',
                    default: 0,
                    required: false
                }]
            }
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: 'name',
                Info: 'info',
                Synopsis: 'synopsis',
                Copyright: 'copyright',
                OptionsDescription: 'options description',
                Description: 'description',
                UsingLabels: true,
                CommandName: '*',
                Commands: {
                    '*': [{
                        option: '--optionname,-o',
                        type: 'number',
                        description: 'option description',
                        default: 0,
                        required: false,
                        command: '*'
                    }]
                },
                Options: [{
                    option: '--optionname,-o',
                    type: 'number',
                    description: 'option description',
                    default: 0,
                    required: false,
                    command: '*'
                }],
                Arguments: ['--optionname', '12'],
                Notes: 'notes',
                isMan: false,
                isHelp: false,
                _commandIndex: ['*'],
                _potentialCommand: '-l',
                _commandRemoved: false,
                optionname: 12,
                o: 12,
                l: true,
                waitForPending: []
            };
            const cli = new CLI(params);
            cli.validate();
            expect(cli).toEqual(expected);

        });
        it('should create new instance with default values', () => {
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: '',
                Info: '',
                Synopsis: '',
                Copyright: '',
                OptionsDescription: '',
                Description: '',
                UsingLabels: false,
                CommandName: '',
                Commands: { '*': [] },
                Options: [],
                Arguments: ['com'],
                Notes: '',
                isMan: false,
                isHelp: false,
                _commandIndex: [],
                _potentialCommand: 'com',
                _commandRemoved: false,
                com: 'com',
                waitForPending: []
            };
            expect(new CLI()).toEqual(expected);
        });
        it('should create new instance with values without options', () => {
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes"
            }
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: 'name',
                Info: 'info',
                Synopsis: 'synopsis',
                Copyright: 'copyright',
                OptionsDescription: 'options description',
                Description: 'description',
                UsingLabels: false,
                CommandName: '',
                Commands: { '*': [] },
                Options: [],
                Arguments: ['com'],
                Notes: 'notes',
                isMan: false,
                isHelp: false,
                _commandIndex: [],
                _potentialCommand: 'com',
                _commandRemoved: false,
                com: 'com',
                waitForPending: []
            };
            expect(new CLI(params)).toEqual(expected);
        });
        it('should create new instance with values with options', () => {
            process.argv.push('-l');
            process.argv.push('--optionname');
            process.argv.push('12');
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes",
                options: [{
                    option: '--optionname,-o',
                    type: 'number',
                    description: 'option description',
                    default: 0,
                    required: false
                }]
            }
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: 'name',
                Info: 'info',
                Synopsis: 'synopsis',
                Copyright: 'copyright',
                OptionsDescription: 'options description',
                Description: 'description',
                UsingLabels: false,
                CommandName: '*',
                Commands: {
                    '*': [{
                        option: '--optionname,-o',
                        type: 'number',
                        description: 'option description',
                        default: 0,
                        required: false,
                        command: '*'
                    }]
                },
                Options: [{
                    option: '--optionname,-o',
                    type: 'number',
                    description: 'option description',
                    default: 0,
                    required: false,
                    command: '*'
                }],
                Arguments: ['com', '--optionname', '12'],
                Notes: 'notes',
                isMan: false,
                isHelp: false,
                _commandIndex: ['*'],
                _potentialCommand: 'com',
                _commandRemoved: false,
                com: 'com',
                optionname: 12,
                o: 12,
                l: true,
                waitForPending: []
            };
            const cli = new CLI(params);
            cli.validate();
            expect(cli).toEqual(expected);

        });
        it('should create new instance with values with options with command', () => {
            process.argv.push('--optionname');
            process.argv.push('12');
            process.argv.push('-lg');
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes",
                options: [{
                    command: 'com',
                    option: '--optionname,-o',
                    type: 'number',
                    description: 'option description',
                    default: 0,
                    required: false
                }]
            }
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: 'name',
                Info: 'info',
                Synopsis: 'synopsis',
                Copyright: 'copyright',
                OptionsDescription: 'options description',
                Description: 'description',
                UsingLabels: false,
                CommandName: 'com',
                Commands: {
                    '*': [],
                    'com': [{
                        option: '--optionname,-o',
                        type: 'number',
                        description: 'option description',
                        default: 0,
                        required: false,
                        command: 'com'
                    }]
                },
                Options: [],
                Arguments: ['--optionname', '12'],
                Notes: 'notes',
                isMan: false,
                isHelp: false,
                _commandIndex: ['com'],
                _potentialCommand: null,
                _commandRemoved: true,
                com: 'com',
                optionname: 12,
                o: 12,
                l: true,
                g: true,
                waitForPending: []
            };
            const cli = new CLI(params);
            cli.validate();
            expect(cli).toEqual(expected);

        });
        it('should create new instance and add options via add', () => {
            process.argv.push('-o');
            process.argv.push('12');
            process.argv.push('--flag');
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes"
            }
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: 'name',
                Info: 'info',
                Synopsis: 'synopsis',
                Copyright: 'copyright',
                OptionsDescription: 'options description',
                Description: 'description',
                UsingLabels: false,
                CommandName: '',
                Commands: {
                    '*': [{
                        option: '--optionname,-o',
                        type: 'bool',
                        description: 'option description',
                        default: false,
                        required: false,
                        command: '*'
                    }]
                },
                Options: [{
                    option: '--optionname,-o',
                    type: 'bool',
                    description: 'option description',
                    default: false,
                    required: false,
                    command: '*'
                }],
                Arguments: ['com', '-o', '12'],
                Notes: 'notes',
                isMan: false,
                isHelp: false,
                _commandIndex: ['*'],
                _potentialCommand: 'com',
                com: 'com',
                _commandRemoved: false,
                optionname: "12",
                o: "12",
                flag: true,
                waitForPending: []
            };
            const cli = new CLI(params);
            cli.add({
                option: '--optionname,-o',
                type: 'bool',
                description: 'option description',
                default: false,
                required: false
            });

            expect(cli).toEqual(expected);
            expect(cli.isValid()).toBe(false);
            // should update the command name because validate assumes all options/commands have been added
            expect(cli.CommandName).toBe('*');

        });
        it('should create new instance and add options via add with invalid boolean and object', () => {
            process.argv.push('-o');
            process.argv.push('12');
            process.argv.push('--buy');
            process.argv.push('{');
            process.argv.push('--boo');
            process.argv.push('false');
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes"
            }
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: 'name',
                Info: 'info',
                Synopsis: 'synopsis',
                Copyright: 'copyright',
                OptionsDescription: 'options description',
                Description: 'description',
                UsingLabels: false,
                CommandName: '',
                Commands: {
                    '*': [{
                        option: '--optionname,-o',
                        type: 'bool',
                        description: 'option description',
                        command: '*'
                    }, {
                        option: '--buy,-b',
                        type: 'object',
                        description: 'buy description',
                        command: '*'
                    }, {
                        option: '--boo',
                        type: 'boolean',
                        description: 'boo description',
                        command: '*'
                    }]
                },
                Options: [{
                    option: '--optionname,-o',
                    type: 'bool',
                    description: 'option description',
                    command: '*'
                }, {
                    option: '--buy,-b',
                    type: 'object',
                    description: 'buy description',
                    command: '*'
                }, {
                    option: '--boo',
                    type: 'boolean',
                    description: 'boo description',
                    command: '*'
                }],
                Arguments: ['com', '-o', '12', '--buy', '{', '--boo', 'false'],
                Notes: 'notes',
                isMan: false,
                isHelp: false,
                _commandIndex: ['*', '*', '*'],
                _potentialCommand: 'com',
                com: 'com',
                _commandRemoved: false,
                optionname: "12",
                o: "12",
                b: '{',
                buy: '{',
                boo: false,
                waitForPending: []
            };
            const cli = new CLI(params);
            cli.add({
                option: '--optionname,-o',
                type: 'bool',
                description: 'option description'
            });
            cli.add({
                option: '--buy,-b',
                type: 'object',
                description: 'buy description',
            });
            cli.add({
                option: '--boo',
                type: 'boolean',
                description: 'boo description',
            });

            expect(cli).toEqual(expected);
            expect(cli.isValid()).toBe(false);
            // should update the command name because validate assumes all options/commands have been added
            expect(cli.CommandName).toBe('*');

        });
        it('should create new instance and add options via option with command', () => {
            process.argv.push('-o');
            process.argv.push('[]');
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes"
            }
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: 'name',
                Info: 'info',
                Synopsis: 'synopsis',
                Copyright: 'copyright',
                OptionsDescription: 'options description',
                Description: 'description',
                UsingLabels: false,
                CommandName: 'com',
                Commands: {
                    '*': [],
                    'com': [{
                        option: '--optionname,-o',
                        type: 'array',
                        description: 'option description',
                        default: null,
                        required: false,
                        command: 'com'
                    }]
                },
                Options: [],
                Arguments: ['-o', '[]'],
                Notes: 'notes',
                isMan: false,
                isHelp: false,
                _commandIndex: ['com'],
                _potentialCommand: null,
                _commandRemoved: true,
                com: 'com',
                optionname: [],
                o: [],
                waitForPending: []
            };
            const cli = new CLI(params);
            cli.option({
                command: 'com',
                option: '--optionname,-o',
                type: 'array',
                description: 'option description',
                default: null,
                required: false
            });
            expect(cli.isValid()).toBe(true);
            expect(cli).toEqual(expected);
        });
        it('should create new instance and add command with action', async () => {
            process.argv.push('-o');
            process.argv.push('{}');
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes"
            }
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: 'name',
                Info: 'info',
                Synopsis: 'synopsis',
                Copyright: 'copyright',
                OptionsDescription: 'options description',
                Description: 'description',
                UsingLabels: false,
                CommandName: 'com',
                Commands: {
                    '*': [],
                    'com': [{
                        option: '--optionname,-o',
                        type: 'object',
                        description: 'option description',
                        default: null,
                        required: false,
                        command: 'com'
                    }]
                },
                Options: [],
                Arguments: ['-o', '{}'],
                Notes: 'notes',
                isMan: false,
                isHelp: false,
                _commandIndex: ['com', 'com'],
                _potentialCommand: null,
                _commandRemoved: true,
                com: 'com',
                optionname: {},
                o: {},
                waitForPending: [new Promise(() => { }), new Promise(() => { })]
            };
            const cli = new CLI(params);
            const action = jest.fn();
            const onAction = (...args: any[]) => {
                return action.apply(this, args);
            }
            const actionGen = jest.fn();
            const onActionGen = function* (this: any, ...args: any) {
                return actionGen.apply(this, args);
            }
            const actionAsync = jest.fn();
            const onActionAsync = async (...args: any[]) => {
                return actionAsync.apply(this, args);
            }
            cli.command('com', {
                command: 'com',
                option: '--optionname,-o',
                type: 'object',
                description: 'option description',
                default: null,
                required: false
            }).action(onAction).action(onActionGen).action(onActionAsync);
            await Promise.all(cli.waitForPending);
            expect(cli).toEqual(expected);
            expect(cli.isValid()).toBe(true);
            expect(action).toHaveBeenCalledWith('com');
            expect(actionGen).toHaveBeenCalledWith('com');
            expect(actionAsync).toHaveBeenCalledWith('com');
        });
        it('should throw error if command is not provided when using command to add options', () => {
            process.argv.push('-o');
            process.argv.push('{}');
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes"
            };
            const cli = new CLI(params);
            let error;
            try {
                cli.command(null as any, {
                    command: 'com',
                    option: '--optionname,-o',
                    type: 'object',
                    description: 'option description',
                    default: null,
                    required: false
                });
            } catch (e) { error = e; }
            expect(error).toBe('Command name must be provided. This operation will be ignored.');
        });
        it('should fail validation when required option is missing', () => {
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes",
                options: [{
                    command: 'com',
                    option: '--optionname,-o',
                    type: 'number',
                    description: 'option description',
                    required: true
                }]
            }
            const expected = {
                Interpreter: '/usr/local/bin/node',
                ScriptPath: '/bin/script',
                ScriptName: 'script',
                Name: 'name',
                Info: 'info',
                Synopsis: 'synopsis',
                Copyright: 'copyright',
                OptionsDescription: 'options description',
                Description: 'description',
                UsingLabels: false,
                CommandName: 'com',
                Commands: {
                    '*': [],
                    'com': [{
                        option: '--optionname,-o',
                        type: 'number',
                        description: 'option description',
                        required: true,
                        command: 'com'
                    }]
                },
                Options: [],
                Arguments: [],
                Notes: 'notes',
                isMan: false,
                isHelp: false,
                _commandIndex: ['com'],
                _potentialCommand: null,
                _commandRemoved: true,
                com: 'com',
                waitForPending: []
            };
            const cli = new CLI(params);
            expect(cli).toEqual(expected);
            try { cli.validate(); } catch (e) {
                expect(e).toBe('Option --optionname,-o is required.');
            }

        });
        it('should render man', () => {
            process.argv[process.argv.length - 1] = 'man';
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes",
                options: [{
                    command: 'com',
                    option: '--optionname,-o',
                    type: 'number',
                    description: 'option description',
                    default: 0,
                    required: true
                }, {
                    command: 'com2',
                    option: '-b',
                    description: 'option description',
                    default: 0,
                    required: false
                }]
            }
            let expected = 'NAME\n\tname -- info\n\n';
            expected += 'SYNOPSIS\n\tsynopsis\n\n';
            expected += 'DESCRIPTION\n\tdescription\n\n';
            expected += 'OPTIONS\n\n';
            expected += 'ADDITIONAL COMMANDS\n\tcom';
            expected += '\n\t\t-o,\t\t(number) option description(required)\n\t\t--optionname\n';
            expected += '\n\tcom2\n\t\t-b\t\t(string) option description\n\n\t\n';
            expected += 'NOTES\n\tnotes\n\n';
            const cli = new CLI(params);
            expect(cli.renderMan()).toEqual(expected);

        });
        it('should render man with no options', () => {
            process.argv[process.argv.length - 1] = 'man';
            let expected = 'NAME\n\t\n\n';
            expected += 'SYNOPSIS\n\t\n\n';
            expected += 'DESCRIPTION\n\t\n\n';
            expected += 'OPTIONS\n\n\n';
            expected += 'NOTES\n\t\n\n';

            const cli = new CLI();
            expect(cli.renderMan()).toEqual(expected);
        });
        it('should render help', () => {
            process.argv[process.argv.length - 1] = 'help';
            const params = {
                name: 'name',
                info: 'info',
                synopsis: 'synopsis',
                copyright: 'copyright',
                optionsDescription: 'options description',
                description: 'description',
                notes: "notes",
                options: [{
                    command: 'com',
                    option: '--optionname,-o',
                    type: 'number',
                    description: 'option description',
                    default: 0,
                    required: false
                }, {
                    command: 'com2',
                    option: '--buy,-b',
                    type: 'number',
                    description: 'option description',
                    default: 0,
                    required: false
                }]
            }
            let expected = 'Description: synopsis\n\n';
            expected += 'Usage: script [command] [options]\n\t'
            expected += 'com\n\t\t-o,\t\t(number) option description\n\t\t--optionname\n\n\t';
            expected += 'com2\n\t\t-b,\t\t(number) option description\n\t\t--buy\n\n\t\n';
            expected += 'Options:\n\n';
            const cli = new CLI(params);
            expect(cli.renderHelp()).toEqual(expected);

        });
        it('should render help with no options', () => {
            process.argv[process.argv.length - 1] = 'help';

            let expected = 'Description: \n\n';
            expected += 'Usage: script\n\t\n';
            expected += 'Options:\n\n';
            const cli = new CLI();
            expect(cli.renderHelp()).toEqual(expected);

        });
    });
    describe('exec', () => {
        let write = process.stdout.write;
        beforeEach(() => {
            process.stdout.write = jest.fn();
        });
        afterAll(() => {
            process.stdout.write = write;
            _exec = (...args: any[]) => { };
        });
        it('should not execute command when command is not provided', async () => {
            const result = await CLI.exec('');
            expect(result).toBe(false);
        })
        it('should execute command', async () => {
            _exec = jest.fn().mockImplementationOnce((command, options, cb) => {
                setTimeout(() => { cb() }, 1);
                return {
                    stdout: {
                        on: (ev: any, cb: any) => { cb('data'); }
                    },
                    stderr: {
                        on: (ev: any, cb: any) => { }
                    }
                };
            });
            const cli = new CLI();
            const onDone = jest.fn();
            expect(await cli.exec('the command', {}, onDone)).toBe(undefined);
            expect(onDone).toHaveBeenCalledWith(0, 'data');
            expect(process.stdout.write).toHaveBeenCalledWith('data');
        });
        it('should execute command with silent option', async () => {
            _exec = jest.fn().mockImplementationOnce((command, options, cb) => {
                setTimeout(() => { cb() }, 1);
                return {
                    stdout: {
                        on: (ev: any, cb: any) => { cb('data'); },
                    },
                    stderr: {
                        on: (ev: any, cb: any) => { }
                    }
                };
            });
            const cli = new CLI();
            expect(await cli.exec('the command', { alwaysResolve: true, silent: true }))
                .toEqual({ "code": 0, "output": "data" });
            expect(process.stdout.write).not.toHaveBeenCalled();
        });
        it('should execute command with outputOnly option', async () => {
            _exec = jest.fn().mockImplementationOnce((command, options, cb) => {
                setTimeout(() => { cb() }, 1);
                return {
                    stdout: {
                        on: (ev: any, cb: any) => { cb('data'); },
                    },
                    stderr: {
                        on: (ev: any, cb: any) => { }
                    }
                };
            });
            const cli = new CLI();
            const onDone = jest.fn();
            expect(await cli.exec('the command', { alwaysResolve: true, silent: true, outputOnly: true }, onDone))
                .toEqual('data');
            expect(onDone).toHaveBeenCalledWith('data');
            expect(process.stdout.write).not.toHaveBeenCalled();
        });
        it('should execute command and process errors', async () => {
            _exec = jest.fn().mockImplementationOnce((command, options, cb) => {
                setTimeout(() => { cb({ code: 10 }) }, 1);
                return {
                    stdout: {
                        on: (ev: any, cb: any) => { },
                    },
                    stderr: {
                        on: (ev: any, cb: any) => { cb('data'); }
                    }
                };
            });
            const cli = new CLI();
            expect(await cli.exec('the command', { alwaysResolve: true })).toEqual({ "code": 10, "output": "data" });
            expect(process.stdout.write).toHaveBeenCalledWith('data');
        });
        it('should execute command and process errors with outputOnly option', async () => {
            _exec = jest.fn().mockImplementationOnce((command, options, cb) => {
                setTimeout(() => { cb({ code: 10 }) }, 1);
                return {
                    stdout: {
                        on: (ev: any, cb: any) => { },
                    },
                    stderr: {
                        on: (ev: any, cb: any) => { cb('data'); }
                    }
                };
            });
            const cli = new CLI();
            expect(await cli.exec('the command', { alwaysResolve: true, silent: true, outputOnly: true })).toEqual('data');
            expect(process.stdout.write).not.toHaveBeenCalled();
        });
        it('should execute command and process errors when callback is provided', async () => {
            _exec = jest.fn().mockImplementationOnce((command, options, cb) => {
                setTimeout(() => { cb({ code: 10 }) }, 1);
                return {
                    stdout: {
                        on: (ev: any, cb: any) => { }
                    },
                    stderr: {
                        on: (ev: any, cb: any) => { cb('data'); }
                    }
                };
            });
            const cli = new CLI();
            const done = jest.fn();
            const onDone = (...args: any[]) => {
                return done.apply(this, args);
            }
            try {
                await cli.exec('the command', onDone)
            } catch (e) {
                expect(e).toEqual({ code: 10, output: 'data' });
            }

            expect(process.stdout.write).toHaveBeenCalledWith('data');
            expect(done).toHaveBeenCalledWith(10, 'data');
        });
    });
});

