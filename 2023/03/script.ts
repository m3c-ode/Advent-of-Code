import test from "node:test";
import { syncReadFile } from "../../utils/functions";
import { sign } from "crypto";

const data = syncReadFile("2023/03/data.txt");
// const testdata = syncReadFile("2023/03/testdata.txt");
const maxLength = data[0].length;
const maxHeigth = data.length;

// define a regexp to capture numbers on each line

const numRegex = /(\d+)/g;
// const signRegexp = /(^\d+[^.+])/g;
const signRegexp = /[^\d\.]/g;
const starRegexp = /(\*)/g;

let type: RegExpMatchArray;

// Get signs first
// Get valid coordinates from signs
// Get numbers' coordinates
// Check if they fit

// const regexpmatch = testdata[4].match(signRegexp);
// console.log("🚀 ~ file: script.ts:43 ~ regexpmatch:", regexpmatch);
// check if number are within -1 and +1 of vertical and horizontal index of signs.

// Get valid coordinates from signs
const getValidCoordinates = (signs: { yIndex: number; index: number }[]) => {
  let validCoordinates = new Set<string>();
  for (const sign of signs) {
    for (let i = sign.index - 1; i <= sign.index + 1; i++) {
      for (let j = sign.yIndex - 1; j <= sign.yIndex + 1; j++) {
        if (i < 0 || j < 0 || i > maxLength || j > maxHeigth || (i === sign.index && j === sign.yIndex)) continue;
        validCoordinates.add(`y${j}x${i}`);
      }
    }
  }
  return validCoordinates;
};

const getValidNumbers = function (validCoordinates: Set<string>, numbers: any[]) {
  // let result = 0;
  const validNumbers: number[] = [];
  for (const number of numbers) {
    if (validCoordinates.has(number.validCoordinates[0]) || validCoordinates.has(number.validCoordinates[1])) {
      // result += number.value;
      validNumbers.push(number.value);
    }
  }
  // return result;
  return validNumbers;
};

// Go through data and get the numbers and signs
let numbers: any[] = [];
let signs: any[] = [];
let stars: any[] = [];

for (let y = 0; y < data.length; y++) {
  const line = data[y];
  const digitMatches = line.matchAll(numRegex);
  for (const match of digitMatches) {
    // console.log("🚀 ~ file: script.ts:14 ~ match:", match);
    let numberObj = {
      value: Number(match[0]),
      yIndex: y,
      index: match.index!,
      length: match[0].length,
      validCoordinates: [`y${y}x${match.index!}`, `y${y}x${match.index! + match[0].length - 1}`],
    };
    // console.log("🚀 ~ file: script.ts:27 ~ numberObj:", numberObj);
    numbers.push(numberObj);
  }

  const signMatches = line.matchAll(signRegexp);
  for (const match of signMatches) {
    let signObj = {
      yIndex: y,
      index: match.index!,
    };
    signs.push(signObj);
  }

  // Part 2 - get * coordinates
  const starMatches = line.matchAll(starRegexp);
  for (const match of starMatches) {
    let signObj = {
      yIndex: y,
      index: match.index!,
    };
    stars.push(signObj);
  }
}
// console.log("🚀 ~ file: script.ts:20 ~ signs:", signs);
// console.log("🚀 ~ file: script.ts:20 ~ numbers:", numbers);

// Given all found signs, get the set of Valid coordinates
const validCoordinates = getValidCoordinates(signs);
// console.log("🚀 ~ file: script.ts:79 ~ validCoordinates:", validCoordinates);

const validNumbers = getValidNumbers(validCoordinates, numbers);
// console.log("🚀 ~ file: script.ts:85 ~ finalResult:", validNumbers);

// Result is 540212
console.log(
  "Part 1: Sum of all valid numbers is: ",
  validNumbers.reduce((a, b) => a + b, 0)
);

// Part 2: find all * signs that have exactly 2 numbers adjacent to them, multiply them, then add this result for the final part 2 result
console.log("🚀 ~ file: script.ts:95 ~ stars:", stars);

const getValidGearCoordinates = (signs: { yIndex: number; index: number }[]) => {
  let validCoordinates: { [coordinates: string]: string[] } = {};
  for (const sign of signs) {
    validCoordinates[`y${sign.yIndex}x${sign.index}`] = [];
    for (let i = sign.index - 1; i <= sign.index + 1; i++) {
      for (let j = sign.yIndex - 1; j <= sign.yIndex + 1; j++) {
        if (i < 0 || j < 0 || i > maxLength || j > maxHeigth || (i === sign.index && j === sign.yIndex)) continue;
        validCoordinates[`y${sign.yIndex}x${sign.index}`].push(`y${j}x${i}`);
      }
    }
  }
  return validCoordinates;
};

const validGearCoordinates = getValidGearCoordinates(stars);
// console.log("🚀 ~ file: script.ts:117 ~ validGearCoordinates:", validGearCoordinates);

const getValidGears = function (validGearCoordinates: { [coordinates: string]: string[] }, numbers: any[]) {
  let validGearRatios: number[] = [];
  for (const star in validGearCoordinates) {
    if (Object.prototype.hasOwnProperty.call(validGearCoordinates, star)) {
      const coordinates = validGearCoordinates[star];
      let numOfNumbers = 0;
      let gearRatio = 1;
      for (const num of numbers) {
        if (coordinates.includes(num.validCoordinates[0]) || coordinates.includes(num.validCoordinates[1])) {
          numOfNumbers++;
          gearRatio *= num.value;
        }
      }
      // Only select the ones that exactly have 2 numbers attached
      if (numOfNumbers === 2) {
        validGearRatios.push(gearRatio);
      }
    }
  }
  return validGearRatios;
};

const validGears = getValidGears(validGearCoordinates, numbers);
// console.log("🚀 ~ file: script.ts:153 ~ validGears:", validGears);

console.log(
  "Result for part 2 is: ",
  validGears.reduce((a, b) => a + b, 0)
);
