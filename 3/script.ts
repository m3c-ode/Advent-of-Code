/* Day 3: for each ruckshack, find the unique item that is shared between each compartments. (split in half). THIS ITEM DOES NOT NECESSARILY APPEARS ONLY 1 TIME IN THE COMPARTMENT. IT MAY APPEAR MULTIPLE TIMES
bASED ON THEIR priority list, define the priority level of each item
Add them up */

import { syncReadFile } from "../utils/functions";
// import './../utils.functions';
// require('./../ utils.functions')

const data = syncReadFile('./data.txt');

function compartimentize(data: string[]): string[] {
    let compartments: string[] = [];
    let start = 0;
    for (let index = 0; index < data.length; index++) {
        const ruckshack = data[index];
        let start = 0;
        for (let index = 0; index < 2; index++) {
            const compartment = ruckshack.slice(start, start + ruckshack.length / 2);
            compartments.push(compartment);
            start = ruckshack.length / 2;
        }
    }
    return compartments;
}

// String.prototype.count = function (c: string): number {
//     let count = 0;
//     for (let index = 0; index < this.length; index++) {
//         const element = this[index];
//         if (c === element) count++;
//     }
//     return count;
// };

function findUniqueChar(string: string): string[] {
    const res: string[] = [];
    for (let i = 0; i < string.length; i++) {
        const letter = string[i];
        let occurrences = string.count(letter);
        // console.log(`occurences for ${letter} in ${string} is ${occurrences}`);
        if (occurrences === 1) res.push(letter);
    }
    return res;
}

function findUniqueCharInRuckshack(compartments: string[]) {
    let commons: string[] = [];
    for (let index = 0; index < compartments.length; index += 2) {
        // let comp1 = findUniqueChar(compartments[index]);
        let comp1 = findUniqueChar(compartments[index]);
        // console.log("🚀 ~ file: script.ts:48 ~ findUniqueCharInRuckshack ~ comp1", comp1);
        // let comp2 = findUniqueChar(compartments[index + 1]);
        let comp2 = findUniqueChar(compartments[index + 1]);
        // console.log("🚀 ~ file: script.ts:50 ~ findUniqueCharInRuckshack ~ comp2", comp2);
        const commonChar = comp1.filter(char => {
            return comp2.includes(char);
        });
        // console.log("🚀 ~ file: script.ts:54 ~ commonChar ~ commonChar", commonChar);
        commons.push(commonChar[0]);
    }
    return commons;
}

function findCommonCharInRuckshack(compartments: string[]) {
    let commons: string[] = [];
    for (let index = 0; index < compartments.length; index += 2) {
        let comp1 = compartments[index];
        let comp2 = compartments[index + 1];
        for (const char of comp1) {
            if (comp2.includes(char)) {
                commons.push(char);
                break;
            }
        }
    }
    return commons;
}

// const comparments = compartimentize(data).slice(6, 8);
const comparments = compartimentize(data);

// console.log(comparments);

// console.log(findUniqueCharInRuckshack(comparments));
// console.log(findCommonCharInRuckshack(comparments));

// const sharedItems = findCommonCharInRuckshack(comparments);
// console.log("🚀 ~ file: script.ts:88 ~ sharedItems", sharedItems);

// const uniqueItems = findUniqueCharInRuckshack(comparments).filter(item => { if (item !== undefined) return item; });
// console.log("🚀 ~ file: script.ts:69 ~ uniqueItems", uniqueItems);

function findPriorityNum(char: string) {
    const orderList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = orderList.indexOf(char) + 1;
    return num;
}

// const priorityNumberList = sharedItems.map(char => findPriorityNum(char));

// console.log('PArt 1 answer: 8085 - sum of priority list', priorityNumberList.reduce((acc, curr) => acc + curr));

/* Part 2: Each line represents what an elf carries and they are put by groups of 3. Find the common item between every 3 ruckshacks. */
console.log('data:', data);

function findUniqueItemBetweenGroups(ruckshacks: string[]) {
    let commons: string[] = [];
    for (let index = 0; index < ruckshacks.length; index += 3) {
        let elf1 = ruckshacks[index];
        let elf2 = ruckshacks[index + 1];
        let elf3 = ruckshacks[index + 2];
        for (const char of elf1) {
            if (elf2.includes(char)) {
                if (elf3.includes(char)) {
                    commons.push(char);
                    break;
                }
            }
        }
    }
    return commons;
}

const sharedItems = findUniqueItemBetweenGroups(data);
console.log("🚀 ~ file: script.ts:128 ~ sharedItems", sharedItems);

const priorityList = sharedItems.map(char => findPriorityNum(char));
console.log("🚀 ~ file: script.ts:131 ~ priorityList", priorityList);

const prioritySum = priorityList.reduce((acc, curr) => acc + curr);
console.log("PArt 2 Answer: 2515", prioritySum)


