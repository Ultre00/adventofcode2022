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

const isVisible = (x, y) => {
  for (const [dx, dy] of directions) {
    let i = 0;
    let visible = true;
    let toCheck = null;
    do {
      toCheck = data.elementOrNull(x + ++i * dx, y + i * dy);
      if (toCheck != null && data[x][y] <= toCheck) {
        visible = false;
        break;
      }
    } while (toCheck !== null);

    if (visible) {
      return true;
    }
  }
  return false;
};

const getScore = (x, y) => {
  let scores = [];
  for (const [dx, dy] of directions) {
    let i = 0;
    let score = 0;
    let toCheck = null;
    do {
      toCheck = data.elementOrNull(x + ++i * dx, y + i * dy);
      score += toCheck != null ? 1 : 0;
      if (toCheck != null && data[x][y] <= toCheck) {
        break;
      }
    } while (toCheck !== null);
    scores.push(score);
  }
  return scores.product();
};

//part 1
console.log(
  data
    .map((row, x) => row.map((col, y) => (isVisible(x, y) ? 1 : 0)).sum())
    .sum()
);

//part 2
console.log(
  data.map((row, x) => row.map((col, y) => getScore(x, y)).max()).max()
);
