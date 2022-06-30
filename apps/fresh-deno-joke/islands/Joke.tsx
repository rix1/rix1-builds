import ky from "https://cdn.skypack.dev/ky?dts";
import { useState, useEffect } from "preact/hooks";

const Joke = () => {
  const [joke, setjoke] = useState();
  useEffect(() => {
    async function getJoke() {
      const response = await ky("joke", { prefixUrl: "/api" }).text();
      console.log(response);

      setjoke(response);
    }
    getJoke();
  }, [setjoke]);

  if (!joke) {
    return "Loading...";
  }
  return joke;
};

export default Joke;
