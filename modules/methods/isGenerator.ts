import _typeCheck from '../protected/_typeCheck';

export default function isGenerator(obj: any): boolean {
    return _typeCheck(obj, "GeneratorFunction", true);
}