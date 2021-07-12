import Nav from "@modules/nav/Nav"
import styles from "./contactus.module.sass"
import Image from "next/image"

interface Props {}

const ContactUs: React.FC<Props> = ({}) => {
  return (
    <div className={styles.page}>
        <Nav />
        <form className={styles.contactForm}>
          <div className={styles.contactForm__wrapper}>
            <fieldset className={styles.contactForm__field}>
              <legend className={styles.contactForm__title}>Contact Us</legend>
              <div className={styles.contactForm__inputs}>
                <input
                  className={styles.contactForm__input}
                  type="text"
                  placeholder="Name"
                />
                <input
                  className={styles.contactForm__input}
                  type="text"
                  placeholder="Phone"
                />
                <input
                  className={styles.contactForm__input}
                  type="text"
                  placeholder="Topic or Appeal"
                />
                <input
                  className={styles.contactForm__submit}
                  type="submit"
                  value="Send"
                />
              </div>
              <ul className={styles.contactForm__media}>
                <li className={styles.contactForm__link}>
                  <a href="#">
                    <Image layout={"responsive"} width={20} height={20} src={"/ig.svg"} alt="instagram" />
                  </a>
                </li>
                <li className={styles.contactForm__link}>
                  <a href="#">
                    <Image layout={"responsive"} width={20} height={20} src={"/fb.svg"} alt="facebook" />
                  </a>
                </li>
                <li className={styles.contactForm__link}>
                  <a href="#">
                    <Image layout={"responsive"} width={20} height={20} src={"/pin.svg"} alt="pinterest" />
                  </a>
                </li>
                <li className={styles.contactForm__envelope}>
                  <a href="#">
                    <Image layout={"responsive"} width={30} height={25} src={"/envelope.svg"} alt="email" />
                  </a>
                </li>
              </ul>
            </fieldset>
          </div>
        </form>
    </div>
  )
}

export default ContactUs
