import { generateDeck, getHandsFromDeck, getWinner } from "./poker";

async function main() {
  let deck = generateDeck();
  let hands = getHandsFromDeck(deck, 2);
  hands[0] = [
    { value: "2", suit: "S" },
    { value: "3", suit: "S" },
    { value: "4", suit: "D" },
    { value: "5", suit: "S" },
    { value: "6", suit: "C" },
  ];
  hands[1] = [
    { value: "2", suit: "D" },
    { value: "3", suit: "D" },
    { value: "3", suit: "S" },
    { value: "2", suit: "C" },
    { value: "2", suit: "H" },
  ];

  console.log(getWinner(hands));
}

main();
