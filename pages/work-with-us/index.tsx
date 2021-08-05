import styles from "./workwithus.module.sass"
import Post from "@modules/post/Post"
import Nav from "@modules/nav/Nav"
import { v4 as uuid } from "uuid"
import { getPositions, Positions } from "@/lib/api/lang"
import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

interface Props {
  positions: Positions
}

const WorkWithUs: React.FC<Props> = (
  {
    /* positions */
  }
) => {
  const posts = [
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
  ]
  const { locale } = useRouter()
  const [posElements, setPosElements] = useState<Positions>()
  useEffect(() => {
    getPositions(locale).then((res) => setPosElements(res))

    return () => {}
  }, [])
  return (
    <>
      <Nav />
      <ul className={styles.posts}>
        {posElements?.map(({ title, loc, resBtn }, i) => (
          <li className={styles.posts__post} key={uuid()}>
            <Post title={title} location={loc} resBtn={resBtn} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default WorkWithUs

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { locale, defaultLocale } = context
//   const loc = locale ?? (defaultLocale as string)

//   const positions = await getPositions(loc)

//   return { props: { positions } }
// }
