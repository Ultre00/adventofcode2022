import { getInput } from "../shared.js";

const raw = getInput("6/input.txt");

const findMarker = (str, size) => {
  const arr = [...str];
  for (let i = 0; i < arr.length; i++) {
    if (arr.slice(i, i + size).distinct().length === size) {
      return i + size;
    }
  }
};

//part 1
console.log(findMarker(raw, 4));

//part2
console.log(findMarker(raw, 14));
