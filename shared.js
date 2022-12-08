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

Array.prototype.product = function () {
  return this.reduce((res, cur) => +res * +cur);
};

Array.prototype.max = function () {
  return Math.max(...this);
};

Array.prototype.sortIntegers = function () {
  return this.sort((a, b) => a - b);
};

Array.prototype.distinct = function () {
  return this.filter((val, i, self) => self.indexOf(val) === i);
};

Array.prototype.transpose = function () {
  return Array.from(
    { length: Math.max(...this.map((m) => m.length)) },
    (_, i) => this.map((col) => col[i])
  );
};

const _elementOrNull = (arr, index) =>
  index >= 0 && index < arr?.length ? arr[index] : null;

Array.prototype.elementOrNull = function (...params) {
  return params.reduce((res, cur) => _elementOrNull(res, cur), this);
};
