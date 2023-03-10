// Part 1: From the list of data, find the elf (an elf is represented by a sequence of numbers (calories), which are the different food and calories he's carrying. Every empty line break is followed by another elf) who is carrying the most calories.

import { syncReadFile } from "../utils/functions";

function findCaloriesCarried(data: string[]) {
    const arrayofData: string[][] = [];
    let start = 0;

    for (let index = start; index < data.length; index++) {
        const element = data[index];
        if (element === '') {
            arrayofData.push(data.slice(start, index));
            start = index + 1;
        }
    }
    return arrayofData;
}

function convertStrArraytoNum(strArr: string[][]): number[][] {
    return strArr.map(array => array.map(str => Number(str)));
}

function addCarriedCaloriesPerElf(data: number[][]): number[] {
    return data.map((array => array.reduce((acc, curr) => acc + curr)));
}

function sortElvesCarrier(data: number[]) {
    return data.sort((a, b) => b - a);
}

function findMostCaloriesCarried(data: number[]): number {
    return data.reduce((a, b) => Math.max(a, b), -Infinity);
}


const data = syncReadFile('./data.txt');
const foodCarriedByAllElves = findCaloriesCarried(data);
const caloriesCarried = convertStrArraytoNum(foodCarriedByAllElves);
const totalCaloriesPerElf = addCarriedCaloriesPerElf(caloriesCarried);
const maxCaloriedCarried = findMostCaloriesCarried(totalCaloriesPerElf);

console.log('Max calories carried: 67027', maxCaloriedCarried);
// Answer: 67027

// Part 2: Find the sum of the calories carried by the top 3 elves
const sumofTop3 = sortElvesCarrier(totalCaloriesPerElf).slice(0, 3).reduce((acc, curr) => acc + curr);
console.log('Top 3 elves', sortElvesCarrier(totalCaloriesPerElf).slice(0, 3));
console.log('Sum of their calories carried: 197291', sumofTop3);
// Answer: 197291