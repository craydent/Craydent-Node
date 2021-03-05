import { AnyObject } from '../models/Generics';

export default function xmlToJson(xml: string | XMLDocument, ignoreAttributes?: boolean): AnyObject;
export default function xmlToJson(xml: string | XMLDocument, ignoreAttributes?: boolean, _refs?: any): AnyObject