import Nav from "@modules/nav/Nav"
import styles from "./subnav.module.sass"
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"
import { ParsedUrlQuery } from "querystring"
import { GetStaticPaths, GetStaticProps } from "next"
import { navItems } from "@/context/NavContext"

interface Props {
  selectedNavItem: string
  items: string[]
}

const SubNav: React.FC<Props> = ({ selectedNavItem, items }) => {
  return (
    <>
      <SimpleBarReact>
        <Nav selectedItem={selectedNavItem} />
        <div className={styles.subnav}>
          <ul className={styles.subnav__items}>
            {items.map((item) => (
                <li className={styles.subnav__item}>{item}</li>
              ))}
          </ul>
        </div>
      </SimpleBarReact>
    </>
  )
}

export default SubNav

interface IParams extends ParsedUrlQuery {
  sub: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = navItems.map(({ item }) => ({ params: { sub: item.replace(/ /g, "_") } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { sub } = context.params as IParams
  const items = navItems.filter(navItem => navItem.item.replace(/ /g, "_") === sub)[0].subItems
  return { props: { items } }
}
