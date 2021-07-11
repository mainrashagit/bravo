import SideNav from "@modules/sidenav/SideNav"
import { useEffect, useRef, useState } from "react"
import styles from "./layout.module.sass"
import Bg1 from "@img/bg1.png"
import Image from "next/image"

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const [scrollDown, setScrollDown] = useState(false)
  const scrollDiff = useRef(0)
  const scroll = (e: Event) => {
    if (!(e.target instanceof HTMLElement)) return
    if (e.target.scrollTop > scrollDiff.current) {
      setScrollDown(true)
      return (scrollDiff.current = e.target.scrollTop)
    }
    setScrollDown(false)
    scrollDiff.current = e.target.scrollTop
  }
  const unScroll = () => {
    setScrollDown(false)
  }
  useEffect(() => {
    document.addEventListener("scroll", scroll, true)
    document.addEventListener("click", unScroll, true)
    return () => {
      document.removeEventListener("scroll", scroll, true)
      document.removeEventListener("click", unScroll, true)
    }
  }, [])
  return (
    <div className={styles.page}>
      <Image layout={"fill"} className={styles.bg} src={Bg1} alt="background" />
      <div className={styles.border}></div>
      <SideNav scrollDown={scrollDown} />
      <main className={styles.content}>{children}</main>
    </div>
  )
}

export default Layout
