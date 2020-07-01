import error from "../methods/error";
import isFunction from "../methods/isFunction";

export default function _invokeHashChange() {
    try {
        const $COMMIT = (window as any).$c.$COMMIT || (window as any).$COMMIT;
        let hc = ($COMMIT as any).onhashchange || (window as any).$c.onhashchange;
        hc && isFunction(hc) && hc();
    } catch (e) {
        error && error('_invokeHashChange', e);
    }
}