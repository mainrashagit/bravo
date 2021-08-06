import Nav from "@modules/nav/Nav"
import styles from "./subnav.module.sass"
import { ParsedUrlQuery } from "querystring"
import { GetStaticPaths, GetStaticProps } from "next"
import { v4 as uuid } from "uuid"
import { getNavContentBySlug, getNavPaths, NavContent } from "../../lib/api/lang"

interface Props {
  content: NavContent
  sub: string
}

const SubNav: React.FC<Props> = ({ content, sub }) => {
  return (
    <>
      <Nav selectedItem={sub} />
      <div className={styles.subnav}>
        <div className={styles.subnav__itemMain}dangerouslySetInnerHTML={{__html: content[0]}}></div>
        <ul className={styles.subnav__items}>
          {content.map((item, i) => {
            if (i === 0) return
            return (
              <li className={styles.subnav__item} key={uuid()} dangerouslySetInnerHTML={{__html: item}}>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default SubNav

interface IParams extends ParsedUrlQuery {
  sub: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales, defaultLocale }) => {
  const loc = locales ?? ([defaultLocale] as string[])
  const paths = await getNavPaths(loc)
  return { paths, fallback: "blocking" }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { sub } = context.params as IParams
  const { locale } = context
  const loc = typeof locale === "string" ? locale : "en"
  const content = await getNavContentBySlug(sub, loc)
  return { props: { content, sub }, revalidate: 10 }
}
