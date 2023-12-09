// TYPES
type Hands = {
  cards: number[];
  bid: number;
};

type ScoresByType = { [key: string]: Hands[] };

// INIT
const text = await Deno.readTextFile("seven/data/input.txt");
const lines = text.split("\n");

// HELPERS
function formatCardLabel(label: string): number {
  switch (label) {
    case "A":
      return 14;
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 1;
    case "T":
      return 10;
    default:
      return parseInt(label);
  }
}

function getBids(hand: Hands[]) {
  return hand.map((item) => item.bid);
}

function getTotal({
  highCards,
  onePairs,
  twoPairs,
  threeOfAKinds,
  fullHouses,
  fourOfAKinds,
  fiveOfAKinds,
}: ScoresByType) {
  return [
    ...getBids(highCards),
    ...getBids(onePairs),
    ...getBids(twoPairs),
    ...getBids(threeOfAKinds),
    ...getBids(fullHouses),
    ...getBids(fourOfAKinds),
    ...getBids(fiveOfAKinds),
  ].reduce((acc, bid, index) => {
    return acc + bid * (index + 1);
  }, 0);
}

// SETUP
const scoresByType: ScoresByType = {
  fiveOfAKinds: [],
  fourOfAKinds: [],
  fullHouses: [],
  threeOfAKinds: [],
  twoPairs: [],
  onePairs: [],
  highCards: [],
};

const handSize = 5;

// MAIN
// Arrange hands by type
lines.forEach((line) => {
  const [cards, bid] = line.split(" ");
  const cardScores = cards.split("").map((char) => formatCardLabel(char));

  const cardScoreMap = cardScores.reduce<{ [key: string]: number }>(
    (acc, score) => {
      const jokerScore = formatCardLabel("J");
      // ignore jokers
      if (score !== jokerScore) {
        acc[score] = acc[score] ? acc[score] + 1 : 1;
      }
      return acc;
    },
    {},
  );

  const hand = { cards: cardScores, bid: parseInt(bid) };
  const values = Object.values(cardScoreMap);
  const jokerCount = handSize - values.reduce((acc, value) => acc + value, 0);

  scoresByType[getHandType(values, jokerCount)].push(hand);
});

function getHandType(values: number[], jokerCount: number): string {
  const isTwoPairs = values.filter((value) => value === 2).length === 2;
  const isNoPairs = values.filter((value) => value === 2).length === 0;

  switch (true) {
    case values.includes(5):
    case values.includes(4) && jokerCount === 1:
    case values.includes(3) && jokerCount === 2:
    case values.includes(2) && jokerCount === 3:
    case isNoPairs && jokerCount === 4:
    case jokerCount === 5:
      return "fiveOfAKinds";
    case values.includes(4):
    case values.includes(3) && jokerCount === 1:
    case values.includes(2) && jokerCount === 2:
    case isNoPairs && jokerCount === 3:
      return "fourOfAKinds";
    case values.includes(3) && values.includes(2):
    case isTwoPairs && jokerCount === 1:
      return "fullHouses";
    case values.includes(3):
    case values.includes(2) && jokerCount === 1:
    case isNoPairs && jokerCount === 2:
      return "threeOfAKinds";
    case isTwoPairs:
      return "twoPairs";
    case values.includes(2):
    case isNoPairs && jokerCount === 1:
      return "onePairs";
    default:
      return "highCards";
  }
}

// Sort each type by hand value
Object.values(scoresByType).forEach((hands) => {
  hands.sort((current, next) => {
    const comparison = current.cards.map((card, index) => {
      return card - next.cards[index];
    });

    while (comparison.length) {
      const comp = comparison.shift();
      if (comp && comp !== 0) {
        return comp;
      }
    }

    return 0;
  });
});

// RESULT
export const result = getTotal(scoresByType);
