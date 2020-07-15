import _verbPayloadHelper from '../../modules/protected/_verbPayloadHelper';

describe('_verbPayloadHelper', () => {
    it('should return the data when variable is defined', () => {
        expect(_verbPayloadHelper({ raw: null, rawData: null } as any, 'data', {})).toEqual(false)
        expect(_verbPayloadHelper({ raw: "data", rawData: { data: 'data' } } as any, 'data', {})).toEqual('data');
    });
    it('should return all the data if variable is not defined', () => {
        expect(_verbPayloadHelper({ raw: null, rawData: { rawData: '' } } as any, '')).toEqual({ rawData: '' })
        expect(_verbPayloadHelper({ raw: 'data', rawData: null } as any, '')).toEqual('data');
        expect(_verbPayloadHelper({ raw: 'data', rawData: {} } as any, '')).toEqual({});
    });
    it('should return data when options are not provided', () => {
        expect(_verbPayloadHelper({ raw: 'data', rawData: { rawData: '' } } as any, 'data')).toEqual(false);
        expect(_verbPayloadHelper({ raw: 'data', rawData: { data: {} } } as any, 'data')).toEqual({});
    });
    it('should return data when options are provided', () => {
        expect(_verbPayloadHelper({ raw: 'data', rawData: { rawData: '' } } as any, 'Data', { ignoreCase: true })).toEqual(false);
        expect(_verbPayloadHelper({ raw: 'data', rawData: { data: {} } } as any, 'Data', 'ignoreCase')).toEqual({});
        expect(_verbPayloadHelper({ raw: 'data', rawData: { data: {} } } as any, 'Data', 'ignoreCase')).toEqual({});
        expect(_verbPayloadHelper({ raw: 'data', rawData: { data: {} } } as any, 'Datas', 'ignoreCase')).toEqual(false);
    });
});
