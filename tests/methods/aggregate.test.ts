import aggregate from '../../compiled/transformedMinor/craydent.aggregate';
jest.mock('../../compiled/transformedMinor/craydent.where', () => {
    return {
        "__processStage": (...args) => __processStage.apply(this, args)
    }
});
let __processStage = () => { };

describe('aggregate', () => {
    beforeEach(() => {
        __processStage = jest.fn().mockImplementationOnce(() => []);
    });
    it('should use __processStage to aggregate', () => {
        expect(aggregate([], [{}])).toEqual([]);
        expect(__processStage).toHaveBeenLastCalledWith([], {});
    });
    it('should use __processStage to aggregate and return sample', () => {
        let sample = [];
        (sample as any).sample = [{}];
        __processStage = jest.fn().mockImplementationOnce(() => sample);
        expect(aggregate([], [{}])).toEqual([{}]);
        expect(__processStage).toHaveBeenLastCalledWith([], {});
    });
    it('should use __processStage to aggregate using $group', () => {
        let sample = [];
        (sample as any).sample = [{}];
        __processStage = jest.fn().mockImplementationOnce(() => sample);
        expect(aggregate([], [{ $group: true }])).toBe(sample);
        expect(__processStage).toHaveBeenLastCalledWith([], { $group: true });
    });
});
