import { GetStaticProps } from "next"
import Image from "next/image"
import { ParsedUrlQuery } from "querystring"
import { useEffect, useState } from "react"
import styles from "./member.module.sass"
import Member1 from "@img/member1.png"

interface Props {
  name: string
  post: string
  img: string
}

const Member: React.FC<Props> = ({ name, post, img }) => {
  const [image, setImage] = useState<any>(null)
  useEffect(() => {
    const getImg = async () => {
      const res = await import(`../../assets/img/${img}`)
      const result = await res.default
      console.log(result)
      setImage(result)
    }
    getImg()
    return () => {}
  }, [])
  return (
    <div className={styles.member}>
      <div className="" style={{width: "100%", height: "24em"}}>
        {image ? <Image
          layout={"fill"}
          className={styles.member__img}
          blurDataURL={"data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=="}
          src={image}
          placeholder={"blur"}
          alt={name}
        /> : ""}
      </div>
      <div className={styles.member__label}>
        <div className={styles.member__name}>{name}</div>
        <div className={styles.member__post}>{post}</div>
      </div>
    </div>
  )
}

interface StaticProps {}

interface StaticParams extends ParsedUrlQuery {}

export const getStaticProps: GetStaticProps<StaticProps, StaticParams> = async (
  context
) => {
  return {
    props: {},
  }
}

export default Member
