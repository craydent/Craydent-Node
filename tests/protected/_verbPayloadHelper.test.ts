import _verbPayloadHelper from '../../modules/protected/_verbPayloadHelper';

describe('_verbPayloadHelper', () => {
    it('should return the data when variable is defined', () => {
        expect(_verbPayloadHelper({ raw: null, rawData: null } as any, 'data', 'get', {})).toEqual(false)
        expect(_verbPayloadHelper({ raw: "data", rawData: { get: { data: 'data' } } } as any, 'data', 'payload', {})).toEqual('data');
    });
    it('should return all the data if variable is not defined', () => {
        expect(_verbPayloadHelper({ raw: null, rawData: { delete: { rawData: '' } } } as any, '', 'delete')).toEqual({ rawData: '' })
        expect(_verbPayloadHelper({ raw: 'data', rawData: null } as any, '', 'put')).toEqual({});
        expect(_verbPayloadHelper({ raw: 'data', rawData: {} } as any, '', 'post')).toEqual({});
    });
    it('should return data when options are not provided', () => {
        expect(_verbPayloadHelper({ raw: 'data', rawData: { get: { rawData: '' } } } as any, 'data', 'get')).toEqual(false);
        expect(_verbPayloadHelper({ raw: 'data', rawData: { get: { data: {} } } } as any, 'data', 'get')).toEqual({});
    });
    it('should return data when options are provided', () => {
        expect(_verbPayloadHelper({ raw: 'data', rawData: { get: { rawData: '' } } } as any, 'Data', 'get', { ignoreCase: true })).toEqual(false);
        expect(_verbPayloadHelper({ raw: 'data', rawData: { get: { data: {} } } } as any, 'Data', 'get', 'ignoreCase')).toEqual({});
        expect(_verbPayloadHelper({ raw: 'data', rawData: { get: { data: {} } } } as any, 'Data', 'get', 'ignoreCase')).toEqual({});
        expect(_verbPayloadHelper({ raw: 'data', rawData: { get: { data: {} } } } as any, 'Datas', 'get', 'ignoreCase')).toEqual(false);
    });
});
