const text = await Deno.readTextFile("one/data/input.txt");
const lines = text.split("\n");
const numbers = lines.map((line) => line.replace(/\D/g, ""));

const res = numbers.reduce((acc, num) => {
  return acc + Number(`${num.at(0)}${num.at(-1)}`);
}, 0);

console.log(res);
