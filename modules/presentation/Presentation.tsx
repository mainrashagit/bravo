import { SideNavContent } from "@/lib/api/lang"
import styles from "./presentation.module.sass"

interface Props {
  setPres: React.Dispatch<React.SetStateAction<boolean>>
  content?: SideNavContent["presentation"]
}

const Presentation: React.FC<Props> = ({ setPres, content }) => {
  const close = () => {
    setPres(false)
  }
  const stopProp = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <div className={styles.wrapper} onClick={close}>
      <div className={styles.pres} onClick={stopProp}>
        <div className={styles.cross} onClick={close}></div>
        <div className={styles.pres__title}>{content?.presentationTitle}</div>
        <div className={styles.pres__desc}>{content?.presentationText}</div>
        <a className={styles.pres__download} onClick={close}>
          {content?.downloadButtonText}
        </a>
      </div>
    </div>
  )
}

export default Presentation
