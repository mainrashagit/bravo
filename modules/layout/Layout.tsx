import SideNav from "@modules/sidenav/SideNav"
import { useEffect, useRef, useContext, useState } from "react"
import styles from "./layout.module.sass"
import { NavContext } from "@/context/NavContext"
import SimpleBar from "simplebar-react"
import "simplebar/src/simplebar.css"
// import { getTitle } from "@/lib/api/lang"
import { Bg } from "@/pages/api/getBgByPage"
import { useRouter } from "next/router"
import Head from "next/head"

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const [bg, setBg] = useState<Bg>()
  const [title, setTitle] = useState<string>()
  const ctx = useContext(NavContext)
  const { setScrollDown, scrollDown } = ctx!
  const scrollDiff = useRef(0)
  const { asPath, route, locale } = useRouter()
  useEffect(() => {
    const scroll = (e: Event) => {
      if (document.querySelector(".simplebar-content")?.getBoundingClientRect().top! > 0) return setScrollDown(false)
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

    const scrollAreas = document.querySelectorAll("[data-simplebar]")
    const scrollAreas2 = document.querySelectorAll("simplebar-content")
    const resizeHeight = () => {
      scrollAreas.forEach((area) => {
        if (!(area instanceof HTMLElement)) return
        area.style.maxHeight = String(`${window.innerHeight}px`)
      })
      scrollAreas2.forEach((area) => {
        if (!(area instanceof HTMLElement)) return
        area.style.minHeight = String(`${window.innerHeight}px`)
      })
    }
    resizeHeight()
    window.addEventListener("resize", resizeHeight)

    const getBg = async () => {
      // const resBg = await fetch("/api/getBgByPage", {
      //   method: "POST",
      //   body: JSON.stringify({ bool: route.includes("about") }),
      // })
      // const bg = await getBgByPage(route.includes("about"))
      // const asPathNoTrailingSlash = asPath.endsWith("/") ? asPath.substring(0, asPath.length - 1) : asPath
      // const slug = asPathNoTrailingSlash.substring(asPathNoTrailingSlash.lastIndexOf("/") + 1)
      // const title = await getTitle(locale, slug, slug.length > 0 && !slug.includes("about") && !slug.includes("work-with-us") && !slug.includes("news"))
      // setTitle(title)
      // setBg(bg)
    }
    getBg()
    return () => {
      document.removeEventListener("scroll", scroll, true)
      document.removeEventListener("click", unScroll, true)
      window.removeEventListener("resize", resizeHeight)
    }
  }, [route, locale])
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.page}>
        {bg && <img className={styles.bg} src={bg?.sourceUrl} srcSet={bg?.srcSet} alt="background" />}
        <div className={styles.border}></div>
        <SideNav scrollDown={scrollDown} />
        <SimpleBar>{children}</SimpleBar>
      </div>
    </>
  )
}

export default Layout
