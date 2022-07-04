"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWinner = exports.getHandsFromDeck = exports.generateDeck = void 0;
const valueVariants = [
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
const suitVariants = ["C", "D", "H", "S"];
function generateDeck() {
    let deck = [];
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
exports.generateDeck = generateDeck;
function getHandsFromDeck(deck, count) {
    let hands = [];
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
exports.getHandsFromDeck = getHandsFromDeck;
function getPowerLevel(hand) {
    let count = {};
    let level = 0;
    let level2 = 0;
    hand.sort((a, b) => valueVariants.indexOf(a.value) - valueVariants.indexOf(b.value));
    // If Straight Flush
    let straightFlush = true;
    let firstSuitFlush = hand[0].suit;
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        if (i < hand.length - 1) {
            if (valueVariants.indexOf(card.value) !==
                valueVariants.indexOf(hand[i + 1].value) - 1) {
                straightFlush = false;
                break;
            }
        }
        if (card.suit !== firstSuitFlush) {
            straightFlush = false;
            break;
        }
    }
    if (straightFlush)
        return { level: 8, level2: hand[hand.length - 1] };
    let countSorted = getCountSorted(hand);
    if (countSorted[0][1] === 4)
        return { level: 7, level2: countSorted[0][0] };
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
    if (flush)
        return { level: 5, level2: hand[hand.length - 1].value };
    // If straight
    let straight = true;
    for (let i = 0; i < hand.length - 1; i++) {
        const card = hand[i];
        if (valueVariants.indexOf(card.value) !==
            valueVariants.indexOf(hand[i + 1].value) - 1) {
            straight = false;
            break;
        }
    }
    if (straight)
        return { level: 4, level2: hand[hand.length - 1] };
    if (countSorted[0][1] === 3)
        return { level: 3, level2: countSorted[0][0] };
    if (countSorted[0][1] === 2 && countSorted[1][1] === 2)
        return {
            level: 2,
            level2: getHighestPair([countSorted[0][0], countSorted[1][0]]),
        };
    if (countSorted[0][1] === 2)
        return { level: 1, level2: countSorted[0][0] };
    return { level: 0, level2: hand[hand.length - 1] };
}
function getHighestPair(pairs) {
    let values = [...pairs];
    values.sort((a, b) => valueVariants.indexOf(a) - valueVariants.indexOf(b));
    return values[values.length - 1];
}
function getCountSorted(hand) {
    let count = {};
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        if (count[card.value] === undefined)
            count[card.value] = 0;
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
function getWinner(hands) {
    const powerLevels = [];
    for (let i = 0; i < hands.length; i++) {
        const hand = hands[i];
        powerLevels[i] = getPowerLevel(hand);
    }
    let ranking = [...powerLevels];
    ranking.sort((a, b) => a.level - b.level);
    return powerLevels.findIndex((item) => item == ranking[ranking.length - 1]);
}
exports.getWinner = getWinner;
