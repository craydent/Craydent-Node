import error from "../methods/error";
import $COMMIT from "../methods/$COMMIT";
import $COOKIE from "../methods/$COOKIE";
import _invokeHashChange from "./_invokeHashChange";
import { VerbOptions } from "../models/VerbOptions";

export default function _set<T>(variable: string, value: string, defer: boolean, options: VerbOptions, loc: T): T {
    try {
        const isNode = typeof window == 'undefined';
        value = encodeURI(value);
        let ignoreCase = (options as any).ignoreCase || options == "ignoreCase" ? "i" : "",
            regex = new RegExp(`(.*)?(${variable}=)(.*?)(([&]|[@])(.*)|$)`, ignoreCase),
            attr = "search",
            symbol = "&",
            queryStr = "";
        //noinspection CommaExpressionJS
        attr = variable.indexOf('@') == 0 ? (symbol = '', "hash") : attr;

        $COMMIT[attr] = $COMMIT[attr] || "";

        if (defer && !isNode) {
            $COMMIT[attr] = $COMMIT[attr] || loc[attr];
            queryStr = regex.test($COMMIT[attr]) ?
                $COMMIT[attr].replace(regex, `$1$2${value}$4`) :
                `${$COMMIT[attr]}${symbol}${variable}=${value}`;
            if (symbol == "&" && queryStr.indexOf('&') == 0) {
                queryStr = `?${queryStr.substring(1)}`;
            }
            $COMMIT[attr] = queryStr;
            ($COMMIT as any).update = true;
        } else {
            queryStr = regex.test(loc[attr]) ?
                loc[attr].replace(regex, `$1$2${value}$4`) :
                `${loc[attr]}${symbol}${variable}=${value}`;
            if (symbol == "&" && queryStr.indexOf('&') == 0) {
                queryStr = `?${queryStr.substring(1)}`;
            }
            loc[attr] = queryStr;
            if (attr == 'hash') {
                $COOKIE("CRAYDENTHASH", (loc as any).hash[0] == '#' ? (loc as any).hash.substring(1) : (loc as any).hash);
                !isNode && _invokeHashChange();
            }
        }
        return loc;
    } catch (e) /* istanbul ignore next */ {
        error && error("_set", e);
    }
}