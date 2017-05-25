/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// RULES
var cards = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" ];
var suits = [ "D", "H", "C", "S" ];
var nbWarCards = 3;

function stripSuit(c)
{
    return c.substr(0, c.length-1);
}

function compareCards(p1card, p2card)
{
    var c1 = stripSuit(p1card);
    var c2 = stripSuit(p2card);
    return cards.indexOf(c1) - cards.indexOf(c2);
}

function Deck(p)
{
    this.player = p;
    this.cards = [];
}

Deck.prototype.AddCard = function(c)
{
    // on game start, the first card dealt will be played first:
    this.WinCard(c);

    // on game start, the last card dealt will be played first:
    //this.cards.push(c);
};

Deck.prototype.WinCard = function(c)
{
    this.cards.splice(0, 0, c);
};

Deck.prototype.WinPot = function(cards)
{
    for(var i=0; i< cards.length; i++)
    {
        this.WinCard(cards[i]);
    }
};

Deck.prototype.DrawCard = function(c)
{
    return this.cards.pop(c);
};

Deck.prototype.HasCards = function(l)
{
    if (!l)
    {
        l = 0;
    }
    return this.cards.length > l;
};


var Game = function(p1Deck, p2Deck)
{
    this.p1 = p1Deck;
    this.p2 = p2Deck;
    this.atWar = false;
}

Game.prototype.Turn = function()
{
    if (!this.p1.HasCards())
    {
        this.winner = 2;
        return false;
    }
    if (!this.p2.HasCards())
    {
        this.winner = 1;
        return false;
    }

    var p1card = this.p1.DrawCard();
    var p2card = this.p2.DrawCard();
    if(!this.atWar)
    {
        // pots are empty
        this.potP1 = [];
        this.potP2 = [];
    }
    this.potP1.push(p1card);
    this.potP2.push(p2card);

    var result = compareCards(p1card, p2card);
    if (result > 0)
    {
        //printErr("P1 wins " + p1card + " vs " + p2card);
        this.p1.WinPot(this.potP1);
        this.p1.WinPot(this.potP2);
        this.atWar = false;
    }
    else if (result < 0)
    {
        //printErr("P2 wins " + p1card + " vs " + p2card);
        this.p2.WinPot(this.potP1);
        this.p2.WinPot(this.potP2);
        this.atWar = false;
    }
    else
    {
        if (this.GoToWar())
        {
            return this.Turn();
        }
        return false;
    }
    return true;
};

Game.prototype.GoToWar = function()
{
    this.atWar = true;

    // First, check If one if the player has not enough cards left
    if(!this.p1.HasCards(nbWarCards) || !this.p2.HasCards(nbWarCards))
    {
        this.winner = "PAT";
        return false;
    }

    for(var i = 0; i < nbWarCards; i++)
    {
        this.potP1.push(this.p1.DrawCard());
        this.potP2.push(this.p2.DrawCard());
    }

    return true;
};

Game.prototype.Start = function()
{
    var nTurns = 0;
    while(this.Turn())
    {
        nTurns++;
    }
    return nTurns;
};

// INPUT
var player1Deck = new Deck("player 1");
var player2Deck = new Deck("player 2");
var n = parseInt(readline()); // the number of cards for player 1
for (var i = 0; i < n; i++) {
    var cardp1 = readline(); // the n cards of player 1
    player1Deck.AddCard(cardp1);
}
var m = parseInt(readline()); // the number of cards for player 2
for (var i = 0; i < m; i++) {
    var cardp2 = readline(); // the m cards of player 2
    player2Deck.AddCard(cardp2);
}

// MAIN

var g = new Game(player1Deck, player2Deck);
var nTurns = g.Start();

if (g.winner === "PAT")
{
    print(g.winner);
}
else
{
    print(g.winner + " " + nTurns);
}
