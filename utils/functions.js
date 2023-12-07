"use strict";
exports.__esModule = true;
exports.syncReadFile = void 0;
var readFileSync = require('fs').readFileSync;
function syncReadFile(filename) {
    var contents = readFileSync(filename, 'utf-8');
    //split at line breaks
    var arr = contents.split(/\r?\n/);
    return arr;
}
exports.syncReadFile = syncReadFile;
String.prototype.count = function (c) {
    var count = 0;
    for (var index = 0; index < this.length; index++) {
        if (c === this[index])
            count++;
    }
    return count;
};
