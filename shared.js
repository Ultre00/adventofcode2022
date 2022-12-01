import { readFileSync } from "fs";
import path from "path";

export function getInput(sub) {
  try {
    const filePath = path.join(path.resolve(), sub);
    var data = readFileSync(filePath, "utf8");
    return data;
  } catch (e) {
    console.log("Error:", e.stack);
  }
}

Array.prototype.sum = function () {
  return this.reduce((res, cur) => +res + +cur);
};

Array.prototype.sortIntegers = function () {
  return this.sort((a, b) => a - b);
};
