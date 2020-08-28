import getProperty from '../../modules/methods/getProperty';
describe('getProperty', () => {
    const obj = {
        prop: {
            nested: 1,
            value: undefined,
            arr: [
                { nested: 2 }
            ]
        },
        parital: 3,
    };
    it('should retrieve nested property using string path', () => {
        expect(getProperty(obj, 'prop.nested')).toBe(1);
        expect(getProperty(obj, 'prop.value')).toBe(undefined);
        expect(getProperty(obj, 'prop.arr.0.nested')).toBe(2);
        expect(getProperty(obj, 'prop.arr[0].nested')).toBe(2);
        expect(getProperty(obj, 'prop.arr[10].nested')).toBe(undefined);
    })
    it('should retrieve nested property using a options', () => {
        expect(getProperty(obj, 'prop/nested', '/')).toBe(1);
        const options: any = { noInheritance: true };
        expect(getProperty(obj, 'prop.arr.0.nested', options)).toBe(2);
        expect(options.validPath).toBe(1);
        expect(getProperty(obj, 'prop.arr[10].nested', options)).toBe(undefined);
        expect(options.validPath).toBe(0);
    })
    it('should retrieve nested property using regex path', () => {
        expect(getProperty(obj, /par/)).toBe(3);
        expect(getProperty(obj, /pars/)).toBe(undefined);
    })
});
