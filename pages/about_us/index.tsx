import Nav from "@modules/nav/Nav"
import styles from "./aboutus.module.sass"
import Member from "@modules/member/Member"
import Image from "next/image"
import { v4 as uuid } from "uuid"
import { useEffect, useRef, useState } from "react"
import SimpleBar from "simplebar-react"
import "simplebar/src/simplebar.css"
import { getAboutUs } from "../../lib/api/lang"

interface Props {
  content: {
    about: string;
    members: string;
    title: string
  }
}

const AboutUs: React.FC<Props> = ({ content: { about } }) => {
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
              {about}
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
            <SimpleBar forceVisible={true} style={{ maxHeight: "100vh" }}>
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

  const content = await getAboutUs(locale)
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      content,
    },
  }
}