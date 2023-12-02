// INIT
const text = await Deno.readTextFile("two/data/input.txt");
const lines = text.split("\n");

// SETUP
const maxCubes: { [key: string]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};

// MAIN
const validIds = lines.map((line, index) => {
  const [_, results] = line.split(":");

  const isValidGame = results.split(/;|,/)
    .map((item) => item.trim().split(" "))
    .every(([number, colour]) => {
      return Number(number) <= maxCubes[colour];
    });

  return isValidGame ? index + 1 : 0;
});

// OUTPUT
const result = validIds.reduce((acc, id) => acc + id);
console.log(result);
