import error from './error';
import _invokeHashChange from '../protected/_invokeHashChange';
import $COOKIE from './$COOKIE';
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
        let COMMIT: any = $COMMIT;
        options = options || {};
        let noHistory = (options as any).noHistory || options == "noHistory" || options == "h";
        if (COMMIT.update) {
            if (COMMIT.search) {
                if (noHistory) {
                    location.replace(COMMIT.search + (COMMIT.hash || ""));
                } else {
                    location.href = COMMIT.search + (COMMIT.hash || "");
                }
            } else if (COMMIT.hash) {
                let hash = COMMIT.hash[0] == '#' ? COMMIT.hash : `#${COMMIT.hash}`;
                if (noHistory) {
                    location.replace(hash);
                } else {
                    location.hash = hash;
                }
                $COOKIE("CRAYDENTHASH", hash);
                _invokeHashChange();
            }
            $ROLLBACK();
        }
    } catch (e) /* istanbul ignore next */ {
        error && error('$COMMIT', e);
    }
}
export function $ROLLBACK() {
    try {
        delete $COMMIT['update'];
        delete $COMMIT['noHistory'];
        delete $COMMIT['search'];
        delete $COMMIT['hash'];
        delete $COMMIT['onhashchange'];
    } catch (e) /* istanbul ignore next */ {
        error && error('$ROLLBACK', e);
    }
}