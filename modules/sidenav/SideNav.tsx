import styles from "./sidenav.module.sass"
import { useState, MouseEvent, useEffect } from "react"
import Link from "next/link"
import Presentation from "@modules/presentation/Presentation"
import Image from "next/image"
import { useRouter } from "next/router"
import { getSideNavContent } from "@/lib/api/lang"
import ContactUs from "@modules/contactUs"

interface Props {
  scrollDown: boolean
}

const SideNav: React.FC<Props> = ({ scrollDown }) => {
  const [pres, setPres] = useState(false)
  const [burger, setBurger] = useState(false)
  const [navItems, setNavItems] = useState<{ [link: string]: string }>({})
  const [presText, setPresText] = useState<string[]>([])
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

    const getTitles = async () => {
      const { nav, presentation } = await getSideNavContent(locale ?? "en")
      setNavItems(nav ?? {})
      setPresText(presentation)
    }
    getTitles()
    return () => {}
  }, [locale])
  return (
    <>
      <aside className={styles.nav} data-hidden={scrollDown}>
        <div className={styles.nav__top}>
          <Link href="/">
            <a className={styles.nav__logo} onClick={offBurger}>
              <div className={styles.nav__logoMain}>
                <Image layout={"responsive"} width={45} height={44} src={"/logo.svg"} alt="logo" />
              </div>
              <div className={styles.nav__logoBravo}>
                <Image layout={"responsive"} width={74} height={24} src={"/bravo.svg"} alt="bravo" />
              </div>
              <div className={styles.nav__logoConsulting}>
                <Image layout={"responsive"} width={73} height={15} src={"/consulting.svg"} alt="consulting" />
              </div>
            </a>
          </Link>
          <div className={styles.nav__right}>
            <div className={styles.nav__heart}>
              <div className={styles.nav__heartImg}>
                <Image layout={"responsive"} width={24} height={20} src={"/heart.svg"} alt="favorite" />
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
                <a onClick={offBurger}>{navItems["about"]}</a>
              </Link>
            </li>
            <li className={styles.nav__link}>
              <a onClick={onPresentationClick}>{navItems["presentation"]}</a>
            </li>
            <li className={styles.nav__link}>
              <a onClick={onContactClick}>{navItems["contact"]}</a>
            </li>
            <li className={styles.nav__link}>
              <Link href="/work_with_us">
                <a onClick={offBurger}>{navItems["work"]}</a>
              </Link>
            </li>
            <li className={styles.nav__link}>
              <Link href="/news">
                <a onClick={offBurger}>{navItems["news"]}</a>
              </Link>
            </li>
          </ul>
          <div className={styles.nav__bottom}>
            <ul className={styles.nav__misc}>
              <li className={styles.nav__fav}>{navItems["fav"]}</li>
              <li className={styles.nav__search}>
                <label className={styles.nav__searchInputLabel}>
                  <div className={styles.nav__searchInputPlaceholder}>
                    <div className={styles.nav__searchGlass}>
                      <Image layout={"responsive"} width={12} height={12} src={"/glass.svg"} alt="magnifying glass" />
                    </div>
                    {navItems["search"]}
                  </div>
                  <input className={styles.nav__searchInput} type="text" placeholder={`${navItems["search"]}...`} />
                </label>
              </li>
            </ul>
            <ul className={styles.nav__media}>
              <li className={styles.nav__mediaItem}>
                <a href="#" className={styles.nav__mediaLink}>
                  <div className={styles.nav__mediaImg}>
                    <Image layout={"responsive"} width={20} height={20} src={"/ig.svg"} alt="instagram" />
                  </div>
                </a>
              </li>
              <li className={styles.nav__mediaItem}>
                <a href="#" className={styles.nav__mediaLink}>
                  <div className={styles.nav__mediaImg}>
                    <Image layout={"responsive"} width={20} height={20} src={"/fb.svg"} alt="instagram" />
                  </div>
                </a>
              </li>
              <li className={styles.nav__mediaItem}>
                <a href="#" className={styles.nav__mediaLink}>
                  <div className={styles.nav__mediaImg}>
                    <Image layout={"responsive"} width={20} height={20} src={"/pin.svg"} alt="instagram" />
                  </div>
                </a>
              </li>
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
            <div className={styles.nav__copy}>
              <div>&copy; 2021</div>
              <div>bravoconsulting</div>
            </div>
          </div>
        </div>
      </aside>
      {pres && <Presentation setPres={setPres} />}
      {contact && <ContactUs setContact={setContact} />}
    </>
  )
}

export default SideNav
