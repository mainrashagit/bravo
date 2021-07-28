import Nav from "@modules/nav/Nav"
import styles from "./aboutus.module.sass"
import Member from "@modules/member/Member"
import Image from "next/image"
import { v4 as uuid } from "uuid"
import { useEffect, useRef, useState } from "react"
import SimpleBar from "simplebar-react"
import "simplebar/src/simplebar.css"

interface Props {
  locale: any
 }

const AboutUs: React.FC<Props> = ({ locale }) => {
  const team = [
    {
      name: "Darlene Robertson",
      post: "Business process analyst",
      img: "member1.png",
    },
    {
      name: "Gloria Moore",
      post: "Business process analyst",
      img: "member2.png",
    },
    {
      name: "Robert Fox",
      post: "Business process analyst",
      img: "member1.png",
    },
    {
      name: "Sara Adams",
      post: "Business process analyst",
      img: "member2.png",
    },
    {
      name: "zlata orlova",
      post: "Business process analyst",
      img: "member2.png",
    },
    {
      name: "Darlene Robertson",
      post: "Business process analyst",
      img: "member1.png",
    },
    {
      name: "Gloria Moore",
      post: "Business process analyst",
      img: "member2.png",
    },
    {
      name: "Robert Fox",
      post: "Business process analyst",
      img: "member1.png",
    },
  ]

  const teamItems = team.map(({ name, post }, i) => (
    <li className={styles.team__member} key={uuid()}>
      <Member name={name} post={post} img={`member${i % 2 ? 2 : 1}.png`} />
    </li>
  ))
  const [isTop, setIsTop] = useState(true)
  const team$ = useRef<HTMLDivElement>(null)

  const [isSmall, setIsSmall] = useState(false)

  const isWheelDown = (delta: number) => {
    if (delta > 0) return true
    return false
  }

  useEffect(() => {
    if (isSmall) return
    const content = document.querySelectorAll(".simplebar-content")[1]
    const moeseus = (e: WheelEvent) => {
      if (isWheelDown(e.deltaY) && isTop) setIsTop(false)
      if (
        !isWheelDown(e.deltaY) &&
        !isTop &&
        team$.current !== null &&
        content.getBoundingClientRect().top! >= 0
      )
        setIsTop(true)
    }
    document.addEventListener("wheel", moeseus, true)
    return () => {
      document.removeEventListener("wheel", moeseus, true)
    }
  }, [isTop, isSmall])

  useEffect(() => {
    console.log(locale)
    const watch = (e: MediaQueryListEvent) => {
      setIsSmall(e.matches)
    }
    const media = window.matchMedia("(max-width: 990px)")
    setIsSmall(media.matches)
    media.addEventListener("change", watch)
    return () => {
      media.removeEventListener("change", watch)
    }
  }, [])
  return (
    <>
      <div className={styles.content}>
        <Nav
          style={
            !isSmall
              ? { position: "absolute", top: "0" }
              : { position: "sticky" }
          }
        />

        <div className={styles.about}>
          <div className={styles.about__left} data-hidden={!isTop}>
            <div className={styles.about__logo}>
              <Image
                layout={"responsive"}
                width={45}
                height={45}
                src={"/logo.svg"}
                alt="logo"
              />
            </div>
          </div>
          <div className={styles.about__right} data-hidden={!isTop}>
            <div className={styles.about__title}>Bravo Consulting</div>
            <p>
              {locale.about}
            </p>
          </div>
        </div>

        {isSmall ? (
          <div className={styles.team} ref={team$}>
            <div className={styles.team__title}>Our Team</div>
            <ul className={styles.team__members}>{teamItems}</ul>
          </div>
        ) : (
          <div className={styles.teamWrapper} data-hidden={isTop}>
            <SimpleBar forceVisible={true}>
              <div className={styles.team} ref={team$}>
                <div className={styles.team__title}>Our Team</div>
                <ul className={styles.team__members}>{teamItems}</ul>
              </div>
            </SimpleBar>
          </div>
        )}
      </div>
    </>
  )
}

export default AboutUs

export async function getStaticProps({ locale }: { locale: string }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  // const res = await fetch(`https://.../posts?locale=${locale}`)
  // const posts = await res.json()

  // if (posts.length === 0) {
  //   return {
  //     notFound: true,
  //   }
  // }

  const de = {
    about: "BRAVO CONSULTING ist eine internationale Beratungsagentur, die innovative Lösungen für Ihre Organisationsentwicklung anbietet. Die besten Anwälte, Finanzexperten und Buchhalter helfen Ihnen bei der Organisation der Buchhaltung, der Besteuerung, der Finanzen und der rechtlichen Aspekte Ihres Unternehmens. (Вписать несколько крупных клиентов) und andere Unternehmen haben sich bereits von der Effizienz der Zusammenarbeit mit uns überzeugt. BRAVO CONSULTING - Schnelles und Einfaches Wachstum für Ihr Unternehmen"
  }
  const en = {
    about: "BRAVO CONSULTING is an international consulting agency that provides innovative solutions for your organization development. Best lawyers, financiers and accountants will assist in organizing your company’s accounting, taxation, finance and legal aspects. (Вписать несколько крупных клиентов) and other companies have already ensured the effectiveness of working with us. BRAVO CONSULTING — Fast and Easy Growth for Your Business"
  }
  const ru = {
    about: "«БРАВО КОНСАЛТИНГ» — международное консалтинговое агентство предоставляющее инновационные решения для развития вашей организации. Ведущие юристы, финансисты, бухгалтера помогут организовать порядок в сферах бухгалтерского учета, налогообложения, финансирования и правовыми аспектами. В эффективности работы с нами уже убедились (вписать несколько крупных клиентов) и другие компании. С «БРАВО КОНСАЛТИНГ» масштабировать бизнес быстро и легко. "
  }

  const locales: { [locale: string]: any } = {
    de, en, ru
  }

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      locale: locales[locale],
    },
  }
}