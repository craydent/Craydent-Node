import { $ROLLBACK as RB } from '../methods/http.commit';

export default function $ROLLBACK(): void {
    /*|{
        "info": "Rollback deferred changes from $GET, $SET, $DEL",
        "category": "Utility",
        "featured": true,
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#$ROLLBACK",
        "returnType": "(void)"
    }|*/
    RB();
}