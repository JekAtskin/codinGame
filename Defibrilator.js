/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

function parseDecimalValue(str)
{
    return parseFloat(str.replace(',', '.'));
}

var addressBook = [];
function defibrilator(number, name, address, contactPhone, lon, lat)
{
    this.number = parseInt(number);
    this.name = name;
    this.address = address;
    this.contactPhone = number;
    this.lon = parseDecimalValue(lon);
    this.lat = parseDecimalValue(lat);
    this.lonRad = degreeToRadian(this.lon);
    this.latRad = degreeToRadian(this.lat);
}

function parseDEFIB(defib)
{
    var parts = defib.split(';');
    if (parts.length === 6)
    {
        addressBook.push(new defibrilator(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5], parts[6]));
    }
}

function degreeToRadian(angle)
{
    return (2 * Math.PI * angle) / 360;
}

function distance(lonA, latA, lonB, latB)
{
    var x = (lonB - lonA) * Math.cos((latA + latB) / 2);
    var y = latB - latA;
    var d = Math.sqrt(x*x+y*y) * 6371;
    return d;
}

var LON = readline();
var LAT = readline();
var N = parseInt(readline());
for (var i = 0; i < N; i++) {
    var DEFIB = readline();
    parseDEFIB(DEFIB);
}

var userLONInRadians = degreeToRadian(parseDecimalValue(LON));
var userLATInRadians = degreeToRadian(parseDecimalValue(LAT));

function getNearestDefibrilator(fromLon, fromLat)
{
    var minDistance;
    var minDefib;
    for (var i = 0; i < addressBook.length; i++)
    {
        if (typeof(minDistance) === "undefined")
        {
            minDefib = addressBook[i];
            minDistance = distance(fromLon, fromLat, addressBook[i].lonRad, addressBook[i].latRad);
        }
        else
        {
            var d = distance(fromLon, fromLat, addressBook[i].lonRad, addressBook[i].latRad);
            if (d < minDistance)
            {
                minDefib = addressBook[i];
                minDistance = d;
            }
        }
    }
    return minDefib;
}
// Write an action using print()
// To debug: printErr('Debug messages...');

var nearestDefibrilator = getNearestDefibrilator(userLONInRadians, userLATInRadians);
print(nearestDefibrilator.name);