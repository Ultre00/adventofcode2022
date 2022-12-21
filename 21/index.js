import { getInput } from "../shared.js";

const raw = getInput("21/input.txt");
const data = raw.split("\r\n").reduce((res, cur) => {
  const [id, rest] = cur.split(":");
  const trimmed = rest.trim().split(" ");
  res[id] = trimmed.length === 1 ? +trimmed : trimmed;
  return res;
}, {});

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
