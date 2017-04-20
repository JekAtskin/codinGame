// override libFSO.FSO var and setup virtual folders and files for unit tests
var FSOMock = {
	folders: {},
	files: {},

	setup: function()
	{
		libFSO.FSO = FSOMock;
		libFSO.forAllFilesIn = this.forAllFilesIn;
		libFSO.forAllFoldersIn = this.forAllFoldersIn;
	},

	FolderExists: function(path)
	{
		if (FSOMock.folders[path])
		{
			return true;
		}
		return false;
	},

	GetFolder: function(path)
	{
		if (FSOMock.folders[path])
		{
			return FSOMock.folders[path];
		}
		throw "FSOMock.GetFolder - path not found";
	},

	CreateFolder: function(fldName, baseFld)
	{
		var base = baseFld;
		if(!base)
		{
			base = FSOMock.folders;
		}

		if(!fldName)
		{
			throw "FSOMock.CreateFolder - invalid parameter";
		}
		if(base[fldName])
		{
			throw "FSOMock.CreateFolder - path already exists";
		}
		base[fldName] = new folderMock(fldName);
		return base[fldName];
	},

	forAllFilesIn: function(fld, doActionCalback, param1, param2)
	{
		if(typeof(fld) === "string")
		{
			fld = this.FSO.GetFolder(fld);
		}
		for (var f in fld.Files)
		{
			doActionCalback(fld.Files[f], param1, param2);
		}
	},

	forAllFoldersIn: function(path, doActionCalback, param1, param2)
	{
		var folder = this.FSO.GetFolder(path);
		for (var f in folder.SubFolders)
		{
			doActionCalback(folder.SubFolders[f], param1, param2);
		}
	}
};

var folderMock = function(path)
{
	this.Name = path.substr(path.lastIndexOf("\\") + 1);
	this.Path = path;
	this.Files = {};
	this.SubFolders = {};
	this.CreateFolder = function(fldName)
	{
		if(!fldName.startsWith(this.Path))
		{
			fldName = this.Path + "\\" + fldName;
		}
		return FSOMock.CreateFolder(fldName, this.SubFolders);
	};
	this.CreateFile = function(fileName)
	{
		this.Files[fileName] = new fileMock(this, fileName);
		return this.Files[fileName];
	};
};

var fileMock = function(parentFld, name)
{
	this.ParentFolder = parentFld;
	this.Name = name;
};
