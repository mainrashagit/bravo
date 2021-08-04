import styles from "./news.module.sass"
import Nav from "@modules/nav/Nav"
import New from "@modules/new/New"
import { v4 as uuid } from "uuid"
import { getNews, News } from "@/lib/api/lang"
import { GetStaticProps } from "next"

interface Props {
  news: News
}

const NewsPage: React.FC<Props> = ({ news }) => {
  const newsList = [
    {
      title: "How to build a successful career in consulting?",
      subsection: "Subsection",
      brief: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus aut aperiam nam doloremque voluptate pariatur dolores a sequi excepturi asperiores aliquam, ducimus numquam voluptates facilis ea modi tenetur atque facere laboriosam fuga nemo. Aperiam beatae saepe dolor doloremque nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.",
      date: "06 jun 2021",
      comments: 36,
      views: "1024",
    },
    {
      title: "How to build a successful career in consulting?",
      subsection: "Subsection",
      brief: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus aut aperiam nam doloremque voluptate pariatur dolores a sequi excepturi asperiores aliquam, ducimus numquam voluptates facilis ea modi tenetur atque facere laboriosam fuga nemo. Aperiam beatae saepe dolor doloremque nihil.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.",
      date: "06 jun 2021",
      comments: 36,
      views: "1024",
    },
    {
      title: "How to build a successful career in consulting?",
      subsection: "Subsection",
      brief: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus aut aperiam nam doloremque voluptate pariatur dolores a sequi excepturi asperiores aliquam, ducimus numquam voluptates facilis ea modi tenetur atque facere laboriosam fuga nemo. Aperiam beatae saepe dolor doloremque nihil.",
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
      brief: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, delectus aut aperiam nam doloremque voluptate pariatur dolores a sequi excepturi asperiores aliquam, ducimus numquam voluptates facilis ea modi tenetur atque facere laboriosam fuga nemo. Aperiam beatae saepe dolor doloremque nihil.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis tempora natus aliquam distinctio temporibus suscipit ratione adipisci ut eveniet.",
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
  const newEls = news.map(({ title, subsection, text, date, link, image }, i) => (
    <li className={styles.news__new} key={uuid()}>
      <New title={title} subsection={subsection} brief={text} date={date} comments={0} views={0} link={`/news/${link}`} image={image} />
    </li>
  ))
  return (
    <>
      <Nav />
      <div className={styles.wrapper}>
        <ul className={styles.news}>{newEls}</ul>
      </div>
    </>
  )
}

export default NewsPage

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, defaultLocale } = context
  const loc = locale ?? (defaultLocale as string)

  const news = await getNews(loc)

  return { props: { news } }
}
