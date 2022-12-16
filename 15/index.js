import { getInput } from "../shared.js";

const raw = getInput("15/input.txt");
const data = raw
  .split("\r\n")
  .map((m) => [...m.match(/x=[-]?\d+|y=[-]?\d+/g)].map((n) => +n.substring(2)))
  .map(([sx, sy, bx, by]) => [
    [sx, sy],
    [bx, by],
  ]);

const rowToCheck = 2000000;
const calculateDistance = ([x1, y1], [x2, y2]) =>
  Math.abs(x2 - x1) + Math.abs(y2 - y1);

const pairs = [];
for (const [sensor, beacon] of data) {
  const distanceToBeacon = calculateDistance(sensor, beacon);
  const distanceToRow = calculateDistance(sensor, [sensor[0], rowToCheck]);
  const distance = distanceToBeacon - distanceToRow;
  if (distanceToBeacon === distanceToRow) {
    pairs.push([sensor[0], sensor[0]]);
  } else if (distanceToBeacon > distanceToRow) {
    pairs.push([sensor[0] - distance, sensor[0] + distance]);
  }
}

const removeOverlappingRanges = (pairs) => {
  for (let i = 0; i < pairs.length - 1; i++) {
    const left = pairs[i];
    for (let j = i + 1; j < pairs.length; j++) {
      const right = pairs[j];
      const leftContainsRightFirst = right[0] >= left[0] && right[0] <= left[1];
      const leftContainsRightSecond =
        right[1] >= left[0] && right[1] <= left[1];
      const rightContainsLeftFirst = left[0] >= right[0] && left[0] <= right[1];
      const rightContainsLeftSecond =
        left[1] >= right[0] && left[1] <= right[1];

      //first check if we can completly remove a section
      if (rightContainsLeftFirst && rightContainsLeftSecond) {
        pairs.splice(i, 1);
        i--;
        break;
      } else if (leftContainsRightFirst && leftContainsRightSecond) {
        pairs.splice(j, 1);
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
};
removeOverlappingRanges(pairs);
const beaconsOnRow = data
  .filter(
    ([_, beacon]) =>
      pairs.some(([left, right]) => beacon[0] >= left && beacon[0] <= right) &&
      beacon[1] === rowToCheck
  )
  .map(([_, beacon]) => beacon[0])
  .distinct().length;

console.log(pairs.map(([a, b]) => Math.abs(b - a)).sum() + 1 - beaconsOnRow);
