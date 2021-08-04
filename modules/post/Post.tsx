import styles from "./post.module.sass"

interface Props {
  title: string
  location: string
  link?: string
  resBtn: string
}

const Post: React.FC<Props> = ({ location, title, resBtn }) => {
  return (
    <div className={styles.post}>
      <div className={styles.post__title}>{title}</div>
      <div className={styles.post__bottom}>
        <div className={styles.post__location}>
          <img src={"/loc.svg"} className={styles.post__loc} />
          {location}
        </div>
        <a className={styles.post__respond}>{resBtn}</a>
      </div>
    </div>
  )
}

export default Post
