import Image from "next/image"
import styles from "./member.module.sass"
import Member1 from "@img/member1.png"

interface Props {
  name: string
  post: string
}

const Member: React.FC<Props> = ({ name, post }) => {
  return (
    <div className={styles.member}>
      <div style={{ width: "100%", height: "24em" }}>
        <Image
          layout={"fill"}
          className={styles.member__img}
          src={Member1.src}
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
