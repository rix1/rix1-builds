import { useState } from "preact/hooks";
import {
  pieSize,
  slider,
  SLIDER_DEFAULT,
  SLIDER_MAX,
  SLIDER_MIN,
} from "../lib/recipe.ts";

const PieSize = () => {
  const [isLocked, setIsLocked] = useState(true);

  if (isLocked) {
    return (
      <span className="tabular-nums" onClick={() => setIsLocked(false)}>
        {pieSize.value}g{" "}
        <button type="button" onClick={() => setIsLocked(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 inline-block -mt-1 "
          >
            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
          </svg>
        </button>
      </span>
    );
  }
  return (
    <>
      <input
        value={pieSize.value}
        className="max-w-[48px] focus:bg-gray-50 mr-1 border-b-2 "
        onChange={(e) => pieSize.value = Number(e.currentTarget.value)}
        onBlur={() => setIsLocked(true)}
        type="number"
      />g{" "}
      <button type="button" onClick={() => setIsLocked(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 inline-block -mt-1 text-green-700"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  );
};

/**
 * WEBKIT_OFFSET_HELPER
 * Webkit browsers (Safari, Chrome) have built in validation that don't allow
 * you to submit a form if an <input type="range" />'s value is larger than the
 * max value specified on the element. The problem however, is that they are bad
 * at comparing decimal numbers. So even if value=5.00000001 and max=5.00000001
 * are equal, they're not able to figure that out... So we're helping them a bit
 * by ensuring that the value can never be _too_ close to the max value.
 */
const WEBKIT_OFFSET_HELPER = 0.001;

/**
 * Clamping the value with Math.min() to ensure it's never larger than max
 * adjusted for decimal issues in webkit (see comment above).
 */
export function clamp(value: number, max: number): number {
  return Math.min(value, max - WEBKIT_OFFSET_HELPER);
}

function logaritmicToLinear(value: number): number {
  return Math.round(Math.exp(value));
}
const Slider = () => {
  const min = Math.log(SLIDER_MIN);
  const max = Math.log(SLIDER_MAX);
  const initial = Math.log(SLIDER_DEFAULT);

  const [val, setVal] = useState(initial);

  return (
    <label
      htmlFor="pizza-slider"
      className="max-w-lg block mt-4 text-gray-500 text-sm"
    >
      Adjust number of pies: <output>{slider.value}</output> x <PieSize />
      <input
        name="pizza-slider"
        id="pizza-slider"
        type="range"
        step="any"
        className="block mt-2 w-full"
        value={val}
        style={{
          backgroundSize: `${
            ((val - Math.log(SLIDER_MIN)) * 100) /
            (Math.log(SLIDER_MAX) - Math.log(SLIDER_MIN))
          }% 100%`,
        }}
        min={min}
        max={max}
        onInput={(e) => {
          const newVal = clamp(Number(e.currentTarget.value), max);
          setVal(newVal);
          slider.value = logaritmicToLinear(newVal);
        }}
      />
    </label>
  );
};

export default Slider;
