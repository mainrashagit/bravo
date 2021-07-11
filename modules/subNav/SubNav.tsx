import { NavContext } from "@/context/NavContext"
import Nav from "@modules/nav/Nav"
import React, { useContext } from "react"
import styles from "./subnav.module.sass"
import SimpleBarReact from "simplebar-react"

import "simplebar/src/simplebar.css"

interface Props {
  selectedNavItem: string
}

const SubNav: React.FC<Props> = ({ selectedNavItem }) => {
  const items = useContext(NavContext)
  return (
    <>
      <SimpleBarReact>
        <Nav selectedItem={selectedNavItem} />
        <div className={styles.subnav}>
          <ul className={styles.subnav__items}>
            {items!
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
