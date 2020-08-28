import error from './error';

export default function IEVersion(this: Craydent | Window) {
    /*|{
        "info": "Get Internet Explorer version",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#IEVersion",
        "returnType": "(Float)"
    }|*/
    try {
        let rv = -1;
        let name = this.navigator.appName;
        let ua = this.navigator.userAgent;
        /* istanbul ignore else */
        if (name == 'Microsoft Internet Explorer') {
            let re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            /* istanbul ignore else */
            if (re.exec(ua) != null) { rv = parseFloat(RegExp.$1); }
        } else if (name == 'Netscape') {
            let re = new RegExp("Edge/(\\d+(\\.\\d+)*)");
            if (re.exec(ua) != null) { rv = parseFloat(RegExp.$1); }
            if (rv == -1) {
                re = new RegExp("rv:(\\d+(:?\\.\\d+)*)");
                /* istanbul ignore else */
                if (re.exec(ua) != null) { rv = parseFloat(RegExp.$1); }
            }
        }
        return rv;
    } catch (e) /* istanbul ignore next */ {
        error && error('IEVersion', e);
    }
}