import { asset, Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "https://esm.sh/v102/preact@10.11.0/src/index";
import LuxButton from "../islands/LuxButton.tsx";

function Layout(props: { children?: ComponentChildren }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href={asset("/lux-button.css")} />
      </Head>
      {props.children}
    </>
  );
}

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Rix1 | Misc</title>
      </Head>
      <div class="relative font-janson flex-col text-2xl p-4 w-full justify-center flex items-center h-screen border gap-8">
        {/* <div class="absolute inset-0 bg-gradient-to-r  via-red-100 via-[#A5C4AF] to-[#A5C4AF] -z-10" /> */}
        {
          /* <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-tr from-[#D8E1D7] to-[white] h-screen left-0 m-0">
        </div>
        <div className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-b from-blue-300 via-blue-600 to-purple-600 h-screen right-0 m-0">
        </div> */
        }

        {
          /* <h1 class="tracking-wider text-4xl px-6 py-3 bg-white border border-gray-400">
          Van Cleef <small>&</small> Arpels
        </h1> */
        }
        {
          /* <button class="relative tracking-wider text-4xl px-7 py-4 bg-white relative shadow-2xl focus:ring rounded-[4px] focus:ring-yellow-200 focus:outline-none">
          <span className="">Button Label</span>
        </button> */
        }
        <LuxButton />
      </div>
    </Layout>
  );
}
