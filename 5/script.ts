/* Day 5: stacks of crates.
stacks go from data[i] with i = 7 -> 0
insctructions start from data[i] i=10
stack[0] = data[i][j] with j = 0 -> 2
stack[1] = data[i][j] with j = 3->5

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

function craneOperation(NbOfCrates: number, fromStack: number, toStack: number) {
    // let currentStack = newStacks[fromStack - 1];
    const currentStackHeight = getActualStackHeight(newStacks, fromStack);
    // // console.log("🚀 ~ file: script.ts:59 ~ craneOperation ~ currentStackHeight", currentStackHeight);
    // let destinationStackHeight = getActualStackHeight(newStacks, toStack);
    // // console.log("🚀 ~ file: script.ts:61 ~ craneOperation ~ destinationStackHeight", destinationStackHeight);
    // for (let index = currentStackHeight - 1; index >= currentStackHeight - NbOfCrates; index--) {
    //     const crate = newStacks[fromStack - 1].pop()!;
    //     // console.log("🚀 ~ file: script.ts:66 ~ craneOperation ~ crate", crate);
    //     newStacks[fromStack - 1].splice(index, 1, " ");
    //     newStacks[toStack - 1][destinationStackHeight] = crate;
    //     destinationStackHeight++;
    // }
    // return newStacks;
    const cratesToMove: string[] = [];
    for (let index = 0; index < NbOfCrates; index++) {
        const crate = NbOfCrates;
        cratesToMove.push(newStacks[fromStack - 1].pop()!);
    }
    newStacks[toStack - 1].push(...cratesToMove);
}

// craneOperation(3, 6, 2);

//could use regExp to isolate digits with match()
function getInstructions(instructions: string[]) {
    let newInstructions: number[][] = [];
    for (let index = 0; index < instructions.length; index++) {
        const instruction = instructions[index];
        console.log("🚀 ~ file: script.ts:78 ~ getInstructions ~ instruction", instruction);
        let numberOfCrates = parseInt(instruction.substring(instruction.indexOf('move ') + "move ".length, instruction.indexOf(' ', instruction.indexOf('move ') + "move ".length)));
        // instruction.indexOf('move ')
        let fromStack = parseInt(instruction.substring(instruction.indexOf('from ') + "from ".length, instruction.indexOf("to")));
        let toStack = parseInt(instruction.substring(instruction.indexOf('to ') + "to ".length));
        const newInstruction = [numberOfCrates, fromStack, toStack];
        newInstructions.push(newInstruction);
    }
    return newInstructions;
}

function realizeOperation(instruction: number[]) {
    const [NbOfCrates, from, to] = instruction;
    craneOperation(NbOfCrates, from, to);
}

function realizeAllOperations(instructions: number[][]) {
    for (const instruction of instructions) {
        realizeOperation(instruction);
        // console.log(newStacks);
    }
}

function getTopCrates(stacks: string[][]) {
    let topCrates = "";
    for (const stack of stacks) {
        topCrates += stack[stack.length - 1];
    }
    console.log("🚀 ~ file: script.ts:108 ~ getTopCrates ~ topCrates", topCrates);
}
const newStacks = getStacks(stacks);
console.log("🚀 ~ file: script.ts:33 ~ newStacks", newStacks);

const newInstructions = getInstructions(instructions);
console.log("🚀 ~ file: script.ts:88 ~ newInsctructions", newInstructions);

// Part 1
// realizeAllOperations(newInstructions);
// getTopCrates(newStacks);

// Part 2: crates are no longer moved one by one, but by length of crates to move. It ocould simply be a reverse of the original pop().
function craneOperation2(NbOfCrates: number, fromStack: number, toStack: number) {
    const cratesToMove: string[] = [];
    for (let index = 0; index < NbOfCrates; index++) {
        const crate = NbOfCrates;
        cratesToMove.push(newStacks[fromStack - 1].pop()!);
    }
    newStacks[toStack - 1].push(...cratesToMove.reverse());
}

function realizePart2Operations(instructions: number[][]) {
    for (const instruction of instructions) {
        const [count, from, to] = instruction;
        craneOperation2(count, from, to);
        // console.log(newStacks);
    }
}

realizePart2Operations(newInstructions);
getTopCrates(newStacks);