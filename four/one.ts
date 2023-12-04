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

const scores = lines.map((line) => {
  const [_, winningNumbers, myNumbers] = line.split(/:|\|/);
  const winningNumbersSet = extractNumbers(winningNumbers);
  const myNumbersSet = extractNumbers(myNumbers);

  const sharedNumbers = [...winningNumbersSet]
    .filter((num) => myNumbersSet.has(num));

  return sharedNumbers.length <= 1
    ? sharedNumbers.length
    : Math.pow(2, sharedNumbers.length - 1);
});

export const result = scores.reduce((acc, score) => acc + score, 0);
