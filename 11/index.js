import { getInput } from "../shared.js";

const raw = getInput("11/input.txt");
// const data = raw.split("\r\n").map((m) => m.split(" "));

const data = {
  0: {
    items: [54, 89, 94],
    op: (old) => old * 7,
    test: (val) => val % 17 == 0,
    true: 5,
    false: 3,
    inspects: 0,
  },
  1: {
    items: [66, 71],
    op: (old) => old + 4,
    test: (val) => val % 3 == 0,
    true: 0,
    false: 3,
    inspects: 0,
  },
  2: {
    items: [76, 55, 80, 55, 55, 96, 78],
    op: (old) => old + 2,
    test: (val) => val % 5 == 0,
    true: 7,
    false: 4,
    inspects: 0,
  },
  3: {
    items: [93, 69, 76, 66, 89, 54, 59, 94],
    op: (old) => old + 7,
    test: (val) => val % 7 == 0,
    true: 5,
    false: 2,
    inspects: 0,
  },
  4: {
    items: [80, 54, 58, 75, 99],
    op: (old) => old * 17,
    test: (val) => val % 11 == 0,
    true: 1,
    false: 6,
    inspects: 0,
  },
  5: {
    items: [69, 70, 85, 83],
    op: (old) => old + 8,
    test: (val) => val % 19 == 0,
    true: 2,
    false: 7,
    inspects: 0,
  },
  6: {
    items: [89],
    op: (old) => old + 6,
    test: (val) => val % 2 == 0,
    true: 0,
    false: 1,
    inspects: 0,
  },
  7: {
    items: [62, 80, 58, 57, 93, 56],
    op: (old) => old * old,
    test: (val) => val % 13 == 0,
    true: 6,
    false: 4,
    inspects: 0,
  },
};

//part 1
// for (let i = 0; i < 20; i++) {
//   for (const key of Object.keys(data)) {
//     const monkey = data[key];
//     for (const item of monkey.items) {
//       monkey.inspects++;
//       const res = Math.floor(monkey.op(item) / 3);
//       const nextMonkey = monkey[monkey.test(res)];
//       data[nextMonkey].items.push(res);
//     }
//     monkey.items = [];
//   }
// }

// const scores = Object.values(data)
//   .map((m) => m.inspects)
//   .sortIntegers()
//   .reverse();
// console.log(scores[0] * scores[1]);

const mods = [17, 3, 5, 7, 11, 19, 2, 13];
const commonDivisor = mods.product();

//part 2
for (let i = 0; i < 10000; i++) {
  for (const key of Object.keys(data)) {
    const monkey = data[key];
    for (const item of monkey.items) {
      monkey.inspects++;
      const res = monkey.op(item);
      const res2 = res % commonDivisor;
      const nextMonkey = monkey[monkey.test(res2)];
      data[nextMonkey].items.push(res2);
    }
    monkey.items = [];
  }
}

const scores = Object.values(data)
  .map((m) => m.inspects)
  .sortIntegers()
  .reverse();
console.log(scores[0] * scores[1]);
