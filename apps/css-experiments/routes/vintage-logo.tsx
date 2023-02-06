import { asset, Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import DelayClasses from "../islands/DelayClasses.tsx";

function Layout(props: { children?: ComponentChildren }) {
  return (
    <>
      <Head>
        <title>Rix1 | Misc</title>
        <link rel="stylesheet" href={asset("/vintage-logo.css")} />
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
    </Layout>
  );
}
