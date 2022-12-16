import { getInput } from "../shared.js";

const raw = getInput("15/input.txt");
const data = raw
  .split("\r\n")
  .map((m) => [...m.match(/x=[-]?\d+|y=[-]?\d+/g)].map((n) => +n.substring(2)))
  .map(([sx, sy, bx, by]) => [
    [sx, sy],
    [bx, by],
  ]);

const calculateDistance = ([x1, y1], [x2, y2]) =>
  Math.abs(x2 - x1) + Math.abs(y2 - y1);

const getRanges = (row) => {
  const ranges = [];
  for (const [sensor, beacon] of data) {
    const distanceToBeacon = calculateDistance(sensor, beacon);
    const distanceToRow = calculateDistance(sensor, [sensor[0], row]);
    const distance = distanceToBeacon - distanceToRow;
    if (distanceToBeacon === distanceToRow) {
      ranges.push([sensor[0], sensor[0]]);
    } else if (distanceToBeacon > distanceToRow) {
      ranges.push([sensor[0] - distance, sensor[0] + distance]);
    }
  }
  return ranges;
};

//part 1
const rangesP1 = getRanges(2000000).flattenRanges();
const beaconsOnRow = data
  .filter(
    ([_, beacon]) =>
      rangesP1.some(
        ([left, right]) => beacon[0] >= left && beacon[0] <= right
      ) && beacon[1] === 2000000
  )
  .map(([_, beacon]) => beacon[0])
  .distinct().length;

console.log(rangesP1.map(([a, b]) => Math.abs(b - a)).sum() + 1 - beaconsOnRow);

//part 2
for (let y = 0; y < 4000000; y++) {
  const ranges = getRanges(y)
    .flattenRanges()
    .filter(([left, right]) => right >= 0 && left <= 4000000)
    .map(([left, right]) => [
      left < 0 ? 0 : left,
      right > 4000000 ? 4000000 : right,
    ]);
  const total = ranges.map(([left, right]) => right - left).sum();
  if (total < 4000000) {
    // good chance that we have exactly 2 ranges if it is not literally an edge case xD
    const x = ranges[0][0] + 1;
    console.log(x * 4000000 + y);
  }
}
