import { useState } from "preact/hooks";
import { pieSize, slider, SLIDER_MAX, SLIDER_MIN } from "../lib/recipe.ts";

const PieSize = () => {
  const [isLocked, setIsLocked] = useState(true);

  if (isLocked) {
    return (
      <span className="tabular-nums" onClick={() => setIsLocked(false)}>
        {pieSize.value}g
      </span>
    );
  }
  return (
    <>
      <input
        value={pieSize.value}
        className="max-w-[48px] focus:bg-gray-50 mr-1"
        onChange={(e) => pieSize.value = Number(e.currentTarget.value)}
        onBlur={() => setIsLocked(true)}
        type="number"
      />g
    </>
  );
};

const Slider = () => {
  return (
    <label
      htmlFor="pizza-slider"
      className="max-w-lg block mt-4 text-gray-500 text-sm"
    >
      Adjust number of pies (<output>{slider.value}</output> x <PieSize />){" "}
      <input
        name="pizza-slider"
        id="pizza-slider"
        type="range"
        className="block mt-2 w-full"
        value={slider.value}
        style={{
          backgroundSize: `${
            ((slider.value - SLIDER_MIN) * 100) / (SLIDER_MAX - SLIDER_MIN)
          }% 100%`,
        }}
        min={SLIDER_MIN}
        max={SLIDER_MAX}
        onInput={(e) => (slider.value = Number(e.currentTarget.value))}
      />
    </label>
  );
};

export default Slider;
