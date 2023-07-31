import { asset, Head } from "$fresh/runtime.ts";
import { ComponentChild } from "preact";
import SEO from "../components/SEO.tsx";
import FinalMix from "../islands/FinalMix.tsx";
import Ingredients from "../islands/Ingredients.tsx";
import Notes from "../islands/Notes.tsx";
import Poolish from "../islands/Poolish.tsx";
import Slider from "../islands/Slider.tsx";
import HelpText from "../components/HelpText.tsx";
import PoolishHeading from "../islands/PoolishHeading.tsx";

const Ref = (
  { children, href }: { children: ComponentChild; href: string },
) => (
  <a
    target="_blank"
    rel="noreferrer noopener"
    className="text-blue-700"
    href={href}
  >
    {children}
  </a>
);

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
            <PoolishHeading />
            <p className="text-gray-500 mb-2 text-sm">
              The day before, you'll quickly whip together the following:
            </p>
            <Poolish />
          </div>
          <div>
            <h2 className="text-xl mt-10 font-medium mb-2">
              Step 2: Final mix
            </h2>
            <p className="text-gray-500 mb-2 text-sm">
              A couple of hours before your pizza party, mix the following:
            </p>
            <FinalMix />
          </div>
        </div>
        <div>
          <h2 className="text-xl mt-10 font-medium mb-2">
            Instructions & Notes
          </h2>
          <Notes />
        </div>

        <h2 className="text-xl mt-20 font-medium mb-2">References</h2>
        <p className="mb-4">
          This site is most useful to calculate amounts, but the technique,
          temperature and timing is important. I'll add good references here as
          I go.
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <Ref href="https://g.co/kgs/7ewUv5">
              Flour Water Salt Yeast: The Fundamentals of Artisan Bread and
              Pizza
            </Ref>{" "}
            by Ken Forkish (book)
            <ul className="list-decimal pl-5 space-y-1">
              <li id="ref-ken-page-28-temperature">
                Temperature, page 26-28
              </li>
              <li id="ref-ken-page-33-autolyse">
                Autolyse, page 33-34
              </li>
              <li id="ref-ken-forkish-folding">
                Folding, page 69
              </li>
              <li id="ref-ken-page-74-finger-dent-test">
                Finger dent test, page 74
              </li>
            </ul>
          </li>
          <li id="ref-richard-bertinet">
            Bookmarks from Gluten Morgen TV with Richard Bertinet on YouTube
            <ol className="list-decimal pl-5 space-y-1">
              <li id="ref-richard-bertinet-mix-ingredients">
                <Ref href="https://youtu.be/bWN9mxR_iXI?t=421">
                  "Mix ingredients"
                </Ref>
              </li>
              <li id="ref-richard-bertinet-slap-and-fold">
                <Ref href="https://youtu.be/bWN9mxR_iXI?t=568">
                  "Slap & fold kneading"
                </Ref>
              </li>
              <li id="ref-richard-bertinet-walking-the-dog">
                <Ref href="https://youtu.be/bWN9mxR_iXI?t=665">
                  "Walking the dog"
                </Ref>
              </li>
              <li id="ref-richard-bertinet-two sides">
                <Ref href="https://youtu.be/bWN9mxR_iXI?t=682">
                  "Top on top" - The two sides of the dough
                </Ref>
              </li>
            </ol>
          </li>
          <li>
            Vito Iacopelli on YouTube{" "}
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <Ref href="https://www.YouTube.com/watch?v=G-jPoROGHGE">
                  How to Make Perfect Pizza Dough - For the House
                </Ref>
              </li>
              <li>
                <Ref href="https://www.YouTube.com/watch?v=b8VQUAx0WFU">
                  Best Way to Develop the Gluten in Pizza Dough
                </Ref>
              </li>
            </ul>
          </li>

          <li id="ref-pull-dough-along-the-counter">
            <Ref href="https://youtu.be/vEG1BjWroT0?t=252">
              High Hydration dough Shaping
            </Ref>{" "}
            - San Francisco Baking Institute on Youtube
          </li>

          <li id="ref-test-poolish">
            <Ref href="https://youtu.be/w-5B7vsHcok?t=463">
              How to test poolish
            </Ref>{" "}
            - Novita Listyani on YouTube
          </li>
          <li>
            My Pizza Corner
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <Ref href="https://mypizzacorner.com/pizza-dough-calculator/">
                  Pizza Dough Calculator
                </Ref>. I unfortunately I came across this <i>after</i>{" "}
                building this site. Looks like a really good resource.
              </li>
              <li>
                <Ref href="https://mypizzacorner.com/pizza-tips/pizza-dough-problems/">
                  How to fix pizza dough that won’t stretch
                </Ref>
              </li>
            </ul>
          </li>
          <li>
            <Ref href="https://www.godt.no/oppskrifter/pizza/2449/pizzadeig-jan-vardoeens-pizzabunn">
              Jan Vardøens pizzabunn
            </Ref>{" "}
            at Godt.no (Norwegian)
          </li>
        </ol>
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
