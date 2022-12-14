import { getInput } from "../shared.js";

const raw = getInput("14/input.txt");
const data = raw
  .split("\r\n")
  .map((m) => m.split(" -> ").map((n) => n.split(",").map(Number)));

const sandSource = [500, 0];
const sandPrioDirections = [
  [0, 1],
  [-1, 1],
  [1, 1],
];

const width = Math.max(...data.flatMap((m) => m.flatMap((n) => n[0]))) + 1;
const height = Math.max(...data.flatMap((m) => m.flatMap((n) => n[1]))) + 2; // 2 for p2

const map = Array.from({ length: width + 2 * height }, () =>
  Array.from({ length: height }, () => ".")
);

for (const chain of data) {
  for (let i = 1; i < chain.length; i++) {
    const [x1, y1] = chain[i - 1];
    const [x2, y2] = chain[i];
    for (let x = 0; x <= Math.abs(x2 - x1); x++) {
      for (let y = 0; y <= Math.abs(y2 - y1); y++) {
        map[height + x1 + (x1 < x2 ? x : -x)][y1 + (y1 < y2 ? y : -y)] = "#";
      }
    }
  }
}

let current = [...sandSource];

const loopSand = () => {
  while (true) {
    let placeSand = true;
    for (const [dx, dy] of sandPrioDirections) {
      const element = map.elementOrNull(
        height + current[0] + dx,
        current[1] + dy
      );
      if (element === ".") {
        current = [current[0] + dx, current[1] + dy];
        placeSand = false;
        break;
      }
    }
    if (placeSand) {
      map[height + current[0]][current[1]] = "o";
      if (current[0] === sandSource[0] && current[1] === sandSource[1]) {
        return;
      }
      current = [...sandSource];
    }
  }
};
loopSand();
//part 1
map.print2d();
console.log(map.flatMap((m) => m).filter((m) => m === "o").length);
