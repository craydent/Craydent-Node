import add from '../../compiled/transformedMinor/craydent.add';
import md5 from '../../compiled/transformedMinor/craydent.md5';
import { create } from 'domain';
jest.mock('crypto', () => {
    return {
        "createHash": (...args: any[]) => createHash.apply(this, args as any)
    }
});
let createHash = () => { };
let update = () => { };
let digest = () => { };
describe('add', () => {
    beforeEach(() => {
        createHash = () => { };
        update = () => { };
        digest = () => { };
    });
    it('should add to the array and index', () => {
        update = jest.fn();
        digest = jest.fn(() => 'digest');
        createHash = jest.fn(() => ({ update, digest }));
        expect(md5('md5string')).toBe('digest');
        expect(createHash).toHaveBeenCalledWith('md5');
        expect(update).toHaveBeenCalledWith('md5string');
        expect(digest).toHaveBeenCalledWith('hex');
    });
});