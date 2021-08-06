import styles from "./member.module.sass"

interface Props {
  name: string
  post: string
  img: {
    altText: string
    sourceUrl: string
    srcSet: string
  }
}

const Member: React.FC<Props> = ({ name, post, img }) => {
  return (
    <div className={styles.member}>
      <div style={{ width: "100%", height: "24em" }} className={styles.member__img}>
        <img
          className={styles.member__imgImg}
          src={img.sourceUrl}
          srcSet={img.srcSet}
          alt={name}
        />
      </div>
      <div className={styles.member__label}>
        <div className={styles.member__name}>{name}</div>
        <div className={styles.member__post}>{post}</div>
      </div>
    </div>
  )
}

export default Member
