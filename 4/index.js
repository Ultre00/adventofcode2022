import { getInput } from "../shared.js";

const raw = getInput("4/input.txt");
const data = raw
  .split("\r\n")
  .map((m) => m.split(",").map((n) => n.split("-").map((o) => +o)));

const isInside = (a, b) => a[0] <= b[0] && a[1] >= b[1];
const isOverlapping = (a, b) =>
  (a[0] >= b[0] && a[0] <= b[1]) || (a[1] >= b[0] && a[1] <= b[1]);

//part 1
const p1 = data.reduce(
  (res, cur) =>
    isInside(cur[0], cur[1]) || isInside(cur[1], cur[0]) ? res + 1 : res,
  0
);
console.log(p1);

//part 2
const p2 = data.reduce(
  (res, cur) =>
    isOverlapping(cur[0], cur[1]) || isOverlapping(cur[1], cur[0])
      ? res + 1
      : res,
  0
);
console.log(p2);
