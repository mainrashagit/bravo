import styles from "./contactus.module.sass"
import { SideNavContent } from "@/lib/api/lang"
import { v4 as uuid } from "uuid"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"

interface Props {
  setContact: React.Dispatch<React.SetStateAction<boolean>>
  content?: SideNavContent["contactUs"]
}

interface FormValues {
  [key: string]: string
}

const ContactUs: React.FC<Props> = ({ setContact, content }) => {
  const initialValues: FormValues = Object.fromEntries(content?.contactForm?.formFields.map((field) => [field.toLowerCase(), ""]) ?? [])
  const [message, setMessage] = useState<string>()
  const close = () => {
    setContact(false)
  }
  const stopProp = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  const media = content?.contactForm?.media.map((item) => (
    <li className={styles.form__link} key={uuid()}>
      <a href={item?.link} target="_blank">
        <img src={item?.image?.sourceUrl} alt={item?.image?.altText} />
      </a>
    </li>
  ))
  const formFields = content?.contactForm?.formFields.map((field) => <Field className={styles.form__input} name={field.toLowerCase()} placeholder={field} key={uuid()} />)
  return (
    <>
      <div className={styles.wrapper} onClick={close}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, {setSubmitting, setStatus, resetForm}) => {
            const hasEmptyFields = Object.values(values).some((v) => v.length < 1)
            const hasEmail = values.hasOwnProperty("email")
            const emailTest = (value: string) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(value)
            const badEmail = !emailTest(values["email"])
            if (hasEmptyFields || (hasEmail && badEmail)) return setMessage(content?.contactForm?.error)
            setSubmitting(true)
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
            if (res.ok === false) {
              setSubmitting(false)
              setStatus("error")
              setMessage(content?.contactForm?.error)
              return
            }
            setSubmitting(false)
            setStatus("success")
            setMessage(content?.contactForm?.success)
            resetForm()
          }}
        >
          {({ errors, touched, isSubmitting, status }) => (
            <Form className={styles.form} onClick={stopProp}>
              <button className={styles.cross} onClick={close}></button>
              <fieldset className={styles.form__field}>
                <legend className={styles.form__title}>{content?.title}</legend>
                <div className={styles.form__inputs}>
                  <div className={styles.form__error} data-status={status}>{message}</div>
                  {formFields}
                  <button type="submit" className={styles.form__submit} disabled={isSubmitting}>
                    {content?.contactForm?.submitButton}
                  </button>
                </div>
                <ul className={styles.form__media}>{media}</ul>
              </fieldset>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default ContactUs
