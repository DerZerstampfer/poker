import { generateDeck, getHandsFromDeck, getWinner } from "./poker";

async function main() {
  let deck = generateDeck();
  let hands = getHandsFromDeck(deck, 2);

  console.log(`Hand ${getWinner(hands)} hat gewonnen! (Starting from 0)`);
}

main();
