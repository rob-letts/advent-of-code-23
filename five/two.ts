const text = await Deno.readTextFile("five/data/input.txt");
const [seedLine, _, ...lines] = text.split("\n");
const [__, seeds] = seedLine.split(":").map((str) => str.trim());

console.log(seeds);

// SETUP
const currentMapLines: string[] = [];
const seedNumbers = seeds.split(" ").map((str) => Number(str));
let lowestLocation = Number.MAX_SAFE_INTEGER;

const boundaries: number[] = [];

// MAIN
while (seedNumbers.length) {
  const start = seedNumbers.shift();
  const range = seedNumbers.shift();

  if (start && range) {
    const end = start + range - 1;

    if (!boundaries.length) {
      boundaries.push(start, end);
    } else {
      boundaries[0] = Math.min(boundaries[0], start);
      boundaries[1] = Math.max(boundaries[1], end);
    }
  }
}

for (let i = boundaries[0]; i < boundaries[1]; i++) {
  lowestLocation = Math.min(lowestLocation, getLocation(i));
  console.log(lowestLocation);
}

// HELPERS
function getLocation(seed: number): number {
  let currentSeed = seed;

  lines.forEach((line, index) => {
    const lastLine = index === lines.length - 1;

    if (line.length || lastLine) {
      currentMapLines.push(line);
    }

    if (!line.length || lastLine) {
      const [_, ...mappings] = currentMapLines;

      mappings.forEach((mapping) => {
        const [destination, source, range] = mapping
          .split(" ")
          .map((str) => Number(str));

        const maxBound = source + range - 1;

        if (currentSeed <= maxBound && currentSeed >= source) {
          currentSeed = currentSeed - source + destination;

          // exit the loop
          mappings.length = 0;
        }
      });

      currentMapLines.length = 0;
    }
  });
  return currentSeed;
}
console.log(lowestLocation);

// export const result = lowestLocation;
