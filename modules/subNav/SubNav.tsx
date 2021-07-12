import { navItems } from "@/context/NavContext"
import Nav from "@modules/nav/Nav"
import { useContext } from "react"
import styles from "./subnav.module.sass"
import SimpleBarReact from "simplebar-react"

import "simplebar/src/simplebar.css"

interface Props {
  selectedNavItem: string
}

const SubNav: React.FC<Props> = ({ selectedNavItem }) => {
  return (
    <>
      <SimpleBarReact>
        <Nav selectedItem={selectedNavItem} />
        <div className={styles.subnav}>
          <ul className={styles.subnav__items}>
            {navItems
              .filter(({ item }) => item === selectedNavItem)[0]
              .subItems.map((item) => (
                <li className={styles.subnav__item}>{item}</li>
              ))}
          </ul>
        </div>
      </SimpleBarReact>
    </>
  )
}

export default SubNav
