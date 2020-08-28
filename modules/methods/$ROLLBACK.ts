import error from './error';
import $COMMIT from './$COMMIT';

export default function $ROLLBACK() {
    /*|{
        "info": "Rollback deferred changes from $GET, $SET, $DEL",
        "category": "Utility",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#$ROLLBACK",
        "returnType": "(void)"
    }|*/
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