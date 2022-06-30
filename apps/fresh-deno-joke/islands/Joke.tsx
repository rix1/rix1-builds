/** @jsx h */
import { h } from "preact";
import ky from "https://cdn.skypack.dev/ky?dts";
import { useState, useEffect } from "preact/hooks";
import Layout from "../components/Layout.tsx";

const Joke = () => {
  const [joke, setjoke] = useState();
  useEffect(() => {
    async function getJoke() {
      const response = await ky("joke", { prefixUrl: "/api" }).text();

      setjoke(response);
    }
    getJoke();
  }, [setjoke]);

  if (!joke) {
    return <div>Loading...</div>;
  }
  return <div>{joke}</div>;
};

export default Joke;
