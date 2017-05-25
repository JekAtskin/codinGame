/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

function GraphNode(id)
{
    this.Id = id;
    this.linksTo = [];
    this.linksFrom = [];
}

GraphNode.prototype.LinksTo = function(node)
{
    this.linksTo.push(node);
};

GraphNode.prototype.LinksFrom = function(node)
{
    this.linksFrom.push(node);
};

GraphNode.prototype.CutTo = function(node)
{
    for(var n = 0; n < this.linksTo.length; n++)
    {
        if(this.linksTo[n].Id === node.Id)
        {
            this.linksTo.splice(n, 1);
            return;
        }
    }
};

GraphNode.prototype.CutFrom = function(node)
{
    for(var n = 0; n < this.linksFrom.length; n++)
    {
        if(this.linksFrom[n].Id === node.Id)
        {
            this.linksFrom.splice(n, 1);
            return;
        }
    }
};

GraphNode.prototype.Djikstra = function(weight)
{
    // Need BFS here not DFS
    if(this.weight !== -1 && this.weight < weight)
    {
        // Do not loop, keep minimum values
        return;
    }
    this.weight = weight;
    for(var n = 0; n < this.linksTo.length; n++)
    {
        this.linksTo[n].Djikstra(weight+1);
    }
};

GraphNode.prototype.Reset = function()
{
    this.weight = -1;
};

GraphNode.prototype.outputDbg = function()
{
    printErr("  GraphNode " + this.Id + " - Weight=" + this.weight);
    for(var n = 0; n < this.linksTo.length; n++)
    {
        printErr("    Links to " + this.linksTo[n].Id);
    }
    for(var n = 0; n < this.linksFrom.length; n++)
    {
        printErr("    Links from " + this.linksFrom[n].Id);
    }
};

GraphNode.prototype.FindQuickestLink = function()
{
    var q = null;
    for(var n = 0; n < this.linksFrom.length; n++)
    {
        if(!q || this.linksFrom[n].weight < q.weight)
        {
            q = this.linksFrom[n];
        }
    }
    return q;
};

function Graph(bBiDirectional)
{
    this.BiDirectional = bBiDirectional;
    this.nodes = {};
    this.exits = [];
}

Graph.prototype.AddNode = function(nodeId)
{
    if(!this.nodes[nodeId])
    {
        this.nodes[nodeId] = new GraphNode(nodeId);
    }
    return this.nodes[nodeId];
};

Graph.prototype.AddLink = function(nodeId1, nodeId2)
{
    var node1 = this.AddNode(nodeId1);
    var node2 = this.AddNode(nodeId2);
    node1.LinksTo(node2);
    node2.LinksFrom(node1);
    if(this.BiDirectional)
    {
        node1.LinksFrom(node2);
        node2.LinksTo(node1);
    }
};

Graph.prototype.AddExit = function(nodeId)
{
    this.exits.push(nodeId);
};

Graph.prototype.Djikstra = function(startId)
{
    // Reset nodes
    for(var n in this.nodes)
    {
        if(this.nodes.hasOwnProperty(n))
        {
            this.nodes[n].Reset();        
        }
    }

    // Compute paths
    var startNode = this.nodes[startId];
    if(startNode)
    {
        startNode.Djikstra(0);
    }
    else
    {
        printErr("Djikstra - START NODE NOT FOUND!!");
    }
};

Graph.prototype.ChooseAndSeverLink = function()
{
    var closestGateway;
    // Get closest gateway to virus
    for(var ei = 0; ei < this.exits.length; ei++)
    {
        var e = this.nodes[this.exits[ei]];
        if (!e)
        {
            printErr("ChooseAndSeverLink - Exit #" + this.exits[ei] + " NOT FOUND");
        }
        else if(e.weight !== -1) // ignore fully disconnected nodes
        {
            if(!closestGateway || closestGateway.weight > e.weight)
            {
                closestGateway = e;
            }
        }
    }

    printErr("ChooseAndSeverLink - closest is ");
    closestGateway.outputDbg();

    // Get quikest link to closest gateway
    var fromNode = closestGateway.FindQuickestLink();

    // Sever link
    this.SeverLink(fromNode, closestGateway);
};

Graph.prototype.SeverLink = function(nodeFrom, nodeTo)
{
    nodeFrom.CutTo(nodeTo);
    nodeTo.CutFrom(nodeFrom);
    print(nodeFrom.Id + " " + nodeTo.Id);
    if(this.BiDirectional)
    {
        nodeFrom.CutFrom(nodeTo);
        nodeTo.CutTo(nodeFrom);
    }
};

Graph.prototype.outputDbg = function(msg)
{
    printErr("Graph... " + msg);
    for(var n in this.nodes)
    {
        if(this.nodes.hasOwnProperty(n))
        {
            this.nodes[n].outputDbg();        
        }
    }
};

var graph = new Graph(true)
var inputs = readline().split(' ');
var N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
var L = parseInt(inputs[1]); // the number of links
var E = parseInt(inputs[2]); // the number of exit gateways

printErr("Links...");
for (var i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    var N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    var N2 = parseInt(inputs[1]);
    graph.AddLink(N1, N2, false);
    
    printErr(inputs);
}

printErr("Exits...");
for (var i = 0; i < E; i++) {
    var EI = parseInt(readline()); // the index of a gateway node
    graph.AddExit(EI);
    printErr(EI);
}

// game loop
while (true) {
    var SI = parseInt(readline()); // The index of the node on which the Skynet agent is positioned this turn

//    graph.outputDbg("start");
    graph.Djikstra(SI);
//    graph.outputDbg("djikstra");
    graph.ChooseAndSeverLink();
}