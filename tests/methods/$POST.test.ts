import $POST from '../../compiled/transformedMinor/craydent.http.post';
jest.mock('../../compiled/transformedMinor/craydent.http.post/protected/_verbPayloadHelper', () => {
    return {
        "default": (dis: any, variable: any, method: any, options: any) => { _verbPayloadHelper(dis, variable, method, options); }
    }
});
let _invokeHashChange = () => { }, _verbPayloadHelper = (dis: any, variable: any, method: any, options: any) => { };
describe('$POST', () => {
    describe('NodeJS', () => {
        const win = window;
        beforeAll(() => {
            delete (window as any).window;
        });
        afterAll(() => {
            (global as any).window = win;
        });
        beforeEach(() => {
            _verbPayloadHelper = () => { };
        });
        it('should run nodeJS logic', () => {
            const dis: any = {};
            _verbPayloadHelper = jest.fn();
            $POST.call(dis);
            expect(_verbPayloadHelper).toHaveBeenCalledWith(dis, undefined, 'post', undefined);
        });
    });
});