import { getInput } from "../shared.js";

const raw = getInput("9/input.txt");
const data = raw.split("\r\n").map((m) => m.split(" "));

const isTouching = ({ knots }, index) =>
  Math.abs(knots[index][0] - knots[index - 1][0]) <= 1 &&
  Math.abs(knots[index][1] - knots[index - 1][1]) <= 1;

const addToMap = ({ knots, map }, key, index) => {
  if (map[key] === undefined) {
    map[key] = {};
    Array.from(
      { length: 10 },
      (_, i) => (map[key] = { ...map[key], [i]: i === index ? 1 : 0 })
    );
  } else {
    map[key][index]++;
  }
};

const moveKnot = (context, index) => {
  const { knots } = context;
  let [x, y] = knots[index];
  const [prevX, prevY] = knots[index - 1];
  let dx = prevX - x;
  let dy = prevY - y;
  if (dx === 2) {
    dx = 1;
  }
  if (dx === -2) {
    dx = -1;
  }
  if (dy === 2) {
    dy = 1;
  }
  if (dy === -2) {
    dy = -1;
  }

  const newX = x + dx;
  const newY = y + dy;
  knots[index] = [newX, newY];
  const key = `${newX}_${newY}`;
  addToMap(context, key, index);
};

const solve = (length) => {
  const context = {
    map: { "0_0": {} },
    knots: Array.from({ length }, () => [0, 0]),
  };
  const { knots, map } = context;

  Array.from({ length }, (_, i) => (map["0_0"] = { ...map["0_0"], [i]: 1 }));

  for (let i = 0; i < data.length; i++) {
    const [dir, steps] = data[i];
    for (let j = 0; j < steps; j++) {
      for (let k = 0; k < knots.length; k++) {
        if (k === 0) {
          if (dir === "R") {
            knots[0][0]++;
          }
          if (dir === "L") {
            knots[0][0]--;
          }
          if (dir === "U") {
            knots[0][1]--;
          }
          if (dir === "D") {
            knots[0][1]++;
          }
        }

        if (k > 0 && !isTouching(context, k)) {
          moveKnot(context, k);
        }

        if (k === 0) {
          const key = `${knots[0][0]}_${knots[0][1]}`;
          addToMap(context, key, 0);
        }
      }
    }
  }
  console.log(
    Object.values(map)
      .map((m) => m[length - 1])
      .filter((m) => m >= 1).length
  );
};

//part 1
solve(2);

//part 2
solve(10);
