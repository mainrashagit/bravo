import Nav from "@modules/nav/Nav"
import styles from "./aboutus.module.sass"
import Member from "@modules/member/Member"
import Image from "next/image"
import { v4 as uuid } from "uuid"
import { useEffect, useRef, useState } from "react"
import SimpleBar from "simplebar-react"
import "simplebar/src/simplebar.css"

interface Props {}

const AboutUs: React.FC<Props> = ({}) => {
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
      <Member name={name} post={post} />
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
    console.log(media)
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
              optio maxime maiores animi? Harum maxime iusto eius totam magnam
              veritatis eveniet id sit nemo aspernatur consequatur, ipsa qui
              itaque. Exercitationem quae harum vero voluptatibus nihil ipsam
              odit rerum dolores aliquid, vel enim alias eos necessitatibus
              reiciendis soluta voluptatum amet ea nemo sunt corrupti at hic
              maxime facilis perferendis. Itaque, ipsa doloribus dolorum enim
              accusantium voluptates vero voluptatibus amet dolorem cumque sint,
              quisquam consequuntur. Beatae aperiam optio dolor necessitatibus
              non harum veniam, reiciendis tempora impedit sunt? Iste
              praesentium quos consectetur facere aliquam voluptate numquam
              dolor ex, nostrum est at pariatur assumenda?
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
            <SimpleBar>
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
