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

var States = {
    START: 0,
    EXPLORECENTER: 1,
    EXPLOREDOWN: 2,
    EXPLORERIGHT: 3
};
var state = States.EXPLORECENTER;

function adjustExplorationZoneAndJump(bombDir)
{
    printErr("Start> Position: " + batmanPos.x + ", " + batmanPos.y + " - bombDir = " + bombDir+ " - state = " + state);
    var newState;
    switch(state)
    {
        case States.START:
            {
                batmanPos = getCenter(explorationZone, 1, 1);
                newState = States.EXPLORECENTER;
                break;
            }
        case States.EXPLORECENTER:
            {
                // Batman just jumped to the center of the exploration zone.
                // Start prospecting down if not already at the bottom
                if (batmanPos.y < (H - 1) && batmanPos.y < explorationZone.bottomRight.y)
                {
                    batmanPos.y++;
                    newState = States.EXPLOREDOWN;
                }
                else if (batmanPos.x < (W - 1) && batmanPos.x < explorationZone.bottomRight.x)
                {
                    batmanPos.x++;
                    newState = States.EXPLORERIGHT;
                }
                else
                {
                    batmanPos = getCenter(explorationZone, 1, 1);
                    newState = States.EXPLORECENTER;
                }
                break;
            }
        case States.EXPLOREDOWN:
            {
                // Batman just jumped from the window just above
                if (bombDir === "COLDER")
                {
                    // prune everything lower
                    explorationZone.bottomRight.y = batmanPos.y - 1;
                }
                else if (bombDir === "WARMER")
                {
                    explorationZone.topLeft.y = batmanPos.y;
                }
                
                if (batmanPos.x < (W - 1) && batmanPos.x < explorationZone.bottomRight.x)
                {
                    batmanPos.x++;
                    newState = States.EXPLORERIGHT;
                }
                else
                {
                    batmanPos = getCenter(explorationZone, 1, 2);
                    newState = States.EXPLORECENTER;
                }
                break;
            }
        case States.EXPLORERIGHT:
            {
                // Batman just jumped from the window just on the left
                if (bombDir === "COLDER")
                {
                    // prune everything lower
                    explorationZone.bottomRight.x = batmanPos.x - 1;
                }
                else if (bombDir === "WARMER")
                {
                    explorationZone.topLeft.x = batmanPos.x;
                }
                batmanPos = getCenter(explorationZone, 2, 1);
                newState = States.EXPLORECENTER;
                break;
            }
    }
    printErr("End> Position: " + batmanPos.x + ", " + batmanPos.y + " - newState = " + newState);
    printErr("End> explorationZone: " + explorationZone.topLeft.x + ", " + explorationZone.topLeft.y + " - " + explorationZone.bottomRight.x + ", " + explorationZone.bottomRight.y);
    return newState;
}

// game loop
while (true) {
    var bombDir = readline(); // Current distance to the bomb compared to previous distance (COLDER, WARMER, SAME or UNKNOWN)

    // Write an action using print()
    // To debug: printErr('Debug messages...');
    state = adjustExplorationZoneAndJump(bombDir);

    print(batmanPos.x + " " + batmanPos.y);
}