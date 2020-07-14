import error from "../methods/error";
import isFunction from "../methods/isFunction";
import { $c } from "../private/__common";

export default function _invokeHashChange(): void | false {
    try {
        const $COMMIT: any = $c.$COMMIT;
        let hc = $COMMIT.onhashchange || $c.onhashchange;
        return isFunction(hc) && hc();
    } catch (e) {
        /* istanbul ignore next */
        error && error('_invokeHashChange', e);
    }
}