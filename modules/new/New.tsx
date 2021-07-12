import styles from "./new.module.sass"
import Image from "next/image"
import Img from "@img/new1.png"

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
  return (
    <div className={styles.new}>
      <div className={styles.new__img}>
        <Image layout={"fill"} src={Img} />
      </div>
      <div className={styles.new__text}>
        <div className={styles.new__label}>{subsection}</div>
        <div className={styles.new__title}>{title}</div>
        <div className={styles.new__brief}>{brief}</div>
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
