import styles from "./index.module.sass"

interface Props {
  title?: string
  date?: string
  text?: string
}

const Doc: React.FC<Props> = ({ title, date, text }) => {
  return (
    <>
      <div className={styles.new}>
        <div className={styles.new__wrapper}>
          <div className={styles.new__title}>{title}</div>
          <hr />
          <div className={styles.new__date}>{date}</div>
          <div className={styles.new__text} dangerouslySetInnerHTML={{ __html: text ?? "" }}>
          </div>
          <hr />
        </div>
      </div>
    </>
  )
}

export default Doc
