import styles from "./doc.module.sass"
import Nav from "@modules/nav/Nav"
import { ParsedUrlQuery } from "querystring"
import { GetStaticPaths, GetStaticProps } from "next"
import { DocPage, getDocPageBySlug, getDocPagePaths } from "@/lib/api/lang"
import Doc from "@modules/doc"

interface Props {
  id: string
  content: DocPage
}

const Document: React.FC<Props> = ({ id, content: { date, text, title } }) => {
  return (
    <>
      <Nav />
      <Doc title={title} text={text} date={date} />
    </>
  )
}

export default Document

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async ({ locales, defaultLocale }) => {
  const loc = locales ?? ([defaultLocale] as string[])
  const paths = await getDocPagePaths(loc)
  return { paths, fallback: "blocking", revalidate: 10}
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams
  const { locale, defaultLocale } = context
  const loc = locale ?? (defaultLocale as string)

  const content = await getDocPageBySlug(id, loc)

  return { props: { id, content } }
}
