import styles from "./sidenav.module.sass"
import { useState, MouseEvent, useEffect } from "react"
import Link from "next/link"
import Presentation from "@modules/presentation/Presentation"
import Image from "next/image"
import { useRouter } from "next/router"
import { getSideNavContent, SideNavContent } from "@/lib/api/lang"
import ContactUs from "@modules/contactUs"
import {v4 as uuid} from "uuid"

interface Props {
  scrollDown: boolean
}

const SideNav: React.FC<Props> = ({ scrollDown }) => {
  const [content, setContent] = useState<SideNavContent>()

  const [pres, setPres] = useState(false)
  const [burger, setBurger] = useState(false)
  const [contact, setContact] = useState(false)
  const onPresentationClick = () => {
    setPres(true)
  }
  const onContactClick = () => {
    setContact(true)
  }
  const toggleBurger = () => {
    setBurger(!burger)
  }
  function offBurger(e: MouseEvent) {
    if (e.target !== e.currentTarget) return
    setBurger(false)
  }

  const { asPath, locale, defaultLocale } = useRouter()
  useEffect(() => {
    const date = new Date()
    const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
    date.setTime(date.getTime() + expireMs)
    document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`

    const getContent = async () => {
      const content = await getSideNavContent(locale)
      setContent(content)
    }
    getContent()
    return () => {}
  }, [locale])
  return (
    <>
      <aside className={styles.nav} data-hidden={scrollDown}>
        <div className={styles.nav__top}>
          <Link href="/">
            <a className={styles.nav__logo} onClick={offBurger}>
              <img className={styles.nav__logoImg} src={content?.logo?.sourceUrl} alt={content?.logo?.altText} />
            </a>
          </Link>
          <div className={styles.nav__right}>
            <div className={styles.nav__heart}>
              <div className={styles.nav__heartImg}>
                <img src={"/heart.svg"} alt="favorite" />
              </div>
            </div>
            <div className={styles.nav__burger} onClick={toggleBurger}>
              <div className={styles.nav__burgerImg}>
                <div className={styles.nav__burgerImgLine} data-active={burger}></div>
                <div className={styles.nav__burgerImgLine} data-active={burger}></div>
                <div className={styles.nav__burgerImgLine} data-active={burger}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.nav__main} data-active={burger} onClick={offBurger}>
          <ul className={styles.nav__links}>
            <li className={styles.nav__link}>
              <Link href="/about_us">
                <a onClick={offBurger}>{content?.aboutUs}</a>
              </Link>
            </li>
            <li className={styles.nav__link}>
              <a onClick={onPresentationClick}>{content?.presentation.title}</a>
            </li>
            <li className={styles.nav__link}>
              <a onClick={onContactClick}>{content?.contactUs.title}</a>
            </li>
            <li className={styles.nav__link}>
              <Link href="/work_with_us">
                <a onClick={offBurger}>{content?.workWithUs}</a>
              </Link>
            </li>
            <li className={styles.nav__link}>
              <Link href="/news">
                <a onClick={offBurger}>{content?.news}</a>
              </Link>
            </li>
          </ul>
          <div className={styles.nav__bottom}>
            <ul className={styles.nav__misc}>
              <li className={styles.nav__fav}>{content?.favoriteimportant}</li>
              <li className={styles.nav__search}>
                <label className={styles.nav__searchInputLabel}>
                  <div className={styles.nav__searchInputPlaceholder}>
                    <div className={styles.nav__searchGlass}>
                      <img src={content?.searchIcon?.sourceUrl} alt={content?.searchIcon?.altText} />
                    </div>
                    {content?.search}
                  </div>
                  <input className={styles.nav__searchInput} type="text" placeholder={`${content?.search}...`} />
                </label>
              </li>
            </ul>
            <ul className={styles.nav__media}>
              {content?.media?.map(({link, image}) => (
                <li className={styles.nav__mediaItem} key={uuid()}>
                  <a href={link} className={styles.nav__mediaLink}>
                    <div className={styles.nav__mediaImg}>
                      <img src={image?.sourceUrl} alt={image?.altText} />
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <ul className={styles.nav__lang}>
              <li data-selected={locale === "ru"}>
                <Link href={asPath} locale="ru">
                  <a>ru</a>
                </Link>
              </li>
              <span className={styles.nav__langPipe}></span>
              <li data-selected={locale === "en"}>
                <Link href={asPath} locale="en">
                  <a>en</a>
                </Link>
              </li>
              <span className={styles.nav__langPipe}></span>
              <li data-selected={locale === "de"}>
                <Link href={asPath} locale="de">
                  <a>de</a>
                </Link>
              </li>
            </ul>
            <div className={styles.nav__copy} dangerouslySetInnerHTML={{__html: content?.copyright ?? ""}}>
            </div>
          </div>
        </div>
      </aside>
      {pres && <Presentation setPres={setPres} content={content?.presentation} />}
      {contact && <ContactUs setContact={setContact} content={content?.contactUs} />}
    </>
  )
}

export default SideNav
