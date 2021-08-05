const API_URL = "https://bravo.mainrasha.com/graphql"
const defaultLocale = "en"

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

interface ILocaleText {
  [locale: string]: string
}

type ILocale = "en" | "ru" | "de"

interface ISideNavContent {
  post: {
    verticalNavigationBar: {
      copyright: string
      aboutUs: ILocaleText
      contactUs: {
        en: string
        ru: string
        de: string
        contactForm: {
          formFields: {
            formField: ILocaleText
          }[]
          media: {
            link: string
            image: {
              altText: string
              sourceUrl: string
            }
          }[]
          submitButton: ILocaleText
          submitSuccessMessage: ILocaleText
          submitErrorMessage: ILocaleText
        }
      }
      favoriteimportant: ILocaleText
      logo: {
        altText: string
        sourceUrl: string
      }
      media: {
        link: string
        image: {
          sourceUrl: string
          altText: string
        }
      }[]
      news: ILocaleText
      presentation: {
        en: string
        ru: string
        de: string
        downloadButtonText: ILocaleText
        presentationFile: {
          sourceUrl: string
        }
        presentationText: ILocaleText
        presentationTitle: ILocaleText
      }
      search: {
        en: string
        ru: string
        de: string
        searchIcon: {
          altText: string
          sourceUrl: string
        }
      }
      workWithUs: ILocaleText
    }
  }
}

export type SideNavContent = {
  copyright: string
  aboutUs: string
  contactUs: {
    title: string
    contactForm: {
      formFields: string[]
      media: {
        link: string
        image: {
          altText: string
          sourceUrl: string
        }
      }[]
      submitButton: string
      success: string
      error: string
    }
  }
  favoriteimportant: string
  logo: {
    altText: string
    sourceUrl: string
  }
  media: {
    link: string
    image: {
      sourceUrl: string
      altText: string
    }
  }[]
  news: string
  presentation: {
    title: string
    downloadButtonText: string
    presentationFile: string
    presentationText: string
    presentationTitle: string
  }
  search: string
  searchIcon: {
    altText: string
    sourceUrl: string
  }
  workWithUs: string
}

export async function getSideNavContent(locale: string = defaultLocale): Promise<SideNavContent> {
  const data = (await fetchAPI(`
  query VerticalNavigationBar {
    post(id: "38", idType: DATABASE_ID) {
      verticalNavigationBar {
        copyright
        aboutUs {
          en
          de
          ru
        }
        contactUs {
          de
          en
          ru
          contactForm {
            formFields {
              formField {
                de
                en
                ru
              }
            }
            media {
              link
              image {
                altText
                sourceUrl
              }
            }
            submitButton {
              de
              en
              ru
            }
            submitSuccessMessage {
              de
              en
              ru
            }
            submitErrorMessage {
              de
              en
              ru
            }
          }
        }
        favoriteimportant {
          en
          de
          ru
        }
        logo {
          altText
          sourceUrl
        }
        media {
          link
          image {
            sourceUrl
            altText
          }
        }
        news {
          ru
          en
          de
        }
        presentation {
          ru
          en
          de
          downloadButtonText {
            de
            en
            ru
          }
          presentationFile {
            sourceUrl
          }
          presentationText {
            de
            en
            ru
          }
          presentationTitle {
            ru
            en
            de
          }
        }
        search {
          ru
          en
          de
          searchIcon {
            altText
            sourceUrl
          }
        }
        workWithUs {
          ru
          en
          de
        }
      }
    }
  }
`)) as ISideNavContent

  const loc = locale as ILocale

  const res = data.post.verticalNavigationBar

  return {
    copyright: res.copyright,
    aboutUs: res.aboutUs[locale],
    favoriteimportant: res.favoriteimportant[locale],
    logo: res.logo,
    media: res.media,
    news: res.news[locale],
    // @ts-ignore
    search: res.search[locale],
    workWithUs: res.workWithUs[locale],
    contactUs: {
      title: res.contactUs[loc],
      ...res.contactUs,
      contactForm: {
        media: res.contactUs.contactForm.media,
        formFields: res.contactUs.contactForm.formFields.map((field) => field.formField[loc]),
        submitButton: res.contactUs.contactForm.submitButton[loc],
        success: res.contactUs.contactForm.submitSuccessMessage[loc],
        error: res.contactUs.contactForm.submitErrorMessage[loc],
      },
    },
    presentation: {
      title: res.presentation[loc],
      downloadButtonText: res.presentation.downloadButtonText[loc],
      presentationFile: res.presentation.presentationFile.sourceUrl,
      presentationText: res.presentation.presentationText[loc],
      presentationTitle: res.presentation.presentationTitle[loc],
    },
    searchIcon: res.search.searchIcon,
  }
}

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


// interface ITitle {

// }

// type Title = string

// export async function getTitle(id: string): Promise<Title> {
//   const data = fetchAPI(`
  
//   `)
// }