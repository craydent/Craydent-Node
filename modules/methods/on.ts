import error from './error';

export default function on(obj: any, ev: string, func: Function): void {
    try {
        const eventName = `_${ev}`;
        obj[eventName] = obj[eventName] || [];
        obj[eventName].push(func);
    } catch (e) {
        error && error("Function.on", e);
    }
}
