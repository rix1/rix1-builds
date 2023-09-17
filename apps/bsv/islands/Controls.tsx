import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect, useState } from "preact/hooks";
import cls from "../lib/cls.ts";

interface ControlsProps {
  bars: Signal<number>;
  playState: Signal<"playing" | "paused" | "initial">;
  bpm: Signal<number>;
  currentBeat: Signal<number>;
}

export default function Controls(props: ControlsProps) {
  const [modifier, setModifier] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.shiftKey) {
        setModifier(9);
      } else {
        setModifier(0);
      }
    });
  }, []);

  useEffect(() => {
    let interval = 0;
    const TIME_PER_BEAT = 60000 / props.bpm.value; // Time per beat in ms

    if (props.playState.value === "playing") {
      setStartTime(Date.now() - props.currentBeat.value * TIME_PER_BEAT); // Reset the start time based on current beat
      interval = setInterval(() => {
        const elapsedTime = Date.now() - (startTime || 0);
        const beat = Math.floor(elapsedTime / TIME_PER_BEAT) + 1;
        props.currentBeat.value = beat;
      }, 50); // Update more frequently than a beat for smoother UI
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [props.playState.value]);

  return (
    <div className="flex gap-6">
      <div class="flex py-6 items-center">
        <p class="text-3xl mr-4">Bars: {props.bars}</p>
        <Button
          class="px-2 py-1  rounded-l"
          onClick={() => props.bars.value -= 1}
        >
          -
        </Button>
        <Button
          class="px-2 py-1  rounded-r -ml-[1px]"
          onClick={() => props.bars.value += 1}
        >
          +
        </Button>
      </div>
      <div class="flex py-6 items-center">
        <p class="text-3xl mr-4">BPM: {props.bpm}</p>
        <div className="flex flex-col">
          <Button
            class="px-2 rounded-t"
            onClick={() => props.bpm.value += 1 + modifier}
          >
            +
          </Button>
          <Button
            class="px-2 rounded-b"
            onClick={() => props.bpm.value -= 1 + modifier}
          >
            -
          </Button>
        </div>
      </div>
      <div class="flex py-6 items-center">
        <p class="text-3xl mr-4">Play</p>
        <Button
          class={cls(
            "px-2 rounded-l",
            props.playState.value === "playing" && "bg-gray-300",
          )}
          onClick={() => props.playState.value = "playing"}
        >
          ▶︎
        </Button>
        <Button
          class={cls(
            "px-2",
            props.playState.value === "paused" && "bg-gray-300",
          )}
          onClick={() => props.playState.value = "paused"}
        >
          ⏸
        </Button>
        <Button
          class={cls(
            "px-2 rounded-r",
          )}
          onClick={() => {
            props.playState.value = "initial";
            setStartTime(0);
            props.currentBeat.value = 0;
          }}
        >
          <small>reset</small>
        </Button>
      </div>
    </div>
  );
}
