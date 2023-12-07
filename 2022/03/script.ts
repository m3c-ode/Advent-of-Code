/* Day 3: for each ruckshack, defined by each string on each lines, find the unique item that is shared between each compartments. (An item is represented by a character. A ruckshack has 2 compartments of equal size - split in half). THIS ITEM DOES NOT NECESSARILY APPEARS ONLY 1 TIME IN THE COMPARTMENT. IT MAY APPEAR MULTIPLE TIMES
Then, based on their priority list (a=1, b=2..., z=26, A=27, B=28,..., Z=52), define the priority level of each item and 
Add them up */

import { syncReadFile } from "../utils/functions";

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


function findUniqueChar(string: string): string[] {
    const res: string[] = [];
    for (let i = 0; i < string.length; i++) {
        const letter = string[i];
        let occurrences = string.count(letter);
        if (occurrences === 1) res.push(letter);
    }
    return res;
}

function findUniqueCharInRuckshack(compartments: string[]) {
    let commons: string[] = [];
    for (let index = 0; index < compartments.length; index += 2) {
        let comp1 = findUniqueChar(compartments[index]);
        let comp2 = findUniqueChar(compartments[index + 1]);
        const commonChar = comp1.filter(char => {
            return comp2.includes(char);
        });
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

function findPriorityNum(char: string) {
    const orderList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const num = orderList.indexOf(char) + 1;
    return num;
}


const comparments = compartimentize(data);
const sharedItems1 = findCommonCharInRuckshack(comparments);
const priorityNumberList = sharedItems1.map(char => findPriorityNum(char));

console.log('Part 1 answer: 8085 - sum of priority list', priorityNumberList.reduce((acc, curr) => acc + curr));

/* Part 2: Each line represents what an elf carries and they are put by groups of 3. Find the common item between every 3 ruckshacks. */
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

const sharedItems2 = findUniqueItemBetweenGroups(data);

const priorityList = sharedItems2.map(char => findPriorityNum(char));
const prioritySum = priorityList.reduce((acc, curr) => acc + curr);
console.log("Part 2 Answer: 2515", prioritySum)


