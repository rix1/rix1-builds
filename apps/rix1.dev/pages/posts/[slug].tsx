import PagePattern from 'components/PagePattern';
import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';
import Head from 'next/head';
import Link from 'next/link';
import ArrowLeft from '@geist-ui/icons/arrowLeft';
import Backlink from 'components/Backlink';

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return {
    props: {
      post,
    },
  };
}

const PostLayout = ({ post }) => {
  return (
    <PagePattern>
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
              {/* <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="prose prose-lg prose-indigo text-gray-500 lg:max-w-none">
                  <p>
                    Ultrices ultricies a in odio consequat egestas rutrum. Ut
                    vitae aliquam in ipsum. Duis nullam placerat cursus risus
                    ultrices nisi, vitae tellus in. Qui non fugiat aut minus aut
                    rerum. Perspiciatis iusto mollitia iste minima soluta id.
                  </p>
                  <p>
                    Erat pellentesque dictumst ligula porttitor risus eget et
                    eget. Ultricies tellus felis id dignissim eget. Est augue{' '}
                    <a href="#">maecenas</a> risus nulla ultrices congue nunc
                    tortor. Eu leo risus porta integer suspendisse sed sit
                    ligula elit.
                  </p>
                  <ol role="list">
                    <li>
                      Integer varius imperdiet sed interdum felis cras in nec
                      nunc.
                    </li>
                    <li>
                      Quam malesuada odio ut sit egestas. Elementum at porta
                      vitae.
                    </li>
                  </ol>
                  <p>
                    Amet, eu nulla id molestie quis tortor. Auctor erat justo,
                    sed pellentesque scelerisque interdum blandit lectus. Nec
                    viverra amet ac facilisis vestibulum. Vestibulum purus nibh
                    ac ultricies congue.
                  </p>
                </div>
                <div className="prose prose-lg prose-indigo mt-6 text-gray-500 lg:mt-0">
                  <p>
                    Erat pellentesque dictumst ligula porttitor risus eget et
                    eget. Ultricies tellus felis id dignissim eget. Est augue
                    maecenas risus nulla ultrices congue nunc tortor.
                  </p>
                  <p>
                    Eu leo risus porta integer suspendisse sed sit ligula elit.
                    Elit egestas lacinia sagittis pellentesque neque dignissim
                    vulputate sodales. Diam sed mauris felis risus, ultricies
                    mauris netus tincidunt. Mauris sit eu ac tellus nibh non
                    eget sed accumsan. Viverra ac sed venenatis pulvinar elit.
                    Cras diam quis tincidunt lectus. Non mi vitae, scelerisque
                    felis nisi, netus amet nisl.
                  </p>
                  <p>
                    Eu eu mauris bibendum scelerisque adipiscing et. Justo,
                    elementum consectetur morbi eros, posuere ipsum tortor. Eget
                    cursus massa sed velit feugiat sed ut. Faucibus eros mauris
                    morbi aliquam nullam. Scelerisque elementum sit magna
                    ullamcorper dignissim pretium.
                  </p>
                </div>
              </div> */}
              <div className="mt-5 inline-flex">
                <Backlink href="/posts">Read more thoughts</Backlink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PagePattern>
  );

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className="prose prose-xl mx-auto max-w-2xl py-16 font-athelas">
        <div className="mb-6 text-center">
          <Link href="/">
            <a className="text-center text-sm font-bold uppercase text-blue-700">
              Home
            </a>
          </Link>
        </div>
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
          <time dateTime={post.date} className="text-sm text-slate-600">
            {dayjs(post.date).format('ddd DD MMM, YYYY')}
          </time>
        </div>
        <div
          className="cl-post-body"
          dangerouslySetInnerHTML={{ __html: post.body.html }}
        />
      </article>
    </>
  );
};

export default PostLayout;
