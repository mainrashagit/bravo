import Nav from "@modules/nav/Nav"
import Head from "next/head"
import "simplebar/src/simplebar.css"
import styles from "./index.module.sass"
import SquareCat from "@modules/squareCat/SquareCat"
import Image from "next/image"
import { v4 as uuid } from "uuid"

interface Cat {
  h: string
  subh?: string
  doc?: boolean
}

interface Props {}

export default function Home({}: Props) {
  const cats: Cat[] = [
    {
      h: "Operating Agreement (LLC)",
      doc: true,
    },
    {
      h: "Operating Agreement (LLC)",
      subh: "IT risk management",
    },
    {
      h: "Corporate taxes advisory: Profit Tax, VAT, Assets tax, Social Contributions",
      subh: "preparation and submission of a personal income tax return",
    },
    {
      h: "Funding",
      subh: "Understanding the key reasons in case of financial underperformance",
    },
  ]
  const allCats: Cat[] = [...cats, ...cats, ...cats, ...cats]
  return (
    <>
      <div className={styles.headline}>
        <div className={styles.headline__logo}>
          <div className={styles.headline__img}>
            <Image
              layout={"responsive"}
              width={45}
              height={45}
              src={"/logo.svg"}
              alt="logo"
            />
          </div>
          <div className={styles.headline__bravo}>
            <Image
              layout={"responsive"}
              width={74}
              height={24}
              src={"/bravo.svg"}
              alt="bravo"
            />
          </div>
          <div className={styles.headline__consulting}>
            <Image
              layout={"responsive"}
              width={73}
              height={15}
              src={"/consulting.svg"}
              alt="consulting"
            />
          </div>
        </div>
        <div className={styles.headline__tagline}>
          taglinetaglinetaglinetagline
        </div>
      </div>
      <Nav />
      <div className={styles.list}>
        {allCats.map((cat, i) => {
          return (
            <SquareCat
              heading={cat.h}
              subheading={cat.subh}
              img={"/img/cat1.png"}
              doc={cat.doc}
              key={uuid()}
            />
          )
        })}
      </div>
    </>
  )
}
