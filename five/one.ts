const text = await Deno.readTextFile("five/data/input.txt");
const [seedLine, _, ...lines] = text.split("\n");
const [__, seeds] = seedLine.split(":").map((str) => str.trim());
const seedNumbers = seeds.split(" ").map((str) => Number(str));

const currentMapLines: string[] = [];

const locations = seedNumbers.map((seed) => getLocation(seed));

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

export const result = Math.min(...locations);
