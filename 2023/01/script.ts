// Part 1: On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

import { syncReadFile } from "../../utils/functions";

const data = syncReadFile("2023/01/data.txt");
// console.log("🚀 ~ file: script.ts:6 ~ data", data);
const testdata = syncReadFile("2023/01/testdata.txt");
const testdata2 = syncReadFile("2023/01/testdata2.txt");
const testdata3 = syncReadFile("2023/01/testdata3.txt");
// console.log("🚀 ~ file: script.ts:6 ~ testdata", testdata);

const letteredDigits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getCalibrationValuesSum = (data: string[]): number => {
  // get single digits regexp
  const regexp = /\d/g;
  let sum = 0;
  data.forEach((line) => {
    let num1 = "",
      num2 = "";
    // use regexp and .match to get list of strings
    const res = line.match(regexp);
    if (res) {
      // get first and last digit, of each string
      num1 = res[0];
      res.length > 1 ? (num2 = res[res.length - 1]) : (num2 = num1);
    }
    // convert strings to numbers and add to sum
    const num = parseInt(num1 + num2);
    // console.log("🚀 ~ file: script.ts:26 ~ data.forEach ~ num:", num);
    sum += num;
  });
  console.log("🚀 ~ file: script.ts:27 ~ data.forEach ~ sum:", sum);
  return sum;
};

// Result is 55621

// did everything in 1 function as we loop through the data once, instead of twice
// const getSumOfCalibrationValues = (data: string[]): number => { }

// getCalibrationValuesSum(testdata);
// getCalibrationValuesSum(data.slice(0, 4));
// getCalibrationValuesSum(data);

// Part 2: some input might be written in letters
const findDigits = (line: string): { [index: number]: string } => {
  const regexp = /\d/g;
  const res = line.match(regexp);
  let num1 = {},
    num2 = {};
  if (res) {
    // get first and last digit, of each string
    num1 = { [line.indexOf(res[0])]: res[0] };
    res.length > 1
      ? (num2 = {
          [line.lastIndexOf(res[res.length - 1])]: res[res.length - 1],
        })
      : (num2 = num1);
  }
  return res ? { ...num1, ...num2 } : {};
};

const findLetteredDigits = (data: string): { [index: number]: string } => {
  let num1 = {},
    num2 = {};
  const digits = Object.keys(letteredDigits);
  const regexp = new RegExp(digits.join("|"), "g");

  // use a loop with .exec instead of .match, to control the index of regexp
  let res: any[] = [];
  let match;
  while ((match = regexp.exec(data)) !== null) {
    // console.log("🚀 ~ file: script.ts:83 ~ findLetteredDigits ~ match:", match);
    res.push(match[0]);
    regexp.lastIndex = match.index + 1;
  }
  // // const res = data.match(regexp);

  // console.log("🚀 ~ file: script.ts:65 ~ findLetteredDigits ~ res:", res);
  // const result = Array.from(data.matchAll(regexp), (m) => m);
  // console.log("🚀 ~ file: script.ts:83 ~ findLetteredDigits ~ result:", result);

  if (res.length > 0) {
    num1 = { [data.indexOf(res[0])]: res[0] };
    num2 =
      res.length > 1
        ? {
            [data.lastIndexOf(res[res.length - 1])]: res[res.length - 1],
          }
        : num1;
    // return [num1, num2];
  }
  return res.length > 0 ? { ...num1, ...num2 } : {};
};

const getLineNumber = function (data: { [index: number]: string }): number {
  // from data, gets first and last digit, then return associated number
  const indexes: number[] = [];
  // Object.values(data)
  for (const index of Object.keys(data)) {
    // indexes[Object.keys(obj)[0]] = Object.values(obj)[0];
    indexes.push(Number(index));
  }
  // console.log("🚀 ~ file: script.ts:95 ~ indexes:", indexes);
  const firstDigitIndex = Math.min(...indexes);
  const lastDigitIndex = Math.max(...indexes);
  let firstDigit = data[firstDigitIndex];
  let lastDigit = data[lastDigitIndex];

  // if numbers are found letteredDigits, replace with number
  if (letteredDigits[firstDigit as keyof typeof letteredDigits])
    firstDigit = letteredDigits[firstDigit as keyof typeof letteredDigits].toString();
  if (letteredDigits[lastDigit as keyof typeof letteredDigits])
    lastDigit = letteredDigits[lastDigit as keyof typeof letteredDigits].toString();

  const num = parseInt(firstDigit + lastDigit);
  // console.log("🚀 ~ file: script.ts:111 ~ num:", num)
  console.log('for line "' + data + '"', num);
  return num;
};

const getNewCalibrationValuesSum = (data: string[]): number => {
  let sum = 0;
  data.forEach((line) => {
    const digits = findDigits(line);
    const letteredDigits = findLetteredDigits(line);
    // console.log("🚀 ~ file: script.ts:74 ~ getNewCalibrationValuesSum ~ letteredDigits", letteredDigits);
    // console.log("🚀 ~ file: script.ts:74 ~ getNewCalibrationValuesSum ~ digits", digits);
    const allLineDigits = { ...digits, ...letteredDigits };
    sum += getLineNumber(allLineDigits);
  });
  console.log("🚀 ~ file: script.ts:128 ~ data.forEach ~ sum:", sum);
  return sum;
};

getNewCalibrationValuesSum(data);
