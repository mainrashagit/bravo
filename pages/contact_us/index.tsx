import Nav from "@modules/nav/Nav"
import styles from "./contactus.module.sass"
import Image from "next/image"

interface Props {}

const ContactUs: React.FC<Props> = ({}) => {
  return (
    <>
      <Nav />
      <div className={styles.wrapper}>
        <form className={styles.form}>
          <fieldset className={styles.form__field}>
            <legend className={styles.form__title}>Contact Us</legend>
            <div className={styles.form__inputs}>
              <input type="text" className={styles.form__input} placeholder={"Name"} />
              <input type="text" className={styles.form__input} placeholder={"Phone"} />
              <input type="text" className={styles.form__input} placeholder={"Topic or Appeal"} />
              <input type="submit" className={styles.form__submit} value={"Send"} />
            </div>
            <ul className={styles.form__media}>
              <li className={styles.form__link}>
                <a href="#">
                  <Image
                    layout={"responsive"}
                    width={20}
                    height={20}
                    src={"/ig.svg"}
                    alt="instagram"
                  />
                </a>
              </li>
              <li className={styles.form__link}>
                <a href="#">
                  <Image
                    layout={"responsive"}
                    width={20}
                    height={20}
                    src={"/fb.svg"}
                    alt="facebook"
                  />
                </a>
              </li>
              <li className={styles.form__link}>
                <a href="#">
                  <Image
                    layout={"responsive"}
                    width={20}
                    height={20}
                    src={"/pin.svg"}
                    alt="pinterest"
                  />
                </a>
              </li>
              <li className={styles.form__envelope}>
                <a href="#">
                  <Image
                    layout={"responsive"}
                    width={30}
                    height={25}
                    src={"/envelope.svg"}
                    alt="email"
                  />
                </a>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    </>
  )
}

export default ContactUs
