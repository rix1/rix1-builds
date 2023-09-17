import { computed, Signal } from "@preact/signals";
import cls from "../lib/cls.ts";
import { BEATS_PER_BAR } from "../lib/constants.ts";

type BarProps = {
  barNumber: number;
  currentBeat: Signal<number>;
};

const Bar = ({ barNumber, currentBeat }: BarProps) => {
  const beatWithinBar = computed(() => (currentBeat.value - 1) % BEATS_PER_BAR);
  console.log(beatWithinBar.value);

  return (
    <div className="flex w-full">
      {Array.from(
        { length: BEATS_PER_BAR },
        (_, index) => (
          <div
            className={cls(
              "border-1 border-black border h-32 flex-auto -mr-[1px]",
              index === beatWithinBar.value && "bg-pink-400",
            )}
          >
            {index + 1}
          </div>
        ),
      )}
    </div>
  );
};

export default Bar;
