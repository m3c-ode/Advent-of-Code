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

// String.prototype.count = function (c) {
//     var result = 0, i = 0;
//     for (i; i < this.length; i++)if (this[i] == c) result++;
//     return result;
// };

export { };