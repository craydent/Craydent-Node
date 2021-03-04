import { __processChildren, __processSiblings, default as xmlToJson } from '../../compiled/transformedMajor/xml-to-json/protected/_xmltojson';

describe('xmlToJson', () => {
    describe('main', () => {
        it('should process xml', () => {
            const xml = `<![CDATA[<sender>John Smith</sender>]]>
<?xml version="1.0" encoding="UTF-8" ?>
<employees att1="wwww">
    <employee att="att" />
    <employee att2="eeeewwww">22222
        <id>1</id>adsfa
        <firstName attrs="1"attr2="2">aadsf</firstName>1111
        <lastName>DiCaprio</lastName>
        <photo>http://1.bp.blogspot.com/-zvS_6Q1IzR8/T5l6qvnRmcI/AAAAAAAABcc/HXO7HDEJKo0/s200/Leonardo+Dicaprio7.jpg</photo>
    </employee>
    <employee>
        <id>2</id>
        <firstName>Johnny</firstName>
        <lastName>Depp</lastName>
        <photo>http://4.bp.blogspot.com/_xR71w9-qx9E/SrAz--pu0MI/AAAAAAAAC38/2ZP28rVEFKc/s200/johnny-depp-pirates.jpg</photo>
    </employee>
    <employee>
        <id>3</id>
        <firstName>Hritik</firstName>
        <lastName>Roshan</lastName>
        <photo>http://thewallmachine.com/files/1411921557.jpg</photo>
    </employee>
    <employee/>
</employees>`;
            const expected = {
                '#text': '<sender>John Smith</sender>',
                employees: {
                    employee: [{
                        '@attributes': { att: 'att' }
                    }, {
                        '#text': '22222adsfa1111',
                        id: '1',
                        firstName: 'aadsf',
                        lastName: 'DiCaprio',
                        photo: 'http://1.bp.blogspot.com/-zvS_6Q1IzR8/T5l6qvnRmcI/AAAAAAAABcc/HXO7HDEJKo0/s200/Leonardo+Dicaprio7.jpg',
                        '@attributes': { att2: 'eeeewwww' }
                    }, {
                        id: '2',
                        firstName: 'Johnny',
                        lastName: 'Depp',
                        photo: 'http://4.bp.blogspot.com/_xR71w9-qx9E/SrAz--pu0MI/AAAAAAAAC38/2ZP28rVEFKc/s200/johnny-depp-pirates.jpg'
                    }, {
                        id: '3',
                        firstName: 'Hritik',
                        lastName: 'Roshan',
                        photo: 'http://thewallmachine.com/files/1411921557.jpg'
                    }, ''],
                    '@attributes': { att1: 'wwww' }
                }
            };
            expect(xmlToJson(xml)).toEqual(expected);
        });
    });
    describe('__processChildren', () => {
        it('should process no children', () => {
            expect(__processChildren('div', [], '', {})).toEqual({ div: '' });
        });
        it('should process 1 child', () => {
            expect(__processChildren('span', ['<span id="id">abc</span>'], '', {}, true)).toEqual({ span: 'abc' });
            expect(__processChildren('span', ['<span id="id"><span>abc</span></span>'], '', {}, true)).toEqual({ span: { span: 'abc' } });
        });
        it('should process children', () => {
            expect(__processChildren('span', ['<span><span>abc</span></span>', '<span>def</span>'], '', {})).toEqual({ span: [{ span: 'abc' }, 'def'] });
        });
        it('should process children having nested children', () => {
            expect(__processChildren('span', ['<span><span>abc</span><span>xyz</span></span>', '<span>def</span>'], '', {})).toEqual({ span: [{ span: ['abc', 'xyz'] }, 'def'] });
        });
    });
    describe('__processSiblings', () => {
        it('should process siblings', () => {
            expect(__processSiblings('<span>abc</span><span>def</span>', null)).toEqual({ span: ['abc', 'def'] });

        });
        it('should process siblings with text', () => {
            expect(__processSiblings('xyz<span><span>abc</span><span>ccc</span><span>ddd</span></span>aaa<bbb<span>def</span><span /><span></span>', null))
                .toEqual({ span: [{ span: ['abc', 'ccc', 'ddd'] }, 'def', '', ''], '#text': 'xyzaaabbb' });
        });
    });
});