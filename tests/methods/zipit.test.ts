import zipit from '../../compiled/transformedMinor/craydent.zipit';
import JSZip from '../../compiled/transformedMinor/craydent.jszip';

jest.mock('../../compiled/transformedMinor/craydent.jszip');
describe('zipit', () => {
    let mockInstance = 0;
    it('should generate zip with one file', () => {
        zipit('name', 'content');
        expect(JSZip).toHaveBeenCalled();
        const mockJSZip = (JSZip as any).mock.instances[mockInstance++];
        expect(mockJSZip.add).toHaveBeenCalledWith('name', 'content');
        expect(mockJSZip.generate).toHaveBeenCalled();
    });
    it('should generate zip with one file as object', () => {
        zipit({ name: 'name', content: 'content' });
        expect(JSZip).toHaveBeenCalled();
        const mockJSZip = (JSZip as any).mock.instances[mockInstance++];
        expect(mockJSZip.add).toHaveBeenCalledWith('name', 'content');
        expect(mockJSZip.generate).toHaveBeenCalled();
    });

    it('should generate zip with multiple files', () => {
        zipit([{ name: 'name', content: {} }, { name: 'name2', content: {} }]);
        expect(JSZip).toHaveBeenCalled();
        const mockJSZip = (JSZip as any).mock.instances[mockInstance++];
        expect(mockJSZip.add).toHaveBeenCalledTimes(2);
        expect(mockJSZip.generate).toHaveBeenCalled();
    });
});