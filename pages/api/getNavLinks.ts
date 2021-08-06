import { defaultLocale, fetchAPI, ILocaleText } from "@/lib/api/lang"
import type { NextApiRequest, NextApiResponse } from "next"

interface INavLinks {
  posts: {
    nodes: {
      slug: string
      horizontalNavigationBar: {
        title: ILocaleText
      }
    }[]
  }
}

export type NavLinks = {
  link: string
  title: string
}[]

export async function getNavLinks(locale: string = defaultLocale): Promise<NavLinks> {
  const data = (await fetchAPI(`
  query NavItemPaths {
    posts(where: {categoryName: "nav-bar-item"}) {
      nodes {
        slug
        horizontalNavigationBar {
          title {
            de
            en
            ru
          }
        }
      }
    }
  } 
  `)) as INavLinks

  const res = data.posts.nodes.map((node) => ({
    link: node.slug,
    title: node.horizontalNavigationBar.title[locale],
  })) as NavLinks

  return res
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { locale } = JSON.parse(req.body)
  const content = await getNavLinks(locale)
  res.send(content)
}
