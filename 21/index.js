import { getInput } from "../shared.js";

const raw = getInput("21/input.txt");

const getData = () =>
  raw.split("\r\n").reduce((res, cur) => {
    const [id, rest] = cur.split(":");
    const trimmed = rest.trim().split(" ");
    res[id] = trimmed.length === 1 ? +trimmed : trimmed;
    return res;
  }, {});

const p1 = () => {
  const data = getData();
  while (true) {
    let toCheck = Object.entries(data).filter(([_, value]) =>
      Array.isArray(value)
    );

    if (!toCheck.length) {
      break;
    }

    for (const [key, [left, operator, right]] of toCheck) {
      if (!Array.isArray(data[left]) && !Array.isArray(data[right])) {
        if (operator === "+") {
          data[key] = data[left] + data[right];
        } else if (operator === "-") {
          data[key] = data[left] - data[right];
        } else if (operator === "*") {
          data[key] = data[left] * data[right];
        } else if (operator === "/") {
          data[key] = data[left] / data[right];
        }
      }
    }
  }
  console.log(data.root);
};

const p2 = () => {
  const data = getData();

  let prevState = "";
  data.humn = "x";
  data.root[1] = "=";

  while (true) {
    let toCheck = Object.entries(data).filter(([_, value]) =>
      Array.isArray(value)
    );

    const newState = JSON.stringify(data);
    if (prevState === newState) {
      break;
    }
    prevState = newState;

    for (const [key, [left, operator, right]] of toCheck) {
      if (!Array.isArray(data[left]) && !Array.isArray(data[right])) {
        if (!isNaN(data[left]) && !isNaN(data[right])) {
          if (operator === "+") {
            data[key] = data[left] + data[right];
          } else if (operator === "-") {
            data[key] = data[left] - data[right];
          } else if (operator === "*") {
            data[key] = data[left] * data[right];
          } else if (operator === "/") {
            data[key] = data[left] / data[right];
          } else if (operator === "/") {
            data[key] = `(${data[left]} ${operator} ${data[right]})`;
          }
        } else {
          data[key] = `(${data[left]} ${operator} ${data[right]})`;
        }
      }
    }
  }
  // paste result in https://www.mathpapa.com/algebra-calculator.html
  console.log(data.root);
};

const p2_self = () => {
  const data = getData();

  let prevState = "";
  data.humn = { x: 1, n: 0 };
  data.root[1] = "=";

  while (true) {
    let toCheck = Object.entries(data).filter(([_, value]) =>
      Array.isArray(value)
    );

    const newState = JSON.stringify(data);
    if (prevState === newState) {
      break;
    }
    prevState = newState;

    for (const [key, [left, operator, right]] of toCheck) {
      if (!Array.isArray(data[left]) && !Array.isArray(data[right])) {
        if (!isNaN(data[left]) && !isNaN(data[right])) {
          if (operator === "+") {
            data[key] = data[left] + data[right];
          } else if (operator === "-") {
            data[key] = data[left] - data[right];
          } else if (operator === "*") {
            data[key] = data[left] * data[right];
          } else if (operator === "/") {
            data[key] = data[left] / data[right];
          } else if (operator === "/") {
            data[key] = `(${data[left]} ${operator} ${data[right]})`;
          }
        } else {
          const toSolve = Number.isInteger(data[left])
            ? data[right]
            : data[left];
          const number = Number.isInteger(data[left])
            ? data[left]
            : data[right];
          let newToSolve = {};
          if (operator === "+") {
            newToSolve.x = toSolve.x;
            newToSolve.n = toSolve.n + number;
          } else if (operator === "-") {
            newToSolve.x = toSolve.x;
            newToSolve.n = toSolve.n - number;
          } else if (operator === "*") {
            newToSolve.x = toSolve.x * number;
            newToSolve.n = toSolve.n * number;
          } else if (operator === "/") {
            newToSolve.x = toSolve.x / number;
            newToSolve.n = toSolve.n / number;
          } else if (operator === "=") {
            const n = number - toSolve.n;
            const x = n / toSolve.x;
            newToSolve = x;
          }
          data[key] = newToSolve;
        }
      }
    }
  }
  console.log(data.root);
};

p1();
p2();
