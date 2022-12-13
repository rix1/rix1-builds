import { signal } from "@preact/signals";
import { useEffect, useRef, useState } from "preact/hooks";

import { useMouseDown, useMousePosition } from "../hooks/useMousePosition.ts";
import useSpring from "../hooks/useSpring.ts";
import { rubberbandIfOutOfBounds } from "../lib/rubber-maths.ts";

export const slider = signal(8);
const knobOffset = signal(0);

const MIN = 4;
const MAX = 30;

function getTransform(x: number, xReference: number) {
  const pos = rubberbandIfOutOfBounds(x, xReference - 30, xReference + 30);
  return pos - xReference;
}

const Slider = () => {
  const sliderRef = useRef(null);
  const [isNearBounds, setIsNearBounds] = useState<boolean>(false);
  const [xReference, setXReference] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useMouseDown(sliderRef, () => {
    console.log("isDragging: true");

    setIsDragging(true);
  });
  const { x } = useMousePosition();
  const springAnimation = useSpring(
    knobOffset,
  );

  useEffect(() => {
    if (!isDragging) {
      // setXReference(x);
      springAnimation.current?.updateConfig({ fromValue: knobOffset.value });
      springAnimation.current?.start();
      // start animation if isNearBounds
    }
    console.log(springAnimation.current?.stop);

    if (isDragging && springAnimation.current?.isAnimating) {
      console.log("should stop animation");

      springAnimation.current.updateConfig({ fromValue: 0 });
      springAnimation.current.stop();
    }
  }, [isDragging, setXReference, x]);

  if (isDragging && isNearBounds) {
    knobOffset.value = getTransform(x, xReference);
  }

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
        onMouseUp={() => {
          console.log("isDragging: false");
          setIsDragging(false);
        }}
        onInput={(e) => {
          const val = Number(e.currentTarget.value);

          if (val === MAX || val === MIN) {
            setIsNearBounds(true);
            setXReference(x);
          } else {
            setIsNearBounds(false);
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
