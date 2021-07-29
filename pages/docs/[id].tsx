import styles from './doc.module.sass'
import Nav from "@modules/nav/Nav"
import { ParsedUrlQuery } from "querystring"
import { GetStaticPaths, GetStaticProps } from "next"

interface Props {
  id: string
}

const Doc: React.FC<Props> = ({ id }) => {
  return (
    <>
      <Nav />
      <div className={styles.new}>
        <div className={styles.new__wrapper}>

          <div className={styles.new__title}>Title</div>
          <hr />
          <div className={styles.new__date}>06 Jun 2021</div>
          <div className={styles.new__text}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A eveniet rem, ipsam debitis, aut eaque laboriosam nam quis quod dignissimos error dolores aperiam excepturi commodi numquam architecto veniam assumenda, rerum deleniti. Labore maxime reiciendis in delectus cumque velit facere! Inventore!</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt est iure accusantium officiis minima aspernatur beatae inventore incidunt explicabo laborum?</p>
          </div>
          <hr />
        </div>
      </div>
    </>
  )
}

export default Doc

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const loc = locales ?? ["en"]
  const news = [{
    params: {
      id: "doc",
    },
  }]
  const paths = loc.map(locale => news.map(item => ({ ...item, locale }))).flat(1)
  console.log(paths)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id, locale } = context.params as IParams
  // const loc = typeof locale === "string" ? locale : "en"

  return { props: { id } }
}
