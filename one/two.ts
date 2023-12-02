const text = await Deno.readTextFile("one/data/input.txt");
const lines = text.split("\n");

const stringNumbers = Object.fromEntries(
  ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].map(
    (str, index) => {
      return [str, index + 1];
    },
  ),
);

let max = 0;

for (const line of lines) {
  let earliestIndex = line.length;
  let latestIndex = 0;
  let [earliestValue, latestValue] = [0, 0];

  for (const [str, num] of Object.entries(stringNumbers)) {
    const firstIndexOfStr = line.indexOf(str);
    const firstIndexOfNum = line.indexOf(String(num));

    const firstIndex = Math.min(
      firstIndexOfStr >= 0 ? firstIndexOfStr : line.length,
      firstIndexOfNum >= 0 ? firstIndexOfNum : line.length,
    );

    if (firstIndex < earliestIndex) {
      earliestValue = num;
      earliestIndex = firstIndex;
    }

    const lastIndex = Math.max(
      line.lastIndexOf(str),
      line.lastIndexOf(String(num)),
    );

    if (lastIndex >= latestIndex) {
      latestValue = num;
      latestIndex = lastIndex;
    }
  }

  max += Number(`${earliestValue}${latestValue}`);
}

console.log(max);
