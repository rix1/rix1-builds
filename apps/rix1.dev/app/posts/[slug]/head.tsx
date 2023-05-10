import { allPosts } from 'contentlayer/generated';

const Head = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) {
    throw new Error(`Post not found for slug: ${params.slug}`);
  }

  return <title>rix1.dev: {post.title}</title>;
};

export default Head;
