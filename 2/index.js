import { getInput } from "../shared.js";

const raw = getInput("2/input.txt");
const data = raw.split("\r\n").map((m) => m.split(" "));

const pointMapPart1 = {
  AX: 3 + 1,
  AY: 6 + 2,
  AZ: 0 + 3,
  BX: 0 + 1,
  BY: 3 + 2,
  BZ: 6 + 3,
  CX: 6 + 1,
  CY: 0 + 2,
  CZ: 3 + 3,
};

//part 1
console.log(data.map(([a, b]) => pointMapPart1[`${a}${b}`]).sum());

//part2
const pointMapPart2 = {
  AX: 0 + 3,
  AY: 3 + 1,
  AZ: 6 + 2,
  BX: 0 + 1,
  BY: 3 + 2,
  BZ: 6 + 3,
  CX: 0 + 2,
  CY: 3 + 3,
  CZ: 6 + 1,
};
console.log(data.map(([a, b]) => pointMapPart2[`${a}${b}`]).sum());
