import { navItems, NavContext } from "@/context/NavContext"
import { HTMLProps, useContext, useEffect, useRef, useState } from "react"
import Link from "next/link"
import styles from "./nav.module.sass"

interface Props {
  selectedItem?: string
}

const Nav: React.FC<Props & HTMLProps<HTMLElement>> = ({
  selectedItem,
  ...props
}) => {
  const navRef = useRef<HTMLElement>(null)
  const ctx = useContext(NavContext)
  const { scrollDown } = ctx!
  const [atTop, setAtTop] = useState(false)
  useEffect(() => {
    const adjust = () => {
      if (!navRef.current) return
      if (navRef.current.getBoundingClientRect().top <= 0) return setAtTop(true)
      setAtTop(false)
    }
    adjust()
    document.addEventListener("scroll", adjust, true)
    return () => {
      document.removeEventListener("scroll", adjust, true)
    }
  }, [])
  return (
    <nav
      ref={navRef}
      className={styles.nav}
      data-top={atTop}
      data-down={!scrollDown}
      {...props}
    >
      <ul className={styles.nav__links}>
        {navItems &&
          navItems.map(({ item }, i) => {
            const includes = item.includes(
              String(selectedItem).replace(/_/g, " ")
            )
            return (
              <li className={styles.nav__li} key={`nav-link-${i}`}>
                <Link href={`/nav/${item.replace(/ /g, "_")}.html`}>
                  <a className={styles.nav__link} data-selected={includes}>
                    {item}
                  </a>
                </Link>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}

export default Nav
