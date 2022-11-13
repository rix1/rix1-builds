import { computed } from "@preact/signals";
import { HONEY_GRAMS, YEAST_GRAMS } from "./Poolish.tsx";
import { slider } from "./Slider.tsx";

const WATER_GRAMS = 100; // per pizza
const FLOUR_MULTIPLIER = 1.55;
const SALT_MULTIPLIER = 0.0256;

export const water = computed(() => slider.value * WATER_GRAMS);
export const flour = computed(() => water.value * FLOUR_MULTIPLIER);
export const salt = computed(() => flour.value * SALT_MULTIPLIER);

const number = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

const Ingredients = () => {
  return (
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
            <span className="text-gray-500">({SALT_MULTIPLIER * 100}%)</span>
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
  );
};

export default Ingredients;
