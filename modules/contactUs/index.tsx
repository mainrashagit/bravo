import styles from "./contactus.module.sass"
import { v4 as uuid } from "uuid"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { SideNavContent } from "@/pages/api/getSideNavContent"

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
  const [status, setStatus] = useState("success")
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
  const spinner = (
    <>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{`
        .lds-spinner {
          color: official;
          display: inline-block;
          position: relative;
          width: 40px;
          height: 40px;
          transform: scale(0.5);
        }
        .lds-spinner div {
          transform-origin: 40px 40px;
          animation: lds-spinner 1.2s linear infinite;
        }
        .lds-spinner div:after {
          content: " ";
          display: block;
          position: absolute;
          top: 3px;
          left: 37px;
          width: 6px;
          height: 18px;
          border-radius: 20%;
          background: #fff;
        }
        .lds-spinner div:nth-child(1) {
          transform: rotate(0deg);
          animation-delay: -1.1s;
        }
        .lds-spinner div:nth-child(2) {
          transform: rotate(30deg);
          animation-delay: -1s;
        }
        .lds-spinner div:nth-child(3) {
          transform: rotate(60deg);
          animation-delay: -0.9s;
        }
        .lds-spinner div:nth-child(4) {
          transform: rotate(90deg);
          animation-delay: -0.8s;
        }
        .lds-spinner div:nth-child(5) {
          transform: rotate(120deg);
          animation-delay: -0.7s;
        }
        .lds-spinner div:nth-child(6) {
          transform: rotate(150deg);
          animation-delay: -0.6s;
        }
        .lds-spinner div:nth-child(7) {
          transform: rotate(180deg);
          animation-delay: -0.5s;
        }
        .lds-spinner div:nth-child(8) {
          transform: rotate(210deg);
          animation-delay: -0.4s;
        }
        .lds-spinner div:nth-child(9) {
          transform: rotate(240deg);
          animation-delay: -0.3s;
        }
        .lds-spinner div:nth-child(10) {
          transform: rotate(270deg);
          animation-delay: -0.2s;
        }
        .lds-spinner div:nth-child(11) {
          transform: rotate(300deg);
          animation-delay: -0.1s;
        }
        .lds-spinner div:nth-child(12) {
          transform: rotate(330deg);
          animation-delay: 0s;
        }
        @keyframes lds-spinner {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
  return (
    <>
      <div className={styles.wrapper} onClick={close}>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const hasEmptyFields = Object.values(values).some((v) => v.length < 1)
            const hasEmail = values.hasOwnProperty("email")
            const emailTest = (value: string) => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(value)
            const badEmail = !emailTest(values["email"])
            if (hasEmptyFields || (hasEmail && badEmail)) {
              setMessage(content?.contactForm?.error)
              setStatus("error")
              return
            }
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
          {({ isSubmitting }) => (
            <Form className={styles.form} onClick={stopProp}>
              <button className={styles.cross} onClick={close}></button>
              <fieldset className={styles.form__field}>
                <legend className={styles.form__title}>{content?.title}</legend>
                <div className={styles.form__inputs}>
                  <div className={styles.form__error} data-status={status}>
                    {isSubmitting ? spinner : message}
                  </div>
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
