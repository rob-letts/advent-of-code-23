const text = await Deno.readTextFile("nine/data/input.txt");
const lines = text.split("\n");

const histories = lines.map((line) => {
  const lineNumbers = [line.split(" ").map((char) => Number(char))];

  while (true) {
    const currentLine = lineNumbers.at(-1);

    if (currentLine.every((num) => num === 0)) {
      break;
    }

    lineNumbers.push(
      currentLine.slice(1).map(
        (num, index) => {
          return num - Number(currentLine[index]);
        },
      ),
    );
  }

  return lineNumbers.reverse().reduce((acc, curr) => {
    return acc + curr.at(-1);
  }, 0);
});

export const result = histories.reduce((acc, curr) => acc + curr, 0);
console.log(result);
