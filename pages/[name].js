import { graphCms } from '../lib/graphCms';
import Head from 'next/head';

import Post from '../components/Post';


const CategoryPage = ({posts}) => {


  return (
    <div className="container">
      <Head>
        <title>shareIt. | {posts[0].categories[0].name}</title>
      </Head>
      <div className="main">
        {
          posts.reverse().map((post) => <Post key={post.slug} post={post}/>)
        }
      </div>
    </div>

  );
};

export default CategoryPage;

export async function getStaticPaths() {
  const {categories} = await graphCms.request(`
      {
        categories{
          name
        }
      }
  `);
  const paths = categories.map(({name}) => ({params: {name}}));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({params}) {
  const {posts} = await graphCms.request(`
  query MyQuery ($name:String!) {
    posts(where: {categories_every: {name: $name}}){
      title
      slug
      thumbnail{
        url
      }
      categories{
        name
        color{
          css
        }
      }
    }
  }
  `, {name: params.name});

  return {
    props: {
      posts,
      revalidate: 10
    }
  };
}