import { slider, SLIDER_MAX, SLIDER_MIN } from "../lib/recipe.ts";

const Slider = () => {
  return (
    <label
      htmlFor="pizza-slider"
      className="max-w-lg block mt-4 text-gray-500 text-sm"
    >
      Adjust number of 260g pies (<output>{slider.value}</output>){" "}
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
