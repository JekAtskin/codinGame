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

var previousBatmanPos = {
    x: X0,
    y: Y0,
};

function getSymetricPos(startPos, zoneLimitMin, zoneLimitMax, zoneMaxSize)
{
    var endPos;
    if (startPos < zoneLimitMin)
    {
        endPos = zoneLimitMax + (zoneLimitMin - startPos);
    }
    else if (startPos > zoneLimitMax)
    {
        endPos = zoneLimitMin - (startPos - zoneLimitMax);
    }
    else
    {
        endPos = zoneLimitMax - (startPos - zoneLimitMin);
    }
    endPos = endPos >= zoneMaxSize ? zoneMaxSize - 1 : endPos;
    endPos = endPos < 0 ? 0 : endPos;
    return endPos;
}

function decideJumpWindow()
{
    var width = explorationZone.bottomRight.x - explorationZone.topLeft.x;
    var height = explorationZone.bottomRight.y - explorationZone.topLeft.y;
    var newPos = { x: 0, y: 0 };
    if ( width === 0 && height === 0)
    {
        newPos.x = explorationZone.topLeft.x;
        newPos.y = explorationZone.topLeft.y;
    }
    else if (height >= width)
    {
        newPos.x = batmanPos.x;
        newPos.y = getSymetricPos(batmanPos.y, explorationZone.topLeft.y, explorationZone.bottomRight.y, H);
    }
    else
    {
        newPos.x = getSymetricPos(batmanPos.x, explorationZone.topLeft.x, explorationZone.bottomRight.x, W);
        newPos.y = batmanPos.y;
    }
    return newPos;
}

function vectDirection(end, start)
{
    return {
        x: end.x - start.x,
        y: end.y - start.y,
    }
}

function adjustExplorationZone(start, end, bombDir)
{
    var direction = vectDirection(end, start);
    printErr("direction = " + direction.x + ", "+ direction.y);
    if (direction.x !== 0)
    {
        // Horizontal move
        if (direction.x > 0)
        {
            // RIGHT
            if (bombDir === "COLDER")
            {
                explorationZone.bottomRight.x = start.x + Math.ceil(direction.x / 2);
            }
            else if (bombDir === "WARMER")
            {
                explorationZone.topLeft.x = start.x + Math.floor(direction.x / 2);
            }
            else if (bombDir === "SAME")
            {
                 explorationZone.bottomRight.x = start.x + (direction.x / 2);
                 explorationZone.topLeft.x = explorationZone.bottomRight.x;
            }
        }
        else
        {
            // LEFT
            if (bombDir === "COLDER")
            {
                explorationZone.topLeft.x = end.x + Math.ceil(-direction.x / 2);
            }
            else if (bombDir === "WARMER")
            {
                explorationZone.bottomRight.x = end.x + Math.floor(-direction.x / 2);
            }
            else if (bombDir === "SAME")
            {
                 explorationZone.bottomRight.x = end.x + direction.x / 2;
                 explorationZone.topLeft.x = explorationZone.bottomRight.x;
            }
        }
    }
    else if (direction.y !== 0)
    {
        // Vertical move
        if (direction.y > 0)
        {
            // DOWN
            if (bombDir === "COLDER")
            {
                explorationZone.bottomRight.y = start.y + Math.ceil(direction.y / 2);
            }
            else if (bombDir === "WARMER")
            {
                explorationZone.topLeft.y = start.y + Math.floor(direction.y / 2);
            }
            else if (bombDir === "SAME")
            {
                 explorationZone.bottomRight.y = start.y + direction.y / 2;
                 explorationZone.topLeft.y = explorationZone.bottomRight.y;
            }
        }
        else
        {
            // UP
            if (bombDir === "COLDER")
            {
                explorationZone.topLeft.y = end.y + Math.ceil(-direction.y / 2);
            }
            else if (bombDir === "WARMER")
            {
                explorationZone.bottomRight.y = end.y +Math.floor(-direction.y / 2);
            }
            else if (bombDir === "SAME")
            {
                 explorationZone.bottomRight.y = end.y + direction.y / 2;
                 explorationZone.topLeft.y = explorationZone.bottomRight.y;
            }
        }
    }
    // else no move - first turn special case
}

function adjustExplorationZoneAndJump(bombDir)
{
    printErr("Start> Position: " + batmanPos.x + ", " + batmanPos.y + " - bombDir = " + bombDir);

    adjustExplorationZone(previousBatmanPos, batmanPos, bombDir);
    previousBatmanPos = batmanPos;
    batmanPos = decideJumpWindow();

    printErr("End> Position: " + batmanPos.x + ", " + batmanPos.y);
    printErr("End> explorationZone: " + explorationZone.topLeft.x + ", " + explorationZone.topLeft.y + " - " + explorationZone.bottomRight.x + ", " + explorationZone.bottomRight.y);
}

// game loop
while (true) {
    var bombDir = readline(); // Current distance to the bomb compared to previous distance (COLDER, WARMER, SAME or UNKNOWN)

    // Write an action using print()
    // To debug: printErr('Debug messages...');
    adjustExplorationZoneAndJump(bombDir);

    print(batmanPos.x + " " + batmanPos.y);
}
