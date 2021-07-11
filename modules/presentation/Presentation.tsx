import React from "react"
import styles from "./presentation.module.sass"

interface Props {
  setPres: React.Dispatch<React.SetStateAction<boolean>>
}

const Presentation: React.FC<Props> = ({ setPres }) => {
  const close = () => {
    setPres(false)
  }
  const stopProp = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <div className={styles.wrapper} onClick={close}>
      <div className={styles.pres} onClick={stopProp}>
        <div className={styles.pres__title}>presentation in pdf format</div>
        <div className={styles.pres__desc}>
          FILE SIZE OVER 100 MB - CONTINUE DOWNLOADING?
        </div>
        <a className={styles.pres__download} onClick={close}>Download</a>
      </div>
    </div>
  )
}

export default Presentation
