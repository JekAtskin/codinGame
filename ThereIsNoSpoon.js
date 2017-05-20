/**
 * Don't let the machines win. You are humanity's last hope...
 **/

var width = parseInt(readline()); // the number of cells on the X axis
var height = parseInt(readline()); // the number of cells on the Y axis
var grid = [];
for (var i = 0; i < height; i++) {
    var line = readline(); // width characters, each either 0 or .
    if (grid.length <= i)
    {
        grid.push([]);
    }
    for(var l=0; l<line.length; l++)
    {
        grid[i].push(line[l] === "0");
    }
    printErr(line);
}

// Write an action using print()
// To debug: printErr('Debug messages...');


function getRightCell(c)
{
    var shift = 1;
    if (c.y < grid.length)
    {
        while (grid[c.y].length > c.x + shift && !grid[c.y][c.x + shift])
        {
            shift++;
        }
        if (grid[c.y].length > c.x + shift)
        {
            return {x:c.x+shift, y:c.y};
        }
    }
    return {x:-1, y:-1};
}

function getDownCell(c)
{
    var shift = 1;
    if (c.y < grid.length && c.x < grid[c.y].length)
    {
        while (c.y + shift < grid.length && c.x < grid[c.y].length && !grid[c.y + shift][c.x])
        {
            shift++;
        }
        if (c.y + shift < grid.length && c.x < grid[c.y].length)
        {
            return { x:c.x, y:c.y+shift };
        }
    }
    return { x:-1, y:-1 };
}

function outputCell(c)
{
    return c.x + " " + c.y;
}

function checkCell(c)
{
    var r = getRightCell(c);
    var b = getDownCell(c);
    print(outputCell(c) + " " + outputCell(r) + " " + outputCell(b));
}

for(var y = 0; y< grid.length; y++)
{
    for(var x = 0; x < grid[y].length; x++)
    {
        if(grid[y][x])
        {
            checkCell({"x":x, "y":y});
        }
    }
}
