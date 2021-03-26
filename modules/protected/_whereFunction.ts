import foo from '../methods/foo';

export type WhereFunctionOptions<T> = {
    objs: T[],
    condition: (this: T, index: number, objs: T[]) => boolean,
    limit?: number
};
export default function _whereFunction<T>(options: WhereFunctionOptions<T>): T[] {
    let objs: any[] = options.objs, condition:any = options.condition || foo;
    let limit = 0,
        jlen = objs.length,
        rarr:any[] = [];

    limit = options.limit || jlen;
    for (let j = 0; j < jlen && rarr.length < limit; j++) {
        let v: any = objs[j];
        const cb = condition.bind(v);
        if (cb(j, objs)) {
            rarr.push(v);
        }
    }

    return rarr;
}