import { Fzf } from "fzf";
import { NextSeo } from "next-seo";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import HighlightChars from "../components/HighlightChars";
import { GoogleLogo, InstagramLogo } from "../components/icons";

import { api } from "../utils/api";
import Image from "next/image";

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="Physical:100 Search contestants"
        description="Easily search Physical:100 (Netflix) contestants without any trackers or ads."
        canonical="https://search-100.rix1.dev"
        openGraph={{
          url: "https://search-100.rix1.dev",
          title: "Physical:100 Search contestants",
          description:
            "Easily search Physical:100 (Netflix) contestants without any trackers or ads.",
          images: [
            {
              url: "https://search-100.rix1.dev/social-open-graph.jpg",
              width: 1200,
              height: 629,
              alt: "Easily search Physical:100 (Netflix) contestants without any trackers or ads.",
              type: "image/jpeg",
            },
            {
              url: "https://search-100.rix1.dev/social-open-graph.jpg",
              width: 1024,
              height: 512,
              alt: "Easily search Physical:100 (Netflix) contestants without any trackers or ads.",
              type: "image/jpeg",
            },
          ],
          siteName: "Physical:100 Search",
        }}
        twitter={{
          handle: "@rix1",
          site: "@rix1",
          cardType: "summary_large_image",
        }}
      />

      <a
        rel="noreferrer"
        target="_blank"
        href="https://github.com/rix1/rix1-builds/tree/main/apps/physical-100"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="absolute right-3 top-3 z-10 h-8 w-8 text-white"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path>
          </g>
        </svg>
      </a>
      <div className="fixed inset-0 bg-black bg-hero-mobile bg-no-repeat md:bg-hero-desktop"></div>
      <main className="relative flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <div className="relative w-full max-w-prose">
            <Image
              unoptimized
              alt="Physical:100 Netflix logo"
              className="w-72"
              width={288}
              height={64}
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
              {!!contestants.length && (
                <ul className="flex w-full max-w-prose flex-col items-center gap-4">
                  {filtered.map(({ item: person, positions }) => (
                    <li
                      className="group/item flex w-full gap-3 rounded-md py-1 px-2 text-2xl tracking-wider text-slate-400"
                      key={person.name}
                    >
                      <span className="relative inline-block">
                        <Image
                          className="h-12 w-12 rounded-md object-cover object-[center_20%]"
                          width={32}
                          height={32}
                          unoptimized
                          src={`/avatars/${person.name
                            .toLowerCase()
                            .replaceAll(" ", "-")}.png`}
                          alt=""
                        />
                      </span>

                      <div className="block">
                        <p className="">
                          <HighlightChars
                            str={person.name}
                            indices={positions}
                          />
                          <a
                            className="ml-2 inline-block rounded-md align-middle leading-[0] text-slate-600 outline-none ring-red-400 focus:ring-2"
                            href={`https://www.google.com/search?q=${person.name.replace(
                              " ",
                              "+"
                            )}+physical+100`}
                          >
                            <GoogleLogo className="h-5 w-5" />
                          </a>
                          {person.instagram && (
                            <a
                              rel="noreferrer"
                              target="_blank"
                              className="ml-1 inline-block rounded-md leading-[0] text-slate-600 outline-none ring-red-400 focus:ring-2"
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
