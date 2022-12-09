export const printBoard = ({ knots, map }) => {
  const keys = Object.keys(map).map((m) => m.split("_").map((m) => +m));
  const minX = Math.min(...keys.map((m) => m[0])) ?? 0;
  const maxX = Math.max(...keys.map((m) => m[0])) ?? 0;
  const minY = Math.min(...keys.map((m) => m[1])) ?? 0;
  const maxY = Math.max(...keys.map((m) => m[1])) ?? 0;

  let print = "";
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      let active = null;
      for (let k = 0; k < knots.length; k++) {
        if (knots[k][0] === x && knots[k][1] === y) {
          active = k;
          if (k === 0) {
            active = "H";
          }
          break;
        }
      }
      const val = map[`${x}_${y}`];
      if (active !== null) {
        print += active;
      } else if (val) {
        print += "#";
      } else {
        print += ".";
      }
    }
    print += "\r\n";
  }
  console.log(print);
};
