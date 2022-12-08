import { getInput } from "../shared.js";

const raw = getInput("8/input.txt");
const data = raw.split("\r\n").map((m) => m.split("").map((n) => +n));

//part1
let visible = 0;
for (let x = 0; x < data.length; x++) {
  for (let y = 0; y < data[0].length; y++) {
    let isVisible = true;
    const isBlocking = (y2, x2) => data[y][x] <= data[y2][x2];
    if (x === 0 || y === 0 || x === data.length || y === data[0].length) {
      //nothing
    } else {
      for (let a = x + 1; a < data.length; a++) {
        if (isBlocking(y, a)) {
          isVisible = false;
          break;
        }
      }

      if (!isVisible) {
        isVisible = true;
        for (let a = y + 1; a < data[0].length; a++) {
          if (isBlocking(a, x)) {
            isVisible = false;
            break;
          }
        }
      }
      if (!isVisible) {
        isVisible = true;
        for (let a = 0; a < x; a++) {
          if (isBlocking(y, a)) {
            isVisible = false;
            break;
          }
        }
      }
      if (!isVisible) {
        isVisible = true;
        for (let a = 0; a < y; a++) {
          if (isBlocking(a, x)) {
            isVisible = false;
            break;
          }
        }
      }
    }
    visible += isVisible ? 1 : 0;
  }
}
console.log(visible);

//part2
let highest = 0;
for (let y = 0; y < data.length; y++) {
  for (let x = 0; x < data[0].length; x++) {
    const isBlocking = (y2, x2) => data[y][x] <= data[y2][x2];
    let visible = [0, 0, 0, 0];
    if (x === 0 || y === 0 || x === data.length || y === data[0].length) {
      //nothing
    } else {
      //down
      for (let a = x + 1; a < data.length; a++) {
        visible[0]++;
        if (isBlocking(y, a)) {
          break;
        }
      }

      for (let a = y + 1; a < data[0].length; a++) {
        visible[1]++;
        if (isBlocking(a, x)) {
          break;
        }
      }

      for (let a = x - 1; a >= 0; a--) {
        visible[2]++;
        if (isBlocking(y, a)) {
          break;
        }
      }

      for (let a = y - 1; a >= 0; a--) {
        visible[3]++;
        if (isBlocking(a, x)) {
          break;
        }
      }
    }
    const s = visible.product();
    if (s > highest) {
      highest = s;
    }
  }
}
console.log(highest);
