/**
 * Don't let the machines win. You are humanity's last hope...
 **/
function Cell(x, y)
{
    this.x = x;
    this.y = y;
}

Cell.prototype.SetRightCell = function(c)
{
    this.rightCell = c;
};

Cell.prototype.SetBottomCell = function(c)
{
    this.bottomCell = c;
};

Cell.prototype.toString = function()
{
    return this.x + " " + this.y;
};

var errCell = new Cell(-1, -1);
Cell.prototype.displayResult = function()
{
    var out = this.toString() + " ";
    out += (this.rightCell ? this.rightCell.toString() : errCell.toString()) + " ";
    out += (this.bottomCell ? this.bottomCell.toString() : errCell.toString()) + " ";
    print(out);
};

var width = parseInt(readline()); // the number of cells on the X axis
var height = parseInt(readline()); // the number of cells on the Y axis
var cells = [];
var cellWithRightTBD;
var cellsWithBottomTBD = {};
for (var i = 0; i < height; i++) {
    var line = readline(); // width characters, each either 0 or .
    for(var l=0; l<line.length; l++)
    {
        if(line[l] === "0")
        {
            var newCell = new Cell(l, i);

            // is this cell on the right of a previous one ?
            if (cellWithRightTBD)
            {
                cellWithRightTBD.SetRightCell(newCell);
            }

            // is this cell on the bottom of previous one
            if(cellsWithBottomTBD[l])
            {
                cellsWithBottomTBD[l].SetBottomCell(newCell);
            }

            // newCell has pending right and bottom
            cellWithRightTBD = newCell;
            cellsWithBottomTBD[l] = newCell;

            // global grid
            cells.push(newCell);
        }
    }
    cellWithRightTBD = null; // end of line
}

// Write an action using print()
// To debug: printErr('Debug messages...');

for(var c = 0; c < cells.length; c++)
{
    cells[c].displayResult();
}
