const text = await Deno.readTextFile("four/data/input.txt");
const lines = text.split("\n");

function extractNumbers(numbers: string): Set<number> {
  return new Set([
    ...numbers
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .map((num) => Number(num)),
  ]);
}

const scores: Map<number, number[]> = new Map();
const tally: Map<number, number> = new Map();

lines.forEach((line, index) => {
  const cardNumber = index + 1;
  const [_, winningNumbers, myNumbers] = line.split(/:|\|/);
  const winningNumbersSet = extractNumbers(winningNumbers);
  const myNumbersSet = extractNumbers(myNumbers);

  const matches = [...winningNumbersSet]
    .filter((num) => myNumbersSet.has(num)).length;

  const copies = Array(matches).fill(0).map((_, i) => cardNumber + i + 1);
  scores.set(cardNumber, copies);
});

scores.forEach((copies, cardNumber) => {
  tally.set(cardNumber, (tally.get(cardNumber) || 0) + 1 || 1);

  copies.forEach((copy) => {
    tally.set(copy, (tally.get(copy) || 0) + (tally.get(cardNumber) || 0));
  });
});

export const result = [...tally.values()].reduce((a, b) => a + b, 0);