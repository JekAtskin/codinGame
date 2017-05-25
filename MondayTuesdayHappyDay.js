/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var leapYear = parseInt(readline());
printErr(leapYear);
var inputs = readline().split(' ');
printErr(inputs.join(' '));
var sourceDayOfWeek = inputs[0];
var sourceMonth = inputs[1];
var sourceDayOfMonth = parseInt(inputs[2]);
var inputs = readline().split(' ');
printErr(inputs.join(' '));
var targetMonth = inputs[0];
var targetDayOfMonth = parseInt(inputs[1]);

// Write an action using print()
// To debug: printErr('Debug messages...');

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var shortDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function resolveDay(ly, sDayWeek, sMonth, sDayMonth, tMonth, tDayMonth)
{
	var startDate = new Date((ly === 1 ? 2004 : 2005), months.indexOf(sMonth), sDayMonth);
	var startDay = startDate.toDateString().split(' ')[0];
	var endDate = new Date((ly === 1 ? 2004 : 2005), months.indexOf(tMonth), tDayMonth);
	var endDay = endDate.toDateString().split(' ')[0];

	var shift = shortDays.indexOf(endDay) - shortDays.indexOf(startDay);
	var tDayIndex = days.indexOf(sDayWeek) + shift;
	tDayIndex = tDayIndex % days.length;
	if (tDayIndex < 0)
	{
		tDayIndex += days.length;
	}
	return days[tDayIndex];
}

print(resolveDay(leapYear, sourceDayOfWeek, sourceMonth, sourceDayOfMonth, targetMonth, targetDayOfMonth));