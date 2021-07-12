import Nav from "@modules/nav/Nav"
import styles from "./aboutus.module.sass"
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"
import Member from "@modules/member/Member"
import Image from "next/image"
import { v4 as uuid } from "uuid"

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
  ]
  const teamItems = team.map(({ name, post }, i) => (
    <li className={styles.team__member} key={uuid()}>
      <Member name={name} post={post} />
    </li>
  ))
  return (
    <div className={styles.page}>
      <Nav style={{ position: "absolute" }} />
      <SimpleBarReact>
        <div className={styles.content}>
          <div className={styles.about}>
            <div className={styles.about__left}>
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
            <div className={styles.about__right}>
              <div className={styles.about__title}>Bravo Consulting</div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
                optio maxime maiores animi? Harum maxime iusto eius totam magnam
                veritatis eveniet id sit nemo aspernatur consequatur, ipsa qui
                itaque. Exercitationem quae harum vero voluptatibus nihil ipsam
                odit rerum dolores aliquid, vel enim alias eos necessitatibus
                reiciendis soluta voluptatum amet ea nemo sunt corrupti at hic
                maxime facilis perferendis. Itaque, ipsa doloribus dolorum enim
                accusantium voluptates vero voluptatibus amet dolorem cumque
                sint, quisquam consequuntur. Beatae aperiam optio dolor
                necessitatibus non harum veniam, reiciendis tempora impedit
                sunt? Iste praesentium quos consectetur facere aliquam voluptate
                numquam dolor ex, nostrum est at pariatur assumenda?
              </p>
            </div>
          </div>
          <div className={styles.team}>
            <div className={styles.team__title}>Our Team</div>
            <ul className={styles.team__members}>{teamItems}</ul>
          </div>
        </div>
      </SimpleBarReact>
    </div>
  )
}

export default AboutUs
