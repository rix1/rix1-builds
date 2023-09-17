import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import Bar from "../components/Bar.tsx";

interface RenderBarsProps {
  count: Signal<number>;
  currentBeat: Signal<number>;
}

export default function RenderBars({ count, currentBeat }: RenderBarsProps) {
  return (
    <div class="flex gap-8 py-6 w-full">
      {Array.from(
        { length: count.value },
        (_, index) => <Bar currentBeat={currentBeat} barNumber={index} />,
      )}
    </div>
  );
}
