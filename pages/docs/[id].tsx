import styles from "./doc.module.sass"
import Nav from "@modules/nav/Nav"
import { ParsedUrlQuery } from "querystring"
import { GetStaticPaths, GetStaticProps } from "next"
import { DocPage, getDocPageBySlug, getDocPagePaths } from "@/lib/api/lang"

interface Props {
  id: string
  content: DocPage
}

const Doc: React.FC<Props> = ({ id, content: { date, text, title } }) => {
  return (
    <>
      <Nav />
      <div className={styles.new}>
        <div className={styles.new__wrapper}>
          <div className={styles.new__title}>{title}</div>
          <hr />
          <div className={styles.new__date}>{date}</div>
          <div className={styles.new__text} dangerouslySetInnerHTML={{ __html: text }}></div>
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

export const getStaticPaths: GetStaticPaths = async ({ locales, defaultLocale }) => {
  const loc = locales ?? [defaultLocale] as string[]
  const paths = await getDocPagePaths(loc)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams
  const { locale, defaultLocale } = context
  const loc = locale ?? defaultLocale as string

  const content = await getDocPageBySlug(id, loc)

  return { props: { id, content } }
}
