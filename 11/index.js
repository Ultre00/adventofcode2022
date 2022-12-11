import { getInput } from "../shared.js";

const raw = getInput("11/input.txt");

const getData = () =>
  raw
    .replace(/:/g, "")
    .split("\r\n\r\n")
    .map((m) => m.split("\r\n").map((m) => m.trim().split(/, | /)))
    .reduce((res, cur) => {
      res[cur[0][1]] = {
        items: cur[1].slice(2, cur[1].length).map((m) => +m),
        operation: (m) =>
          cur[2][4] === "*" ? m * (+cur[2][5] || m) : m + (+cur[2][5] || m),
        test: (m) => m % +cur[3][3] == 0,
        divider: +cur[3][3],
        true: +cur[4][5],
        false: +cur[5][5],
        inspects: 0,
      };
      return res;
    }, {});

const solve = (func, length) => {
  const data = getData();
  const commonDivisor = Object.values(data)
    .map((m) => m.divider)
    .product();

  for (let i = 0; i < length; i++) {
    for (const key of Object.keys(data)) {
      const monkey = data[key];
      for (const item of monkey.items) {
        monkey.inspects++;
        const res = Math.floor(func(monkey.operation(item))) % commonDivisor;
        const nextMonkey = data[monkey[monkey.test(res)]];
        nextMonkey.items.push(res);
      }
      monkey.items = [];
    }
  }

  const scores = Object.values(data)
    .map((m) => m.inspects)
    .sortIntegers()
    .reverse();
  console.log(scores[0] * scores[1]);
};

//part 1
solve((m) => m / 3, 20);

//part 2
solve((m) => m, 10_000);
