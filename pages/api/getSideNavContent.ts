import { defaultLocale, fetchAPI, ILocale, ILocaleText } from "@/lib/api/lang"
import type { NextApiRequest, NextApiResponse } from "next"

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
      // @ts-ignore
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
      // @ts-ignore
      title: res.presentation[loc],
      downloadButtonText: res.presentation.downloadButtonText[loc],
      presentationFile: res.presentation.presentationFile.sourceUrl,
      presentationText: res.presentation.presentationText[loc],
      presentationTitle: res.presentation.presentationTitle[loc],
    },
    searchIcon: res.search.searchIcon,
  }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { locale } = JSON.parse(req.body)
  const content = await getSideNavContent(locale)
  res.send(content)
}
