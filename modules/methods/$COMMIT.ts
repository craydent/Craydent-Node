import error from './error';
import _invokeHashChange from '../protected/_invokeHashChange';
import $COOKIE from './$COOKIE';
import $ROLLBACK from './$ROLLBACK';
import { VerbOptions } from '../models/VerbOptions';

export default function $COMMIT(options?: VerbOptions) {
    /*|{
        "info": "Commit changes using $GET, $SET, and $DEL with defer flag",
        "category": "Utility",
        "featured": true,
        "parameters":[],

        "overloads":[
            {"parameters":[
                {"options": "specify options for no history, etc"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#$COMMIT",
        "returnType": "(void)"
    }|*/
    try {
        options = options || {};
        let noHistory = (options as any).noHistory || options == "noHistory" || options == "h";
        if (($COMMIT as any).update) {
            if (($COMMIT as any).search) {
                if (noHistory) {
                    location.replace(($COMMIT as any).search + (($COMMIT as any).hash || ""));
                } else {
                    location.href = ($COMMIT as any).search + (($COMMIT as any).hash || "");
                }
            } else if (($COMMIT as any).hash) {
                if (noHistory) {
                    let hash = ($COMMIT as any).hash[0] == '#' ? ($COMMIT as any).hash : `#${($COMMIT as any).hash}`;
                    location.replace(($COMMIT as any).hash);
                } else {
                    location.hash = ($COMMIT as any).hash;
                }
                $COOKIE("CRAYDENTHASH", location.hash[0] == '#' ? location.hash.substring(1) : location.hash);
                _invokeHashChange();
            }
            $ROLLBACK();
        }
    } catch (e) {
        error && error('$COMMIT', e);
    }
}