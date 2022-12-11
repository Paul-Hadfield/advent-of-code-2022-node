import { readFileSync } from "fs";

function treeIsVisible(data: Array<string>, row: number, col: number): boolean {
  const maxRow = data.length - 1;
  const maxCol = data[row].length - 1;

  if (row === 0 || col === 0 || row === maxRow || col === maxCol) {
    return true;
  }

  const treeHeight = data[row][col];
  const treesVisibleFromLeft =
    data[row]
      .substring(0, col)
      .split("")
      .filter((cell) => cell >= treeHeight).length === 0;
  const treesVisibleFromRight =
    data[row]
      .substring(col + 1)
      .split("")
      .filter((cell) => cell >= treeHeight).length === 0;

  let rowData: string = "";
  for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    rowData += data[rowIndex][col];
  }

  const treesVisibleFromTop =
    rowData
      .substring(0, row)
      .split("")
      .filter((cell) => cell >= treeHeight).length === 0;
  const treesVisibleFromBottom =
    rowData
      .substring(row + 1)
      .split("")
      .filter((cell) => cell >= treeHeight).length === 0;

  return (
    treesVisibleFromLeft ||
    treesVisibleFromRight ||
    treesVisibleFromTop ||
    treesVisibleFromBottom
  );
}

try {
  const data = readFileSync("data.txt", "utf8").split("\n");
  let visibleTrees = 0;
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (treeIsVisible(data, row, col)) {
        visibleTrees++;
      }
    }
  }
  console.log(visibleTrees);
} catch (err) {
  console.error(err);
}
