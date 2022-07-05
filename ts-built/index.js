"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const poker_1 = require("./poker");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Generate a full Deck with 52 unique cards
        let deck = (0, poker_1.generateDeck)();
        // Generate x hands (5 Cards = 1 hand) from a deck
        let hands = (0, poker_1.getHandsFromDeck)(deck, 2);
        // Get the Winner between hands
        let winner = (0, poker_1.getWinner)(hands);
        console.log(`Hand ${winner.index} hat gewonnen! (Starting from 0)`);
    });
}
main();
