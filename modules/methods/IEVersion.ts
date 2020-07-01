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
        if (this.navigator.appName == 'Microsoft Internet Explorer') {
            let ua = this.navigator.userAgent,
                re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) { rv = parseFloat(RegExp.$1); }
        }
        return rv;
    } catch (e) {
        error && error('IEVersion', e);
    }
}