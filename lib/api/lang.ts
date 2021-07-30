const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query: string, { variables }: any = {}) {
  const headers: { [header: string]: string } = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  if (!API_URL) throw new Error("no api url provided for fetching")

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

interface ILocaleText {
  [locale: string]: string
}

export async function getNavTitles(locale?: string) {
  const navTitles: {
    [link: string]: ILocaleText
  } = {
    "consulting": {
      "en": "consulting",
      "ru": "консультация",
      "de": "Beratung"
    },
    "funding": {
      "en": "funding",
      "ru": "финансирование",
      "de": "Finanzierung"
    },
    "company service": {
      "en": "company service",
      "ru": "услуги компании",
      "de": "Unternehmen Dienstleistungen"
    },
    "tax advice": {
      "en": "Taxation tips",
      "ru": "налоговые советы",
      "de": "Tipps zur Besteuerung"
    },
  }

  if (!locale) return navTitles

  const content: { [link: string]: string } = Object.fromEntries(Object.entries(navTitles).map(([key, val]) => [key, val[locale]]))

  return content
}

export async function getNavItemContent(item: string, locale: string) {
  item = item.replace(/_/g, ' ')
  const allNavContent: {
    [item: string]: ILocaleText
  } = {
    "consulting": {
      en: "Financial, legal, tax, accounting ... consulting will help your company easily choose the optimal work direction; calculate the market risks; and find new growth and development opportunities.",
      ru: "Консультации в области финансов, юриспруденции, налогов, бухгалтерии (перечень сфер) помогут вашей компании легко выбрать оптимальный вектор работы, просчитать риски связанные с изменениями рынка, найти новые возможности роста и развития.",
      de: "Die Finanz-, Rechts-, Steuer-, Buchhaltungs- (перечень сфер) beratung wird Ihrem Unternehmen helfen, die optimale Arbeitsrichtung zu wählen, die Marktrisiken zu berechnen und neue Wachstums- und Entwicklungsmöglichkeiten zu finden."
    },
    "funding": {
      en: "We are well-versed in government co-financing programs, grants, and other ways to raise additional budget to the business. With BRAVO CONSULTING you will learn how to deploy the financial flow towards your company.",
      ru: "Мы хорошо ориентируемся в государственных программах софинансирования, грантах и других способах привлечения дополнительного бюджета в бизнес. С помощью «БРАВО КОНСАЛТИНГ» вы узнаете как развернуть финансовый поток в сторону своей компании.",
      de: "Wir kennen uns mit staatlichen Kofinanzierungsprogrammen, Zuschüssen und anderen Möglichkeiten zur Beschaffung zusätzlicher Mittel für das Unternehmen bestens aus. Mit BRAVO CONSULTING lernen Sie, wie Sie den Finanzstrom für Ihr Unternehmen einsetzen können."
    },
    "company service": {
      en: "This page contains the full list of services provided by BRAVO CONSULTING: Business and management consulting Tax consulting Legal services Effective management issues Company registration and liquidation Financial statements Accounting outsourcing Working with bank and accounts Audit ",
      ru: "На этой странице полный перечень услуг «БРАВО КОНСАЛТИНГ»: Консультации по вопросам коммерческой деятельности и управлению Налоговый консалтинг Юридические услуги Вопросы эффективного менеджмента Регистрация и ликвидация компании Финансовая отчетность Бухгалтерский аутсорсинг Работа с банком и счетами Аудит ",
      de: "Diese Seite enthält die vollständige Liste der von BRAVO CONSULTING angebotenen Dienstleistungen: Unternehmens- und Managementberatung Steuerberatung Juristische Dienstleistungen Fragen der effizienten Verwaltung Registrierung und Liquidation von Unternehmen Jahresabschlüsse Outsourcing der Buchhaltung Arbeit mit Banken und Konten Rechnungsprüfung "
    },
    "tax advice": {
      en: "Tax law may seem complicated and bureaucratic, but that shouldn't stop your business from succeeding. Choosing BRAVO CONSULTING, you get a reliable partner, who will develop a suitable strategy, taking into account all the advantages hidden in the tax code. With our help you will learn the taxation features that help to conduct business 100% transparently.",
      ru: "Налоговое законодательство может показаться сложным и бюрократическим, но это не должно мешать вам добиться успеха. Выбирая «БРАВО КОНСАЛТИНГ» вы получаете надежного партнера, который разработает подходящую стратегию с учетом всех преимуществ скрытых в налоговом кодексе. Благодаря нам вы узнаете особенности налогообложения, помогающие вести бизнес 100% прозрачно.",
      de: "Das Steuerrecht mag kompliziert und bürokratisch erscheinen, aber das sollte Ihr Unternehmen nicht davon abhalten, erfolgreich zu sein. Mit BRAVO CONSULTING haben Sie einen zuverlässigen Partner, der für Sie eine geeignete Strategie entwickelt, die alle im Steuerrecht versteckten Vorteile berücksichtigt. Mit unserer Hilfe lernen Sie die steuerlichen Merkmale kennen, die Ihnen helfen, Ihre Geschäfte zu 100% transparent zu führen."
    },
  }

  return allNavContent[item][locale]
}


export async function getSideNavContent(locale: string) {
  const allContent: {
    nav: {
      [item: string]: ILocaleText
    },
    presentation: ILocaleText[]
  } = {
    "nav": {
      "about": {
        en: "About Us",
        ru: "О нас",
        de: ""
      },
      "presentation": {
        en: "Presentation",
        ru: "Презентация",
        de: ""
      },
      "contact": {
        en: "Contact Us",
        ru: "Связаться с нами",
        de: ""
      },
      "work": {
        en: "Work with Us",
        ru: "Вакансии",
        de: ""
      },
      "news": {
        en: "News",
        ru: "Новости",
        de: ""
      },
      "fav": {
        en: "Favorite/Important",
        ru: "Добавить в закладки",
        de: ""
      },
      "search": {
        en: "Search",
        ru: "Искать",
        de: ""
      },
    },
    "presentation": [
      {
        en: "Presentation in PDF format",
        ru: "Презентация в формате PDF",
        de: ""
      },
      {
        en: "File over 100 Mb - continue downloading?",
        ru: "Файл размером более 100 Mb - продолжить скачивание?",
        de: ""
      },
      {
        en: "Download",
        ru: "Скачать",
        de: ""
      },
    ]
  }

  const nav: { [link: string]: string } = Object.fromEntries(Object.entries(allContent.nav).map(([key, val]) => [key, val[locale]]))
  const presentation: string[] = allContent.presentation.map(item => item[locale])

  return { nav, presentation }
}

interface IIndexPage {
  tagline: {
    [lang: string]: string
  }
  docs: {
    title: ILocaleText
    subTitle?: ILocaleText
    doc?: string
    img?: string
  }[]
}

export async function getIndexPage() {
  const content: IIndexPage = {
    tagline: {
      en: "tagline, for instance",
      ru: "тэглиния, например",
      de: ""
    },
    docs: [
      {
        title: {
          en: "Operating Agreement (LLC)",
          ru: "Оперативное Соглашение (ООО)",
          de: ""
        }
      },
      {
        title: {
          en: "Operating Agreement (LLC)",
          ru: "Оперативное Соглашение (ООО)",
          de: ""
        },
        subTitle: {
          en: "IT Risk Management",
          ru: "Управление рисками ИТ",
          de: ""
        }
      },
    ]
  }
  return content
}

interface IAboutPage {
  title: string
  about: ILocaleText
  members: {
    img: string
    name: ILocaleText
    post: ILocaleText
  }[]
}

export async function getAboutUs(locale: string) {
  const content: IAboutPage = {
    title: "Bravo Consulting",
    about: {
      en: "BRAVO CONSULTING is an international consulting agency that provides innovative solutions for your organization development. Best lawyers, financiers and accountants will assist in organizing your company’s accounting, taxation, finance and legal aspects. (Вписать несколько крупных клиентов) and other companies have already ensured the effectiveness of working with us. BRAVO CONSULTING — Fast and Easy Growth for Your Business",
      ru: "«БРАВО КОНСАЛТИНГ» — международное консалтинговое агентство предоставляющее инновационные решения для развития вашей организации. Ведущие юристы, финансисты, бухгалтера помогут организовать порядок в сферах бухгалтерского учета, налогообложения, финансирования и правовыми аспектами. В эффективности работы с нами уже убедились (вписать несколько крупных клиентов) и другие компании. С «БРАВО КОНСАЛТИНГ» масштабировать бизнес быстро и легко.",
      de: "BRAVO CONSULTING ist eine internationale Beratungsagentur, die innovative Lösungen für Ihre Organisationsentwicklung anbietet. Die besten Anwälte, Finanzexperten und Buchhalter helfen Ihnen bei der Organisation der Buchhaltung, der Besteuerung, der Finanzen und der rechtlichen Aspekte Ihres Unternehmens. (Вписать несколько крупных клиентов) und andere Unternehmen haben sich bereits von der Effizienz der Zusammenarbeit mit uns überzeugt. BRAVO CONSULTING - Schnelles und Einfaches Wachstum für Ihr Unternehmen"
    },
    members: [
      {
        img: "",
        name: {
          en: "",
          ru: "",
          de: ""
        },
        post: {
          en: "",
          ru: "",
          de: ""
        }
      }
    ]
  }
  const result = { ...content, about: content.about[locale], members: "" }
  return result
}

type IWorkPage = {
  title: ILocaleText
  location: ILocaleText
  link: string
  locationLink: string
}[]

export function getWorkPage() {
  const posts: IWorkPage = [
    {
      title: {
        en: "",
        ru: "",
        de: ""
      },
      location: {
        en: "",
        ru: "",
        de: ""
      },
      link: "",
      locationLink: ""
    }
  ]
}

type INews = {
  title: ILocaleText
  subsection: ILocaleText
  brief: ILocaleText
  date: string
  comments: number
  views: Number
}[]

export function getNews() {
  const news: INews = [
    {
      title: {
        en: "",
        ru: "",
        de: ""
      },
      subsection: {
        en: "",
        ru: "",
        de: ""
      },
      brief: {
        en: "",
        ru: "",
        de: "s"
      },
      date: "",
      comments: 0,
      views: 0
    }
  ]
  return news
}

/*
  global
    nav+
      titles+
      title+
        content+
    subnav+
      titles+
      presentation+ (add presentation file later)

  index+
    tagline+
    doc+
      img+
      link+
      title+
      subtitle?+
  about_us+
    about+
    members+
      img+
      name+
      post+
  work_with_us+
    post+
      title+
      location+
      link+
      locationLink+

  news+
    item+
      subsection+
      title+
      brief+
      date+
*/