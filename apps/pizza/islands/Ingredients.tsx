import HelpText from "../components/HelpText.tsx";
import {
  allCombined,
  flourAmount,
  honeyAmount,
  HYDRATION_OPTIONS,
  hydrationIndex,
  SALT_PERCENTAGE,
  saltAmount,
  waterAmount,
  YEAST_GRAMS,
} from "../lib/recipe.ts";
import { cx } from "../lib/stringUtils.ts";

const decimalNumber = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });
const wholeNumber = new Intl.NumberFormat("en", { maximumFractionDigits: 0 });

const Ingredients = () => {
  return (
    <div className="mt-6">
      <fieldset>
        <legend className="mb-2 text-gray-500 text-sm">Select hydration</legend>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6 mb-4">
          {HYDRATION_OPTIONS.map((pair, index) => (
            <label
              key={pair[1]}
              for={pair[1]}
              class={cx(
                "cursor-pointer focus:outline-none",
                "focus:active:ring-2 focus:active:ring-indigo-600 focus:active:ring-offset-2",
                index === hydrationIndex.value
                  ? "bg-[rgb(var(--yellow))] text-[rgb(var(--red))] hover:bg-[rgba(var(--yellow),0.8)]"
                  : " bg-white text-gray-900 hover:bg-gray-50",
                "flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1 ring-2 ring-inset ring-[rgb(var(--gray))]",
              )}
            >
              <input
                onClick={(
                  e,
                ) => (hydrationIndex.value = Number(e.currentTarget.value))}
                aria-labelledby={`flour-option-${index}-label`}
                checked={index === hydrationIndex.value}
                class="sr-only"
                id={pair[1]}
                name="flour-option"
                type="radio"
                value={index}
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
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 tabular-nums">
              {wholeNumber.format(waterAmount.value)}g{" "}
              <span className="text-gray-500">
                ({Math.round((waterAmount.value / flourAmount.value) * 100)}%)
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Flour</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 tabular-nums">
              {wholeNumber.format(flourAmount.value)}g{" "}
              <span className="text-gray-500">(100%)</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Salt</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 tabular-nums">
              {decimalNumber.format(saltAmount.value)}g{" "}
              <span className="text-gray-500">({SALT_PERCENTAGE}%)</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              <HelpText label="Dry yeast">
                <strong className="block">Active or instant?</strong>

                <span className="block mb-2">
                  If the package says "add to dry ingredients", it's instant
                  dried yeast. If the package says that you need to activate it
                  5 minutes in water first, it's active dried yeast.
                </span>

                <span className="block">
                  There's a 1:3 relationship between dry and fresh yeast. 1 gram
                  of dry yeast equates to 3 grams of fresh yeast.
                </span>
              </HelpText>
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 tabular-nums">
              {decimalNumber.format(YEAST_GRAMS)}g{" "}
              <span className="text-gray-500">(Fixed)</span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Honey</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 tabular-nums">
              {decimalNumber.format(honeyAmount.value)}g{" "}
              <span className="text-gray-500"></span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm text-gray-500 italic">In total</dt>
            <dd className="mt-1 text-sm text-gray-500 sm:col-span-2 sm:mt-0 tabular-nums italic">
              {decimalNumber.format(
                allCombined.value / 1000,
              )}
              kg
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Ingredients;
