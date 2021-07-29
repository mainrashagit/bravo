import Nav from "@modules/nav/Nav"
import styles from "./subnav.module.sass"
import SimpleBarReact from "simplebar-react"

import "simplebar/src/simplebar.css"
import { useRouter } from "next/router"

interface Props {
  selectedNavItem: string
}

const SubNav: React.FC<Props> = ({ selectedNavItem }) => {
  const { locale } = useRouter()
  const loc = locale ?? "en"
  return (
    <>
      <SimpleBarReact>
        <Nav selectedItem={selectedNavItem} />
        <div className={styles.subnav}>
          <ul className={styles.subnav__items}>
            {/* {
              <li className={styles.subnav__item}>{navItems
                .filter(({ item }) => item === selectedNavItem)[0]
                .subItems[loc]}</li>
            } */}
          </ul>
        </div>
      </SimpleBarReact>
    </>
  )
}

export default SubNav
