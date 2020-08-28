import Request from '../../modules/methods/Request';
describe('Request', () => {
    let _XMLHttpRequest = (global as any).XMLHttpRequest;
    let _ActiveXObject = (global as any).ActiveXObject;
    function XMLHttpRequest() { }
    beforeEach(() => {
        delete (global as any).XMLHttpRequest;
        delete (global as any).ActiveXObject;
    });
    afterAll(() => {
        _XMLHttpRequest && ((global as any).XMLHttpRequest = _XMLHttpRequest);
        _ActiveXObject && ((global as any).ActiveXObject = _ActiveXObject);
    });
    it('should create XMLHttpRequest when it exists', () => {
        (global as any).XMLHttpRequest = XMLHttpRequest
        expect(Request()).toEqual(new XMLHttpRequest());
    });
    it('should create ActiveXObject when XMLHttpRequest does not exists', () => {

        function ActiveXObject(type) {
            if (type == "Msxml2.XMLHTTP") { return; }
            if (type == "Microsoft.XMLHTTP") { throw ''; }
        }
        (global as any).ActiveXObject = ActiveXObject;
        expect(Request()).toEqual(new ActiveXObject(''));
    })
    it('should return null when all fails', () => {

        function ActiveXObject(type) {
            if (type == "Msxml2.XMLHTTP") { throw ''; }
            if (type == "Microsoft.XMLHTTP") { throw ''; }
        }
        (global as any).ActiveXObject = ActiveXObject;
        expect(Request()).toEqual(null);
    })
});
