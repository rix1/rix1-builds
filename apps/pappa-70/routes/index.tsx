import { Head } from "$fresh/runtime.ts";
import Day from "../components/Day.tsx";
import { ImageCarousel } from "../islands/ImageCarousel.tsx";
import { schedule } from "../program.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Program Pappa 70 år!</title>
        <meta name="title" content="Program Pappa 70 år!" />
        <meta
          name="description"
          content="I helgen skal det feires minst 4 bursdager, 5 sønner skal løpe om kapp og fattern blir 70 🎉"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Program Pappa 70 år!" />
        <meta
          property="og:description"
          content="I helgen skal det feires minst 4 bursdager, 5 sønner skal løpe om kapp og fattern blir 70 🎉"
        />
        <meta
          property="og:image"
          content="https://family-events.s3.eu-north-1.amazonaws.com/_DSC2642.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Program Pappa 70 år!" />
        <meta
          property="twitter:description"
          content="I helgen skal det feires minst 4 bursdager, 5 sønner skal løpe om kapp og fattern blir 70 🎉"
        />
        <meta
          property="twitter:image"
          content="https://family-events.s3.eu-north-1.amazonaws.com/_DSC2642.jpg"
        />
      </Head>
      <div class="p-4 ml-2 mr-auto max-w-screen-md mb-36">
        <div className="px-4 sm:px-6 lg:px-8 mt-8">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            {schedule.title}
          </h1>
          <p className="mt-2 mb-4 text-sm text-gray-700">
            I helgen skal det feires minst 4 bursdager, 5 sønner skal løpe om
            kapp og fattern blir 70 🎉
          </p>
          <ImageCarousel />
          {schedule.days.map((day) => (
            <Day day={day} />
          ))}
          <div className="mt-8">
            <h2 className="text-lg border-l-4 pl-3 -ml-4 border-[#99f399]">
              <strong>Overnattinger</strong>
            </h2>
            <p className="mb-4 mt-3">
              Lurer du på hvor du eller noen andre skal sove?
            </p>
            <div className="overflow-x-auto sm:overflow-visible">
              <table className="min-w-full divide-y divide-gray-300 sm:table">
                <thead className="sm:table-header-group divide-y divide-gray-300">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Sted
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Torsdag
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Fredag
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Lørdag
                    </th>
                  </tr>
                </thead>
                <tbody className="sm:table-row-group divide-y divide-gray-200">
                  <tr className="sm:table-row">
                    <td className="block sm:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      U47
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Eva, Terje, Sissel
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Arne Martin & Nina
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Eva, Terje, Arne Martin & Nina
                    </td>
                  </tr>
                  <tr className="sm:table-row">
                    <td className="block sm:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      L84
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Martine, Nikko, barna, Arne Martin, Nina
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Danskene
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Danskene, Martine, Nikko og barna
                    </td>
                  </tr>
                  <tr className="sm:table-row">
                    <td className="block sm:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      Lofotgata
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Rikard, Siri, Eddie
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Rikard, Siri, Eddie
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Rikard, Siri, Eddie
                    </td>
                  </tr>
                  <tr className="sm:table-row">
                    <td className="block sm:table-cell whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      Grand Hotel
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      Eva, Terje, Sissel, Lulu, Villi, Martine, Nikko
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
