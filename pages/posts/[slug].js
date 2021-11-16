import { graphCms } from '../../lib/graphCms';
import Style from '../../styles/Singlepost.module.css';
import { format } from 'date-fns';
import Head from 'next/head';


const singlePost = ({post}) => {
  const {title, createdAt, content} = post;

  return (
    <div className="container">
      <Head>
        <title>shareIt. | {title}</title>
      </Head>
      <div className={Style.single_post}>
        <h1 className={Style.title}>{title}</h1>
        <h3 className={Style.date}>{format(new Date(createdAt), 'EEEE, dd LLLL yyyy')}</h3>
        <div dangerouslySetInnerHTML={{__html: content.html}} className={Style.formatter}/>
      </div>
    </div>
  );
};

export default singlePost;

export async function getStaticPaths() {
  const {posts} = await graphCms.request(`
    {
      posts{
        slug
      }
    }
  `);
  const paths = posts.map(({slug}) => ({params: {slug}}));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({params}) {
  const {post} = await graphCms.request(`
      query SinglePost($slug:String!){
        post(where: {slug:$slug}){
          title
          createdAt
          content{
            html
          }
        }
      }
  `, {slug: params.slug});

  return {
    props: {
      post,
      revalidate: 10
    }
  };
}