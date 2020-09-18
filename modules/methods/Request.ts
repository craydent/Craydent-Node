import error from '../methods/error';

export default function Request() {
    /*|{
        "info": "Create cross browser XMLHttpRequest object",
        "category": "Utility",
        "parameters":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#Request",
        "returnType": "(XMLHttpRequest)"
    }|*/
    let ajaxHttpCaller;
    try {
        //request object for mozilla
        //@ts-ignore
        ajaxHttpCaller = new XMLHttpRequest();
    } catch (ex) {
        //request object for IE
        try {
            //@ts-ignore
            ajaxHttpCaller = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ex) {
            try {
                //@ts-ignore
                ajaxHttpCaller = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (ex) /* istanbul ignore next */ {
                error && error("Request", ex);
                return null;
            }
        }
    }
    return ajaxHttpCaller;
}