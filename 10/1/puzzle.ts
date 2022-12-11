import { readFileSync } from "fs";

interface Instruction {
  wait: number;
  increment: number;
}

function parseInstruction(line: string): Instruction {
  if (line === "noop") {
    return { wait: 1, increment: 0 };
  }

  return { wait: 2, increment: parseInt(line.split(" ")[1]) };
}

interface Result {
  cycle: number;
  value: number;
}

function processInstruction(acc: Result[], instruction: Instruction): Result[] {
  const latestValue = acc[acc.length - 1];
  acc.push({
    cycle: latestValue.cycle + instruction.wait,
    value: latestValue.value + instruction.increment,
  });

  return acc;
}

try {
  let interval = 20;
  let signalStrength = 0;
  let currentResult = 0;
  readFileSync("data.txt", "utf8")
    .split("\n")
    .map(parseInstruction)
    .reduce(processInstruction, [{ cycle: 1, value: 1 }])
    .forEach((result) => {
      if (result.cycle <= interval) {
        currentResult = result.value;
      }

      if (result.cycle >= interval) {
        signalStrength += interval * currentResult;
        interval += 40;
      }
    });

  console.log(signalStrength);
} catch (err) {
  console.error(err);
}
