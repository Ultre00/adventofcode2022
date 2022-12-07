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
    if (cur === "$ ls") {
      return cursor;
    }
    if (cur.startsWith("$ cd ")) {
      const folder = cur.replace("$ cd ", "");
      if (folder === "/") {
        return getRoot(cursor);
      }
      if (folder === "..") {
        return cursor.parent;
      }
      return cursor[folder];
    }
    if (cur.startsWith("dir ")) {
      const folder = cur.replace("dir ", "");
      cursor[folder] = { parent: cursor, size: 0 };
    } else {
      const [size, _] = cur.split(" ");
      addSize(cursor, +size);
    }
    return cursor;
  },
  { size: 0 }
);

//part 1
const root = getRoot(tree);

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

//part2
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
