import _duplicate from '../../modules/protected/_duplicate';

describe('_duplicate', () => {
    describe('_duplicate', () => {
        it('should return null when undefined or null', () => {
            expect(_duplicate(null, {}, false)).toBe(null);
            expect(_duplicate(undefined, {}, false)).toBe(undefined);
            expect(_duplicate({}, undefined, false)).toBe(undefined);
            expect(_duplicate({}, null, false)).toBe(null);
        });
        it('should return same value when non reference is used', () => {
            expect(_duplicate("", "a", false)).toBe("a");
            expect(_duplicate(0, 1, false)).toBe(1);
            expect(_duplicate(1.777, 1.7777, false)).toBe(1.7777);
        });
        it('should return duplicate', () => {
            const b = { prop: 1 }
            const a = { b }
            const dup = _duplicate({} as any, a, false);
            expect(dup).not.toBe(a);
            expect(a.b).toBe(b);
        });
        it('should return deep duplicate', () => {
            const b = { prop: true }
            const a = { b }
            const dup = _duplicate({ b: { prop: true } } as any, a, true);
            expect(dup).not.toBe(a);
            expect(dup.b).toEqual(b);
            expect(dup.b).not.toBe(b);
        });
        it('should return duplicates of circular dependencies', () => {
            const circular: any = { b: null }
            const b = { prop: circular }
            circular.b = b;
            const a = { b }
            const dup = _duplicate({ b: { prop: true } } as any, a, true);
            expect(dup).not.toBe(a);
            expect(dup.b).toEqual(b);
        });
        it('should return duplicates of classes', () => {
            function c(this: any) { this.myprop = 0 }
            c.prototype.theprop = 0;
            const cls = new (c as any)();
            const a = { cls }
            const dup = _duplicate({ b: { prop: true } } as any, a, true);
            expect(dup.cls).toEqual(cls);
            expect(dup.cls).not.toBe(cls);
        });
        it('should return duplicates of functions', () => {
            function f(this: any) { this.myprop = 0 };
            const a = { f }
            const dup = _duplicate({ b: { prop: true } } as any, a, true);
            expect(dup.f.toString()).toEqual(f.toString());
            expect(dup.f).not.toBe(f);
        });
        it('should return duplicates of arrays', () => {
            const arr = [{ prop: true }]
            const a = { arr }
            const dup = _duplicate({ b: { prop: true } } as any, a, true);
            expect(dup.arr).toEqual(arr);
            expect(dup.arr).not.toBe(arr);
        });
    });
});

// export default function _duplicates<T>(obj: T, original: T, recursive: boolean, ref?: Ref, current_path?: string, exec?: Exec): T {
//     try {


//         // remove all properties if it is the root level
//         ref = ref || { objects: [{ obj: original, path: "obj" }] };
//         current_path = current_path || "obj";
//         exec = exec || { command: "" };

//         // (arguments[argIndex + 2] || (arguments[argIndex + 2] = {})) && (arguments[argIndex + 2].command = arguments[argIndex + 2].command || "");
//         if (!(ref.objects.length == 1)) {
//             for (let prop in obj) {
//                 if (obj.hasOwnProperty(prop)) { delete obj[prop]; }
//             }
//         }
//         const loop_func = function (prop: string, original: any, lExe: Exec) { // 0 => property, 1 => original object, 2 => reference path object, 3 => current path, 4 => command object
//             if (original.hasOwnProperty(prop) && original[prop] && recursive) {
//                 const index = indexOfAlt(ref.objects, original[prop], function (obj: any, value) {
//                     return obj.obj === value;
//                 }),
//                     new_path = current_path + "[" + parseRaw(prop) + "]";

//                 if (~index) {
//                     return lExe.command += new_path + "=" + ref.objects[index].path + ";";
//                 }

//                 if (typeof (original[prop]) in { "object": 1, "function": 1 } && recursive) {
//                     let isfunc = typeof (original[prop].constructor) == "function";
//                     if (isfunc && typeof (original[prop]) == "object") {
//                         obj[prop] = new original[prop].constructor();
//                     } else if (!isfunc) {
//                         obj[prop] = {};
//                     } else { obj[prop] = tryEval(original[prop].toString()); }
//                     ref.objects.push({ obj: original[prop], path: new_path });
//                     return _duplicate(obj[prop], original[prop], true, ref, new_path, lExe);
//                 }
//             } else if (!original.hasOwnProperty(prop)) {
//                 return;
//             }
//             obj[prop] = original[prop];
//         };
//         if (isArray(original)) {
//             // @ts-ignore
//             let i = 0, len = (original).length;
//             while (i++ < len) {
//                 loop_func.call(obj, i - 1, original, exec);
//             }
//         } else {
//             for (let prop in original) {
//                 if (!original.hasOwnProperty(prop)) { continue; }
//                 loop_func.call(obj, prop, original, exec);
//             }
//         }

//         if (!arguments[Args.CURRENT_PATH]) {
//             eval(arguments[Args.EXEC].command);
//         }

//         return obj;
//     } catch (e) {
//         error && error('_duplicate', e);
//         return null;
//     }
// }