export const printMap = (data, map, start, end) => {
  const parts = [start];
  let selected = map[`${end[0]}_${end[1]}`];
  while (selected?.parent) {
    parts.push([selected.x, selected.y]);
    selected = selected.parent;
  }

  for (let y = 0; y < data[0].length; y++) {
    for (let x = 0; x < data.length; x++) {
      let char = String.fromCharCode("a".charCodeAt(0) + data[x][y]);
      if (start[0] === x && start[1] === y) {
        char = "S";
      } else if (end[0] === x && end[1] === y) {
        char = "E";
      }

      if (parts.filter((m) => m[0] === x && m[1] === y).length) {
        process.stdout.write(`\x1b[36m${char}\x1b[0m`);
      } else {
        process.stdout.write(char);
      }
    }
    process.stdout.write("\r\n");
  }
};
