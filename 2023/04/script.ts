import { syncReadFile } from "../../utils/functions";

const data = syncReadFile("2023/04/data.txt");
const testdata = syncReadFile("2023/04/testdata.txt");

// Regexp to find and captures the digits before the | sign
const winningNumbersRegexp = /(?<=:\s*)(\s*\d+\s*)+(?=\s*\|)/g;
// Regexp to find and capture the digits after the | sign
const scratchedNumbersRegexp = /(?<=\|\s*)(\d+\s*)+/g;

// See how many winMatches are in the scracthedMatches
const getWinningNumbersCountPowerOfTwo = (winMatches: string[], scractchedMatches: string[]) => {
  let count = -1;
  for (const num of winMatches!) {
    if (scractchedMatches?.includes(num)) {
      // console.log("🚀 ~ file: script.ts:15 ~ getWinningNumbersCount ~ num:", num, "is a match");
      count++;
    }
  }
  return count === -1 ? null : count;
};

const getLineScore = function (count: number) {
  const score = 2 ** count;
  // console.log("🚀 ~ file: script.ts:26 ~ getLineScore ~ score:", score);
  return score;
};

// Go through data to get the score
export const solve = function (data: string[]) {
  let finalScore = 0;
  let index = 1;
  for (const card of data) {
    // console.log("Card", index);
    const winMatches = card.match(winningNumbersRegexp)?.[0].trim().split(/\s+/);
    const scractchedMatches = card.match(scratchedNumbersRegexp)?.[0].trim().split(/\s+/);
    const cardCount = getWinningNumbersCountPowerOfTwo(winMatches!, scractchedMatches!);
    index++;
    if (cardCount === null) continue;
    // console.log("🚀 ~ file: script.ts:41 ~ finalScore:", finalScore);
    finalScore += getLineScore(cardCount);
  }
  // Result: 25651
  // console.log("Part1: Final score is: ", finalScore);
  return finalScore;
};

// Part 2: for each matching cards between the winning cards and the scracthed cards, it creates a copy for each of the subsequent cards following the one picked.
// Final is the sum of all accumulated scartch cards, copies and originals.

// See how many winMatches are in the scracthedMatches
const getWinningNumbersCount = (winMatches: string[], scractchedMatches: string[]) => {
  let count = 0;
  for (const num of winMatches!) {
    if (scractchedMatches?.includes(num)) {
      // console.log("🚀 ~ file: script.ts:15 ~ getWinningNumbersCount ~ num:", num, "is a match");
      count++;
    }
  }
  // console.log("🚀 ~ file: script.ts:27 ~ count:", count);
  return count;
};

export const solve2 = function (data: string[]) {
  // Fill the original cards
  let totalCopies: number[] = new Array(data.length).fill(1);
  for (const [index, card] of data.entries()) {
    const winMatches = card.match(winningNumbersRegexp)?.[0].trim().split(/\s+/);
    const scractchedMatches = card.match(scratchedNumbersRegexp)?.[0].trim().split(/\s+/);
    const cardCount = getWinningNumbersCount(winMatches!, scractchedMatches!);
    if (cardCount === null) continue;
    for (let i = 1; i <= cardCount; i++) {
      // For every card, add the copies created on top of the copies already present
      totalCopies[index + i] += totalCopies[index];
    }
  }
  // console.log("🚀 ~ file: script.ts:84 ~ solve2 ~ totalCopies:", totalCopies);
  return totalCopies.reduce((acc, curr) => acc + curr, 0);
};

console.log("Part2: Final score is: ", solve2(data));
