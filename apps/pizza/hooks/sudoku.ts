const s =
  "9715..842..69...1....8.2..95.....79...76.83...28.....57..1.5....4...91..819..7254";

const arr = [...s].map((el) => el === "." ? 0 : Number.parseInt(el));

function getRow(index, arr) {
  const rowStart = Math.floor(index / 9) * 9;
  if (rowStart === 0) {
    return arr.slice(0, 9);
  }

  return arr.slice(rowStart, rowStart + 9);
}
