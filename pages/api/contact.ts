import { fetchAPI } from "@/lib/api/lang"
import type { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

interface IEmailInfo {
  post: {
    verticalNavigationBar: {
      contactUs: {
        contactForm: {
          burnerEmail: {
            email: string
            password: string
            receiverEmail: string
          }
        }
      }
    }
  }
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as {
    [key: string]: string
  }
  const emailInfoRes = (await fetchAPI(`
  query EmailInfo {
    post(id: "38", idType: DATABASE_ID) {
      verticalNavigationBar {
        contactUs {
          contactForm {
            burnerEmail {
              email
              password
              receiverEmail
            }
          }
        }
      }
    }
  }
  `)) as IEmailInfo
  const emailInfo = emailInfoRes.post.verticalNavigationBar.contactUs.contactForm.burnerEmail
  const mailData = {
    to: emailInfo.receiverEmail,
    subject: `Message from ${req.body.email}`,
    text: Object.entries(req.body)
      .map(([key, val]) => `${key.toUpperCase()}: ${val}\n`)
      .join(""),
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailInfo.email,
      pass: emailInfo.password,
    },
  })
  const info = await transporter.sendMail(mailData)
  res.status(200).send({})
}
