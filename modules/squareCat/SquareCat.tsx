import styles from "./squareCat.module.sass"
import Image from "next/image"
import Link from "next/link"

interface Props {
  heading: string
  subheading?: string
  img?: string
  doc?: boolean
  link: string
}

const SquareCat: React.FC<Props> = ({ heading, subheading, img, doc, link }) => {
  return (
    <Link href={link}>
      <a className={styles.link}>
        <div className={styles.square}>
            <img className={styles.square__img} src={img} alt={heading} />
          <h3 className={styles.square__heading}>{heading}</h3>
          {subheading && (
            <div className={styles.square__subheading}>{subheading}</div>
          )}
          {doc && (
            <div className={styles.square__doc}>
              <div className={styles.square__docImg}>
                <Image
                  layout={"responsive"}
                  width={35}
                  height={43}
                  src={"/doc.svg"}
                  alt="doc"
                />
              </div>
            </div>
          )}
        </div>
      </a>
    </Link>
  )
}

export default SquareCat
