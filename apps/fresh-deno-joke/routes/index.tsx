/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import Layout from "../components/Layout.tsx";

export default function Home() {
  return (
    <Layout>
      <img
        src="/logo.svg"
        height="100px"
        className="rounded-md bg-red-100"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <h1 className={tw`text-2xl font-bold mt-3`}>👋 Welcome!</h1>
      <p class={tw`my-6`}>
        This site is made with{" "}
        <a
          href="https://fresh.deno.dev/"
          className={tw`underline text-blue-600`}
        >
          fresh
        </a>
        .
      </p>
      <p>
        Add your githubuser to the path to see your profile and a joke. Example{" "}
        <a href="/rix1" className={tw`underline text-blue-600`}>
          /rix1
        </a>
      </p>
      <Counter start={3} />
    </Layout>
  );
}
