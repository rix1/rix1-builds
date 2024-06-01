import { computed } from "@preact/signals";
import {
  flourAmount,
  honeyAmount,
  poolishBase,
  saltAmount,
  waterAmount,
  YEAST_GRAMS,
} from "../lib/recipe.ts";

const poolishTotal = computed(
  () => poolishBase.value * 2 + YEAST_GRAMS + honeyAmount.value,
);

const number = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

const FinalMix = () => {
  return (
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Water</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {number.format(waterAmount.value - poolishBase.value)}g
          </dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Flour</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {number.format(flourAmount.value - poolishBase.value)}g
          </dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Poolish</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {number.format(poolishTotal.value)}g
          </dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Salt</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {number.format(saltAmount.value)}g
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default FinalMix;
