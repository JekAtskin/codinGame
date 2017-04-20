
// UNIT TESTS Lib
var ActiveXObject = function(name) { return null; };

var Log = {
	echo: function(msg)
	{
		if (typeof(WScript) !== "undefined" && typeof(WScript.echo) !== "undefined")
		{
			WScript.echo(msg);
		}
		else if (typeof(console) !== "undefined" && console.log)
		{
			console.log(msg);
		}
	}
};

// Javascript Array extension
if (!Array.prototype.indexOf)
{
	Array.prototype.indexOf = function(elt /*, from*/)
	{
		var len = this.length >>> 0;
		var from = Number(arguments[1]) || 0;
		from = (from < 0) ? Math.ceil(from): Math.floor(from);
		if (from < 0)
		{
			from += len;
		}
		for (; from < len; from++)
		{
			if (from in this &&	this[from] === elt)
			{
				return from;
			}
		}
		return -1;
	};
}

function isArray(v)
{
	if(v.indexOf)
	{
		return true;
	}
	return false;
}

function outputIndent(indent, sIndent)
{
	if(!sIndent)
	{
		sIndent = "  ";
	}
	var s = "";
	for(var i = 0; i<indent; i++)
	{
		s += sIndent;
	}
	return s;
}

function debugArray(a, indent)
{
	if(a === null)
	{
		return "null";
	}
	if(typeof(a) !== "object")
	{
		return "'"+a+"'";
	}
	if(!indent)
	{
		indent = 0;
	}
	var dbg = "[";
	for(var i=0; i<a.length; i++)
	{
		if(i>0)
		{
			dbg+=", ";
		}
		if(typeof(a[i]) === "object")
		{
			if(a[i] && isArray(a[i]))
			{
				dbg += debugArray(a[i], indent+1);
			}
			else
			{
				dbg += debugObject(a[i], indent+1);
			}
		}
		else
		{
			dbg+= "'" + a[i] + "'";
		}
	}
	dbg += "]";
	return dbg;
}

function debugObject(o, indent)
{
	if(o === null)
	{
		return "null";
	}
	if(!indent)
	{
		indent = 0;
	}
	if(typeof(o) !== "object")
	{
		return "'"+o+"'";
	}
	else if(isArray(o))
	{
		return debugArray(o, indent);
	}

	// o is an object
	var first = true;
	var dbg = "{";
	for(var key in o)
	{
		if(o.hasOwnProperty(key))
		{
			if(first)
			{
				dbg += "\n" + outputIndent(indent+1);
				first = false;
			}
			else
			{
				dbg += ",\n" + outputIndent(indent+1);
			}
			dbg += "\"" + key + "\": ";
			if(typeof(o[key]) === "object")
			{
				if(o[key] && isArray(o[key]))
				{
					dbg += debugArray(o[key], indent+1);
				}
				else
				{
					dbg += debugObject(o[key], indent+1);
				}
			}
			else if(typeof(o[key]) === "string")
			{
				dbg += "'"+o[key]+"'";
			}
			else
			{
				// number
				dbg += o[key];
			}
		}
	}
	if(!first)
	{
		// non empty object
		dbg += "\n" + outputIndent(indent);
	}
	dbg += "}";
	return dbg;
}

var UnitTests = {
	inputLines: [],
	outputLines: [],
	unitTests: [],

	FeedInput: function(str)
	{
		UnitTests.inputLines.push(str);
	},

	ReadLine: function(str)
	{
		var input = "";
		if (UnitTests.inputLines.length > 0)
		{
			input = UnitTests.inputLines[0];
			UnitTests.inputLines.splice(0, 1);
		}
		return input;
	},

	Print: function(str)
	{
		UnitTests.outputLines.push(str);
	},

	PrintErr: function(str)
	{
		Log.echo(str);
	},

	AddTest: function(test)
	{
		UnitTests.unitTests.push(test);
	},

	Run: function()
	{
		//FSOMock.setup();
		for(var i=0; i<UnitTests.unitTests.length; i++)
		{
			var t = UnitTests.unitTests[i];
			UnitTests.outputTestStart(t.test);
			t.unitTest();
			UnitTests.outputTestResults();
		}
		UnitTests.outputResults();
	},

	totalTests: 0,
	totalSuccess: 0,
	totalErrors: 0,
	tests: 0,
	success: 0,
	errors: 0,
	testName: "",
	errorsRecap: "",

	outputTestStart: function(t)
	{
		UnitTests.testName = t;
		UnitTests.tests = 0;
		UnitTests.success = 0;
		UnitTests.errors = 0;
		Log.echo("=== " + t + " UNIT TESTS ===");
	},

	outputTestResults: function()
	{
		UnitTests.totalTests += UnitTests.tests;
		UnitTests.totalSuccess += UnitTests.success;
		UnitTests.totalErrors += UnitTests.errors;
		Log.echo("=== " + UnitTests.testName + " UNIT TESTS " + (UnitTests.errors>0?"FAILED":"PASSED") + " - " + UnitTests.success + "/" + UnitTests.tests + " ===\n");
	},

	outputResults: function()
	{
		Log.echo("=== UNIT TESTS " + (UnitTests.totalErrors>0?"FAILED":"PASSED") + " - " + UnitTests.totalSuccess + "/" + UnitTests.totalTests + " ===\n");
		if(UnitTests.errorsRecap)
		{
			Log.echo("\n=== ERRORS DETAILS:");
			Log.echo(UnitTests.errorsRecap);
		}
	},

	outputSuccess: function(t)
	{
		UnitTests.success++;
		Log.echo("SUCCESS - " + t);
	},

	outputError: function(t, expectedValue, actualValue)
	{
		UnitTests.errors++;
		var err = "ERROR --- " + t + "\n\texpectedValue: " + expectedValue + "\n\tactualValue: " + actualValue;
		UnitTests.errorsRecap += UnitTests.testName + " - " + err + "\n";
		Log.echo(err);
	},

	assertStrictEquals: function(v1, v2, t)
	{
		return this.assertDeepEquals(v1, v2, t);
	},

	assertDeepEquals: function(v1, v2, t)
	{
		UnitTests.tests++;
		if (v1===v2)
		{
			UnitTests.outputSuccess(t);
			return true;
		}
		var s1 = debugObject(v1);
		var s2 = debugObject(v2);
		if (s1!==s2)
		{
				UnitTests.outputError(t, s2, s1);
				return false;
		}
		UnitTests.outputSuccess(t);
		return true;
	}
};


// codinGames IO
function readline()
{
	return UnitTests.ReadLine();
}

function print(str)
{
	return UnitTests.Print(str);
}

function printErr(str)
{
	return UnitTests.PrintErr(str);
}