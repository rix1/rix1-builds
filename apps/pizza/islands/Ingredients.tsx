import { computed, signal } from "@preact/signals";
import { HONEY_GRAMS, YEAST_GRAMS } from "./Poolish.tsx";
import { slider } from "./Slider.tsx";

const WATER_GRAMS = 100; // per pizza
const FLOUR_MULTIPLIER = [
  [1.555, "64%"],
  [1.465, "68%"],
  [1.425, "70%"],
  [1.325, "75%"],
];
const hydrationIndex = signal(1);
const SALT_PERCENTAGE = 2.56;

export const water = computed(() => slider.value * WATER_GRAMS);
export const flour = computed(
  () => water.value * FLOUR_MULTIPLIER[hydrationIndex.value][0]
);
export const salt = computed(() => flour.value * (SALT_PERCENTAGE / 100));

const number = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Ingredients = () => {
  return (
    <div className="mt-6">
      <fieldset>
        <legend className="mb-2">Select hydration</legend>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6 mb-4">
          {FLOUR_MULTIPLIER.map((pair, index) => (
            <label
              key={pair[1]}
              for={pair[1]}
              class={cx(
                "cursor-pointer focus:outline-none",
                "focus:active:ring-2 focus:active:ring-indigo-600 focus:active:ring-offset-2",
                index === hydrationIndex.value
                  ? "bg-[rgb(var(--yellow))] text-[rgb(var(--red))] hover:bg-[rgba(var(--yellow),0.8)]"
                  : " bg-white text-gray-900 hover:bg-gray-50",
                "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 ring-2 ring-inset ring-[rgb(var(--gray))]"
              )}
            >
              <input
                onclick={(e) =>
                  (hydrationIndex.value = Number(e.currentTarget.value))
                }
                type="radio"
                id={pair[1]}
                name="flour"
                value={index}
                type="radio"
                name="flour-option"
                checked={index === hydrationIndex.value}
                class="sr-only"
                aria-labelledby={`flour-option-${index}-label`}
              />
              <span id={`flour-option-${index}-label`}>{pair[1]}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <h2 className="text-xl mt-4 font-medium mb-2">Ingredients</h2>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Water</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {number.format(water.value)}g{" "}
              <span className="text-gray-500">
                ({Math.round((water.value / flour.value) * 100)}%)
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Flour</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {number.format(flour.value)}g{" "}
              <span className="text-gray-500">(100%)</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Salt</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {number.format(salt.value)}g{" "}
              <span className="text-gray-500">({SALT_PERCENTAGE}%)</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Dry yeast</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {number.format(YEAST_GRAMS)}g{" "}
              <span className="text-gray-500">(Fixed)</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Honey</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {number.format(HONEY_GRAMS)}g{" "}
              <span className="text-gray-500">(Fixed)</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Ingredients;
