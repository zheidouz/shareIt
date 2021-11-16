import Link from 'next/link';
import Style from '../styles/Header.module.css';
import {
  useEffect,
  useState
} from 'react';
import { graphCms } from '../lib/graphCms';


const Header = () => {
  const [categoryLinks, setCategoryLinks] = useState([]);

  useEffect(async () => {
    const {categories} = await graphCms.request(`
    query MyQuery {
      categories {
        color {
          css
        }
        name
      }
    }
    `);
    setCategoryLinks(categories);
  }, []);

  return (
    <header className={Style.header}>
      <div className={`container ` + Style.container}>
        <Link href="/">
          <a className={Style.logo}>shareIt.</a>
        </Link>
        <ul>
          {
            categoryLinks.map(link => (
              <li key={link.name}>
                <Link href={`/${link.name}`}>
                  <a style={{color: link.color.css}}>{link.name}</a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </header>
  );
};

export default Header;