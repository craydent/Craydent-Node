import isNull from '../methods/isNull';
import error from '../methods/error';

export default function isAsync(obj: any): boolean {
    try {
        if (isNull(obj)) { return false; }
        const __awaiterSyntax = '__awaiter(this, void 0, void 0';
        const __awaiterSyntax2 = '__awaiter(_this, void 0, void 0';
        if (~obj.toString().indexOf(__awaiterSyntax)
            || ~obj.prototype.constructor.toString().indexOf(__awaiterSyntax)
            || ~obj.toString().indexOf(__awaiterSyntax2)
            || ~obj.prototype.constructor.toString().indexOf(__awaiterSyntax2)) {
            return true;
        }
        return obj.prototype.constructor.name == 'async';
    } catch (e) /* istanbul ignore next */ {
        error && error('isAsync', e);
        return null;
    }
}