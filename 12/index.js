import { getInput } from "../shared.js";

const raw = getInput("12/input.txt");
const specials = {};
const data = raw
  .split("\r\n")
  .map((m, y) =>
    m.split("").map((m, x) => {
      const code = m.charCodeAt(0);
      if (code >= "a".charCodeAt(0) && code <= "z".charCodeAt(0)) {
        return code - "a".charCodeAt(0);
      }
      specials[m] = [x, y];
      return m === "S" ? 0 : 25;
    })
  )
  .transpose();

const direction = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const getEligibleNeighbors = ([x, y]) =>
  direction
    .map(([dx, dy]) => {
      const toCheck = [x + dx, y + dy];
      let amountToCheck = data.elementOrNull(...toCheck);
      return amountToCheck !== null && amountToCheck - data[x][y] <= 1
        ? toCheck
        : null;
    })
    .filter((m) => m);

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

const solve = (start) => {
  const map = {};
  const open = [getOrCreateNode(map, start)];
  const closed = [];
  let current = null;
  while (open.length) {
    current = open.shift();
    closed.push(current);

    if (current.x === specials.E[0] && current.y === specials.E[1]) {
      break;
    }

    const neighbors = getEligibleNeighbors([current.x, current.y]);
    for (const [nx, ny] of neighbors) {
      const neighbor = getOrCreateNode(map, [nx, ny], current);
      if (!closed.includes(neighbor) && !open.includes(neighbor)) {
        open.push(neighbor);
      }
    }
  }
  return map[`${specials.E[0]}_${specials.E[1]}`]?.distance || Infinity;
};

//part 1
console.log(solve(specials.S));

//part 2
const startingPoints = [];
for (let x = 0; x < data.length; x++) {
  for (let y = 0; y < data[x].length; y++) {
    if (data[x][y] === 0) {
      startingPoints.push([x, y]);
    }
  }
}
console.log(Math.min(...startingPoints.map(solve)));
