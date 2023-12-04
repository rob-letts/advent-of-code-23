// INIT
const text = await Deno.readTextFile("three/data/input.txt");
const lines = text.split("\n");

// SETUP
const numberArray: number[] = [];
let currentNumber = ``;
let isValidPart = false;

// HELPERS
function findSymbol(rowIndex: number, columnIndex: number): boolean {
  let hasFoundSymbol = false;

  [-1, 0, 1].forEach((rowOffset) => {
    [-1, 0, 1].forEach((columnOffset) => {
      const row = rowIndex + rowOffset;
      const column = columnIndex + columnOffset;

      const isValidRow = row >= 0 && row < lines.length;
      const isValidColumn = isValidRow && column >= 0 &&
        column < lines[row].length;

      if (isValidRow && isValidColumn) {
        const symbol = lines[row][column];

        if (symbol !== "." && symbol.match(/\D/)) {
          hasFoundSymbol = true;
        }
      }
    });
  });

  return hasFoundSymbol;
}

// MAIN
lines.forEach((row, rowIndex) => {
  isValidPart = false;

  row.split("").forEach((column, columnIndex) => {
    const isNotNumber = isNaN(parseInt(column));

    if (isNotNumber) {
      if (currentNumber) {
        if (isValidPart) {
          numberArray.push(Number(currentNumber));
        }

        currentNumber = ``;
      }

      isValidPart = false;
    } else {
      currentNumber += column;

      if (!isValidPart) {
        isValidPart = findSymbol(rowIndex, columnIndex);
      }
    }

    const isLastColumn = columnIndex === row.length - 1;
    if (isLastColumn && currentNumber) {
      if (isValidPart) {
        numberArray.push(Number(currentNumber));
      }

      currentNumber = ``;
    }
  });
});

export const result = numberArray.reduce((acc, number) => acc + number, 0);
