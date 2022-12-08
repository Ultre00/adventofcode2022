import { getInput } from "../shared.js";

const raw = getInput("1/input.txt");
const data = raw.split("\r\n\r\n").map((m) => m.split("\r\n").sum());

//part 1
console.log(Math.max(...data));

//part 2
console.log(data.sortIntegers().reverse().slice(0, 3).sum());
