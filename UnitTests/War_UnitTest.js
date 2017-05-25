
function testCompareCards()
{
    UnitTests.assertOk(compareCards("10H", "10S") === 0, "10H vs 10S");
    UnitTests.assertOk(compareCards("10H", "AS") < 0, "10H vs AS");
    UnitTests.assertOk(compareCards("KH", "10S") > 0, "KH vs 10S");
    UnitTests.assertOk(compareCards("2D", "10C") < 0, "2D vs 10C");
}

function initDeck(playerName, cards)
{
    var d = new Deck(playerName);
    if (cards && cards.length > 0)
    {
        for(var c = 0; c < cards.length; c++)
        {
            d.AddCard(cards[c]);
        }
    }
    return d;
}

function testDeck()
{
    var d = initDeck("Bob", ["AS", "10H"]);
    UnitTests.assertDeepEquals(d.cards, ["10H", "AS"], "Check add cards");
    UnitTests.assertOk(d.HasCards(), "after init, deck has cards");

    UnitTests.assertStrictEquals(d.DrawCard(), "AS", "Draw last card added");
    UnitTests.assertDeepEquals(d.cards, ["10H"], "Check cards after draw");
    UnitTests.assertOk(d.HasCards(), "after first draw, deck has cards");

    d.WinCard("9C")
    d.WinCard("AC")
    UnitTests.assertDeepEquals(d.cards, ["AC", "9C", "10H"], "Check cards after a win");
    UnitTests.assertOk(d.HasCards(), "after a win, deck has cards");

    UnitTests.assertStrictEquals(d.DrawCard(), "10H", "Draw another card");
    UnitTests.assertDeepEquals(d.cards, ["AC", "9C"], "Check cards after second draw");
    UnitTests.assertOk(d.HasCards(), "after second draw, deck has cards");

    UnitTests.assertStrictEquals(d.DrawCard(), "9C", "Draw yet another card");
    UnitTests.assertOk(d.HasCards(), "after yet another, deck has cards");

    UnitTests.assertStrictEquals(d.DrawCard(), "AC", "Draw last card");
    UnitTests.assertOk(!d.HasCards(), "after last card, deck has cards");

    UnitTests.assertStrictEquals(d.DrawCard(), undefined, "Draw on an empty deck");
    UnitTests.assertOk(!d.HasCards(), "after no cards, deck has cards");
}

UnitTests.AddTest({test:"compareCards", unitTest: testCompareCards});
UnitTests.AddTest({test:"Deck", unitTest: testDeck});
