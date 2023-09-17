import { useSignal } from "@preact/signals";
import Controls from "../islands/Controls.tsx";
import RenderBars from "../islands/RenderBars.tsx";

export default function Home() {
  const barCount = useSignal(1);
  const bpm = useSignal(125);
  const currentBeat = useSignal(0);
  const playState = useSignal<"playing" | "paused" | "initial">("initial");

  return (
    <div class="px-4 py-8 mx-auto bg-yellow-300">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold font-rzaLight">
          BSV: The Bar Sheet Visualizer
        </h1>
        <p class="my-4">
          This app let me easily create bar sheets to better understand the
          music I'm listening to.
        </p>
        <Controls
          bars={barCount}
          bpm={bpm}
          playState={playState}
          currentBeat={currentBeat}
        />
        <RenderBars currentBeat={currentBeat} count={barCount} />
      </div>
    </div>
  );
}
