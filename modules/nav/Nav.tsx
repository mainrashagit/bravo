import { NavContext } from "@/context/NavContext"
import { HTMLProps, useContext, useEffect, useRef, useState } from "react"
import Link from "next/link"
import styles from "./nav.module.sass"
import { v4 as uuid } from "uuid"
import { getNavLinks, NavLinks } from "../../lib/api/lang"
import { useRouter } from "next/router"

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
  const [items, setItems] = useState<NavLinks>()
  const { locale } = useRouter()
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
  useEffect(() => {
    const getTitles = async () => {
      const items = await getNavLinks(locale)
      setItems(items)
    }
    getTitles()
    return () => {
      
    }
  }, [locale])
  return (
    <nav
      ref={navRef}
      className={styles.nav}
      data-top={atTop}
      data-down={!scrollDown}
      {...props}
    >
      <ul className={styles.nav__links}>
        {items && items.map((item, i) => {
            return (
              <li className={styles.nav__li} key={uuid()}>
                <Link href={`/nav/${item.link}`}>
                  <a className={styles.nav__link} data-selected={selectedItem === item.link}>
                    {item.title}
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
