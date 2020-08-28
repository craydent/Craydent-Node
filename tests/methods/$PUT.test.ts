import $PUT from '../../modules/methods/$PUT';
jest.mock('../../modules/protected/_verbPayloadHelper', () => {
    return {
        "default": (dis, variable, method, options) => { _verbPayloadHelper(dis, variable, method, options); }
    }
});
let _invokeHashChange = () => { }, _verbPayloadHelper = (dis, variable, method, options) => { };
describe('$PUT', () => {
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
            const dis = {};
            _verbPayloadHelper = jest.fn();
            $PUT.call(dis);
            expect(_verbPayloadHelper).toHaveBeenCalledWith(dis, undefined, 'put', undefined);
        });
    });
});