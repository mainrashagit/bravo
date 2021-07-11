import styles from "./sidenav.module.sass"
import { useState } from "react"
import Link from "next/link"
import Presentation from "@modules/presentation/Presentation"

interface Props {
  scrollDown: boolean
}

const SideNav: React.FC<Props> = ({ scrollDown }) => {
  const [pres, setPres] = useState(false)
  const [burger, setBurger] = useState(false)
  const onPresentationClick = () => {
    setPres(true)
  }
  const toggleBurger = () => {
    setBurger(!burger)
  }
  return (
    <>
      <aside className={styles.nav} data-hidden={scrollDown}>
        <div className={styles.nav__top}>
          <Link href="/">
            <a className={styles.nav__logo}>
              <img
                className={styles.nav__logoMain}
                src={"/logo.svg"}
                alt="logo"
              />
              <img
                className={styles.nav__logoBravo}
                src={"/bravo.svg"}
                alt="bravo"
              />
              <img
                className={styles.nav__logoConsulting}
                src={"/consulting.svg"}
                alt="consulting"
              />
            </a>
          </Link>
          <div className={styles.nav__right}>
            <div className={styles.nav__heart}>
              <img
                className={styles.nav__heartImg}
                src={"/heart.svg"}
                alt="favorite"
              />
            </div>
            <div className={styles.nav__burger} onClick={toggleBurger}>
              <div className={styles.nav__burgerImg}>
                <div
                  className={styles.nav__burgerImgLine}
                  data-active={burger}
                ></div>
                <div
                  className={styles.nav__burgerImgLine}
                  data-active={burger}
                ></div>
                <div
                  className={styles.nav__burgerImgLine}
                  data-active={burger}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.nav__main} data-active={burger}>
          <ul className={styles.nav__links}>
            <li className={styles.nav__link}>
              <Link href="/about_us">
                <a>About Us</a>
              </Link>
            </li>
            <li className={styles.nav__link}>
              <a onClick={onPresentationClick}>Presentation</a>
            </li>
            <li className={styles.nav__link}>
              <Link href="/contact_us">
                <a>Contact Us</a>
              </Link>
            </li>
            <li className={styles.nav__link}>
              <Link href="/work_with_us">
                <a>Work with Us</a>
              </Link>
            </li>
            <li className={styles.nav__link}>
              <Link href="/news">
                <a>News</a>
              </Link>
            </li>
          </ul>
          <div className={styles.nav__bottom}>
            <ul className={styles.nav__misc}>
              <li className={styles.nav__fav}>Favorite/Important</li>
              <li className={styles.nav__search}>
                <label className={styles.nav__searchInputLabel}>
                  <div className={styles.nav__searchInputPlaceholder}>
                    <img
                      className={styles.nav__searchGlass}
                      src={"/glass.svg"}
                      alt="magnifying glass"
                    />
                    Search
                  </div>
                  <input
                    className={styles.nav__searchInput}
                    type="text"
                    placeholder="Search..."
                  />
                </label>
              </li>
            </ul>
            <ul className={styles.nav__media}>
              <li className={styles.nav__mediaItem}>
                <a href="#" className={styles.nav__mediaLink}>
                  <img
                    src={"/ig.svg"}
                    alt="instagram"
                    className={styles.nav__mediaImg}
                  />
                </a>
              </li>
              <li className={styles.nav__mediaItem}>
                <a href="#" className={styles.nav__mediaLink}>
                  <img
                    src={"fb.svg"}
                    alt="instagram"
                    className={styles.nav__mediaImg}
                  />
                </a>
              </li>
              <li className={styles.nav__mediaItem}>
                <a href="#" className={styles.nav__mediaLink}>
                  <img
                    src={"pin.svg"}
                    alt="instagram"
                    className={styles.nav__mediaImg}
                  />
                </a>
              </li>
            </ul>
            <div className={styles.nav__copy}>
              <div>&copy; 2021</div>
              <div>bravoconsulting</div>
            </div>
          </div>
        </div>
      </aside>
      {pres && <Presentation setPres={setPres} />}
    </>
  )
}

export default SideNav
