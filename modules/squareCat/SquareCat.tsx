import React from "react"
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
      <div style={{pointerEvents: "none"}}>
        <Image layout={"fill"} src={img} alt="category image" className={styles.square__img} />
      </div>
      <h3 className={styles.square__heading}>{heading}</h3>
      {subheading && (
        <div className={styles.square__subheading}>{subheading}</div>
      )}
      {doc && (
        <div className={styles.square__doc}>{<img src={"/doc.svg"} alt="doc" className={styles.square__docImg} />}</div>
      )}
    </div>
  )
}

export default SquareCat
