import error from './error';
import isString from './isString';
import isObject from './isObject';
import isArray from './isArray';
import JSZip from './JSZip';
import { AnyObject } from '../models/Arrays';

export default function zipit(files: Array<{ name: string, content: string | AnyObject }>);
export default function zipit(file: { name: string, content: string | AnyObject });
export default function zipit(filename: string, content: string | AnyObject/*=NULL*/);
export default function zipit(files, content?) {
    /*|{
        "info": "Download a zip of files from file contents",
        "category": "Utility",
        "featured": true,
        "parameters":[
            {"files": "(FileObject[]) Objects containing properties name for file name and content for file content"}],

        "overloads":[
            {"parameters":[
                {"filename": "(String) Name of the file"},
                {"content": "(String) contents of the file"}]}],

        "url": "http://www.craydent.com/library/1.9.3/docs#zipit",
        "returnType": "(void)"
    }|*/
    try {
        files = (content && isString(files) && [{
            name: files,
            content: content
        }]) || isObject(files) && [files] || isArray(files) && files;
        let zip = new JSZip();
        for (let i = 0, len = files.length; i < len; i++) {
            let file = files[i];
            content = file.content;
            if (isObject(content)) {
                file.content = JSON.stringify(content, null, "\t");
            }

            zip.add(file.name, (file.pretext || "") + file.content + (file.posttext || ""));
        }

        content = zip.generate();
        return content;
    } catch (e) /* istanbul ignore next */ {
        error && error('zipit', e);
    }
}