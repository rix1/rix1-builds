import { allPosts, Post } from 'contentlayer/generated';
import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Backlink from '../../components/Backlink';
import PagePattern from '../../components/PagePattern';

type Params = { slug: string };
type Props = {
  post?: Post; // for some reason this have to be nullable
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params || !params.slug) return { notFound: true };
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return {
    props: {
      post,
    },
  };
};

const PostLayout: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <PagePattern>
      <Head>
        <title>rix1.dev: {post.title}</title>
      </Head>
      <div className="py-16 px-4 font-athelas sm:px-6 lg:px-8 xl:py-36">
        <div className="mx-auto max-w-max lg:max-w-7xl">
          <div className="relative z-10 mb-8 md:mb-2 md:px-6">
            <div className="max-w-prose text-base lg:max-w-none">
              <span className="font-semibold uppercase leading-6 tracking-wide text-indigo-600">
                {post.topic}
              </span>
              {post.topic && (
                <span className="mx-2" aria-hidden="true">
                  &middot;
                </span>
              )}
              <time dateTime={post.date} className="text-sm text-slate-600">
                {dayjs(post.date).format('ddd DD MMM, YYYY')}
              </time>
              <h1 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                {post.title}
              </h1>
            </div>
          </div>
          <div className="relative">
            <div className="relative md:bg-white md:p-6">
              <div
                className="prose prose-lg prose-indigo text-gray-500"
                dangerouslySetInnerHTML={{ __html: post.body.html }}
              />
              <div className="mt-5 inline-flex">
                <Backlink href="/posts">Read more thoughts</Backlink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PagePattern>
  );
};

export default PostLayout;
