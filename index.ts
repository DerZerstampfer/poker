import { generateDeck, getHandsFromDeck, getWinner } from "./poker";

async function main() {
  // Generate a full Deck with 52 unique cards
  let deck = generateDeck();

  // Generate x hands (5 Cards = 1 hand) from a deck
  let hands = getHandsFromDeck(deck, 2);

  // Get the Winner between hands
  let winner = getWinner(hands);

  console.log(`Hand ${winner.index} hat gewonnen! (Starting from 0)`);
}

main();
