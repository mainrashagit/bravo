import SideNav from "@modules/sidenav/SideNav"
import { useEffect, useRef, useContext } from "react"
import styles from "./layout.module.sass"
import Bg1 from "@img/bg1.png"
import Image from "next/image"
import { NavContext } from "@/context/NavContext"
import SimpleBar from "simplebar-react"
import "simplebar/src/simplebar.css"

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const ctx = useContext(NavContext)
  const { setScrollDown, scrollDown } = ctx!
  const scrollDiff = useRef(0)
  useEffect(() => {
    const scroll = (e: Event) => {
      if (
        document.querySelector(".simplebar-content")?.getBoundingClientRect()
          .top! > -90
      )
        return
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
      <SimpleBar>{children}</SimpleBar>
    </div>
  )
}

export default Layout
