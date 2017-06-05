/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

function Neuron(nbInputs, weights, bias)
{

}

function Layer(previousLayer, nextLayer, nbNeurons)
{
    this.previousLayer = pLayer;
    this.neurons = [];
    for(var n = 0; n < nbNeurons; n++)
    {
        this.neurons = new Neuron();
    }
    this.nextLayer = nextLayer;
}

function Network(nbInput, nbOutput, nbHiddenLayers, nbNeuronsByLayer)
{
//    this.inputLayer = new Layer(nbInput, nbNeuronsByLayer);

    // create input layer and 
    this.layers = [];
    for(var h = 0; h < nbHiddenLayers; h++)
    {
        if (h===0)
        {
            l = new Layer(null, nbInput, nbNeuronsByLayer);
        }
        var l = new Layer();
    }
}


var inputs = readline().split(' ');
var inputs = parseInt(inputs[0]);
var outputs = parseInt(inputs[1]);
var hiddenLayers = parseInt(inputs[2]);
var testInputs = parseInt(inputs[3]);
var trainingExamples = parseInt(inputs[4]);
var trainingIterations = parseInt(inputs[5]);
var inputs = readline().split(' ');
for (var i = 0; i < hiddenLayers; i++) {
    var nodes = parseInt(inputs[i]);
}

for (var i = 0; i < testInputs; i++) {
    var testInput = readline();
}

for (var i = 0; i < trainingExamples; i++) {
    var inputs = readline().split(' ');
    var trainingInputs = inputs[0];
    var expectedOutputs = inputs[1];
}


for (var i = 0; i < testInputs; i++) {

    // Write an action using print()
    // To debug: printErr('Debug messages...');

    print('answer');
}