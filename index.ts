import { generateDeck, getHandsFromDeck, getWinner } from "./poker";

async function main() {
  let deck = generateDeck();
  let hands = getHandsFromDeck(deck, 2);

  const hands2 = [
    [
      { value: "J", suit: "S" },
      { value: "Q", suit: "C" },
      { value: "A", suit: "C" },
      { value: "J", suit: "C" },
      { value: "A", suit: "H" },
    ],
    [
      { value: "3", suit: "S" },
      { value: "J", suit: "D" },
      { value: "9", suit: "S" },
      { value: "J", suit: "H" },
      { value: "9", suit: "S" },
    ],
  ];

  console.log(`Hand ${getWinner(hands2)} hat gewonnen! (Starting from 0)`);
}

main();
