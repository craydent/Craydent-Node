import error from './error';

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
        const $COMMIT = (window as any).$c.$COMMIT || (window as any).$COMMIT;
        delete $COMMIT.update;
        delete $COMMIT.noHistory;
        delete $COMMIT.search;
        delete $COMMIT.hash;
        delete $COMMIT.onhashchange;
    } catch (e) {
        error && error('$ROLLBACK', e);
    }
}