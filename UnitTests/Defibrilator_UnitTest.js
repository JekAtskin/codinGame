
function testparseDEFIB()
{
    parseDEFIB("1;Maison de la Prevention Sante;6 rue Maguelone 340000 Montpellier;;3,87952263361082;43,6071285339217");
    parseDEFIB("2;Hotel de Ville;1 place Georges Freche 34267 Montpellier;;3,89652239197876;43,5987299452849");
    parseDEFIB("3;Zoo de Lunaret;50 avenue Agropolis 34090 Mtp;;3,87388031141133;43,6395872778854");

	// test
    UnitTests.assertStrictEquals(addressBook.length, 3, "Check addressbook length");
	UnitTests.assertDeepEquals(addressBook, [{
            "number": 1,
            "name": 'Maison de la Prevention Sante',
            "address": '6 rue Maguelone 340000 Montpellier',
            "contactPhone": '1',
            "lon": 3.87952263361082,
            "lat": 43.6071285339217,
            "lonRad": 0.06771044336215043,
            "latRad": 0.7610879702573016
        }, {
            "number": 2,
            "name": 'Hotel de Ville',
            "address": '1 place Georges Freche 34267 Montpellier',
            "contactPhone": '2',
            "lon": 3.89652239197876,
            "lat": 43.5987299452849,
            "lonRad": 0.06800714511771445,
            "latRad": 0.7609413872330687
        }, {
            "number": 3,
            "name": 'Zoo de Lunaret',
            "address": '50 avenue Agropolis 34090 Mtp',
            "contactPhone": '3',
            "lon": 3.87388031141133,
            "lat": 43.6395872778854,
            "lonRad": 0.06761196626231097,
            "latRad": 0.7616544822105299
        }], "parseDEFIB - Sample input");
}

function testdegreeToRadian()
{
    UnitTests.assertStrictEquals(degreeToRadian(0), 0, "0°")
    UnitTests.assertStrictEquals(degreeToRadian(90), Math.PI / 2, "90°")
    UnitTests.assertStrictEquals(degreeToRadian(180), Math.PI, "180°")
    UnitTests.assertStrictEquals(degreeToRadian(360), 2 * Math.PI, "360°")
}

UnitTests.AddTest({test:"parseDEFIB", unitTest: testparseDEFIB});
UnitTests.AddTest({test:"degreeToRadian", unitTest: testdegreeToRadian});
