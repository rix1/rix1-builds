let ts = performance.now();
let currentBeat = 0;

const bpm = 178;
const msBetweenBeats = (1 / (bpm / 60)) * 1000;

function tick(cb: (beat: number) => void) {
  if (performance.now() - ts >= msBetweenBeats) {
    currentBeat += 1;
    ts = performance.now();
    cb(currentBeat);
  }
}

function createBar(currentBeat) {
  return Array.from({ length: 8 })
    .map((el, index) => {
      const isActive = currentBeat % 8 === index;
      if (isActive) {
        if ([2, 6].includes(index)) {
          return "🥁";
        }
        if ([1, 3, 5, 7].includes(index)) {
          return "👏";
        }
      }
      return "_";
    })
    .toString();
}

if (import.meta.main) {
  while (true) {
    tick((currentBeat) => {
      if (currentBeat % 8 === 0) {
        console.log();
      }
      console.log(createBar(currentBeat));
    });
  }
}
