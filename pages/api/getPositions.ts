import { defaultLocale, fetchAPI, ILocaleText } from "@/lib/api/lang"
import type { NextApiRequest, NextApiResponse } from "next"

interface IPoisitions {
  posts: {
    nodes: {
      position: {
        location: ILocaleText
        title: ILocaleText
        respondButton: ILocaleText
      }
    }[]
  }
}

export type Positions = {
  loc: string
  title: string
  resBtn: string
}[]

export async function getPositions(locale: string = defaultLocale): Promise<Positions> {
  const data = (await fetchAPI(`
  query DocPageLinks {
    posts(where: {categoryName: "positions"}) {
      nodes {
        position {
          location {
            de
            en
            ru
          }
          title {
            de
            en
            ru
          }
          respondButton {
            de
            en
            ru
          }
        }
      }
    }
  }
  `)) as IPoisitions

  const res = data.posts.nodes.map(({ position: { location, respondButton, title } }) => ({ loc: location[locale], title: title[locale], resBtn: respondButton[locale] })) as Positions
  return res
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { locale } = JSON.parse(req.body)
  const content = await getPositions(locale)
  res.send(content)
}
