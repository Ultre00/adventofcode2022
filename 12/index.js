import { getInput } from "../shared.js";

const raw = getInput("12/input.txt");
const data = raw
  .split("\r\n")
  .map((m) =>
    m.split("").map((m) => {
      const code = m.charCodeAt(0);
      if (code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0)) {
        return code - "a".charCodeAt(0);
      }
      return m;
    })
  )
  .transpose();

const direction = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const findCoord = (toFind) =>
  data.reduce(
    (total, col, x) =>
      total ||
      col.reduce((res, val, y) => (val === toFind ? [x, y] : res), null),
    null
  );

const getEligibleNeighbors = ([x, y]) =>
  direction
    .map(([dx, dy]) => {
      const toCheck = [x + dx, y + dy];
      let amountToCheck = data.elementOrNull(...toCheck);
      if (amountToCheck === "E") {
        amountToCheck = 25;
      }
      const amount = data[x][y] === "S" ? 0 : data[x][y];
      return amountToCheck !== null && amountToCheck - amount <= 1
        ? toCheck
        : null;
    })
    .filter((m) => m);

const sortByDistanceTo = (coords, [x, y]) =>
  coords.sort((a, b) => {
    const distanceA = Math.sqrt(Math.pow(x - a.x, 2) + Math.pow(y - a.y, 2));
    const distanceB = Math.sqrt(Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2));
    return distanceA < distanceB
      ? -1
      : distanceA > distanceB
      ? 1
      : a.distance < b.distance
      ? -1
      : a.distance > b.distance
      ? 1
      : 0;
  });

const start = findCoord("S");
const end = findCoord("E");

const getOrCreateNode = (map, [x, y], parent) => {
  let node = map[`${x}_${y}`];
  if (!node) {
    node = { neighbors: [], distance: 1, x, y };
    map[`${x}_${y}`] = node;
    if (parent) {
      node.parent = parent;
      node.distance += parent.distance;
      parent.neighbors.push(node);
    } else {
      node.distance = 0;
    }
  }

  return node;
};

const printMap = (map) => {
  const parts = [];
  let selected = map[`${end[0]}_${end[1]}`];
  while (selected.parent) {
    parts.push([selected.x, selected.y]);
    selected = selected.parent;
  }
  console.log(parts.length);
  for (let y = 0; y < data[0].length; y++) {
    for (let x = 0; x < data.length; x++) {
      let char = data[x][y];
      if (Number.isInteger(char)) {
        char = String.fromCharCode("a".charCodeAt(0) + char);
      }
      if (parts.filter((m) => m[0] === x && m[1] === y).length) {
        process.stdout.write(`\x1b[36m${char}\x1b[0m`);
      } else {
        process.stdout.write(char);
      }
    }
    process.stdout.write("\r\n");
  }
};

//part 1
const p1 = () => {
  const map = {};
  const open = [getOrCreateNode(map, start)];
  const closed = [];
  let current = null;
  while (open.length) {
    current = open.shift();
    closed.push(current);

    if (current.x === end[0] && current.y === end[1]) {
      break;
    }

    const neighbors = getEligibleNeighbors([current.x, current.y]);
    for (const [nx, ny] of neighbors) {
      const neighbor = getOrCreateNode(map, [nx, ny], current);
      if (!closed.includes(neighbor) && !open.includes(neighbor)) {
        open.push(neighbor);
      }
    }
    // sortByDistanceTo(open, end);
  }
  printMap(map);
  const test = `${end[0]}_${end[1]}`;
  console.log(test);
  console.log(map[test].distance);
};
p1();

//part 2
