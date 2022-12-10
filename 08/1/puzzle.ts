import { readFileSync } from "fs";

try {
  const result = readFileSync("example.txt", "utf8").split("\n");
  console.log(result);
} catch (err) {
  console.error(err);
}
