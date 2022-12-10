import { getInput } from "../shared.js";

const raw = getInput("10/input.txt");
const data = raw.split("\r\n").map((m) => m.split(" "));

const toCheck = [20, 60, 100, 140, 180, 220];
let cycles = 0;
let x = 1;
let computed = 0;

const CRT = Array.from({ length: 6 }, (m) =>
  Array.from({ length: 40 }, (m) => "-")
);

const compute = () => {
  if (toCheck.includes(cycles)) {
    computed = computed + cycles * x;
  }
};

const compute2 = () => {
  const rowIndex = Math.ceil((cycles + 1) / 40) - 1;
  const colIndex = cycles % 40;
  CRT[rowIndex][colIndex] = [x - 1, x, x + 1].includes(colIndex) ? "#" : ".";
};

for (let i = 0; i < data.length; i++) {
  if (data[i][0] === "noop") {
    compute2();
    cycles += 1;
    compute();
  } else {
    for (let j = 0; j < 2; j++) {
      compute2();
      cycles++;
      compute();
    }
    x += +data[i][1];
  }
}

//part 1
console.log(computed);

//part 2
console.log(CRT.map((m) => m.join("")).join("\r\n"));
