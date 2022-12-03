import { getInput } from "../shared.js";

const raw = getInput("3/input.txt");
const data = raw
  .split("\r\n")
  .map((m) => [m.substring(0, m.length / 2), m.substring(m.length / 2)]);

const getPoints = (value) =>
  value.map((m) =>
    m === m.toUpperCase() ? m.charCodeAt(0) - 38 : m.charCodeAt(0) - 96
  );

const getMatchingLetters = (value) =>
  value.map(([a, ...rest]) => {
    return [...a].find((n) => rest.every((b) => [...b].includes(n)));
  });

//part 1
console.log(getPoints(getMatchingLetters(data)).sum());

// //part2
const grouped = data.reduce(
  (res, cur, i) => {
    if (i % 3 == 0) {
      res.index++;
      res.groups[res.index] = [cur[0].concat(cur[1])];
    } else {
      res.groups[res.index].push(cur[0].concat(cur[1]));
    }
    return res;
  },
  { index: -1, groups: [] }
).groups;

console.log(getPoints(getMatchingLetters(grouped)).sum());
