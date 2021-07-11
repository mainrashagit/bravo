import Nav from "@modules/nav/Nav"
import Head from "next/head"
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"
import styles from "./index.module.sass"
import SquareCat from "@modules/squareCat/SquareCat"
import Cat1 from "@img/cat1.png"

interface Cat {
  h: string
  subh?: string
  doc?: boolean
}

interface Props {
  image: string
}

export default function Home({ image }: Props) {
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
    <SimpleBarReact>
      <div className={styles.headline}>
        <div className={styles.headline__logo}>
          <img className={styles.headline__img} src={"/logo.svg"} alt="logo" />
          <img
            className={styles.headline__bravo}
            src={"/bravo.svg"}
            alt="bravo"
          />
          <img
            className={styles.headline__consulting}
            src={"/consulting.svg"}
            alt="consulting"
          />
        </div>
        <div className={styles.headline__tagline}>
          taglinetaglinetaglinetagline
        </div>
      </div>
      <Nav />
      <div className={styles.list}>
        {allCats.map((cat, i) => {
          i = i + 2
          if (i > 3) i = Math.ceil(i % 4) + 1
          return (
            <SquareCat
              heading={cat.h}
              subheading={cat.subh}
              img={Cat1.src}
              doc={cat.doc}
              key={`cat-${Math.random() * i}`}
            />
          )
        })}
      </div>
    </SimpleBarReact>
  )
}
