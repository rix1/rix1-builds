import { signal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";

import { useMouseDown, useMousePosition } from "../hooks/useMousePosition.ts";
import useSpring from "../hooks/useSpring.ts";
import { rubberbandIfOutOfBounds } from "../lib/rubber-maths.ts";

export const slider = signal(8);
const knobOffset = signal(0);

const MIN = 4;
const MAX = 30;

enum Location {
  LEFT = 0,
  RIGHT = 1,
  MIDDLE = 2,
}

function getTransform(x: number, xReference: number) {
  const pos = rubberbandIfOutOfBounds(x, xReference - 40, xReference);
  return pos - xReference;
}

const Slider = () => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [knobLocation, setKnobLocation] = useState<Location>(Location.MIDDLE);
  const [sliderXbounds, setSliderXbounds] = useState([0, 0]);

  const isDragging = useMouseDown(sliderRef);
  const { x, y } = useMousePosition();
  const springAnimation = useSpring(
    knobOffset,
    () => {
      // set;
    },
  );

  useEffect(() => {
    const { left = 0, right = 0 } =
      sliderRef.current?.getBoundingClientRect() || {};
    setSliderXbounds([left, right]);
  }, []);

  useEffect(() => {
    if (!isDragging) {
      springAnimation.current?.updateConfig({ fromValue: knobOffset.value });
      springAnimation.current?.start();
    }
  }, [isDragging]);

  if (isDragging && knobLocation) {
    knobOffset.value = getTransform(x, sliderXbounds[knobLocation]);
  }
  //  else {
  //   knobOffset.value = 0;
  // }

  // const xPos = isDragging ? currentKnobPos : animationValue.value;

  return (
    <label
      htmlFor="pizza-slider"
      className="max-w-lg block font-semibold italic mt-0"
    >
      Adjust number of pies: <output>{slider.value}</output>
      <input
        ref={sliderRef}
        name="pizza-slider"
        id="pizza-slider"
        type="range"
        className="block mt-4 w-full"
        value={slider.value}
        style={{
          backgroundSize: `${((slider.value - MIN) * 100) / (MAX - MIN)}% 100%`,
          "--thumb-transform": `${knobOffset.value}px`,
        }}
        min={MIN}
        max={MAX}
        onInput={(e) => {
          const val = Number(e.currentTarget.value);

          if (val === MAX) {
            setKnobLocation(Location.RIGHT);
          } else if (val === MIN) {
            setKnobLocation(Location.LEFT);
          } else {
            setKnobLocation(Location.MIDDLE);
          }
          slider.value = val;
        }}
      />
      <span className="text-gray-500 font-normal text-sm mt-2 block">
        ~260g each
      </span>
    </label>
  );
};

export default Slider;
