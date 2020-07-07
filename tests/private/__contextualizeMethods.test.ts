import __contextualizeMethods from '../../modules/private/__contextualizeMethods';
import * as Common from '../../modules/private/__common';

describe('__contextualizeMethods', () => {
    let c;

    const globalizables = [
        'Benchmarker',
        'CLI',
        'Cursor',
        'parseAdvanced',
        'stringifyAdvanced',
        // $c.JSONPA && (ctx.JSONPA = JSON.parseAdvanced);
        // $c.JSONSA && (ctx.JSONSA = JSON.stringifyAdvanced);
        'JSZip',
        'OrderedList',
        'Queue',
        'Set',
        'addObjectPrototype',
        'ajax',
        'yieldable',
        'catchAll',
        'clearCache',
        'clusterit',
        'cout',
        'createServer',
        'cuid',
        'emit',
        'error',
        'exclude',
        'fillTemplate',
        'foo',
        'include',
        'isNull',
        'isNullOrEmpty',
        'logit',
        'md5',
        'mkdirRecursive',
        'namespace',
        'next',
        'foo',
        'now',
        'parseBoolean',
        'parseRaw',
        'rand',
        'requireDirectory',
        'suid',
        'syncroit',
        'tryEval',
        'wait',
        'xmlToJson',
        'yieldable',
        'zipit',


        "access",
        "appendFile",
        "chmod",
        "chown",
        "close",
        "fchmod",
        "fchown",
        "fdatasync",
        "fstat",
        "fsync",
        "ftruncate",
        "futimes",
        "lchmod",
        "lchown",
        "link",
        "lstat",
        "mkdir",
        "mkdtemp",
        "open",
        "read",
        "readdir",
        "readFile",
        "readlink",
        "realpath",
        "rename",
        "rmdir",
        "stat",
        "symlink",
        "truncate",
        "unlink",
        "utimes",
        "write",
        "writeFile"
    ];
    beforeAll(() => {
        c = Common.$c;
        for (let i = 0, len = globalizables.length; i < len; i++) {
            Common.$c[globalizables[i]] = 1;
        }
    });
    afterAll(() => {
        if (c) { (Common as any).$c = c; }
    });
    it('should add properties to the context', () => {
        let context = { temp: 0 };
        const ctx = __contextualizeMethods(context);
        expect(ctx).toBe(context);
    });
    it('should add properties to the context with no args', () => {
        const ctx = __contextualizeMethods()
        for (let i = 0, len = globalizables.length; i < len; i++) {
            expect(ctx.hasOwnProperty(globalizables[i])).toBe(true);
        }
    });
});
