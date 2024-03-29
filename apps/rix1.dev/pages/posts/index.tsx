import { allPosts, Post } from 'contentlayer/generated';
import dayjs from 'dayjs';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import Backlink from '../../components/Backlink';
import PagePattern from '../../components/PagePattern';

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) =>
    dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1,
  );
  return { props: { posts } };
}

function PostCard(post: Post) {
  return (
    <div className="mb-6">
      <NextLink href={post.url}>
        <a className="mt-4 block">
          <p className="text-xl font-semibold text-gray-900">{post.title}</p>
          <p className="mt-3 text-base text-gray-500">{post.description}</p>
        </a>
      </NextLink>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <a href={post.url}>
            <span className="sr-only">Rikard Eide</span>
            <Image
              width="40"
              height="40"
              className="h-10 w-10 rounded-full"
              src="https://s3.eu-north-1.amazonaws.com/rix1.dev/first-thursday-450x450.jpg"
              alt=""
              unoptimized
            />
          </a>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">
            <a href={post.url}>@rix1</a>
          </p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime={post.date}>
              {dayjs(post.date).format('MMM DD, YYYY')}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>12 minute read</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <PagePattern>
      <div className="px-4 pt-16 pb-20 font-athelas sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <Head>
          <title>rix1.dev: Thoughts & experiments</title>
        </Head>
        <div className="relative mx-auto max-w-lg divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Thoughts & experiments
            </h1>
            <p className="mt-3 max-w-3xl text-xl text-gray-500 sm:mt-4">
              I write things on all sorts of mediums, some of it get published,
              but most of it doesn&apos;t.{' '}
              <span className="whitespace-nowrap">My hope</span> is that this
              space will see more frequent updates. Until then, here&apos;s what
              I got so far:
            </p>
          </div>
          <div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {posts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-lg lg:max-w-7xl">
          <Backlink href="/">Go back home</Backlink>
        </div>
      </div>
    </PagePattern>
  );
}
