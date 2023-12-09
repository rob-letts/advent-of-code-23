// TYPES
type Race = Map<number, { time: number; record: number }>;

// INIT
const text = await Deno.readTextFile("six/data/input.txt");
const lines = text.split("\n");

// SETUP
const [[_, ...times], [__, ...records]] = lines.map((line) =>
  line.split(/[ ]+/)
);

const races: Race = times.reduce((acc, time, index) => {
  acc.set(index, {
    time: Number(time),
    record: Number(records[index]),
  });
  return acc;
}, new Map());

// MAIN
const totals: number[] = [];

races.forEach((race) => {
  let total = 0;

  for (let i = 1; i < race.time; i++) {
    const speed = i;
    const remainingTime = race.time - i;
    const distance = speed * remainingTime;

    if (distance > race.record) {
      total++;
    }
  }

  totals.push(total);
});

export const result = totals.reduce((acc, total) => acc * total, 1);
