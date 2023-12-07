import test from "node:test";
import { syncReadFile } from "../../utils/functions";

const data = syncReadFile("2023/02/data.txt");
const testdata = syncReadFile("2023/02/testdata.txt");
// console.log("🚀 ~ file: script.ts:5 ~ testdata:", testdata);

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

const regexp = /(?<red>\d+)\s+red|(?<green>\d+)\s+green|(?<blue>\d+)\s+blue/g;

let matches: RegExpExecArray | null;

let idSum = 0;

const checkGameValidity = function (gameString: string): boolean {
  // console.log("Checking last index", regexp.lastIndex);

  // with .exec()
  // need to reset lastIndex otherwise won't start at 0 on new line in case there is a match
  // regexp.lastIndex = 0;
  // while ((matches = regexp.exec(gameString)) !== null) {
  //   if (matches.groups?.red && parseInt(matches.groups?.red) > maxRed) return false;
  //   if (matches.groups?.green && parseInt(matches.groups?.green) > maxGreen) return false;
  //   if (matches.groups?.blue && parseInt(matches.groups?.blue) > maxBlue) return false;
  // }

  // with .matchAll()
  const matches = [...gameString.matchAll(regexp)];
  for (const match of matches) {
    if (match.groups?.red && parseInt(match.groups?.red) > maxRed) return false;
    if (match.groups?.green && parseInt(match.groups?.green) > maxGreen) return false;
    if (match.groups?.blue && parseInt(match.groups?.blue) > maxBlue) return false;
  }
  // console.log("🚀 ~ file: script.ts:22 ~ matches", matches);

  return true;
};

for (const [index, game] of data.entries()) {
  // console.log("🚀 ~ file: script.ts:47 ~ Current game:", game);
  if (checkGameValidity(game)) {
    // console.log("🚀 ~ file: script.ts:47 ~ Game", index + 1, "is valid");
    // console.log(`We add this ${index + 1} to the sum ${idSum}`);
    idSum += index + 1;
  }
}

console.log("Sum of valid games: ", idSum);

// Part 2 - find the fewest numbers of cubes for each game that would have made it possible
const getMinCubesPerGame = function (gameString: string): number[] {
  let minBlue = 0;
  let minGreen = 0;
  let minRed = 0;

  // with .matchAll()
  const matches = [...gameString.matchAll(regexp)];

  for (const match of matches) {
    if (match.groups?.red && Number(match.groups?.red) > minRed) minRed = Number(match.groups?.red);
    if (match.groups?.green && Number(match.groups?.green) > minGreen) minGreen = Number(match.groups?.green);
    if (match.groups?.blue && Number(match.groups?.blue) > minBlue) minBlue = Number(match.groups?.blue);
  }

  return [minRed, minGreen, minBlue];
};

const getPowerOfcubesSet = function (minCubes: number[]): number {
  return minCubes.reduce((acc, currCubes) => acc * currCubes, 1);
};

let total = 0;
for (const [index, game] of data.entries()) {
  const gameCubes = getMinCubesPerGame(game);
  total += getPowerOfcubesSet(gameCubes);
}

console.log("Sum of power of subes set: ", total);
