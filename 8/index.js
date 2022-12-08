import { getInput } from "../shared.js";

const raw = getInput("8/input.txt");
const data = raw
  .split("\r\n")
  .map((m) => m.split("").map((n) => +n))
  .transpose();

const directions = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const isVisible = (x, y) =>
  data
    .traverse(
      [x, y],
      directions,
      (m) => m === null || data[x][y] > m,
      (m) => m >= data[x][y]
    )
    .some((m) => m.every((n) => n));

const getScore = (x, y) =>
  data
    .traverse(
      [x, y],
      directions,
      (m) => (m !== null ? 1 : 0),
      (m) => m === null || data[x][y] <= m
    )
    .map((m) => m.sum())
    .product();

//part 1
console.log(
  data.map((row, x) => row.map((_, y) => (isVisible(x, y) ? 1 : 0)).sum()).sum()
);

//part 2
console.log(
  data.map((row, x) => row.map((_, y) => getScore(x, y)).max()).max()
);
