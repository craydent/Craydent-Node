import error from '../methods/error';
import isString from '../methods/isstring';
import isObject from '../methods/isobject';
import isArray from '../methods/isarray';
import JSZip from '../methods/JSZip';
import { AnyObject } from '../models/Generics';

export default function zipit(files: Array<{ name: string, content: string | AnyObject }>): string;
export default function zipit(file: { name: string, content: string | AnyObject }): string;
export default function zipit(filename: string, content: string | AnyObject/*=NULL*/): string;
export default function zipit(files: any, content?: any): string {
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
        "returnType": "(String)"
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
    return "";
}