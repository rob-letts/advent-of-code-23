// TYPES
type Totals = { [key: string]: number };

// INIT
const text = await Deno.readTextFile("two/data/input.txt");
const lines = text.split("\n");

// MAIN
const validIds = lines.map((line) => {
  const [_, results] = line.split(":");

  const totals: Totals = {
    red: 0,
    green: 0,
    blue: 0,
  };

  results.split(/;|,/)
    .map((item) => item.trim().split(" "))
    .forEach(([number, colour]) => {
      totals[colour] = Math.max(totals[colour], Number(number));
    });

  return Object.values(totals).reduce((acc, value) => acc * value);
});

// OUTPUT
export const result = validIds.reduce((acc, id) => acc + id);
