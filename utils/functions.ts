const { readFileSync } = require('fs');

declare global {
    interface String {
        count(c: string): number;
    }
}

export function syncReadFile(filename: string): string[] {
    const contents = readFileSync(filename, 'utf-8');
    //split at line breaks
    const arr = contents.split(/\r?\n/);
    return arr;
}

String.prototype.count = function (c: string): number {
    let count = 0;
    for (let index = 0; index < this.length; index++) {
        if (c === this[index]) count++;
    }
    return count;
};

export { };