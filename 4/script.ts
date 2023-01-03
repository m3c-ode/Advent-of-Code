/* Day 4: From each data line: How many sections 00-00 are entirely comtained in the other one it is paired with?  */

import { syncReadFile } from "../utils/functions";

const data = syncReadFile('./data.txt');
console.log("🚀 ~ file: script.ts:4 ~ data", data);

function assignedPairs(data: string[]) {
    let newData: string[][] = [];
    for (let index = 0; index < data.length; index++) {
        let sections: string[] = [];
        const element = data[index];
        const section1 = element.slice(0, element.indexOf(','));
        sections.push(section1);
        const section2 = element.slice(element.indexOf(',') + 1);
        sections.push(section2);
        newData.push(sections);
    }
    return newData;
}

const pairsOfSections = assignedPairs(data);
console.log("🚀 ~ file: script.ts:19 ~ pairsOfSections", pairsOfSections);

// Divide the data into arrays of pairs, arrays of sections, arrays of zones??

function zonify(data: string[][]) {
    let newData: number[][] = [];
    for (const sectionPairs of data) {
        console.log("🚀 ~ file: script.ts:30 ~ zonify ~ sectionPairs", sectionPairs);
        let zones: number[] = [];
        for (const sections of sectionPairs) {
            const zone1 = parseInt(sections.slice(0, sections.indexOf('-')));
            const zone2 = parseInt(sections.slice(sections.indexOf('-') + 1));
            zones.push(zone1, zone2);
        }
        newData.push(zones);
    }
    return newData;
}

const zonified = zonify(pairsOfSections);
console.log("🚀 ~ file: script.ts:42 ~ zonified", zonified);

// Function for Part 1
// function sectionsContained(data: number[][]) {
//     let numberOfContainedSections = 0;
//     for (const zone of data) {
//         // console.log("🚀 ~ file: script.ts:48 ~ sectionsContained ~ zone", zone);
//         if (zone[0] >= zone[2] && zone[1] <= zone[3]) {
//             console.log('found for zone', zone);
//             numberOfContainedSections++;
//             continue;
//         }
//         if (zone[2] >= zone[0] && zone[3] <= zone[1]) {
//             console.log('found for zone', zone);
//             numberOfContainedSections++;
//             continue;
//         }
//     }
//     return numberOfContainedSections;
// }

// const result = sectionsContained(zonified);
// console.log("Numbers of sections containes in one each other: 511", result);

/* Part 2: find pairs of sectiosn that overlap at ALL */
function sectionsOverlapping(data: number[][]) {
    let numberOfOverlappingSections = 0;
    for (const zone of data) {
        // console.log("🚀 ~ file: script.ts:48 ~ sectionsOverlapping ~ zone", zone);
        if (zone[0] >= zone[2] && zone[0] <= zone[3]) {
            console.log('found for zone', zone);
            numberOfOverlappingSections++;
            continue;
        }
        if (zone[1] >= zone[2] && zone[1] <= zone[3]) {
            console.log('found for zone', zone);
            numberOfOverlappingSections++;
            continue;
        }
        if (zone[2] >= zone[0] && zone[2] <= zone[1]) {
            console.log('found for zone', zone);
            numberOfOverlappingSections++;
            continue;
        }
        if (zone[3] >= zone[0] && zone[3] <= zone[1]) {
            console.log('found for zone', zone);
            numberOfOverlappingSections++;
            continue;
        }
    }
    return numberOfOverlappingSections;
}

const result = sectionsOverlapping(zonified);
console.log("🚀 ~ file: script.ts:87 ~ result = 821", result);
