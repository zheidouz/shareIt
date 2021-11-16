import { graphCms } from '../lib/graphCms';
import Head from 'next/head';

import Post from '../components/Post';


const index = ({posts}) => {
  return (
    <>
      <Head>
        <title>shareIt. | Welcome to shareIt</title>
      </Head>
      <div className="container">
        <div className="main">
          {
            posts.reverse().map(post => <Post key={post.slug} post={post}/>)
          }
        </div>
      </div>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const {posts} = await graphCms.request(`
    {
      posts {
        title
        slug
        thumbnail {
          url
        }
        categories {
          name
          color {
            css
          }
        }
      }
    }
  `);

  return {
    props: {
      posts
    },
    revalidate: 10
  };
}