const API_URL = "https://bravo.mainrasha.com/graphql"
const defaultLocale = "en"

async function fetchAPI(query: string, { variables }: any = {}) {
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
        presentationFile: string
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
      },
    },
    presentation: {
      title: res.presentation[loc],
      downloadButtonText: res.presentation.downloadButtonText[loc],
      presentationFile: res.presentation.presentationFile,
      presentationText: res.presentation.presentationText[loc],
      presentationTitle: res.presentation.presentationTitle[loc],
    },
    searchIcon: res.search.searchIcon
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
    }
    pageTitle: {
      pageTitle:ILocaleText
    }
  }
}

export type IndexPageContent = {
  logo: {
    altText: string
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

  const res = { ...data.page.indexPage, tagline: data.page.indexPage.tagline[locale], title: data.page.pageTitle.pageTitle[locale] }
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
  post: {
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
    post(id: "241", idType: DATABASE_ID) {
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
    title: data.post.about.title[locale],
    text: data.post.about.text[locale],
    team: data.post.about.team.map(({ name, position, image }) => ({
      name: name[locale],
      position: position[locale],
      image,
    })),
    logo: data.post.about.logo
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

export async function getNavItemContent(item: string, locale: string) {
  item = item.replace(/_/g, " ")
  const allNavContent: {
    [item: string]: ILocaleText
  } = {
    consulting: {
      en: "Financial, legal, tax, accounting ... consulting will help your company easily choose the optimal work direction; calculate the market risks; and find new growth and development opportunities.",
      ru: "Консультации в области финансов, юриспруденции, налогов, бухгалтерии (перечень сфер) помогут вашей компании легко выбрать оптимальный вектор работы, просчитать риски связанные с изменениями рынка, найти новые возможности роста и развития.",
      de: "Die Finanz-, Rechts-, Steuer-, Buchhaltungs- (перечень сфер) beratung wird Ihrem Unternehmen helfen, die optimale Arbeitsrichtung zu wählen, die Marktrisiken zu berechnen und neue Wachstums- und Entwicklungsmöglichkeiten zu finden.",
    },
    funding: {
      en: "We are well-versed in government co-financing programs, grants, and other ways to raise additional budget to the business. With BRAVO CONSULTING you will learn how to deploy the financial flow towards your company.",
      ru: "Мы хорошо ориентируемся в государственных программах софинансирования, грантах и других способах привлечения дополнительного бюджета в бизнес. С помощью «БРАВО КОНСАЛТИНГ» вы узнаете как развернуть финансовый поток в сторону своей компании.",
      de: "Wir kennen uns mit staatlichen Kofinanzierungsprogrammen, Zuschüssen und anderen Möglichkeiten zur Beschaffung zusätzlicher Mittel für das Unternehmen bestens aus. Mit BRAVO CONSULTING lernen Sie, wie Sie den Finanzstrom für Ihr Unternehmen einsetzen können.",
    },
    "company service": {
      en: "This page contains the full list of services provided by BRAVO CONSULTING: Business and management consulting Tax consulting Legal services Effective management issues Company registration and liquidation Financial statements Accounting outsourcing Working with bank and accounts Audit ",
      ru: "На этой странице полный перечень услуг «БРАВО КОНСАЛТИНГ»: Консультации по вопросам коммерческой деятельности и управлению Налоговый консалтинг Юридические услуги Вопросы эффективного менеджмента Регистрация и ликвидация компании Финансовая отчетность Бухгалтерский аутсорсинг Работа с банком и счетами Аудит ",
      de: "Diese Seite enthält die vollständige Liste der von BRAVO CONSULTING angebotenen Dienstleistungen: Unternehmens- und Managementberatung Steuerberatung Juristische Dienstleistungen Fragen der effizienten Verwaltung Registrierung und Liquidation von Unternehmen Jahresabschlüsse Outsourcing der Buchhaltung Arbeit mit Banken und Konten Rechnungsprüfung ",
    },
    "tax advice": {
      en: "Tax law may seem complicated and bureaucratic, but that shouldn't stop your business from succeeding. Choosing BRAVO CONSULTING, you get a reliable partner, who will develop a suitable strategy, taking into account all the advantages hidden in the tax code. With our help you will learn the taxation features that help to conduct business 100% transparently.",
      ru: "Налоговое законодательство может показаться сложным и бюрократическим, но это не должно мешать вам добиться успеха. Выбирая «БРАВО КОНСАЛТИНГ» вы получаете надежного партнера, который разработает подходящую стратегию с учетом всех преимуществ скрытых в налоговом кодексе. Благодаря нам вы узнаете особенности налогообложения, помогающие вести бизнес 100% прозрачно.",
      de: "Das Steuerrecht mag kompliziert und bürokratisch erscheinen, aber das sollte Ihr Unternehmen nicht davon abhalten, erfolgreich zu sein. Mit BRAVO CONSULTING haben Sie einen zuverlässigen Partner, der für Sie eine geeignete Strategie entwickelt, die alle im Steuerrecht versteckten Vorteile berücksichtigt. Mit unserer Hilfe lernen Sie die steuerlichen Merkmale kennen, die Ihnen helfen, Ihre Geschäfte zu 100% transparent zu führen.",
    },
  }

  return allNavContent[item][locale]
}

interface IBg {
  posts: {
    nodes: {
      backgroundImage: {
        image: { srcSet: string; sourceUrl: string; altText: string }
        linkedPageTitle: string | null
      }
    }[]
  }
}

export type Bg = {
  srcSet: string
  sourceUrl: string
  altText: string
}

export async function getBgByPageSlug(id: string): Promise<Bg> {
  const data = (await fetchAPI(`
  query BackgroundImages {
    posts(where: {categoryName: "background-images"}) {
      nodes {
        backgroundImage {
          image {
            srcSet
            sourceUrl
            altText
          }
          linkedPageTitle
        }
      }
    }
  }
  `)) as IBg
  const main = data.posts.nodes.find((node) => node.backgroundImage.linkedPageTitle === null)?.backgroundImage.image ?? {
    srcSet: "",
    sourceUrl: "",
    altText: ""
  }

  return main
}
