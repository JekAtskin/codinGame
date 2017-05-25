
function testDates()
{
    UnitTests.assertStrictEquals(resolveDay(0, "Monday", "Jan", 1, "Jan", 2), "Tuesday", "sample from puzzle");
    UnitTests.assertStrictEquals(resolveDay(0, "Friday", "Sep", 13, "Jan", 2), "Wednesday", "Test 4 from puzzle");
}
UnitTests.AddTest({test:"testDates", unitTest: testDates});
