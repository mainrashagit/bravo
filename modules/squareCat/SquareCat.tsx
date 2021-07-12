import styles from "./squareCat.module.sass"
import Image from "next/image"

interface Props {
  heading: string
  subheading?: string
  img: string
  doc?: boolean
}

const SquareCat: React.FC<Props> = ({ heading, subheading, img, doc }) => {
  return (
    <div className={styles.square}>
      <div style={{ pointerEvents: "none" }} className={styles.square__img}>
        <Image layout={"fill"} src={img} alt={heading} />
      </div>
      <h3 className={styles.square__heading}>{heading}</h3>
      {subheading && (
        <div className={styles.square__subheading}>{subheading}</div>
      )}
      {doc && (
        <div className={styles.square__doc}>
          <div className={styles.square__docImg}>
            <Image
              layout={"responsive"}
              width={38}
              height={39}
              src={"/doc.svg"}
              alt="doc"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SquareCat
