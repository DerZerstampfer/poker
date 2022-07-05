const {
  generateDeck,
  getHandsFromDeck,
  getWinner,
} = require("./ts-built/poker");

const isArrayUnique = (arr) =>
  Array.isArray(arr) && new Set(arr).size === arr.length;

test("Generating Deck", function () {
  const deck = generateDeck();

  // If Deck has a length of 52
  expect(deck).toHaveLength(52);

  // If every Card is unique
  expect(isArrayUnique(deck)).toBeTruthy();
});

test("Get Hands from Deck", function () {
  const deck = generateDeck();
  const hands = getHandsFromDeck(deck, 8);

  const handsCombined = [...hands[0], ...hands[1]];

  expect(hands).toHaveLength(8);

  // If every Card is given only once
  expect(isArrayUnique(handsCombined)).toBeTruthy();
});

test("Get Winner", function () {
  const hands1 = [
    [
      { value: "J", suit: "S" },
      { value: "T", suit: "C" },
      { value: "A", suit: "C" },
      { value: "J", suit: "C" },
      { value: "9", suit: "C" },
    ],
    [
      { value: "K", suit: "S" },
      { value: "8", suit: "D" },
      { value: "9", suit: "S" },
      { value: "2", suit: "H" },
      { value: "5", suit: "S" },
    ],
  ];

  const hands2 = [
    [
      { value: "K", suit: "S" },
      { value: "8", suit: "D" },
      { value: "9", suit: "S" },
      { value: "2", suit: "H" },
      { value: "5", suit: "S" },
    ],
    [
      { value: "J", suit: "S" },
      { value: "T", suit: "C" },
      { value: "A", suit: "C" },
      { value: "J", suit: "C" },
      { value: "9", suit: "C" },
    ],
  ];

  expect(getWinner(hands1).index).toBe(0);
  expect(getWinner(hands2).index).toBe(1);
});

test("Get Winner with same level", function () {
  const hands1 = [
    [
      { value: "J", suit: "S" },
      { value: "T", suit: "C" },
      { value: "A", suit: "C" },
      { value: "J", suit: "C" },
      { value: "9", suit: "C" },
    ],
    [
      { value: "K", suit: "S" },
      { value: "8", suit: "D" },
      { value: "9", suit: "S" },
      { value: "K", suit: "H" },
      { value: "5", suit: "S" },
    ],
  ];

  const hands2 = [
    [
      { value: "K", suit: "S" },
      { value: "8", suit: "D" },
      { value: "9", suit: "S" },
      { value: "K", suit: "H" },
      { value: "5", suit: "S" },
    ],
    [
      { value: "J", suit: "S" },
      { value: "T", suit: "C" },
      { value: "A", suit: "C" },
      { value: "J", suit: "C" },
      { value: "9", suit: "C" },
    ],
  ];

  expect(getWinner(hands1).index).toBe(1);
  expect(getWinner(hands2).index).toBe(0);
});
