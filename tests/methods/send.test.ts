import send from '../../compiled/transformedMinor/craydent.send';
describe('send', () => {
    it('should send response when no status is provided', () => {
        const dis: any = {
            header: jest.fn(),
            end: jest.fn()
        }
        send.call(dis, {});
        expect(dis.header).toHaveBeenCalledWith({ 'Content-Type': 'application/json' });
        expect(dis.end).toHaveBeenCalledWith(200, '{}');
    })
    it('should send response with status provided', () => {
        const dis: any = {
            header: jest.fn(),
            end: jest.fn()
        }
        send.bind(dis)(400, 'abcd');
        expect(dis.header).not.toHaveBeenCalled();
        expect(dis.end).toHaveBeenCalledWith(400, '"abcd"');
    })
});
