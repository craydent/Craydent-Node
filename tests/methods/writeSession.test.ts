import writeSession from '../../compiled/transformedMinor/craydent.writesession';
import { $c } from '../../compiled/transformedMinor/craydent.writesession/private/__common';

jest.mock('fs', () => {
    return {
        writeFile: (...args) => {
            return fsMocks.writeFile.apply(this, args)
        }
    }
});
let fsMocks = {
    writeFile: (...args) => {
    }
}
describe('writeSession', () => {
    it('should write to the session', () => {
        fsMocks.writeFile = jest.fn();
        const setHeader = jest.fn();
        const dis = {
            response: { setHeader },
            sessionid: 'id',
            session: {}
        };
        writeSession.call(dis);
        expect(setHeader).toHaveBeenCalledWith("Set-Cookie", [`NODEJSSESSION=id; path=/`]);
        expect(fsMocks.writeFile).toHaveBeenCalledWith('craydent/session/id', '{}', expect.any(Function));
    })
    it('should write to the session but not set headers when headers have been sent', () => {
        fsMocks.writeFile = jest.fn();
        const setHeader = jest.fn();
        const dis = {
            response: { setHeader, headersSent: true },
            sessionid: 'id',
            session: {}
        };
        writeSession.call(dis);
        expect(setHeader).not.toHaveBeenCalled();
        expect(fsMocks.writeFile).toHaveBeenCalledWith('craydent/session/id', '{}', expect.any(Function));
    })
    it('should write to the session and handle balanced server list', () => {
        fsMocks.writeFile = jest.fn();
        const bsl = $c.BALANCE_SERVER_LIST;
        $c.BALANCE_SERVER_LIST = [1];
        const setHeader = jest.fn();
        const dis = {
            response: { setHeader },
            sessionid: 'id',
            session: {}
        };
        writeSession.call(dis);
        expect(setHeader).toHaveBeenCalledWith("Set-Cookie", [`NODEJSSESSION=id; path=/`]);
        expect(fsMocks.writeFile).toHaveBeenCalledWith('craydent/session/id', '{}', expect.any(Function));
        $c.BALANCE_SERVER_LIST = bsl;
    })
});
