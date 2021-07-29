import Nav from "@modules/nav/Nav"
import styles from "./subnav.module.sass"
import { ParsedUrlQuery } from "querystring"
import { GetStaticPaths, GetStaticProps } from "next"
import { v4 as uuid } from "uuid"
import { getNavItemContent, getNavTitles } from "../../lib/api/lang"

interface Props {
  sub: string
  item: string
}

const SubNav: React.FC<Props> = ({ sub, item }) => {
  return (
    <>
      <Nav selectedItem={sub} />
      <div className={styles.subnav}>
        <div className={styles.subnav__itemMain}>{item}</div>
        <ul className={styles.subnav__items}>

          <li className={styles.subnav__item} key={uuid()}>
            Item1
          </li>
          <li className={styles.subnav__item} key={uuid()}>
            Item2
          </li>
          <li className={styles.subnav__item} key={uuid()}>
            Item3
          </li>
          <li className={styles.subnav__item} key={uuid()}>
            Item4
          </li>
        </ul>
      </div>
    </>
  )
}

export default SubNav

interface IParams extends ParsedUrlQuery {
  sub: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const loc = locales ?? ["en"]
  const items = await getNavTitles()
  const paths = loc.map(locale => Object.entries(items).map(([key, val]) => ({
    params: { sub: key.replace(/ /g, "_") },
    locale
  }))).flat(1)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { sub } = context.params as IParams
  const { locale } = context
  const loc = typeof locale === "string" ? locale : "en"
  const item = await getNavItemContent(sub, loc)
  return { props: { item, sub } }
}
