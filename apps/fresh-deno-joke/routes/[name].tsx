/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Joke from "../islands/Joke.tsx";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${name}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: User = await resp.json();
    return ctx.render(user);
  },
};

export default function Page({ data }: PageProps<User | null>) {
  if (!data) {
    return <h1>User not found</h1>;
  }

  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src={data.avatar_url}
        width={64}
        height={64}
        className={tw`rounded-full`}
      />
      <h1>{data.name}</h1>
      <p className={tw`mt-4 font-semibold`}>A random joke (try refreshing)</p>
      <Joke />
    </div>
  );
}
