/* Day 5: Stacks of crates.
stacks go from data[i] with i = 7 -> 0
Instructions start from data[i] with i=10
The list of instructions defines how many crates and from which stack of crated to another is realized by the crane. The crane moves crates one by one.
At the end of the operations, what are the crates that are on the top of each stack?

*/

import { syncReadFile } from "../utils/functions";

const data = syncReadFile('./data.txt');
// console.log("🚀 ~ file: script.ts:4 ~ data", data);

const stacks = data.slice(0, 8);
console.log("🚀 ~ file: script.ts:15 ~ stacks", stacks);
const instructions = data.slice(10);


function getStacks(data: string[]) {
    let start = data.length - 1;
    let newStacks: string[][] = [];
    for (let stackIndex = 1; stackIndex < data[0].length; stackIndex += 4) {
        let newStack: string[] = [];
        for (let level = start; level >= 0; level--) {
            const crate = data[level][stackIndex];
            if (crate === ' ') continue;
            newStack.push(crate);
        }
        newStacks.push(newStack);
    }
    return newStacks;
}

function getActualStackHeight(stacks: string[][], stackNb: number) {
    let currentStackHeight = stacks[0].length - 1;
    while (stacks[stackNb - 1][currentStackHeight] === ' ') {
        currentStackHeight--;
    }
    return currentStackHeight + 1;
}


//could use regExp to isolate digits with match()
function getInstructions(instructions: string[]) {
    let newInstructions: number[][] = [];
    for (let index = 0; index < instructions.length; index++) {
        const instruction = instructions[index];
        let numberOfCrates = parseInt(instruction.substring(instruction.indexOf('move ') + "move ".length, instruction.indexOf(' ', instruction.indexOf('move ') + "move ".length)));
        let fromStack = parseInt(instruction.substring(instruction.indexOf('from ') + "from ".length, instruction.indexOf("to")));
        let toStack = parseInt(instruction.substring(instruction.indexOf('to ') + "to ".length));
        const newInstruction = [numberOfCrates, fromStack, toStack];
        newInstructions.push(newInstruction);
    }
    return newInstructions;
}

function craneOperation(NbOfCrates: number, fromStack: number, toStack: number) {
    const cratesToMove: string[] = [];
    for (let index = 0; index < NbOfCrates; index++) {
        const crate = NbOfCrates;
        cratesToMove.push(startStacksPosition[fromStack - 1].pop()!);
    }
    return startStacksPosition[toStack - 1].push(...cratesToMove);
}

function realizeOperation(instruction: number[]) {
    const [NbOfCrates, from, to] = instruction;
    craneOperation(NbOfCrates, from, to);
}

function realizeAllOperations(instructions: number[][]) {
    for (const instruction of instructions) {
        realizeOperation(instruction);
    }
    return startStacksPosition;
}

function getTopCrates(stacks: string[][]) {
    let topCrates = "";
    for (const stack of stacks) {
        topCrates += stack[stack.length - 1];
    }
    console.log("🚀 ~ file: script.ts:108 ~ getTopCrates ~ topCrates", topCrates);
}
const startStacksPosition = getStacks(stacks);
const newInstructions = getInstructions(instructions);

// Part 1
const newStacks = realizeAllOperations(newInstructions);
console.log("Part 1 result: FJSRQCFTN");
getTopCrates(newStacks);

// Part 2: crates are no longer moved one by one, but by length of crates to move. It ocould simply be a reverse of the original pop().
function craneOperation2(NbOfCrates: number, fromStack: number, toStack: number) {
    const cratesToMove: string[] = [];
    for (let index = 0; index < NbOfCrates; index++) {
        const crate = NbOfCrates;
        cratesToMove.push(startStacksPosition2[fromStack - 1].pop()!);
    }
    startStacksPosition2[toStack - 1].push(...cratesToMove.reverse());
}

function realizePart2Operations(instructions: number[][]) {
    for (const instruction of instructions) {
        const [count, from, to] = instruction;
        craneOperation2(count, from, to);
    }
}

const startStacksPosition2 = getStacks(stacks);
realizePart2Operations(newInstructions);
console.log("Part 2 result: CJVLJQPHS");
getTopCrates(startStacksPosition2);