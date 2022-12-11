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
  if (instruction.wait > 1) {
    for (let noop = 1; noop < instruction.wait; noop++) {
      acc.push({
        cycle: latestValue.cycle + noop,
        value: latestValue.value,
      });
    }
  }

  acc.push({
    cycle: latestValue.cycle + instruction.wait,
    value: latestValue.value + instruction.increment,
  });

  return acc;
}

function processCycle(acc: string[], cycle: Result): string[] {
  if (acc[acc.length - 1].length > 0 && acc[acc.length - 1].length % 40 == 0) {
    acc.push("");
  }

  const index = (cycle.cycle - 1) % 40;
  if (index >= cycle.value - 1 && index <= cycle.value + 1) {
    acc[acc.length - 1] = acc[acc.length - 1] + "#";
  } else {
    acc[acc.length - 1] = acc[acc.length - 1] + ".";
  }

  return acc;
}

try {
  let interval = 20;
  let signalStrength = 0;
  let currentResult = 0;

  const cycles = readFileSync("data.txt", "utf8")
    .split("\n")
    .map(parseInstruction)
    .reduce(processInstruction, [{ cycle: 1, value: 1 }])
    .reduce(processCycle, [""]);
  console.log(cycles);
} catch (err) {
  console.error(err);
}
