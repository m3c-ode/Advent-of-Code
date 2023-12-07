// const inputString = "oneight";
// const letteredDigitsRegex = /(one)|(eight)/g;

// const matches = inputString.match(letteredDigitsRegex);

// console.log(matches); // Output: ['one', 'eight']
// the string
// the string
let s = "oneight";

// the pattern
let pattern = /(one)|(eight)/g;

// find all matches
let match;
const res = [];
while ((match = pattern.exec(s)) !== null) {
  // res.push(match[0]);
  // num1 = { [match.index]: match[0] };
  // num2 = { [regexp.lastIndex - match[0].length]: match[0] };
  console.log(match);
  console.log(pattern.lastIndex - 1);
  pattern.lastIndex = pattern.lastIndex - 1;
}
