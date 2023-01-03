var readFileSync = require('fs').readFileSync;
function syncReadFile(filename) {
    var contents = readFileSync(filename, 'utf-8');
    var arr = contents.split(/\r?\n/);
    // console.log(arr);
    return arr;
}
var data = syncReadFile('./data.txt');
var arrayofData = [];
var start = 0;
for (var index = 0; index < data.length; index++) {
    var element = data[index];
    if (element === '') {
        arrayofData.push(data.splice(start, index));
        start = index;
    }
}
console.log(arrayofData);
// data.splice(0, data.indexOf(''))
