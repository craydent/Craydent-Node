import error from "../methods/error";
import $COMMIT from "../methods/$COMMIT";
import $COOKIE from "../methods/$COOKIE";
import _invokeHashChange from "./_invokeHashChange";
import { VerbOptions } from "../models/VerbOptions";

export default function _set(variable: string, value: string, defer: boolean, options: VerbOptions, loc: any) {
    try {
        value = encodeURI(value);
        let ignoreCase = (options as any).ignoreCase || options == "ignoreCase" ? "i" : "",
            regex = new RegExp(`(.*)?(${variable}=)(.*?)(([&]|[@])(.*)|$)`, ignoreCase),
            attr = "search",
            symbol = "&",
            queryStr = "";
        //noinspection CommaExpressionJS
        attr = variable.indexOf('@') == 0 ? (symbol = '', "hash") : attr;

        $COMMIT[attr] = $COMMIT[attr] || "";

        if (defer) {
            $COMMIT[attr] = ($COMMIT[attr] || location[attr]);
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
                `${loc[attr]}${symbol}$variable=${value}`;
            if (symbol == "&" && queryStr.indexOf('&') == 0) {
                queryStr = `?${queryStr.substring(1)}`;
            }
            loc[attr] = queryStr;
            if (attr == 'hash') {
                $COOKIE("CRAYDENTHASH", loc.hash[0] == '#' ? loc.hash.substring(1) : loc.hash);
                _invokeHashChange();
            }
        }
        return loc;
    } catch (e) {
        error && error("_set", e);
    }
}