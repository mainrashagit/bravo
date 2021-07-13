import styles from "./workwithus.module.sass"
import Post from "@modules/post/Post"
import Nav from "@modules/nav/Nav"
import "simplebar/dist/simplebar.min.css"
import { v4 as uuid } from "uuid"


interface Props {}

const WorkWithUs: React.FC<Props> = ({}) => {
  const positions = [
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
    {
      location: "Moscow",
      title: "Consultant / Deputy Chief Accountant (Outsourcing)",
    },
    {
      location: "Moscow",
      title: "Digital Expert (SEO, SMM, SEM)",
    },
    {
      location: "Moscow",
      title: "Senior Consultant Business Valuation",
    },
    {
      location: "Moscow",
      title: "Business process analyst (Digital Audit)",
    },
    {
      location: "Moscow",
      title: "Audit Manager/Assistant Manager",
    },
  ]
  const posElements = positions.map(({ title, location }, i) => (
    <li className={styles.posts__post} key={uuid()}>
      <Post title={title} location={location} />
    </li>
  ))
  return (
    <>
      <Nav />
      <ul className={styles.posts}>{posElements}</ul>
    </>
  )
}

export default WorkWithUs
