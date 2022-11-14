import { signal } from "@preact/signals";

export const slider = signal(8);

const MIN = 4;
const MAX = 30;

const Slider = () => {
  return (
    <label htmlFor="pizza-slider" className="max-w-lg block">
      Adjust number of pies: <output>{slider.value}</output>{" "}
      <span className="text-gray-500">(~260g each)</span>
      <input
        name="pizza-slider"
        id="pizza-slider"
        type="range"
        className="block mt-2 w-full"
        value={slider.value}
        style={{
          backgroundSize: `${((slider.value - MIN) * 100) / (MAX - MIN)}% 100%`,
        }}
        min={MIN}
        max={MAX}
        onInput={(e) => slider.value = Number(e.currentTarget.value)}
      />
    </label>
  );
};

export default Slider;