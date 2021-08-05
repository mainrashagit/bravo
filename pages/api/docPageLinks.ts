import { fetchAPI, ILocaleText, defaultLocale } from "@/lib/api/lang"
import type { NextApiRequest, NextApiResponse } from "next"

interface IDocPageLinks {
  posts: {
    nodes: {
      slug: string
      docPage: {
        title: ILocaleText
        subtitle: ILocaleText
        image: {
          altText: string
          srcSet: string
          sourceUrl: string
        }
      }
    }[]
  }
}

export type DocPageLinks = {
  title: string
  doc?: boolean | null
  subtitle?: string | null
  link: string
  image: {
    altText: string
    srcSet: string
    sourceUrl: string
  }
}[]

export async function getDocPageLinks(locale: string = defaultLocale): Promise<DocPageLinks> {
  const data = (await fetchAPI(`
  query DocPageLinks {
    posts(where: {categoryName: "docs"}) {
      nodes {
        slug
        docPage {
          title {
            ru
            en
            de
          }
          subtitle {
            ru
            en
            de
          }
          image {
            altText
            srcSet
            sourceUrl
          }
        }
      }
    }
  }
  
  `)) as IDocPageLinks

  const content: DocPageLinks = data.posts.nodes.map((node) => ({
    title: node.docPage.title[locale],
    subtitle: node.docPage.subtitle[locale],
    image: node.docPage.image,
    link: node.slug,
  }))
  return content
}


export default async function (req: NextApiRequest, res: NextApiResponse) {
  const content = await getDocPageLinks(req.body)
  res.send(content)
}