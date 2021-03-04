import extend from '../../compiled/transformedMinor/craydent.extend';
import foo from '../../compiled/transformedMinor/craydent.foo';
jest.mock('../../compiled/transformedMinor/craydent.namespace', () => {
    return {
        "default": (...args) => _namespace.apply(this, args)
    }
});
let _namespace = () => { }
describe('extend', () => {
    beforeEach(() => {
        _namespace = () => { }
    });
    it('should inherit properties', () => {
        function classA() {
            this.a = 1;
        }
        function classB() {
            this.b = 2;
        }
        classB.prototype.temp = 0;
        classB.temp2 = 1;
        extend(classA, classB);
        const cls = new classA();

        expect(cls.a).toBe(1);
        expect(cls.b).toBe(2);
        expect(cls.temp).toBe(0);
        expect((classA as any).temp2).toBe(1);
        expect(cls.construct).toBe(foo);
    });
    it('should inherit only owned properties', () => {
        function classA() {
            this.a = 1;
            this.b = 1;
        }
        function classB() {
            this.b = 2;
        }
        classB.prototype.temp = 0
        classB.temp2 = 1;
        extend(classA, classB, true);
        const cls = new classA();
        expect(cls.a).toBe(1);
        expect(cls.b).toBe(1);
        expect(cls.temp).toBe(undefined);
        expect((classA as any).temp2).toBe(undefined);
        expect(cls.construct).toBe(foo);
    });
});