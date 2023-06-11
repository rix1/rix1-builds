import {
  ChevronDownIcon,
} from "https://esm.sh/@heroicons/react@2.0.18/24/solid";

import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { wine_aroma_list } from "../wine_aromas.ts";

export default function Home() {
  console.log(wine_aroma_list);

  console.log(ChevronDownIcon);

  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 70">
          <path
            d="M 20 5
              Q 30 5, 30 15
              L 30 35
              Q 30 40, 35 45
              L 35 55
              Q 30 55, 25 60
              L 15 60
              Q 10 55, 5 55
              L 5 45
              Q 10 40, 10 35
              L 10 15
              Q 10 5, 20 5
              "
            fill="none"
            stroke="black"
          />
        </svg>

        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                Wine aromas
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of some wine aromas.
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        <a href="#" className="group inline-flex">
                          Aroma
                          <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="w-5 h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </a>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Taste
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {wine_aroma_list.map((aromaDetails) => (
                      <tr key={aromaDetails.aroma}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {aromaDetails.aroma}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {aromaDetails.category}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {aromaDetails.taste}
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">
                              , {aromaDetails.aroma}
                            </span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
