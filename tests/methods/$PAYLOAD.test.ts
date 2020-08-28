import $PAYLOAD from '../../modules/methods/$PAYLOAD';
jest.mock('../../modules/protected/_verbPayloadHelper', () => {
    return {
        "default": (dis, variable, method, options) => { _verbPayloadHelper(dis, variable, method, options); }
    }
});
let _invokeHashChange = () => { }, _verbPayloadHelper = (dis, variable, method, options) => { };
describe('$PAYLOAD', () => {
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
            $PAYLOAD.call(dis);
            expect(_verbPayloadHelper).toHaveBeenCalledWith(dis, undefined, 'payload', undefined);
        });
    });
});