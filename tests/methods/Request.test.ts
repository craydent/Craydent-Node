import Request from '../../compiled/transformedMinor/craydent.request';
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
        expect(Request()).toEqual(new (XMLHttpRequest as any)());
    });
    it('should create ActiveXObject when XMLHttpRequest does not exists', () => {

        function ActiveXObject(type: any) {
            if (type == "Msxml2.XMLHTTP") { return; }
            if (type == "Microsoft.XMLHTTP") { throw ''; }
        }
        (global as any).ActiveXObject = ActiveXObject;
        expect(Request()).toEqual(new (ActiveXObject as any)(''));
    })
    it('should return null when all fails', () => {

        function ActiveXObject(type: any) {
            if (type == "Msxml2.XMLHTTP") { throw ''; }
            if (type == "Microsoft.XMLHTTP") { throw ''; }
        }
        (global as any).ActiveXObject = ActiveXObject;
        expect(Request()).toEqual(null);
    })
});
