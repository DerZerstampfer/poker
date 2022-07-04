type ValueType =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";

type SuitType = "C" | "D" | "H" | "S";

type Card = {
  value: ValueType;
  suit: SuitType;
};

type Hand = Card[];

const valueVariants: ValueType[] = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const suitVariants: SuitType[] = ["C", "D", "H", "S"];

function generateDeck() {
  let deck: Card[] = [];

  for (let i = 0; i < suitVariants.length; i++) {
    const suit = suitVariants[i];
    for (let j = 0; j < valueVariants.length; j++) {
      const value = valueVariants[j];
      deck.push({
        value,
        suit,
      });
    }
  }

  return deck;
}

function getHandsFromDeck(deck: Card[], count: number) {
  let hands: Card[][] = [];

  for (let i = 0; i < count; i++) {
    hands[i] = [];
  }

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < 5; j++) {
      hands[i].push(deck.splice((deck.length * Math.random()) | 0, 1)[0]);
    }
  }

  return hands;
}

function getPowerLevel(hand: Hand) {
  let count = {};
  let level = 0;
  let level2 = 0;

  hand.sort(
    (a, b) => valueVariants.indexOf(a.value) - valueVariants.indexOf(b.value)
  );

  // If Straight Flush
  let straightFlush = true;
  for (let i = 0; i < hand.length - 1; i++) {
    const card = hand[i];
    if (
      valueVariants.indexOf(card.value) !==
      valueVariants.indexOf(hand[i + 1].value) - 1
    ) {
      straightFlush = false;
      break;
    }
  }
  if (straightFlush) return { level: 8, level2: hand[hand.length - 1] };

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (count[card.value] === undefined) count[card.value] = 0;
    count[card.value] += 1;
  }

  let countSorted = [];
  for (var c in count) {
    countSorted.push([c, count[c]]);
  }

  countSorted.sort(function (a, b) {
    return b[1] - a[1];
  });

  if (countSorted[0][1] === 4) return { level: 7, level2: countSorted[0][0] };
  if (countSorted[0][1] === 3 && countSorted[1][1] === 2)
    return { level: 6, level2: countSorted[0][0] };

  return countSorted;
}

function getWinner(hands: Hand[]) {
  const powerLevels = [];
  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i];
    powerLevels[i] = getPowerLevel(hand);
  }

  return powerLevels;
}

export { generateDeck, getHandsFromDeck, getWinner };
