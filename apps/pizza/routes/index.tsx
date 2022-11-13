import { asset, Head } from "$fresh/runtime.ts";
import FinalMix from "../islands/FinalMix.tsx";
import Ingredients from "../islands/Ingredients.tsx";
import Poolish from "../islands/Poolish.tsx";
import Slider from "../islands/Slider.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizza</title>
        <link rel="stylesheet" href={asset("/global.css")} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-96 h-32 -ml-5 mt-12"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6 font-semibold italic">
          Welcome to Pizza. Here we make pizza.
        </p>
        <Slider />
        <h2 className="text-xl mt-10 font-medium mb-2">Ingredients</h2>
        <Ingredients />
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <h2 className="text-xl mt-10 font-medium mb-1">
              Step 1: Make poolish
            </h2>
            <p className="text-gray-500 mb-2 text-sm">
              The day before, you'll quickly whip together the following
            </p>
            <Poolish />
          </div>
          <div>
            <h2 className="text-xl mt-10 font-medium mb-1">
              Step 2: Final mix
            </h2>
            <p className="text-gray-500 mb-2 text-sm">
              A couple of hours before your pizza party, mix the following
            </p>
            <FinalMix />
          </div>
        </div>
        <h2 className="text-xl mt-20 font-medium mb-2">References</h2>
        <ul>
          <li>
            Vito Iacopelli on YouTube -{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              className="text-blue-700"
              href="https://www.youtube.com/watch?v=G-jPoROGHGE"
            >
              How to Make Perfect Pizza Dough - For the House
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
