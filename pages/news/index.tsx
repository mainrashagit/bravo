import styles from "./news.module.sass"
import Nav from "@modules/nav/Nav"
import New from "@modules/new/New"
import { v4 as uuid } from "uuid"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { News } from "../api/getNews"

interface Props {}

const NewsPage: React.FC<Props> = ({}) => {
  const { locale, defaultLocale } = useRouter()
  const [newsPosts, setNewsPosts] = useState<News>()
  useEffect(() => {
    const getNewsPosts = async () => {
      const itemsRes = await fetch("/api/getNews", {
        method: "POST",
        body: JSON.stringify({ locale: locale ?? defaultLocale ?? null }),
      })
      const items = (await itemsRes.json()) as News
      setNewsPosts(items)
    }
    getNewsPosts()
    return () => {}
  }, [locale])
  const newEls = newsPosts?.map(({ title, subsection, text, date, link, image }, i) => (
    <li className={styles.news__new} key={uuid()}>
      <New title={title} subsection={subsection} brief={text} date={date} comments={0} views={0} link={`/news/${link}`} image={image} />
    </li>
  ))
  return (
    <>
      <Nav />
      <div className={styles.wrapper}>
        <ul className={styles.news}>{newEls}</ul>
      </div>
    </>
  )
}

export default NewsPage
