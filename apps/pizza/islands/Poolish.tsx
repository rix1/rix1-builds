import { computed } from "@preact/signals";
import { honeyAmount, poolishBase, YEAST_GRAMS } from "../lib/recipe.ts";
import HelpText from "../components/HelpText.tsx";

const number = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

const Poolish = () => {
  return (
    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl className="sm:divide-y sm:divide-gray-200">
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Water</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {number.format(poolishBase.value)}g
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Flour</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {number.format(poolishBase.value)}g
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Dry yeast</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {number.format(YEAST_GRAMS)}g
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
          <dt className="text-sm font-medium text-gray-500">Honey</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {number.format(honeyAmount.value)}g
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default Poolish;
