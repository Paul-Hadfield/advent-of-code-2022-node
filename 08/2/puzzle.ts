import { readFileSync } from "fs";

interface ViewingDistance {
  treeHeight: number;
  viewingDistance: number;
  process: boolean;
}

function processArray(
  acc: ViewingDistance,
  treeHeight: number
): ViewingDistance {
  if (!acc.process) {
    return acc;
  }

  if (acc.treeHeight <= treeHeight) {
    acc.process = false;
  }

  acc.viewingDistance++;
  return acc;
}

function scenicScore(data: Array<string>, row: number, col: number): number {
  const treeHeight = data[row][col];
  const leftViewingDistance = data[row]
    .substring(0, col)
    .split("")
    .reverse()
    .map((treeHeight) => parseInt(treeHeight))
    .reduce(processArray, {
      treeHeight: parseInt(treeHeight),
      viewingDistance: 0,
      process: true,
    }).viewingDistance;

  const rightViewingDistance = data[row]
    .substring(col + 1)
    .split("")
    .map((treeHeight) => parseInt(treeHeight))
    .reduce(processArray, {
      treeHeight: parseInt(treeHeight),
      viewingDistance: 0,
      process: true,
    }).viewingDistance;

  let rowData: string = "";
  for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    rowData += data[rowIndex][col];
  }

  const upViewingDistance = rowData
    .substring(0, row)
    .split("")
    .reverse()
    .map((treeHeight) => parseInt(treeHeight))
    .reduce(processArray, {
      treeHeight: parseInt(treeHeight),
      viewingDistance: 0,
      process: true,
    }).viewingDistance;

  const downViewingDistance = rowData
    .substring(row + 1)
    .split("")
    .map((treeHeight) => parseInt(treeHeight))
    .reduce(processArray, {
      treeHeight: parseInt(treeHeight),
      viewingDistance: 0,
      process: true,
    }).viewingDistance;

  return (
    leftViewingDistance *
    rightViewingDistance *
    upViewingDistance *
    downViewingDistance
  );
}

try {
  const data = readFileSync("data.txt", "utf8").split("\n");
  const scenicScores: number[] = [];

  let visibleTrees = 0;
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      scenicScores.push(scenicScore(data, row, col));
    }
  }
  console.log(Math.max(...scenicScores));
} catch (err) {
  console.error(err);
}
