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
  return Math.max(...this.map((m) => +m));
};

Array.prototype.min = function () {
  return Math.min(...this.map((m) => +m));
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

Array.prototype.print2d = function (transpose = true) {
  const y_x_map = transpose ? this.transpose() : this;
  let str = "";
  for (let y = 0; y < y_x_map.length; y++) {
    if (y > 0) {
      str += "\r\n";
    }
    for (let x = 0; x < y_x_map[y].length; x++) {
      str += y_x_map[y][x];
    }
  }
  console.log(str);
};

const _elementOrNull = (arr, index) =>
  index >= 0 && index < arr?.length ? arr[index] : null;

Array.prototype.elementOrNull = function (...params) {
  return params.reduce((res, cur) => _elementOrNull(res, cur), this);
};

Array.prototype.traverse = function (coord, directions, callback, breakOn) {
  let result = [];
  for (const dir of directions) {
    let dirResult = [];
    let i = 0;
    let toCheck = null;
    do {
      i++;
      toCheck = this.elementOrNull(
        ...coord.map((m, index) => m + i * dir[index])
      );
      dirResult.push(callback(toCheck, i));
      if (breakOn && breakOn(toCheck, i)) {
        break;
      }
    } while (toCheck !== null);
    result.push(dirResult);
  }

  return result;
};

Array.prototype.crop2d = function (validator) {
  let clone = [...this.map((m) => [...m])];
  //crop left
  while (clone.length && clone[0].every(validator)) {
    clone.splice(0, 1);
  }
  //crop right
  while (clone.length && clone[clone.length - 1].every(validator)) {
    clone.splice(clone.length - 1, 1);
  }
  //crop top
  while (clone[0].length && clone.every((m) => validator(m[0]))) {
    for (const arr of clone) {
      arr.splice(0, 1);
    }
  }
  //crop top
  while (
    clone[0].length &&
    clone.every((m) => validator(m[clone[0].length - 1]))
  ) {
    for (const arr of clone) {
      arr.splice(clone[0].length - 1, 1);
    }
  }
  return clone;
};

Array.prototype.flattenRanges = function () {
  for (let i = 0; i < this.length - 1; i++) {
    const left = this[i];
    for (let j = i + 1; j < this.length; j++) {
      const right = this[j];
      const leftContainsRightFirst = right[0] >= left[0] && right[0] <= left[1];
      const leftContainsRightSecond =
        right[1] >= left[0] && right[1] <= left[1];
      const rightContainsLeftFirst = left[0] >= right[0] && left[0] <= right[1];
      const rightContainsLeftSecond =
        left[1] >= right[0] && left[1] <= right[1];

      //first check if we can completly remove a section
      if (rightContainsLeftFirst && rightContainsLeftSecond) {
        this.splice(i, 1);
        i--;
        break;
      } else if (leftContainsRightFirst && leftContainsRightSecond) {
        this.splice(j, 1);
        j--;
      } else {
        //check if we can partially remove a section
        if (rightContainsLeftFirst) {
          left[0] = right[1];
        }
        if (leftContainsRightFirst) {
          right[0] = left[1];
        }

        //check if we can combine
        if (left[1] === right[0]) {
          left[1] = right[1]; // right will be removed later
          i--;
          break;
        }
        if (right[1] === left[0]) {
          right[1] = left[1]; // left will be removed later
          j--;
        }
      }
    }
  }
  return this;
};
