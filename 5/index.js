import { getInput } from "../shared.js";

const raw = getInput("5/input.txt");
const data = raw.split("\r\n\r\n");

const board = data[0]
  .split("\r\n")
  .map((m) => m.match(/.{1,3}\s?/g).map((n) => n.substring(1, 2)))
  .slice(0, -1)
  .reduce((res, cur) => {
    for (let index = 1; index <= cur.length; index++) {
      if (cur[index - 1].trim()) {
        if (res[index]) {
          res[index].push(cur[index - 1]);
        } else {
          res[index] = [cur[index - 1]];
        }
      }
    }
    return res;
  }, {});

const steps = data[1].split("\r\n").map((m) => m.match(/\d+/g).map((n) => +n));

const getBoardCopy = () =>
  Object.entries(board).reduce((res, [key, val]) => {
    res[key] = [...val];
    return res;
  }, {});

const printBoard = (board) => {
  console.log(
    Object.values(board)
      .map((m) => m[0])
      .join("")
  );
};

//part 1
const board1 = getBoardCopy();
for (const [move, from, to] of steps) {
  for (let i = 0; i < move; i++) {
    const toMove = board1[from].shift();
    board1[to].unshift(toMove);
  }
}
printBoard(board1);

//part 2
const board2 = getBoardCopy();
for (const [move, from, to] of steps) {
  const toMove = board2[from].splice(0, move);
  board2[to].splice(0, 0, ...toMove);
}
printBoard(board2);
