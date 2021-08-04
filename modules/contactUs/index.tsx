import styles from "./contactus.module.sass"
import Image from "next/image"
import { SideNavContent } from "@/lib/api/lang"
import {v4 as uuid} from "uuid"

interface Props {
  setContact: React.Dispatch<React.SetStateAction<boolean>>
  content?: SideNavContent["contactUs"]
}

const ContactUs: React.FC<Props> = ({ setContact, content }) => {
  const close = () => {
    setContact(false)
  }
  const stopProp = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  return (
    <>
      <div className={styles.wrapper} onClick={close}>
        <div className={styles.cross}></div>
        <form className={styles.form} onClick={stopProp}>
          <fieldset className={styles.form__field}>
            <legend className={styles.form__title}>{content?.title}</legend>
            <div className={styles.form__inputs}>
              {content?.contactForm.formFields.map((field) => (
                <input type="text" className={styles.form__input} placeholder={field} />
              ))}
              <input type="submit" className={styles.form__submit} value={content?.contactForm.submitButton} />
            </div>
            <ul className={styles.form__media}>
              {content?.contactForm.media.map((item) => (
                <li className={styles.form__link} key={uuid()}>
                  <a href={item?.link}>
                    <img src={item?.image?.sourceUrl} alt={item?.image?.altText}/>
                  </a>
                </li>
              ))}
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default ContactUs
