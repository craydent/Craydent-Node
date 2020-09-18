import $c from '../../transformedMajor/xml-to-json/noConflict';

describe('No Conflict Global methods', function () {
    it('xmlToJson', function () {
        var data = `<?xml version="1.0" encoding="UTF-8" ?>
        <employees att1="wwww">
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
        </employees>`;
        expect($c.xmlToJson(data.toString())).toEqual({
            employees: {
                employee: [{
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
                }],
                '@attributes': { att1: 'wwww' }
            }
        });
    });

});
