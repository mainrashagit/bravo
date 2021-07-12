import styles from "./new.module.sass"
import Image from "next/image"
import Img from "@img/new1.png"
import { useEffect, useRef, useState } from "react"

interface Props {
  title: string
  subsection: string
  brief: string
  date: string
  comments: number | string
  views: number | string
}

const New: React.FC<Props> = ({
  title,
  subsection,
  brief,
  date,
  comments,
  views,
}) => {
  const [isOverlay, setIsOverlay] = useState(false)
  const text$ = useRef<HTMLDivElement>(null)
  const brief$ = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (((brief$.current?.scrollHeight ?? 0) / (text$.current?.scrollHeight ?? 1)) > 0.4) setIsOverlay(true)
  }, [])
  return (
    <div className={styles.new}>
      <div className={styles.new__img}>
        <Image layout={"fill"} src={Img} />
      </div>
      <div className={styles.new__text} ref={text$}>
        <div className={styles.new__label}>{subsection}</div>
        <div className={styles.new__title}>{title}</div>
        <div className={styles.new__brief} ref={brief$}>
          {isOverlay && <div className={styles.new__briefOverlay}></div>}
          {brief}
        </div>
        <div className={styles.new__foot}>
          <div className={styles.new__date}>{date}</div>
          <div className={styles.new__stats}>
            <div className={styles.new__comments}>
              <img src={"/comment.svg"} className={styles.new__comment} />
              {comments}
            </div>
            <div className={styles.new__views}>
              <img src={"/eye.svg"} className={styles.new__view} />
              {views}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New
