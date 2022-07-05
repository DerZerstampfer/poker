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

type WinnerReturn = {
  index: number;
  case: {};
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
  hand.sort(
    (a, b) => valueVariants.indexOf(a.value) - valueVariants.indexOf(b.value)
  );

  // If Straight Flush
  let straightFlush = true;
  let firstSuitFlush = hand[0].suit;
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (i < hand.length - 1) {
      if (
        valueVariants.indexOf(card.value) !==
        valueVariants.indexOf(hand[i + 1].value) - 1
      ) {
        straightFlush = false;
        break;
      }
    }
    if (card.suit !== firstSuitFlush) {
      straightFlush = false;
      break;
    }
  }
  if (straightFlush) return { level: 8, level2: hand[hand.length - 1] };

  let countSorted = getCountSorted(hand);

  if (countSorted[0][1] === 4) return { level: 7, level2: countSorted[0][0] };
  if (countSorted[0][1] === 3 && countSorted[1][1] === 2)
    return { level: 6, level2: countSorted[0][0] };

  let flush = true;
  let firstSuit = hand[0].suit;
  for (let i = 1; i < hand.length; i++) {
    const card = hand[i];
    if (card.suit !== firstSuit) {
      flush = false;
      break;
    }
  }
  if (flush) return { level: 5, level2: hand[hand.length - 1].value };

  // If straight
  let straight = true;
  for (let i = 0; i < hand.length - 1; i++) {
    const card = hand[i];
    if (
      valueVariants.indexOf(card.value) !==
      valueVariants.indexOf(hand[i + 1].value) - 1
    ) {
      straight = false;
      break;
    }
  }
  if (straight) return { level: 4, level2: hand[hand.length - 1] };

  if (countSorted[0][1] === 3) return { level: 3, level2: countSorted[0][0] };
  if (countSorted[0][1] === 2 && countSorted[1][1] === 2)
    return {
      level: 2,
      level2: getHighestPair([countSorted[0][0], countSorted[1][0]]),
    };
  if (countSorted[0][1] === 2) return { level: 1, level2: countSorted[0][0] };

  return { level: 0, level2: hand[hand.length - 1] };
}

function getHighestPair(pairs: any) {
  let values = [...pairs];
  values.sort((a, b) => valueVariants.indexOf(a) - valueVariants.indexOf(b));
  return values[values.length - 1];
}

function getCountSorted(hand: Hand) {
  let count = {};
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

  return countSorted;
}

function getWinner(hands: Hand[]): WinnerReturn {
  const powerLevels = [];
  for (let i = 0; i < hands.length; i++) {
    const hand = hands[i];
    powerLevels[i] = getPowerLevel(hand);
  }

  let ranking = [...powerLevels];
  ranking.sort((a, b) => a.level - b.level);

  let doubles = ranking.filter(
    (item) => item.level == ranking[ranking.length - 1].level
  );

  if (doubles.length == 2) {
    let hand1 = hands[0],
      hand2 = hands[1];
    switch (doubles[0].level) {
      case 0:
        // If the highest cards have the same value, the hands are ranked by the next highest, and so on.
        console.log(hands);

        hand1.sort(
          (a, b) =>
            valueVariants.indexOf(b.value) - valueVariants.indexOf(a.value)
        );
        hand2.sort(
          (a, b) =>
            valueVariants.indexOf(b.value) - valueVariants.indexOf(a.value)
        );
        for (let i = 0; i < 5; i++) {
          let value1 = valueVariants.indexOf(hand1[i].value);
          let value2 = valueVariants.indexOf(hand2[i].value);

          if (value1 > value2) {
            return { index: 0, case: doubles[0] };
          } else if (value1 < value2) {
            return { index: 1, case: doubles[1] };
          }
        }
        break;
      case 1:
        // Hands which both contain a pair are ranked by the value of the cards forming the pair. If these values are the same, the hands are ranked by the values of the cards not forming the pair, in decreasing order.
        if (doubles[0].level2 > doubles[1].level2) {
          return { index: 0, case: doubles[0] };
        } else if (doubles[0].level2 < doubles[1].level2) {
          return { index: 1, case: doubles[1] };
        }

        hand1 = hand1.filter((item) => item.value !== doubles[0].level2);
        hand2 = hand2.filter((item) => item.value !== doubles[0].level2);

        hand1.sort(
          (a, b) =>
            valueVariants.indexOf(b.value) - valueVariants.indexOf(a.value)
        );
        hand2.sort(
          (a, b) =>
            valueVariants.indexOf(b.value) - valueVariants.indexOf(a.value)
        );
        for (let i = 0; i < hand1.length; i++) {
          let value1 = valueVariants.indexOf(hand1[i].value);
          let value2 = valueVariants.indexOf(hand2[i].value);

          if (value1 > value2) {
            return { index: 0, case: doubles[0] };
          } else if (value1 < value2) {
            return { index: 1, case: doubles[1] };
          }
        }

        break;
      case 2:
        // Hands which both contain 2 pairs are ranked by the value of their highest pair. Hands with the same highest pair are ranked by the value of their other pair. If these values are the same the hands are ranked by the value of the remaining card.
        break;
      case 3:
        // Hands which both contain three of a kind are ranked by the value of the 3 cards.
        break;
      case 4:
        // Hands which both contain a straight are ranked by their highest card.
        break;
      case 5:
        // Hands which are both flushes are ranked using the rules for High Card.
        break;
      case 6:
        // Ranked by the value of the 3 cards.
        break;
      case 7:
        // Ranked by the value of the 4 cards.
        break;
      case 8:
        // Ranked by the highest card in the hand.
        break;
    }
  }

  return {
    index: powerLevels.findIndex((item) => item == ranking[ranking.length - 1]),
    case: powerLevels.find((item) => item == ranking[ranking.length - 1]),
  };
}

export { generateDeck, getHandsFromDeck, getWinner };
