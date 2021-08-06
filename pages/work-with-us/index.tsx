import styles from "./workwithus.module.sass"
import Post from "@modules/post/Post"
import Nav from "@modules/nav/Nav"
import { v4 as uuid } from "uuid"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Positions } from "@/pages/api/getPositions"

interface Props {
  positions: Positions
}

const WorkWithUs: React.FC<Props> = ({}) => {
  const { locale, defaultLocale } = useRouter()
  const [posElements, setPosElements] = useState<Positions>()
  useEffect(() => {
    const getContent = async () => {
      const postsRes = await fetch("/api/getPositions", {
        method: "POST",
        body: JSON.stringify({ locale: locale ?? defaultLocale ?? null }),
      })
      const posts = (await postsRes.json()) as Positions
      setPosElements(posts)
    }
    getContent()

    return () => {}
  }, [locale])
  return (
    <>
      <Nav />
      <ul className={styles.posts}>
        {posElements?.map(({ title, loc, resBtn }, i) => (
          <li className={styles.posts__post} key={uuid()}>
            <Post title={title} location={loc} resBtn={resBtn} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default WorkWithUs
