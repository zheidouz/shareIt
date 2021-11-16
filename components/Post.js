import Image from 'next/image';
import Link from 'next/link';
import Style from '../styles/Post.module.css';


const Post = ({post}) => {
  const {title, thumbnail, slug, categories} = post;
  return (
    <Link href={`/posts/${slug}`}>
      <a>
        <div
          className={Style.post}
          style={{border: `1px solid ${categories[0].color.css}`}}
        >
          <Image src={thumbnail.url} layout="fill" alt={title}/>
          <div className={Style.overlay}>
            <h1>{title}</h1>
          </div>
          <div
            className={Style.badge}
            style={{backgroundColor: categories[0].color.css}}
          >
            <h3>{categories[0].name}</h3>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Post;