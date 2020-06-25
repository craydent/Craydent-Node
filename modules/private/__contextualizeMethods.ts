import error from '../methods/error';

export default function __contextualizeMethods<T>(ctx: T): T {
    try {
        // @ts-ignore
        ctx = ctx || {};

        for (let i = 0, len = globalizables.length; i < len; i++) {
            $c[globalizables[i]] && (ctx[globalizables[i]] = $c[globalizables[i]]);
        }

        return ctx;
    } catch (e) {
        error && error('__contextualizeMethods', e);
        return null;
    }
}
const fsmethods = [
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
],
    globalizables = [
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
        'zipit'
    ].concat(fsmethods);