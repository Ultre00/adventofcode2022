import { getInput } from "../shared.js";

const raw = getInput("7/input.txt");
const data = raw.split("\r\n");

const getRoot = (cursor) => (cursor.parent ? getRoot(cursor.parent) : cursor);
const addSize = (cursor, size) => {
  cursor.size += size;
  if (cursor.parent) {
    addSize(cursor.parent, size);
  }
};

const tree = data.reduce(
  (cursor, cur) => {
    const parts = cur.trim().split(" ");
    if (parts[0] === "$") {
      if (parts[1] === "cd") {
        if (parts[2] === "/") {
          return getRoot(cursor);
        }
        if (parts[2] === "..") {
          return cursor.parent;
        }
        return cursor[parts[2]];
      }
    } else if (parts[0] === "dir") {
      cursor[parts[1]] = { parent: cursor, size: 0 };
    } else {
      addSize(cursor, +parts[0]);
    }
    return cursor;
  },
  { size: 0 }
);

const root = getRoot(tree);

//part 1
const p1 = (cursor) => {
  return Object.keys(cursor).reduce((res, cur) => {
    if (cur === "parent") {
      return res;
    } else if (cur === "size" && cursor.size <= 100000) {
      return res + cursor.size;
    }
    return res + p1(cursor[cur]);
  }, 0);
};
console.log(p1(root));

//part 2
const p2 = (cursor) => {
  return Object.keys(cursor).reduce((res, cur) => {
    if (cur === "parent") {
      return res;
    } else if (
      cur === "size" &&
      cursor.size < res &&
      70000000 - root.size + cursor.size >= 30000000
    ) {
      return cursor.size;
    }
    return Math.min(res, p2(cursor[cur]));
  }, Infinity);
};
console.log(p2(root));
