import { getInput } from "../shared.js";

const raw = getInput("13/input.txt");
const data = raw.split("\r\n\r\n").map((m) => m.split("\r\n").map(JSON.parse));

const states = {
  RIGHT_ORDER: 1,
  WRONG_ORDER: 0,
  KEEP_GOING: -1,
};

const compare = (left, right) => {
  if (left === undefined && right === undefined) {
    return states.KEEP_GOING;
  }
  if (left === undefined) {
    return states.RIGHT_ORDER;
  }
  if (right === undefined) {
    return states.WRONG_ORDER;
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    let result;
    do {
      result = compare(left.shift(), right.shift());
    } while (result === states.KEEP_GOING && (left.length || right.length));
    return result;
  }
  if (Array.isArray(left)) {
    return compare(left, [right]);
  }
  if (Array.isArray(right)) {
    return compare([left], right);
  }
  return left < right
    ? states.RIGHT_ORDER
    : left > right
    ? states.WRONG_ORDER
    : states.KEEP_GOING;
};

// part 1
console.log(
  data
    .map(([left, right], index) => (compare(left, right) ? index + 1 : 0))
    .sum()
);
