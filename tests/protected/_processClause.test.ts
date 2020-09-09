import _processClause from '../../modules/protected/_processClause';
describe('_processClause', () => {
    it('should convert =', () => {
        expect(_processClause("name='value'")).toEqual({ $or: [{ $and: [{ name: { $equals: 'value' } }] }] });
        expect(_processClause("name = 'value'")).toEqual({ $or: [{ $and: [{ name: { $equals: 'value' } }] }] });
    })
    it('should convert <>', () => {
        expect(_processClause("name<>'value'")).toEqual({ $or: [{ $and: [{ name: { $ne: 'value' } }] }] });
        expect(_processClause("name <> 'value'")).toEqual({ $or: [{ $and: [{ name: { $ne: 'value' } }] }] });
    })
    it('should convert >', () => {
        expect(_processClause("name>'value'")).toEqual({ $or: [{ $and: [{ name: { $gt: 'value' } }] }] });
        expect(_processClause("name > 'value'")).toEqual({ $or: [{ $and: [{ name: { $gt: 'value' } }] }] });
    })
    it('should convert >=', () => {
        expect(_processClause("name>='value'")).toEqual({ $or: [{ $and: [{ name: { $gte: 'value' } }] }] });
        expect(_processClause("name >= 'value'")).toEqual({ $or: [{ $and: [{ name: { $gte: 'value' } }] }] });
    })
    it('should convert <', () => {
        expect(_processClause("name<'value'")).toEqual({ $or: [{ $and: [{ name: { $lt: 'value' } }] }] });
        expect(_processClause("name < 'value'")).toEqual({ $or: [{ $and: [{ name: { $lt: 'value' } }] }] });
    })
    it('should convert <=', () => {
        expect(_processClause("name<='value'")).toEqual({ $or: [{ $and: [{ name: { $lte: 'value' } }] }] });
        expect(_processClause("name <= 'value'")).toEqual({ $or: [{ $and: [{ name: { $lte: 'value' } }] }] });
    })
    it('should convert between', () => {
        expect(_processClause('between 1 and 2')).toEqual({ $or: [{ $and: [{ $gte: 1 }, { $lte: 2 }] }] });
    })
    it('should convert in', () => {
        expect(_processClause('name in (1,2)')).toEqual({ $or: [{ $and: [{ name: { $in: [1, 2] } }] }] });
    })
    it('should convert is null', () => {
        expect(_processClause('name is null')).toEqual({ $or: [{ $and: [{ name: { $equals: null } }] }] });
    })
    it('should convert is not null', () => {
        expect(_processClause('name is not null')).toEqual({ $or: [{ $and: [{ name: { $ne: null } }] }] });
    })
    it('should convert like', () => {
        expect(_processClause("name like '%val%'")).toEqual({ $or: [{ $and: [{ name: { $regex: /^.*?val.*?$/i } }] }] });
    })
});
