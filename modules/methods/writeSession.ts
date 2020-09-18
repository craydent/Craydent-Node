import getProperty from '../methods/getProperty';
import * as fs from 'fs';
import foo from '../methods/foo';
import error from '../methods/error';
import { $c } from '../private/__common';

export default function writeSession() {
    /*|{
        "info": "Writes session to filesystem to be retrieved later.",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#writeSession",
        "returnType": "(void)"
    }|*/
    try {
        let sessionid = this.sessionid, session = this.session;
        /* istanbul ignore else */
        if (sessionid) {
            if ($c.BALANCE_SERVER_LIST) {
                const otherServers = $c.BALANCE_SERVER_LIST.filter(function (ip) {
                    return $c.PUBLIC_IP != ip;
                });
                // save session to other load balanced servers
                // for (let i = 0, len = otherServers.length; i < len; i++) {
                //     if (getProperty(this, 'response.setHeader') && !getProperty(this, 'response.headersSent')) {
                //         this.response.setHeader("Set-Cookie", [`NODEJSSESSION=${sessionid}; path=/`]);
                //     }
                //     fs.writeFile(`craydent/session/${sessionid}`, JSON.stringify(session), foo);
                // }
            }
            // save session to this server
            if (getProperty(this, 'response.setHeader') && !getProperty(this, 'response.headersSent')) {
                this.response.setHeader("Set-Cookie", [`NODEJSSESSION=${sessionid}; path=/`]);
            }
            fs.writeFile(`craydent/session/${sessionid}`, JSON.stringify(session), foo);
        }

    } catch (e) /* istanbul ignore next */ {
        error && error('writeSession', e);
    }
}