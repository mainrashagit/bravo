const API_URL = process.env.WORDPRESS_API_URL
export const defaultLocale = "en"

export async function fetchAPI(query: string, { variables }: any = {}) {
  const headers: { [header: string]: string } = { "Content-Type": "application/json" }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  if (!API_URL) throw new Error("no api url provided for fetching")

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }
  return json.data
}

export interface ILocaleText {
  [locale: string]: string
}

export type ILocale = "en" | "ru" | "de"

interface IIndexPageContent {
  page: {
    indexPage: {
      logo: {
        altText: string
        sourceUrl: string
      }
      tagline: ILocaleText
      backgroundImage: {
        sourceUrl: string
        srcSet: string
      }
    }
    pageTitle: {
      pageTitle: ILocaleText
    }
  }
}

export type IndexPageContent = {
  logo: {
    altText: string
    sourceUrl: string
  }
  bg: {
    srcSet: string
    sourceUrl: string
  }
  tagline: string
  title: string
}

export async function getIndexPageContent(locale: string = defaultLocale): Promise<IndexPageContent> {
  const data = (await fetchAPI(`
  query IndexPage {
    page(id: "116", idType: DATABASE_ID) {
      indexPage {
        logo {
          altText
          sourceUrl
        }
        tagline {
          de
          en
          ru
        }
        backgroundImage {
          sourceUrl
          srcSet
        }
      }
      pageTitle {
        pageTitle {
          de
          en
          ru
        }
      }
    }
  }
  `)) as IIndexPageContent

  const res = { ...data.page.indexPage, tagline: data.page.indexPage.tagline[locale], title: data.page.pageTitle.pageTitle[locale], bg: data.page.indexPage.backgroundImage }
  return res
}

interface IDocPage {
  post: {
    docPage: {
      date: ILocaleText
      text: ILocaleText
      title: ILocaleText
    }
  }
}

export type DocPage = {
  title: string
  date: string
  text: string
}

export async function getDocPageBySlug(id: string, locale: string = defaultLocale): Promise<DocPage> {
  const data = (await fetchAPI(`
  query DocPageBySlug {
    post(id: "${id}", idType: SLUG) {
      docPage {
        date {
          de
          en
          ru
        }
        text {
          ru
          en
          de
        }
        title {
          de
          en
          ru
        }
      }
    }
  }  
  `)) as IDocPage
  return Object.fromEntries(Object.entries(data.post.docPage).map(([k, v]) => [k, v[locale]])) as DocPage
}

interface IDocPagePaths {
  posts: {
    nodes: {
      slug: string
    }[]
  }
}

type DocPagePaths = {
  params: {
    id: string
  }
  locale: string
}[]

export async function getDocPagePaths(locales: string[]): Promise<DocPagePaths> {
  const data = (await fetchAPI(`
  query DocPagePaths {
    posts(where: {categoryName: "docs"}) {
      nodes {
        slug
      }
    }
  }
  
  `)) as IDocPagePaths

  const paths = locales.map((locale) => data.posts.nodes.map(({ slug }) => ({ params: { id: slug }, locale }))).flat(1)
  return paths
}

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

  const res: DocPageLinks = data.posts.nodes.map((node) => ({
    title: node.docPage.title[locale],
    subtitle: node.docPage.subtitle[locale],
    image: node.docPage.image,
    link: node.slug,
  }))
  return res
}

interface INewsPaths {
  posts: {
    nodes: {
      slug: string
    }[]
  }
}

type NewsPaths = {
  params: {
    id: string
  }
  locale: string
}[]

export async function getNewsPaths(locales: string[]): Promise<NewsPaths> {
  const data = (await fetchAPI(`
  query NewsPaths {
    posts(where: {categoryName: "news"}) {
      nodes {
        slug
      }
    }
  }  
  `)) as INewsPaths
  const paths = locales.map((locale) => data.posts.nodes.map(({ slug }) => ({ params: { id: slug }, locale }))).flat(1)
  return paths
}

interface INewsPost {
  post: {
    newspost: {
      date: ILocaleText
      subsection: ILocaleText
      text: ILocaleText
      title: ILocaleText
    }
  }
}

export type NewsPost = {
  date: string
  subsection: string
  text: string
  title: string
}

export async function getNewsPostBySlug(id: string, locale: string = defaultLocale): Promise<NewsPost> {
  const data = (await fetchAPI(`
  query NewsPost {
    post(id: "${id}", idType: SLUG) {
      newspost {
        date {
          de
          en
          ru
        }
        subsection {
          de
          en
          ru
        }
        text {
          de
          en
          ru
        }
        title {
          de
          en
          ru
        }
      }
    }
  }  
  `)) as INewsPost

  return Object.fromEntries(Object.entries(data.post.newspost).map(([k, v]) => [k, v[locale]])) as NewsPost
}

interface IAboutPage {
  page: {
    about: {
      title: ILocaleText
      text: ILocaleText
      team: {
        name: ILocaleText
        position: ILocaleText
        image: {
          altText: string
          srcSet: string
          sourceUrl: string
        }
      }[]
      logo: {
        sourceUrl: string
        altText: string
      }
    }
  }
}

export type AboutPage = {
  title: string
  text: string
  team: {
    name: string
    position: string
    image: {
      altText: string
      srcSet: string
      sourceUrl: string
    }
  }[]
  logo: {
    sourceUrl: string
    altText: string
  }
}

export async function getAboutPage(locale: string = defaultLocale): Promise<AboutPage> {
  const data = (await fetchAPI(`
  query AboutPage {
    page(id: "372", idType: DATABASE_ID) {
      about {
        team {
          name {
            de
            en
            ru
          }
          position {
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
        text {
          de
          en
          ru
        }
        title {
          de
          en
          ru
        }
        logo {
          sourceUrl
          altText
        }
      }
    }
  }
  
  `)) as IAboutPage
  const res = {
    title: data.page.about.title[locale],
    text: data.page.about.text[locale],
    team: data.page.about.team.map(({ name, position, image }) => ({
      name: name[locale],
      position: position[locale],
      image,
    })),
    logo: data.page.about.logo,
  } as AboutPage
  return res
}

interface INavPaths {
  posts: {
    nodes: {
      slug: string
    }[]
  }
}

type NavPaths = {
  params: {
    sub: string
  }
  locale: string
}[]

export async function getNavPaths(locales: string[]): Promise<NavPaths> {
  const data = (await fetchAPI(`
  query NavItemPaths {
    posts(where: {categoryName: "nav-bar-item"}) {
      nodes {
        slug
      }
    }
  }
  `)) as INavPaths
  const paths = locales.map((locale) => data.posts.nodes.map(({ slug }) => ({ params: { sub: slug }, locale }))).flat(1)
  return paths
}

interface INavContent {
  post: {
    horizontalNavigationBar: {
      items: {
        item: ILocaleText
      }[]
    }
  }
}

export type NavContent = string[]

export async function getNavContentBySlug(id: string, locale: string = defaultLocale): Promise<NavContent> {
  const data = (await fetchAPI(`
  query NavItemContent {
    post(id: "${id}", idType: SLUG) {
      horizontalNavigationBar {
        items {
          item {
            de
            en
            ru
          }
        }
      }
      slug
    }
  }
  `)) as INavContent
  const res = data.post.horizontalNavigationBar.items.map((item) => item.item[locale])
  return res
}
