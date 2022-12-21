import { getInput } from "../shared.js";

const raw = getInput("20/input.txt");

const getData = (encryptionKey) =>
  raw.split("\r\n").reduce((res, cur, i) => {
    res[i] = { amount: +cur * encryptionKey };
    return res;
  }, {});

const solve = (mixAmount, encryptionKey) => {
  const data = getData(encryptionKey);
  let arr = Object.values(data);
  for (let i = 0; i < mixAmount; i++) {
    for (const [key, value] of Object.entries(data)) {
      const curIndex = arr.indexOf(value);
      const newIndex = (curIndex + value.amount) % (arr.length - 1);
      arr.splice(
        newIndex === 0 ? arr.length - 1 : newIndex,
        0,
        arr.splice(curIndex, 1)[0]
      );
    }
  }

  const zeroIndex = arr.indexOf(arr.find((m) => m.amount === 0));
  console.log(
    arr[(1000 + zeroIndex) % arr.length].amount +
      arr[(2000 + zeroIndex) % arr.length].amount +
      arr[(3000 + zeroIndex) % arr.length].amount
  );
};

// part 1
solve(1, 1);

// part 2
solve(10, 811589153);
