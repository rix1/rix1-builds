import { Head } from "$fresh/runtime.ts";
import Day from "../components/Day.tsx";
import { schedule } from "../program.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>{schedule.title}</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <div className="px-4 sm:px-6 lg:px-8 mt-8">
          <h1 className="text-2xl font-semibold leading-6 text-gray-900">
            {schedule.title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">Plan for the weekend</p>
          {schedule.days.map((day) => (
            <Day day={day} />
          ))}
        </div>
      </div>
    </>
  );
}
