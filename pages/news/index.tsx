import styles from "./news.module.sass"
import Nav from "@modules/nav/Nav"
import New from "@modules/new/New"
import SimpleBarReact from "simplebar-react"
import "simplebar/src/simplebar.css"
import { v4 as uuid } from "uuid"

interface Props {}

const News: React.FC<Props> = ({}) => {
  const news = [
    {
      title: "How to build a successful career in consulting?",
      subsection: "Subsection",
      brief:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus aut aperiam nam doloremque voluptate pariatur dolores a sequi excepturi asperiores aliquam, ducimus numquam voluptates facilis ea modi tenetur atque facere laboriosam fuga nemo. Aperiam beatae saepe dolor doloremque nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.",
      date: "06 jun 2021",
      comments: 36,
      views: "1024",
    },
    {
      title: "How to build a successful career in consulting?",
      subsection: "Subsection",
      brief:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus aut aperiam nam doloremque voluptate pariatur dolores a sequi excepturi asperiores aliquam, ducimus numquam voluptates facilis ea modi tenetur atque facere laboriosam fuga nemo. Aperiam beatae saepe dolor doloremque nihil.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.",
      date: "06 jun 2021",
      comments: 36,
      views: "1024",
    },
    {
      title: "How to build a successful career in consulting?",
      subsection: "Subsection",
      brief:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus aut aperiam nam doloremque voluptate pariatur dolores a sequi excepturi asperiores aliquam, ducimus numquam voluptates facilis ea modi tenetur atque facere laboriosam fuga nemo. Aperiam beatae saepe dolor doloremque nihil.",
      date: "06 jun 2021",
      comments: 36,
      views: "1024",
    },
    {
      title: "How to build a successful career in consulting?",
      subsection: "Subsection",
      brief: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      date: "06 jun 2021",
      comments: 36,
      views: "1024",
    },
    {
      title: "How to build a successful career in consulting?",
      subsection: "Subsection",
      brief:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus aut aperiam nam doloremque voluptate pariatur dolores a sequi excepturi asperiores aliquam, ducimus numquam voluptates facilis ea modi tenetur atque facere laboriosam fuga nemo. Aperiam beatae saepe dolor doloremque nihil.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.",
      date: "06 jun 2021",
      comments: 36,
      views: "1024",
    },
    {
      title: "How to build a successful career in consulting?",
      subsection: "Subsection",
      brief:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus aut aperiam nam doloremque voluptate pariatur dolores a sequi excepturi asperiores aliquam, ducimus numquam voluptates facilis ea modi tenetur atque facere laboriosam fuga nemo. Aperiam beatae saepe dolor doloremque nihil.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.",
      date: "06 jun 2021",
      comments: 36,
      views: "1024",
    },
  ]
  const newEls = news.map(
    ({ title, subsection, brief, date, comments, views }, i) => (
      <li className={styles.news__new} key={uuid()}>
        <New
          title={title}
          subsection={subsection}
          brief={brief}
          date={date}
          comments={comments}
          views={views}
        />
      </li>
    )
  )
  return (
    <SimpleBarReact>
      <div className={styles.page}>
        <Nav />
        <div className={styles.wrapper}>
          <ul className={styles.news}>{newEls}</ul>
        </div>
      </div>
    </SimpleBarReact>
  )
}

export default News
