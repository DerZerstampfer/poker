import { generateDeck, getHandsFromDeck, getWinner } from "./poker";

async function main() {
  let deck = generateDeck();
  let hands = getHandsFromDeck(deck, 2);
  let winner = getWinner(hands);

  console.log(hands);
  console.log(winner);
  console.log(`Hand ${winner.index} hat gewonnen! (Starting from 0)`);
}

main();
