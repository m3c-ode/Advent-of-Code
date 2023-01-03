/* Day 4: From each line in data: How many sections defined by 00-00 are entirely comtained in the other one it is paired with?  */

import { syncReadFile } from "../utils/functions";

const data = syncReadFile('./data.txt');

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


function zonify(data: string[][]) {
    let newData: number[][] = [];
    for (const sectionPairs of data) {
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


// Function for Part 1
function sectionsContained(data: number[][]) {
    let numberOfContainedSections = 0;
    for (const zone of data) {
        // console.log("🚀 ~ file: script.ts:48 ~ sectionsContained ~ zone", zone);
        if (zone[0] >= zone[2] && zone[1] <= zone[3]) {
            numberOfContainedSections++;
            continue;
        }
        if (zone[2] >= zone[0] && zone[3] <= zone[1]) {
            numberOfContainedSections++;
            continue;
        }
    }
    return numberOfContainedSections;
}

const pairsOfSections = assignedPairs(data);
const zonified = zonify(pairsOfSections);
const result1 = sectionsContained(zonified);
console.log("Part 1 answer: Numbers of sections contained in one each other: 511", result1);

/* Part 2: find pairs of sections that overlaps (not entirely contained anymore) */
function sectionsOverlapping(data: number[][]) {
    let numberOfOverlappingSections = 0;
    for (const zone of data) {
        if (zone[0] >= zone[2] && zone[0] <= zone[3]) {
            numberOfOverlappingSections++;
            continue;
        }
        if (zone[1] >= zone[2] && zone[1] <= zone[3]) {
            numberOfOverlappingSections++;
            continue;
        }
        if (zone[2] >= zone[0] && zone[2] <= zone[1]) {
            numberOfOverlappingSections++;
            continue;
        }
        if (zone[3] >= zone[0] && zone[3] <= zone[1]) {
            numberOfOverlappingSections++;
            continue;
        }
    }
    return numberOfOverlappingSections;
}

const result2 = sectionsOverlapping(zonified);
console.log("Part 2 answer: numbers of ssections overlapping = 821", result2);
