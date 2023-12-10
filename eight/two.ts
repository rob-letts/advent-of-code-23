const text = await Deno.readTextFile("eight/data/input.txt");
const lines = text.split("\n").filter((line) => line.length > 0);

const [directions, ...instructions] = lines;
let currentNodes: string[] = [];
let currentDirection = 0;
let stepsTaken = 0;

const instructionMap = instructions.reduce((acc, line) => {
  const [name, _, ...steps] = line.split(" ");
  acc.set(name, {
    L: steps.at(0)?.slice(1, -1),
    R: steps.at(1)?.slice(0, -1),
  });
  return acc;
}, new Map());

instructionMap.forEach((_, key) => {
  if (key.endsWith("A")) {
    currentNodes.push(key);
  }
});

while (true) {
  if (currentNodes.every((node) => node.endsWith("Z"))) {
    break;
  }

  const step = directions.at(currentDirection);
  if (step) {
    currentNodes = currentNodes.map((node) => instructionMap.get(node)[step]);
  }

  stepsTaken++;
  currentDirection = (currentDirection + 1) % directions.length;
}

export const result = stepsTaken;

console.log(result);
