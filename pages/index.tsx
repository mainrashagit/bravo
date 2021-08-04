import Nav from "@modules/nav/Nav"
import Head from "next/head"
import styles from "./index.module.sass"
import SquareCat from "@modules/squareCat/SquareCat"
import Image from "next/image"
import { v4 as uuid } from "uuid"
import { GetStaticProps } from "next"
import { DocPageLinks, getDocPageLinks, getIndexPageContent, getNews, IndexPageContent, News } from "@/lib/api/lang"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

interface Props {
  docPages: DocPageLinks
  content: IndexPageContent
}

export default function Home({ /* docPages, */ content }: Props) {
  
  const { locale } = useRouter()
  const [docPages, setDocPages] = useState<DocPageLinks>()
  useEffect(() => {
    
    const getNewsPosts = async () => {
      const items = await getDocPageLinks(locale)
      setDocPages(items)
    }
    getNewsPosts()
    return () => {
      
    }
  }, [])
  return (
    <>
      <Head>
        <title>{content.title}</title>
      </Head>
      <div className={styles.headline}>
        <div className={styles.headline__logo}>
          <img className={styles.headline__logoImg} src={content.logo?.sourceUrl} alt={content.logo?.altText} />
        </div>
        <div className={styles.headline__tagline}>{content.tagline}</div>
      </div>
      <Nav style={{ position: "sticky" }} />
      <div className={styles.list}>
        {docPages?.map(({ title, link, doc, subtitle, image }, i) => {
          return <SquareCat heading={title} subheading={subtitle ?? undefined} img={image?.sourceUrl} doc={doc ?? undefined} key={uuid()} link={`/docs/${link}`} />
        })}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context
  const loc = locale ?? (defaultLocale as string)

  const docPages = await getDocPageLinks(loc)
  const content = await getIndexPageContent(loc)

  return { props: { docPages, content } }
}
