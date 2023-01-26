/* Day 7: From the data list, find all directories lesser or equal than 100000, then calculate the sum of their total sizes. Files can be count more than once (if nested in same directories) */

import { syncReadFile } from "../utils/functions";

const data = syncReadFile('./data.txt');
console.log("🚀 ~ file: script.ts:6 ~ data", data);

// function getDirectories(data: string[]) {
//     let tree: [string, string[]][] = [];
//     for (const cmd of data) {
//         // matches anything after "$ dir " start... 
//         const directory = cmd.match(/(?<=^\$\scd\s).*/g);
//         // const directory = cmd.slice(5)
//         // const content = 

//     }
// }

// // const test = "$ cd /".match(/(?<=^\$\scd\s).*/g);
// // console.log("🚀 ~ file: script.ts:19 ~ test", test);

// function getInputs(data: string[]) {

// }

// // Stack based approach: answer from reddit error_salad
/* const inputs: string[] = [];
const sizes: any = {};

for (let cmd of data) {
    cmd = cmd.replace("$ ", "");
    if (cmd.substring(0, 2) !== "ls" && cmd.substring(0, 3) !== "dir") {
        inputs.push(cmd);
    }
}
console.log("🚀 ~ file: script.ts:26 ~ inputs", inputs);

const stack: number[] = [];
for (let i = 0; i < inputs.length; i++) {
    const line = inputs[i];
    if (line.substring(0, 2) === "cd" && line.includes("..")) {
        stack.pop();
    } else if (line.substring(0, 2) === "cd") {
        stack.push(i);
        sizes[i] = 0;
    } else {
        const size = parseInt(line.split(" ")[0]);
        for (const s of stack) {
            sizes[s] += size;
        }
    }
    // console.log('stack', stack);
}
console.log("🚀 ~ file: script.ts:37 ~ stack", stack);
console.log("sizes", sizes);

let sum = 0;
for (const index in sizes) {
    if (sizes[index] <= 100000) {
        sum += sizes[index];
    }
}
console.log('Part 1 answer: total sum = 1581595', sum); */

// // Part 2: There is only a max cap of 70000000, and we need 30000000 of free space to run an update. Find the smallest directory that free up enough space to run update

// const spaceLeft = 70000000 - sizes[0];
// console.log("🚀 ~ file: script.ts:68 ~ spaceLeft", spaceLeft);
// const spaceNeeded = 30000000 - spaceLeft;
// console.log("🚀 ~ file: script.ts:70 ~ spaceNeeded", spaceNeeded);

// // find the closest value to spaceneeded in our sizes
// const potentialDirectories: number[] = [];
// for (const size in sizes) {
//     // if (Object.prototype.hasOwnProperty.call(sizes, size)) {
//     //     const element = sizes[size];
//     if (sizes[size] >= spaceNeeded) {
//         potentialDirectories.push(sizes[size]);
//     }
//     // }
// }

// console.log('result part 2 = 1544176: ', Math.min(...potentialDirectories));

// Node Data structure method
class Node {
    name = "";
    parent: Node | null = null;
    isDirectory = false;
    size = 0;
    children: Record<string, any> = {};
    // constructor() {
    //     this.parent = null;
    // }
}

function processCommand(command: string, rootNode: Node, currentPosition: Node) {
    let newCurrentPosition = currentPosition;
    const splitcommand = command.split(" ");
    if (splitcommand[1] === "cd") {
        if (splitcommand[2] === "..") {
            newCurrentPosition = currentPosition.parent!;
        } else if (splitcommand[2] === "/") {
            newCurrentPosition = rootNode;
        } else if (currentPosition.children[splitcommand[2]]) {
            newCurrentPosition = currentPosition.children[splitcommand[2]];
        }
    }
    return newCurrentPosition;
}

function processContent(command: string, currentPosition: Node) {
    const splitCommand = command.split(" ");
    if (splitCommand[0] === "dir" && !currentPosition.children[splitCommand[1]]) {
        let newNode = new Node();
        newNode.parent = currentPosition;
        newNode.isDirectory = true;
        newNode.name = splitCommand[1];
        currentPosition.children[splitCommand[1]] = newNode;
    } else {
        currentPosition.size += +splitCommand[0];
    }

}

function updateDirectorySize(node: Node) {
    let subSize = node.size;
    for (const child of Object.values(node.children)) {
        subSize += updateDirectorySize(child);
    }
    node.size = subSize;
    return subSize;
}

function sumOfDirectoriesInThreshold(node: Node, totalSize: number = 0, threshold: number = 100000) {
    for (const child of Object.values(node.children)) {
        totalSize = sumOfDirectoriesInThreshold(child, totalSize);
    }
    if (node.size <= threshold) return totalSize += node.size;
    return totalSize;
}

// Part 1 solve
const rootNode = new Node();
rootNode.name = "/";
rootNode.isDirectory = true;

let currentPosition = rootNode;

for (const command of data) {
    if (command.startsWith("$")) {
        currentPosition = processCommand(command, rootNode, currentPosition);
    } else {
        processContent(command, currentPosition);
    }
}

updateDirectorySize(rootNode);

// Result = 1581595
const part1res = sumOfDirectoriesInThreshold(rootNode);
console.log("part1res = 1581595", part1res);

// Part 2 solve
const spaceLeft = 70000000 - rootNode.size;
const spaceNeeded = 30000000 - spaceLeft;
console.log("🚀 ~ file: script.ts:167 ~ spaceNeeded", spaceNeeded);

function findPotentialDirectories(node: Node, potentialNode?: Node, target: number = spaceNeeded) {
    for (const child of Object.values(node.children)) {
        potentialNode = findPotentialDirectories(child, potentialNode);
    }
    console.log("🚀 ~ file: script.ts:172 ~ findPotentialDirectories ~ potentialNode", potentialNode?.size);
    console.log("🚀 ~ file: script.ts:174 ~ findPotentialDirectories ~ current node.size", node.size);
    if (node.size <= target) {
        console.log('returning potential node because current node does not meet target');
        return potentialNode;
    }
    if (!potentialNode || node.size <= potentialNode.size) {
        console.log("'returning current node because either it's our 1st search (depth, bottom) to be superior than target, as we don't have any potential search yet or current node is closer to target'");
        return node;
    };
    console.log('returning potential node because superior than target, inferior than current node and it exists');
    return potentialNode;
}
// console.log('root', rootNode);
const part2Res = findPotentialDirectories(rootNode);
console.log("result part 2 = 1544176:", part2Res?.size);
