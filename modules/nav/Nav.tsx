import { NavContext } from "@/context/NavContext"
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
  const links = useContext(NavContext)
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
    <nav ref={navRef} className={styles.nav} data-top={atTop} {...props}>
      <ul className={styles.nav__links}>
        {links &&
          links.map(({ item }, i) => (
            <li className={styles.nav__li} key={`nav-link-${i}`}>
              <Link
                href={`/nav/${item.replace(/ /g, "_")}`}
                data-selected={item.includes(String(selectedItem))}
              >
                <a className={styles.nav__link}>{item}</a>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default Nav
