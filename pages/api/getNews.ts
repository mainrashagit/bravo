import { defaultLocale, fetchAPI, ILocaleText } from "@/lib/api/lang"
import type { NextApiRequest, NextApiResponse } from "next"

interface INews {
  posts: {
    nodes: {
      newspost: {
        date: ILocaleText
        subsection: ILocaleText
        title: ILocaleText
        text: ILocaleText
        image: {
          sourceUrl: string
          srcSet: string
          altText: string
        }
      }
      slug: string
    }[]
  }
}

export type News = {
  title: string
  subsection: string
  date: string
  text: string
  link: string
  image: {
    sourceUrl: string
    srcSet: string
    altText: string
  }
}[]

export async function getNews(locale: string = defaultLocale): Promise<News> {
  const data = (await fetchAPI(`
  query NewsPosts {
    posts(where: {categoryName: "news"}) {
      nodes {
        newspost {
          date {
            ru
            en
            de
          }
          subsection {
            de
            en
            ru
          }
          title {
            ru
            en
            de
          }
          text {
            de
            en
            ru
          }
          image {
            altText
            sourceUrl
            srcSet
          }
        }
        slug
      }
    }
  }
  `)) as INews

  const res: News = data.posts.nodes.map(({ newspost: { title, date, image, subsection, text }, slug }) => ({
    title: title[locale],
    date: date[locale],
    image,
    subsection: subsection[locale],
    text: text[locale],
    link: slug,
  }))
  return res
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { locale } = JSON.parse(req.body)
  const content = await getNews(locale)
  res.send(content)
}
