import { Fzf } from "fzf";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import HighlightChars from "../components/HighlightChars";
import { InstagramLogo } from "../components/icons";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data, isLoading } = api.contestants.getAll.useQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const contestants = data?.people || [];

  const fzf = new Fzf(contestants, {
    selector: (item: (typeof contestants)[0]) => `${item.name} ${item.work}`,
  });

  const filtered = fzf.find(searchQuery);

  return (
    <>
      <Head>
        <title>Physical:100 Search contestants</title>
        <meta
          name="description"
          content="Easily search Physical:100 (Netflix) contestants without any trackers or ads"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed inset-0 bg-black bg-hero-mobile bg-no-repeat md:bg-hero-desktop"></div>
      <main className="relative flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <div className="relative w-full max-w-prose">
            <img
              className="w-72"
              src="https://occ-0-606-41.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABVHzR4OU3FIiCMxVn94Tl-RkOQ0pCQJqfkQ6fM35FMS8EmWmUzPYWnoToAVvy967GuAWyuKjhDpwIo1R0S2PwwOdv2jJroEKgARKwgDQkbyJVPNsQfsfCAuhmW-RHNxxjnK19glS1SU5IiksQAjXfz4cw658CHir1mDlU-GyPAYGZ11dEj1QFA.png?r=540"
            />
            <h1 className="text-7xl font-extrabold tracking-tight text-white">
              Search <span className="text-red-500">contestants</span>
            </h1>
          </div>
          <div className="rounded-m w-full max-w-prose font-light">
            <label htmlFor="search" className="sr-only">
              Quick search
            </label>
            <div className="relative mt-1 mb-12">
              <input
                type="text"
                name="search"
                placeholder="Search name or background"
                id="search"
                onChange={(ev) => setSearchQuery(ev.currentTarget.value)}
                className="block w-full rounded-md border-gray-300 pr-12 text-2xl shadow-sm placeholder:text-slate-300 focus:border-red-500 focus:ring-red-500"
              />
              {/* <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
                  ⌘K
                </kbd>
              </div> */}
              <p className="mt-2 font-normal text-white/80 md:text-slate-400">
                Results: {filtered.length}
              </p>
            </div>
            <div className="rounded-md bg-slate-800/90 p-4">
              {isLoading && (
                <ul className="flex w-full max-w-prose flex-col gap-4">
                  <li className="block h-10 w-full animate-pulse rounded-md bg-slate-400/20"></li>
                  <li className="block h-10 w-full animate-pulse rounded-md bg-slate-400/20"></li>
                  <li className="block h-10 w-full animate-pulse rounded-md bg-slate-400/10"></li>
                  <li className="block h-10 w-full animate-pulse rounded-md bg-slate-400/5"></li>
                </ul>
              )}
              {contestants.length && (
                <ul className="flex w-full max-w-prose flex-col items-center gap-4">
                  {filtered.map(({ item: person, positions }) => (
                    <li
                      className="group/item flex w-full gap-3 rounded-md py-1 px-2 text-2xl tracking-wider text-slate-400"
                      key={person.name}
                    >
                      <div className="mt-1 h-8 w-8 rounded-md bg-slate-700" />

                      <div className="block">
                        <p>
                          <HighlightChars
                            str={person.name}
                            indices={positions}
                          />{" "}
                          {person.instagram && (
                            <a
                              rel="noreferrer"
                              target="_blank"
                              className="inline-block rounded-md leading-none outline-none ring-red-400 focus:ring-2"
                              href={`https://instagram.com/${person.instagram.replace(
                                "@",
                                ""
                              )}`}
                              title={person.instagram}
                            >
                              <InstagramLogo className="inline-block" />
                            </a>
                          )}
                        </p>
                        <small className="block text-xs">
                          <HighlightChars
                            str={person.work}
                            indices={positions}
                            startAt={person.name.length + 1}
                          />
                        </small>
                      </div>
                      {/* <div className="invisible mt-1 ml-auto group-hover/item:visible">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      </div> */}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
