import { fetchAPI } from "@/lib/api/lang"
import type { NextApiRequest, NextApiResponse } from "next"

interface IBg {
  page: {
    indexPage: {
      backgroundImage: {
        srcSet: string
        sourceUrl: string
      }
    }
  }
}

interface IBgAbout {
  page: {
    about: {
      backgroundImage: {
        srcSet: string
        sourceUrl: string
      }
    }
  }
}

export type Bg = {
  srcSet: string
  sourceUrl: string
}

export async function getBgByPage(about: boolean = false): Promise<Bg> {
  const indexBgQuery = `
  query IndexPage {
    page(id: "116", idType: DATABASE_ID) {
      indexPage {
        backgroundImage {
          sourceUrl
          srcSet
        }
      }
    }
  }
  `
  const aboutPageBgQuery = `
  query AboutPage {
    page(id: "372", idType: DATABASE_ID) {
      about {
        backgroundImage {
          sourceUrl
          srcSet
        }
      }
    }
  }
  `

  if (about) {
    const data = await fetchAPI(aboutPageBgQuery) as IBgAbout
    return data.page.about.backgroundImage
  }

  const data = (await fetchAPI(indexBgQuery)) as IBg
  

  return data.page.indexPage.backgroundImage
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body)
  const content = await getBgByPage(body.bool)
  res.send(content)
}