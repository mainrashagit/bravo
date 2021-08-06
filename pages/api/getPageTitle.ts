import { defaultLocale, fetchAPI, ILocaleText } from "@/lib/api/lang"
import type { NextApiRequest, NextApiResponse } from "next"

interface ITitle {
  [type: string]: {
    pageTitle: {
      pageTitle: ILocaleText
    }
  }
}

export type Title = string

export async function getTitle(locale: string = defaultLocale, id: string = "", post: boolean = false): Promise<Title> {
  const indexQuery = `
  query pageTitle {
    page(id: "index", idType: URI) {
      pageTitle {
        pageTitle {
          ru
          en
          de
        }
      }
    }
  }  
  `
  const query = `
  query pageTitle {
    ${post ? "post" : "page"}(id: "${id.length > 0 ? id : "index"}", idType: URI) {
      pageTitle {
        pageTitle {
          ru
          en
          de
        }
      }
    }
  }  
  `
  const data = (await fetchAPI(query)) as ITitle
  const index = (await fetchAPI(indexQuery)) as ITitle
  const page = data[post ? "post" : "page"]
  const content = page.pageTitle.pageTitle[locale] ?? index.page.pageTitle.pageTitle[locale]
  return content
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id, locale, post } = JSON.parse(req.body)
  const content = await getTitle(locale, id, post)
  res.send(content)
}
