import { getInput } from "../shared.js";

const raw = getInput("13/input.txt");
const data = raw.split("\r\n\r\n").map((m) => m.split("\r\n").map(JSON.parse));

const compare = (left, right) => {
  if (left === undefined && right === undefined) {
    return 0;
  }
  if (left === undefined) {
    return 1;
  }
  if (right === undefined) {
    return -1;
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    let result = 0;
    for (
      let i = 0;
      i < Math.max(left.length, right.length) && result === 0;
      i++
    ) {
      result = compare(left[i], right[i]);
    }
    return result;
  }
  if (Array.isArray(left)) {
    return compare(left, [right]);
  }
  if (Array.isArray(right)) {
    return compare([left], right);
  }
  return left < right ? 1 : left > right ? -1 : 0;
};

//part 1
console.log(
  data
    .map(([left, right], index) => (compare(left, right) === 1 ? index + 1 : 0))
    .sum()
);

//part 2
const start = [[2]];
const end = [[6]];
const totalList = data
  .flatMap((m) => m)
  .concat([start, end])
  .sort(compare)
  .reverse();
console.log((totalList.indexOf(start) + 1) * (totalList.indexOf(end) + 1));
