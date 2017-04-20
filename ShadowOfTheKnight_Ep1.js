/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
var W = parseInt(inputs[0]); // width of the building.
var H = parseInt(inputs[1]); // height of the building.
var N = parseInt(readline()); // maximum number of turns before game over.
var inputs = readline().split(' ');
var X0 = parseInt(inputs[0]);
var Y0 = parseInt(inputs[1]);

printErr("Size: " + H + ", " + W);

var explorationZone = {
    topLeft : { x:0, y:0 },
    bottomRight : { x:W-1, y:H-1 }
};

var batmanPos = {
    x: X0,
    y: Y0,
};

function getCenter(zone, wx, wy)
{
    wx = 1;
    wy = 1;
    return { 
        x: Math.floor((zone.bottomRight.x + wx*zone.topLeft.x)/(1+wx)),
        y: Math.floor((zone.bottomRight.y + wy*zone.topLeft.y)/(1+wy))
    };
}

function adjustExplorationZone(bombDir)
{
    for(var i=0; i < bombDir.length; i++)
    {
        switch (bombDir[i])
        {
            case "U":
                {
                    explorationZone.bottomRight.y = batmanPos.y - 1;
                    break;
                }
            case "R":
                {
                    explorationZone.topLeft.x = batmanPos.x + 1;
                    break;
                }
            case "D":
                {
                    explorationZone.topLeft.y = batmanPos.y + 1;
                    break;
                }
            case "L":
                {
                    explorationZone.bottomRight.x = batmanPos.x - 1;
                    break;
                }
        }
    }
}

function adjustExplorationZoneAndJump(bombDir)
{
    printErr("Start> Position: " + batmanPos.x + ", " + batmanPos.y + " - bombDir = " + bombDir);

    adjustExplorationZone(bombDir);
    batmanPos = getCenter(explorationZone, 1, 1);

    printErr("End> Position: " + batmanPos.x + ", " + batmanPos.y);
    printErr("End> explorationZone: " + explorationZone.topLeft.x + ", " + explorationZone.topLeft.y + " - " + explorationZone.bottomRight.x + ", " + explorationZone.bottomRight.y);
}

// game loop
while (true) {
    var bombDir = readline(); // Current distance to the bomb compared to previous distance (COLDER, WARMER, SAME or UNKNOWN)

    // Write an action using print()
    // To debug: printErr('Debug messages...');
    state = adjustExplorationZoneAndJump(bombDir);

    print(batmanPos.x + " " + batmanPos.y);
}