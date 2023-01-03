// Day 2: calculate points following the strategy guide.
/* first column is opponent: A = rock, B = paper, C= scissors 
 second is our move: X = rock, Y= paper, Z = scissor
 Points: 1 for Rock, 2 for Paper, 3 for Scissors
 0 for loss, 3 for draw, 6 for win
 */
// const { readFileSync } = require('fs');

import { syncReadFile } from "../utils/functions";

function defineRounds(data: string[]) {
    let rounds: string[][] = [];
    let start = 0;
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        // if (index > 0 && index % 2 === 0) {
        rounds.push(data.slice(index, index + 1));
        // start = index;
        // }
    }
    return rounds;
}

function getPointsOfRd(round: string[]): number {
    const stringedRd = round.toString();
    switch (stringedRd) {
        case "B X":
            return 1;
        case "C Y":
            return 2;
        case "A Z":
            return 3;
        case "A X":
            return 4;
        case "B Y":
            return 5;
        case "C Z":
            return 6;
        case "C X":
            return 7;
        case "A Y":
            return 8;
        case "B Z":
            return 9;
        default:
            return 0;
    }
}

const data = syncReadFile('./data.txt');
const rounds = defineRounds(data);

const totalPoints = rounds.reduce((acc, curr, index) => acc + getPointsOfRd(curr), 0);

console.log('total points scored after following the guide:', totalPoints);

// Part 2: the letter means: X is a loss, Y is a draw, Z is a win: we need to choose what to play accordingly.

function getPointsOfRdTwo(round: string[]): number {
    const stringedRd = round.toString();
    switch (stringedRd) {
        case "B X":
            return 1;
        case "C Y":
            return 6;
        case "A Z":
            return 8;
        case "A X":
            return 3;
        case "B Y":
            return 5;
        case "C Z":
            return 7;
        case "C X":
            return 2;
        case "A Y":
            return 4;
        case "B Z":
            return 9;
        default:
            return 0;
    }
}


const totalPointsRd2 = rounds.reduce((acc, curr, index) => acc + getPointsOfRdTwo(curr), 0);

console.log('total points scored after following the guide:', totalPointsRd2);