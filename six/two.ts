// TYPES
type Race = Map<number, { time: number; record: number }>;

// INIT
const text = await Deno.readTextFile("six/data/input.txt");
const lines = text.split("\n");

// SETUP
const [time, record] = lines.map((line) => {
  return Number(line.replaceAll(" ", "").split(":").at(-1));
});

// MAIN
let total = 0;

for (let i = 1; i < time; i++) {
  const speed = i;
  const remainingTime = time - i;
  const distance = speed * remainingTime;

  if (distance > record) {
    total++;
  }
}

export const result = total;
