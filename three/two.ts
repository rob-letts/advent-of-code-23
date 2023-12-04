// TYPES
type GearMap = Map<string, number[]>;

// INIT
const text = await Deno.readTextFile("three/data/input.txt");
const lines = text.split("\n");

// SETUP
let currentNumber = "";
let gear = "";
const gearMap: GearMap = new Map();

// HELPERS
function findAndSetGear(
  map: GearMap,
  gear: string,
  number: number,
) {
  const currentNumbers = map.get(gear);
  if (currentNumbers) {
    currentNumbers.push(number);
  } else {
    map.set(gear, [number]);
  }
}

function updateGear(rowIndex: number, columnIndex: number) {
  [-1, 0, 1].forEach((rowOffset) => {
    [-1, 0, 1].forEach((columnOffset) => {
      const row = rowIndex + rowOffset;
      const column = columnIndex + columnOffset;

      const isValidRow = row >= 0 && row < lines.length;
      const isValidColumn = isValidRow && column >= 0 &&
        column < lines[row].length;

      if (isValidRow && isValidColumn) {
        const symbol = lines[row][column];

        if (symbol === "*") {
          gear = `${row}-${column}`;
        }
      }
    });
  });
}

// MAIN
lines.forEach((row, rowIndex) => {
  gear = "";
  currentNumber = "";

  row.split("").forEach((column, columnIndex) => {
    const isNotNumber = isNaN(parseInt(column));

    if (isNotNumber) {
      if (currentNumber && gear) {
        findAndSetGear(gearMap, gear, Number(currentNumber));
      }

      currentNumber = "";
      gear = "";
    } else {
      currentNumber += column;

      if (!gear) {
        updateGear(rowIndex, columnIndex);
      }
    }

    const isLastColumn = columnIndex === row.length - 1;
    if (isLastColumn) {
      if (!isNotNumber && gear) {
        findAndSetGear(gearMap, gear, Number(currentNumber));
      }
    }
  });
});

// RESULT
let total = 0;
gearMap.forEach((numbers) => {
  if (numbers.length === 2) {
    const [first, second] = numbers;
    total += first * second;
  }
});

export const result = total;
