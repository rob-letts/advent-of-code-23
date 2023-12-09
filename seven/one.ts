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
      return 11;
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

// MAIN
// Arrange hands by type
lines.forEach((line) => {
  const [cards, bid] = line.split(" ");
  const cardScores = cards.split("").map((char) => formatCardLabel(char));

  const cardScoreMap = cardScores.reduce<{ [key: string]: number }>(
    (acc, score) => {
      acc[score] = acc[score] ? acc[score] + 1 : 1;
      return acc;
    },
    {},
  );

  const values = Object.values(cardScoreMap);
  const hand = { cards: cardScores, bid: parseInt(bid) };

  if (values.includes(5)) {
    scoresByType.fiveOfAKinds.push(hand);
  } else if (values.includes(4)) {
    scoresByType.fourOfAKinds.push(hand);
  } else if (values.includes(3)) {
    if (values.includes(2)) {
      scoresByType.fullHouses.push(hand);
    } else {
      scoresByType.threeOfAKinds.push(hand);
    }
  } else if (values.includes(2)) {
    if (values.filter((value) => value === 2).length === 2) {
      scoresByType.twoPairs.push(hand);
    } else {
      scoresByType.onePairs.push(hand);
    }
  } else {
    scoresByType.highCards.push(hand);
  }
});

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
