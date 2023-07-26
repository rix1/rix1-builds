import { asset, Head } from "$fresh/runtime.ts";
import SEO from "../components/SEO.tsx";
import FinalMix from "../islands/FinalMix.tsx";
import Ingredients from "../islands/Ingredients.tsx";
import Poolish from "../islands/Poolish.tsx";
import Slider from "../islands/Slider.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <SEO
          title="Pizza slider, a service by and for @rix1"
          description="You don't have to be an expert to make great pizza. Slide away and get accurate ingredient measures instantly."
          keywords={[
            "pizza",
            "ingredients",
            "recipe",
            "easy",
            "blazingly",
            "fast",
          ]}
          siteUrl="https://pizza.rix1.dev"
          image={{ src: "/social-card.png" }}
        />
        <link rel="stylesheet" href={asset("/global.css")} />
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <img
          src="/logo.svg"
          class="w-96 h-32 -ml-5 mt-12"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="mt-4 text-xl">Welcome to Pizza. Here we make pizza.</h1>
        <Slider />
        <Ingredients />
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <h2 className="text-xl mt-10 font-medium mb-1">
              Step 1: Make{" "}
              <span
                className="help"
                title="Poolish is a highly fluid yeast-cultured dough. It's a type of pre-ferment traditionally used in the production of French bakery products."
              >
                poolish
              </span>
            </h2>
            <p className="text-gray-500 mb-2 text-sm">
              The day before, you'll quickly whip together the following:
            </p>
            <Poolish />
          </div>
          <div>
            <h2 className="text-xl mt-10 font-medium mb-1">
              Step 2: Final mix
            </h2>
            <p className="text-gray-500 mb-2 text-sm">
              A couple of hours before your pizza party, mix the following:
            </p>
            <FinalMix />
          </div>
        </div>
        <div>
          <h2 className="text-xl mt-10 font-medium mb-1">
            Notes
          </h2>
          <p className="text-gray-500 mb-2 text-sm">
            A couple of hours before your pizza party, mix the following:
          </p>
        </div>

        <h2 className="text-xl mt-20 font-medium mb-2">References</h2>
        <p className="mb-4">
          This site will only show you amounts, but the technique and timing is
          important. I'll add good references here as I go.
        </p>
        <ul className="list-disc pl-5">
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

      <footer className="max-w-screen-md my-6 text-gray-500 mx-auto px-4">
        <p>
          Built with{" "}
          <a
            href="https://fresh.deno.dev/"
            target="_blank"
            className="text-underline"
          >
            Fresh
          </a>{" "}
          in November 2022 by{" "}
          <a href="https://rix1.dev" className="text-underline">
            @rix1
          </a>
        </p>
      </footer>
    </>
  );
}
