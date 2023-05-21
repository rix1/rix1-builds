import { asset, Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import DelayClasses from "../islands/DelayClasses.tsx";

function Layout(props: { children?: ComponentChildren }) {
  return (
    <>
      <Head>
        <title>Rix1 | Misc</title>
        <link rel="stylesheet" href={asset("/retro.css")} />
      </Head>
      <div class="text-white font-pressStart">
        {props.children}
      </div>
    </>
  );
}

export default function VintageLogo() {
  return (
    <Layout>
      <DelayClasses classNames="group" delay={3500} />
      <p class="mt-24 text-xs text-white opacity-10">
        Inspired by a{" "}
        <a href="/retro-inspo.mp4" class="underline">video found in a tweet</a>
      </p>
    </Layout>
  );
}
