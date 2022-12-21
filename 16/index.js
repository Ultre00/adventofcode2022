import { getInput } from "../shared.js";

const raw = getInput("16/input.txt");
const data = raw
  .split("\r\n")
  .map((m) => {
    const [, id, , , rateStr, , , , , ...valvesStr] = m.split(" ");
    return {
      id,
      rate: +rateStr.split("=")[1].replace(/;/g, ""),
      valves: valvesStr.map((n) => n.replace(/,/g, "")),
    };
  })
  .reduce((res, cur) => ({ ...res, [cur.id]: cur }), {});

for (const id of Object.keys(data)) {
  data[id].valves = data[id].valves.map((m) => data[m]);
}

const distanceMap = {};

for (const key of Object.keys(data)) {
  const paths = { [key]: 0 };
  const visited = {};
  const q = [data[key]];

  while (q.length) {
    const current = q.shift();

    for (const valve of current.valves) {
      const costToReach = paths[current.id] + 1;
      if (paths[valve.id] === undefined || paths[valve.id] > costToReach) {
        paths[valve.id] = costToReach;
      }
      if (!visited[valve.id]) {
        q.push(valve);
      }
    }

    visited[current.id] = true;
  }

  distanceMap[key] = paths;
}

const simulate = (
  current,
  closedValves,
  pressure,
  pressureIncrement,
  timer
) => {
  let results = [];
  for (const valve of closedValves) {
    const minutesNeeded = distanceMap[valve.id][current.id] + 1; // 1 to open the valve
    if (minutesNeeded < timer) {
      results.push(
        simulate(
          valve,
          closedValves.filter((m) => m !== valve),
          pressure + pressureIncrement * minutesNeeded,
          pressureIncrement + valve.rate,
          timer - minutesNeeded
        )
      );
    }
  }
  if (!results.length) {
    return pressure + pressureIncrement * timer;
  } else {
    return results.max();
  }
};

const result = simulate(
  data.AA,
  Object.values(data).filter((m) => m.rate > 0),
  0,
  0,
  30
);
console.log(result);
